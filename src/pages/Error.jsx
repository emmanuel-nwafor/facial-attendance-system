import React from 'react'
import errorAlert from "../assets/error.svg";

function Error() {
  return (
    <>
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-blue-50 p-6">
      <img src={errorAlert} alt="" />
        <h1 className=" text-center m-5 text-xl bg-red-500 p-2 rounded text-white">
           Hmm. We’re having trouble finding that site.
        </h1>
      </div>
    </>
  )
}

export default Error
