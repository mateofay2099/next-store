"use client";
import { useState } from "react";
import { handleCreateUser } from "app/actions";
import Link from "next/link";
import styles from "./NewAccountForm.module.sass";

export const NewAccountForm = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData(event.target);
      await handleCreateUser(formData);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.NewAccountForm}>
      <h1 className={styles.NewAccountForm__title}>New Account</h1>
      <form
        className={styles.NewAccountForm__form}
        onSubmit={handleSubmit}
        onInput={() => setError(false)}
      >
        <input
          type="text"
          name="firstName"
          placeholder="Name"
          disabled={loading}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Lastname"
          disabled={loading}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          disabled={loading}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone number"
          pattern="^[0-9]*$"
          disabled={loading}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          disabled={loading}
        />
        <input
          type="password"
          name="password_confirmation"
          placeholder="Re-type password"
          disabled={loading}
        />
        <input
          type="submit"
          name="submit"
          value="Create Account"
          disabled={loading}
        />
        {error && (
          <div>
            <p className={styles.NewAccountForm__error}>
              An error has occurred. Please check your data and try again.
            </p>
          </div>
        )}
        <Link href={"/login"} className={styles.NewAccountForm__LoginButton}>
          Already have an account? Log in
        </Link>
      </form>
    </div>
  );
};
