"use client";

export default function CourseTable({ courses }) {
  return (
    <div className="rounded-lg border overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">Course Code</th>
            <th className="px-4 py-3 text-left">Course Name</th>
            <th className="px-4 py-3 text-left">Department</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Enrollments</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3">{course.id}</td>
              <td className="px-4 py-3">{course.name}</td>
              <td className="px-4 py-3">{course.department.name}</td>
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 rounded ${
                    course.status === "open"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {course.status}
                </span>
              </td>
              <td className="px-4 py-3">{course.enrollments.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
