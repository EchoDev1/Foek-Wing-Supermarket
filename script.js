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

  const renderData = (data) => {
    try {
      if (data.home) {
        if (data.home.text1) {
          const el = document.getElementById('dynamic-home-text');
          if (el) el.innerText = data.home.text1;
        }
        if (data.home.title) {
          const el = document.getElementById('dynamic-home-hero-title');
          if (el) el.innerText = data.home.title;
        }
        if (data.home.subtitle) {
          const el = document.getElementById('dynamic-home-hero-sub');
          if (el) el.innerText = data.home.subtitle;
        }
        if (data.home.authTitle) {
          const el = document.getElementById('dynamic-home-auth-title');
          if (el) el.innerText = data.home.authTitle;
        }
        if (data.home.heroImg) {
          const el = document.getElementById('home-hero-section');
          if (el) el.style.backgroundImage = `url('${data.home.heroImg}')`;
        }
      }
      
      if (data.products && data.products.text1) {
        const el = document.getElementById('dynamic-products-text');
        if (el) el.innerText = data.products.text1;
      }
      
      if (data.products && data.products.images) {
        for (const [cat, base64] of Object.entries(data.products.images)) {
          if (base64) {
            const iconContainer = document.getElementById('icon-' + cat);
            if (iconContainer) {
              iconContainer.innerHTML = `<img src="${base64}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
            }
          }
        }
      }
      
      if (data.pay) {
        if (data.pay.text1) {
          const el = document.getElementById('dynamic-pay-text');
          if (el) el.innerText = data.pay.text1;
        }
        if (data.pay.qrImage) {
          const qrEl = document.getElementById('dynamic-pay-qr');
          if (qrEl) {
            qrEl.src = data.pay.qrImage;
            qrEl.style.display = 'inline-block';
          }
        }
      }
      
      if (data.reach) {
        if (data.reach.text1) {
          const el = document.getElementById('dynamic-reach-text');
          if (el) el.innerText = data.reach.text1;
        }
        if (data.reach.address) {
          const el = document.getElementById('dynamic-reach-address');
          if (el) el.innerText = data.reach.address;
        }
        if (data.reach.hours) {
          const el = document.getElementById('dynamic-reach-hours');
          if (el) {
            el.innerText = data.reach.hours;
            el.style.whiteSpace = 'pre-wrap';
          }
        }
        if (data.reach.phone) {
          const el = document.getElementById('dynamic-reach-phone');
          if (el) el.innerText = data.reach.phone;
        }
        if (data.reach.email) {
          const el = document.getElementById('dynamic-reach-email');
          if (el) el.innerText = data.reach.email;
        }
        if (data.reach.wechat) {
          const el = document.getElementById('dynamic-reach-wechat');
          if (el) el.innerText = data.reach.wechat;
        }
        if (data.reach.map) {
          const el = document.getElementById('dynamic-reach-map');
          if (el) {
            el.innerHTML = `<iframe src="https://maps.google.com/maps?q=${encodeURIComponent(data.reach.map)}&t=&z=15&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>`;
            const overlay = document.createElement('div');
            overlay.style.position = 'absolute';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.cursor = 'pointer';
            overlay.style.zIndex = '10';
            overlay.title = 'Click to open in Google Maps';
            overlay.onclick = () => {
              const addrEl = document.getElementById('dynamic-reach-address');
              const address = addrEl ? addrEl.innerText : data.reach.map;
              window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
            };
            el.appendChild(overlay);
          }
        }
        
        if (data.reach.warehouseAddress) {
          const el = document.getElementById('dynamic-reach-warehouse-address');
          if (el) el.innerText = data.reach.warehouseAddress;
        }
        
        if (data.reach.warehouseDesc) {
          const el = document.getElementById('dynamic-reach-warehouse-desc');
          if (el) el.innerText = data.reach.warehouseDesc;
        }
        if (data.reach.warehouseHours) {
          const el = document.getElementById('dynamic-reach-warehouse-hours');
          if (el) el.innerText = data.reach.warehouseHours;
        }
        if (data.reach.warehousePhone) {
          const el = document.getElementById('dynamic-reach-warehouse-phone');
          if (el) el.innerText = data.reach.warehousePhone;
        }
        if (data.reach.warehouseDockTitle) {
          const el = document.getElementById('dynamic-reach-warehouse-dock-title');
          if (el) el.innerText = data.reach.warehouseDockTitle;
        }
        if (data.reach.warehouseDockDesc) {
          const el = document.getElementById('dynamic-reach-warehouse-dock-desc');
          if (el) el.innerText = data.reach.warehouseDockDesc;
        }
        
        if (data.reach.warehouseMap) {
          const el = document.getElementById('dynamic-reach-warehouse-map');
          if (el) {
            el.innerHTML = `<iframe src="https://maps.google.com/maps?q=${encodeURIComponent(data.reach.warehouseMap)}&t=&z=15&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>`;
            const overlay = document.createElement('div');
            overlay.style.position = 'absolute';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.cursor = 'pointer';
            overlay.style.zIndex = '10';
            overlay.title = 'Click to open in Google Maps';
            overlay.onclick = () => {
              const addrEl = document.getElementById('dynamic-reach-warehouse-address');
              const address = addrEl ? addrEl.innerText : data.reach.warehouseMap;
              window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
            };
            el.appendChild(overlay);
          }
        }
        if (data.reach.barcode) {
          const barcodeContainer = document.getElementById('barcode-container');
          const barcodeImg = document.getElementById('reach-barcode-img');
          if (barcodeContainer && barcodeImg) {
            barcodeImg.src = data.reach.barcode;
            barcodeContainer.style.display = 'block';
          }
        }
      }
    } catch (err) {
      console.error("Error injecting dynamic content:", err);
    }
  };

  const loadDynamicContent = async () => {
    // 1. Immediately load and render from localStorage if available (Stale-While-Revalidate)
    const rawData = localStorage.getItem('fw_content');
    if (rawData) {
      try {
        const cachedData = JSON.parse(rawData);
        renderData(cachedData);
        document.body.classList.add('loaded'); // Show page instantly
      } catch(e) {}
    }

    // 2. Fetch fresh data in the background
    try {
      const dbUrl = `https://foek-wing-supermarket-default-rtdb.europe-west1.firebasedatabase.app/content.json?_=${Date.now()}`;
      const response = await fetch(dbUrl, { cache: 'no-store' });
      if (response.ok) {
        const data = await response.json();
        if (data) {
          // Re-render with fresh data and save to cache
          renderData(data);
          try {
            localStorage.setItem('fw_content', JSON.stringify(data));
          } catch (err) {
            console.warn("Could not save to localStorage, likely due to quota exceeded from large images.");
          }
        }
      }
    } catch (e) {
      console.error("Firebase load error:", e);
    }
    
    // Always ensure body is revealed (in case it wasn't cached)
    document.body.classList.add('loaded');
  };

  // Initial load
  loadDynamicContent();

  // Listen for storage events (updates from other tabs)
  window.addEventListener('storage', (e) => {
    if (e.key === 'fw_content' || e.key === 'fw_ping') {
      loadDynamicContent();
    }
  });
});
