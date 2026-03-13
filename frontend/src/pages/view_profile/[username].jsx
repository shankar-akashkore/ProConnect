import React from 'react'
import { useSearchParams } from 'next/navigation';
import { BASE_URL, clientServer } from '@/config';
import UserLayout from '@/layout/UserLayout';
import DashboardLayout from '@/layout/DashboardLayout';
import styles from './index.module.css';
import { getAllPosts } from '@/config/redux/action/postAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getConnectionsRequest } from '@/config/redux/action/authAction';



export default function ViewProfile({userProfile}) {

    const searchParams = useSearchParams();

    const router = useRouter();
    // const postReducer = useSelector((state) => state.postReducer);
    const postReducer = useSelector((state) => state.post);
    const dispatch = useDispatch();

    const authState = useSelector((state) => state.auth);

    const [userPost, setUserPost] = useState([]);

    const [isCurrentUserInConnections, setIsCurrentUserInConnections] = useState(false);

    const getUsersPost = async () => {
      await dispatch(getAllPosts());
      await dispatch(getConnectionsRequest({token: localStorage.getItem("token")}));
    }

    useEffect(() => {
      let post = postReducer.posts.filter((post) => {
        return post.userId.username === router.query.username;
      })
      setUserPost(post);
    }, [postReducer.posts])


    useEffect(() => {
      console.log(authState.connections, userProfile.userId._id);
      if(authState.connections.some(user => user.connections._id === userProfile.userId._id)) {
        setIsCurrentUserInConnections(true);
      }
    },[authState.connections])


    useEffect(() => {
      getUsersPost();
    },[])




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
                <div style={{ display: "flex", width: "fit-content", alignItems: "center", gap: "1.2rem"}}>
                  <h2>{userProfile.userId.name}</h2>
                  <p style={{ color: "grey"}}>@{userProfile.userId.username}</p>

                </div>

                {isCurrentUserInConnections ? 
                <button className={styles.connectedButton}>Connected</button>
                :
                <button onClick={() => {
                  dispatch(getConnectionsRequest({token: localStorage.getItem("token"), userId: userProfile.userId._id}));
                }}
                className={styles.connectBtn}>Connect</button>
                }

                <div>
                  <p>{userProfile.bio}</p>
                </div>


              </div>
              <div style={{flex: "0.2"}}>
                <h3>Recent Activity</h3>
                {userPost.map((post) => {
                  return (
                    <div key={post._id} className={styles.postCard}>
                      <div className={styles.card}>
                        <div className={styles.card_profileContainer}>
                          {post.media !== "" ? <img className={styles.card_profileContainer_image} src={`${BASE_URL}/${post.media}`}/> 
                              : 
                              <div style={{width: "3.4rem", height: "3.4rem"}}></div>}

                        </div>
                        <p>{post.body}</p>
                      </div>

                    </div>
                  )
                })}
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
