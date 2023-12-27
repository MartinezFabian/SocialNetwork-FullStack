import axios from 'axios';
import { useForm } from 'react-hook-form';
import styles from './RegisterPage.module.css';
import { useState } from 'react';

export const RegisterPage = () => {
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const onFormSubmit = handleSubmit(async (data) => {
    try {
      await axios.post('http://localhost:8800/api/auth/register', data);

      reset();
    } catch (error) {
      setError(error.response.data);
    }
  });

  return (
    <main className={styles.card}>
      <h1 className={styles.title}>Register</h1>

      <div className={styles.content}>
        <form onSubmit={onFormSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="name" className={styles.label}>
              Full name
            </label>
            <input
              type="name"
              id="name"
              placeholder="name"
              name="name"
              {...register('name', {
                required: { value: true, message: 'Name is required' },
                maxLength: { value: 23, message: 'Name must not exceed 23 characters' },
                minLength: { value: 3, message: 'Name must be longer than 3 characters' },
              })}
              className={styles.input}
            />
            {errors.name ? <span className={styles.error}>{errors.name.message}</span> : null}
          </div>

          <div className={styles.field}>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="username"
              name="username"
              {...register('username', {
                required: { value: true, message: 'Username is required' },
                maxLength: { value: 16, message: 'Username must not exceed 16 characters' },
                minLength: { value: 3, message: 'Username must be longer than 3 characters' },
              })}
              className={styles.input}
            />
            {errors.username ? (
              <span className={styles.error}>{errors.username.message}</span>
            ) : null}
          </div>

          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="email"
              name="email"
              {...register('email', {
                required: { value: true, message: 'Email is required' },
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Email is not valid',
                },
              })}
              className={styles.input}
            />
            {errors.email ? <span className={styles.error}>{errors.email.message}</span> : null}
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
              {...register('password', {
                required: { value: true, message: 'Password is required' },
                minLength: {
                  value: 6,
                  message: 'Password must be longer than 6 characters',
                },
              })}
              className={styles.input}
            />

            {errors.password ? (
              <span className={styles.error}>{errors.password.message}</span>
            ) : null}
          </div>

          <div className={styles.field}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="confirm password"
              name="confirmPassword"
              {...register('confirmPassword', {
                required: { value: true, message: 'Confirm Password is required' },
                validate: (value) =>
                  value === watch('password') ? true : 'Passwords do not match ',
              })}
              className={styles.input}
            />

            {errors.confirmPassword ? (
              <span className={styles.error}>{errors.confirmPassword.message}</span>
            ) : null}
          </div>

          <div className={styles.buttons}>
            <button className={styles.button}>Sign in</button>
            <button type="submit" className={styles.button}>
              Register
            </button>
          </div>
          {error !== '' ? <span className={styles.error}>{error}</span> : null}
        </form>
      </div>
    </main>
  );
};
