import React, { useState, useEffect } from 'react';
import {
  WeatherLocation,
  SIKKIM_WEATHER_LOCATIONS,
  LiveWeatherData,
  TimeOfDay,
  WeatherConditionType,
} from '../../data/weatherData';
import {
  Compass,
  Sun,
  Sunset,
  Moon,
  CloudSnow,
  CloudFog,
  Wind,
  Droplets,
  Eye,
  Mountain,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  RefreshCw,
  Sparkles,
} from 'lucide-react';

interface WeatherControlDockProps {
  selectedLocation: WeatherLocation;
  onSelectLocation: (loc: WeatherLocation) => void;
  weatherData: LiveWeatherData | null;
  timeOfDay: TimeOfDay;
  onChangeTimeOfDay: (time: TimeOfDay) => void;
  conditionOverride: WeatherConditionType | null;
  onOverrideCondition: (cond: WeatherConditionType | null) => void;
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export const WeatherControlDock: React.FC<WeatherControlDockProps> = ({
  selectedLocation,
  onSelectLocation,
  weatherData,
  timeOfDay,
  onChangeTimeOfDay,
  conditionOverride,
  onOverrideCondition,
  onRefresh,
  isRefreshing = false,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<'regions' | 'lighting' | 'telemetry'>('regions');

  // Keyboard shortcut: H to toggle dock collapse/expand
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;
      if (e.key.toLowerCase() === 'h') {
        e.preventDefault();
        setIsCollapsed((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const timePills: { id: TimeOfDay; label: string; icon: React.ReactNode }[] = [
    { id: 'dawn', label: 'Dawn Alpenglow', icon: <Sunset className="w-3.5 h-3.5 text-amber-300" /> },
    { id: 'day', label: 'Alpine Sun', icon: <Sun className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'sunset', label: 'Golden Hour', icon: <Sunset className="w-3.5 h-3.5 text-orange-400" /> },
    { id: 'night', label: 'Starry Night', icon: <Moon className="w-3.5 h-3.5 text-sky-200" /> },
  ];

  return (
    <div
      className="absolute bottom-3 sm:bottom-4 w-[95%] sm:w-[92%] max-w-[880px] z-30 transition-all duration-300 ease-out"
      style={{
        left: '50%',
        transform: isCollapsed ? 'translate(-50%, calc(100% - 38px))' : 'translate(-50%, 0)',
      }}
    >
      {/* Collapse / Expand Toggle Tab */}
      <div className="flex justify-center mb-1">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#173D35] hover:bg-[#1f4e43] text-white text-xs font-semibold rounded-t-md shadow-md border-t border-x border-[#527568]/50 transition-colors"
          aria-expanded={!isCollapsed}
          title="Toggle Controls (Press H)"
        >
          {isCollapsed ? (
            <>
              <ChevronUp className="w-3.5 h-3.5 text-[#C4A36A]" />
              <span>Show 3D Weather Dock (H)</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5 text-[#C4A36A]" />
              <span>Hide Controls (H)</span>
            </>
          )}
        </button>
      </div>

      {/* Main Consolidated Glassmorphic Dock Container */}
      <div className="bg-[#173D35]/95 text-white rounded-md border border-[#527568]/60 shadow-2xl p-4 sm:p-5">
        {/* Top Dock Header: Telemetry Summary & Tab Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-sm border border-white/15 shrink-0 text-[#DFC89E]">
              <Mountain className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-editorial text-lg sm:text-xl font-bold text-white tracking-wide">
                  {selectedLocation.name}
                </h3>
                <span className="text-xs px-2 py-0.5 bg-[#C4A36A]/20 text-[#DFC89E] rounded-xs font-semibold border border-[#C4A36A]/30">
                  {selectedLocation.elevationMeters.toLocaleString()} m ({selectedLocation.elevationFeet.toLocaleString()} ft)
                </span>
                <span className="text-xs text-white/60">· {selectedLocation.district}</span>
              </div>
              <p className="text-xs text-white/80 line-clamp-1">{selectedLocation.tagline}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Live Data Badge */}
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-white/10 hover:bg-white/15 text-white/90 text-xs font-medium rounded-xs border border-white/15 transition-colors"
              title="Refresh live mountain telemetry"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#C4A36A] ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh Live</span>
            </button>

            {/* Dock Section Tabs */}
            <div className="flex items-center bg-black/30 p-0.5 rounded-sm border border-white/10 text-xs">
              <button
                onClick={() => setActiveTab('regions')}
                className={`px-3 py-1 rounded-xs font-medium transition-colors ${
                  activeTab === 'regions' ? 'bg-[#C4A36A] text-[#173D35] font-semibold' : 'text-white/80 hover:text-white'
                }`}
              >
                Regions
              </button>
              <button
                onClick={() => setActiveTab('lighting')}
                className={`px-3 py-1 rounded-xs font-medium transition-colors ${
                  activeTab === 'lighting' ? 'bg-[#C4A36A] text-[#173D35] font-semibold' : 'text-white/80 hover:text-white'
                }`}
              >
                Lighting & Atmosphere
              </button>
              <button
                onClick={() => setActiveTab('telemetry')}
                className={`px-3 py-1 rounded-xs font-medium transition-colors ${
                  activeTab === 'telemetry' ? 'bg-[#C4A36A] text-[#173D35] font-semibold' : 'text-white/80 hover:text-white'
                }`}
              >
                Pass Status
              </button>
            </div>
          </div>
        </div>

        {/* Tab 1: Regions & Microclimates */}
        {activeTab === 'regions' && (
          <div className="mt-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
              {SIKKIM_WEATHER_LOCATIONS.map((loc) => {
                const isSelected = loc.id === selectedLocation.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => onSelectLocation(loc)}
                    className={`px-3 py-2 rounded-xs border text-left shrink-0 transition-all ${
                      isSelected
                        ? 'bg-[#C4A36A] text-[#173D35] border-[#DFC89E] shadow-sm font-semibold'
                        : 'bg-white/5 hover:bg-white/10 text-white/90 border-white/10'
                    }`}
                  >
                    <div className="text-xs font-bold leading-tight">{loc.name}</div>
                    <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-[#173D35]/80' : 'text-white/60'}`}>
                      {loc.elevationFeet.toLocaleString()} ft · {loc.district}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Lighting & Atmospheric Override */}
        {activeTab === 'lighting' && (
          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between text-xs text-white/80">
              <span className="font-medium">Solar Cycle & Time of Day:</span>
              <span className="text-[11px] text-[#C4A36A]">Adjusts 3D Sun Angle & Alpenglow</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {timePills.map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => onChangeTimeOfDay(pill.id)}
                  className={`flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-xs border transition-all ${
                    timeOfDay === pill.id
                      ? 'bg-[#C4A36A] text-[#173D35] border-[#DFC89E] shadow-xs'
                      : 'bg-white/5 hover:bg-white/10 text-white/90 border-white/10'
                  }`}
                >
                  {pill.icon}
                  <span>{pill.label}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2 text-xs text-white/70">
              <span>Weather Simulator:</span>
              <button
                onClick={() => onOverrideCondition(null)}
                className={`px-2 py-0.5 rounded-xs border text-[11px] ${
                  conditionOverride === null
                    ? 'bg-[#527568] text-white border-white/20'
                    : 'bg-white/5 text-white/70 border-white/10'
                }`}
              >
                Auto (Live Data)
              </button>
              <button
                onClick={() => onOverrideCondition('snow')}
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-xs border text-[11px] ${
                  conditionOverride === 'snow'
                    ? 'bg-[#527568] text-white border-white/20'
                    : 'bg-white/5 text-white/70 border-white/10'
                }`}
              >
                <CloudSnow className="w-3 h-3 text-sky-300" />
                <span>Snowfall</span>
              </button>
              <button
                onClick={() => onOverrideCondition('foggy')}
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-xs border text-[11px] ${
                  conditionOverride === 'foggy'
                    ? 'bg-[#527568] text-white border-white/20'
                    : 'bg-white/5 text-white/70 border-white/10'
                }`}
              >
                <CloudFog className="w-3 h-3 text-amber-200" />
                <span>Alpine Fog</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Mountain Pass Status & Travel Advisory */}
        {activeTab === 'telemetry' && (
          <div className="mt-3 bg-white/5 p-3 rounded-xs border border-white/10 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#DFC89E] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Mountain Road Status: {selectedLocation.roadStatus}</span>
              </span>
              <span className="text-[11px] text-white/60">Updated: Today</span>
            </div>
            <p className="text-white/80 text-[11px] leading-relaxed">{selectedLocation.roadNote}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-white/10 text-[11px]">
              <div>
                <span className="text-white/60 block">Altitude & Health Advisory:</span>
                <span className="text-white/90">{selectedLocation.altitudeAdvisory}</span>
              </div>
              <div>
                <span className="text-white/60 block">Recommended Clothing:</span>
                <span className="text-[#DFC89E]">{selectedLocation.clothingAdvice}</span>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Live Metrics Strip */}
        {weatherData && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 pt-3 border-t border-white/10 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-editorial text-2xl font-bold text-[#DFC89E]">
                {weatherData.temperature}°C
              </span>
              <div className="text-[11px] text-white/70 leading-tight">
                <div>Feels {weatherData.feelsLike}°C</div>
                <div className="text-[#DFC89E] font-medium">{weatherData.conditionText}</div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-white/80">
              <Wind className="w-3.5 h-3.5 text-stone-300 shrink-0" />
              <span>Wind: {weatherData.windSpeedKph} km/h (High Ridge)</span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-white/80">
              <Droplets className="w-3.5 h-3.5 text-sky-300 shrink-0" />
              <span>Humidity: {weatherData.humidity}%</span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-white/80">
              <Eye className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
              <span>Visibility: {weatherData.visibilityKm} km</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
