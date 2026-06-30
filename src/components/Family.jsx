import { motion } from 'framer-motion';
import styles from './Family.module.css';

export default function Family({ settings }) {
  return (
    <section className={styles.section} id="invitation-card">
      <motion.div
        className={styles.archCard}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.archCardDecoration}>❧</div>

        <motion.p className={styles.bismillahArabic} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          بسم الله الرحمن الرحيم
        </motion.p>
        <motion.p className={styles.bismillahEnglish} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          IN THE NAME OF ALLAH
        </motion.p>

        <motion.p className={styles.intro} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          Together with the blessings of their families
        </motion.p>

        <motion.div className={styles.familyBlock} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <h3 className={styles.parents}>{settings?.brideParents || 'Abbas & Sainaba'}</h3>
          <p className={styles.andFamily}>&amp; FAMILY</p>
        </motion.div>

        <motion.p className={styles.joinedWith} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.7 }}>
          JOINED WITH
        </motion.p>

        <motion.div className={styles.familyBlock} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          <h3 className={styles.parents}>{settings?.groomParents || 'Abdul khader & Rasiya'}</h3>
          <p className={styles.andFamily}>&amp; FAMILY</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
