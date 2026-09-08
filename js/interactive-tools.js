/**
 * GLYTIVA | Interactive Clinical Tools Suite
 * Glycemic Load Calculator, Sydney GGE Spoons, Hypo 15-15 Timer, and TIR Simulator
 */

document.addEventListener('DOMContentLoaded', () => {
  initToolTabs();
  initGlycemicCalculator();
  initHypoRescueTimer();
  initTIRSimulator();
});

/* --------------------------------------------------------------------------
   1. Tool Tabs Switcher
   -------------------------------------------------------------------------- */
function initToolTabs() {
  const tabBtns = document.querySelectorAll('.tab-nav-btn, .tool-tab-btn');
  const panels = document.querySelectorAll('.tool-view-panel, .tool-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      tabBtns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   2. Glycemic Calculator & Sydney GGE Spoons Engine
   -------------------------------------------------------------------------- */
const sampleFoods = [
  {
    name: "أرز أبيض مصري مطبوخ (White Rice)",
    gi: 73,
    carbsPer100g: 28.0,
    fiberPer100g: 0.4,
    proteinPer100g: 2.7,
    fatPer100g: 0.3,
    defaultPortion: 150,
    pairing: "تناوله مع صدر دجاج مشوي وسلطة خضراء بزيت الزيتون لتسطيح امتصاص الجلوكوز بنسبة 40%."
  },
  {
    name: "تمر خلاص / سكري (Dates)",
    gi: 55,
    carbsPer100g: 75.0,
    fiberPer100g: 7.0,
    proteinPer100g: 2.0,
    fatPer100g: 0.4,
    defaultPortion: 40,
    pairing: "أقرن التمر بـ 4 حبات لوز نيء أو ملعقة طحينة سمسم لتقليل سرعة تدفق السكر للدم."
  },
  {
    name: "خبز أبيض شامي (White Pita Bread)",
    gi: 75,
    carbsPer100g: 54.0,
    fiberPer100g: 2.2,
    proteinPer100g: 8.5,
    fatPer100g: 1.2,
    defaultPortion: 60,
    pairing: "استبدله بخبز نخالة القمح الكامل وأضف بيضاً مسلوقاً أو جبناً قريش لتجنب نشويات مجردة."
  },
  {
    name: "عدس بني مطبوخ (Cooked Lentils)",
    gi: 32,
    carbsPer100g: 20.0,
    fiberPer100g: 7.9,
    proteinPer100g: 9.0,
    fatPer100g: 0.4,
    defaultPortion: 150,
    pairing: "طعام خارق للسكري (Superfood)! أليافه القابلة للذوبان تحسن سكر الصائم طوال الليل (Second-Meal Effect)."
  },
  {
    name: "بطاطس مسلوقة ومبردة (Boiled & Cooled Potato)",
    gi: 54,
    carbsPer100g: 17.5,
    fiberPer100g: 2.1,
    proteinPer100g: 2.0,
    fatPer100g: 0.1,
    defaultPortion: 150,
    pairing: "تبريد البطاطس في الثلاجة يحول نشاءها إلى (نشا مقاوم Resistant Starch) يخفض المؤشر الجلايسيمي."
  },
  {
    name: "شوفان كامل الحبة مطبوخ (Rolled Oats)",
    gi: 55,
    carbsPer100g: 12.0,
    fiberPer100g: 1.7,
    proteinPer100g: 2.5,
    fatPer100g: 1.4,
    defaultPortion: 180,
    pairing: "أضف بذور الشيا ومسحوق القرفة لتعزيز حساسية الخلايا للإنسولين وإبطاء الامتصاص."
  },
  {
    name: "تفاح أحمر طازج (Fresh Apple)",
    gi: 36,
    carbsPer100g: 13.8,
    fiberPer100g: 2.4,
    proteinPer100g: 0.3,
    fatPer100g: 0.2,
    defaultPortion: 120,
    pairing: "تناول التفاح مع قشرته الغنية بألياف البكتين التي تبطئ امتصاص سكر الفركتوز."
  }
];

function initGlycemicCalculator() {
  const foodSelect = document.getElementById('calc-food-select');
  const portionSlider = document.getElementById('calc-portion-slider');
  const portionBadge = document.getElementById('calc-portion-badge');

  const outGL = document.getElementById('calc-gl-val');
  const outGGE = document.getElementById('calc-gge-val');
  const outCategory = document.getElementById('calc-category-val');
  const outPairing = document.getElementById('calc-pairing-text');
  const cardGL = document.getElementById('calc-card-gl');

  if (!foodSelect || !portionSlider) return;

  // Populate Foods
  sampleFoods.forEach((food, idx) => {
    const opt = document.createElement('option');
    opt.value = idx;
    opt.textContent = `${food.name} (GI: ${food.gi})`;
    foodSelect.appendChild(opt);
  });

  function recalculate() {
    const selectedIdx = parseInt(foodSelect.value, 10);
    const portionGrams = parseFloat(portionSlider.value);
    portionBadge.textContent = `${portionGrams}g`;

    const food = sampleFoods[selectedIdx] || sampleFoods[0];
    const netCarbs100g = Math.max(0, food.carbsPer100g - food.fiberPer100g);
    const portionNetCarbs = netCarbs100g * (portionGrams / 100.0);

    // Glycemic Load = (GI * Net Carbs) / 100
    const gl = (food.gi * portionNetCarbs) / 100.0;
    // Sydney GGE Sugar Spoons = GL / 4
    const ggeSpoons = gl / 4.0;

    outGL.textContent = gl.toFixed(1);
    outGGE.textContent = `${ggeSpoons.toFixed(1)} 🥄`;

    // Category
    cardGL.classList.remove('green', 'gold', 'red');
    if (gl < 10.0) {
      outCategory.textContent = 'منخفض 🟢';
      outCategory.style.color = '#10B981';
      cardGL.classList.add('green');
    } else if (gl <= 19.0) {
      outCategory.textContent = 'متوسط 🟡';
      outCategory.style.color = '#F59E0B';
      cardGL.classList.add('gold');
    } else {
      outCategory.textContent = 'مرتفع 🔴';
      outCategory.style.color = '#EF4444';
      cardGL.classList.add('red');
    }

    outPairing.textContent = `💡 نصيحة سريرية: ${food.pairing}`;
  }

  foodSelect.addEventListener('change', recalculate);
  portionSlider.addEventListener('input', recalculate);
  recalculate();
}

/* --------------------------------------------------------------------------
   3. Hypo Rescue 15-15 Rule Protocol Simulator
   -------------------------------------------------------------------------- */
function initHypoRescueTimer() {
  const timerDisplay = document.getElementById('hypo-timer-val');
  const startBtn = document.getElementById('hypo-start-btn');
  const resetBtn = document.getElementById('hypo-reset-btn');
  const statusMsg = document.getElementById('hypo-status-text');

  if (!timerDisplay || !startBtn) return;

  let totalSeconds = 900; // 15 minutes = 900 seconds
  let intervalId = null;
  let isRunning = false;

  function updateDisplay() {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    timerDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  function playAlertBeep() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5 tone
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
    } catch (e) {
      console.log('Audio not supported or blocked:', e);
    }
  }

  startBtn.addEventListener('click', () => {
    if (isRunning) {
      // Pause
      clearInterval(intervalId);
      isRunning = false;
      startBtn.textContent = 'استئناف المؤقت ⏯️';
      startBtn.style.background = '#0284C7';
      if (statusMsg) statusMsg.textContent = 'المؤقت متوقف مؤقتاً';
    } else {
      // Start
      isRunning = true;
      startBtn.textContent = 'إيقاف مؤقت ⏸️';
      startBtn.style.background = '#EF4444';
      if (statusMsg) statusMsg.textContent = 'تناول 15 جم سكر سريع وانتظر العد التنازلي لإعادة الفحص...';

      intervalId = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateDisplay();
        } else {
          clearInterval(intervalId);
          isRunning = false;
          updateDisplay();
          playAlertBeep();
          if (statusMsg) statusMsg.textContent = '⏰ انتهت الـ 15 دقيقة! افحص سكر الدم الآن فوراً.';
          startBtn.textContent = 'بدء من جديد 🔄';
        }
      }, 1000);
    }
  });

  resetBtn.addEventListener('click', () => {
    clearInterval(intervalId);
    isRunning = false;
    totalSeconds = 900;
    updateDisplay();
    startBtn.textContent = 'بدء المؤقت (15 دقيقة) ▶️';
    startBtn.style.background = 'linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)';
    if (statusMsg) statusMsg.textContent = 'بروتوكول قاعدة 15-15: تناول 15 جم كربوهيدرات سريعة وابدأ المؤقت';
  });

  updateDisplay();
}

/* --------------------------------------------------------------------------
   4. Time In Range (TIR) Interactive Simulator
   -------------------------------------------------------------------------- */
function initTIRSimulator() {
  const slider = document.getElementById('tir-glucose-slider');
  const badge = document.getElementById('tir-glucose-badge');
  const ea1cOut = document.getElementById('tir-ea1c-val');
  const tirPercentOut = document.getElementById('tir-percent-val');
  const cvStatusOut = document.getElementById('tir-cv-val');

  const barTBR = document.getElementById('tir-bar-tbr');
  const barTIR = document.getElementById('tir-bar-tir');
  const barTAR = document.getElementById('tir-bar-tar');

  if (!slider || !badge) return;

  function updateTIR() {
    const avgGlucose = parseFloat(slider.value);
    badge.textContent = `${avgGlucose.toFixed(0)} mg/dL`;

    // ADAG formula: eA1c = (AvgGlucose + 46.7) / 28.7
    const eA1c = (avgGlucose + 46.7) / 28.7;
    ea1cOut.textContent = `${eA1c.toFixed(1)}%`;

    let tir = 0;
    let tar = 0;
    let tbr = 0;

    if (avgGlucose < 80) {
      tbr = Math.min(30, (80 - avgGlucose) * 1.5 + 5);
      tir = Math.max(10, 100 - tbr - 5);
      tar = 100 - tir - tbr;
    } else if (avgGlucose <= 140) {
      tbr = 2;
      tar = Math.max(0, (avgGlucose - 120) * 0.8);
      tir = 100 - tbr - tar;
    } else if (avgGlucose <= 200) {
      tbr = 1;
      tar = Math.min(65, (avgGlucose - 130) * 0.9);
      tir = 100 - tbr - tar;
    } else {
      tbr = 1;
      tar = Math.min(90, (avgGlucose - 140) * 0.7);
      tir = Math.max(5, 100 - tbr - tar);
    }

    tirPercentOut.textContent = `${tir.toFixed(0)}%`;

    if (barTBR) barTBR.style.width = `${tbr}%`;
    if (barTIR) barTIR.style.width = `${tir}%`;
    if (barTAR) barTAR.style.width = `${tar}%`;

    if (tir >= 70) {
      cvStatusOut.textContent = 'ممتاز (مستقر $\\le 36\%$) 🟢';
      cvStatusOut.style.color = '#10B981';
    } else if (tir >= 50) {
      cvStatusOut.textContent = 'مقبول (تذبذب معتدل) 🟡';
      cvStatusOut.style.color = '#F59E0B';
    } else {
      cvStatusOut.textContent = 'غير مستقر (تذبذب حاد) 🔴';
      cvStatusOut.style.color = '#EF4444';
    }
  }

  slider.addEventListener('input', updateTIR);
  updateTIR();
}
