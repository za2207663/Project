import CourseTable from "../components/CourseTable";
import { getCoursesWithStats } from "../actions";

export default async function AdminDashboard() {
  try {
    const courses = await getCoursesWithStats();

    return (
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Course Management</h2>
          <CourseTable courses={courses} />
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-6 text-red-600">
        Error loading dashboard: {error.message}
      </div>
    );
  }
}
