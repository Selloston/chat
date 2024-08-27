"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use `next/navigation` for App Router
import Link from 'next/link';
import './page.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, firestore } from '@/app/firbase'; // Adjust the import path as necessary

const RegisterPage = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [serialNumber, setSerialNumber] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    setError(''); // Clear previous errors

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store additional user information in Firestore
      await setDoc(doc(firestore, 'users', user.uid), {
        name,
        email,
        password,
        serialNumber,
      });

      console.log('Registered successfully:', user.email);
      router.push('/'); // Redirect to home or desired page
    } catch (error) {
      // Handle registration errors
      setError('Registration failed: ' + (error as Error).message);
    }
  };

  return (
    <div className="body">
      <div className="container">
        <form className="containerInput" onSubmit={handleRegister}>
          <h1>Register</h1>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            className="inputField"
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <label htmlFor="serialNumber">Serial Number:</label>
          <input
            id="serialNumber"
            className="inputField"
            type="text"
            placeholder="Enter Serial Number"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            required
          />
          <input
            className="submitButton"
            type="submit"
            value="Register"
          />
          {error && <p className="error">{error}</p>}
        </form>
        <div className="containerCreateAccount">
          <p>Already have an account?</p>
          <Link href="/Login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
