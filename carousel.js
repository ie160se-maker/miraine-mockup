/* ============================================
   Instagram Post Mockup - Carousel JavaScript
   ============================================ */

(function() {
  'use strict';

  // Initialize all Instagram posts on the page
  function initCarousels() {
    const posts = document.querySelectorAll('.instagram-post');
    posts.forEach(initCarousel);
  }

  function initCarousel(post) {
    const track = post.querySelector('.carousel-track');
    const slides = post.querySelectorAll('.carousel-slide');
    const prevBtn = post.querySelector('.carousel-btn.prev');
    const nextBtn = post.querySelector('.carousel-btn.next');
    const dots = post.querySelectorAll('.dot');
    const counter = post.querySelector('.slide-counter');
    const totalSlides = slides.length;

    let currentIndex = 0;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    function updateCarousel() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      // Update dots
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });

      // Update counter
      if (counter) {
        counter.textContent = `${currentIndex + 1}/${totalSlides}`;
      }

      // Update button states
      if (prevBtn) prevBtn.disabled = currentIndex === 0;
      if (nextBtn) nextBtn.disabled = currentIndex === totalSlides - 1;
    }

    function goToSlide(index) {
      if (index >= 0 && index < totalSlides) {
        currentIndex = index;
        updateCarousel();
      }
    }

    // Button navigation
    if (prevBtn) {
      prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
    }

    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => goToSlide(index));
    });

    // Touch/swipe support
    const wrapper = post.querySelector('.carousel-wrapper');
    if (wrapper) {
      wrapper.addEventListener('touchstart', handleTouchStart, { passive: true });
      wrapper.addEventListener('touchmove', handleTouchMove, { passive: true });
      wrapper.addEventListener('touchend', handleTouchEnd);
      
      // Mouse drag support (for desktop testing)
      wrapper.addEventListener('mousedown', handleMouseDown);
      wrapper.addEventListener('mousemove', handleMouseMove);
      wrapper.addEventListener('mouseup', handleMouseUp);
      wrapper.addEventListener('mouseleave', handleMouseUp);
    }

    function handleTouchStart(e) {
      startX = e.touches[0].clientX;
      isDragging = true;
    }

    function handleTouchMove(e) {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
    }

    function handleTouchEnd() {
      if (!isDragging) return;
      isDragging = false;
      handleSwipe();
    }

    function handleMouseDown(e) {
      e.preventDefault();
      startX = e.clientX;
      isDragging = true;
    }

    function handleMouseMove(e) {
      if (!isDragging) return;
      currentX = e.clientX;
    }

    function handleMouseUp() {
      if (!isDragging) return;
      isDragging = false;
      handleSwipe();
    }

    function handleSwipe() {
      const diff = startX - currentX;
      const threshold = 50;

      if (Math.abs(diff) > threshold) {
        if (diff > 0 && currentIndex < totalSlides - 1) {
          goToSlide(currentIndex + 1);
        } else if (diff < 0 && currentIndex > 0) {
          goToSlide(currentIndex - 1);
        }
      }
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') goToSlide(currentIndex - 1);
      if (e.key === 'ArrowRight') goToSlide(currentIndex + 1);
    });

    // Initialize
    updateCarousel();
  }

  // Caption expand/collapse
  function initCaptions() {
    const toggles = document.querySelectorAll('.caption-toggle');
    toggles.forEach(toggle => {
      toggle.addEventListener('click', function() {
        const caption = this.previousElementSibling;
        const isExpanded = caption.classList.toggle('expanded');
        this.textContent = isExpanded ? '一部を表示' : '...続きを読む';
      });
    });
  }

  // Like button toggle (visual only)
  function initLikeButtons() {
    const likeIcons = document.querySelectorAll('.action-icon.like');
    likeIcons.forEach(icon => {
      icon.addEventListener('click', function() {
        const svg = this.querySelector('svg');
        const isLiked = this.classList.toggle('liked');
        if (isLiked) {
          svg.setAttribute('fill', '#ed4956');
          svg.setAttribute('stroke', '#ed4956');
        } else {
          svg.setAttribute('fill', 'none');
          svg.setAttribute('stroke', '#262626');
        }
      });
    });
  }

  // Bookmark toggle
  function initBookmarks() {
    const bookmarks = document.querySelectorAll('.action-icon.bookmark');
    bookmarks.forEach(bm => {
      bm.addEventListener('click', function() {
        const svg = this.querySelector('svg');
        const isSaved = this.classList.toggle('saved');
        svg.setAttribute('fill', isSaved ? '#262626' : 'none');
      });
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initCarousels();
      initCaptions();
      initLikeButtons();
      initBookmarks();
    });
  } else {
    initCarousels();
    initCaptions();
    initLikeButtons();
    initBookmarks();
  }
})();
