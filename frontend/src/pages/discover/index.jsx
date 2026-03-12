import React, { use, useEffect } from 'react'
import UserLayout from '@/layout/UserLayout';
import DashboardLayout from '@/layout/DashboardLayout';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAllUsers } from '@/config/redux/action/authAction';
import styles from "./index.module.css";
import { BASE_URL, clientServer } from '@/config';
import { useRouter } from 'next/router';

export default function DiscoverPage() {

    const authState = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const router = useRouter();

    useEffect(() => {
        if(!authState.all_profiles_fetched){
            dispatch(getAllUsers());
        }
    }, [])

  return (
    <UserLayout>

      <DashboardLayout>
        <h1>Discover Page</h1>

        <div className={styles.allUserProfile}>
          {authState.all_profiles_fetched && authState.all_users.map((user) => {
            return (
              <div onClick={() => {
                router.push(`/view_profile/${user.userId.username}`)
              }} key={user._id} className={styles.userCard}>
                <img className={styles.userCard_image} src={`${BASE_URL}/${user.userId.profilePicture}`} alt='' />
                <div>
                  <h3>{user.userId.name}</h3>
                  <p>{user.userId.username}</p>
                </div>
              </div>
            )
          })}
        </div>
      </DashboardLayout>
      
    </UserLayout>
  )
}

