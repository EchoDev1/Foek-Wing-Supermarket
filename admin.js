document.addEventListener('DOMContentLoaded', () => {
  // Authentication Check
  if (sessionStorage.getItem('isAdmin') !== 'true') {
    window.location.href = 'admin.html';
    return;
  }

  // Logout
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('isAdmin');
      window.location.href = 'admin.html';
    });
  }

  // Tab Switching Logic
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      btn.classList.add('active');
      document.getElementById(btn.dataset.target).classList.add('active');
    });
  });

  // Load Existing Data into Inputs
  loadAdminData();
});

// Image Preview & Base64 Conversion
function previewImage(input, previewId) {
  const file = input.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById(previewId).src = e.target.result;
      document.getElementById(previewId).dataset.base64 = e.target.result;
    }
    reader.readAsDataURL(file);
  }
}

function clearImage(inputId, previewId) {
  document.getElementById(inputId).value = '';
  const img = document.getElementById(previewId);
  img.removeAttribute('src');
  img.removeAttribute('data-base64');
}

// Save Content logic per tab
async function saveContent(tabName) {
  try {
    const data = JSON.parse(localStorage.getItem('fw_content')) || {};
    
    if (!data[tabName]) {
      data[tabName] = {};
    }

    if (tabName === 'home') {
      data.home.text1 = document.getElementById('home-text-1').value;
      data.home.title = document.getElementById('home-title').value;
      data.home.subtitle = document.getElementById('home-subtitle').value;
      data.home.authTitle = document.getElementById('home-auth-title').value;
      data.home.heroImg = document.getElementById('preview-home-hero').dataset.base64 || null;
    } else if (tabName === 'pay') {
      data.pay.text1 = document.getElementById('pay-text-1').value;
      data.pay.cash = document.getElementById('pay-cash').value;
      data.pay.bank = document.getElementById('pay-bank').value;
      data.pay.mobile = document.getElementById('pay-mobile').value;
      data.pay.wechat = document.getElementById('pay-wechat').value;
    } else if (tabName === 'reach') {
      data.reach.text1 = document.getElementById('reach-text-1').value;
      data.reach.address = document.getElementById('reach-address').value;
      data.reach.hours = document.getElementById('reach-hours').value;
      data.reach.phone = document.getElementById('reach-phone').value;
      data.reach.email = document.getElementById('reach-email').value;
      data.reach.wechat = document.getElementById('reach-wechat').value;
      data.reach.map = document.getElementById('reach-map').value;
      const barcodeBase64 = document.getElementById('preview-reach-barcode').dataset.base64;
      data.reach.barcode = barcodeBase64 || null;
    } else if (tabName === 'products') {
      data.products.text1 = document.getElementById('products-text-1').value;
      
      const categories = [
        'fresh-vegetables', 'quality-meats', 'mushrooms-tofu', 
        'noodles-rice', 'sauces-condiments', 'frozen-foods', 
        'beverages', 'snacks-sweets'
      ];
      
      if (!data.products.images) data.products.images = {};
      
      categories.forEach(cat => {
        const img = document.getElementById('preview-' + cat).dataset.base64;
        data.products.images[cat] = img || null;
      });
    }

    // 1. Save globally to Firebase Cloud Database
    const dbUrl = `https://foek-wing-supermarket-default-rtdb.europe-west1.firebasedatabase.app/content/${tabName}.json`;
    const response = await fetch(dbUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data[tabName])
    });

    if (!response.ok) {
      throw new Error(`Firebase error! status: ${response.status}`);
    }

    // 2. Save locally for instant cross-tab updates without refresh
    try {
      localStorage.setItem('fw_content', JSON.stringify(data));
    } catch (err) {
      console.warn("Could not save to localStorage locally due to quota.");
    }
    // Always trigger a storage event so frontend tabs reload immediately
    localStorage.setItem('fw_ping', Date.now().toString());

    // Show success message
    const msg = document.getElementById(tabName + '-msg');
    if (msg) {
      msg.style.display = 'block';
      setTimeout(() => {
        msg.style.display = 'none';
      }, 3000);
    }
    
    // Show a definitive popup alert
    alert("Success! Your changes have been saved to the cloud and applied immediately globally.");
  } catch (e) {
    console.error("Save error:", e);
    if (e.name === 'QuotaExceededError' || (e.message && e.message.includes('payload too large'))) {
      alert("Error: Storage limit exceeded. The images you uploaded might be too large. Please use smaller images.");
    } else {
      alert("An error occurred while saving to the cloud database. Check your internet connection or database rules.");
    }
  }
}

// Load data into fields
async function loadAdminData() {
  let data = null;

  try {
    const dbUrl = `https://foek-wing-supermarket-default-rtdb.europe-west1.firebasedatabase.app/content.json?_=${Date.now()}`;
    const response = await fetch(dbUrl, { cache: 'no-store' });
    if (response.ok) {
      data = await response.json();
    }
  } catch (e) {
    console.error("Firebase load error:", e);
  }

  // Fallback to local storage if Firebase is unreachable or empty
  if (!data) {
    const rawData = localStorage.getItem('fw_content');
    if (rawData) data = JSON.parse(rawData);
  }

  if (!data) return;

  if (data.home) {
    if(data.home.text1) document.getElementById('home-text-1').value = data.home.text1;
    if(data.home.title) document.getElementById('home-title').value = data.home.title;
    if(data.home.subtitle) document.getElementById('home-subtitle').value = data.home.subtitle;
    if(data.home.authTitle) document.getElementById('home-auth-title').value = data.home.authTitle;
    if(data.home.heroImg) {
      document.getElementById('preview-home-hero').src = data.home.heroImg;
      document.getElementById('preview-home-hero').dataset.base64 = data.home.heroImg;
    }
  }
  
  if (data.pay) {
    if(data.pay.text1) document.getElementById('pay-text-1').value = data.pay.text1;
    if(data.pay.cash) document.getElementById('pay-cash').value = data.pay.cash;
    if(data.pay.bank) document.getElementById('pay-bank').value = data.pay.bank;
    if(data.pay.mobile) document.getElementById('pay-mobile').value = data.pay.mobile;
    if(data.pay.wechat) document.getElementById('pay-wechat').value = data.pay.wechat;
  }

  if (data.reach) {
    if(data.reach.text1) document.getElementById('reach-text-1').value = data.reach.text1;
    if(data.reach.address) document.getElementById('reach-address').value = data.reach.address;
    if(data.reach.hours) document.getElementById('reach-hours').value = data.reach.hours;
    if(data.reach.phone) document.getElementById('reach-phone').value = data.reach.phone;
    if(data.reach.email) document.getElementById('reach-email').value = data.reach.email;
    if(data.reach.wechat) document.getElementById('reach-wechat').value = data.reach.wechat;
    if(data.reach.map) document.getElementById('reach-map').value = data.reach.map;
    if(data.reach.barcode) {
      document.getElementById('preview-reach-barcode').src = data.reach.barcode;
      document.getElementById('preview-reach-barcode').dataset.base64 = data.reach.barcode;
    }
  }

  if (data.products) {
    if(data.products.text1) document.getElementById('products-text-1').value = data.products.text1;
    
    if (data.products.images) {
      for (const [cat, base64] of Object.entries(data.products.images)) {
        if (base64) {
          document.getElementById('preview-' + cat).src = base64;
          document.getElementById('preview-' + cat).dataset.base64 = base64;
        }
      }
    }
  }
}

// Expose functions globally for inline HTML onclick handlers
window.previewImage = previewImage;
window.clearImage = clearImage;
window.saveContent = saveContent;
