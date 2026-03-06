import React from 'react'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { getAllPosts } from '@/config/redux/action/postAction';
import { getAboutUser } from '@/config/redux/action/authAction';

export default function Dashboard() {

  const router = useRouter();

  const [isTokenThere, setIsTokenThere] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      router.push("/login");
    }
    setIsTokenThere(true);
  }, []);

  useEffect(() => {
    if (isTokenThere) {
      const token = localStorage.getItem("token");
      dispatch(getAllPosts());
      dispatch(getAboutUser({ token }));
    }
  }, [isTokenThere]);


  return (
    <div>Dashboard</div>
  )
}
