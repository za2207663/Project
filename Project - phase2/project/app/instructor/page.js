"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function InstructorPage() {
  const [courses, setCourses] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCourse, setNewCourse] = useState({
    id: "",
    name: "",
    description: "",
    category: "Programming",
    status: "open",
    departmentId: "",
    collegeId: "",
  });
  const [currentUser, setCurrentUser] = useState(null);

  // Fix hydration by moving localStorage access to useEffect
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user);
  }, []);

  // Load courses after user is set
  useEffect(() => {
    if (!currentUser?.id) return;

    const loadData = async () => {
      try {
        const [coursesRes, interestsRes] = await Promise.all([
          fetch("/api/courses?status=open"),
          fetch(`/api/interests/${currentUser.id}`),
        ]);

        const [courses, interests] = await Promise.all([
          coursesRes.json(),
          interestsRes.json(),
        ]);

        setCourses(
          courses.map((course) => ({
            ...course,
            isInterested: interests.some((i) => i.id === course.id),
          }))
        );
      } catch (error) {
        alert("Failed to load courses");
      }
    };

    loadData();
  }, [currentUser]);

  const toggleInterest = async (courseId) => {
    try {
      setCourses(
        courses.map((course) =>
          course.id === courseId
            ? { ...course, isInterested: !course.isInterested }
            : course
        )
      );

      await fetch("/api/interests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, userId: currentUser.id }),
      });
    } catch {
      alert("Failed to update interest");
      setCourses(courses); // Revert on error
    }
  };

  const createCourse = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": currentUser.id,
        },
        body: JSON.stringify(newCourse),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }

      const createdCourse = await response.json();
      setCourses([
        ...courses,
        {
          ...createdCourse,
          isInterested: false,
          department: currentUser.department, // Add department info
        },
      ]);
      setShowCreateForm(false);
      setNewCourse({
        id: "",
        name: "",
        description: "",
        category: "Programming",
      });
    } catch (error) {
      alert(error.message);
    }
  };

  if (!currentUser) {
  return (
    <div className="p-6 text-center">
      <p className="text-red-600">Please login first</p>
      <Link href="/login" className="text-blue-600 underline mt-4 block">
        Go to Login
      </Link>
    </div>
  );
}

if (currentUser.role !== "instructor") {
  return (
    <div className="p-6 text-center">
      <p className="text-red-600">Access denied: Only instructors can view this page.</p>
      <Link href="/login" className="text-blue-600 underline mt-4 block">
        Go to Login
      </Link>
    </div>
  );
}

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-maroon">
          Welcome, {currentUser.name}
        </h1>
        <div className="space-x-4">
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Create Course
          </button>
          <Link href="/stats" className="text-blue-600 hover:underline">
            Statistics
          </Link>
          <Link href="/login" className="text-red-600 hover:underline">
            Logout
          </Link>
        </div>
      </header>

      {/* Conditional Course Creation Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Create New Course</h2>
            <form onSubmit={createCourse}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Course ID
                  </label>
                  <input
                    required
                    className="w-full p-2 border rounded"
                    value={newCourse.id}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, id: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Course Name
                  </label>
                  <input
                    required
                    className="w-full p-2 border rounded"
                    value={newCourse.name}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    className="w-full p-2 border rounded"
                    value={newCourse.description}
                    onChange={(e) =>
                      setNewCourse({
                        ...newCourse,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Category
                  </label>
                  <select
                    className="w-full p-2 border rounded"
                    value={newCourse.category}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, category: e.target.value })
                    }
                  >
                    <option value="Programming">Programming</option>
                    <option value="Theory">Theory</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Systems">Systems</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Status
                  </label>
                  <select
                    className="w-full p-2 border rounded"
                    value={newCourse.status}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, status: e.target.value })
                    }
                  >
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Department ID
                  </label>
                  <input
                    required
                    className="w-full p-2 border rounded"
                    value={newCourse.departmentId}
                    onChange={(e) =>
                      setNewCourse({
                        ...newCourse,
                        departmentId: parseInt(e.target.value),
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    College ID
                  </label>
                  <input
                    required
                    className="w-full p-2 border rounded"
                    value={newCourse.collegeId}
                    onChange={(e) =>
                      setNewCourse({
                        ...newCourse,
                        collegeId: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-maroon text-white rounded-lg hover:bg-maroon-dark"
                >
                  Create Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Course List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <article
            key={course.id}
            className="border rounded-lg p-4 hover:shadow-lg"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{course.name}</h3>
                <p className="text-gray-600 text-sm mt-1">
                  {course.description}
                </p>
              </div>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                {course.category}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm">
                <p>Department: {course.department?.name || "N/A"}</p>
                <p
                  className={`inline-block px-2 ${
                    course.status === "open"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {course.status}
                </p>
              </div>

              <button
                onClick={() => toggleInterest(course.id)}
                className={`px-4 py-2 rounded-lg ${
                  course.isInterested
                    ? "bg-maroon text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {course.isInterested ? "Interested ✓" : "Show Interest"}
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
