export default function BrandBar({ appName = "PartsDesk" }) {
  return (
    <header className="brand-bar">
      <div>
        <p className="brand-kicker">ARCoM Ops Hub</p>
        <h1>{appName}</h1>
      </div>
      <p className="brand-copy">
        Track requests, push receipts through, and keep dispatch from waiting on hidden parts state.
      </p>
    </header>
  );
}
