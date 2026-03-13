import React, { use } from 'react'
import { useSearchParams } from 'next/navigation';
import { BASE_URL, clientServer } from '@/config';
import UserLayout from '@/layout/UserLayout';
import DashboardLayout from '@/layout/DashboardLayout';
import styles from './index.module.css';

export default function ViewProfile({userProfile}) {

    const searchParams = useSearchParams();
  return (
    <UserLayout>
      <DashboardLayout>
        <div className={styles.container}>
          <div className={styles.backDropContainer}>
            <img className={styles.backDrop} src={`${BASE_URL}/${userProfile.userId.profilePicture}`}/>
          </div>

          <div className={styles.profileContainer_details}>
            <div style={{ display: "flex", gap: "0.7rem"}}>
              <div style={{flex: "0.8"}}>
                <div style={{ display: "flex", width: "fit-content", alignItems: "center"}}>

                </div>
              </div>
              <div style={{flex: "0.2"}}>

              </div>

            </div>

          </div>
        </div>
      </DashboardLayout>
    </UserLayout>
  )
}

export async function getServerSideProps(context) {

  console.log(context.query.username);

  const request = await clientServer.get("/user/get_profile_based_on_username", {
    params: {
      username: context.query.username
    }
  })

  const response = await request.data;
  console.log(response);

  return { props: {userProfile: request.data.profile} }
}
