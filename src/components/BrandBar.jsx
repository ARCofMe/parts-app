export default function BrandBar({ appName = "PartsDesk" }) {
  return (
    <header className="brand-bar">
      <div>
        <p className="brand-kicker">ARCoM Ops Hub</p>
        <h1>{appName}</h1>
      </div>
      <p className="brand-copy">
        Track parts. Follow orders. Keep things moving.
      </p>
    </header>
  );
}
