import React from 'react'
import UserLayout from '@/layout/UserLayout';
import DashboardLayout from '@/layout/DashboardLayout';

export default function MyConnectionPage() {
  return (
        <UserLayout>
            <DashboardLayout>
                <h1>My Connections Page</h1>
            </DashboardLayout>
        </UserLayout>
  )
}
