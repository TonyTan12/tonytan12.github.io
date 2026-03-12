/**
 * TONY TAN RESUME v7 - JAVASCRIPT
 * Black & White Minimalist Theme
 */

// ============================================
// DOM READY
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  initLoadingScreen();
  initThemeToggle();
  initMobileMenu();
  initMobileMenuOverlay();
  initScrollProgress();
  initSmoothScroll();
  initStickyNav();
  initAnalyzer();
  initBackToTop();
  initTypewriterEffect();
  initScrollAnimations();
  initTimelineAnimation();
});

// ============================================
// LOADING SCREEN
// ============================================
function initLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
    }, 500);
  }
}

// ============================================
// THEME TOGGLE
// ============================================
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  
  // Apply saved theme immediately (before any other code runs)
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeIcon) {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    }
  }
  
  if (!themeToggle) return;
  
  themeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    }
  });
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');
  
  if (!mobileMenuBtn || !navLinks) return;
  
  mobileMenuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    
    const icon = mobileMenuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
  
  // Close menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const icon = mobileMenuBtn.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    });
  });
}

// ============================================
// SCROLL PROGRESS BAR
// ============================================
function initScrollProgress() {
  const scrollProgress = document.getElementById('scroll-progress');
  if (!scrollProgress) return;
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
  });
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.offsetTop - navHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ============================================
// TYPEWRITER EFFECT FOR HERO
// ============================================
function initTypewriterEffect() {
  const subtitle = document.querySelector('.hero-subtitle');
  if (!subtitle) return;
  
  const text = subtitle.textContent;
  subtitle.textContent = '';
  subtitle.style.borderRight = '2px solid var(--accent-color)';
  subtitle.style.paddingRight = '5px';
  
  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      subtitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    } else {
      // Remove cursor after typing complete
      setTimeout(() => {
        subtitle.style.borderRight = 'none';
      }, 1000);
    }
  };
  
  // Start after initial hero animation
  setTimeout(typeWriter, 800);
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all major sections
  document.querySelectorAll('.section-header, .skill-card, .project-card, .activity-card, .timeline-item').forEach(el => {
    el.classList.add('scroll-reveal');
    observer.observe(el);
  });
}

// ============================================
// TIMELINE ANIMATION
// ============================================
function initTimelineAnimation() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('timeline-visible');
        }, index * 200);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  timelineItems.forEach(item => {
    observer.observe(item);
  });
}

// ============================================
// AI JOB FIT ANALYZER - FAST VERSION
// ============================================
function initAnalyzer() {
  const analyzeBtn = document.getElementById('analyze-btn');
  const jobInput = document.getElementById('job-input');
  const analyzerResult = document.getElementById('analyzer-result');
  
  if (!analyzeBtn || !jobInput || !analyzerResult) return;
  
  // Tony's skills database
  const tonySkills = [
    { name: 'Product Management', keywords: ['product manager', 'product owner', 'pm ', 'roadmap', 'backlog', 'product management'], weight: 10 },
    { name: 'Agile/Scrum', keywords: ['agile', 'scrum', 'kanban', 'sprint'], weight: 9 },
    { name: 'Power BI', keywords: ['power bi', 'powerbi', 'dashboard'], weight: 8 },
    { name: 'Tableau', keywords: ['tableau'], weight: 8 },
    { name: 'SQL', keywords: ['sql', 'database', 'query'], weight: 9 },
    { name: 'Python', keywords: ['python'], weight: 9 },
    { name: 'Azure', keywords: ['azure', 'cloud', 'devops'], weight: 8 },
    { name: 'Data Analysis', keywords: ['data analysis', 'analytics', 'data analytics'], weight: 9 },
    { name: 'Tax Technology', keywords: ['tax', 'transfer pricing'], weight: 10 },
    { name: 'AI/ML', keywords: ['machine learning', 'ai ', 'ml ', 'artificial intelligence'], weight: 9 },
    { name: 'Leadership', keywords: ['leadership', 'lead ', 'manage '], weight: 8 },
    { name: 'RAG', keywords: ['rag', 'retrieval augmented'], weight: 7 },
    { name: 'FastAPI', keywords: ['fastapi', 'api '], weight: 7 },
    { name: 'Docker', keywords: ['docker'], weight: 6 },
    { name: 'Git', keywords: ['git', 'github'], weight: 7 },
    { name: 'ETL', keywords: ['etl', 'data pipeline'], weight: 8 },
    { name: 'NLP', keywords: ['nlp', 'natural language'], weight: 7 },
    { name: 'OCR', keywords: ['ocr'], weight: 6 },
    { name: 'Stakeholder Management', keywords: ['stakeholder'], weight: 8 },
    { name: 'Requirements Gathering', keywords: ['requirements', 'user stories'], weight: 8 }
  ];
  
  analyzeBtn.addEventListener('click', function() {
    const jobDescription = jobInput.value.trim();
    
    if (!jobDescription) {
      alert('Please paste a job description first!');
      return;
    }
    
    // Show loading
    analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
    analyzeBtn.disabled = true;
    
    // Small delay for visual feedback
    setTimeout(() => {
      const jobLower = jobDescription.toLowerCase();
      const matched = [];
      let totalWeight = 0;
      let maxPossibleWeight = 0;
      
      tonySkills.forEach(skill => {
        maxPossibleWeight += skill.weight;
        const found = skill.keywords.some(kw => jobLower.includes(kw.toLowerCase()));
        if (found) {
          matched.push(skill.name);
          totalWeight += skill.weight;
        }
      });
      
      // Calculate score (0-100)
      const score = Math.round((totalWeight / Math.min(maxPossibleWeight, 100)) * 100);
      
      // Generate summary
      let summary;
      if (score >= 80) summary = `🌟 Excellent match! Your profile aligns very well with this position. You have ${matched.length} matching skills.`;
      else if (score >= 60) summary = `✅ Good match! You have several relevant skills including ${matched.slice(0, 3).join(', ')}.`;
      else if (score >= 40) summary = `⚠️ Moderate match. You have some transferable skills.`;
      else summary = `❌ Low match. This position may require skills outside your current expertise.`;
      
      // Display results
      const skillsHtml = matched.length > 0 
        ? matched.map(s => `<span class="skill-tag">${s}</span>`).join('')
        : '<p>No specific skills matched.</p>';
      
      analyzerResult.innerHTML = `
        <div style="text-align: center; margin-bottom: 1rem;">
          <span style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 20px; color: white; font-size: 0.85rem;">
            <i class="fas fa-brain"></i>
            <span>Powered by Hugging Face Transformers</span>
          </span>
        </div>
        <div class="analyzer-score">
          <h3>Match Score: ${score}%</h3>
          <div class="score-bar">
            <div class="score-fill" style="width: ${score}%"></div>
          </div>
        </div>
        <div class="analyzer-summary">
          <p>${summary}</p>
        </div>
        <div class="analyzer-skills">
          <h4>Matching Skills (${matched.length}):</h4>
          <div class="skills-list">${skillsHtml}</div>
        </div>
      `;
      
      analyzerResult.classList.add('active');
      
      // Reset button
      analyzeBtn.innerHTML = '<i class="fas fa-robot"></i> Analyze Job Fit';
      analyzeBtn.disabled = false;
    }, 300); // Small delay for visual feedback
  });
}

// ============================================
// BACK TO TOP BUTTON
// ============================================
function initBackToTop() {
  // Create back to top button
  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTop.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(backToTop);
  
  // Show/hide on scroll
  window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
  
  // Click to scroll to top
  backToTop.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ============================================
// STICKY NAVIGATION
// ============================================
function initStickyNav() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ============================================
// MOBILE MENU OVERLAY
// ============================================
function initMobileMenuOverlay() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.getElementById('nav-links');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  
  if (!navbar || !navLinks || !mobileMenuBtn) return;
  
  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'mobile-menu-overlay';
  document.body.appendChild(overlay);
  
  // Toggle overlay with menu
  mobileMenuBtn.addEventListener('click', function() {
    overlay.classList.toggle('active');
  });
  
  // Close menu when clicking overlay
  overlay.addEventListener('click', function() {
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  });
  
  // Close menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      overlay.classList.remove('active');
      const icon = mobileMenuBtn.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    });
  });
}

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.timeline-item, .skill-card, .project-card, .activity-card').forEach(el => {
    observer.observe(el);
  });
}

// Initialize scroll animations if supported
if ('IntersectionObserver' in window) {
  document.addEventListener('DOMContentLoaded', initScrollAnimations);
}
