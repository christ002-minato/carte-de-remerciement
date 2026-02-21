// Script pour la carte de remerciement

document.addEventListener('DOMContentLoaded', function() {
    // Animation d'entrée pour la carte
    const thankYouCard = document.querySelector('.thank-you-card');
    thankYouCard.style.opacity = '0';
    thankYouCard.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        thankYouCard.style.transition = 'all 0.8s ease-out';
        thankYouCard.style.opacity = '1';
        thankYouCard.style.transform = 'translateY(0)';
    }, 300);

    // Bouton WhatsApp
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            window.open('https://wa.me/+2250565283279', '_blank');
        });
    }

    // Animation des cœurs dans le footer
    const heartIcons = document.querySelectorAll('.heart-icon');
    heartIcons.forEach((heart, index) => {
        heart.style.animation = `heartbeat 2s ease-in-out ${index * 0.5}s infinite`;
    });

    // Ajouter l'animation heartbeat
    const style = document.createElement('style');
    style.textContent = `
        @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
    `;
    document.head.appendChild(style);
});

// Function for WhatsApp in new footer
function openWhatsApp() {
    window.open('https://wa.me/+2250565283279', '_blank');
}

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      e.target.style.transitionDelay = (i * 0.05) + 's';
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Gallery pagination
const galleryItems = document.querySelectorAll('.gallery-item');
let galleryIndex = 0;
galleryItems.forEach(item => {
  item.classList.add('reveal');
  
  // Add loading spinner
  const spinner = document.createElement('div');
  spinner.className = 'spinner';
  item.style.position = 'relative';
  item.appendChild(spinner);
  
  const img = item.querySelector('img');
  img.addEventListener('load', () => {
    spinner.style.display = 'none';
  });
  if (img.complete) {
    spinner.style.display = 'none';
  }
  
  // Hide if not first 10
  if (galleryIndex >= 10) {
    item.classList.add('hidden');
  } else {
    observer.observe(item);
  }
  galleryIndex++;
});

let currentIndex = 10; // Show first 10

const loadMoreBtn = document.getElementById('load-more-btn');
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', () => {
    const nextItems = Array.from(galleryItems).slice(currentIndex, currentIndex + 10);
    nextItems.forEach(item => {
      item.classList.remove('hidden');
      observer.observe(item); // Trigger reveal when shown
    });
    
    // Preload next batch
    preloadNext(currentIndex + 10, 10);
    
    currentIndex += 10;
    if (currentIndex >= galleryItems.length) {
      loadMoreBtn.style.display = 'none';
    }
  });
}

// Function to preload images
function preloadNext(start, count) {
  for (let i = start; i < start + count && i < galleryItems.length; i++) {
    const img = galleryItems[i].querySelector('img');
    if (img && !img.complete) {
      const preloadImg = new Image();
      preloadImg.src = img.src;
    }
  }
}

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');

galleryItems.forEach(item => {
  item.addEventListener('click', function() {
    const img = this.querySelector('img');
    lightboxImg.src = img.src;
    lightboxCaption.textContent = img.alt;
    lightbox.style.display = 'flex';
  });
});

lightboxClose.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});