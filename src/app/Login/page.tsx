"use client"; // Ensure this is uncommented for client-side code

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use `next/navigation` for App Router
import { auth } from '@/app/firbase'; // Adjust the import path as necessary
import Link from 'next/link';
import './page.css';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    setError(''); // Clear previous errors

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Handle successful login
      console.log("Logged in as:", email);
      router.push('/'); // Redirect to home or desired page
    } catch (error) {
      // Handle login errors
      setError("Login failed: " + (error as Error).message);
    }
  };

  return (
    <div className="body">
      <div className="container">
        <form className="containerInput" onSubmit={handleLogin}>
          <h1>Login</h1>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            className="inputField"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            className="inputField"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            className="submitButton"
            type="submit"
            value="Login"
          />
          {error && <p className="error">{error}</p>}
        </form>
        <div className="containerCreateAccount">
          <p>Dont have an account?</p>
          <Link href="Sign">Create Account</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
