'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ data: '', color: '' });

  const router = useRouter();

  useEffect(() => {
    if (userData.email && userData.password) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [userData]);

  useEffect(() => {
    if (msg.data) {
      setTimeout(() => {
        setMsg({ data: '', color: '' });
      }, 5000);
    }
  }, [msg.data, setUserData]);

  const handleChange = (field: any, value: any) => {
    setUserData((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();

      setLoading(true);

      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (response.ok) {
        setMsg({ data: data.message || 'user logged in', color: 'green' });
        setUserData((prevState) => ({ ...prevState, email: '', password: '' }));

        router.push('/');
      } else {
        setMsg({ data: data.message || 'wrong', color: 'red' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col items-center justify-center py-2 min-h-screen"
      onSubmit={handleSubmit}
    >
      <h1 className="bg-green-500 p-3 px-20 text-black rounded-lg mb-4">
        {loading ? 'processing' : 'Login'}
      </h1>
      <hr className="bg-white-600" />

      <label htmlFor="email" className="bg-blue-500 p-1 mt-2 rounded-lg">
        Email:
      </label>
      <input
        type="email"
        placeholder="email"
        className="p-2 m-2 border-none rounded-lg focus:outline-none focus:border-gray-600 text-black"
        value={userData.email}
        onChange={(e) => handleChange('email', e.target.value)}
      />
      <label htmlFor="password" className="bg-blue-500 p-1 mt-2 rounded-lg">
        Password:
      </label>
      <input
        type="password"
        placeholder="password"
        className="p-2 m-2 border-none rounded-lg focus:outline-none focus:border-gray-600 text-black"
        value={userData.password}
        onChange={(e) => handleChange('password', e.target.value)}
      />
      <button
        className={` p-4 rounded-lg mt-3 text-black ${
          btnDisabled
            ? 'cursor-not-allowed bg-gray-500'
            : 'cursor-pointer bg-emerald-500'
        }`}
        disabled={btnDisabled}
      >
        Login
      </button>

      {msg?.data.length > 0 ? (
        <div
          className={`${
            msg.color === 'green'
              ? 'bg-green-600 py-3 px-6 mt-2 rounded-md'
              : 'bg-red-600 py-3 px-6 mt-2 rounded-md'
          } `}
        >
          {msg.data}
        </div>
      ) : (
        ''
      )}

      <Link href={'/signup'} className="p-3">
        No account? <b>Sign Up</b>
      </Link>
    </form>
  );
};

export default LoginPage;
