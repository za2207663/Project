import { prisma } from "@/lib/repo";

export async function POST(req) {
  try {
    const { studentId, courseId } = await req.json();

    const enrollment = await prisma.enrollment.create({
      data: {
        studentId: parseInt(studentId),
        courseId,
      },
    });

    return Response.json(enrollment);
  } catch (error) {
    return Response.json(
      { error: "Failed to create enrollment" },
      { status: 500 }
    );
  }
}
