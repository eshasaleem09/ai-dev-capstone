import { useRef, useState } from "react";
import "./App.css";

const SECTIONS = [
  { id: "profile", label: "Profile" },
  { id: "notifications", label: "Notifications" },
  { id: "security", label: "Security" },
];

const TIMEZONES = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Berlin",
  "Asia/Karachi",
  "Asia/Kolkata",
  "Asia/Singapore",
  "Australia/Sydney",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_RE = /^[a-zA-Z0-9_]+$/;

const initialForm = {
  fullName: "",
  email: "",
  username: "",
  bio: "",
  timezone: "",
  notifyEmail: true,
  notifySms: false,
  notifyPush: true,
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
  twoFactor: false,
};

function validate(form) {
  const errors = {};

  if (!form.fullName.trim()) {
    errors.fullName = "Enter your full name.";
  }

  if (!form.email.trim()) {
    errors.email = "Enter your email address.";
  } else if (!EMAIL_RE.test(form.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!form.username.trim()) {
    errors.username = "Choose a username.";
  } else if (form.username.trim().length < 3) {
    errors.username = "Username needs at least 3 characters.";
  } else if (!USERNAME_RE.test(form.username.trim())) {
    errors.username = "Letters, numbers, and underscores only.";
  }

  if (!form.timezone) {
    errors.timezone = "Select a timezone.";
  }

  const touchingPassword =
    form.currentPassword || form.newPassword || form.confirmPassword;

  if (touchingPassword) {
    if (!form.currentPassword) {
      errors.currentPassword = "Enter your current password.";
    }
    if (!form.newPassword) {
      errors.newPassword = "Enter a new password.";
    } else if (form.newPassword.length < 8) {
      errors.newPassword = "Use at least 8 characters.";
    }
    if (!form.confirmPassword) {
      errors.confirmPassword = "Confirm your new password.";
    } else if (form.confirmPassword !== form.newPassword) {
      errors.confirmPassword = "Passwords don't match.";
    }
  }

  return errors;
}

export default function App() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [activeSection, setActiveSection] = useState("profile");
  const [status, setStatus] = useState("idle"); // idle | saved

  const sectionRefs = {
    profile: useRef(null),
    notifications: useRef(null),
    security: useRef(null),
  };
  const fieldRefs = useRef({});

  function updateField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
    setStatus("idle");
  }

  function handleChange(e) {
    const { name, type, value, checked } = e.target;
    updateField(name, type === "checkbox" ? checked : value);
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate({ ...form }));
  }

  function scrollToSection(id) {
    setActiveSection(id);
    sectionRefs[id].current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    setTouched(
      Object.fromEntries(Object.keys(initialForm).map((key) => [key, true]))
    );

    const errorFields = Object.keys(nextErrors);
    if (errorFields.length > 0) {
      const firstField = errorFields[0];
      const node = fieldRefs.current[firstField];
      node?.scrollIntoView({ behavior: "smooth", block: "center" });
      node?.focus();
      setStatus("idle");
      return;
    }

    setStatus("saved");
  }

  function fieldError(name) {
    return touched[name] && errors[name] ? errors[name] : null;
  }

  return (
    <div className="settings">
      <form className="settings-shell" onSubmit={handleSubmit} noValidate>
        <header className="settings-header">
          <p className="settings-eyebrow">Account console</p>
          <h1 className="settings-title">Settings</h1>
          <p className="settings-subtitle">
            Manage your profile, alerts, and account security in one place.
          </p>
        </header>

        <div className="settings-body">
          <nav className="settings-nav" aria-label="Settings sections">
            <div className="settings-nav-track">
              {SECTIONS.map((section) => (
                <button
                  type="button"
                  key={section.id}
                  className={
                    "settings-nav-item" +
                    (activeSection === section.id ? " is-active" : "")
                  }
                  onClick={() => scrollToSection(section.id)}
                >
                  <span className="settings-nav-dot" aria-hidden="true" />
                  {section.label}
                </button>
              ))}
            </div>
          </nav>

          <div className="settings-panels">
            {/* Profile */}
            <section
              id="profile"
              ref={sectionRefs.profile}
              className="settings-panel"
              aria-labelledby="profile-heading"
            >
              <div className="panel-heading">
                <h2 id="profile-heading">Profile</h2>
                <p>How you appear across the workspace.</p>
              </div>

              <div className="field-grid">
                <div className="field">
                  <label htmlFor="fullName">
                    Full name <span className="required">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    value={form.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    ref={(el) => (fieldRefs.current.fullName = el)}
                    aria-invalid={Boolean(fieldError("fullName"))}
                    aria-describedby="fullName-error"
                    className={fieldError("fullName") ? "has-error" : ""}
                    placeholder="Jordan Malik"
                  />
                  {fieldError("fullName") && (
                    <p className="field-error" id="fullName-error">
                      {fieldError("fullName")}
                    </p>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="email">
                    Email <span className="required">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    ref={(el) => (fieldRefs.current.email = el)}
                    aria-invalid={Boolean(fieldError("email"))}
                    aria-describedby="email-error"
                    className={fieldError("email") ? "has-error" : ""}
                    placeholder="jordan@company.com"
                  />
                  {fieldError("email") && (
                    <p className="field-error" id="email-error">
                      {fieldError("email")}
                    </p>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="username">
                    Username <span className="required">*</span>
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    value={form.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    ref={(el) => (fieldRefs.current.username = el)}
                    aria-invalid={Boolean(fieldError("username"))}
                    aria-describedby="username-error"
                    className={fieldError("username") ? "has-error" : ""}
                    placeholder="jordanm"
                  />
                  {fieldError("username") && (
                    <p className="field-error" id="username-error">
                      {fieldError("username")}
                    </p>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="timezone">
                    Timezone <span className="required">*</span>
                  </label>
                  <select
                    id="timezone"
                    name="timezone"
                    value={form.timezone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    ref={(el) => (fieldRefs.current.timezone = el)}
                    aria-invalid={Boolean(fieldError("timezone"))}
                    aria-describedby="timezone-error"
                    className={fieldError("timezone") ? "has-error" : ""}
                  >
                    <option value="" disabled>
                      Select a timezone
                    </option>
                    {TIMEZONES.map((tz) => (
                      <option key={tz} value={tz}>
                        {tz}
                      </option>
                    ))}
                  </select>
                  {fieldError("timezone") && (
                    <p className="field-error" id="timezone-error">
                      {fieldError("timezone")}
                    </p>
                  )}
                </div>

                <div className="field field-span-2">
                  <label htmlFor="bio">Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={3}
                    value={form.bio}
                    onChange={handleChange}
                    placeholder="A short line about what you work on."
                  />
                  <p className="field-hint">Optional. Shown on your public profile.</p>
                </div>
              </div>
            </section>

            {/* Notifications */}
            <section
              id="notifications"
              ref={sectionRefs.notifications}
              className="settings-panel"
              aria-labelledby="notifications-heading"
            >
              <div className="panel-heading">
                <h2 id="notifications-heading">Notifications</h2>
                <p>Choose where you want to hear from us.</p>
              </div>

              <div className="switch-list">
                <label className="switch-row">
                  <span className="switch-copy">
                    <span className="switch-title">Email</span>
                    <span className="switch-desc">
                      Product updates and account activity.
                    </span>
                  </span>
                  <span className="switch">
                    <input
                      type="checkbox"
                      name="notifyEmail"
                      checked={form.notifyEmail}
                      onChange={handleChange}
                    />
                    <span className="switch-track" aria-hidden="true">
                      <span className="switch-thumb" />
                    </span>
                  </span>
                </label>

                <label className="switch-row">
                  <span className="switch-copy">
                    <span className="switch-title">SMS</span>
                    <span className="switch-desc">
                      Time-sensitive alerts only.
                    </span>
                  </span>
                  <span className="switch">
                    <input
                      type="checkbox"
                      name="notifySms"
                      checked={form.notifySms}
                      onChange={handleChange}
                    />
                    <span className="switch-track" aria-hidden="true">
                      <span className="switch-thumb" />
                    </span>
                  </span>
                </label>

                <label className="switch-row">
                  <span className="switch-copy">
                    <span className="switch-title">Push</span>
                    <span className="switch-desc">
                      Real-time alerts on this device.
                    </span>
                  </span>
                  <span className="switch">
                    <input
                      type="checkbox"
                      name="notifyPush"
                      checked={form.notifyPush}
                      onChange={handleChange}
                    />
                    <span className="switch-track" aria-hidden="true">
                      <span className="switch-thumb" />
                    </span>
                  </span>
                </label>
              </div>
            </section>

            {/* Security */}
            <section
              id="security"
              ref={sectionRefs.security}
              className="settings-panel"
              aria-labelledby="security-heading"
            >
              <div className="panel-heading">
                <h2 id="security-heading">Security</h2>
                <p>Update your password and login protections.</p>
              </div>

              <div className="field-grid">
                <div className="field field-span-2">
                  <label htmlFor="currentPassword">Current password</label>
                  <input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    autoComplete="current-password"
                    value={form.currentPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    ref={(el) => (fieldRefs.current.currentPassword = el)}
                    aria-invalid={Boolean(fieldError("currentPassword"))}
                    aria-describedby="currentPassword-error"
                    className={fieldError("currentPassword") ? "has-error" : ""}
                  />
                  {fieldError("currentPassword") && (
                    <p className="field-error" id="currentPassword-error">
                      {fieldError("currentPassword")}
                    </p>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="newPassword">New password</label>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    autoComplete="new-password"
                    value={form.newPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    ref={(el) => (fieldRefs.current.newPassword = el)}
                    aria-invalid={Boolean(fieldError("newPassword"))}
                    aria-describedby="newPassword-error"
                    className={fieldError("newPassword") ? "has-error" : ""}
                  />
                  {fieldError("newPassword") && (
                    <p className="field-error" id="newPassword-error">
                      {fieldError("newPassword")}
                    </p>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="confirmPassword">Confirm password</label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    ref={(el) => (fieldRefs.current.confirmPassword = el)}
                    aria-invalid={Boolean(fieldError("confirmPassword"))}
                    aria-describedby="confirmPassword-error"
                    className={fieldError("confirmPassword") ? "has-error" : ""}
                  />
                  {fieldError("confirmPassword") && (
                    <p className="field-error" id="confirmPassword-error">
                      {fieldError("confirmPassword")}
                    </p>
                  )}
                </div>
              </div>

              <label className="switch-row switch-row-bordered">
                <span className="switch-copy">
                  <span className="switch-title">Two-factor authentication</span>
                  <span className="switch-desc">
                    Require a code in addition to your password.
                  </span>
                </span>
                <span className="switch">
                  <input
                    type="checkbox"
                    name="twoFactor"
                    checked={form.twoFactor}
                    onChange={handleChange}
                  />
                  <span className="switch-track" aria-hidden="true">
                    <span className="switch-thumb" />
                  </span>
                </span>
              </label>
            </section>
          </div>
        </div>

        <footer className="settings-footer">
          <span className="settings-status" role="status">
            {status === "saved" ? "Changes saved." : ""}
          </span>
          <div className="settings-actions">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                setForm(initialForm);
                setErrors({});
                setTouched({});
                setStatus("idle");
              }}
            >
              Reset
            </button>
            <button type="submit" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </footer>
      </form>
    </div>
  );
}