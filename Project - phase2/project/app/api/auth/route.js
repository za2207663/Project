import { prisma } from "@/lib/repo";

export async function POST(req) {
  const { username, role } = await req.json();

  const user = await prisma.user.findFirst({
    where: {
      username,
      role,
    },
  });

  if (!user) {
    return new Response(JSON.stringify({ error: "Invalid credentials" }), {
      status: 401,
    });
  }

  return new Response(JSON.stringify(user));
}
