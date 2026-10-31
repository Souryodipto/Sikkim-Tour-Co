import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { WeatherWidget } from '../components/weather/WeatherWidget';
import { SIKKIM_WEATHER_LOCATIONS } from '../data/weatherData';
import { siteConfig } from '../config/site';
import {
  ChevronRight,
  CloudSun,
  ShieldCheck,
  Mountain,
  Compass,
  AlertTriangle,
  Calendar,
  MessageCircle,
  Thermometer,
  Wind,
} from 'lucide-react';

export const WeatherView: React.FC = () => {
  const { navigate } = useRouter();
  const [selectedLocId, setSelectedLocId] = useState('gangtok');

  return (
    <div className="pt-24 pb-20 bg-[#F8F6F0] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 mb-6" aria-label="Breadcrumb">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
            className="hover:text-stone-800"
          >
            Home
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-[#173D35] font-semibold">Live Himalayan Weather (3D)</span>
        </nav>

        {/* View Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#527568] mb-2">
            <CloudSun className="w-4 h-4 text-[#C4A36A]" />
            <span>Real-Time Himalayan Microclimates</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#173D35] leading-tight">
            Sikkim 3D Mountain Weather Observatory
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 max-w-3xl mt-2 leading-relaxed">
            Experience real-time weather across Sikkim&apos;s extreme elevation gradient—from Gangtok (1,650m) to sacred Gurudongmar Lake (5,430m / 17,800 ft). Inspect 3D terrain contours, alpenglow lighting, windchill factors, and army road clearances.
          </p>
        </div>

        {/* 3D Interactive Weather Widget */}
        <div className="mb-12">
          <WeatherWidget initialLocationId={selectedLocId} isFullScreen={true} />
        </div>

        {/* Elevation Gradient & Microclimate Guide */}
        <div className="bg-white rounded-md border border-stone-200/90 p-8 mb-12 shadow-xs">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div>
              <h2 className="font-editorial text-2xl font-bold text-[#173D35]">
                Sikkim Elevation Gradient & Road Status
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Real-time field conditions updated in coordination with local drivers and Border Roads Organisation (BRO).
              </p>
            </div>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=Hi%20Sikkim%20Tour%20Co.,%20what%20are%20the%20current%20road%20and%20weather%20conditions%20for%20North%20Sikkim%20passes?`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xs text-xs font-semibold transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask Current Pass Status on WhatsApp</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SIKKIM_WEATHER_LOCATIONS.map((loc) => (
              <div
                key={loc.id}
                className="p-5 rounded-md border border-stone-200 bg-[#F8F6F0]/50 hover:border-[#173D35]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-editorial text-lg font-bold text-[#173D35]">{loc.name}</h3>
                      <div className="text-xs text-stone-500">{loc.district}</div>
                    </div>
                    <span className="px-2 py-0.5 bg-[#173D35] text-[#DFC89E] font-bold text-xs rounded-xs">
                      {loc.elevationFeet.toLocaleString()} ft
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 mb-3">{loc.tagline}</p>

                  <div className="space-y-1.5 text-xs text-stone-700 pt-2 border-t border-stone-200">
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500">Road Status:</span>
                      <span className="font-semibold text-emerald-700 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{loc.roadStatus}</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500">Best Hours:</span>
                      <span className="font-medium text-stone-800">{loc.bestVisitingHours}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-200/80">
                  <div className="text-[11px] text-stone-500 font-medium">Clothing Recommendation:</div>
                  <div className="text-xs text-[#173D35] font-medium mt-0.5">{loc.clothingAdvice}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Himalayan Seasons Calendar */}
        <div className="bg-[#173D35] text-white rounded-md p-8 shadow-md">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#DFC89E] mb-2">
              <Calendar className="w-4 h-4 text-[#C4A36A]" />
              <span>Planning Your High-Altitude Journey</span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-white">
              Sikkim Weather & Seasonality Guide
            </h2>
            <p className="text-xs sm:text-sm text-white/80 mt-1 leading-relaxed">
              When to visit for pristine mountain views, snow experiences, and blooming alpine valleys.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 p-5 rounded-md border border-white/10 space-y-2">
              <span className="text-xs font-bold text-[#DFC89E] uppercase tracking-wider block">March – May</span>
              <h3 className="font-editorial text-lg font-bold text-white">Spring Rhododendron Bloom</h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Yumthang Valley bursts into vivid red and pink rhododendrons. Daytime weather is pleasant (12°C–18°C), while Gurudongmar remains crisp and frozen.
              </p>
            </div>

            <div className="bg-white/10 p-5 rounded-md border border-white/10 space-y-2">
              <span className="text-xs font-bold text-[#DFC89E] uppercase tracking-wider block">Oct – Dec</span>
              <h3 className="font-editorial text-lg font-bold text-white">Autumn Crystal Horizons</h3>
              <p className="text-xs text-white/80 leading-relaxed">
                The undisputed golden season. Crystal-clear views of Mount Kanchenjunga from Pelling and Gangtok. Ideal for photography and high mountain circuits.
              </p>
            </div>

            <div className="bg-white/10 p-5 rounded-md border border-white/10 space-y-2">
              <span className="text-xs font-bold text-[#DFC89E] uppercase tracking-wider block">Dec – Feb</span>
              <h3 className="font-editorial text-lg font-bold text-white">Winter Snow Wonderland</h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Heavy snowfall at Tsomgo Lake, Nathula Pass, and Zero Point. Sub-zero temperatures. Perfect for snow seekers and frozen lake photography.
              </p>
            </div>

            <div className="bg-white/10 p-5 rounded-md border border-white/10 space-y-2">
              <span className="text-xs font-bold text-[#DFC89E] uppercase tracking-wider block">June – Aug</span>
              <h3 className="font-editorial text-lg font-bold text-white">Monsoon & Waterfalls</h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Vibrant lush green terraced valleys and roaring mountain waterfalls. Best enjoyed around Gangtok, Temi Tea Estate, and serene monastery retreats.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
