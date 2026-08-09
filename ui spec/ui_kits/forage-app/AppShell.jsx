const { Badge, Icon, Button, Stepper } = window.ForageDesignSystem_98e604;

function Wordmark({ size = 22, onClick }) {
  return (
    <span onClick={onClick} style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: size, letterSpacing: "-.03em", color: "var(--fir-700)", cursor: onClick ? "pointer" : "default", lineHeight: 1 }}>
      Forage<span style={{ color: "var(--rose-600)" }}>.</span>
    </span>
  );
}

function AppHeader({ step, onHome }) {
  return (
    <header style={{ background: "var(--paper-000)", borderBottom: "1px solid var(--border-hairline)", position: "sticky", top: 0, zIndex: 20 }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", gap: 16 }}>
        <Wordmark onClick={onHome} />
        <span style={{ width: 1, height: 22, background: "var(--border-hairline)" }} />
        <span style={{ font: "var(--type-mono)", color: "var(--text-muted)" }}>Skills Bridge PDX</span>
        <span style={{ flex: 1 }} />
        <Badge tone="brand" icon="map-pin">Portland metro</Badge>
        <Button variant="link" iconStart="scroll-text">About the data</Button>
      </div>
      {step >= 0 ? (
        <div style={{ borderTop: "1px solid var(--border-hairline)", background: "var(--paper-050)" }}>
          <div style={{ maxWidth: 1080, margin: "0 auto", padding: "12px 24px" }}>
            <Stepper current={step} steps={["Describe", "Match", "Target", "Gap", "Roles"]} />
          </div>
        </div>
      ) : null}
    </header>
  );
}

function AppFooter() {
  return (
    <footer style={{ borderTop: "1px solid var(--border-hairline)", background: "var(--paper-000)", marginTop: 56 }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "28px 24px", display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
        <Wordmark size={17} />
        <span style={{ fontSize: 13, color: "var(--text-muted)" }}>Built for Portlanders between jobs. Free, no account, nothing saved.</span>
        <span style={{ flex: 1 }} />
        <a href="#" style={{ fontSize: 13 }}>WorkSource Oregon</a>
        <a href="#" style={{ fontSize: 13 }}>O*NET</a>
        <a href="#" style={{ fontSize: 13 }}>QualityInfo</a>
      </div>
    </footer>
  );
}

function Page({ children, width = 1080 }) {
  return <main style={{ maxWidth: width, margin: "0 auto", padding: "40px 24px 0" }}>{children}</main>;
}

function SectionHead({ eyebrow, title, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 24 }}>
      {eyebrow ? <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--rose-600)" }}>{eyebrow}</div> : null}
      <h2 style={{ font: "var(--weight-bold) 36px/1.06 var(--font-display)", letterSpacing: "-.024em" }}>{title}</h2>
      {children ? <p style={{ fontSize: 17, color: "var(--text-muted)", maxWidth: "60ch", lineHeight: 1.55 }}>{children}</p> : null}
    </div>
  );
}

Object.assign(window, { Wordmark, AppHeader, AppFooter, Page, SectionHead });
