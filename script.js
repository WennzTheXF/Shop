const loading = document.getElementById('loading');
    const intro = document.getElementById('intro');
    const main = document.getElementById('main');
    const audio = document.getElementById('audio');
    const clickSound = document.getElementById('clickSound');
    const themeIcon = document.getElementById('themeIcon');
    const orderModal = document.getElementById('orderModal');
    const whatsappOrder = document.getElementById('whatsappOrder');
    const telegramOrder = document.getElementById('telegramOrder');

    const texts = ["Hello, I'm TuanVinn.", "Web Developer. Code Dreamer.", "From idea to launch.", "Click - Type - Create.", "Welcome to my world."];
    
    function typeText(el, words) {
      let index = 0, char = 0, isComplete = false;
      function type() {
        if (!isComplete && index < words.length) {
          if (char <= words[index].length) {
            el.textContent = words[index].slice(0, char++);
            setTimeout(type, 80);
          } else {
            index++; char = 0;
            setTimeout(type, 1000);
          }
        } else if (!isComplete) {
          isComplete = true;
          el.innerHTML += "<br><span style='color: rgba(255, 255, 255, 0.9); font-weight: 500;'>Transforming Ideas into Digital Solutions</span>";
        }
      }
      type();
    }

    function toggleTheme() {
      playClickSound();
      const body = document.body;
      const currentTheme = body.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      body.setAttribute('data-theme', newTheme);
      themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      
      localStorage.setItem('theme', newTheme);
    }

    function loadTheme() {
      const savedTheme = localStorage.getItem('theme') || 'dark';
      document.body.setAttribute('data-theme', savedTheme);
      themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    window.onload = () => {
      loadTheme();
      setTimeout(() => {
        loading.style.display = 'none';
        intro.style.display = 'block';
        typeText(document.getElementById("introTyping"), texts);
      }, 4000);
    };

    function goToMain() {
      playClickSound();
      intro.style.display = 'none';
      main.style.display = 'block';
      audio.play().catch(e => console.log('Audio autoplay prevented'));
      typeText(document.getElementById("mainTyping"), texts);
    }

    function showSection(section) {
      playClickSound();
      document.querySelectorAll('.main-content').forEach(el => el.style.display = 'none');
      document.getElementById(section).style.display = 'block';
    }

    function backToMain() {
      playClickSound();
      document.querySelectorAll('.main-content').forEach(el => el.style.display = 'none');
      main.style.display = 'block';
    }

    function copyNumber(number) {
      playClickSound();
      navigator.clipboard.writeText(number).then(() => {
        showNotification(`<i class="fas fa-check-circle"></i> Number copied: ${number}`);
      }).catch(() => {
        showNotification(`<i class="fas fa-exclamation-circle"></i> Failed to copy. Please copy manually: ${number}`);
      });
    }

    function downloadQRIS() {
      playClickSound();
      const qrisImage = document.getElementById('qrisImage');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.crossOrigin = 'anonymous';
      img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        const link = document.createElement('a');
        link.download = 'TuanVinn-QRIS-Payment.png';
        link.href = canvas.toDataURL();
        link.click();
        
        showNotification(`<i class="fas fa-download"></i> QRIS downloaded successfully!`);
      };
      
      img.src = qrisImage.src;
    }

    function toggleOrderOptions(button) {
      playClickSound();
      const orderOptions = button.nextElementSibling;
      const allOptions = document.querySelectorAll('.order-options');
      
      // Close all other options first
      allOptions.forEach(option => {
        if (option !== orderOptions) {
          option.classList.remove('active');
        }
      });
      
      // Toggle current option
      orderOptions.classList.toggle('active');
    }

    function openModal(productName, price) {
      playClickSound();
      const modalTitle = document.querySelector('.modal-title');
      const modalBody = document.querySelector('.modal-body');
      
      modalTitle.innerHTML = `Order ${productName}`;
      modalBody.innerHTML = `
        <p>You're ordering: <strong>${productName}</strong></p>
        <p>Price: <strong>${price}</strong></p>
        <p>Please select your preferred contact method:</p>
      `;
      
      const whatsappText = encodeURIComponent(`Hi TuanVinn, I want to order ${productName} (${price}). Please provide more details.`);
      const telegramText = encodeURIComponent(`Hi TuanVinn, I want to order ${productName} (${price}). Please provide more details.`);
      
      whatsappOrder.href = `https://wa.me/6285172360191?text=${whatsappText}`;
      telegramOrder.href = `https://t.me/TuanVinn7`;
      
      orderModal.classList.add('active');
    }

    function closeModal() {
      playClickSound();
      orderModal.classList.remove('active');
    }

    function showNotification(message) {
      const notification = document.createElement('div');
      notification.className = 'notification';
      notification.innerHTML = message;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
      }, 3000);
    }

    function playClickSound() {
      clickSound.currentTime = 0;
      clickSound.play().catch(e => console.log('Sound play prevented'));
    }

    document.addEventListener('DOMContentLoaded', function() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
          }
        });
      });

      document.querySelectorAll('.product-card, .payment-method').forEach(el => {
        observer.observe(el);
      });
    });

    // Close order options when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.order-options') && !e.target.closest('.btn-primary')) {
        document.querySelectorAll('.order-options').forEach(option => {
          option.classList.remove('active');
        });
      }
    });

    // Close modal when clicking outside
    orderModal.addEventListener('click', function(e) {
      if (e.target === orderModal) {
        closeModal();
      }
    });