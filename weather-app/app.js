const apiKey = 'ff6844d226269ed94e41be6dcaef8d62'; 
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

const loading = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');

async function fetchWeather(city) {
    const url = `${baseUrl}?q=${city}&appid=${apiKey}&lang=th&units=metric`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`เกิดข้อผิดพลาด: ${response.status}`); 
        }
        const data = await response.json(); 
        return data;
    } catch (error) {
        throw error;
    }
}

function displayWeather(data, city) {
    const temp = Math.round(data.main.temp);           
    const humidity = data.main.humidity;   
    const wind = data.wind.speed;         

    const html = `
        <div class="weather-card">
            <div class="icon">☀️</div>
            <div class="info">
                <h2>${temp} °C</h2>
                <p><strong>${data.name}</strong> (${city})</p>
                <p>${data.weather[0].description}</p>
            </div>
            <div class="details">
                <p>ความชื้น: ${humidity}%</p>
                <p>ความเร็วลม: ${wind} m/s</p>
            </div>
        </div>
    `;

    weatherResult.innerHTML += html; 
    weatherResult.classList.remove('hidden');
}

async function loadWeather() {
    const rawInput = cityInput.value.trim();
    
    if (rawInput === '') {
        alert('กรุณากรอกชื่อเมือง');
        return;
    }

    // ล้างค่าเก่าก่อน
    weatherResult.innerHTML = '';
    errorDiv.innerHTML = '';
    errorDiv.classList.add('hidden');
    weatherResult.classList.add('hidden');
    loading.classList.remove('hidden');

    // แยกเมืองด้วยเครื่องหมาย ,
    const cities = rawInput.split(',').map(city => city.trim()).filter(city => city !== '');

    try {
        await loadMultipleCities(cities);
    } finally {
        loading.classList.add('hidden');
    }
}

async function loadMultipleCities(cities) {
    for (const city of cities) {
        try {
            const data = await fetchWeather(city);
            displayWeather(data, city);
        } catch (error) {
            errorDiv.innerHTML += `<p>⚠️ ไม่พบข้อมูลเมือง: ${city}</p>`;
            errorDiv.classList.remove('hidden');
        }
    }
}

searchBtn.addEventListener('click', loadWeather);

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        loadWeather();
    }
});