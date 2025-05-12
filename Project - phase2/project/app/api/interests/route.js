import { prisma } from "@/lib/db";

export async function POST(request) {
  try {
    const { courseId, userId } = await request.json();
    const numericUserId = Number(userId);

    const existing = await prisma.interest.findUnique({
      where: { courseId_userId: { courseId, userId: numericUserId } },
    });

    if (existing) {
      await prisma.interest.delete({
        where: { courseId_userId: { courseId, userId: numericUserId } },
      });
      return Response.json({ interested: false });
    }

    await prisma.interest.create({
      data: { courseId, userId: numericUserId },
    });
    return Response.json({ interested: true });
  } catch (error) {
    return Response.json(
      { error: "Failed to process interest" },
      { status: 500 }
    );
  }
}
