import { useForm } from 'react-hook-form';
import styles from './UpdateProfile.module.css';
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';

export const UpdateProfile = ({ setOpenUpdate, userData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

  const updateUserData = (newUserData) => {
    return makeRequest.put('users/', newUserData);
  };

  const mutation = useMutation({
    mutationFn: updateUserData,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const onFormSubmit = handleSubmit((data) => {
    mutation.mutate({ name: data.name, city: data.city, contact: data.email });
    setOpenUpdate(false);
  });

  return (
    <div className={styles.modal}>
      <div className={styles.card}>
        <h2 className={styles.title}>Update Profile</h2>

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
                defaultValue={userData.name}
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
