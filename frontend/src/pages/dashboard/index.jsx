import React from 'react'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { getAllPosts } from '@/config/redux/action/postAction';
import { getAboutUser } from '@/config/redux/action/authAction';
import { useSelector } from 'react-redux';
import UserLayout from '@/layout/UserLayout';
import DashboardLayout from '@/layout/DashboardLayout';

export default function Dashboard() {

  const router = useRouter();

  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);

  

  useEffect(() => {
    if (authState.isTokenThere) {
      const token = localStorage.getItem("token");
      dispatch(getAllPosts());
      dispatch(getAboutUser({ token }));
    }
  }, [authState.isTokenThere]);


  return (
    <UserLayout>

      <DashboardLayout>
        <h1>HarHari</h1>
      </DashboardLayout>
      

    </UserLayout>
  )
}
