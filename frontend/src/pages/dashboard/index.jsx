import React from 'react'
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Dashboard() {

    const router = useRouter();
    
    useEffect(() => {
        if(localStorage.getItem('token') === null) {
            router.push('/login')
        }
    })
  return (
    <div>Dashboard</div>
  )
}
