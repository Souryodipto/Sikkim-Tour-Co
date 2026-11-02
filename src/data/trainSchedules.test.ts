import { test } from 'node:test';
import assert from 'node:assert';
import { IRCTC_TRAIN_SCHEDULES, KOLKATA_BAGDOGRA_FLIGHTS } from './trainSchedules';

test('IRCTC Train Schedules dataset contains at least 14 validated trains', () => {
  assert.ok(IRCTC_TRAIN_SCHEDULES.length >= 14, `Expected at least 14 trains, got ${IRCTC_TRAIN_SCHEDULES.length}`);
});

test('All trains have unique train numbers and valid 24h departure and arrival times', () => {
  const trainNumbers = new Set<string>();
  const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;

  for (const train of IRCTC_TRAIN_SCHEDULES) {
    assert.ok(!trainNumbers.has(train.trainNumber), `Duplicate train number found: ${train.trainNumber}`);
    trainNumbers.add(train.trainNumber);

    assert.ok(timeRegex.test(train.departureTime), `Invalid departure time ${train.departureTime} on train ${train.trainNumber}`);
    assert.ok(timeRegex.test(train.arrivalTime), `Invalid arrival time ${train.arrivalTime} on train ${train.trainNumber}`);
    assert.ok(train.trainName.length > 0, `Train ${train.trainNumber} has empty name`);
    assert.ok(train.classes.length > 0, `Train ${train.trainNumber} has no classes`);
  }
});

test('Essential trains for Kolkata, Kalyani, and NJP travelers are present', () => {
  const darjeelingMail = IRCTC_TRAIN_SCHEDULES.find((t) => t.trainNumber === '12343');
  assert.ok(darjeelingMail, 'Darjeeling Mail (12343) must exist');
  assert.strictEqual(darjeelingMail.originStationCode, 'SDAH');
  assert.strictEqual(darjeelingMail.destinationStationCode, 'NJP');

  const padatik = IRCTC_TRAIN_SCHEDULES.find((t) => t.trainNumber === '12377');
  assert.ok(padatik, 'Padatik Express (12377) must exist');

  const vandeBharat = IRCTC_TRAIN_SCHEDULES.find((t) => t.trainNumber === '22301');
  assert.ok(vandeBharat, 'Vande Bharat Express (22301) must exist');
  assert.strictEqual(vandeBharat.originStationCode, 'HWH');

  const kanchanKanya = IRCTC_TRAIN_SCHEDULES.find((t) => t.trainNumber === '13149');
  assert.ok(kanchanKanya, 'Kanchan Kanya Express (13149) must exist');
  assert.ok(kanchanKanya.kalyaniSuburbanStop, 'Kanchan Kanya must have Kalyani/Naihati suburban stop info');
  assert.strictEqual(kanchanKanya.kalyaniSuburbanStop.stationCode, 'NH');
});

test('Kolkata to Bagdogra flight dataset contains active scheduled flights', () => {
  assert.ok(KOLKATA_BAGDOGRA_FLIGHTS.length >= 5, `Expected at least 5 flights, got ${KOLKATA_BAGDOGRA_FLIGHTS.length}`);
  for (const flight of KOLKATA_BAGDOGRA_FLIGHTS) {
    assert.ok(flight.flightNumber.length > 0);
    assert.ok(flight.airline.length > 0);
    assert.ok(flight.departureTime.includes('CCU'));
    assert.ok(flight.arrivalTime.includes('IXB'));
  }
});
