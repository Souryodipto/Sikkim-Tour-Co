import React, { useState, useEffect } from 'react';
import {
  WeatherLocation,
  SIKKIM_WEATHER_LOCATIONS,
  LiveWeatherData,
  TimeOfDay,
  WeatherConditionType,
  fetchLiveWeather,
} from '../../data/weatherData';
import { Mountain3DScene } from './Mountain3DScene';
import { WeatherControlDock } from './WeatherControlDock';
import { useRouter } from '../../context/RouterContext';
import {
  CloudSun,
  ShieldCheck,
  Maximize2,
  Sparkles,
  Info,
  Clock,
  Compass,
} from 'lucide-react';

interface WeatherWidgetProps {
  initialLocationId?: string;
  isFullScreen?: boolean;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({
  initialLocationId = 'gangtok',
  isFullScreen = false,
}) => {
  const { navigate } = useRouter();
  const [selectedLocation, setSelectedLocation] = useState<WeatherLocation>(() => {
    return (
      SIKKIM_WEATHER_LOCATIONS.find((l) => l.id === initialLocationId) ||
      SIKKIM_WEATHER_LOCATIONS[0]
    );
  });

  const [weatherData, setWeatherData] = useState<LiveWeatherData | null>(null);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('day');
  const [conditionOverride, setConditionOverride] = useState<WeatherConditionType | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Load weather data on location change
  const loadWeather = async (locId: string) => {
    setIsRefreshing(true);
    try {
      const data = await fetchLiveWeather(locId);
      setWeatherData(data);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadWeather(selectedLocation.id);
  }, [selectedLocation.id]);

  // Set realistic default timeOfDay based on current local time
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 7) setTimeOfDay('dawn');
    else if (hour >= 7 && hour < 17) setTimeOfDay('day');
    else if (hour >= 17 && hour < 19) setTimeOfDay('sunset');
    else setTimeOfDay('night');
  }, []);

  const activeCondition = conditionOverride || (weatherData ? weatherData.condition : 'partly_cloudy');
  const activeWind = weatherData ? weatherData.windSpeedKph : selectedLocation.defaultWindKph;

  return (
    <section className={`relative w-full ${isFullScreen ? 'h-[640px] max-h-[82vh] min-h-[500px] rounded-lg' : 'h-[580px] rounded-lg'} overflow-hidden bg-[#173D35] border border-[#527568]/40 shadow-xl`}>
      {/* 3D WebGL Scene Viewport (100% Unobstructed Center) */}
      <div className="absolute inset-0 z-0">
        <Mountain3DScene
          condition={activeCondition}
          timeOfDay={timeOfDay}
          elevationMeters={selectedLocation.elevationMeters}
          windSpeedKph={activeWind}
          interactive={true}
        />
      </div>

      {/* Top Header Overlay: Minimal Spec Badge */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-start justify-between pointer-events-none">
        <div className="bg-[#173D35]/85 text-white p-3 sm:p-4 rounded-md border border-white/15 shadow-lg pointer-events-auto max-w-md">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#DFC89E] uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#C4A36A]" />
            <span>Interactive 3D Himalayan Weather Observatory</span>
          </div>
          <h2 className="font-editorial text-xl sm:text-2xl font-bold text-white leading-tight">
            Live Mountain Microclimates
          </h2>
          <p className="text-xs text-white/80 mt-1 font-light leading-relaxed">
            Drag to rotate the 3D Kanchenjunga & Gurudongmar terrain. View real-time satellite telemetry, windchill, and mountain pass conditions.
          </p>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          {!isFullScreen && (
            <button
              onClick={() => navigate('/weather')}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#173D35]/85 hover:bg-[#173D35] text-white text-xs font-semibold rounded-sm border border-white/15 shadow-md transition-colors"
              title="Open full-screen 3D observatory"
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#C4A36A]" />
              <span className="hidden sm:inline">Full 3D Observatory</span>
            </button>
          )}

          {weatherData && (
            <div className="hidden md:flex items-center gap-1.5 px-3 py-2 bg-[#173D35]/85 text-white/90 text-xs rounded-sm border border-white/15">
              <Clock className="w-3.5 h-3.5 text-[#DFC89E]" />
              <span>{weatherData.lastUpdated}</span>
            </div>
          )}
        </div>
      </div>

      {/* 3D Hint Overlay (Top Center) */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-10 pointer-events-none opacity-80 hidden sm:block">
        <span className="px-3 py-1 bg-black/40 text-white/90 text-[11px] rounded-full border border-white/15 shadow-xs flex items-center gap-1.5">
          <Compass className="w-3 h-3 text-[#DFC89E]" />
          <span>Left-click + Drag to Orbit · Scroll to Zoom</span>
        </span>
      </div>

      {/* Unified Bottom Control Dock */}
      <WeatherControlDock
        selectedLocation={selectedLocation}
        onSelectLocation={setSelectedLocation}
        weatherData={weatherData}
        timeOfDay={timeOfDay}
        onChangeTimeOfDay={setTimeOfDay}
        conditionOverride={conditionOverride}
        onOverrideCondition={setConditionOverride}
        onRefresh={() => loadWeather(selectedLocation.id)}
        isRefreshing={isRefreshing}
      />
    </section>
  );
};
