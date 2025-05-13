import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    // 1. Most popular courses
    const mostPopularCourses = await prisma.course.findMany({
      include: {
        enrollments: { select: { id: true } },
        department: true
      },
      orderBy: { enrollments: { _count: 'desc' } },
      take: 5
    });

    // 2. Average grades per department
    const departmentsWithGrades = await prisma.department.findMany({
      include: {
        courses: {
          include: {
            enrollments: {
              select: { grade: true },
              where: { grade: { not: null } }
            }
          }
        }
      }
    });

    const avgGradesPerDept = departmentsWithGrades.map(dept => {
      const grades = dept.courses.flatMap(c =>
        c.enrollments.map(e => e.grade)
      );
      const average = grades.length > 0
        ? grades.reduce((a, b) => a + b, 0) / grades.length
        : 0;
      return {
        department: dept.name,
        average: Number(average.toFixed(2))
      };
    });

    // 3. Course status counts
    const courseStatusCounts = await prisma.course.groupBy({
      by: ['status'],
      _count: { status: true }
    });

    // 4. Most interested courses
    const mostInterestedCourses = await prisma.course.findMany({
      include: { interests: true },
      orderBy: { interests: { _count: 'desc' } },
      take: 5
    });

    // 5. Instructors per department
    const instructorsPerDept = await prisma.department.findMany({
      include: {
        users: {
          where: { role: 'instructor' },
          select: { id: true }
        }
      }
    });

    // 6. Enrollment trends
    const enrollmentTrends = await prisma.enrollment.groupBy({
      by: ['courseId'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 5
    });

    // 7. Course Completion Rates
   // Get raw data
const allCompletionRates = await prisma.enrollment.groupBy({
  by: ['courseId'],
  _count: { id: true },
  _avg: { grade: true }
});

// Filter courses with passing grade
const completionRates = allCompletionRates.filter(
  course => course._avg.grade !== null && course._avg.grade >= 50
);

// NOW you can compute this:
const totalEnrollments = completionRates.reduce(
  (sum, course) => sum + course._count.id,
  0
);

// Then transform
const completionRateStats = completionRates.map(course => ({
  courseId: course.courseId,
  avgGrade: course._avg.grade ? course._avg.grade.toFixed(1) : "N/A",
  completionRate:
    totalEnrollments > 0
      ? ((course._count.id / totalEnrollments) * 100).toFixed(1)
      : "0.0"
}));


    // 8. Department course counts
    const deptCourseCounts = await prisma.department.findMany({
      select: {
        name: true,
        _count: {
          select: {
            courses: true
          }
        }
      },
      orderBy: {
        courses: {
          _count: 'desc'
        }
      }
    });

    const newStudentsByYear = await prisma.student.groupBy({
      by: ['year'],
      _count: { id: true },
      where: {
        createdAt: {
          gte: new Date(new Date().setFullYear(new Date().getFullYear() - 3))
        }
      },
      orderBy: {
        year: 'asc'
      }
    });
    // Transform data for response
    const responseData = {
      mostPopularCourses: mostPopularCourses.map(course => ({
        id: course.id,
        name: course.name,
        enrollmentCount: course.enrollments.length
      })),
      avgGradesPerDept,
      courseStatusCounts: Object.fromEntries(
        courseStatusCounts.map(c => [c.status, c._count.status])
      ),
      mostInterestedCourses: mostInterestedCourses.map(course => ({
        id: course.id,
        name: course.name,
        interestCount: course.interests.length
      })),
      instructorsPerDept: instructorsPerDept.map(dept => ({
        department: dept.name,
        count: dept.users.length
      })),
      enrollmentTrends: enrollmentTrends.map(trend => ({
        courseId: trend.courseId,
        count: trend._count.id
      })),
      completionRates: completionRateStats,
      
      deptCourseCounts: deptCourseCounts.map(dept => ({
        name: dept.name,
        count: dept._count.courses
      })),

      newStudentsByYear: newStudentsByYear.map(year => ({
        year: year.year,
        count: year._count.id
      })),
    };


    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error fetching statistics:", error);
    return NextResponse.json(
      { error: "Failed to fetch system statistics" },
      { status: 500 }
    );
  }
}