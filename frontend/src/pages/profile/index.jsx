import DashboardLayout from '@/layout/DashboardLayout'
import UserLayout from '@/layout/UserLayout'
import React, { use } from 'react'
import styles from './index.module.css';
import { BASE_URL, clientServer } from '@/config';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAboutUser } from '@/config/redux/action/authAction';
import { getAllPosts } from '@/config/redux/action/postAction';
import { current } from '@reduxjs/toolkit';

export default function profile() {

    const authState = useSelector((state) => state.auth);

    // const postReducer = useSelector((state) => state.postReducer);

    const postReducer = useSelector((state) => state.post);

    const [userProfile, setUserProfile] = useState({});

    const [userPost, setUserPost] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAboutUser({ token: localStorage.getItem("token") }))
        dispatch(getAllPosts())
    }, [])

    useEffect(() => {
        
        if(authState.user != undefined) {
            setUserProfile(authState.user)
            let post = postReducer.posts.filter((post) => {
                return post.userId.username === authState.user.userId.username;
            })
            setUserPost(post);
        }
        
    }, [authState.user, postReducer.posts])


    const updateProfilePicture = async (file) => {
      const formData = new FormData();
      formData.append("profile_picture", file);
      formData.append("token", localStorage.getItem("token"));

      const response = await clientServer.post("/update_profile_picture", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      dispatch(getAboutUser({ token: localStorage.getItem("token") }));
    }
    

    const updateProfileData = async() => {
      const request = await clientServer.post("/user_update", {
        token: localStorage.getItem("token"),
        name: userProfile.userId.name,
      });

      const response = await clientServer.post("/update_profile_data", {
        token: localStorage.getItem("token"),
        bio: userProfile.bio,
        currentPost: userProfile.currentPost,
        postWork: userProfile.postWork,
        education: userProfile.education
      });

      dispatch(getAboutUser({ token: localStorage.getItem("token") }));
    }


  return (
    <UserLayout>
        <DashboardLayout>
        {userProfile?.userId &&
        <div className={styles.container}>
          <div className={styles.backDropContainer}>
                <label htmlFor='profilePictureUpload' className={styles.backDrop_overlay}>
                    <p>
                        Edit
                    </p>
                </label>
                <input onChange={(e) => {
                  updateProfilePicture(e.target.files[0])
                }} hidden type='file' id='profilePictureUpload'/>
                <img src={`${BASE_URL}/${userProfile.userId.profilePicture}`} />
          </div>

          <div className={styles.profileContainer_details}>
            <div style={{ display: "flex", gap: "0.7rem" }}>
              <div style={{ flex: "0.8" }}>
                <div style={{ display: "flex", width: "fit-content", alignItems: "center", gap: "1.2rem" }}>
                  <input className={styles.nameEdit} 
                        type='text' 
                        value={userProfile.userId.name} 
                        onChange={(e) => {
                        setUserProfile({...userProfile, userId: {...userProfile.userId, name: e.target.value}})
                  }} />
                  <p style={{ color: "grey" }}>@{userProfile.userId.username}</p>

                </div>

                <div>
                  <textarea
                        value={userProfile.bio}
                        onChange={(e) => {
                          setUserProfile({ ...userProfile, bio: e.target.value});
                        }}
                        rows={Math.max(3, Math.ceil(userProfile.bio.length / 80))}
                        style={{ width: "100%" }}
                  />
                </div>


              </div>
              <div style={{ flex: "0.2" }}>
                <h3>Recent Activity</h3>
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
                userProfile.postWork.map((work, index) => {
                  return (
                    <div key={index} className={styles.workHistoryCard}>
                      <p style={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: "0.8rem"}}>{work.company} - {work.position}</p>
                      <p>{work.years}</p>

                    </div>
                  )
                })
              }

              <button className={styles.addWorkButton} onClick={() => {

              }}>
                Add Work
              </button>

            </div>
          </div>

          {userProfile != authState.user && 
              <div onClick={() => {
                updateProfileData();
              }} className={styles.connectionBtn}>Update Profile
                </div>}


        </div>
        }
        </DashboardLayout>
    </UserLayout>
  )
}
