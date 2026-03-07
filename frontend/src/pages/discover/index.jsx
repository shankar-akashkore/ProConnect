import React, { use, useEffect } from 'react'
import UserLayout from '@/layout/UserLayout';
import DashboardLayout from '@/layout/DashboardLayout';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAllUsers } from '@/config/redux/action/authAction';

export default function DiscoverPage() {

    const authState = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    useEffect(() => {
        if(!authState.all_profiles_fetched){
            dispatch(getAllUsers());
        }
    }, [])

  return (
    <UserLayout>

      <DashboardLayout>
        <h1>Discover Page</h1>
      </DashboardLayout>
      

    </UserLayout>
  )
}
