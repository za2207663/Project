"use server";
import { prisma } from "@/lib/repo";
import { redirect } from "next/navigation";

export const authenticateUser = async (formData) => {
  try {
    const rawFormData = {
      username: formData.get("username"),
      password: formData.get("password"),
      role: formData.get("role"),
    };

    // Validate input
    if (!rawFormData.username || !rawFormData.password || !rawFormData.role) {
      return { error: "All fields are required" };
    }

    // Find user in database
    const user = await prisma.user.findUnique({
      where: { username: rawFormData.username },
      select: {
        id: true,
        username: true,
        password: true,
        role: true,
        collegeId: true,
        departmentId: true,
      },
    });

    // Verify credentials
    if (!user || user.password !== rawFormData.password) {
      return { error: "Invalid credentials" };
    }

    // Verify role
    if (user.role !== rawFormData.role) {
      return { error: "Invalid role selection" };
    }

    // Return user data without password
    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword };
  } catch (error) {
    console.error("Authentication error:", error);
    return { error: "Failed to authenticate user" };
  }
};

// Course-related queries
export const getCoursesWithStats = async () => {
  return prisma.course.findMany({
    include: {
      department: true,
      enrollments: {
        select: {
          id: true,
          grade: true,
        },
      },
      interests: true,
    },
  });

};


// Checks if user with this email exists in DB
export async function isValidUser(email) {
  if (!email) return false;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  return !!user; // true if user exists, false otherwise
}

export const logoutUser = async () => {
  try {
    // Clear client-side storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("currentUser");
    }
    redirect("/login");
  } catch (error) {
    console.error("Logout error:", error);
    return { error: "Failed to logout" };
  }
};