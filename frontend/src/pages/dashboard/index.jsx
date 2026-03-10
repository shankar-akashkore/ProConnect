import React from 'react'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { createPost, getAllPosts } from '@/config/redux/action/postAction';
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

  const postState = useSelector((state) => state.post);

  

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

  const [postContent, setPostContent] = useState("");

  const [fileContent, setFileContent] = useState();

  const handleUpload = async () => {
    await dispatch(createPost({file: fileContent, body: postContent}));
    setPostContent("");
    setFileContent(null);
  }

  if(authState.user) {

  return (
    <UserLayout>

      <DashboardLayout>
        <div className={styles.scrollComponnt}>

          <div className={styles.wrapper}>
          <div className={styles.createPostContainer}>
            <img className={styles.userProfile} src={`${BASE_URL}/${authState?.user?.userId?.profilePicture}`} alt=''/>

            <textarea onChange={(e) => setPostContent(e.target.value)} value={postContent} className={styles.textareaOfContent} placeholder={"What's in your mind?"}name='' id='' ></textarea>

            <label htmlFor='fileUpload'>
              <div className={styles.Fab}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
            </label>

            <input onChange={(e) => setFileContent(e.target.files[0])} type='file' hidden id='fileUpload' />
            {postContent.length > 0 &&
            <div onClick={handleUpload} className={styles.uploadButton}>
            Post
            </div>
            }
          </div>

          <div className={styles.postContainer}>
            {postState.posts.map((post) => {
              return (
              <div key={post._id} className={styles.singleCard}>

                <div className={styles.singleCard_profile}>
                  <img className={styles.singleCard_profile_img} src={`${BASE_URL}/${post?.userId?.profilePicture}`} alt=''/> <br></br>
                  <span>{post?.userId?.name}</span>

                </div>
                
            </div>
            );
            })}
          </div>
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
