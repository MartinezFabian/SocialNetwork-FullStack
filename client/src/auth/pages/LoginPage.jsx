import styles from './LoginPage.module.css';

export const LoginPage = () => {
  return (
    <main className={styles.card}>
      <h1 className={styles.title}>Sign in</h1>

      <div className={styles.content}>
        <form className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="username"
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              className={styles.input}
            />
          </div>

          <div className={styles.buttons}>
            <button className={styles.button}>Register</button>
            <button type="submit" className={styles.button}>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};
