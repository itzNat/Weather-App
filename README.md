
# WeatherNow 🌦️

A modern, animated weather dashboard built with AccuWeather API, featuring real-time forecasts, interactive search, and sleek UI animations.

## Features ✨

- 🌍 **Location Search** with autocomplete dropdown
- ☀️ **Current Weather** with animated Flaticon icons
- 📊 **Hourly Forecast** (12-hour) with sliding animation
- 📅 **5-Day Forecast** with day/night icons
- 💨 **Weather Metrics** (Wind, Humidity, Visibility, Feels Like)
- 🎨 **Dynamic Gradient Background** with smooth animation
- 📱 **Fully Responsive** design

## Technologies Used 🛠️

- **Frontend**: HTML5, CSS3, JavaScript
- **Styling**: Tailwind CSS
- **Icons**: Font Awesome
- **API**: [AccuWeather](https://developer.accuweather.com/)
- **Animations**: Custom CSS keyframes

## API Requirements ⚠️

This app uses the **AccuWeather API**:
- Free tier: 50 calls/day (10 calls/minute)
- Please avoid excessive searching to prevent service interruptions.
- Requires your own API key (replace in `main.js`)

## Installation & Setup 🚀

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app
   ```

2. **Add your API key**
   - Replace `pQYzwNPdBoA3QVeoA*****************` key in `main.js` with your AccuWeather key

3. **Run the app**
   - Open `index.html` in a browser
   - No build step required!

## Optimizations ⚡

- Animated weather icons (Fontawesome)
- Responsive grid layout
- Error handling for API failures

## Limitations 🛑

- AccuWeather free tier has strict call limits (50/day)
- Requires internet connection
- No offline caching in current implementation

## Future Improvements 🔮

- [ ] Add temperature unit toggle (°C/°F)
- [ ] Dark/light mode switch

## License 📄

MIT License - Free for personal and educational use.

---

**Note**: This project is not affiliated with AccuWeather. API keys should be kept private.
```
