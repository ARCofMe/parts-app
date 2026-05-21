import Icon from "./Icon";

const TABS = [
  ["board", "Board", "board"],
  ["cases", "Cases", "cases"],
  ["requests", "Requests", "requests"],
  ["settings", "Settings", "settings"],
];

export default function TabNav({ activeTab, onSelect, badges = {} }) {
  return (
    <nav className="tab-nav" aria-label="Parts views">
      {TABS.map(([key, label, icon]) => (
        <button
          key={key}
          type="button"
          className={activeTab === key ? "tab-button active" : "tab-button"}
          aria-current={activeTab === key ? "page" : undefined}
          onClick={() => onSelect(key)}
        >
          <Icon name={icon} className="tab-icon" />
          {label}
          {badges[key] ? <span className="tab-badge">{badges[key]}</span> : null}
        </button>
      ))}
    </nav>
  );
}
