// =============================================
// CONSTANTES E VARIÁVEIS GLOBAIS
// =============================================
const WORKOUT_DAYS = [1, 2, 3, 4, 5];
// This will correctly get 'gabs' (or whatever value is set on login) if set, or '' otherwise
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
      "Agachamento livre ou smith – 4x 8-10 🔥",
      "Leg Press – 4x 10-12",
      "Cadeira extensora – 3x 12-15 (com isometria de pico)",
      "Mesa ou cadeira flexora – 3x 12-15",
      "Stiff ou levantamento terra romeno – 3x 10-12",
      "Panturrilha sentado – 4x 15-20",
      "Panturrilha em pé ou leg press – 3x 15-20",
      "Abdominal remador – 3x 15-20"
    ],
    notes: "✔️ Cardio Pós:<br />→ 15 a 20 min moderado (esteira inclinada, bike ou escada)"
  },
  3: {
    title: "Costas (Ênfase) + Bíceps + Posterior de Ombro + Abdômen + Cardio",
    exercises: [
      "Puxada alta (barra ou triângulo) – 4x 8-10 🔥",
      "Remada sentado (máquina ou cabo) – 4x 10-12",
      "Remada curvada ou máquina unilateral – 3x 10-12",
      "Pullover com corda ou halteres – 3x 12-15",
      "Rosca direta barra W – 4x 10-12",
      "Rosca alternada halteres – 3x 12-15",
      "Crucifixo invertido ou posterior ombro máquina – 3x 15",
      "Abdominal canivete – 3x 15-20"
    ],
    notes: "✔️ Cardio Pós:<br />→ 15 a 20 min moderado (esteira inclinada, bike ou escada)"
  },
  4: {
    title: "Ombro Completo (Ênfase) + Trapézio + Tríceps leve + Abdômen + Cardio",
    exercises: [
      "Desenvolvimento de ombro halteres ou máquina – 4x 8-10 🔥",
      "Elevação lateral halteres ou cabo – 4x 12-15",
      "Elevação frontal halteres ou cabo – 3x 12-15",
      "Encolhimento com halteres ou barra – 4x 10-12",
      "Tríceps testa ou francês (leve, só ativar) – 3x 12-15",
      "Abdominal oblíquo ou russo – 3x 15-20 (cada lado)"
    ],
    notes: "✔️ Cardio Pós:<br />→ 15 a 20 min moderado (esteira inclinada, bike ou escada)"
  },
  5: {
    title: "Pernas (Posterior + Glúteo Ênfase) + Panturrilha + Cardio leve",
    exercises: [
      "Levantamento Terra (sumô ou convencional) – 4x 6-8 🔥",
      "Elevação pélvica ou glúteo máquina – 4x 10-12",
      "Passada ou afundo (andando ou parado) – 3x 10-12 (cada perna)",
      "Mesa ou cadeira flexora – 4x 12-15 (com isometria de pico)",
      "Cadeira abdutora – 3x 15-20",
      "Panturrilha em pé – 4x 15-20",
      "Cardio Intenso (HIIT ou tiro na esteira) – 15-20 min"
    ],
    notes: "✔️ Cardio Pós:<br />→ 15 a 20 min moderado (esteira inclinada, bike ou escada)"
  }
};

// =============================================
// GERENCIAMENTO DE USUÁRIO E AUTENTICAÇÃO
// =============================================

function checkAuth() {
  // If currentUser is empty and we are not on the login page, redirect to login.
  // This prevents infinite loops if localStorage is cleared or not set.
  if (!currentUser && !document.body.classList.contains('login-page')) {
    navigateTo('index.html');
    return false;
  }
  return true;
}

// =============================================
// NAVEGAÇÃO
// =============================================

function navigateTo(url) {
  window.location.href = url;
}

function setupBackButtons() {
  const btnBack = document.getElementById('btn-back');
  if (btnBack) {
    btnBack.addEventListener('click', () => {
      // For workout.html, go back to menu.html
      // For diet.html, go back to menu.html
      // This ensures a consistent back navigation
      if (document.body.classList.contains('workout-page') || document.body.classList.contains('diet-page')) {
        navigateTo('menu.html');
      } else {
        // Fallback for other pages, though not explicitly used in this structure
        window.history.back();
      }
    });
  }
}

function setupWorkoutNavigation() {
  const dayButtons = document.querySelectorAll('.day-selector .day-btn');
  dayButtons.forEach(button => {
    button.addEventListener('click', () => {
      const day = button.dataset.day;
      navigateTo(`workout.html?day=${day}`);
    });
  });
}

// =============================================
// CONFIGURAÇÃO DE PÁGINAS
// =============================================

function setupLoginPage() {
  const btnLogin = document.getElementById('btn-login');
  // Use 'password' as the ID for the input, consistent with index.html
  const passwordInput = document.getElementById('password'); 
  const messageElement = document.getElementById('message');

  if (btnLogin && passwordInput) {
    btnLogin.addEventListener('click', () => {
      const password = passwordInput.value;
      if (password === "121314") { // Hardcoded password check
        currentUser = "gabs"; // Set a value to signify logged in
        localStorage.setItem('projetoMonstroUser', currentUser); // Set local storage
        messageElement.textContent = "Acesso concedido! Redirecionando...";
        messageElement.style.color = "green";
        setTimeout(() => {
          navigateTo('menu.html'); // Redirect to menu.html
        }, 1500);
      } else {
        messageElement.textContent = "Senha incorreta! Tente novamente.";
        messageElement.style.color = "red";
      }
    });

    passwordInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') btnLogin.click();
    });
  }
}

function setupMenuPage() {
  // Only try to set textContent if the element exists
  const userNameSpan = document.getElementById('user-name');
  if (userNameSpan) {
    userNameSpan.textContent = currentUser;
  }
  
  setupWorkoutNavigation();
  setupAutoSchedule(); // Call auto-schedule for menu page

  document.querySelectorAll('.menu-option').forEach(option => {
    if (option.dataset.target) {
      option.addEventListener('click', () => navigateTo(option.dataset.target));
    }
  });
}

function setupWorkoutPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const day = parseInt(urlParams.get('day'));
  currentWorkoutDay = day; // Store the current workout day

  if (day && workoutData[day]) {
    loadWorkoutDay(day);
  } else {
    // If no valid day, redirect back to menu to avoid broken page
    navigateTo('menu.html');
  }
}

function loadWorkoutDay(day) {
  const workoutSection = document.getElementById('workout-day');
  const dayNumberSpan = document.getElementById('day-number');

  if (!workoutSection || !dayNumberSpan) {
    console.error("Elementos de treino não encontrados.");
    return;
  }

  const data = workoutData[day];
  if (!data) {
    workoutSection.innerHTML = `<p>Dados de treino para o Dia ${day} não encontrados.</p>`;
    return;
  }

  dayNumberSpan.textContent = day;
  let exercisesHtml = data.exercises.map(ex => `<li>${ex}</li>`).join('');
  let notesHtml = data.notes ? `<p class="workout-notes">${data.notes}</p>` : '';

  workoutSection.innerHTML = `
    <h2>${data.title}</h2>
    <h3>Exercícios:</h3>
    <ul class="exercise-list">
      ${exercisesHtml}
    </ul>
    ${notesHtml}
  `;
}

function setupDietPage() {
  const weekDaysContainer = document.querySelector('.week-days');
  const currentDayName = document.getElementById('current-day-name');
  const currentDietType = document.getElementById('current-diet-type');
  const saveDietBtn = document.getElementById('save-diet-btn');
  const carbHighMealsContainer = document.getElementById('carb-high-meals');
  const carbLowMealsContainer = document.getElementById('carb-low-meals');

  // Load saved diet config from localStorage
  let savedDietConfig = JSON.parse(localStorage.getItem('dietConfig')) || { highCarbDay: null };

  // Generate day buttons
  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  weekDaysContainer.innerHTML = ''; // Clear previous content
  for (let i = 0; i < 7; i++) {
    const dayBtn = document.createElement('button');
    dayBtn.classList.add('day-btn-diet');
    dayBtn.dataset.dayIndex = i;
    dayBtn.textContent = dayNames[i];
    if (savedDietConfig.highCarbDay === i) {
      dayBtn.classList.add('selected');
    }
    dayBtn.addEventListener('click', () => {
      // Deselect all and select clicked
      document.querySelectorAll('.day-btn-diet').forEach(btn => btn.classList.remove('selected'));
      dayBtn.classList.add('selected');
      savedDietConfig.highCarbDay = i;
      updateCurrentDayInfo();
    });
    weekDaysContainer.appendChild(dayBtn);
  }

  function updateCurrentDayInfo() {
    const today = new Date().getDay(); // 0 for Sunday, 1 for Monday, etc.
    currentDayName.textContent = dayNames[today];

    if (savedDietConfig.highCarbDay === today) {
      currentDietType.textContent = 'Carbo Alto';
      currentDietType.className = 'diet-type-badge high-carb';
      carbHighMealsContainer.style.display = 'block';
      carbLowMealsContainer.style.display = 'none';
    } else {
      currentDietType.textContent = 'Carbo Baixo';
      currentDietType.className = 'diet-type-badge low-carb';
      carbHighMealsContainer.style.display = 'none';
      carbLowMealsContainer.style.display = 'block';
    }
  }

  if (saveDietBtn) {
    saveDietBtn.addEventListener('click', () => {
      localStorage.setItem('dietConfig', JSON.stringify(savedDietConfig));
      alert('Configuração de dieta salva!');
    });
  }

  // Initial update on page load
  updateCurrentDayInfo();
}


function setupAutoSchedule() {
  const today = new Date().getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
  // Map JS days (0-6) to your WORKOUT_DAYS (1-5)
  // Assuming workout days are Monday to Friday (1-5 in JS Date.getDay())
  const workoutSchedule = {
    1: 1, // Monday -> Day 1
    2: 2, // Tuesday -> Day 2
    3: 3, // Wednesday -> Day 3
    4: 4, // Thursday -> Day 4
    5: 5, // Friday -> Day 5
    6: null, // Saturday
    0: null  // Sunday
  };
  
  const todayWorkoutDay = workoutSchedule[today];
  if (todayWorkoutDay) {
    document.querySelector(`.day-btn[data-day="${todayWorkoutDay}"]`)?.classList.add('today-workout');
  }
}

// =============================================
// INICIALIZAÇÃO GERAL DA PÁGINA
// =============================================
function initializePage() {
  // Always check authentication first, unless on the login page itself
  if (!document.body.classList.contains('login-page')) {
    if (!checkAuth()) {
      return; // Stop execution if not authenticated and redirected
    }
  }

  setupBackButtons(); // Setup back buttons for all relevant pages

  if (document.body.classList.contains('login-page')) {
    setupLoginPage();
  } else if (document.body.classList.contains('menu-page')) {
    setupMenuPage();
  } else if (document.body.classList.contains('workout-page')) {
    setupWorkoutPage();
  } else if (document.body.classList.contains('diet-page')) {
    setupDietPage();
  }
}

// Ensure initializePage is called when the DOM is ready
document.addEventListener('DOMContentLoaded', initializePage);