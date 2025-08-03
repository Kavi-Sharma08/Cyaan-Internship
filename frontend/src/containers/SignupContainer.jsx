import React from 'react'

const SignupContainer = ({children}) => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#191724] to-[#24243e] px-2 sm:px-6 py-10">
      <div className="
        bg-[#232136]/95
        rounded-2xl
        shadow-2xl
        border border-[#393552]
        max-w-md w-full p-12
        ">
        {children}
      </div>
    </div>
  )
}

export default SignupContainer