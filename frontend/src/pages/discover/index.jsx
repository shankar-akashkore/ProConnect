// import React, { use, useEffect } from 'react'
// import UserLayout from '@/layout/UserLayout';
// import DashboardLayout from '@/layout/DashboardLayout';
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { getAllUsers } from '@/config/redux/action/authAction';
// import styles from "./index.module.css";
// import { BASE_URL, clientServer } from '@/config';
// import { useRouter } from 'next/router';

// export default function DiscoverPage() {

//     const authState = useSelector((state) => state.auth);

//     const dispatch = useDispatch();

//     const router = useRouter();

//     useEffect(() => {
//         if(!authState.all_profiles_fetched){
//             dispatch(getAllUsers());
//         }
//     }, [])

//   return (
//     <UserLayout>

//       <DashboardLayout>
//         <h1>Discover Page</h1>

//         <div className={styles.allUserProfile}>
//           {authState.all_profiles_fetched && authState.all_users.map((user) => {
//             return (
//               <div onClick={() => {
//                 router.push(`/view_profile/${user.userId.username}`)
//               }} key={user._id} className={styles.userCard}>
//                 <img className={styles.userCard_image} src={`${BASE_URL}/${user.userId.profilePicture}`} alt='' />
//                 <div>
//                   <h3>{user.userId.name}</h3>
//                   <p>{user.userId.username}</p>
//                 </div>
//               </div>
//             )
//           })}
//         </div>
//       </DashboardLayout>
      
//     </UserLayout>
//   )
// }





import React, { useEffect } from 'react';
import UserLayout from '@/layout/UserLayout';
import DashboardLayout from '@/layout/DashboardLayout';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers } from '@/config/redux/action/authAction';
// import styles from './index.module.css';
import styles from "./index.module.css";
import { BASE_URL } from '@/config';
import { useRouter } from 'next/router';

function AvatarFallback({ name }) {
  const initials = name
    ? name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
    : '?';
  return <div className={styles.avatarFallback}>{initials}</div>;
}

function SkeletonList() {
  return (
    <div className={styles.skeleton}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className={styles.skeletonCard}>
          <div className={styles.skeletonAvatar} />
          <div className={styles.skeletonLines}>
            <div className={styles.skeletonLine} />
            <div className={styles.skeletonLine} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function DiscoverPage() {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!authState.all_profiles_fetched) {
      dispatch(getAllUsers());
    }
  }, []);

  return (
    <UserLayout>
      <DashboardLayout>
        <div className={styles.page}>
          <p className={styles.heading}>Discover People</p>

          {!authState.all_profiles_fetched ? (
            <SkeletonList />
          ) : authState.all_users.length === 0 ? (
            <p className={styles.empty}>No profiles found.</p>
          ) : (
            <div className={styles.allUserProfile}>
              {authState.all_users.map((user) => {
                const profilePic = user.userId.profilePicture
                  ? `${BASE_URL}/${user.userId.profilePicture}`
                  : null;

                return (
                  <div
                    key={user._id}
                    className={styles.userCard}
                    onClick={() => router.push(`/view_profile/${user.userId.username}`)}
                  >
                    {profilePic ? (
                      <img
                        className={styles.userCard_image}
                        src={profilePic}
                        alt={user.userId.name}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    ) : (
                      <AvatarFallback name={user.userId.name} />
                    )}

                    <div className={styles.userInfo}>
                      <span className={styles.userName}>{user.userId.name}</span>
                      <span className={styles.userHandle}>@{user.userId.username}</span>
                    </div>

                    <span className={styles.arrow}>›</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </DashboardLayout>
    </UserLayout>
  );
}