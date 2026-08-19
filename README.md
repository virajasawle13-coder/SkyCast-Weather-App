# 🌤️ SkyCast - Weather Web App

SkyCast is a responsive client-side weather web application that provides real-time weather information using public weather APIs. It allows users to search for cities, use their current location, view current weather conditions, hourly forecasts and a 7-day forecast.

The application also provides personalized controls such as temperature unit conversion, dark/light theme, favorite cities and recent searches.

---

## 🚀 Features

- 🔍 Search weather by city name
- 📍 Get weather using current device location
- 🌡️ Display current temperature and feels-like temperature
- ☁️ Display current weather conditions
- 💧 Humidity information
- 💨 Wind speed
- 🎚️ Atmospheric pressure
- 👁️ Visibility
- ☀️ UV index
- 🌅 Sunrise and sunset timings
- 🕐 Hourly weather forecast
- 📅 7-day weather forecast
- 🌡️ Celsius and Fahrenheit conversion
- 🌙 Dark and Light theme
- ⭐ Favorite cities
- 🕘 Recent search history
- 🔄 Refresh weather data
- ⚠️ Error handling for invalid searches and API failures
- 📱 Responsive design for different screen sizes
- ♿ Accessible interface with semantic HTML and ARIA support

---

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript

### APIs & Browser Features
- Open-Meteo Weather API
- Open-Meteo Geocoding API
- Geolocation API
- LocalStorage API
- Fetch API

---

## 🏗️ System Architecture

SkyCast follows a client-side architecture:

```text
User Interface
      ↓
JavaScript Application Logic
      ↓
 ┌───────────────┐
 │               │
 ↓               ↓
External APIs   Browser Storage
 │               │
 ↓               ↓
Weather Data    Preferences
Forecast        Recent Searches
Geocoding       Favorites


---

🔄 Application Data Flow

User searches city / selects location
              ↓
     Geocoding Service
              ↓
     Latitude & Longitude
              ↓
      Weather API Request
              ↓
       JSON Weather Data
              ↓
     JavaScript Processing
              ↓
      Weather Information
              ↓
        Responsive UI


---

📂 Project Structure

SkyCast-Weather-App/
│
├── css/
│   ├── animations.css
│   ├── base.css
│   ├── buttons.css
│   ├── chips.css
│   ├── forecast.css
│   ├── header.css
│   ├── layout.css
│   ├── responsive.css
│   ├── search.css
│   ├── variables.css
│   ├── weather.css
│   └── welcome.css
│
├── js/
│   ├── api.js
│   ├── chips.js
│   ├── config.js
│   ├── dom.js
│   ├── events.js
│   ├── location.js
│   ├── main.js
│   ├── search.js
│   ├── state.js
│   ├── storage.js
│   ├── theme.js
│   ├── ui.js
│   └── utils.js
│
├── index.html
└── README.md


---

🌐 APIs Used

Open-Meteo

SkyCast uses Open-Meteo for weather and forecast information.

The application retrieves weather information based on latitude and longitude obtained from the city search or user's current location.

Geocoding

The geocoding service converts a searched city name into geographic coordinates such as:

City → Latitude + Longitude

These coordinates are then used to request weather information.


---

💾 Browser Storage

SkyCast uses localStorage to persist user preferences and information such as:

Temperature unit

Theme preference

Recent searches

Favorite cities


This allows the application to remember user settings between browser sessions.


---

📱 Responsive Design

The interface is designed to work across different screen sizes including:

💻 Desktop

💻 Laptop

📱 Mobile

📟 Tablet


The layout uses responsive containers, flexible components and CSS media queries.


---

🧪 Testing

The application was tested for important scenarios including:

Test Case	Expected Result

Valid city search	Weather information displayed
Invalid city	Error message displayed
Celsius/Fahrenheit toggle	Temperature converted
Theme toggle	Theme changes and persists
Add/remove favorite	Favorite list updated
Refresh	New weather request initiated
Location permission	Weather or error displayed
API failure	Error message displayed



---

⚙️ How to Run

1. Clone the repository

git clone https://github.com/virajasawle13-coder/SkyCast-Weather-App.git

2. Open the project

Open the project folder in Visual Studio Code.

3. Run the application

Open index.html using a local development server such as Live Server.

> Internet connectivity is required because SkyCast retrieves weather information from external APIs.




---

🎯 Project Objectives

Provide weather information through a simple and responsive interface.

Allow users to search weather by city.

Provide current weather, hourly and 7-day forecasts.

Support device location when permission is provided.

Provide Celsius and Fahrenheit temperature units.

Persist themes, recent searches and favorite cities.

Provide accessible loading and error states.

Maintain a responsive user interface across different devices.



---

🔮 Future Scope

Possible future enhancements include:

Weather charts and radar

Progressive Web App (PWA) support

Push notifications

Multiple language support

Weather alerts and widgets

More advanced weather visualizations



---

👨‍💻 Project

SkyCast - Weather Web App

A responsive client-side weather application developed using HTML5, CSS3 and JavaScript with public weather APIs and browser capabilities.


---

📄 License

This project is developed for educational and project purposes.

**Don't add a Live Demo section yet** because we haven't deployed SkyCast. We can add GitHub Pages deployment next.
