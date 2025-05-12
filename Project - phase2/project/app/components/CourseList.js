// components/CourseList.js
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CourseList({ initialCourses }) {
  const [courses, setCourses] = useState(initialCourses);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Get logged-in user ID from localStorage
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user.id);
    }
  }, []);

  const handleInterest = async (courseId) => {
    if (!userId) {
      alert("Please login first");
      return;
    }

    try {
      const response = await fetch("/api/interests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId,
          userId,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setCourses(
          courses.map((course) => {
            if (course.id === courseId) {
              return {
                ...course,
                interests: result.interested
                  ? [...course.interests, { userId }]
                  : course.interests.filter((i) => i.userId !== userId),
              };
            }
            return course;
          })
        );
      }
    } catch (error) {
      console.error("Interest update failed:", error);
      alert("Failed to update interest");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {courses.map((course) => {
        const isInterested = course.interests.some((i) => i.userId === userId);

        return (
          <div
            key={course.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-maroon">
                  {course.name}
                </h3>
                <p className="text-gray-600 mt-1">{course.description}</p>
              </div>
              <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                {course.category}
              </span>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-600">
                <p>Department: {course.department.name}</p>
                <p>
                  Status:
                  <span
                    className={`ml-2 px-2 py-1 rounded ${
                      course.status === "open"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {course.status}
                  </span>
                </p>
              </div>

              <button
                onClick={() => handleInterest(course.id)}
                className={`px-4 py-2 rounded-lg ${
                  isInterested
                    ? "bg-maroon text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {isInterested ? "Interested ✓" : "I'm Interested"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
