'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const verifyEmailPage = () => {
  const [token, setToken] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(false);

  const emailVerification = async () => {
    try {
      await fetch('/api/users/verifyemail', {
        method: 'POST',
        body: JSON.stringify(token),
      });

      setIsVerified(true);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split('=')[1];

    setToken(urlToken || '');                                        
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      emailVerification();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-3">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : 'no token'}
      </h2>

      {isVerified && (
        <div className="text-2xl">
          <h2>Email verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}

      {error && (
        <div className="text-2xl">
          <h2>Email is not verified</h2>
        </div>
      )}
    </div>
  );
};

export default verifyEmailPage;
