import { useState } from "react";
import { Check, Bell, Shield, User, AlertTriangle, ChevronRight } from "lucide-react";

const SECTIONS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "danger", label: "Danger zone", icon: AlertTriangle },
];

function Toggle({ checked, onChange, label, description }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="w-full flex items-center justify-between gap-4 py-4 text-left group"
    >
      <span>
        <span className="block text-[15px] text-[#1C1B18]">{label}</span>
        {description && (
          <span className="block text-[13px] text-[#8A8478] mt-0.5">{description}</span>
        )}
      </span>
      <span
        className={`relative shrink-0 w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none ${
          checked ? "bg-[#3D5A52]" : "bg-[#E4E0D6]"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-[#FAF8F3] shadow-sm transition-transform duration-200 ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </span>
    </button>
  );
}

function TextField({ label, value, onChange, type = "text", placeholder, hint }) {
  return (
    <label className="block py-3">
      <span className="block text-[13px] tracking-wide uppercase text-[#8A8478] mb-2">
        {label}
      </span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-0 border-b border-[#DDD8CC] focus:border-[#3D5A52] outline-none text-[15px] text-[#1C1B18] py-2 transition-colors placeholder:text-[#B7B1A2]"
      />
      {hint && <span className="block text-[12px] text-[#A8A290] mt-1.5">{hint}</span>}
    </label>
  );
}

export default function SettingsForm() {
  const [active, setActive] = useState("profile");
  const [saved, setSaved] = useState(false);

  const [name, setName] = useState("Alex Rivera");
  const [email, setEmail] = useState("alex@example.com");
  const [handle, setHandle] = useState("alexrivera");
  const [bio, setBio] = useState("");

  const [notifyProduct, setNotifyProduct] = useState(true);
  const [notifyDigest, setNotifyDigest] = useState(true);
  const [notifyMentions, setNotifyMentions] = useState(true);
  const [notifyMarketing, setNotifyMarketing] = useState(false);

  const [twoFactor, setTwoFactor] = useState(false);
  const [sessionAlerts, setSessionAlerts] = useState(true);

  const [confirmDelete, setConfirmDelete] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  return (
    <div className="min-h-full w-full bg-[#F5F2EA] flex items-start justify-center py-10 px-4">
      <form
        onSubmit={handleSave}
        className="w-full max-w-3xl bg-[#FAF8F3] rounded-sm shadow-[0_1px_2px_rgba(0,0,0,0.04)] border border-[#E9E4D8] overflow-hidden"
      >
        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-[#E9E4D8] flex items-center justify-between">
          <div>
            <h1 className="text-[26px] leading-tight text-[#1C1B18]" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
              Account settings
            </h1>
            <p className="text-[14px] text-[#8A8478] mt-1">
              Manage how your account looks, notifies, and stays secure.
            </p>
          </div>
          <div
            className={`text-[13px] px-3 py-1.5 rounded-full border transition-all duration-300 ${
              saved
                ? "opacity-100 border-[#3D5A52] text-[#3D5A52] bg-[#3D5A52]/5"
                : "opacity-0 border-transparent"
            }`}
          >
            <span className="inline-flex items-center gap-1.5">
              <Check size={14} /> Saved
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Section nav */}
          <nav className="md:w-56 shrink-0 border-b md:border-b-0 md:border-r border-[#E9E4D8] px-4 py-4 md:py-6">
            <ol className="space-y-1">
              {SECTIONS.map((s, i) => {
                const Icon = s.icon;
                const isActive = active === s.id;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => setActive(s.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-[14px] transition-colors ${
                        isActive
                          ? "bg-[#3D5A52] text-[#FAF8F3]"
                          : "text-[#5C5748] hover:bg-[#EFEBE0]"
                      }`}
                    >
                      <span
                        className={`text-[11px] tabular-nums ${
                          isActive ? "text-[#CFE0DA]" : "text-[#B7B1A2]"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <Icon size={15} className={isActive ? "text-[#FAF8F3]" : "text-[#8A8478]"} />
                      <span className="flex-1 text-left">{s.label}</span>
                      {isActive && <ChevronRight size={14} className="text-[#CFE0DA]" />}
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>

          {/* Panel */}
          <div className="flex-1 px-8 py-6 min-h-[420px]">
            {active === "profile" && (
              <div>
                <h2 className="text-[13px] tracking-wide uppercase text-[#8A8478] mb-1">Profile</h2>
                <p className="text-[13px] text-[#A8A290] mb-4">
                  Visible to people you collaborate with.
                </p>
                <div className="divide-y divide-[#EFEBE0]">
                  <TextField label="Full name" value={name} onChange={setName} />
                  <TextField label="Email address" value={email} onChange={setEmail} type="email" />
                  <TextField
                    label="Handle"
                    value={handle}
                    onChange={setHandle}
                    hint="Used in your public profile URL."
                  />
                  <label className="block py-3">
                    <span className="block text-[13px] tracking-wide uppercase text-[#8A8478] mb-2">
                      Bio
                    </span>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="A short line about what you're working on."
                      rows={3}
                      className="w-full bg-transparent border border-[#DDD8CC] focus:border-[#3D5A52] outline-none text-[15px] text-[#1C1B18] rounded-sm p-3 transition-colors placeholder:text-[#B7B1A2] resize-none"
                    />
                  </label>
                </div>
              </div>
            )}

            {active === "notifications" && (
              <div>
                <h2 className="text-[13px] tracking-wide uppercase text-[#8A8478] mb-1">
                  Notifications
                </h2>
                <p className="text-[13px] text-[#A8A290] mb-2">
                  Choose what's worth interrupting you for.
                </p>
                <div className="divide-y divide-[#EFEBE0]">
                  <Toggle
                    checked={notifyProduct}
                    onChange={setNotifyProduct}
                    label="Product updates"
                    description="New features and changes worth knowing about."
                  />
                  <Toggle
                    checked={notifyDigest}
                    onChange={setNotifyDigest}
                    label="Weekly digest"
                    description="A short summary every Monday morning."
                  />
                  <Toggle
                    checked={notifyMentions}
                    onChange={setNotifyMentions}
                    label="Mentions and replies"
                    description="When someone tags you directly."
                  />
                  <Toggle
                    checked={notifyMarketing}
                    onChange={setNotifyMarketing}
                    label="Offers and promotions"
                    description="Occasional discounts and partner news."
                  />
                </div>
              </div>
            )}

            {active === "security" && (
              <div>
                <h2 className="text-[13px] tracking-wide uppercase text-[#8A8478] mb-1">Security</h2>
                <p className="text-[13px] text-[#A8A290] mb-2">
                  Keep your account locked down.
                </p>
                <div className="divide-y divide-[#EFEBE0]">
                  <Toggle
                    checked={twoFactor}
                    onChange={setTwoFactor}
                    label="Two-factor authentication"
                    description="Require a code from your phone when signing in."
                  />
                  <Toggle
                    checked={sessionAlerts}
                    onChange={setSessionAlerts}
                    label="New device alerts"
                    description="Email me when a new device signs in."
                  />
                  <div className="py-4 flex items-center justify-between">
                    <span>
                      <span className="block text-[15px] text-[#1C1B18]">Password</span>
                      <span className="block text-[13px] text-[#8A8478] mt-0.5">
                        Last changed 4 months ago.
                      </span>
                    </span>
                    <button
                      type="button"
                      className="text-[13px] text-[#3D5A52] border border-[#3D5A52] rounded-sm px-3 py-1.5 hover:bg-[#3D5A52] hover:text-[#FAF8F3] transition-colors"
                    >
                      Change password
                    </button>
                  </div>
                </div>
              </div>
            )}

            {active === "danger" && (
              <div>
                <h2 className="text-[13px] tracking-wide uppercase text-[#B3492E] mb-1">
                  Danger zone
                </h2>
                <p className="text-[13px] text-[#A8A290] mb-4">
                  These actions can't be undone. Proceed carefully.
                </p>
                <div className="border border-[#E7C9BC] bg-[#FBF0EB] rounded-sm p-5">
                  <p className="text-[14px] text-[#1C1B18] mb-1">Delete this account</p>
                  <p className="text-[13px] text-[#8A7F76] mb-4">
                    All profile data, files, and history will be permanently removed.
                  </p>
                  <label className="block mb-3">
                    <span className="block text-[12px] text-[#8A7F76] mb-1.5">
                      Type <span className="text-[#B3492E] font-medium">delete</span> to confirm
                    </span>
                    <input
                      type="text"
                      value={confirmDelete}
                      onChange={(e) => setConfirmDelete(e.target.value)}
                      className="w-full bg-[#FAF8F3] border border-[#E7C9BC] focus:border-[#B3492E] outline-none text-[14px] rounded-sm px-3 py-2 transition-colors"
                    />
                  </label>
                  <button
                    type="button"
                    disabled={confirmDelete !== "delete"}
                    className="text-[13px] px-4 py-2 rounded-sm bg-[#B3492E] text-[#FAF8F3] disabled:bg-[#E7C9BC] disabled:text-[#B3492E]/60 disabled:cursor-not-allowed transition-colors"
                  >
                    Delete my account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-[#E9E4D8] flex items-center justify-end gap-3">
          <button
            type="button"
            className="text-[14px] text-[#5C5748] px-4 py-2 rounded-sm hover:bg-[#EFEBE0] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-[14px] bg-[#3D5A52] text-[#FAF8F3] px-5 py-2 rounded-sm hover:bg-[#2F4842] transition-colors"
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
}