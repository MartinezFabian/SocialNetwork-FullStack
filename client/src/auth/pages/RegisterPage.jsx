import styles from './RegisterPage.module.css';

export const RegisterPage = () => {
  return (
    <main className={styles.card}>
      <h1 className={styles.title}>Register</h1>

      <div className={styles.content}>
        <form className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="name" className={styles.label}>
              Full name
            </label>
            <input type="name" id="name" name="name" placeholder="name" className={styles.input} />
          </div>

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
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email"
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

          <div className={styles.field}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="confirm password"
              className={styles.input}
            />
          </div>

          <div className={styles.buttons}>
            <button className={styles.button}>Sign in</button>
            <button type="submit" className={styles.button}>
              Register
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};
