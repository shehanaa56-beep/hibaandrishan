import { useState } from 'react';
import { motion } from 'framer-motion';
import { submitRSVP } from '../services/firebase';
import styles from './RSVP.module.css';

export default function RSVP() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    guests: '1',
    attending: 'Yes, I Will Attend',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setStatus('loading');
    try {
      await submitRSVP(form);
      setStatus('success');
      setForm({
        name: '',
        phone: '',
        email: '',
        guests: '1',
        attending: 'Yes, I Will Attend',
        message: '',
      });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className={styles.section} id="rsvp">
      <motion.h2
        className={styles.title}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Will You Join Us?
      </motion.h2>

      <div className={styles.separator}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className={styles.separatorSvg}>
          <path d="M12 2C12 2 9.5 5 9.5 8C9.5 11 12 11.5 12 11.5C12 11.5 14.5 11 14.5 8C14.5 5 12 2 12 2Z" />
          <path d="M12 22C12 22 9.5 19 9.5 16C9.5 13 12 12.5 12 12.5C12 12.5 14.5 13 14.5 16C14.5 19 12 22 12 22Z" />
          <path d="M2 12C2 12 5 9.5 8 9.5C11 9.5 11.5 12 11.5 12C11.5 12 11 14.5 8 14.5C5 14.5 2 12 2 12Z" />
          <path d="M22 12C22 12 19 9.5 16 9.5C13 9.5 12.5 12 12.5 12C12.5 12 13 14.5 16 14.5C19 14.5 22 12 22 12Z" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      </div>

      <motion.form
        className={styles.form}
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className={styles.fieldGroup}>
          <label htmlFor="rsvp-name" className={styles.label}>Guest Name</label>
          <input
            id="rsvp-name"
            className={styles.input}
            type="text"
            placeholder="Enter your full name"
            value={form.name}
            onChange={e => update('name', e.target.value)}
            required
          />
        </div>

        <div className={styles.row}>
          <div className={styles.fieldGroup}>
            <label htmlFor="rsvp-phone" className={styles.label}>Phone Number</label>
            <input
              id="rsvp-phone"
              className={styles.input}
              type="tel"
              placeholder="Phone number"
              value={form.phone}
              onChange={e => update('phone', e.target.value)}
              required
            />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="rsvp-email" className={styles.label}>Email (Optional)</label>
            <input
              id="rsvp-email"
              className={styles.input}
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={e => update('email', e.target.value)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.fieldGroup}>
            <label htmlFor="rsvp-guests" className={styles.label}>Number of Guests</label>
            <input
              id="rsvp-guests"
              className={styles.input}
              type="number"
              min="1"
              max="20"
              value={form.guests}
              onChange={e => update('guests', e.target.value)}
              required
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Will you attend?</label>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="attending"
                  value="Yes, I Will Attend"
                  checked={form.attending === 'Yes, I Will Attend'}
                  onChange={e => update('attending', e.target.value)}
                  className={styles.radioInput}
                />
                <span className={styles.customRadio}></span>
                Yes
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="attending"
                  value="Sorry, I Cannot Attend"
                  checked={form.attending === 'Sorry, I Cannot Attend'}
                  onChange={e => update('attending', e.target.value)}
                  className={styles.radioInput}
                />
                <span className={styles.customRadio}></span>
                No
              </label>
            </div>
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="rsvp-message" className={styles.label}>Sweet Message</label>
          <textarea
            id="rsvp-message"
            className={styles.textarea}
            placeholder="Leave a sweet message for the couple..."
            value={form.message}
            onChange={e => update('message', e.target.value)}
            rows={2}
          />
        </div>

        {status === 'success' && <p className={styles.success}>Thank you! We have received your response.</p>}
        {status === 'error' && <p className={styles.error}>Something went wrong. Please try again.</p>}

        <motion.button
          id="rsvp-submit"
          type="submit"
          className={styles.submitBtn}
          disabled={status === 'loading'}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {status === 'loading' ? 'SENDING...' : 'SEND RSVP'}
        </motion.button>
      </motion.form>
    </section>
  );
}
