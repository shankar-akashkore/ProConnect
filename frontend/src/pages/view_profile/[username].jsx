import React, { use } from 'react'
import { useSearchParams } from 'next/navigation';
import { clientServer } from '@/config';

export default function ViewProfile({userProfile}) {

    const searchParams = useSearchParams();
  return (
    <div>{userProfile.userId.name}</div>
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
