export default function BrandBar({ appName = "Parts Cannon" }) {
  return (
    <header className="brand-bar">
      <div>
        <p className="brand-kicker">ARCoM Ops Hub</p>
        <h1>{appName}</h1>
      </div>
      <p className="brand-copy">
        Claim the request. Track the part. Hand it back clean.
      </p>
    </header>
  );
}
