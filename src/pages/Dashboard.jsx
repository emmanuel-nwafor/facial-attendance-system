import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase"; // Firebase import
import { collection, getDocs, addDoc } from "firebase/firestore";
import Logout from "../components/Logout";

const Dashboard = () => {
  const [regNumber, setRegNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch available courses from Firestore
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        const coursesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCourses(coursesList);
      } catch (error) {
        console.error("Error fetching courses: ", error);
      }
    };

    fetchCourses();
  }, []);

  // Handle attendance submission
  const handleMarkAttendance = async (e) => {
    e.preventDefault();

    if (!selectedCourse) {
      alert("Please select a course before marking attendance.");
      return;
    }

    if (!regNumber || !department || !level) {
      alert("All fields are required.");
      return;
    }

    const attendanceData = {
      regNumber,
      department,
      level,
      courseName: selectedCourse.courseName,
      lecturerName: selectedCourse.lecturerName,
      timestamp: new Date(),
    };

    try {
      await addDoc(collection(db, "attendance"), attendanceData);
      setAttendanceMarked(true);
      setTimeout(() => setAttendanceMarked(false), 3000);
    } catch (error) {
      console.error("Error marking attendance: ", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-blue-50">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md p-6 transition-all md:block z-10 ${sidebarOpen ? "block" : "hidden"}`}>
        <h2 className="text-2xl font-semibold text-blue-500 mb-6">Student Panel</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link to="/student-dashboard" className="flex items-center text-gray-700 hover:text-blue-500">
                <i className="bx bx-home text-xl"></i> <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/attendance-history" className="flex items-center text-gray-700 hover:text-blue-500">
                <i className="bx bx-history text-xl"></i> <span>Attendance History</span>
              </Link>
            </li>
            <li>
              <Logout />
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 p-8 md:ml-64 lg:ml-64 transition-all ${sidebarOpen ? "" : "ml-0"}`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">Welcome, Student</h1>
            <p className="text-gray-500 mb-6">Find your course and mark attendance.</p>
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden text-2xl text-gray-600">
            &#9776;
          </button>
        </div>

        {/* Course Search */}
        <div className="bg-white p-6 shadow-md rounded-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Search for Available Courses</h2>
          <input
            type="text"
            placeholder="Search by course name or lecturer name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <div className="max-h-60 overflow-y-auto">
            {courses
              .filter((course) =>
                course.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.lecturerName.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((course) => (
                <div
                  key={course.id}
                  className={`p-3 border rounded-md mb-2 cursor-pointer ${selectedCourse?.id === course.id ? "bg-blue-100" : "hover:bg-gray-100"}`}
                  onClick={() => setSelectedCourse(course)}
                >
                  <p className="text-gray-800 font-semibold">{course.courseName}</p>
                  <p className="text-gray-600 text-sm">Lecturer: {course.lecturerName}</p>
                </div>
              ))}
          </div>
        </div>

        {/* Attendance Marking */}
        {selectedCourse && (
          <div className="bg-white p-6 shadow-md rounded-md mt-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Mark Attendance for {selectedCourse.courseName}</h2>
            <form onSubmit={handleMarkAttendance} className="space-y-4">
              <div>
                <label className="block text-gray-600">Registration Number</label>
                <input
                  type="text"
                  placeholder="Enter your Reg. Number"
                  value={regNumber}
                  onChange={(e) => setRegNumber(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600">Department</label>
                <input
                  type="text"
                  placeholder="Enter your Department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600">Level</label>
                <input
                  type="text"
                  placeholder="Enter your Level (e.g., 100, 200, 300)"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md text-lg hover:bg-blue-600 transition duration-300"
              >
                Mark Attendance
              </button>
            </form>

            {attendanceMarked && (
              <div className="mt-4 p-3 bg-green-100 border-l-4 border-green-500 text-green-700 rounded-md">
                Attendance marked successfully!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
