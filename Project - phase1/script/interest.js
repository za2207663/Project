async function loadCourses() {
  try {
    const username = localStorage.getItem("username");

    const courseRes = await fetch('./data/courses.json');
    const courses = await courseRes.json();

    const instructorRes = await fetch('./data/instructors.json');
    const instructors = await instructorRes.json();

    const instructor = instructors.find(i => i.username === username);
    if (!instructor) {
      throw new Error("Instructor not found");
    }

    const interests = JSON.parse(localStorage.getItem("interests")) || [];

    // Add interests to courses in memory
    courses.forEach(course => {
      course.interests = interests
        .filter(i => i.courseId === course.id)
        .map(i => i.instructorId);
    });
    const openCourses = courses.filter(
      c => c.status === 'open' && c.college === instructor.college && c.department === instructor.department
    );

    const categorySet = new Set(openCourses.map(course => course.category));
    const categoryFilter = document.getElementById("categoryFilter");

    categoryFilter.innerHTML = `<option value="">All Categories</option>`;
    categorySet.forEach(category => {
      categoryFilter.innerHTML += `<option value="${category}">${category}</option>`;
    });

    renderCourses(openCourses);

  } catch (err) {
    console.error("Error loading courses:", err);
    document.getElementById("course-list").innerHTML = "<p>Error loading courses</p>";
  }
}

// Render courses dynamically
function renderCourses(courses) {
  const container = document.getElementById("course-list");
  container.innerHTML = "";

  courses.forEach(course => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>
        <span class="course-name" title="${course.description}">
          ${course.name}
        </span>
      </td>
      <td>${course.id}</td>
      <td>${course.department}</td>
      <td>${course.category}</td>
      <td><button onclick="expressInterest('${course.id}')">I'm Interested</button></td>
    `;

    container.appendChild(row);
  });
}


// Filter by Search & Category
function filterCourses() {
  const searchValue = document.getElementById("searchInput").value.toLowerCase();
  const selectedCategory = document.getElementById("categoryFilter").value;

  const rows = document.querySelectorAll("tbody tr");

  rows.forEach(row => {
    const courseName = row.children[0].textContent.toLowerCase();
    const courseCategory = row.children[3].textContent;

    const matchesSearch = courseName.includes(searchValue);
    const matchesCategory = selectedCategory === "" || courseCategory === selectedCategory;

    row.style.display = matchesSearch && matchesCategory ? "table-row" : "none";
  });
}

async function expressInterest(courseId) {
  const instructorId = localStorage.getItem("username");

  let interests = JSON.parse(localStorage.getItem("interests")) || [];

  const alreadyInterested = interests.find(
    entry => entry.courseId === courseId && entry.instructorId === instructorId
  );

  if (!alreadyInterested) {
    interests.push({ courseId, instructorId });
    localStorage.setItem("interests", JSON.stringify(interests));
    alert("Interest submitted!");
  } else {
    alert("Already expressed interest!");
  }

  loadCourses();  // Re-render after interest
}

loadCourses();
