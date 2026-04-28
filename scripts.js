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
    <p contenteditable="true" id="note-text">${savedNote}</p>
    <button id="prev-btn">Prev</button>
    <button id="next-btn">Next</button>
    <button id="save-note">Save</button>
  `;
    

    const saveBtn = document.getElementById('save-note');
    const closeBtn = document.getElementById('close-diary');
    const noteTextElem = document.getElementById('note-text');
    const prevBtn = document.getElementById("prev-btn")
    const nextBtn = document.getElementById("next-btn")

    noteTextElem.focus();

    saveBtn.onclick = () => {
      localStorage.setItem(dateKey, noteTextElem.innerText);
      alert('Saved');
      };
  
    closeBtn.onclick = () => {
      notebook.style.display = "none";
      const allDays = days.querySelectorAll('div.active');
      allDays.forEach(day => day.classList.remove('active'));

      diaryDate = null;
      
      };

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