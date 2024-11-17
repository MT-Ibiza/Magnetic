import LoginForm from '@/app/components/login'
import React from 'react'

interface Props {}

function Page(props: Props) {
  const {} = props

  return (
    <div className="flex min-h-screen flex-col items-center justify-center lg:p-24">
      <img
        src="https://www.magnetic-travel.com/wp-content/uploads/2020/02/rsz_logo_mgtedit_.png"
        className="h-full w-[170px] mb-[30px]"
      />
      {/* {error.length > 0 && (
        <Text className="text-lg text-red-500 p-3 rounded mb-2">{error}</Text>
      )} */}
      <LoginForm/>
    </div>
  )
}

export default Page
