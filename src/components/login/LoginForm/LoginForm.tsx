"use client";
import { useState } from "react";
import { handleLogin } from "app/actions";
import styles from "./LoginForm.module.sass";
import Link from "next/link";

export const LoginForm = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: {
    target: any;
    preventDefault: () => void;
  }) => {
    event.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData(event.target);
      await handleLogin(formData);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.LoginForm}>
      <h1 className={styles.LoginForm__title}>Login</h1>
      <form
        onSubmit={handleSubmit}
        className={styles.LoginForm__form}
        onInput={() => setError(false)}
      >
        <input
          type="text"
          name="email"
          placeholder="email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          disabled={loading}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          disabled={loading}
        />
        <input type="submit" name="submit" value="Login" disabled={loading} />
        {error && (
          <div>
            <p className={styles.LoginForm__error}>
              Login failed. Please check your data and try again.
            </p>
          </div>
        )}
        <Link
          href={"/signup"}
          className={styles.LoginForm__CreateAccountButton}
        >
          Don&apos;t have an account? Sign Up
        </Link>
      </form>
    </div>
  );
};
