// =============================================
// CONSTANTES E VARIÁVEIS GLOBAIS
// =============================================
const WORKOUT_DAYS = [1, 2, 3, 4, 5];
let currentUser = localStorage.getItem('projetoMonstroUser') || '';
let currentWorkoutDay = null;

const workoutData = {
  1: {
    title: "Peito (Ênfase) + Tríceps + Ombro (leve) + Abdômen + Cardio",
    exercises: [
      "Supino reto barra – 4x 8-10 🔥",
      "Supino inclinado halteres – 4x 10-12",
      "Supino declinado ou máquina – 3x 10-12",
      "Crucifixo máquina ou voador – 3x 12-15",
      "Tríceps pulley barra reta – 4x 12",
      "Tríceps corda – 3x 12-15",
      "Elevação lateral – 3x 15 (leve, só ativar)",
      "Prancha + abdominal infra – 3x 40 seg + 20 reps"
    ],
    notes: "✔️ Cardio Pós:<br />→ 15 a 20 min moderado (esteira inclinada, bike ou escada)"
  },
  2: {
    title: "Pernas Completa + Abdômen + Cardio leve",
    exercises: [
      "Agachamento livre ou smith – 4x 8-10",
      "Leg press 45° – 4x 10-12",
      "Cadeira extensora – 4x 12-15",
      "Stiff com halteres ou barra – 4x 10-12",
      "Mesa flexora – 3x 12-15",
      "Afundo com halteres (passada) – 3x 10 cada perna",
      "Gêmeos em pé ou sentado – 4x 20",
      "Abdômen: Infra (elevação pernas) – 4x 20"
    ],
    notes: "✔️ Cardio leve: 20-30 min (esteira inclinada, escada, bike leve)"
  },
  3: {
    title: "Costas + Bíceps + HIIT",
    exercises: [
      "Puxada frente aberta – 4x 10-12",
      "Remada curvada barra ou halter – 4x 8-10",
      "Remada baixa máquina ou polia – 4x 10-12",
      "Pullover polia alta ou máquina – 3x 12-15",
      "Rosca direta barra – 4x 10-12",
      "Rosca alternada halteres – 3x 12",
      "Rosca martelo – 3x 12-15"
    ],
    notes: "✔️ HIIT Pós:<br />→ 20 seg forte (corrida/bike/corda) + 40 seg leve → 8 a 10 voltas (10-15 min)"
  },
  4: {
    title: "Ombro (Ênfase) + Tríceps + Peito (leve) + Abdômen + Cardio",
    exercises: [
      "Desenvolvimento halteres ou barra – 4x 10",
      "Elevação lateral – 4x 15 (prioriza)",
      "Elevação frontal – 3x 12",
      "Crucifixo inverso (posterior) – 4x 15",
      "Tríceps pulley inverso (barra V ou corda) – 4x 12",
      "Tríceps testa ou coice halter – 3x 12-15",
      "Supino reto halteres ou máquina (leve) – 3x 10",
      "Abdominal no cross – 3x 20"
    ],
    notes: "✔️ Cardio pós: 15-20 min moderado"
  },
  5: {
    title: "Full Body Metabólico + Core + HIIT - Circuito (3-5 voltas, descanso 60 seg por volta)",
    exercises: [
      "Agachamento halteres – 15",
      "Flexão de braço – 15",
      "Remada curvada halteres – 15",
      "Desenvolvimento halteres – 15",
      "Rosca direta – 15",
      "Tríceps corda – 15",
      "Abdominal infra – 20",
      "Prancha – 40 seg"
    ],
    notes: "✔️ HIIT pós: 20 seg forte + 40 seg leve (8 a 10 voltas)"
  }
};

// =============================================
// GERENCIAMENTO DE USUÁRIO
// =============================================
function loginUser(username) {
  if (!username.trim()) {
    alert('Digite seu nome para começar!');
    return false;
  }
  currentUser = username.trim();
  localStorage.setItem('projetoMonstroUser', currentUser);
  return true;
}

function checkAuth() {
  if (!currentUser && !document.body.classList.contains('login-page')) {
    navigateTo('index.html');
    return false;
  }
  return true;
}

// =============================================
// NAVEGAÇÃO
// =============================================
function navigateTo(page) {
  window.location.href = `./${page}`;
}

function setupBackButtons() {
  document.querySelectorAll('.back-button, #btn-back').forEach(btn => {
    btn.addEventListener('click', () => navigateTo('menu.html'));
  });
}

function setupWorkoutNavigation() {
  document.querySelectorAll('.day-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      navigateTo(`workout.html?day=${btn.dataset.day}`);
    });
  });
}

// =============================================
// GERENCIAMENTO DE TREINOS
// =============================================
function loadWorkoutDay(day) {
  if (!workoutData[day]) return;
  
  currentWorkoutDay = day;
  const dayData = workoutData[day];

  document.getElementById('day-number').textContent = day;
  document.title = `Treino - Dia ${day}`;

  const workoutSection = document.getElementById('workout-day');
  workoutSection.innerHTML = `
    <h2>Dia ${day} – ${dayData.title}</h2>
    <ul class="workout-list">
      ${dayData.exercises.map((ex, i) => `
        <li class="workout-item">
          <label>
            <input type="checkbox" class="workout-checkbox" data-exercise="${i}">
            ${ex}
          </label>
        </li>
      `).join('')}
    </ul>
    <p class="workout-notes">${dayData.notes}</p>
  `;

  // Carrega progresso salvo
  const savedProgress = JSON.parse(localStorage.getItem(`workoutDay${day}`)) || {};
  const checkboxes = document.querySelectorAll('.workout-checkbox');
  
  checkboxes.forEach((checkbox, index) => {
    checkbox.checked = savedProgress[index] || false;
    checkbox.addEventListener('change', function() {
      const currentStatus = Array.from(checkboxes).map(cb => cb.checked);
      localStorage.setItem(`workoutDay${day}`, JSON.stringify(currentStatus));
    });
  });
}

// =============================================
// GERENCIAMENTO DE DIETA
// =============================================
function setupDietPage() {
  setupDietCalendar();
  setupDietTabs();
  updateCurrentDayInfo();
  
  // Botões de ação
  document.getElementById('save-diet-btn')?.addEventListener('click', saveDiet);
  document.getElementById('reset-diet-btn')?.addEventListener('click', resetDiet);
}

function setupDietCalendar() {
  const weekDaysContainer = document.querySelector('.week-days');
  const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  
  // Carrega configuração salva
  const savedConfig = JSON.parse(localStorage.getItem('dietCalendar')) || {
    carboAltoDay: null,
    weekStart: getStartOfWeek(new Date()).toISOString()
  };

  // Cria os dias da semana
  daysOfWeek.forEach((day, index) => {
    const dayElement = document.createElement('div');
    dayElement.className = `day-selector ${savedConfig.carboAltoDay === index ? 'selected carbo-day' : 'normal-day'}`;
    dayElement.textContent = day;
    dayElement.dataset.dayIndex = index;
    
    dayElement.addEventListener('click', function() {
      if (this.classList.contains('disabled')) return;
      
      // Atualiza seleção
      updateDaySelection(index);
      
      // Atualiza e salva configuração
      const newConfig = {
        carboAltoDay: index,
        weekStart: savedConfig.weekStart
      };
      localStorage.setItem('dietCalendar', JSON.stringify(newConfig));
      
      // Atualiza a interface
      updateDietDisplay();
      updateCurrentDayInfo();
    });
    
    weekDaysContainer.appendChild(dayElement);
  });

  // Atualiza estado inicial
  updateDietDisplay();
}

function updateDaySelection(selectedIndex) {
  document.querySelectorAll('.day-selector').forEach(day => {
    const dayIndex = parseInt(day.dataset.dayIndex);
    day.classList.remove('selected', 'carbo-day', 'normal-day', 'disabled');
    
    if (dayIndex === selectedIndex) {
      day.classList.add('selected', 'carbo-day');
    } else {
      day.classList.add('normal-day', 'disabled');
    }
  });
}

function getStartOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
}

function setupDietTabs() {
  const tabs = document.querySelectorAll('.diet-tab');
  const contents = document.querySelectorAll('.diet-content');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.getAttribute('data-tab');
      
      // Ativa aba clicada
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      
      tab.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });
}

function updateDietDisplay() {
  const savedConfig = JSON.parse(localStorage.getItem('dietCalendar')) || {};
  const today = new Date().getDay();
  const isCarboAltoDay = savedConfig.carboAltoDay === today;
  
  // Ativa a aba correspondente
  const tabToActivate = isCarboAltoDay ? 'high-carb' : 'low-carb';
  document.querySelector(`.diet-tab[data-tab="${tabToActivate}"]`).click();
}

function updateCurrentDayInfo() {
  const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const today = new Date();
  const dayName = days[today.getDay()];
  
  const savedConfig = JSON.parse(localStorage.getItem('dietCalendar')) || {};
  const isCarboAltoDay = savedConfig.carboAltoDay === today.getDay();
  
  document.getElementById('current-day-name').textContent = dayName;
  const dietTypeElement = document.getElementById('current-diet-type');
  
  dietTypeElement.textContent = isCarboAltoDay ? 'Carbo Alto' : 'Carbo Baixo';
  dietTypeElement.className = isCarboAltoDay ? 'diet-type-badge carbo-high' : 'diet-type-badge carbo-low';
}

function saveDiet() {
  // Implemente conforme necessário para salvar outras preferências
  alert('Configurações de dieta salvas com sucesso!');
}

function resetDiet() {
  if (confirm('Tem certeza que deseja resetar TODAS as configurações de dieta?')) {
    localStorage.removeItem('dietCalendar');
    document.querySelectorAll('.day-selector').forEach(day => {
      day.classList.remove('selected', 'carbo-day', 'disabled');
      day.classList.add('normal-day');
    });
    updateCurrentDayInfo();
  }
}

// =============================================
// CONFIGURAÇÃO DE PÁGINAS
// =============================================
function setupLoginPage() {
  const btnLogin = document.getElementById('btn-login');
  const usernameInput = document.getElementById('username');

  if (btnLogin && usernameInput) {
    btnLogin.addEventListener('click', () => {
      if (loginUser(usernameInput.value)) {
        navigateTo('menu.html');
      }
    });

    usernameInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') btnLogin.click();
    });
  }
}

function setupMenuPage() {
  document.getElementById('user-name').textContent = currentUser;
  setupWorkoutNavigation();
  setupAutoSchedule();
  
  document.querySelectorAll('.menu-option').forEach(option => {
    if (option.dataset.target) {
      option.addEventListener('click', () => navigateTo(option.dataset.target));
    }
  });
}

function setupWorkoutPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const day = parseInt(urlParams.get('day'));

  if (day && workoutData[day]) {
    loadWorkoutDay(day);
  } else {
    navigateTo('menu.html');
  }
}

function setupAutoSchedule() {
  const today = new Date().getDay();
  const workoutSchedule = {
    1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: null, 0: null
  };
  
  const todayWorkout = workoutSchedule[today];
  if (todayWorkout) {
    document.querySelector(`.day-btn[data-day="${todayWorkout}"]`)?.classList.add('today-workout');
  }
}

// =============================================
// INICIALIZAÇÃO
// =============================================
function initializePage() {
  if (!checkAuth()) return;
  
  setupBackButtons();

  if (document.body.classList.contains('login-page')) setupLoginPage();
  if (document.body.classList.contains('menu-page')) setupMenuPage();
  if (document.body.classList.contains('workout-page')) setupWorkoutPage();
  if (document.body.classList.contains('diet-page')) setupDietPage();
}

document.addEventListener('DOMContentLoaded', initializePage);