
    // AccuWeather API configuration, this is my personal API key, please replace it with your own if you want to copy the app.
    const accuWeatherAPI = {
      key: 'pQYzwNPdBoA3QVeoAADQbnPjKoJyiR1X',
      baseUrl: 'https://dataservice.accuweather.com/',
    };

    function updateDate() {
      const now = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      document.getElementById('current-date').textContent = now.toLocaleDateString('en-US', options);
    }

    const iconMap = {
      1: { icon: "sun", color: "text-yellow-400" }, // Sunny
      2: { icon: "cloud-sun", color: "text-yellow-300" }, // Mostly Sunny
      3: { icon: "cloud-sun", color: "text-yellow-300" }, // Partly Sunny
      4: { icon: "cloud-sun", color: "text-yellow-300" }, // Intermittent Clouds
      5: { icon: "cloud", color: "text-gray-300" }, // Hazy Sunshine
      6: { icon: "cloud", color: "text-gray-400" }, // Mostly Cloudy
      7: { icon: "cloud", color: "text-gray-500" }, // Cloudy
      8: { icon: "cloud", color: "text-gray-500" }, // Dreary (Overcast)
      11: { icon: "smog", color: "text-gray-400" }, // Fog
      12: { icon: "cloud-rain", color: "text-blue-400" }, // Showers
      13: { icon: "cloud-sun-rain", color: "text-blue-400" }, // Mostly Cloudy w/ Showers
      14: { icon: "cloud-sun-rain", color: "text-blue-400" }, // Partly Sunny w/ Showers
      15: { icon: "bolt", color: "text-purple-400" }, // T-Storms
      16: { icon: "bolt", color: "text-purple-400" }, // Mostly Cloudy w/ T-Storms
      17: { icon: "bolt", color: "text-purple-400" }, // Partly Sunny w/ T-Storms
      18: { icon: "cloud-rain", color: "text-blue-400" }, // Rain
      19: { icon: "snowflake", color: "text-blue-200" }, // Flurries
      20: { icon: "snowflake", color: "text-blue-200" }, // Mostly Cloudy w/ Flurries
      21: { icon: "snowflake", color: "text-blue-200" }, // Partly Sunny w/ Flurries
      22: { icon: "snowflake", color: "text-blue-200" }, // Snow
      23: { icon: "snowflake", color: "text-blue-200" }, // Mostly Cloudy w/ Snow
      24: { icon: "snowflake", color: "text-blue-200" }, // Ice
      25: { icon: "snowflake", color: "text-blue-200" }, // Sleet
      26: { icon: "icicles", color: "text-blue-200" }, // Freezing Rain
      29: { icon: "snowflake", color: "text-blue-200" }, // Rain and Snow
      30: { icon: "temperature-high", color: "text-red-400" }, // Hot
      31: { icon: "temperature-low", color: "text-blue-300" }, // Cold
      32: { icon: "wind", color: "text-gray-400" }, // Windy
      33: { icon: "moon", color: "text-indigo-300" }, // Clear (night)
      34: { icon: "cloud-moon", color: "text-indigo-300" }, // Mostly Clear (night)
      35: { icon: "cloud-moon", color: "text-indigo-300" }, // Partly Cloudy (night)
      36: { icon: "cloud-moon", color: "text-indigo-400" }, // Intermittent Clouds (night)
      37: { icon: "cloud-moon", color: "text-indigo-400" }, // Hazy Moonlight
      38: { icon: "cloud", color: "text-gray-500" }, // Mostly Cloudy (night)
      39: { icon: "cloud-moon-rain", color: "text-blue-400" }, // Partly Cloudy w/ Showers (night)
      40: { icon: "cloud-moon-rain", color: "text-blue-400" }, // Mostly Cloudy w/ Showers (night)
      41: { icon: "cloud-moon-rain", color: "text-purple-400" }, // Partly Cloudy w/ T-Storms (night)
      42: { icon: "cloud-moon-rain", color: "text-purple-400" }, // Mostly Cloudy w/ T-Storms (night)
      43: { icon: "snowflake", color: "text-blue-200" }, // Mostly Cloudy w/ Flurries (night)
      44: { icon: "snowflake", color: "text-blue-200" } // Mostly Cloudy w/ Snow (night)
    };

    // Get location key
    async function getLocationKey(location) {
      try {
        const response = await fetch(
          `${accuWeatherAPI.baseUrl}locations/v1/cities/search?apikey=${accuWeatherAPI.key}&q=${encodeURIComponent(location)}`
        );
        const data = await response.json();
        if (data && data.length > 0) {
          return {
            key: data[0].Key,
            name: `${data[0].LocalizedName}, ${data[0].Country.LocalizedName}`
          };
        }
        return null;
      } catch (error) {
        console.error('Error fetching location:', error);
        return null;
      }
    }

    // Get current conditions
    async function getCurrentConditions(locationKey) {
      try {
        const response = await fetch(
          `${accuWeatherAPI.baseUrl}currentconditions/v1/${locationKey}?apikey=${accuWeatherAPI.key}&details=true`
        );
        const data = await response.json();
        return data[0]; // Return the first (current) condition
      } catch (error) {
        console.error('Error fetching current conditions:', error);
        return null;
      }
    }

    // Get 12-hour forecast
    async function get12HourForecast(locationKey) {
      try {
        const response = await fetch(
          `${accuWeatherAPI.baseUrl}forecasts/v1/hourly/12hour/${locationKey}?apikey=${accuWeatherAPI.key}&details=true&metric=true`
        );
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching 12-hour forecast:', error);
        return null;
      }
    }

    // Get 5-day forecast
    async function get5DayForecast(locationKey) {
      try {
        const response = await fetch(
          `${accuWeatherAPI.baseUrl}forecasts/v1/daily/5day/${locationKey}?apikey=${accuWeatherAPI.key}&details=true&metric=true`
        );
        const data = await response.json();
        return data.DailyForecasts;
      } catch (error) {
        console.error('Error fetching 5-day forecast:', error);
        return null;
      }
    }

    // Format time for hourly forecast
    function formatHourlyTime(dateString, index) {
      if (index === 0) return 'Now';
      
      const date = new Date(dateString);
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        hour12: true 
      }).replace(' AM', 'am').replace(' PM', 'pm');
    }

    // Update weather display with real data
    async function updateWeatherDisplay(location = "Lagos") {
      document.getElementById('current-icon').classList.add('pulse');
      document.getElementById('current-city').textContent = "Loading...";
      document.getElementById('current-condition').textContent = "Loading weather data...";
      
      try {
        // Get location key first
        const locationData = await getLocationKey(location);
        if (!locationData) {
          throw new Error('Location not found');
        }
        
        // Get all data
        const [currentConditions, hourlyForecast, dailyForecast] = await Promise.all([
          getCurrentConditions(locationData.key),
          get12HourForecast(locationData.key),
          get5DayForecast(locationData.key)
        ]);

        console.log(await get12HourForecast(locationData.key))
        
        if (!currentConditions || !hourlyForecast || !dailyForecast) {
          throw new Error('Failed to load weather data');
        }
        
        // Update current weather
        document.getElementById('current-city').textContent = locationData.name;
        document.getElementById('current-condition').textContent = currentConditions.WeatherText;
        document.getElementById('current-temp').textContent = `${Math.round(currentConditions.Temperature.Metric.Value)}°`;
        document.getElementById('wind-speed').textContent = `${Math.round(currentConditions.Wind.Speed.Metric.Value)} ${currentConditions.Wind.Speed.Metric.Unit}`;
        document.getElementById('humidity').textContent = `${currentConditions.RelativeHumidity}%`;
        document.getElementById('visibility').textContent = `${Math.round(currentConditions.Visibility.Metric.Value)} ${currentConditions.Visibility.Metric.Unit}`;
        document.getElementById('feels-like').textContent = `${Math.round(currentConditions.RealFeelTemperature.Metric.Value)}°`;
        
        // Update current weather icon
        console.log(currentConditions.WeatherIcon)
        const currentIconData = iconMap[currentConditions.WeatherIcon] || iconMap[1];
        const currentIcon = document.getElementById('current-icon');
        currentIcon.innerHTML = `<i class="fas fa-${currentIconData.icon} text-8xl ${currentIconData.color}"></i>`;
        currentIcon.classList.remove('pulse');
        
        // Update hourly forecast
        const hourlyContainer = document.querySelector('.hourly-forecast');
        hourlyContainer.innerHTML = '';
        
        hourlyForecast.forEach((hour, index) => {
          const iconData = iconMap[hour.WeatherIcon] || iconMap[1];
          hourlyContainer.innerHTML += `
            <div class="flex-shrink-0 text-center slide-in" style="animation-delay: ${index * 0.1}s">
              <p class="text-sm">${formatHourlyTime(hour.DateTime, index)}</p>
              <i class="fas fa-${iconData.icon} text-3xl my-2 ${iconData.color}"></i>
              <p class="font-medium">${Math.round(hour.Temperature.Value)}°</p>
            </div>
          `;
        });
        
        // Update daily forecast
        const dailyContainer = document.getElementById('daily-forecast-container');
        if (dailyContainer) {
          dailyContainer.innerHTML = '';
          
          dailyForecast.forEach((day, index) => {
            const date = new Date(day.Date);
            const dayName = index === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' });
            
            const dayIconData = iconMap[day.Day.Icon] || iconMap[1];
            const nightIconData = iconMap[day.Night.Icon] || iconMap[33];
            

            dailyContainer.innerHTML += `
              <div class="flex justify-between items-center p-3 hover:bg-gray-800 hover:bg-opacity-30 rounded-lg transition">
                <div class="flex items-center space-x-4">
                  <p class="w-24">${dayName}</p>
                  <i class="fas fa-${dayIconData.icon} text-2xl ${dayIconData.color} w-8"></i>
                </div>
                <div class="flex space-x-6">
                  <span class="font-medium">${Math.round(day.Temperature.Maximum.Value)}°</span>
                  <span class="text-gray-400">${Math.round(day.Temperature.Minimum.Value)}°</span>
                </div>
              </div>
            `;
          });
        }
        
      } catch (error) {
        console.error('Error updating weather:', error);
        document.getElementById('current-city').textContent = "Error loading data";
        document.getElementById('current-condition').textContent = "Please try another location";
        document.getElementById('current-icon').innerHTML = '<i class="fas fa-exclamation-triangle text-8xl text-red-400"></i>';
        document.getElementById('current-icon').classList.remove('pulse');
      }
    }


    // Search functionality
    document.getElementById('location-input').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        const location = this.value.trim();
        if (location) {
          updateWeatherDisplay(location);
        }
      }
    });

    // Search button functionality
    document.querySelector('.fa-search').parentElement.addEventListener('click', function() {
      const location = document.getElementById('location-input').value.trim();
      if (location) {
        updateWeatherDisplay(location);
      }
    });

    updateDate();
    updateWeatherDisplay();

    setInterval(updateDate, 60000);
  

    // Show modal on page load
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('api-warning-modal');
  const closeBtn = document.getElementById('close-modal');
  const countdownBar = document.getElementById('countdown-bar');

  modal.classList.remove('hidden');

  setTimeout(() => {
    modal.classList.add('hidden');
  }, 7000);
  
  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });
  
  // Loader
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('page-loader').classList.add('hidden');
    }, 5000);
  });
});