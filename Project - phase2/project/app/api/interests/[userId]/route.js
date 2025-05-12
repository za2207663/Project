import { prisma } from "@/lib/db";

export async function GET(request, { params }) {
  try {
    const userId = Number(params.userId);

    const interests = await prisma.interest.findMany({
      where: { userId },
      include: {
        course: {
          select: {
            id: true,
            name: true,
            department: true,
            status: true,
          },
        },
      },
    });

    return Response.json(interests.map((i) => i.course));
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch user interests" },
      { status: 500 }
    );
  }
}
