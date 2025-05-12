import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const instructors = await prisma.user.findMany({
      where: { role: "instructor" },
      include: {
        department: true,
        college: true,
        interests: {
          include: {
            course: true,
          },
        },
      },
    });

    return Response.json(instructors);
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch instructors", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { username, name, password, departmentId, collegeId } =
      await request.json();

    const existing = await prisma.user.findUnique({
      where: { username },
    });

    if (existing) {
      return Response.json(
        { error: "Username already exists" },
        { status: 409 }
      );
    }

    const newInstructor = await prisma.user.create({
      data: {
        username,
        name,
        password,
        role: "instructor",
        departmentId: Number(departmentId),
        collegeId: Number(collegeId),
      },
    });

    return Response.json(newInstructor, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: "Failed to create instructor", details: error.message },
      { status: 400 }
    );
  }
}
