const normalizeRequestedRole = (role) => (role === "admin" ? "admin" : "user");

const validateAdminRegistration = (normalizedRole, adminSetupKey, configuredAdminSetupKey) => {
  if (normalizedRole !== "admin") {
    return null;
  }

  if (!configuredAdminSetupKey) {
    return "Admin setup is not configured";
  }

  if (adminSetupKey !== configuredAdminSetupKey) {
    return "Invalid admin setup key";
  }

  return null;
};

module.exports = {
  normalizeRequestedRole,
  validateAdminRegistration,
};
