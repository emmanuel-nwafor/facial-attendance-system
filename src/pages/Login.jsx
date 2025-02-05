import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import login from "../assets/login.svg"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // Default to student
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); 
    setSuccess("");

    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess("Login successful! Redirecting to dashboard...");

      // Redirect based on role selected
      setTimeout(() => {
        if (role === "student") {
          navigate("/student-dashboard"); // Redirect to student dashboard
        } else {
          navigate("/lecturer-dashboard"); // Redirect to lecturer dashboard
        }
      }, 2000);
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-center bg-blue-50 p-6">
      <div className="w-full md:w-1/2 max-w-md p-6">
        <h2 className="text-2xl font-semibold text-blue-500">Welcome Back</h2>
        <p className="text-gray-400 mb-4">Login to continue</p>

        {/* Success Message */}
        {success && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-3 rounded-md mb-2 transition-opacity duration-300 opacity-100">
            {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-md mb-2 transition-opacity duration-300 opacity-100">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleLogin}>
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
            Login
          </button>
        </form>

        <div className="flex justify-between items-center ">
          <Link className="text-gray-600 text-sm mt-4 flex" to="/signup">
            Don't have an account? <p className="text-blue-500 hover:text-blue-700 hover:underline">Sign up</p>
          </Link>

          {/* Link to Lecturer Login page */}
          <Link  className=" hover:text-blue-700 hover:underline text-gray-600 text-sm mt-4 flex" to="/lecturer-login">
            Not a student? 
          </Link>
        </div>
      </div>

      <div className="md:flex md:w-1/2 justify-center">
        <img src={login} alt="Login" className="w-80 lg:w-96" />
      </div>
    </div>
  );
};

export default Login;
