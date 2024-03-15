'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const Profile = () => {
  const [data, setData] = useState();
  const [btnStatus, setBtnStatus] = useState('Fetch User Data');
  const [showUserData, setShowUserData] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const logout = async () => {
    await fetch('/api/users/logout', { method: 'GET' });
    router.push('/login');
  };

  const handleClick = async () => {
    try {
      if (!data) {
        setLoading(true);
        const userData = await fetch('/api/users/self');
        const fetchedData = await userData.json();

        console.log(fetchedData);

        if (userData.ok) {
          setData(fetchedData);
          setBtnStatus('show user data');
        }
      }

      checkBtnStatus();
    } finally {
      setLoading(false);
    }
  };

  const checkBtnStatus = () => {
    if (btnStatus.includes('show')) {
      setShowUserData(true);
      setBtnStatus('hide user data');
    } else if (btnStatus.includes('hide')) {
      setShowUserData(false);
      setBtnStatus('show user data');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-2 min-h-screen">
      Profile
      <button
        onClick={handleClick}
        className={`${
          btnStatus.includes('show')
            ? 'p-2 mt-4 bg-green-400 rounded-md text-white-900'
            : 'p-2 mt-4 bg-yellow-400 rounded-md text-blue-900'
        }`}
      >
        {loading ? 'processing...' : btnStatus}
      </button>
      {showUserData && (
        <div className="p-3 bg-blue-500 mt-3 rounded-md">
          <div>name: {data?.user.username}</div>
          <div>email: {data?.user.email}</div>
          <div>admin: {data?.user.isAdmin ? 'yes' : 'no'}</div>
          <div>profile link: <Link href={`/profile/${data?.user._id}`}>{data?.user._id}</Link></div>
        </div>
      )}
      <button onClick={logout} className="p-2 mt-4 bg-cyan-400 rounded-md">
        Logout
      </button>
    </div>
  );
};

export default Profile;
