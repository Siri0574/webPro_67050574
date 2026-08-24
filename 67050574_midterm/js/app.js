// Initial Mock Data Structure
const initialEvents = [
  {
    id: 1,
    title: "Modern JavaScript & ES6+ Workshop",
    category: "Tech",
    speaker: "Dr. Somchai Dev",
    date: "2026-09-15",
    seats: 5,
    description: "เจาะลึกการใช้งาน JavaScript ยุคใหม่ อธิบายเรื่อง Async/Await, Closure และ Modules",
    isRegistered: false
  },
  {
    id: 2,
    title: "UX/UI Design System Creation",
    category: "Design",
    speaker: "Aj. Ananya Design",
    date: "2026-09-20",
    seats: 0,
    description: "การสร้าง Design System สำหรับองค์กรขนาดใหญ่ด้วย Figma และการเชื่อมต่อกับ CSS",
    isRegistered: false
  },
  {
    id: 3,
    title: "Startup Pitching & Funding 101",
    category: "Business",
    speaker: "Khun Vorapat VC",
    date: "2026-09-25",
    seats: 12,
    description: "เทคนิคการนำเสนอแผนธุรกิจเพื่อระดมทุนสำหรับนักศึกษาสายเทคโนโลยี",
    isRegistered: false
  },
  {
    id: 4,
    title: "Cybersecurity Essentials for Web Apps",
    category: "Tech",
    speaker: "Dr. Prasit Security",
    date: "2026-10-01",
    seats: 8,
    description: "เรียนรู้ช่องโหว่พื้นฐาน OWASP Top 10 และแนวทางการป้องกันบน Web Front-end",
    isRegistered: false
  }
];

// App State
let events = [];

//เพิ่มโค้ดคำสั่งตรงนี้

const keywordInput = document.getElementById('keyword');
const filterCategorySelect = document.getElementById('filter-category');
const dateSortSelect = document.getElementById('date-sort');
const btnReset = document.getElementById('btn-reset');
const eventCardsContainer = document.getElementById('event-cards-container');

const totalEventsSpan = document.getElementById('total-events');
const totalRegisteredSpan = document.getElementById('total-registered');
const totalSeatsSpan = document.getElementById('total-seats')

const adminPanel = document.getElementById('admin-panel');
const btnAddNewEvent = document.getElementById('add-new-event');
const btnCloseAdmin = document.getElementById('close-btn');
const btnCancelAdmin = document.getElementById('cancel-btn');
const addEventForm = document.getElementById('add-event-form');

const modeBtn = document.getElementById('mode');


function saveEventsToStorage() {
    localStorage.setItem('eventsData', JSON.stringify(events));
}

function loadEventsFromStorage() {
    const storedData = localStorage.getItem('eventsData');
    if (storedData) {
        events = JSON.parse(storedData); 
    } else {
        events = JSON.parse(JSON.stringify(initialEvents)); 
        saveEventsToStorage();
    }
}

function renderEvents(dataToRender) {
    eventCardsContainer.innerHTML = ''; // ล้างค่าเดิมใน HTML
    
    dataToRender.forEach(event => {
        const isSeatsFull = event.seats === 0;
        let btnText = 'ลงทะเบียน';
        let btnDisabled = false;

        if (event.isRegistered) {
            btnText = '✅ ลงทะเบียนแล้ว';
            btnDisabled = true;
        } else if (isSeatsFull) {
            btnText = 'ที่นั่งเต็ม';
            btnDisabled = true;
        }

        const cardHTML = `
            <div class="event-card" data-category="${event.category.toLowerCase()}" data-id="${event.id}" data-date="${event.date}" data-seats="${event.seats}">
                <h4 class="event-title">${event.title}</h4>
                <p>หมวดหมู่: <strong>${event.category}</strong></p>
                <p>วิทยากร: <span class="speaker-name">${event.speaker}</span></p>
                <p>วันที่จัดงาน: <span class="event-date">${event.date}</span></p>
                <p>จำนวนที่นั่งว่าง: <span class="available-seats">${isSeatsFull ? '0 (เต็ม)' : event.seats}</span> ที่</p>
                <p class="event-description">${event.description}</p>
                <button type="button" class="register-btn ${event.isRegistered ? 'registered' : ''}" ${btnDisabled ? 'disabled' : ''}>
                    ${btnText}
                </button>
            </div>
        `;
        eventCardsContainer.insertAdjacentHTML('beforeend', cardHTML);
    });

    updateStats();
}

function processEvents() {
    const keyword = keywordInput.value.toLowerCase().trim();
    const category = filterCategorySelect.value.toLowerCase();
    const sortOption = dateSortSelect.value;

    let filtered = events.filter(event => {
        const matchKeyword = event.title.toLowerCase().includes(keyword) || event.speaker.toLowerCase().includes(keyword);
        const matchCategory = category === 'all' || event.category.toLowerCase() === category;
        return matchKeyword && matchCategory;
    });

    filtered.sort((a, b) => {
        if (sortOption === 'date-asc') return new Date(a.date) - new Date(b.date);
        if (sortOption === 'date-desc') return new Date(b.date) - new Date(a.date);
        if (sortOption === 'seats-desc') return b.seats - a.seats;
        return 0;
    });

    renderEvents(filtered);
}

function handleRegistration(e) {
    if (e.target.classList.contains('register-btn')) {
        const card = e.target.closest('.event-card');
        const eventId = parseInt(card.dataset.id);

        const targetEvent = events.find(item => item.id === eventId);

        if (targetEvent && targetEvent.seats > 0 && !targetEvent.isRegistered) {
            targetEvent.seats -= 1;
            targetEvent.isRegistered = true;
            
            saveEventsToStorage();
            processEvents();
        }
    }
}

function updateStats() {
    const totalEvents = events.length;
    const totalRegistered = events.filter(item => item.isRegistered).length;
    const totalSeats = events.reduce((sum, item) => sum + item.seats, 0);

    if (document.getElementById('total-events')) document.getElementById('total-events').textContent = totalEvents;
    if (document.getElementById('total-registered')) document.getElementById('total-registered').textContent = totalRegistered;
    if (document.getElementById('total-seats')) document.getElementById('total-seats').textContent = totalSeats;
}

function resetFilters() {
    keywordInput.value = '';
    filterCategorySelect.value = 'all';
    dateSortSelect.value = 'date-asc';
    processEvents();
}

function toggleAdminPanel(show) {
    if (show) {
        adminPanel.removeAttribute('hidden');

        adminPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        adminPanel.setAttribute('hidden', '');

        if (addEventForm) {
            addEventForm.reset();
        }
    }
}

function handleAddEvent(e) {
    e.preventDefault();

    const title = document.getElementById('event-name').value.trim();
    const categoryRaw = document.getElementById('event-category').value;
    const speaker = document.getElementById('speaker-name').value.trim();
    const dateStr = document.getElementById('event-date').value;
    const seats = parseInt(document.getElementById('seats').value);
    const description = document.getElementById('description').value.trim();

    if (!title || !speaker || !dateStr || isNaN(seats) || !description) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วนทุกช่อง");
        return;
    }

    if (seats <= 0) {
        alert("จำนวนที่นั่งต้องมากกว่า 0");
        return;
    }

    const selectedDate = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    if (selectedDate < today) {
        alert("วันที่จัดงานต้องไม่เป็นวันที่ในอดีต");
        return;
    }

    const category = categoryRaw.charAt(0).toUpperCase() + categoryRaw.slice(1);

    const newEvent = {
        id: Date.now(), 
        title: title,
        category: category,
        speaker: speaker,
        date: dateStr,
        seats: seats,
        description: description,
        isRegistered: false
    };

    events.push(newEvent);
    saveEventsToStorage();

    addEventForm.reset();
    toggleAdminPanel(false);
    processEvents();

    alert("เพิ่มกิจกรรมใหม่เรียบร้อยแล้ว!");
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    modeBtn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
}

function setupEventListeners() {
    keywordInput.addEventListener('input', processEvents);
    filterCategorySelect.addEventListener('change', processEvents);
    dateSortSelect.addEventListener('change', processEvents);
    btnReset.addEventListener('click', resetFilters);

    eventCardsContainer.addEventListener('click', handleRegistration);

    if (btnAddNewEvent) btnAddNewEvent.addEventListener('click', () => toggleAdminPanel(true));
    if (btnCloseAdmin) btnCloseAdmin.addEventListener('click', () => toggleAdminPanel(false));
    if (btnCancelAdmin) btnCancelAdmin.addEventListener('click', () => toggleAdminPanel(false));
    if (addEventForm) addEventForm.addEventListener('submit', handleAddEvent);

    if (modeBtn) modeBtn.addEventListener('click', toggleDarkMode);
}

function initApp() {
    loadEventsFromStorage();
    setupEventListeners();
    processEvents();
}

// Run Application
document.addEventListener("DOMContentLoaded", initApp);