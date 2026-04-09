import { getWorkspaceLinkStatus } from "../workspaceLinks";

export default function BrandBar({ appName = "PartsApp", workspaceLinks = {}, currentApp = "partsApp" }) {
  const workspaces = getWorkspaceLinkStatus(workspaceLinks, currentApp);

  return (
    <header className="brand-bar">
      <div className="brand-bar-top">
        <div>
          <p className="brand-kicker">OpsHub ecosystem</p>
          <h1 className="brand-wordmark">
            <span className="brand-wordmark-primary">Parts</span>
            <span className="brand-wordmark-accent">{appName.replace(/^Parts/, "") || "App"}</span>
          </h1>
        </div>
        <div className="brand-context">
          <span className="status-pill">OpsHub brain</span>
          <span className="queue-chip">Inventory control</span>
        </div>
      </div>
      <p className="brand-copy">
        Right part. Right time. Track requests, push receipts through, and keep dispatch from waiting on hidden parts state.
      </p>
      <div className="brand-link-row">
        {workspaces.map(({ appKey, label, href, current }) =>
          current ? (
            <span key={appKey} className="queue-chip">
              {label}
            </span>
          ) : href ? (
            <a key={appKey} className="button-link secondary-button" href={href} target="_blank" rel="noreferrer">
              Open {label}
            </a>
          ) : null,
        )}
      </div>
    </header>
  );
}
