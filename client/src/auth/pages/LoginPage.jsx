import { useForm } from 'react-hook-form';
import styles from './LoginPage.module.css';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const { loginUser, errorMessage } = useContext(AuthContext);

  const onFormSubmit = handleSubmit(async (data) => {
    try {
      await loginUser(data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <main className={styles.card}>
      <h1 className={styles.title}>Sign in</h1>

      <div className={styles.content}>
        <form onSubmit={onFormSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="username"
              name="username"
              {...register('username', { required: true })}
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
              placeholder="password"
              name="password"
              {...register('password', { required: true })}
              className={styles.input}
            />
          </div>

          <div className={styles.buttons}>
            <button className={styles.button}>Register</button>
            <button type="submit" className={styles.button}>
              Sign in
            </button>
          </div>

          {errorMessage !== '' ? <span className={styles.error}>{errorMessage}</span> : null}
        </form>
      </div>
    </main>
  );
};
