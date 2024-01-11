import { useForm } from 'react-hook-form';
import styles from './UpdateProfile.module.css';
import PropTypes from 'prop-types';

export const UpdateProfile = ({ setOpenUpdate, userData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFormSubmit = handleSubmit(async (data) => {
    console.log(data);
  });

  return (
    <div className={styles.modal}>
      <div className={styles.card}>
        <h2 className={styles.title}>Update Profile</h2>

        <div className={styles.content}>
          <form onSubmit={onFormSubmit} className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="city" className={styles.label}>
                city
              </label>
              <input
                type="text"
                id="city"
                placeholder="Your city"
                name="city"
                defaultValue={userData.city}
                {...register('city')}
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
                placeholder="email@example.com"
                name="email"
                defaultValue={userData.email}
                {...register('email', {
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Email is not valid',
                  },
                })}
                className={styles.input}
              />
              {errors.email ? <span className={styles.error}>{errors.email.message}</span> : null}
            </div>

            <div className={styles.buttons}>
              <button type="submit" className={styles.button}>
                Update Profile
              </button>
              <button onClick={() => setOpenUpdate(false)} className={styles.button}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

UpdateProfile.propTypes = {
  setOpenUpdate: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
};
