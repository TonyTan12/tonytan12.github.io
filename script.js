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
  initScrollProgress();
  initSmoothScroll();
  initAnalyzer();
  initBackToTop();
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
  
  if (!themeToggle) return;
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  }
  
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
// AI JOB FIT ANALYZER
// ============================================
function initAnalyzer() {
  const analyzeBtn = document.getElementById('analyze-btn');
  const jobInput = document.getElementById('job-input');
  const analyzerResult = document.getElementById('analyzer-result');
  
  if (!analyzeBtn || !jobInput || !analyzerResult) return;
  
  analyzeBtn.addEventListener('click', function() {
    const jobDescription = jobInput.value.trim();
    
    if (!jobDescription) {
      alert('Please paste a job description first!');
      return;
    }
    
    // Show loading state
    analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
    analyzeBtn.disabled = true;
    
    // Simulate analysis
    setTimeout(() => {
      const result = analyzeJobFit(jobDescription);
      displayAnalyzerResult(result);
      
      // Reset button
      analyzeBtn.innerHTML = '<i class="fas fa-robot"></i> Analyze Job Fit';
      analyzeBtn.disabled = false;
    }, 1500);
  });
}

function analyzeJobFit(jobDescription) {
  const skills = [
    { name: 'Agile/Scrum', keywords: ['agile', 'scrum', 'kanban', 'sprint'] },
    { name: 'Product Management', keywords: ['product manager', 'product owner', 'roadmap', 'backlog'] },
    { name: 'Power BI', keywords: ['power bi', 'powerbi', 'dashboard'] },
    { name: 'SQL', keywords: ['sql', 'database', 'query'] },
    { name: 'Python', keywords: ['python', 'programming'] },
    { name: 'Azure', keywords: ['azure', 'cloud', 'devops'] },
    { name: 'Data Analysis', keywords: ['data analysis', 'analytics', 'visualization'] },
    { name: 'Tax Technology', keywords: ['tax', 'technology', 'transformation'] }
  ];
  
  const jobLower = jobDescription.toLowerCase();
  let matchedSkills = [];
  let totalScore = 0;
  
  skills.forEach(skill => {
    const isMatch = skill.keywords.some(keyword => jobLower.includes(keyword));
    if (isMatch) {
      matchedSkills.push(skill.name);
      totalScore += 12.5;
    }
  });
  
  totalScore = Math.min(totalScore, 100);
  
  return {
    score: Math.round(totalScore),
    matchedSkills: matchedSkills,
    summary: generateSummary(totalScore, matchedSkills)
  };
}

function generateSummary(score, skills) {
  if (score >= 80) {
    return `Excellent match! Your profile aligns very well with this position. You have ${skills.length} matching skills including ${skills.slice(0, 3).join(', ')}.`;
  } else if (score >= 60) {
    return `Good match! You have several relevant skills including ${skills.slice(0, 3).join(', ')}. Consider highlighting these in your application.`;
  } else if (score >= 40) {
    return `Moderate match. You have some transferable skills. Focus on ${skills.slice(0, 2).join(' and ')} in your cover letter.`;
  } else {
    return `This position may require skills outside your current expertise. Consider upskilling in relevant areas.`;
  }
}

function displayAnalyzerResult(result) {
  const analyzerResult = document.getElementById('analyzer-result');
  
  let skillsHtml = result.matchedSkills.length > 0 
    ? result.matchedSkills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')
    : '<p>No specific skills matched. Try a different job description.</p>';
  
  analyzerResult.innerHTML = `
    <div class="analyzer-score">
      <h3>Match Score: ${result.score}%</h3>
      <div class="score-bar">
        <div class="score-fill" style="width: ${result.score}%"></div>
      </div>
    </div>
    <div class="analyzer-summary">
      <p>${result.summary}</p>
    </div>
    <div class="analyzer-skills">
      <h4>Matching Skills:</h4>
      <div class="skills-list">${skillsHtml}</div>
    </div>
  `;
  
  analyzerResult.classList.add('active');
  
  // Add styles for the result
  const style = document.createElement('style');
  style.textContent = `
    .analyzer-score h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: var(--text-primary);
    }
    .score-bar {
      height: 8px;
      background: var(--border-color);
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 1.5rem;
    }
    .score-fill {
      height: 100%;
      background: var(--accent-color);
      transition: width 1s ease;
    }
    .analyzer-summary {
      margin-bottom: 1.5rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--border-color);
    }
    .analyzer-summary p {
      color: var(--text-secondary);
      line-height: 1.6;
    }
    .analyzer-skills h4 {
      margin-bottom: 0.75rem;
      color: var(--text-primary);
    }
    .skills-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
  `;
  document.head.appendChild(style);
}

// ============================================
// BACK TO TOP BUTTON
// ============================================
function initBackToTop() {
  let backToTop = document.querySelector('.back-to-top');
  if (!backToTop) {
    backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTop);
  }
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
  
  backToTop.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
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
