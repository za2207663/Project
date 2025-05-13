import { PrismaClient } from "@prisma/client";
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const courses = [
  {
    id: "CS101",
    name: "Intro to Programming",
    category: "Programming",
    department: "Computer Engineering",
    status: "open",
    college: "College of Engineering",
    description:
      "Covers the fundamental principles of programming languages, syntax, logic building, and problem-solving through coding.",
  },
  {
    id: "CS901",
    name: "Programming Concepts",
    category: "Programming",
    department: "Computer Engineering",
    status: "closed",
    college: "College of Engineering",
    description:
      "Focuses on key programming concepts including variables, control structures, functions, and data handling.",
  },
  {
    id: "CS102",
    name: "Data Structures",
    category: "Data Management",
    department: "Computer Engineering",
    status: "open",
    college: "College of Engineering",
    description:
      "Explores methods for organizing and managing data efficiently through structures like arrays, stacks, queues, and trees.",
  },
  {
    id: "CS103",
    name: "Web Development",
    category: "Web Design",
    department: "Computer Engineering",
    status: "open",
    college: "College of Engineering",
    description:
      "Provides an overview of website design, frontend development, and web technologies such as HTML, CSS, and JavaScript.",
  },
  {
    id: "CS104",
    name: "Database Systems",
    category: "Databases",
    department: "Computer Engineering",
    status: "open",
    college: "College of Engineering",
    description:
      "Focuses on database design, data modeling, and the use of SQL for managing relational databases.",
  },
  {
    id: "ENG201",
    name: "English Literature",
    category: "Literature",
    department: "Department of Languages",
    status: "open",
    college: "College of Arts",
    description:
      "Covers significant literary works and explores themes, genres, and historical contexts in English literature.",
  },
  {
    id: "ENG202",
    name: "Creative Writing",
    category: "Creative Writing",
    department: "Department of Languages",
    status: "open",
    college: "College of Arts",
    description:
      "Introduces creative writing techniques with a focus on narrative development, style, and expression.",
  },
  {
    id: "ART301",
    name: "Modern Art History",
    category: "Art History",
    department: "Department of Fine Arts",
    status: "open",
    college: "College of Arts",
    description:
      "Examines the development of modern art movements and their influence on contemporary artistic practices.",
  },
  {
    id: "ART302",
    name: "Photography Basics",
    category: "Photography",
    department: "Department of Fine Arts",
    status: "open",
    college: "College of Arts",
    description:
      "Covers photography fundamentals including composition, lighting, and camera techniques.",
  },
  {
    id: "BUS101",
    name: "Principles of Marketing",
    category: "Marketing",
    department: "Department of Business",
    status: "open",
    college: "College of Business",
    description:
      "Explores the basic principles of marketing strategies, consumer behavior, and market research.",
  },
  {
    id: "BUS102",
    name: "Financial Accounting",
    category: "Finance",
    department: "Department of Business",
    status: "open",
    college: "College of Business",
    description:
      "Introduces financial accounting concepts, financial statements, and reporting standards.",
  },
  {
    id: "BUS103",
    name: "Business Ethics",
    category: "Ethics",
    department: "Department of Business",
    status: "open",
    college: "College of Business",
    description:
      "Examines ethical issues in business decision-making and corporate responsibility.",
  },
  {
    id: "BUS104",
    name: "Entrepreneurship",
    category: "Entrepreneurship",
    department: "Department of Business",
    status: "open",
    college: "College of Business",
    description:
      "Focuses on business creation, innovation strategies, and management of startup ventures.",
  },
  {
    id: "MED101",
    name: "Introduction to Medicine",
    category: "Medicine Basics",
    department: "Department of Medical Sciences",
    status: "open",
    college: "College of Medicine",
    description:
      "Provides an overview of medical science, healthcare systems, and patient care practices.",
  },
  {
    id: "MED102",
    name: "Human Anatomy",
    category: "Anatomy",
    department: "Department of Medical Sciences",
    status: "open",
    college: "College of Medicine",
    description:
      "Focuses on the structure of the human body including systems, organs, and tissues.",
  },
  {
    id: "MED103",
    name: "First Aid",
    category: "First Aid",
    department: "Department of Medical Sciences",
    status: "open",
    college: "College of Medicine",
    description:
      "Covers essential emergency response skills for handling injuries and medical situations.",
  },
  {
    id: "MED104",
    name: "Clinical Skills",
    category: "Clinical Skills",
    department: "Department of Medical Sciences",
    status: "open",
    college: "College of Medicine",
    description:
      "Introduces clinical practices including patient communication, diagnostics, and basic medical procedures.",
  },
  {
    id: "ENG301",
    name: "Mechanical Engineering Basics",
    category: "Mechanics",
    department: "Mechanical Engineering",
    status: "open",
    college: "College of Engineering",
    description:
      "Provides foundational knowledge of mechanical systems, energy transfer, and applied mechanics.",
  },
  {
    id: "ENG302",
    name: "Electrical Circuits",
    category: "Circuits",
    department: "Electrical Engineering",
    status: "open",
    college: "College of Engineering",
    description:
      "Explores electrical circuit theory, components, and practical circuit design.",
  },
  {
    id: "ENG303",
    name: "Thermodynamics",
    category: "Thermodynamics",
    department: "Mechanical Engineering",
    status: "open",
    college: "College of Engineering",
    description:
      "Covers energy systems, heat transfer, and thermodynamic processes in engineering.",
  },
  {
    id: "ENG304",
    name: "Control Systems",
    category: "Control Systems",
    department: "Electrical Engineering",
    status: "open",
    college: "College of Engineering",
    description:
      "Focuses on system modeling, feedback control, and automation principles.",
  },
];

const admins = [
  {
    username: "admin1",
    password: "admin1",
    name: "Dean Mike",
    college: "College of Engineering",
  },
  {
    username: "admin2",
    password: "admin456",
    name: "Dr. Layla",
    college: "College of Arts",
  },
];

const instructors = [
  {
    username: "instructor1",
    password: "pass123",
    name: "John Doe",
    college: "College of Engineering",
    department: "Computer Engineering",
    interests: [],
  },
  {
    username: "instructor2",
    password: "abc123",
    name: "Sarah Ahmed",
    college: "College of Arts",
    department: "Department of Languages",
    interests: [],
  },
  {
    username: "instructor3",
    password: "eng789",
    name: "Ali Mansoor",
    college: "College of Engineering",
    department: "Electrical Engineering",
    interests: [],
  },
  {
    username: "instructor4",
    password: "art555",
    name: "Layla Hassan",
    college: "College of Arts",
    department: "Department of Fine Arts",
    interests: [],
  },

  {
    username: "instructor5",
    password: "bus111",
    name: "Mohammed Said",
    college: "College of Business",
    department: "Department of Business",
    interests: [],
  },
  {
    username: "instructor6",
    password: "med222",
    name: "Aisha Salim",
    college: "College of Medicine",
    department: "Department of Medical Sciences",
    interests: [],
  },
  {
    username: "instructor7",
    password: "instructor7",
    name: "Omar Yousuf",
    college: "College of Engineering",
    department: "Mechanical Engineering",
    interests: [],
  },
];

async function main() {

  await prisma.$transaction([
    prisma.enrollment.deleteMany(), // 🧑‍🎓 depends on course
    prisma.interest.deleteMany(),   // ✅ depends on course
    prisma.course.deleteMany(),     // ✅ now safe
    prisma.user.deleteMany(),
    prisma.student.deleteMany(),    // student might be optional if not yet added
    prisma.department.deleteMany(),
    prisma.college.deleteMany(),
  ]);

  // Create Colleges
  const collegeData = [
    ...new Set([
      ...courses.map((c) => c.college),
      ...admins.map((a) => a.college),
      ...instructors.map((i) => i.college),
    ]),
  ].map((name) => ({ name }));

  const createdColleges = await prisma.college.createMany({
    data: collegeData,
  });

  // Create Departments
  const departmentData = courses
    .filter(
      (c, i, arr) => arr.findIndex((cc) => cc.department === c.department) === i
    )
    .map((c) => ({
      name: c.department,
      college: c.college,
    }));
  const createdDepartments = [];

  for (const dept of departmentData) {
    const newDept = await prisma.department.create({
      data: {
        name: dept.name,
        college: { connect: { name: dept.college } },
      },
    });
    createdDepartments.push(newDept);
  }


  // Create Courses
  for (const course of courses) {
    const department = await prisma.department.findFirst({
      where: {
        name: course.department,
        college: { name: course.college },
      },
    });

    await prisma.course.create({
      data: {
        id: course.id,
        name: course.name,
        category: course.category,
        status: course.status,
        description: course.description,
        departmentId: department.id,
        collegeId: department.collegeId,
      },
    });
  }

  // Create Admins
  for (const admin of admins) {
    const college = await prisma.college.findUnique({
      where: { name: admin.college },
    });

    await prisma.user.create({
      data: {
        username: admin.username,
        password: admin.password,
        name: admin.name,
        role: "admin",
        collegeId: college.id,
      },
    });
  }

  // Create Instructors
  for (const instructor of instructors) {
    const department = await prisma.department.findFirst({
      where: {
        name: instructor.department,
        college: { name: instructor.college },
      },
    });

    await prisma.user.create({
      data: {
        username: instructor.username,
        password: instructor.password,
        name: instructor.name,
        role: "instructor",
        departmentId: department.id,
        collegeId: department.collegeId,
      },
    });
  }

  console.log("Database seeded successfully!");

  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  // Create 500 students

  for (let i = 0; i < 500; i++) {
    const dept = createdDepartments[Math.floor(Math.random() * createdDepartments.length)];

    await prisma.student.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email({ provider: "student.edu" }),
        year: years[Math.floor(Math.random() * years.length)],
        departmentId: dept.id,
      },
    });
  }
// Create enrollments (e.g., 1000 random enrollments)
const allStudents = await prisma.student.findMany();
const allCourses = await prisma.course.findMany();

for (let i = 0; i < 1000; i++) {
  const student = allStudents[Math.floor(Math.random() * allStudents.length)];
  const course = allCourses[Math.floor(Math.random() * allCourses.length)];

  await prisma.enrollment.create({
    data: {
      studentId: student.id,
      courseId: course.id,
      grade: Math.floor(Math.random() * 61) + 40, // random grade between 40–100
    },
  });
}

}

//Create Students
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });