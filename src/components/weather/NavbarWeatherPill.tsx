import React, { useState, useEffect } from 'react';
import { useRouter } from '../../context/RouterContext';
import {
  WeatherLocation,
  SIKKIM_WEATHER_LOCATIONS,
  LiveWeatherData,
  fetchLiveWeather,
} from '../../data/weatherData';
import { CloudSun, CloudSnow, Sun, Moon, Mountain, Sparkles } from 'lucide-react';

export const NavbarWeatherPill: React.FC = () => {
  const { navigate } = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [weatherMap, setWeatherMap] = useState<Record<string, LiveWeatherData>>({});

  const featuredLocations = [
    SIKKIM_WEATHER_LOCATIONS[0], // Gangtok (1,650m)
    SIKKIM_WEATHER_LOCATIONS[1], // Gurudongmar Lake (5,430m)
    SIKKIM_WEATHER_LOCATIONS[3], // Pelling (2,150m)
  ];

  useEffect(() => {
    // Fetch initial weather for featured locations
    const loadFeatured = async () => {
      for (const loc of featuredLocations) {
        try {
          const data = await fetchLiveWeather(loc.id);
          setWeatherMap((prev) => ({ ...prev, [loc.id]: data }));
        } catch {
          // ignore error
        }
      }
    };
    loadFeatured();
  }, []);

  // Cycle through featured locations every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredLocations.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredLocations.length]);

  const activeLoc = featuredLocations[currentIndex];
  const activeData = weatherMap[activeLoc.id];

  const getConditionIcon = (condition?: string) => {
    switch (condition) {
      case 'snow':
      case 'blizzard':
        return <CloudSnow className="w-3.5 h-3.5 text-sky-200" />;
      case 'sunny':
        return <Sun className="w-3.5 h-3.5 text-amber-300" />;
      case 'clear_night':
        return <Moon className="w-3.5 h-3.5 text-sky-200" />;
      default:
        return <CloudSun className="w-3.5 h-3.5 text-amber-200" />;
    }
  };

  const temp = activeData ? activeData.temperature : activeLoc.defaultTemp;
  const condition = activeData ? activeData.condition : activeLoc.defaultCondition;

  return (
    <button
      onClick={() => navigate('/weather')}
      className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/20 transition-all group shrink-0 focus-visible:ring-2 focus-visible:ring-[#C4A36A]"
      title={`Live Weather in ${activeLoc.name}: ${temp}°C · Click to explore 3D Mountain Observatory`}
      aria-label="Live Himalayan Weather in 3D"
    >
      <div className="flex items-center gap-1.5">
        {getConditionIcon(condition)}
        <span className="font-semibold text-white/95">{activeLoc.name}</span>
        <span className="text-[#DFC89E] font-bold">{temp > 0 ? `+${temp}` : temp}°C</span>
      </div>

      <span className="hidden xl:inline-flex items-center gap-1 text-[10px] bg-white/15 px-1.5 py-0.2 rounded-xs text-[#DFC89E] font-medium">
        <Sparkles className="w-2.5 h-2.5" />
        <span>3D</span>
      </span>
    </button>
  );
};
