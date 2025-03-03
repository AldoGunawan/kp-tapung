'use client';

import * as z from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import styles from './SignUp.module.scss';

const FormSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(5, 'Password must have more than 5 characters'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

const SignUpForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      router.push('/api/auth/sign-in');
    } else {
      console.error('Failed to sign up');
    }
  };

  return (
    <div className={styles.signUpContainer}>
      <div className={styles.signUpCard}>
        <h2 className={styles.signUpTitle}>Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formItem}>
            <label className={styles.formLabel}>Username</label>
            <input
              className={styles.inputField}
              placeholder="Aldo K"
              {...register('username')}
            />
            {errors.username && <p className={styles.errorText}>{errors.username.message}</p>}
          </div>

          <div className={styles.formItem}>
            <label className={styles.formLabel}>Email</label>
            <input
              className={styles.inputField}
              placeholder="aldo@gmail.com"
              {...register('email')}
            />
            {errors.email && <p className={styles.errorText}>{errors.email.message}</p>}
          </div>

          <div className={styles.formItem}>
            <label className={styles.formLabel}>Password</label>
            <input
              className={styles.inputField}
              type="password"
              placeholder="Enter your password"
              {...register('password')}
            />
            {errors.password && <p className={styles.errorText}>{errors.password.message}</p>}
          </div>

          <div className={styles.formItem}>
            <label className={styles.formLabel}>Re-Enter your password</label>
            <input
              className={styles.inputField}
              type="password"
              placeholder="Re-Enter your password"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && <p className={styles.errorText}>{errors.confirmPassword.message}</p>}
          </div>

          <button className={styles.signUpButton} type="submit">
            Sign up
          </button>
        </form>

        <div className={styles.separator}>or</div>
        <p className={styles.signUpText}>
          Already have an account?&nbsp;
          <Link className={styles.signInLink} href="/api/auth/sign-in">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
