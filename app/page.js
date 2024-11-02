'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [status, setStatus] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    
    const formData = {
      name: event.target.name.value,
      email: event.target.email.value,
      question1: event.target.question1.value,
      question2: event.target.question2.value,
      feedback: event.target.feedback.value
    };

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        event.target.reset();
        // Show success message briefly before redirect
        setTimeout(() => {
          window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
        }, 1000); // Waits 1 second before redirecting
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
      console.error('Error:', error);
    }
  }

  return (
    <main className={styles.container}>
      <h1>Poll Form</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="question1">What&apos;s your favorite programming language?</label>
          <input type="text" id="question1" name="question1" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="question2">How long have you been coding?</label>
          <input type="text" id="question2" name="question2" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="feedback">Additional Comments:</label>
          <textarea id="feedback" name="feedback" rows="4"></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
      {status === 'success' && <p className={styles.success}>Thank you for your response!</p>}
      {status === 'error' && <p className={styles.error}>There was an error submitting your response. Please try again.</p>}
    </main>
  );
}