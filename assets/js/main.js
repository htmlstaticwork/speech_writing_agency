document.addEventListener('DOMContentLoaded', () => {
  // --- Theme Toggle ---
  const html = document.documentElement;
  const themeToggles = document.querySelectorAll('.theme-toggle');
  
  const currentTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', currentTheme);
  
  themeToggles.forEach(btn => {
    btn.innerHTML = currentTheme === 'dark' ? '☀️' : '🌙';
    
    btn.addEventListener('click', () => {
      const isDark = html.getAttribute('data-theme') === 'dark';
      const newTheme = isDark ? 'light' : 'dark';
      
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      themeToggles.forEach(b => {
        b.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
      });
    });
  });

  // --- RTL Toggle ---
  const rtlToggles = document.querySelectorAll('.rtl-toggle');
  const dirIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/></svg>`;
  
  const currentDir = localStorage.getItem('dir') || 'ltr';
  html.setAttribute('dir', currentDir);
  
  rtlToggles.forEach(btn => {
    btn.innerHTML = dirIcon;
    
    btn.addEventListener('click', () => {
      const isRtl = html.getAttribute('dir') === 'rtl';
      const newDir = isRtl ? 'ltr' : 'rtl';
      
      html.setAttribute('dir', newDir);
      localStorage.setItem('dir', newDir);
      
      // Icon stays the same as it represents the toggle action
    });
  });

  // --- Navbar Scroll & Drawer ---
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
    // Check initial position
    if (window.scrollY > 50) navbar.classList.add('scrolled');
  }

  const hamburger = document.querySelector('.hamburger');
  const navDrawer = document.querySelector('.nav-drawer');
  const drawerClose = document.querySelector('.drawer-close');
  
  if (hamburger && navDrawer) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'drawer-overlay';
    document.body.appendChild(overlay);

    const openDrawer = () => {
      navDrawer.classList.add('open');
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
      navDrawer.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    };

    hamburger.addEventListener('click', openDrawer);
    if(drawerClose) drawerClose.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);
  }

  // --- Scroll Animations (Intersection Observer) ---
  const revealElements = document.querySelectorAll('.reveal');
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  // --- Password Toggle ---
  const pwdToggles = document.querySelectorAll('.pwd-toggle');
  pwdToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      if (input.type === 'password') {
        input.type = 'text';
        btn.textContent = '🙈';
      } else {
        input.type = 'password';
        btn.textContent = '👁';
      }
    });
  });
});
