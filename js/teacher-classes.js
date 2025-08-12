document.addEventListener('DOMContentLoaded', function() {
  // Strand data
  const strands = {
    '11': ['CP', 'HUMSS', 'GAS', 'STEM', 'HO', 'ABM'],
    '12': ['CP', 'HUMSS', 'GAS', 'STEM', 'HO', 'ABM']
  };

  // Initialize localStorage if empty
  if (!localStorage.getItem('teacherMaterials')) {
    localStorage.setItem('teacherMaterials', JSON.stringify([]));
  }

  // Dynamic strand checkboxes
  const gradeSelect = document.getElementById('gradeSelect');
  if (gradeSelect) {
    gradeSelect.addEventListener('change', function() {
      const container = document.getElementById('strandContainer');
      if (!container) return;
      
      container.innerHTML = '';
      
      strands[this.value].forEach(strand => {
        container.innerHTML += `
          <label class="strand-checkbox">
            <input type="checkbox" name="strands" value="${strand}" checked>
            ${strand}
          </label>
        `;
      });
    });
  }

  // File name display
  const fileUpload = document.getElementById('fileUpload');
  if (fileUpload) {
    fileUpload.addEventListener('change', function() {
      const fileNameDisplay = document.getElementById('fileName');
      if (fileNameDisplay) {
        fileNameDisplay.textContent = this.files[0]?.name || 'No file selected';
      }
    });
  }

  // Form submission
  const uploadForm = document.getElementById('uploadForm');
  if (uploadForm) {
    uploadForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      try {
        // Get the current teacher's info (hardcoded for demo)
        const teacherProfile = {
          name: 'Ms. Ella',
          subject: 'Science'
        };

        const material = {
          title: document.getElementById('materialTitle').value.trim(),
          description: document.getElementById('materialDesc').value.trim(),
          file: {
            name: document.getElementById('fileUpload').files[0]?.name || 'Untitled',
            size: document.getElementById('fileUpload').files[0]?.size || 0
          },
          grade: document.getElementById('gradeSelect').value,
          strands: Array.from(document.querySelectorAll('input[name="strands"]:checked')).map(cb => cb.value),
          teacher: teacherProfile.name,
          subject: teacherProfile.subject,
          timestamp: new Date().toISOString(),
          id: Date.now().toString()
        };

        // Validation
        if (!material.title || !material.grade || material.strands.length === 0) {
          alert('Please fill all required fields');
          return;
        }

        // Save to localStorage
        let materials = JSON.parse(localStorage.getItem('teacherMaterials')) || [];
        materials.push(material);
        localStorage.setItem('teacherMaterials', JSON.stringify(materials));

        alert('Material uploaded successfully!');
        hideUploadSection();
      } catch (error) {
        console.error("Upload failed:", error);
        alert('An error occurred during upload. Please try again.');
      }
    });
  }

  // Initialize grade selection (triggers strand checkbox creation)
  if (gradeSelect) {
    gradeSelect.value = '12';
    gradeSelect.dispatchEvent(new Event('change'));
  }
});

// Grade toggling function
function toggleGrade(grade) {
  const header = document.querySelector(`[onclick="toggleGrade('${grade}')"]`);
  if (!header) return;

  const strandList = document.getElementById(`grade${grade}-strands`);
  const icon = header.getElementsByTagName('i')[0];

  const isHidden = strandList.style.display === 'none';
  strandList.style.display = isHidden ? 'grid' : 'none';
  
  if (icon) {
    icon.style.transform = isHidden ? 'rotate(90deg)' : 'rotate(0deg)';
  }
  header.classList.toggle('collapsed', !isHidden);
}

// Show/hide upload section
function showUploadSection() {
  document.getElementById('uploadSection').style.display = 'block';
  document.querySelector('.upload-fab').style.display = 'none';
}

function hideUploadSection() {
  document.getElementById('uploadSection').style.display = 'none';
  document.querySelector('.upload-fab').style.display = 'flex';
  document.getElementById('uploadForm').reset();
  document.getElementById('fileName').textContent = 'No file selected';
}