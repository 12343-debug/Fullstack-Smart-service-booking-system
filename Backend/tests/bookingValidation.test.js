const test = require("node:test");
const assert = require("node:assert/strict");

const {
  ALL_SLOTS,
  STATUS_VALUES,
  normalizeBookingDate,
  normalizeLocation,
} = require("../utils/bookingValidation");

test("booking status values include active and terminal states", () => {
  assert.deepEqual(STATUS_VALUES, [
    "pending",
    "confirmed",
    "in_progress",
    "completed",
    "cancelled",
  ]);
});

test("available slot list remains stable", () => {
  assert.equal(ALL_SLOTS.length, 8);
  assert.equal(ALL_SLOTS[0], "10:00 AM");
  assert.equal(ALL_SLOTS[7], "5:00 PM");
});

test("normalizeBookingDate accepts valid date format", () => {
  assert.deepEqual(normalizeBookingDate("2026-03-11"), { value: "2026-03-11" });
});

test("normalizeBookingDate rejects invalid format", () => {
  assert.deepEqual(normalizeBookingDate("11-03-2026"), {
    error: "Valid booking date is required",
  });
});

test("normalizeLocation trims address and notes", () => {
  assert.deepEqual(normalizeLocation({
    address: "  Hyderabad  ",
    notes: "  Near gate  ",
    latitude: "17.385",
    longitude: "78.4867",
  }), {
    value: {
      address: "Hyderabad",
      notes: "Near gate",
      latitude: 17.385,
      longitude: 78.4867,
    },
  });
});

test("normalizeLocation rejects empty address", () => {
  assert.deepEqual(normalizeLocation({ address: "   " }), {
    error: "Service address is required",
  });
});

test("normalizeLocation rejects invalid coordinates", () => {
  assert.deepEqual(normalizeLocation({
    address: "Main road",
    latitude: "abc",
    longitude: "78.4867",
  }), {
    error: "Invalid map coordinates",
  });
});
