// import React, { act, use } from 'react'
// import UserLayout from '@/layout/UserLayout';
// import DashboardLayout from '@/layout/DashboardLayout';
// import styles from './index.module.css';
// import { connect, useDispatch } from 'react-redux';
// import { AcceptConnection, getMyConnectionRequests, getConnectionsRequest } from '@/config/redux/action/authAction';
// import { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { BASE_URL } from '@/config';
// import { useRouter } from 'next/router';
// import { connection } from 'next/server';

// export default function MyConnectionPage() {

//   const dispatch = useDispatch();

//   const authState = useSelector((state) => state.auth);

//   const router = useRouter();

//   useEffect(() => {
//     dispatch(getMyConnectionRequests({ token: localStorage.getItem("token") }));
//     dispatch(getConnectionsRequest({ token: localStorage.getItem("token") }));
//   }, [])

//   useEffect(() => {
//     if (authState.connectionRequest?.length != 0) {
//       console.log(authState.connectionRequest);
//     }
//   }, [authState.connectionRequest])

//   return (
//     <UserLayout>
//       <DashboardLayout>
//         <div style={{ display: "flex", flexDirection: "column", gap: "1.7rem" }}>
//           <h1>My Connections</h1>

//           {authState.connectionRequest?.length === 0 && <h3>No Connection Request Pending</h3>}

//           {authState.connectionRequest?.length != 0 && authState.connectionRequest?.filter((connection) => connection.status_accepted === null).map((user, index) => {
//             return (
//               <div onClick={() => {
//                 router.push(`/view_profile/${user.userId.username}`)
//               }} className={styles.userCard} key={index}>

//                 <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", justifyContent: "space-between" }}>
//                   <div className={styles.profilePicture}>
//                     <img src={`${BASE_URL}/${user.userId.profilePicture}`} alt='' />
//                   </div>

//                   <div className={styles.userInfo}>
//                     <h3>{user.userId.name}</h3>
//                     <p>{user.userId.username}</p>
//                   </div>

//                   <button onClick={(e) => {
//                     e.stopPropagation();
//                     dispatch(AcceptConnection({
//                       connectionId: user._id,
//                       token: localStorage.getItem("token"),
//                       action: "accept"
//                     }))
//                   }}
//                     className={styles.connectedButton}>Accept</button>
//                 </div>
//               </div>
//             )
//           })}


//           <h3>My Networks</h3>
//           {authState.connectionRequest?.filter((connection) => connection.status_accepted === true).map((user, index) => {
//             return (
//               <div onClick={() => {
//                 router.push(`/view_profile/${user.userId.username}`)
//               }} className={styles.userCard} key={index}>

//                 <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", justifyContent: "space-between" }}>
//                   <div className={styles.profilePicture}>
//                     <img src={`${BASE_URL}/${user.userId.profilePicture}`} alt='' />
//                   </div>

//                   <div className={styles.userInfo}>
//                     <h3>{user.userId.name}</h3>
//                     <p>{user.userId.username}</p>
//                   </div>

//                 </div>
//               </div>
//             )
//           })}
//           {authState.connections?.filter((connection) => connection.status_accepted === true).map((user, index) => {
//             return (
//               <div onClick={() => {
//                 router.push(`/view_profile/${user.connectionId.username}`)
//               }} className={styles.userCard} key={index}>

//                 <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", justifyContent: "space-between" }}>
//                   <div className={styles.profilePicture}>
//                     <img src={`${BASE_URL}/${user.connectionId.profilePicture}`} alt='' />
//                   </div>

//                   <div className={styles.userInfo}>
//                     <h3>{user.connectionId.name}</h3>
//                     <p>{user.connectionId.username}</p>
//                   </div>

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
import styles from './index.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AcceptConnection, getMyConnectionRequests, getConnectionsRequest } from '@/config/redux/action/authAction';
import { BASE_URL } from '@/config';
import { useRouter } from 'next/router';

function Avatar({ src, name }) {
  const initials = name
    ? name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
    : '?';

  if (src) {
    return (
      <div className={styles.avatar}>
        <img
          src={src}
          alt={name}
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      </div>
    );
  }
  return <div className={styles.avatarFallback}>{initials}</div>;
}

function UserRow({ name, username, picturePath, onClick, action }) {
  const src = picturePath ? `${BASE_URL}/${picturePath}` : null;

  return (
    <div className={styles.userCard} onClick={onClick}>
      <Avatar src={src} name={name} />
      <div className={styles.userInfo}>
        <span className={styles.userName}>{name}</span>
        <span className={styles.userHandle}>@{username}</span>
      </div>
      {action ?? <span className={styles.arrow}>›</span>}
    </div>
  );
}

export default function MyConnectionPage() {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    dispatch(getMyConnectionRequests({ token: localStorage.getItem('token') }));
    dispatch(getConnectionsRequest({ token: localStorage.getItem('token') }));
  }, []);

  const pending = authState.connectionRequest?.filter(
    (c) => c?.status_accepted === null && c?.userId
  ) ?? [];

  const receivedConnected = authState.connectionRequest?.filter(
    (c) => c?.status_accepted === true && c?.userId
  ) ?? [];

  const sentConnected = authState.connections?.filter(
    (c) => c?.status_accepted === true && c?.connectionId
  ) ?? [];

  return (
    <UserLayout>
      <DashboardLayout>
        <div className={styles.page}>

          {/* ── Pending Requests ── */}
          <p className={styles.sectionLabel}>Pending Requests</p>
          {pending.length === 0 ? (
            <p className={styles.empty}>No pending requests</p>
          ) : (
            <div className={styles.list}>
              {pending.map((user, i) => (
                <UserRow
                  key={i}
                  name={user.userId?.name}
                  username={user.userId?.username}
                  picturePath={user.userId?.profilePicture}
                  onClick={() => {
                    if (!user.userId?.username) return;
                    router.push(`/view_profile/${user.userId.username}`);
                  }}
                  action={
                    <button
                      className={styles.acceptBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(AcceptConnection({
                          connectionId: user._id,
                          token: localStorage.getItem('token'),
                          action: 'accept',
                        }));
                      }}
                    >
                      Accept
                    </button>
                  }
                />
              ))}
            </div>
          )}

          {/* ── My Network ── */}
          <p className={styles.sectionLabel}>My Network</p>
          {receivedConnected.length === 0 && sentConnected.length === 0 ? (
            <p className={styles.empty}>No connections yet</p>
          ) : (
            <div className={styles.list}>
              {receivedConnected.map((user, i) => (
                <UserRow
                  key={`recv-${i}`}
                  name={user.userId?.name}
                  username={user.userId?.username}
                  picturePath={user.userId?.profilePicture}
                  onClick={() => {
                    if (!user.userId?.username) return;
                    router.push(`/view_profile/${user.userId.username}`);
                  }}
                />
              ))}
              {sentConnected.map((user, i) => (
                <UserRow
                  key={`sent-${i}`}
                  name={user.connectionId?.name}
                  username={user.connectionId?.username}
                  picturePath={user.connectionId?.profilePicture}
                  onClick={() => {
                    if (!user.connectionId?.username) return;
                    router.push(`/view_profile/${user.connectionId.username}`);
                  }}
                />
              ))}
            </div>
          )}

        </div>
      </DashboardLayout>
    </UserLayout>
  );
}
