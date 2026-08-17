'use strict';

// ══════════════════════════════════════════════════════════
//  CONSTANTS & CONFIG
// ══════════════════════════════════════════════════════════

const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

const MAX_RECENT = 5;
const MAX_FAV = 10;

/**
 * WMO Weather Interpretation Codes → { label, emoji, bgClass }
 * https://open-meteo.com/en/docs#weathervariables
 */
const WMO = {
    0: { label: 'Clear Sky', emoji: '☀️', bg: 'weather-sunny' },
    1: { label: 'Mainly Clear', emoji: '🌤', bg: 'weather-sunny' },
    2: { label: 'Partly Cloudy', emoji: '⛅', bg: 'weather-partly-cloudy' },
    3: { label: 'Overcast', emoji: '☁️', bg: 'weather-cloudy' },
    45: { label: 'Foggy', emoji: '🌫', bg: 'weather-cloudy' },
    48: { label: 'Icy Fog', emoji: '🌫', bg: 'weather-cloudy' },
    51: { label: 'Light Drizzle', emoji: '🌦', bg: 'weather-rain' },
    53: { label: 'Drizzle', emoji: '🌦', bg: 'weather-rain' },
    55: { label: 'Heavy Drizzle', emoji: '🌧', bg: 'weather-rain' },
    61: { label: 'Light Rain', emoji: '🌧', bg: 'weather-rain' },
    63: { label: 'Moderate Rain', emoji: '🌧', bg: 'weather-rain' },
    65: { label: 'Heavy Rain', emoji: '🌧', bg: 'weather-rain' },
    71: { label: 'Light Snow', emoji: '🌨', bg: 'weather-snow' },
    73: { label: 'Moderate Snow', emoji: '❄️', bg: 'weather-snow' },
    75: { label: 'Heavy Snow', emoji: '❄️', bg: 'weather-snow' },
    77: { label: 'Snow Grains', emoji: '🌨', bg: 'weather-snow' },
    80: { label: 'Light Showers', emoji: '🌦', bg: 'weather-rain' },
    81: { label: 'Moderate Showers', emoji: '🌧', bg: 'weather-rain' },
    82: { label: 'Violent Showers', emoji: '⛈', bg: 'weather-rain' },
    85: { label: 'Light Snow Showers', emoji: '🌨', bg: 'weather-snow' },
    86: { label: 'Heavy Snow Showers', emoji: '❄️', bg: 'weather-snow' },
    95: { label: 'Thunderstorm', emoji: '⛈', bg: 'weather-thunder' },
    96: { label: 'Thunderstorm w/ Hail', emoji: '🌩', bg: 'weather-thunder' },
    99: { label: 'Thunderstorm w/ Heavy Hail', emoji: '🌩', bg: 'weather-thunder' },
};

const AQI_LABELS = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor', 'Extremely Poor'];

