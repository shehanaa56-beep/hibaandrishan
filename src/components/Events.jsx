import { motion } from 'framer-motion';
import { BsStars } from 'react-icons/bs';
import styles from './Events.module.css';

const defaultEvents = [
  { id: 'nikah', name: 'Nikah', date: 'July 11, 2026', time: 'Saturday', venue: 'Msp Auditorium, perimpadari, Bhimanad' },
];

const EventCard = ({ event, index }) => {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -4, boxShadow: '0 15px 30px rgba(212, 175, 55, 0.15)' }}
    >
      <div className={styles.header}>
        <div className={styles.iconWrap}><BsStars className={styles.icon} /></div>
        <div>
          <h3 className={styles.name}>{event.name}</h3>
          <span className={styles.date}>{event.date}</span>
        </div>
      </div>
      <div className={styles.details}>
        <div className={styles.detail}>
          <span className={styles.detailLabel}>TIME</span>
          <span className={styles.detailVal}>{event.time}</span>
        </div>
        <div className={styles.detail}>
          <span className={styles.detailLabel}>VENUE</span>
          <span className={styles.detailVal}>{event.venue}</span>
        </div>
      </div>
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
