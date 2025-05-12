"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import StatCard from "../components/StatsCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { isValidUser } from "../actions"; // ✅ import the server action

export default function StatsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true); // ✅ ADD THIS LINE

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);


  useEffect(() => {
    const validateAndFetch = async () => {
      if (status === "authenticated") {
        const ok = await isValidUser(session?.user?.email); // ✅ check user
        if (!ok) {
          router.push("/login");
          return;
        }

        try {
          const response = await fetch("/api/stats");
          if (!response.ok) throw new Error("Failed to fetch stats");
          const data = await response.json();

          const transformed = {
            totalCourses: data.deptCourseCounts.reduce((acc, curr) => acc + curr.count, 0),
            openCourses: data.courseStatusCounts.open || 0,
            closedCourses: data.courseStatusCounts.closed || 0,
            totalStudents: data.newStudentsByYear.reduce((acc, curr) => acc + curr.count, 0),
            mostPopular: data.mostPopularCourses,
            mostInterested: data.mostInterestedCourses,
            avgGrades: data.avgGradesPerDept,
            departments: data.deptCourseCounts,
            instructors: data.instructorsPerDept,
            newStudentsByYear: data.newStudentsByYear,
            completionRates: data.completionRates,
          };

          setStats(transformed);
          setLoadingStats(false);
        } catch (err) {
          setError("Failed to load statistics");
          setLoadingStats(false);
        }
      } else if (status === "unauthenticated") {
        router.push("/login");
      }
    };

    validateAndFetch();
  }, [status]);

  if (status === "loading" || !session || !stats) {
  return <LoadingSpinner />;
}


  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-maroon">System Statistics</h1>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Courses" value={stats.totalCourses} />
        <StatCard title="Open Courses" value={stats.openCourses} />
        <StatCard title="Closed Courses" value={stats.closedCourses} />
        <StatCard title="Total Students" value={stats.totalStudents} />
      </div>

      {/* Popular Courses Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Most Enrolled Courses */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Top Enrolled Courses</h2>
          <div className="space-y-2">
            {stats.mostPopular.map((course, index) => (
              <div key={course.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>{index + 1}. {course.name}</span>
                <span>{course.enrollmentCount} students</span>
              </div>
            ))}
          </div>
        </div>

        {/* Most Interested Courses */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Most Bookmarked Courses</h2>
          <div className="space-y-2">
            {stats.mostInterested.map((course, index) => (
              <div key={course.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>{index + 1}. {course.name}</span>
                <span>{course.interestCount} interests</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Department Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.departments.map((dept) => (
            <div key={dept.name} className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">{dept.name}</h3>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Courses:</span>
                  <span>{dept.count}</span>
                </div>
                <div className="flex justify-between">
                  <span>Instructors:</span>
                  <span>{stats.instructors.find(i => i.department === dept.name)?.count || 0}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Course Completion Rates */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Course Completion Rates</h2>
        <div className="space-y-2">
          {stats.completionRates.map((course) => (
            <div key={course.courseId} className="p-3 bg-gray-50 rounded">
              <div className="flex justify-between items-center mb-2">
                <span>{course.courseId}</span>
                <span className="font-semibold">{course.completionRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 rounded-full h-2"
                  style={{ width: `${course.completionRate}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* New Students per Year */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">New Students by Year</h2>
          <div className="grid grid-cols-2 gap-4">
            {stats.newStudentsByYear.map((year) => (
              <div key={year.year} className="p-3 bg-gray-50 rounded text-center">
                <div className="font-semibold">Year {year.year}</div>
                <div>{year.count} students</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
