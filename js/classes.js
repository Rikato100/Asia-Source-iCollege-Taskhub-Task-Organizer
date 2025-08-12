document.addEventListener('DOMContentLoaded', function() {
  const classItems = document.querySelectorAll('.class-item');
  const taskPanel = document.getElementById('taskPanel');
  const classNameDisplay = document.getElementById('selectedClassName');
  const emptyState = taskPanel.querySelector('.empty-state');

  // Student profile - hardcoded for demo (would come from user data in real app)
  const studentProfile = {
    grade: '12',
    strand: 'CP'
  };

  // Initialize localStorage if empty (for demo purposes)
  if (!localStorage.getItem('teacherMaterials')) {
    localStorage.setItem('teacherMaterials', JSON.stringify([
      
      {
        title: "Chem Lab",
        description: "Deadline: Friday",
        file: { name: "chem_lab.docx", size: 2048 },
        grade: "12",
        strands: ["CP", "STEM"],
        teacher: "Ms. Ella",
        subject: "Science",
        timestamp: new Date().toISOString(),
        id: "2"
      }
    ]));
  }

  classItems.forEach(item => {
    item.addEventListener('click', function() {
      // Reset all classes
      classItems.forEach(i => i.classList.remove('active'));
      
      // Highlight clicked class
      this.classList.add('active');
      
      // Get class info
      const className = this.querySelector('h3').textContent;
      const teacherName = this.querySelector('p').textContent;
      classNameDisplay.textContent = `${className} - ${teacherName}`;
      
      // Display materials for this class
      displayClassMaterials(className, teacherName);
    });
  });

  function displayClassMaterials(className, teacherName) {
    // Get all materials from localStorage
    const allMaterials = JSON.parse(localStorage.getItem('teacherMaterials') || []);
    
    // Filter materials for this student's class
    const classMaterials = allMaterials.filter(material => 
      material.subject === className &&
      material.teacher === teacherName &&
      material.grade === studentProfile.grade && 
      material.strands.includes(studentProfile.strand)
    );
    
    // Display the materials
    if (classMaterials.length > 0) {
      emptyState.innerHTML = classMaterials.map(material => `
        <div class="material-card">
          <h4>${material.title}</h4>
          ${material.description ? `<p>${material.description}</p>` : ''}
          <div class="file-download">
            <i class="fas fa-file"></i> ${material.file.name}
          </div>
          <small>Uploaded on ${new Date(material.timestamp).toLocaleDateString()} by ${material.teacher}</small>
        </div>
      `).join('');
    } else {
      emptyState.innerHTML = '<p>No materials available for this class</p>';
    }
  }

  // Initialize by selecting the first class
  if (classItems.length > 0) {
    classItems[0].click();
  }
});