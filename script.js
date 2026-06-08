document.addEventListener('DOMContentLoaded', () => {
  // Highlight active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // Simple scroll reveal animation for cards
  const cards = document.querySelectorAll('.glass-card');
  
  const revealCards = () => {
    const triggerBottom = window.innerHeight / 5 * 4;
    
    cards.forEach(card => {
      const cardTop = card.getBoundingClientRect().top;
      
      if(cardTop < triggerBottom) {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }
    });
  };

  // Initial state for cards
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
  });

  window.addEventListener('scroll', revealCards);
  revealCards(); // Trigger once on load
});
