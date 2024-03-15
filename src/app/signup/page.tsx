'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const SignUpPage = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [btnDisabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ data: '', color: '' });

  const router = useRouter();

  const handleChange = (field: string, value: any) => {
    setUserData((prevState) => ({ ...prevState, [field]: value }));
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();

      if (res.ok) {
        setMsg({
          data: data.message || 'User added successfully!',
          color: 'green',
        });
        // router.push('/');
      } else if (data.error.includes('E11000')) {
        setMsg({ data: 'Use a different username!', color: 'red' });
      } else {
        setMsg({ data: data.error || 'Something went wrong!', color: 'red' });
      }

      console.log(data);
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData.username && userData.email && userData.password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [userData]);

  useEffect(() => {
    if (msg?.data.length > 0) {
      setTimeout(() => {
        setMsg({ data: '', color: '' });
      }, 5000);
    }
  }, [msg.data]);

  return (
    <form
      className="flex flex-col items-center justify-center py-2 min-h-screen"
      onSubmit={submitHandler}
    >
      <h1 className="bg-green-500 p-3 px-20 text-black rounded-lg mb-4">
        {loading ? 'processing...' : 'Signup'}
      </h1>
      <hr className="bg-white-600" />
      <label htmlFor="username" className="bg-blue-500 p-1 mt-2 rounded-lg">
        Username:
      </label>
      <input
        type="text"
        placeholder="username"
        className="p-2 m-2 border-none rounded-lg focus:outline-none focus:border-gray-600 text-black"
        onChange={(e) => handleChange('username', e.target.value)}
      />
      <label htmlFor="email" className="bg-blue-500 p-1 mt-2 rounded-lg">
        Email:
      </label>
      <input
        type="email"
        placeholder="email"
        className="p-2 m-2 border-none rounded-lg focus:outline-none focus:border-gray-600 text-black"
        onChange={(e) => handleChange('email', e.target.value)}
      />
      <label htmlFor="password" className="bg-blue-500 p-1 mt-2 rounded-lg">
        Password:
      </label>
      <input
        type="password"
        placeholder="password"
        className="p-2 m-2 border-none rounded-lg focus:outline-none focus:border-gray-600 text-black"
        onChange={(e) => handleChange('password', e.target.value)}
      />
      <button
        className={`bg-emerald-500 p-4 rounded-lg mt-3 text-black ${
          btnDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
        }`}
        disabled={btnDisabled}
      >
        Sign In
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

      <Link href={'/login'} className="p-3">
        Already have an account? <b>Login</b>
      </Link>
    </form>
  );
};

export default SignUpPage;
