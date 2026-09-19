import React from 'react'
import SignupLeft from '../../../features/auth/components/signup/SignupLeft'
import SignupForm from '../../../features/auth/components/signup/SignupForm'

const page = () => {
    return (
        <div className='w-full min-h-screen text-white flex items-center justify-center '>
            <SignupForm />
        </div>
    )
}

export default page
