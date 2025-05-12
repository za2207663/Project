import { prisma } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function POST(request) {
  try {
    const { courseId, name, description, category, collegeId, departmentId } =
      await request.json();

    const userId = request.headers.get("x-user-id");

    // Validate instructor
    const instructor = await prisma.user.findUnique({
      where: {
        id: Number(userId),
        role: "instructor",
        departmentId: { not: null },
      },
      select: { departmentId: true },
    });

    if (!instructor) {
      return Response.json(
        { error: "Unauthorized or invalid instructor" },
        { status: 401 }
      );
    }

    // Create new course with cleaned data
    const newCourse = await prisma.course.create({
      data: {
        id: uuidv4(),
        courseId,
        name,
        description,
        category,
        collegeId,
        departmentId,
      },
    });

    return Response.json(newCourse, { status: 201 });
  } catch (error) {
    console.error("Course creation failed:", error);
    return Response.json(
      {
        error:
          error.code === "P2002"
            ? "Course ID already exists"
            : "Failed to create course",
        details: error.message,
      },
      { status: 400 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const department = searchParams.get("department");
    const status = searchParams.get("status");

    const courses = await prisma.course.findMany({
      where: {
        department: department ? { name: department } : undefined,
        status: status || undefined,
      },
      include: {
        department: true,
        college: true,
      },
    });

    return Response.json(courses);
  } catch (error) {
    return Response.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}
