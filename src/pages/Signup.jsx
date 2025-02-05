<<<<<<< HEAD
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase"; // Assuming you have your Firebase config file
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import signup from "../assets/signup.svg"; 

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [role, setRole] = useState("student"); // Default to "student"
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(""); 
    setSuccess("");
    setShowPopup(false);

    if (password !== cpassword) {
      setError("Passwords do not match");
      setShowPopup(true);
      return;
    }

    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user details to Firestore with role
      await setDoc(doc(db, role === "lecturer" ? "lecturers" : "students", user.uid), {
        name: name,
        email: email,
        role: role,
        createdAt: new Date(),
      });

      setSuccess("Sign-up successful! Redirecting to login...");
      setShowPopup(true);

      // Redirect to login after 2 seconds to allow success message to show
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError("Error creating account. Please try again.");
      setShowPopup(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-center bg-blue-50 p-6">
      <div className="w-full md:w-1/2 max-w-md p-6">
        <h2 className="text-2xl font-semibold text-blue-500">Create an Account</h2>
        <p className="text-gray-400 mb-4">Sign up to get started</p>

        {/* Success Message */}
        {success && showPopup && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-3 rounded-md mb-2 transition-opacity duration-300 opacity-100">
            {success}
          </div>
        )}

        {/* Error Message */}
        {error && showPopup && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-md mb-2 transition-opacity duration-300 opacity-100">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSignUp}>
          <div>
            <label className="block text-gray-600">Name</label>
            <input 
              type="text" 
              placeholder="Full Name"
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-600">Email</label>
            <input 
              type="email" 
              placeholder="e.g johndoe@gmail.com"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-600">Password</label>
            <input 
              type="password" 
              placeholder="Password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-600">Confirm Password</label>
            <input 
              type="password" 
              placeholder="Confirm Password"
              value={cpassword} 
              onChange={(e) => setCPassword(e.target.value)} 
              required 
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 ${
                password !== cpassword && cpassword ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
              }`}
            />
            {password !== cpassword && cpassword && (
              <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
            )}
          </div>

          <div className="flex-col">
            <label className="block text-gray-600">
              Identity
            </label>
          <div className="flex">
          <div className="flex items-center m-1">
              <input 
                type="radio" 
                id="student" 
                name="role" 
                value="student" 
                checked={role === "student"}
                onChange={() => setRole("student")} 
              />
              <label htmlFor="student" className="ml-2">Student</label>
            </div>
            <div className="flex items-center m-1">
              <input 
                type="radio" 
                id="lecturer" 
                name="role" 
                value="lecturer" 
                checked={role === "lecturer"}
                onChange={() => setRole("lecturer")} 
              />
              <label htmlFor="lecturer" className="ml-2">Lecturer</label>
            </div>
          </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded-md text-lg hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <Link className="text-gray-600 text-sm mt-4 flex" to="/login">
            Already have an account? <p className="text-blue-500 hover:text-blue-700 hover:underline">Login</p>
        </Link>
      </div>

      {/* Signup image */}
      <div className="md:flex md:w-1/2 justify-center">
        <img src={signup} alt="SignUp" className="w-80 lg:w-96" />
      </div>
    </div>
  );
};

export default SignUp;
=======
import React from "react";

export default function Signup() {
  return (
    <>
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen flex flex-col justify-center items-center">
        <h1>Hello Signup</h1>
      </div>
    </>
  );
}
>>>>>>> bc64162c9c4bb2b553e9d211c0e1a1b7ee7ab9a5
