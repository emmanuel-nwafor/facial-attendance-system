import React, { useState } from "react";

function LecturerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseDescription, setCourseDescription] = useState("");

  const handleCourseUpload = () => {
    if (!courseName || !courseCode) return;

    const newCourse = {
      id: Date.now(),
      name: courseName,
      code: courseCode,
      description: courseDescription,
    };

    setCourses([...courses, newCourse]);
    setCourseName("");
    setCourseCode("");
    setCourseDescription("");
  };

  return (
    <div className="flex bg-blue-50 min-h-screen">
      {/* Sidebar */}
      <div className={`fixed md:static bg-white w-64 min-h-screen p-5 shadow-lg transition-transform transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <i className="bx bxs-graduation text-blue-500"></i> Lecturer Panel
        </h2>
        <ul>
          <li className="mb-4 flex items-center gap-2">
            <i className="bx bx-home text-gray-600"></i>
            <a href="#" className="text-gray-700 hover:text-blue-500">Dashboard</a>
          </li>
          <li className="mb-4 flex items-center gap-2">
            <i className="bx bx-list-ul text-gray-600"></i>
            <a href="#" className="text-gray-700 hover:text-blue-500">Attendance Records</a>
          </li>
          <li className="mb-4 flex items-center gap-2">
            <i className="bx bx-time-five text-gray-600"></i>
            <a href="#" className="text-gray-700 hover:text-blue-500">Set Attendance Time</a>
          </li>
          <li className="mb-4 flex items-center gap-2">
            <i className="bx bx-upload text-gray-600"></i>
            <a href="#" className="text-gray-700 hover:text-blue-500">Upload Course</a>
          </li>
          <li className="mb-4 flex items-center gap-2">
            <i className="bx bx-log-out text-gray-600"></i>
            <a href="#" className="text-gray-700 hover:text-blue-500">Logout</a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Mobile Menu Button */}
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden text-2xl text-gray-600 mb-4">
          <i className="bx bx-menu"></i>
        </button>

        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Welcome, Lecturer</h1>
        <p className="text-gray-500 mb-6">Manage attendance, upload courses, and set attendance time.</p>

        {/* Upload Course Section */}
        <div className="bg-white p-6 shadow-md rounded-md mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <i className="bx bx-upload text-blue-500"></i> Upload Course
          </h2>
          <input
            type="text"
            placeholder="Course Name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md mb-2 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Course Code"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            className="w-full px-4 py-2 border rounded-md mb-2 focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Course Description"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-md mb-2 focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <button
            onClick={handleCourseUpload}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2"
          >
            <i className="bx bx-save"></i> Save Course
          </button>
        </div>

        {/* View Uploaded Courses */}
        <div className="bg-white p-6 shadow-md rounded-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <i className="bx bx-book text-blue-500"></i> Uploaded Courses
          </h2>
          {courses.length === 0 ? (
            <p className="text-gray-500">No courses uploaded yet.</p>
          ) : (
            <ul>
              {courses.map((course) => (
                <li key={course.id} className="mb-3 p-3 bg-gray-100 rounded-md">
                  <h3 className="font-semibold text-gray-800">{course.name} ({course.code})</h3>
                  <p className="text-gray-600">{course.description}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default LecturerDashboard;
