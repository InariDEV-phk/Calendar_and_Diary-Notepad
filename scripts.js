const nextMonth = document.getElementById("next-month")
const prevMonth = document.getElementById("previous-month")
const monthYear = document.getElementById("month-year")
const days = document.querySelector(".days")
const notebook = document.querySelector(".notebook")

let currentDate = new Date()
let currentMonth = currentDate.getMonth()
let currentYear = currentDate.getFullYear();

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
     notebook.style.display = "block"
     const dateKey = `note-${year}-${month + 1}-${day}`;
     const savedNote = localStorage.getItem(dateKey) || '';

     notebook.innerHTML = `
     <div class="diary-header">
    <h2>Day ${day} / ${month + 1} / ${year}</h2>
    <button id="close-diary">X</button>
    </div>
    <p contenteditable="true" id="note-text">${savedNote}</p>
    <button id="save-note">Save</button>
  `;

    const saveBtn = document.getElementById('save-note');
    const closeBtn = document.getElementById('close-diary');
    const noteTextElem = document.getElementById('note-text');
    
    noteTextElem.focus();

    saveBtn.onclick = () => {
    localStorage.setItem(dateKey, noteTextElem.innerText);
    alert('Saved');
    };
      
    
    // Aqui você pode abrir sua área para escrever o diário, passando essa data
  
      closeBtn.onclick = () => {
    notebook.style.display = "none";
       };
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