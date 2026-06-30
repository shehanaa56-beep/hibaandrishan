import { motion } from 'framer-motion';
import styles from './Hero.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (customDelay = 0) => ({
    opacity: 1, 
    y: 0, 
    transition: { duration: 1.2, delay: customDelay, ease: [0.16, 1, 0.3, 1] }
  })
};

export default function Hero({ settings, guestName }) {
  const dateObj = new Date(settings?.weddingDate || '2026-07-11T00:00:00');
  
  // Format the date to show like: "DECEMBER 12, 2026" or with "TH" suffix
  const month = dateObj.toLocaleDateString('en-US', { month: 'long' }).toUpperCase();
  const dayRaw = dateObj.getDate();
  const year = dateObj.getFullYear();
  
  // Add ordinal suffix for date (e.g. 12th)
  const getOrdinalSuffix = (d) => {
    if (d > 3 && d < 21) return 'TH';
    switch (d % 10) {
      case 1:  return "ST";
      case 2:  return "ND";
      case 3:  return "RD";
      default: return "TH";
    }
  };
  const day = `${dayRaw}${getOrdinalSuffix(dayRaw)}`;

  // Extract town name from venue address if possible
  const venueName = (settings?.venue || 'MSP AUDITORIUM').toUpperCase();
  const address = settings?.venueAddress || 'perimpadari, Bhimanad';
  const town = 'BHIMANAD';

  const bride = (settings?.brideName || 'Hiba').toUpperCase();
  const groom = (settings?.groomName || 'Rishan').toUpperCase();

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.content}>
        {/* Guest greeting card overlay */}
        {guestName && (
          <motion.div
            className={styles.guestGreeting}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <p>Dear <span className={styles.guestName}>{guestName}</span>,</p>
            <p className={styles.guestSubtitle}>You Are Cordially Invited</p>
          </motion.div>
        )}

        {/* Overlapping Welcome to the Wedding Of script title */}
        <motion.div 
          className={styles.saveTheDate}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
        >
          <span className={styles.wordSave}>WELCOME</span>
          <span className={styles.wordThe}>to the</span>
          <span className={styles.wordDate}>WEDDING OF</span>
        </motion.div>

        {/* Bride & Groom names */}
        <motion.h1 
          className={styles.names}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
        >
          {bride} &amp; {groom}
        </motion.h1>
      </div>

      {/* Tuxedo and Dress center bottom illustration */}
      <div className={styles.illustrationWrapper}>
        <motion.img 
          src="/images/dress_tuxedo.png" 
          alt="Wedding Tuxedo and Gown" 
          className={styles.illustration}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </section>
  );
}
