// Global registration switch (code level).
// Registrations are open only when this is true AND "Enable Registrations"
// is ON in the admin panel (/admin/registration).
//   true  -> the admin panel toggle decides (Terms -> Role -> Google Form, or Coming Soon)
//   false -> registrations are closed everywhere, whatever the admin panel says
// After changing this, commit and redeploy.
const REGISTRATION_OPEN = false;

export default REGISTRATION_OPEN;
