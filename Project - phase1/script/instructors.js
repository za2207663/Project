async function loadInstructors() {
    const selectedCourse = localStorage.getItem('selectedCourse');
    const selectDepartment = localStorage.getItem('selectedDepartment');
    const instructors = await (await fetch('./data/instructors.json')).json();
    const interests = JSON.parse(localStorage.getItem('interests')) || [];
    const assignments = JSON.parse(localStorage.getItem('assignments')) || [];

    const assigned = assignments.find(a => a.courseId === selectedCourse)?.instructors || [];

    const interestedInstructors = interests
        .filter(i => i.courseId === selectedCourse)
        .map(i => i.instructorId);

    const container = document.getElementById('instructor-list');

    instructors.forEach(instr => {
        if (interestedInstructors.includes(instr.username) && instr.department === selectDepartment) {

            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${instr.name}</td>
                <td>${instr.department}</td>
                <td>${instr.username}@education.qa</td>
                <td>
                    <input type="checkbox" value="${instr.username}" ${assigned.includes(instr.username) ? 'checked' : ''} />
                </td>
            `;

            container.appendChild(row);
        }
    });
}

  
  
  function storeAssignments() {
    const selectedCourse = localStorage.getItem('selectedCourse');
    const checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
    const selectedInstructors = Array.from(checkboxes).map(cb => cb.value);
  
    let assignments = JSON.parse(localStorage.getItem('assignments')) || [];
  
    const existingIndex = assignments.findIndex(a => a.courseId === selectedCourse);
  
    if (selectedInstructors.length === 0) {
      if (existingIndex !== -1) {
        assignments.splice(existingIndex, 1); 
      }
    } else {
      if (existingIndex !== -1) {
        assignments[existingIndex].instructors = selectedInstructors;
      } else {
        assignments.push({
          courseId: selectedCourse,
          instructors: selectedInstructors
        });
      }
    }
  
    localStorage.setItem('assignments', JSON.stringify(assignments));
    alert("Assignments saved successfully!");
    window.location.href = "admin.html";
  }
  
  
  loadInstructors();
  
  