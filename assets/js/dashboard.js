document.addEventListener('DOMContentLoaded', () => {
  // Sidebar toggle for mobile
  const sidebar = document.querySelector('.dashboard-sidebar');
  const toggleBtns = document.querySelectorAll('.dash-sidebar-toggle');

  if (sidebar && toggleBtns.length > 0) {
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
      });
    });
  }

  // Dashboard Tab Switching
  const navLinks = document.querySelectorAll('.sidebar-nav .sidebar-link');
  const pages = document.querySelectorAll('.dashboard-page');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      // Remove active from all links and pages
      navLinks.forEach(l => l.classList.remove('active'));
      pages.forEach(p => p.classList.remove('active'));

      // Add active to clicked target
      link.classList.add('active');
      const targetId = link.getAttribute('data-target');
      const targetPage = document.getElementById(targetId);
      if (targetPage) {
        targetPage.classList.add('active');
      }

      // On mobile, close sidebar after clicking
      if (window.innerWidth <= 768 && sidebar) {
        sidebar.classList.remove('open');
      }
    });
  });

  // Render Charts if chart canvas exists (Simulation of lightweight Chart.js rendering)
  // Assuming Chart.js is loaded via CDN in dashboard.html
  const statusCtx = document.getElementById('statusChart');
  if (statusCtx && typeof Chart !== 'undefined') {
    new Chart(statusCtx, {
      type: 'doughnut',
      data: {
        labels: ['Draft', 'In Review', 'Approved', 'Delivered'],
        datasets: [{
          data: [12, 19, 5, 8],
          backgroundColor: [
            '#C5A059', // Secondary
            '#17A2B8', // Info
            '#28A745', // Success
            '#111A22'  // Primary
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right'
          }
        }
      }
    });
  }
});
