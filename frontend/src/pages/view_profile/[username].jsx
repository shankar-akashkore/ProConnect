import React from 'react'
import { BASE_URL, clientServer } from '@/config';
import UserLayout from '@/layout/UserLayout';
import DashboardLayout from '@/layout/DashboardLayout';
import styles from './index.module.css';
import { getAllPosts } from '@/config/redux/action/postAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getConnectionsRequest, getMyConnectionRequests, sendConnectionRequest } from '@/config/redux/action/authAction';




export default function ViewProfile({ userProfile }) {
  const router = useRouter();
  // const postReducer = useSelector((state) => state.postReducer);
  const postReducer = useSelector((state) => state.post);

  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);
  const profileUser = userProfile?.userId;
  const workHistory = Array.isArray(userProfile?.postWork) ? userProfile.postWork : [];

  const [userPost, setUserPost] = useState([]);

  const [isCurrentUserInConnections, setIsCurrentUserInConnections] = useState(false);

  const [isConnectionNull, setIsConnectionNull] = useState(true);

  const getUsersPost = async () => {
    await dispatch(getAllPosts());
    await dispatch(getConnectionsRequest({ token: localStorage.getItem("token") }));
    await dispatch(getMyConnectionRequests({ token: localStorage.getItem("token") }));
  }

  useEffect(() => {
    let post = postReducer.posts.filter((post) => {
      return post?.userId?.username === router.query.username;
    })
    setUserPost(post);
  }, [postReducer.posts, router.query.username])


  useEffect(() => {
    if (!profileUser?._id) {
      return;
    }

    if (authState.connections?.some(user => user?.connectionId?._id === profileUser._id)) {
      setIsCurrentUserInConnections(true);
      if (authState.connections.find(user => user?.connectionId?._id === profileUser._id)?.status_accepted === true) {
        setIsConnectionNull(false);
      }
    }

    if (authState.connectionRequest?.some(user => user?.userId?._id === profileUser._id)) {
      setIsCurrentUserInConnections(true);
      if (authState.connectionRequest.find(user => user?.userId?._id === profileUser._id)?.status_accepted === true) {
        setIsConnectionNull(false);
      }
    }
  }, [authState.connections, authState.connectionRequest, profileUser?._id]);


  useEffect(() => {
    getUsersPost();
  }, [])




  return (
    <UserLayout>
      <DashboardLayout>
        <div className={styles.container}>
          <div className={styles.backDropContainer}>
            <img className={styles.backDrop} src={`${BASE_URL}/${profileUser?.profilePicture || ""}`} alt={profileUser?.name || "Profile"} />
          </div>

          <div className={styles.profileContainer_details}>
            <div className={styles.profileSummary}>
              <div className={styles.profileMain}>
                <div className={styles.profileHeading}>
                  <h2>{profileUser?.name}</h2>
                  <p style={{ color: "grey" }}>@{profileUser?.username}</p>

                </div>

                <div style={{display: "flex", alignItems: "center", gap:"1.2rem"}}>
                {isCurrentUserInConnections ?
                  <button className={styles.connectedButton}>{isConnectionNull ? "Pending" : "Connected"}</button>
                  :
                  <button onClick={() => {
                    if (!profileUser?._id) return;
                    dispatch(sendConnectionRequest({ token: localStorage.getItem("token"), user_id: profileUser._id }));
                  }}
                    className={styles.connectBtn}>Connect</button>
                }

                <div onClick={async () => {
                  if (!profileUser?._id) return;
                  const response = await clientServer.get(`/user/download_resume?id=${profileUser._id}`);
                  window.open(`${BASE_URL}/${response.data.message}`, "_blank");
                }}
                style={{cursor: "pointer"}}>
                  <svg style={{width: "1.3em"}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>

                </div>
                </div>

                <div className={styles.profileBio}>
                  <p>{userProfile?.bio}</p>
                </div>


              </div>
              <div className={styles.recentActivity}>
                <h3 className={styles.recentActivityTitle}>Recent Activity</h3>
                {userPost.map((post) => {
                  return (
                    <div key={post._id} className={styles.postCard}>
                      <div className={styles.card}>
                        <div className={styles.card_profileContainer}>
                          {post.media !== "" ? <img className={styles.card_profileContainer_image} src={`${BASE_URL}/${post.media}`} />
                            :
                            <div style={{ width: "3.4rem", height: "3.4rem" }}></div>}

                        </div>
                        <p>{post.body}</p>
                      </div>

                    </div>
                  )
                })}
              </div>

            </div>
          </div>

          <div className={styles.workHistory}>
            <h3>Work History</h3>

            <div className={styles.workHistoryContainer}>
              {
                workHistory.map((work, index) => {
                  return (
                    <div key={index} className={styles.workHistoryCard}>
                      <p style={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: "0.8rem"}}>{work.company} - {work.position}</p>
                      <p>{work.years}</p>

                    </div>
                  )
                })
              }

            </div>
          </div>


        </div>
      </DashboardLayout>
    </UserLayout>
  )
}

export async function getServerSideProps(context) {
  try {
    const request = await clientServer.get("/user/get_profile_based_on_username", {
      params: {
        username: context.query.username
      }
    });

    if (!request.data?.profile?.userId) {
      return { notFound: true };
    }

    return { props: { userProfile: request.data.profile } };
  } catch (error) {
    const statusCode = error.response?.status;

    if (statusCode === 404) {
      return { notFound: true };
    }

    return {
      props: {
        userProfile: null,
      },
    };
  }
}
