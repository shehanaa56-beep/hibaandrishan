import { motion } from 'framer-motion';
import styles from './Events.module.css';

const defaultEvents = [
  { id: 'wedding', name: 'Wedding', date: 'July 11, 2026', time: '11:30 PM – 3:00 PM', venue: 'Msp Auditorium, perimpadari, Bhimanad' },
];

const EventCard = ({ event, index }) => {
  return (
    <motion.div
      className={styles.eventBlock}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
    >
      <p className={styles.eventLabel}>✦ Event ✦</p>
      <h3 className={styles.eventName}>{event.name}</h3>
      <div className={styles.dividerLine} />
      <p className={styles.eventDate}>{event.date}</p>
      <p className={styles.eventTime}>{event.time}</p>
      <div className={styles.dividerDots}>· · ·</div>
      <p className={styles.eventVenue}>{event.venue}</p>
    </motion.div>
  );
};

export default function Events({ settings }) {
  const events = settings?.events?.length ? settings.events : defaultEvents;
  return (
    <section className={styles.section} id="events">
      <motion.p className="section-subtitle" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        Save the Dates
      </motion.p>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
        Wedding Events
      </motion.h2>
      
      <div className="gold-separator"><span className="gold-separator-icon">♦</span></div>
      
      <div className={styles.list}>
        {events.map((ev, i) => <EventCard key={ev.id || i} event={ev} index={i} />)}
      </div>
    </section>
  );
}
