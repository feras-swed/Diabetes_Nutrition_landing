/**
 * GLYTIVA | Main Application & Navigation Script (Light SaaS Theme)
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initAccordions();
  initDownloadModal();
});

/* --------------------------------------------------------------------------
   1. Mobile Menu Drawer Toggle
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const drawer = document.getElementById('mobile-drawer');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('open');
    drawer.classList.toggle('show');
  });

  // Close drawer when clicking any nav link
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggleBtn.classList.remove('open');
      drawer.classList.remove('show');
    });
  });
}

/* --------------------------------------------------------------------------
   2. Accordion Component
   -------------------------------------------------------------------------- */
function initAccordions() {
  const headers = document.querySelectorAll('.light-accordion-header');

  headers.forEach(header => {
    header.addEventListener('click', () => {
      const card = header.closest('.light-accordion-card');
      const isActive = card.classList.contains('active');

      // Close other accordions in the same group
      const parent = card.parentElement;
      parent.querySelectorAll('.light-accordion-card').forEach(c => {
        c.classList.remove('active');
      });

      if (!isActive) {
        card.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   3. Toast Notification
   -------------------------------------------------------------------------- */
function showToast(message) {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'toast-popup';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span>✨</span> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* --------------------------------------------------------------------------
   4. Copy To Clipboard
   -------------------------------------------------------------------------- */
function copyToClipboard(text, successMessage) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(successMessage || 'تم النسخ إلى الحافظة بنجاح!');
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}

/* --------------------------------------------------------------------------
   5. Coming Soon Download Modal (بطاقة إشعار قريباً بإذن الله)
   -------------------------------------------------------------------------- */
function initDownloadModal() {
  // Ensure modal markup exists
  let modal = document.getElementById('download-soon-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'download-soon-modal';
    modal.className = 'app-modal-backdrop';
    modal.innerHTML = `
      <div class="app-modal-card">
        <div class="modal-icon-glow">🚀</div>
        <div class="modal-status-badge">النسخة الرسمية قيد التجهيز للنشر</div>
        <h3 class="modal-main-title">التطبيق غير متوفر للتحميل حالياً</h3>
        <p class="modal-desc-text">
          يجري حالياً وضع اللمسات السريرية والتقنية الأخيرة واعتماد النسخة النهائية لتطبيق <strong>GLYTIVA</strong> على المتاجر وتوفير حزمة التثبيت المباشر (APK).<br><br>
          سيتم إتاحة رابط التحميل قريباً جداً بإذن الله!
        </p>
        <button type="button" class="modal-btn-close" id="modal-close-btn">حسناً، فهمت ذلك</button>
      </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('#modal-close-btn');
    closeBtn.addEventListener('click', closeDownloadModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeDownloadModal();
      }
    });
  }

  // Attach to all download buttons
  const downloadTriggers = document.querySelectorAll('.btn-download-nav, .btn-download-trigger, a[href="#download"], a[href*="github.com"]');
  downloadTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openDownloadModal();
    });
  });
}

function openDownloadModal() {
  const modal = document.getElementById('download-soon-modal');
  if (modal) {
    modal.classList.add('show');
  }
}

function closeDownloadModal() {
  const modal = document.getElementById('download-soon-modal');
  if (modal) {
    modal.classList.remove('show');
  }
}
