const test = require("node:test");
const assert = require("node:assert/strict");

const {
  normalizeRequestedRole,
  validateAdminRegistration,
} = require("../utils/authValidation");

test("normalizeRequestedRole keeps admin role", () => {
  assert.equal(normalizeRequestedRole("admin"), "admin");
});

test("normalizeRequestedRole defaults unknown roles to user", () => {
  assert.equal(normalizeRequestedRole("manager"), "user");
  assert.equal(normalizeRequestedRole(undefined), "user");
});

test("validateAdminRegistration allows normal user registration without setup key", () => {
  assert.equal(validateAdminRegistration("user", "", ""), null);
});

test("validateAdminRegistration rejects admin registration when setup is missing", () => {
  assert.equal(
    validateAdminRegistration("admin", "AdminSetup@123", ""),
    "Admin setup is not configured",
  );
});

test("validateAdminRegistration rejects admin registration with wrong key", () => {
  assert.equal(
    validateAdminRegistration("admin", "wrong", "AdminSetup@123"),
    "Invalid admin setup key",
  );
});

test("validateAdminRegistration accepts matching admin setup key", () => {
  assert.equal(
    validateAdminRegistration("admin", "AdminSetup@123", "AdminSetup@123"),
    null,
  );
});
