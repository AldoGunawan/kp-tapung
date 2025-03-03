'use client';

import * as z from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './SignIn.module.scss';

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z.string().min(1, 'Password is required').min(5, 'Password must have more than 8 characters'),
});

const SignInForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setLoading(true);
    setError(null);

    const signInData = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (signInData?.error) {
      setError('Invalid email or password. Please try again.');
      setLoading(false);
    } else {
      router.push('/');
    }
  };

  return (
    <div className={styles.signInContainer}>
      <div className={styles.signInCard}>
        <h2 className={styles.signInTitle}>Welcome Back!</h2>
        {error && <p className={styles.errorMessage}>{error}</p>}
        
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formItem}>
            <label className={styles.formLabel}>Email</label>
            <input
              className={styles.inputField}
              placeholder="mail@example.com"
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

          <button className={styles.signInButton} type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className={styles.separator}>
          <span>or</span>
        </div>
        <p className={styles.signInText}>
          Don&apos;t have an account?&nbsp;
          <Link href="/api/auth/sign-up" className={styles.signUpLink}>Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
