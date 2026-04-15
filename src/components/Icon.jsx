const baseStroke = {
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const ICONS = {
  board: (
    <>
      <path {...baseStroke} d="M4 5h6v6H4zM14 5h6v6h-6zM4 15h6v4H4zM14 15h6v4h-6z" />
    </>
  ),
  brain: (
    <>
      <path {...baseStroke} d="M12 3 4.8 7.2v8.6L12 20l7.2-4.2V7.2z" />
      <circle {...baseStroke} cx="12" cy="12" r="3.2" />
      <path {...baseStroke} d="M12 8.8V5.7M12 18.3v-3.1M8.8 12H5.7M18.3 12h-3.1M9.6 9.6 7.5 7.5M16.5 16.5l-2.1-2.1" />
    </>
  ),
  cases: (
    <>
      <path {...baseStroke} d="M4 7h16v12H4z" />
      <path {...baseStroke} d="M8 7V5h8v2M8 12h8M8 16h5" />
    </>
  ),
  dispatch: (
    <>
      <path {...baseStroke} d="M4 16V7h11v9" />
      <path {...baseStroke} d="M15 10h3l2 3v3h-5" />
      <circle {...baseStroke} cx="7" cy="18" r="2" />
      <circle {...baseStroke} cx="17" cy="18" r="2" />
    </>
  ),
  external: (
    <>
      <path {...baseStroke} d="M8 8h-3v11h11v-3" />
      <path {...baseStroke} d="M13 5h6v6M19 5 9 15" />
    </>
  ),
  field: (
    <>
      <path {...baseStroke} d="M14.7 5.3a4.2 4.2 0 0 0 4.9 5.4L10.7 19.6a2.3 2.3 0 0 1-3.3-3.3l8.9-8.9a4.2 4.2 0 0 0-1.6-2.1z" />
    </>
  ),
  ops: (
    <>
      <path {...baseStroke} d="M12 3 4.8 7.2v8.6L12 20l7.2-4.2V7.2z" />
      <path {...baseStroke} d="M8 12h8M12 8v8" />
    </>
  ),
  parts: (
    <>
      <path {...baseStroke} d="m12 3 7.5 4.2v8.6L12 20l-7.5-4.2V7.2z" />
      <path {...baseStroke} d="M4.8 7.5 12 11.7l7.2-4.2M12 11.7V20" />
      <path {...baseStroke} d="M8.4 5.2 15.6 9.4" />
    </>
  ),
  requests: (
    <>
      <path {...baseStroke} d="M6 4h12v16H6z" />
      <path {...baseStroke} d="M9 8h6M9 12h6M9 16h3" />
      <path {...baseStroke} d="m15.5 16 1.2 1.2 2.3-2.7" />
    </>
  ),
  route: (
    <>
      <circle {...baseStroke} cx="5" cy="18" r="2" />
      <circle {...baseStroke} cx="19" cy="6" r="2" />
      <circle {...baseStroke} cx="12" cy="12" r="2" />
      <path {...baseStroke} d="M6.7 16.8 10.3 13.2M13.8 10.8l3.5-3.5" />
    </>
  ),
  settings: (
    <>
      <circle {...baseStroke} cx="12" cy="12" r="3" />
      <path {...baseStroke} d="M12 3v3M12 18v3M4.2 7.5l2.6 1.5M17.2 15l2.6 1.5M4.2 16.5 6.8 15M17.2 9l2.6-1.5" />
    </>
  ),
};

export default function Icon({ name, className = "", title }) {
  const classes = ["icon", className].filter(Boolean).join(" ");

  return (
    <svg
      className={classes}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      {ICONS[name] ?? ICONS.parts}
    </svg>
  );
}
