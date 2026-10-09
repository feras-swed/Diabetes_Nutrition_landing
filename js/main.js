/**
 * GLUCO BALANCE | Main Application & Navigation Script (Light SaaS Theme)
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

/* --------------------------------------------------------------------------
   5. Dietitians Honor Board Sorting (Arabic & English with Mona Al-Salahi First)
   -------------------------------------------------------------------------- */
const DIETITIANS_TEAM = [
  { ar: 'منى أحمد حسن الصلاحي', en: 'Mona Ahmed Hasan Al-Salahi', isMona: true },
  { ar: 'براءه عبد الإله محمد عباس', en: 'Baraa Abdulilah Mohammed Abbas' },
  { ar: 'تغريد عبد الملك صالح الصعدي', en: 'Taghreed Abdulmalek Saleh Al-Saadi' },
  { ar: 'جماله عبد الله حسين المشدلي', en: 'Jamalah Abdullah Hussein Al-Mashdali' },
  { ar: 'غادة فؤاد علي القباطي', en: 'Ghada Fouad Ali Al-Qubati' },
  { ar: 'مروى محمد محمد راشد', en: 'Marwa Mohammed Mohammed Rashed' },
  { ar: 'ملاك زكريا هادي سالم', en: 'Malak Zakaria Hadi Salem' },
  { ar: 'مها مطهر أحمد مياس', en: 'Maha Mutahar Ahmed Mayas' },
  { ar: 'ميساء علي محمد ناشر', en: 'Maysa\'a Ali Mohammed Nasher' },
  { ar: 'ندى وحيد لطف حسان', en: 'Nada Waheed Lutuf Hassan' },
  { ar: 'هاجر عبد الرحيم عبد الله السنباني', en: 'Hajer Abdulrahim Abdullah Al-Sanabani' },
  { ar: 'هديل صادق محمد المصلي', en: 'Hadeel Sadiq Mohammed Al-Mosalli' },
];

function sortDietitians(lang) {
  const grid = document.getElementById('dietitians-grid');
  if (!grid) return;

  const arBtn = document.getElementById('sort-ar-btn');
  const enBtn = document.getElementById('sort-en-btn');

  if (lang === 'ar') {
    if (arBtn) {
      arBtn.style.background = 'var(--primary-navy)';
      arBtn.style.borderColor = 'var(--primary-navy)';
      arBtn.style.color = '#fff';
    }
    if (enBtn) {
      enBtn.style.background = '#fff';
      enBtn.style.borderColor = '#CBD5E1';
      enBtn.style.color = 'var(--primary-navy)';
    }
  } else {
    if (enBtn) {
      enBtn.style.background = 'var(--primary-navy)';
      enBtn.style.borderColor = 'var(--primary-navy)';
      enBtn.style.color = '#fff';
    }
    if (arBtn) {
      arBtn.style.background = '#fff';
      arBtn.style.borderColor = '#CBD5E1';
      arBtn.style.color = 'var(--primary-navy)';
    }
  }

  // Mona Al-Salahi is strictly #1 in both languages
  const mona = DIETITIANS_TEAM.find(d => d.isMona);
  const others = DIETITIANS_TEAM.filter(d => !d.isMona);

  if (lang === 'ar') {
    others.sort((a, b) => a.ar.localeCompare(b.ar, 'ar'));
  } else {
    others.sort((a, b) => a.en.localeCompare(b.en, 'en'));
  }

  const sorted = [mona, ...others];

  grid.innerHTML = sorted.map((d, idx) => `
    <div class="dietitian-tile">
      <div>
        <span class="d-name">${idx + 1}. ${d.ar}</span>
        <div style="font-size: 0.76rem; color: #64748B; font-weight: 600; margin-top: 2px;">${d.en}</div>
      </div>
      <span class="d-badge">تغذية وحميات</span>
    </div>
  `).join('');
}


