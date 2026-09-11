/**
 * GLYTIVA | Main Application & Navigation Script (Light SaaS Theme)
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initAccordions();
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


