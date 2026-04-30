const nextMonth = document.getElementById("next-month")
const prevMonth = document.getElementById("previous-month")
const monthYear = document.getElementById("month-year")
const days = document.querySelector(".days")
const notebook = document.querySelector(".notebook")

let currentDate = new Date()
let currentMonth = currentDate.getMonth()
let currentYear = currentDate.getFullYear();
let diaryDate = null;

  function openNotebook(date) {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const dateKey = `note-${year}-${String(month + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
  const savedNote = localStorage.getItem(dateKey) || '';

  diaryDate = date; // atualiza a data global
  notebook.style.display = "block";

     notebook.innerHTML = `
    <div class="diary-header">
      <h2>Day ${day} / ${month + 1} / ${year}</h2>
      <button id="close-diary">X</button>
    </div>
    <p contenteditable="true" id="note-text"></p>
    <button id="prev-btn">Prev</button>
    <button id="next-btn">Next</button>
    <button id="save-note">Save</button>
    <div class="color-buttons">
      <button id="color1-btn"></button>
      <button id="color2-btn"></button>
      <button id="color3-btn"></button>
    </div>
    
  `;
    

    const saveBtn = document.getElementById('save-note');
    const closeBtn = document.getElementById('close-diary');
    const noteTextElem = document.getElementById('note-text');
    const prevBtn = document.getElementById("prev-btn")
    const nextBtn = document.getElementById("next-btn")
    const color1Btn = document.getElementById("color1-btn")
    const color2Btn = document.getElementById("color2-btn")
    const color3Btn = document.getElementById("color3-btn")

    
    noteTextElem.innerHTML = savedNote; // aqui o HTML é interpretado
    noteTextElem.focus();


    saveBtn.onclick = () => {
      localStorage.setItem(dateKey, noteTextElem.innerHTML);
      alert('Saved');
      };
  
    closeBtn.onclick = () => {
      notebook.style.display = "none";
      const allDays = days.querySelectorAll('div.active');
      allDays.forEach(day => day.classList.remove('active'));

      diaryDate = null;
      
      };

      color1Btn.onclick = () =>{
        const allDays = days.querySelectorAll('div');
        const targetDateStr = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
        const dayToActivate = Array.from(allDays).find(day => day.dataset.date === targetDateStr);
        if (dayToActivate) {
        dayToActivate.classList.remove('color2','color3')
        dayToActivate.classList.toggle('color1');

        const dayColors = JSON.parse(localStorage.getItem('dayColors')) || {};

        if (dayToActivate.classList.contains('color1')) {
            dayColors[targetDateStr] = 'color1';
          } else {
            // Remove a cor do localStorage se a classe foi removida
            delete dayColors[targetDateStr];
          }



        localStorage.setItem('dayColors', JSON.stringify(dayColors));
        }
      }

      color2Btn.onclick = () =>{
        const allDays = days.querySelectorAll('div');
        const targetDateStr = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
        const dayToActivate = Array.from(allDays).find(day => day.dataset.date === targetDateStr);
        if (dayToActivate) {
        dayToActivate.classList.remove('color1','color3')
        dayToActivate.classList.toggle('color2');

        const dayColors = JSON.parse(localStorage.getItem('dayColors')) || {};
        if (dayToActivate.classList.contains('color2')) {
            dayColors[targetDateStr] = 'color2';
          } else {
            // Remove a cor do localStorage se a classe foi removida
            delete dayColors[targetDateStr];
          }
        localStorage.setItem('dayColors', JSON.stringify(dayColors));
        }
      }

      color3Btn.onclick = () =>{
        const allDays = days.querySelectorAll('div');
        const targetDateStr = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
        const dayToActivate = Array.from(allDays).find(day => day.dataset.date === targetDateStr);
        if (dayToActivate) {
        dayToActivate.classList.remove('color1', 'color2')
        dayToActivate.classList.toggle('color3');

        const dayColors = JSON.parse(localStorage.getItem('dayColors')) || {};
        if (dayToActivate.classList.contains('color3')) {
            dayColors[targetDateStr] = 'color3';
          } else {
            // Remove a cor do localStorage se a classe foi removida
            delete dayColors[targetDateStr];
          }
        localStorage.setItem('dayColors', JSON.stringify(dayColors));
        }
      }


    prevBtn.onclick = () => {
      const prevDate = new Date(diaryDate);
      prevDate.setDate(diaryDate.getDate() - 1);

      diaryDate = prevDate;

      currentMonth = prevDate.getMonth();
      currentYear = prevDate.getFullYear();

      renderCalendar(currentMonth, currentYear);

      openNotebook(prevDate);
      updateActiveDay(prevDate)
    };

    nextBtn.onclick = () => {
      const nextDate = new Date(diaryDate);
      nextDate.setDate(diaryDate.getDate() + 1);
      diaryDate = nextDate;

      currentMonth = nextDate.getMonth()
      currentYear = nextDate.getFullYear()

      renderCalendar(currentMonth, currentYear);

      openNotebook(nextDate);
      updateActiveDay(nextDate)
    };

}

  function updateActiveDay(date) {
  // Remove a classe 'active' de todos os dias
  const allDays = days.querySelectorAll('div');
  allDays.forEach(day => day.classList.remove('active'));

  // Formata a data para comparar com data dos dias
  const targetDateStr = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;

  // Procura o dia com data igual
  const dayToActivate = Array.from(allDays).find(day => day.dataset.date === targetDateStr);

  if (dayToActivate) {
    dayToActivate.classList.add('active');
  }
}

function renderCalendar(month, year){

    const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  monthYear.textContent = `${monthNames[month]} ${year}`

   days.innerHTML = ""

   const firstDay = new Date(year, month, 1).getDay()

   const daysInMonth = new Date(year, month + 1, 0).getDate()

   const daysInPrevMonth = new Date(year, month, 0).getDate();

  for (let i = firstDay - 1; i >= 0; i--) {
    const dayDiv = document.createElement("div");
    dayDiv.textContent = daysInPrevMonth - i;
    dayDiv.classList.add("outside");
    days.appendChild(dayDiv);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayDiv = document.createElement("div");
    dayDiv.textContent = day;
    dayDiv.dataset.date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    const dayColors = JSON.parse(localStorage.getItem('dayColors')) || {};
    const dateStr = `${year}-${String(month + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;

    if (dayColors[dateStr]) {
      dayDiv.classList.add(dayColors[dateStr]);
}

    const today = new Date();
    if (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      dayDiv.classList.add("today");
    }

    dayDiv.addEventListener('click', () => {
      diaryDate = new Date(year, month, day);    
      const allDays = days.querySelectorAll('div');
      allDays.forEach(day => day.classList.remove('active'));  
      dayDiv.classList.add('active');
      openNotebook(diaryDate);
      updateActiveDay(date)


    });

    days.appendChild(dayDiv);
  }

  const totalDaysSoFar = firstDay + daysInMonth;
  const daysFromNextMonth = 42 - totalDaysSoFar;

  for (let i = 1; i <= daysFromNextMonth; i++) {
    const dayDiv = document.createElement("div");
    dayDiv.textContent = i;
    dayDiv.classList.add("outside");
    days.appendChild(dayDiv);
  }
}



prevMonth.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  notebook.style.display = "none"
  renderCalendar(currentMonth, currentYear);
});

nextMonth.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  notebook.style.display = "none"
  renderCalendar(currentMonth, currentYear);
});

renderCalendar(currentMonth, currentYear);