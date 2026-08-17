
// ══════════════════════════════════════════════════════════
//  RENDER HELPERS
// ══════════════════════════════════════════════════════════

const showWeatherContent = () => {
    el.weatherContent.classList.remove('hidden');
    el.welcomeState.classList.add('hidden');
};

/** Update background class on body */
const updateBackground = (code, isDay) => {
    const bgClass = getBgClass(code, !isDay);
    const bgClasses = [
        'weather-sunny', 'weather-partly-cloudy', 'weather-cloudy',
        'weather-rain', 'weather-thunder', 'weather-snow', 'weather-night', 'weather-default'
    ];
    el.body.classList.remove(...bgClasses);
    el.body.classList.add(bgClass);
};

/** Update the ⭐ fav button appearance */
const updateFavBtn = () => {
    if (!state.currentCity) return;
    const faved = isFav(state.currentCity);
    el.favBtn.textContent = faved ? '⭐' : '☆';
    el.favBtn.classList.toggle('active', faved);
    el.favBtn.setAttribute('aria-label', faved ? 'Remove from favorites' : 'Add to favorites');
    el.favBtn.title = faved ? 'Remove from favorites' : 'Add to favorites';
};

/** Format sunrise/sunset from ISO datetime */
const fmtSunTime = iso => {
    if (!iso) return '—';
    return new Date(iso).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
};

// ══════════════════════════════════════════════════════════
//  RENDER — CURRENT WEATHER
// ══════════════════════════════════════════════════════════

/**
 * Render current weather section
 * @param {Object} data - API response
 */
const renderCurrent = data => {
    const c = data.current;
    const d = data.daily;
    const wmo = getWMO(c.weather_code);

    // Background
    updateBackground(c.weather_code, c.is_day);

    // City + datetime
    el.cityName.textContent = state.currentCity
        ? `${state.currentCity.name}${state.currentCity.country ? ', ' + state.currentCity.country.toUpperCase() : ''}`
        : '—';

    el.currentDatetime.textContent = new Date().toLocaleString('en-US', {
        weekday: 'long', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    // Icon + temp
    el.weatherIconMain.textContent = wmo.emoji;
    el.currentTemp.textContent = formatTemp(c.temperature_2m);
    el.weatherCondition.textContent = wmo.label;
    el.feelsLike.textContent = `Feels like ${formatTemp(c.apparent_temperature)}°`;

    // Stats
    el.statHumidity.textContent = `${c.relative_humidity_2m}%`;
    el.statWind.textContent = formatWind(c.wind_speed_10m);
    el.statPressure.textContent = `${Math.round(c.surface_pressure)} hPa`;
    el.statVisibility.textContent = c.visibility !== undefined
        ? `${(c.visibility / 1000).toFixed(1)} km`
        : '—';
    el.statUV.textContent = c.uv_index !== undefined ? c.uv_index.toFixed(1) : '—';

    // Sunrise / Sunset from daily[0]
    el.statSunrise.textContent = d?.sunrise?.[0] ? fmtSunTime(d.sunrise[0]) : '—';
    el.statSunset.textContent = d?.sunset?.[0] ? fmtSunTime(d.sunset[0]) : '—';

    // AQI — Open-Meteo free tier may not include AQI; show '—' if not available
    el.statAQI.textContent = '—';

    // Last updated
    el.lastUpdated.textContent = `Last updated: ${new Date().toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    })}`;
};

// ══════════════════════════════════════════════════════════
//  RENDER — HOURLY FORECAST
// ══════════════════════════════════════════════════════════

/**
 * Render the 24-hour horizontal scroll section
 * @param {Object} data
 */
const renderHourly = data => {
    const h = data.hourly;
    const now = new Date();
    const nowH = now.getHours();
    const todayStr = now.toDateString();

    el.hourlyContainer.innerHTML = '';

    // Find start index (current or next hour in today)
    let startIdx = h.time.findIndex(t => {
        const d = new Date(t);
        return d >= now;
    });
    if (startIdx === -1) startIdx = 0;

    const slice = h.time.slice(startIdx, startIdx + 24);

    slice.forEach((timeStr, relIdx) => {
        const idx = startIdx + relIdx;
        const d = new Date(timeStr);
        const wmo = getWMO(h.weather_code[idx]);
        const isNow = relIdx === 0;

        const card = document.createElement('div');
        card.className = 'hourly-card' + (isNow ? ' current-hour' : '');
        card.setAttribute('role', 'listitem');

        const label = isNow ? 'Now'
            : d.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });

        const rain = h.precipitation_probability[idx];
        const temp = formatTemp(h.temperature_2m[idx]);

        card.innerHTML = `
      <span class="hourly-time">${escapeHTML(label)}</span>
      <span class="hourly-icon" aria-hidden="true">${wmo.emoji}</span>
      <span class="hourly-temp">${temp}°</span>
      <span class="hourly-rain" title="Rain probability">💧${rain !== undefined ? rain + '%' : '—'}</span>
    `;

        el.hourlyContainer.appendChild(card);
    });
};

// ══════════════════════════════════════════════════════════
//  RENDER — 7-DAY FORECAST
// ══════════════════════════════════════════════════════════

/**
 * Render 7-day forecast rows
 * @param {Object} data
 */
const renderDaily = data => {
    const d = data.daily;
    el.dailyContainer.innerHTML = '';

    d.time.forEach((dateStr, i) => {
        const wmo = getWMO(d.weather_code[i]);
        const maxTemp = formatTemp(d.temperature_2m_max[i]);
        const minTemp = formatTemp(d.temperature_2m_min[i]);
        const rain = d.precipitation_probability_max[i] ?? 0;

        const row = document.createElement('div');
        row.className = 'daily-row';
        row.setAttribute('role', 'listitem');

        row.innerHTML = `
      <span class="daily-day">${escapeHTML(formatDay(dateStr))}</span>
      <span class="daily-icon" aria-hidden="true">${wmo.emoji}</span>
      <span class="daily-desc">${escapeHTML(wmo.label)}</span>
      <span class="daily-rain">💧 ${rain}%</span>
      <span class="daily-temps">
        <span class="daily-temp-max">${maxTemp}°</span>
        <span class="daily-temp-min">${minTemp}°</span>
      </span>
    `;

        // Staggered animation
        row.style.animationDelay = `${i * 0.05}s`;
        el.dailyContainer.appendChild(row);
    });
};

// ══════════════════════════════════════════════════════════
//  RENDER — ALL
// ══════════════════════════════════════════════════════════

/**
 * Re-render everything with current state
 * @param {Object} data
 */
const renderAll = data => {
    renderCurrent(data);
    renderHourly(data);
    renderDaily(data);
    updateFavBtn();
};

// ══════════════════════════════════════════════════════════
//  REFRESH
// ══════════════════════════════════════════════════════════

const refreshWeather = async () => {
    if (!state.currentCity) { showError('No city loaded yet. Search for a city first.'); return; }
    const icon = el.refreshBtn.querySelector('span');
    icon.classList.add('refresh-spin');
    showLoading();
    try {
        const data = await fetchWeather(state.currentCity.lat, state.currentCity.lon);
        state.weatherData = data;
        state.lastUpdated = new Date();
        renderAll(data);
    } catch (err) {
        showError(`Refresh failed: ${err.message}`);
    } finally {
        hideLoading();
        setTimeout(() => icon.classList.remove('refresh-spin'), 600);
    }
};