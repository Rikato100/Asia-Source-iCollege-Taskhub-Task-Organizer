document.addEventListener('DOMContentLoaded', function() {
    // Initialize calendar with Sept 2025 as default view
    let currentDate = new Date(2025, 9, 11); // Sept 2025 (month is 0-indexed)
    const calendarGrid = document.getElementById('calendarGrid');
    const currentMonthElement = document.getElementById('currentMonth');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const todayBtn = document.getElementById('today');
  
    // Assignment data for Sept 2025
    const sept2025Assignments = {
      5: { title: 'P.E Assignment', type: 'physical' },
      10: { title: 'Programming Assignment', type: 'tech' },
      15: { title: 'Filipino Assignment', type: 'language' },
      20: { title: 'ValEd Assignment', type: 'important' },
      25: { title: 'History Assignment', type: 'humanities' },
      30: { title: 'Science Assignment', type: 'science' }
    };
  
    // Render the calendar
    function renderCalendar() {
      // Clear previous calendar
      calendarGrid.innerHTML = '';
      
      // Set month and year in header
      currentMonthElement.textContent = new Intl.DateTimeFormat('en-US', { 
        month: 'long', 
        year: 'numeric' 
      }).format(currentDate);
      
      // Get calendar data
      const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startDay = firstDay.getDay(); // Day of week (0-6)
      
      // Add day headers (Sun-Sat)
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      dayNames.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-header';
        dayHeader.textContent = day;
        calendarGrid.appendChild(dayHeader);
      });
      
      // Add empty cells for days before the first of the month
      for (let i = 0; i < startDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day other-month';
        calendarGrid.appendChild(emptyDay);
      }
      
      // Add days of the month
      const today = new Date();
      for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        // Highlight today
        if (day === today.getDate() && 
            currentDate.getMonth() === today.getMonth() && 
            currentDate.getFullYear() === today.getFullYear()) {
          dayElement.classList.add('today');
        }
        
        // Add date number
        const dateElement = document.createElement('div');
        dateElement.className = 'calendar-date';
        dateElement.textContent = day;
        dayElement.appendChild(dateElement);
        
        // Add assignments for sept 2025
        if (currentDate.getMonth() === 4 && currentDate.getFullYear() === 2025) {
          if (sept2025Assignments[day]) {
            const event = sept2025Assignments[day];
            const eventElement = document.createElement('div');
            eventElement.className = `calendar-event ${event.type}`;
            eventElement.textContent = event.title;
            
            // Add tooltip on hover
            eventElement.title = `Due: sept ${day}, 2025`;
            dayElement.appendChild(eventElement);
          }
        }
        
        calendarGrid.appendChild(dayElement);
      }
    }
    
    // Event listeners for navigation
    prevMonthBtn.addEventListener('click', () => {
      currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
      renderCalendar();
    });
    
    nextMonthBtn.addEventListener('click', () => {
      currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
      renderCalendar();
    });
    
    todayBtn.addEventListener('click', () => {
      currentDate = new Date();
      renderCalendar();
    });
    
    // Initial render
    renderCalendar();
  
    // Click handler for calendar days
    calendarGrid.addEventListener('click', function(e) {
      if (e.target.classList.contains('calendar-event')) {
        alert(`Assignment: ${e.target.textContent}\nDue: sept ${e.target.parentElement.querySelector('.calendar-date').textContent}, 2025`);
      }
    });

  });
