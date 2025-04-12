// Global instructors variable (used for hover if needed later)
let instructors = [];
function filterByInterest(withInterest) {
  const interests = JSON.parse(localStorage.getItem("interests")) || [];
  const rows = document.querySelectorAll("tbody tr");

  rows.forEach(row => {
    const courseId = row.querySelector("button").getAttribute("onclick").split("'")[1];
    const hasInterest = interests.some(i => i.courseId === courseId);

    if ((withInterest && hasInterest) || (!withInterest && !hasInterest)) {
      row.style.display = "table-row";
    } else {
      row.style.display = "none";
    }
  });
}


async function loadCoursesWithInterests() {
  try {
    const username = localStorage.getItem("username");

    const adminRes = await fetch('./data/admins.json');
    const admins = await adminRes.json();

    const admin = admins.find(a => a.username === username);
    if (!admin) throw new Error("Admin not found");

    const adminCollege = admin.college;

    const courseRes = await fetch('./data/courses.json');
    const courses = await courseRes.json();

    instructors = await (await fetch('./data/instructors.json')).json();

    const container = document.getElementById("course-list");
    container.innerHTML = "";
    // Extract unique categories from courses
    const categorySet = new Set();
    courses.forEach(course => {
      if (course.status === 'open' && course.college === adminCollege) {
        categorySet.add(course.category);
      }
    });

    // Generate <option> elements dynamically
    const categoryFilter = document.getElementById("categoryFilter");
    categoryFilter.innerHTML = `<option value="">All Categories</option>`;

    categorySet.forEach(category => {
      categoryFilter.innerHTML += `<option class="filter" value="${category}">${category}</option>`;
    });

    courses.forEach(course => {
      if (course.status !== 'open' || course.college !== adminCollege) return;

      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${course.name}</td>
        <td>${course.id}</td>
        <td>${course.department}</td>
        <td>${course.category}</td>
        <td>
          <button onclick="viewInstructors('${course.id}', '${course.department}')">View Instructors</button>

          ${isCourseAssigned(course.id) ? '✅' : ''}
        </td>
      `;

      container.appendChild(row);
    });

  } catch (err) {
    console.error("Error loading courses:", err);
  }
}

// Check if a course has assigned instructors
function isCourseAssigned(courseId) {
  const assignments = JSON.parse(localStorage.getItem('assignments')) || [];
  const found = assignments.find(a => a.courseId === courseId);
  return found && found.instructors.length > 0;
}

// Navigate to instructor page
function viewInstructors(courseId,coursedept) {
  localStorage.setItem("selectedCourse", courseId);
  localStorage.setItem("selectedDepartment", coursedept);

  window.location.href = "instructorpg.html";

}

// Filter courses by search input
function filterCourses() {
  const searchValue = document.getElementById("searchInput").value.toLowerCase();
  const selectedCategory = document.getElementById("categoryFilter").value;

  const rows = document.querySelectorAll("tbody tr");

  rows.forEach(row => {
    const courseName = row.children[0].textContent.toLowerCase();
    const courseCategory = row.children[3].textContent; // Category is in column 4

    const matchesSearch = courseName.includes(searchValue);
    const matchesCategory = selectedCategory === "" || courseCategory === selectedCategory;

    if (matchesSearch && matchesCategory) {
      row.style.display = "table-row";
    } else {
      row.style.display = "none";
    }
  });
}


loadCoursesWithInterests();


