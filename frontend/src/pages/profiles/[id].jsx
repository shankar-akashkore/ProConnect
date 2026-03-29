// import { useRouter } from 'next/router'
// import { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import DashboardLayout from '@/layout/DashboardLayout'
// import UserLayout from '@/layout/UserLayout'
// import { clientServer, BASE_URL } from '@/config'
// import { sendConnectionRequest } from '@/config/redux/action/authAction'

// export default function UserProfile() {
//     const router = useRouter()
//     const { id } = router.query
//     const dispatch = useDispatch()
//     const authState = useSelector((state) => state.auth)
    

//     const [profile, setProfile] = useState(null)
//     const [posts, setPosts] = useState([])

//     useEffect(() => {
//         if (!id) return
//         fetchData()
//     }, [id])

//     const fetchData = async () => {
//         try {
//             const res = await clientServer.get(`/user/get_profile_based_on_username?username=${id}`)
//             setProfile(res.data.profile)
//             setPosts(res.data.posts || [])
//         } catch (err) {
//             console.error(err)
//         }
//     }

//     const handleConnect = () => {
//         dispatch(sendConnectionRequest({
//             token: localStorage.getItem('token'),
//             user_id: id
//         }))
//     }

//     if (!profile) return (
//         <UserLayout>
//             <DashboardLayout>
//                 <p style={{ padding: '2rem', color: '#888' }}>Loading...</p>
//             </DashboardLayout>
//         </UserLayout>
//     )

//     return (
//         <UserLayout>
//             <DashboardLayout>
//                 <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>

//                     {/* Header */}
//                     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
//                         <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
//                             <img
//                                 src={`${BASE_URL}/${profile.userId.profilePicture}`}
//                                 style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', border: '2px solid #eee' }}
//                             />
//                             <div>
//                                 <h2 style={{ margin: 0, fontSize: '1.2rem' }}>{profile.userId.name}</h2>
//                                 <p style={{ margin: 0, color: '#888', fontSize: '0.85rem' }}>@{profile.userId.username}</p>
//                                 <p style={{ margin: '4px 0 0', fontSize: '0.88rem', color: '#444' }}>{profile.bio}</p>
//                             </div>
//                         </div>

//                         <button onClick={handleConnect} style={{
//                             padding: '0.45rem 1.2rem',
//                             background: '#111',
//                             color: '#fff',
//                             border: 'none',
//                             borderRadius: '6px',
//                             fontSize: '0.85rem',
//                             fontWeight: 600,
//                             cursor: 'pointer'
//                         }}>
//                             Connect
//                         </button>
//                     </div>

//                     <hr style={{ borderColor: '#eee', marginBottom: '1.5rem' }} />

//                     {/* Work */}
//                     {profile.postWork?.length > 0 && (
//                         <>
//                             <h4 style={{ marginBottom: '0.8rem', color: '#aaa', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Work</h4>
//                             {profile.postWork.map((work, i) => (
//                                 <div key={i} style={{ marginBottom: '0.6rem' }}>
//                                     <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem' }}>{work.company}</p>
//                                     <p style={{ margin: 0, color: '#888', fontSize: '0.82rem' }}>{work.position} · {work.years}y</p>
//                                 </div>
//                             ))}
//                             <hr style={{ borderColor: '#eee', margin: '1.2rem 0' }} />
//                         </>
//                     )}

//                     {/* Posts */}
//                     <h4 style={{ marginBottom: '0.8rem', color: '#aaa', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Posts</h4>
//                     {posts.length === 0 && <p style={{ color: '#aaa', fontSize: '0.85rem' }}>No posts yet.</p>}
//                     {posts.map(post => (
//                         <div key={post._id} style={{
//                             padding: '1rem', border: '1px solid #eee',
//                             borderRadius: '8px', marginBottom: '0.8rem'
//                         }}>
//                             {post.media && post.media !== '' &&
//                                 <img src={`${BASE_URL}/${post.media}`}
//                                     style={{ width: '100%', borderRadius: '6px', marginBottom: '0.5rem', objectFit: 'cover' }} />
//                             }
//                             <p style={{ margin: 0, fontSize: '0.9rem', color: '#333' }}>{post.body}</p>
//                         </div>
//                     ))}
//                 </div>
//             </DashboardLayout>
//         </UserLayout>
//     )
// }







import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DashboardLayout from '@/layout/DashboardLayout'
import UserLayout from '@/layout/UserLayout'
import { clientServer, BASE_URL } from '@/config'
import { sendConnectionRequest } from '@/config/redux/action/authAction'
import styles from './userProfile.module.css'

export default function UserProfile() {
    const router = useRouter()
    const { id } = router.query
    const dispatch = useDispatch()
    const authState = useSelector((state) => state.auth)

    const [profile, setProfile] = useState(null)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        if (!id) return
        fetchData()
    }, [id])

    const fetchData = async () => {
        try {
            const res = await clientServer.get(`/user/get_profile_based_on_username?username=${id}`)
            setProfile(res.data.profile)
            setPosts(res.data.posts || [])
        } catch (err) {
            console.error(err)
        }
    }

    const handleConnect = () => {
        dispatch(sendConnectionRequest({
            token: localStorage.getItem('token'),
            user_id: profile.userId._id
        }))
    }

    if (!profile) return (
        <UserLayout>
            <DashboardLayout>
                <p className={styles.loading}>Loading...</p>
            </DashboardLayout>
        </UserLayout>
    )

    return (
        <UserLayout>
            <DashboardLayout>
                <div className={styles.container}>

                    {/* Banner */}
                    <div className={styles.banner}>
                        <div className={styles.avatarWrapper}>
                            <img
                                src={`${BASE_URL}/${profile.userId.profilePicture}`}
                                className={styles.avatar}
                                alt={profile.userId.name}
                                onError={(e) => { e.target.style.display = 'none' }}
                            />
                        </div>
                    </div>

                    {/* Identity */}
                    <div className={styles.identity}>
                        <div className={styles.nameRow}>
                            <div>
                                <h2 className={styles.name}>{profile.userId.name}</h2>
                                <span className={styles.username}>@{profile.userId.username}</span>
                            </div>
                            <button className={styles.connectBtn} onClick={handleConnect}>
                                Connect
                            </button>
                        </div>
                        {profile.bio && <p className={styles.bio}>{profile.bio}</p>}
                    </div>

                    <hr className={styles.divider} />

                    {/* Body */}
                    <div className={styles.body}>

                        {/* Activity */}
                        <div className={styles.col}>
                            <p className={styles.colLabel}>Activity</p>
                            {posts.length === 0 &&
                                <p className={styles.empty}>No posts yet.</p>
                            }
                            {posts.map((post) => (
                                <div key={post._id} className={styles.postRow}>
                                    {post.media && post.media !== '' &&
                                        <img
                                            className={styles.postThumb}
                                            src={`${BASE_URL}/${post.media}`}
                                            alt=""
                                        />
                                    }
                                    <p className={styles.postText}>{post.body}</p>
                                </div>
                            ))}
                        </div>

                        {/* Work */}
                        <div className={styles.col}>
                            <p className={styles.colLabel}>Work</p>
                            {(!profile.postWork || profile.postWork.length === 0) &&
                                <p className={styles.empty}>No work history.</p>
                            }
                            {profile.postWork && profile.postWork.map((work, index) => (
                                <div key={index} className={styles.workRow}>
                                    <div className={styles.workDot} />
                                    <div>
                                        <p className={styles.workCompany}>{work.company}</p>
                                        <p className={styles.workMeta}>{work.position} · {work.years}y</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </DashboardLayout>
        </UserLayout>
    )
}