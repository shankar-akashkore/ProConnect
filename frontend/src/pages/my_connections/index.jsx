import React, { use } from 'react'
import UserLayout from '@/layout/UserLayout';
import DashboardLayout from '@/layout/DashboardLayout';
import styles from './index.module.css';
import { useDispatch } from 'react-redux';
import { getMyConnectionRequests } from '@/config/redux/action/authAction';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BASE_URL } from '@/config';

export default function MyConnectionPage() {

  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMyConnectionRequests({ token: localStorage.getItem("token") }));
  }, [])

  useEffect(() => {
      if(authState.connectionRequest?.length != 0) {
        console.log(authState.connectionRequest);
      }
  }, [authState.connectionRequest])

  return (
        <UserLayout>
            <DashboardLayout>
                <h1>My Connections</h1>

                {authState.connectionRequest?.length === 0 && <h3>No Connection Request Pending</h3>}

                {authState.connectionRequest?.length != 0 && authState.connectionRequest?.map((user,index) => {
                  return (
                    <div className={styles.userCard} key={index}>
                      <div style={{display: "flex", alignItems: "center", gap: "1.2rem"}}>
                        <div className={styles.profilePicture}>
                          <img src={`${BASE_URL}/${user.userId.profilePicture}`} alt=''/>
                        </div>

                        <div className={styles.userInfo}>
                          <h3>{user.userId.name}</h3>
                          <p>{user.userId.username}</p>
                        </div>

                      </div>
                    </div>
                  )
                })}
            </DashboardLayout>
        </UserLayout>
  )
}
