import DashboardLayout from '@/layout/DashboardLayout'
import UserLayout from '@/layout/UserLayout'
import React from 'react'
import styles from './index.module.css';
import { BASE_URL, clientServer } from '@/config';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAboutUser } from '@/config/redux/action/authAction';
import { getAllPosts } from '@/config/redux/action/postAction';

export default function profile() {
    const authState = useSelector((state) => state.auth);
    const postReducer = useSelector((state) => state.post);

    const [userProfile, setUserProfile] = useState({});
    const [userPost, setUserPost] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputData, setInputData] = useState({ company: '', position: '', years: '' });

    const handleworkInputChange = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAboutUser({ token: localStorage.getItem("token") }))
        dispatch(getAllPosts())
    }, [])

    useEffect(() => {
        if (authState.user != undefined) {
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
        await clientServer.post("/update_profile_picture", formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        dispatch(getAboutUser({ token: localStorage.getItem("token") }));
    }

    const updateProfileData = async () => {
        await clientServer.post("/user_update", {
            token: localStorage.getItem("token"),
            name: userProfile.userId.name,
        });
        await clientServer.post("/update_profile_data", {
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

                        {/* Banner + Avatar */}
                        <div className={styles.banner}>
                            <label htmlFor="profilePictureUpload" className={styles.avatarLabel}>
                                <img
                                    src={`${BASE_URL}/${userProfile.userId.profilePicture}`}
                                    className={styles.avatar}
                                    alt="avatar"
                                />
                                <span className={styles.avatarHint}>Edit</span>
                            </label>
                            <input
                                hidden type="file" id="profilePictureUpload"
                                onChange={(e) => updateProfilePicture(e.target.files[0])}
                            />
                        </div>

                        {/* Identity */}
                        <div className={styles.identity}>
                            <div className={styles.nameRow}>
                                <input
                                    className={styles.nameInput}
                                    type="text"
                                    value={userProfile.userId.name}
                                    onChange={(e) =>
                                        setUserProfile({ ...userProfile, userId: { ...userProfile.userId, name: e.target.value } })
                                    }
                                />
                                <span className={styles.username}>@{userProfile.userId.username}</span>
                            </div>
                            <textarea
                                className={styles.bio}
                                value={userProfile.bio}
                                onChange={(e) => setUserProfile({ ...userProfile, bio: e.target.value })}
                                rows={Math.max(2, Math.ceil((userProfile.bio?.length || 0) / 80))}
                                placeholder="Short bio..."
                            />
                            {userProfile != authState.user &&
                                <button className={styles.saveBtn} onClick={updateProfileData}>Save changes</button>
                            }
                        </div>

                        <hr className={styles.divider} />

                        {/* Body */}
                        <div className={styles.body}>

                            {/* Activity */}
                            <div className={styles.col}>
                                <p className={styles.colLabel}>Activity</p>
                                {userPost.length === 0 &&
                                    <p className={styles.empty}>No posts yet.</p>
                                }
                                {userPost.map((post) => (
                                    <div key={post._id} className={styles.postRow}>
                                        {post.media !== "" &&
                                            <img className={styles.postThumb} src={`${BASE_URL}/${post.media}`} alt="" />
                                        }
                                        <p className={styles.postText}>{post.body}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Work */}
                            <div className={styles.col}>
                                <p className={styles.colLabel}>Work</p>
                                {userProfile.postWork.map((work, index) => (
                                    <div key={index} className={styles.workRow}>
                                        <div className={styles.workDot} />
                                        <div>
                                            <p className={styles.workCompany}>{work.company}</p>
                                            <p className={styles.workMeta}>{work.position} · {work.years}y</p>
                                        </div>
                                    </div>
                                ))}
                                <button className={styles.addBtn} onClick={() => setIsModalOpen(true)}>
                                    + Add position
                                </button>
                            </div>

                        </div>
                    </div>
                }

                {/* Modal */}
                {isModalOpen &&
                    <div className={styles.overlay} onClick={() => setIsModalOpen(false)}>
                        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                            <p className={styles.modalTitle}>Add position</p>
                            <input className={styles.field} onChange={handleworkInputChange}
                                name="company" type="text" placeholder="Company" />
                            <input className={styles.field} onChange={handleworkInputChange}
                                name="position" type="text" placeholder="Position" />
                            <input className={styles.field} onChange={handleworkInputChange}
                                name="years" type="number" placeholder="Years" />
                            <div className={styles.modalActions}>
                                <button className={styles.cancelBtn} onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button className={styles.confirmBtn} onClick={() => {
                                    setUserProfile({ ...userProfile, postWork: [...userProfile.postWork, inputData] });
                                    setIsModalOpen(false);
                                }}>Add</button>
                            </div>
                        </div>
                    </div>
                }
            </DashboardLayout>
        </UserLayout>
    )
}