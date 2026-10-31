import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SIKKIM_WEATHER_LOCATIONS,
  calculateFeelsLike,
  mapWmoCodeToCondition,
  fetchLiveWeather,
} from '../data/weatherData';

test('Sikkim weather dataset covers major microclimates and elevations', () => {
  assert.ok(SIKKIM_WEATHER_LOCATIONS.length >= 6, 'Should have at least 6 primary microclimates');

  const names = SIKKIM_WEATHER_LOCATIONS.map((l) => l.name.toLowerCase()).join(' ');
  assert.ok(names.includes('gangtok'), 'Should include Gangtok');
  assert.ok(names.includes('gurudongmar'), 'Should include Gurudongmar Lake');
  assert.ok(names.includes('yumthang'), 'Should include Yumthang Valley');
  assert.ok(names.includes('pelling'), 'Should include Pelling');
  assert.ok(names.includes('nathu la'), 'Should include Nathu La Pass');
  assert.ok(names.includes('ravangla'), 'Should include Ravangla');

  // Check elevation extremes
  const gurudongmar = SIKKIM_WEATHER_LOCATIONS.find((l) => l.id === 'gurudongmar');
  assert.ok(gurudongmar);
  assert.equal(gurudongmar.elevationMeters, 5430);
  assert.equal(gurudongmar.elevationFeet, 17800);
});

test('calculateFeelsLike computes high-altitude mountain windchill correctly', () => {
  // Moderate temp, light wind -> same or slightly lower
  const normal = calculateFeelsLike(16, 10);
  assert.equal(normal, 16);

  // Sub-zero high wind at Gurudongmar (-2°C at 40 km/h) -> significantly lower feels-like
  const coldWind = calculateFeelsLike(-2, 40);
  assert.ok(coldWind <= -8, `Expected feels like to be -8 or lower, got ${coldWind}`);

  // Extreme cold (-10°C at 50 km/h)
  const extremeCold = calculateFeelsLike(-10, 50);
  assert.ok(extremeCold <= -18, `Expected extreme cold feels like to be <= -18, got ${extremeCold}`);
});

test('mapWmoCodeToCondition maps satellite weather codes properly', () => {
  // Code 0: Clear
  const clearDay = mapWmoCodeToCondition(0, true);
  assert.equal(clearDay.condition, 'sunny');

  const clearNight = mapWmoCodeToCondition(0, false);
  assert.equal(clearNight.condition, 'clear_night');

  // Code 45: Fog
  const fog = mapWmoCodeToCondition(45, true);
  assert.equal(fog.condition, 'foggy');

  // Code 71: Snow
  const snow = mapWmoCodeToCondition(71, true);
  assert.equal(snow.condition, 'snow');

  // Code 95: Blizzard/Thunderstorm
  const storm = mapWmoCodeToCondition(95, true);
  assert.equal(storm.condition, 'blizzard');
});

test('All weather locations have complete road status and health advisories', () => {
  for (const loc of SIKKIM_WEATHER_LOCATIONS) {
    assert.ok(loc.roadStatus.length > 3, `Road status missing for ${loc.name}`);
    assert.ok(loc.roadNote.length > 10, `Road note too short for ${loc.name}`);
    assert.ok(loc.altitudeAdvisory.length > 10, `Altitude advisory too short for ${loc.name}`);
    assert.ok(loc.clothingAdvice.length > 10, `Clothing advice too short for ${loc.name}`);
    assert.ok(loc.latitude > 26 && loc.latitude < 29, `Latitude out of Sikkim range for ${loc.name}`);
    assert.ok(loc.longitude > 87 && loc.longitude < 90, `Longitude out of Sikkim range for ${loc.name}`);
  }
});
