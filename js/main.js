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
  {
    ar: 'منى أحمد حسن الصلاحي',
    en: 'Mona Ahmed Hasan Al-Salahi',
    slug: 'mona-al-salahi',
    bioAr: 'أخصائية تغذية علاجية وحميات، متخصصة في التثقيف التغذوي السريري وتطوير البدائل والحلويات الصحية الملائمة لضبط سكر الدم ونمط الحياة الصحي. شاركت في إعداد ومراجعة الجداول التغذوية ومصفوفة الحصص لمنظومة GlucoBalance.',
    url: 'https://murshid.feshealthtech.com/p/?u=dr_mona_al_salahi',
    isMona: true
  },
  {
    ar: 'براءه عبد الإله محمد حسين عباس',
    en: 'Baraa Abdulilah Mohammed Abbas',
    slug: 'baraa-abbas',
    bioAr: 'أخصائية تغذية علاجية وحميات، مهتمة بالتثقيف الغذائي السريري وتنظيم الاحتياجات التغذوية للحالات الأيضية. ساهمت في مراجعة وتدقيق معايير الحصص وقواعد البيانات الغذائية لمنظومة GlucoBalance.',
    url: null
  },
  {
    ar: 'تغريد عبد الملك صالح الصعدي',
    en: 'Taghreed Abdulmalek Saleh Al-Saadi',
    slug: 'taghreed-al-saadi',
    bioAr: 'أخصائية تغذية علاجية وحميات (جامعة العلوم والتكنولوجيا)، مهتمة بالتوعية الصحية ودمج الحلول الرقمية بالرعاية التغذوية للأمراض المزمنة. ساهمت في إعداد ومراجعة البيانات السريرية والتغذوية لمنظومة GlucoBalance.',
    url: null
  },
  {
    ar: 'جماله عبد الله حسين المشدلي',
    en: 'Jamalah Abdullah Hussein Al-Mashdali',
    slug: 'jamalah-al-mashdali',
    bioAr: 'أخصائية تغذية علاجية وحميات، متخصصة في تصميم الخطط التغذوية السريرية للأمراض المزمنة واضطرابات التمثيل الغذائي والسكري ومقاومة الأنسولين. ساهمت في تدقيق قواعد البيانات التغذوية السريرية لمنظومة GlucoBalance.',
    url: 'https://murshid.feshealthtech.com/p/?u=dt_jamala_almashdali'
  },
  {
    ar: 'غادة فؤاد علي عبد الله القباطي',
    en: 'Ghada Fouad Ali Al-Qubati',
    slug: 'ghada-al-qubati',
    bioAr: 'أخصائية تغذية علاجية وحميات، متخصصة في تنظيم الوجبات وضبط استجابة سكر الدم وإدارة تأثير الكربوهيدرات على المؤشر الجلايسيمي. ساهمت في تدقيق ومراجعة قواعد بيانات الأغذية لمنظومة GlucoBalance.',
    url: null
  },
  {
    ar: 'مروى محمد علي راشد',
    en: 'Marwa Mohammed Ali Rashed',
    slug: 'marwa-rashed',
    bioAr: 'أخصائية تغذية علاجية وحميات (جامعة العلوم والتكنولوجيا)، حاصلة على دبلوم تخصصي ومهتمة بالتغذية الرياضية والتثقيف المجتمعي. ساهمت في مراجعة البيانات التغذوية والإرشادات السريرية لتطبيق GlucoBalance.',
    url: 'https://murshid.feshealthtech.com/p/?u=dr_marwa_rashed'
  },
  {
    ar: 'ملاك زكريا عبد الحكيم هادي سالم',
    en: 'Malak Zakaria Hadi Salem',
    slug: 'malak-zakaria',
    bioAr: 'أخصائية تغذية علاجية وحميات، متخصصة في التثقيف الصحي وتبسيط المفاهيم السريرية للوقاية من الاضطرابات الأيضية. ساهمت في مراجعة وتدقيق معايير الحصص والمحتوى التغذوي لمنظومة GlucoBalance.',
    url: 'https://murshid.feshealthtech.com/p/?u=dr_malak_zakaria'
  },
  {
    ar: 'مها مطهر أحمد مياس',
    en: 'Maha Mutahar Ahmed Mayas',
    slug: 'maha-mayas',
    bioAr: 'أخصائية تغذية علاجية وحميات (جامعة العلوم والتكنولوجيا)، مهتمة بالبحث العلمي والتدخلات الغذائية المسندة بالدليل والتغذية الرياضية. شاركت ضمن فريق GlucoBalance في تطوير ومراجعة بيانات الإدارة التغذوية لمرضى السكري من النوع الثاني.',
    url: 'https://murshid.feshealthtech.com/p/?u=dr_mahamotahar_mayas'
  },
  {
    ar: 'ميساء علي محمد ناشر',
    en: 'Maysa\'a Ali Mohammed Nasher',
    slug: 'maysaa-nasher',
    bioAr: 'أخصائية تغذية علاجية وحميات (جامعة العلوم والتكنولوجيا)، متخصصة في إدارة تغذية السكري والمكملات ونمط الحياة الصحي والتثقيف الرقمي. ساهمت في إعداد وتدقيق الحسابات الإكلينيكية والبيانات التغذوية لمنظومة GlucoBalance.',
    url: 'https://murshid.feshealthtech.com/p/?u=dr_maysaa_nasher'
  },
  {
    ar: 'ندى وحيد لطف حسان',
    en: 'Nada Waheed Lutuf Hassan',
    slug: 'nada-hassan',
    bioAr: 'أخصائية تغذية علاجية وحميات (جامعة العلوم والتكنولوجيا)، مهتمة بالتثقيف الغذائي السريري وتبسيط المفاهيم الوقائية المبنية على الأدلة. ساهمت في تطوير ومراجعة المحتوى التغذوي لمنظومة GlucoBalance.',
    url: null
  },
  {
    ar: 'هاجر عبد الرحيم عبد الله السنباني',
    en: 'Hajer Abdulrahim Abdullah Al-Sanabani',
    slug: 'hajer-al-sanabani',
    bioAr: 'أخصائية تغذية علاجية وحميات (جامعة العلوم والتكنولوجيا)، حاصلة على دبلوم مهني في التغذية وناشطة في التوعية الصحية الرقمية. ساهمت في إعداد ومراجعة الحسابات الإكلينيكية والبيانات التغذوية لمنظومة GlucoBalance.',
    url: 'https://murshid.feshealthtech.com/p/?u=dr_hajer_sanabani'
  },
  {
    ar: 'هديل صادق محمد عاطف المصلي',
    en: 'Hadeel Sadiq Mohammed Al-Mosalli',
    slug: 'hadeel-al-mosalli',
    bioAr: 'أخصائية تغذية علاجية وحميات، تركز على الرعاية التغذوية السريرية المبنية على الأدلة لتحسين جودة حياة المرضى. شاركت في بناء الجداول التغذوية ومراجعة حسابات المؤشر والحمل الجلايسيمي ضمن فريق GlucoBalance.',
    url: 'https://murshid.feshealthtech.com/p/?u=dr_hadeel_msuli'
  }
];

function renderDietitianCard(d, idx) {
  const footerAction = d.url
    ? `<a href="${d.url}" target="_blank" rel="noopener noreferrer" class="d-link-btn" itemprop="url" aria-label="زيارة الملف المهني لـ ${d.ar}">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
        <span>الملف المهني الموثق</span>
        <span class="d-link-arrow">↗</span>
      </a>`
    : `<div class="d-inst-badge">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18"/><path d="M5 21V9l7-5 7 5v12"/><path d="M9 21v-6a2 2 0 0 1 4 0v6"/></svg>
        <span>جامعة العلوم والتكنولوجيا • UST</span>
      </div>`;

  return `
    <article class="dietitian-card" id="${d.slug}" itemscope itemtype="https://schema.org/Person">
      <div class="d-card-top">
        <div class="d-avatar-circle" aria-hidden="true">👩‍⚕️</div>
        <div class="d-meta">
          <div class="d-badge-row">
            <span class="d-badge" itemprop="jobTitle">أخصائية تغذية علاجية</span>
            <span class="d-num">#${idx + 1}</span>
          </div>
          <h4 class="d-name" itemprop="name">${d.ar}</h4>
          <div class="d-en-name" itemprop="alternateName">${d.en}</div>
        </div>
      </div>
      <p class="d-bio" itemprop="description">${d.bioAr}</p>
      <div class="d-card-footer">
        ${footerAction}
      </div>
    </article>
  `;
}

function sortDietitians(lang) {
  const grid = document.getElementById('dietitians-grid');
  if (!grid) return;

  const arBtn = document.getElementById('sort-ar-btn');
  const enBtn = document.getElementById('sort-en-btn');

  if (lang === 'ar') {
    if (arBtn) {
      arBtn.classList.add('active');
      arBtn.style.background = '';
      arBtn.style.borderColor = '';
      arBtn.style.color = '';
    }
    if (enBtn) {
      enBtn.classList.remove('active');
      enBtn.style.background = '';
      enBtn.style.borderColor = '';
      enBtn.style.color = '';
    }
  } else {
    if (enBtn) {
      enBtn.classList.add('active');
      enBtn.style.background = '';
      enBtn.style.borderColor = '';
      enBtn.style.color = '';
    }
    if (arBtn) {
      arBtn.classList.remove('active');
      arBtn.style.background = '';
      arBtn.style.borderColor = '';
      arBtn.style.color = '';
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
  grid.innerHTML = sorted.map((d, idx) => renderDietitianCard(d, idx)).join('');
}


