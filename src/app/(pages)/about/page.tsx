import styles from "./About.module.scss";

const AboutPage = () => {
  return (
    <div className={styles.aboutContainer}>
      <h1 className={styles.title}>Tentang Kami</h1>
      <p className={styles.description}>
        Di UPT SMPN 10 Tapung ini, total kelas yang ada yaitu 21 kelas. Selain itu, sekolah ini memiliki berbagai ekstrakurikuler seperti Pramuka, Voli, Futsal, Drumband, dan lainnya. Sekolah ini juga memiliki akreditasi yang sangat baik, yaitu A.
      </p>
    </div>
  );
};

export default AboutPage;
