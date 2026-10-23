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
    const description = data.weather[0]?.description || '';
    
    // ไอคอนสภาพอากาศจริงจาก OpenWeatherMap
    const iconCode = data.weather[0]?.icon;
    const iconUrl = iconCode ? `https://openweathermap.org/img/wn/${iconCode}@2x.png` : '';

    // จัดการเรื่อง country / city name ป้องกัน undefined
    const cityName = data.name || 'ไม่ระบุชื่อเมือง';
    const country = data.sys && data.sys.country ? ` (${data.sys.country})` : '';

    const html = `
        <div class="weather-card">
            <div class="weather-info-main">
                ${iconUrl ? `<img src="${iconUrl}" alt="${description}" class="weather-icon">` : '<div class="icon">☀️</div>'}
                <div class="info">
                    <h2>${temp} °C</h2>
                    <p><strong>${cityName}</strong>${country}</p>
                    <p class="desc">${description}</p>
                </div>
            </div>
            <div class="details">
                <p>ความชื้น: <strong>${humidity}%</strong></p>
                <p>ความเร็วลม: <strong>${wind} m/s</strong></p>
            </div>
        </div>
    `;

    weatherResult.innerHTML += html; 
    weatherResult.classList.remove('hidden');
}

async function loadMultipleCities(cities) {
    const promises = cities.map(city => fetchWeather(city));

    const results = await Promise.allSettled(promises);

    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            displayWeather(result.value);
        } else {
            errorDiv.innerHTML += `<p>⚠️ ไม่พบข้อมูลเมือง: ${cities[index]}</p>`;
            errorDiv.classList.remove('hidden');
        }
    });
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
    } catch (error) {
        errorDiv.innerHTML = '<p>⚠️ เกิดข้อผิดพลาดในการดึงข้อมูล</p>';
        errorDiv.classList.remove('hidden');
    } finally {
        // ปิดสถานะ Loading เสมอ ไม่ว่าสำเร็จหรือล้มเหลว
        loading.classList.add('hidden');
    }
}

searchBtn.addEventListener('click', loadWeather);

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        loadWeather();
    }
});