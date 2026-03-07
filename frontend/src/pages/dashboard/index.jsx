import React from 'react'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { getAllPosts } from '@/config/redux/action/postAction';
import { getAboutUser, getAllUsers } from '@/config/redux/action/authAction';
import { useSelector } from 'react-redux';
import UserLayout from '@/layout/UserLayout';
import DashboardLayout from '@/layout/DashboardLayout';
import styles from "./index.module.css";
import { BASE_URL } from '@/config';


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
    if(!authState.all_profiles_fetched){
      dispatch(getAllUsers());
  }
  }, [authState.isTokenThere]);

  if(authState.user) {

  return (
    <UserLayout>

      <DashboardLayout>
        <div className="scrollComponnt">

          <div className={styles.createPostContainer}>
            <img width={100} src={`${BASE_URL}/${authState?.user?.userId?.profilePicture}`} alt=''/>

            <textarea name='' id='' ></textarea>

            <label htmlFor='fileUpload'>
              <div className={styles.Fab}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
            </label>

            <input type='file' hidden id='fileUpload' />
          </div>

        </div>
      </DashboardLayout>
      

    </UserLayout>
    )
  } else {
    return (
    <UserLayout>

      <DashboardLayout>
        <h3>Loading.......</h3>
      </DashboardLayout>

    </UserLayout>
    )
  }
}
