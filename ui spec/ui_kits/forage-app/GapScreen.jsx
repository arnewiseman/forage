const { Card, Button, Badge, Tag, SkillMeter, Callout, Icon, Tabs } = window.ForageDesignSystem_98e604;

function GapScreen({ target, onBack, onNext }) {
  const D = window.FORAGE_DATA;
  const [tab, setTab] = React.useState("gap");
  const total = D.gap.have.length + D.gap.missing.length;
  const shown = tab === "have" ? D.gap.have : tab === "gap" ? D.gap.missing : D.gap.have.concat(D.gap.missing);
  return (
    <Page>
      <SectionHead eyebrow="Step 4 — the gap" title={"Ad ops \u2192 " + target.title}>
        CareerOneStop compares the two occupations. Four of seven core skills are already yours.
      </SectionHead>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24, alignItems: "start" }}>
        <Card padding="md">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, marginBottom: 18 }}>
            <Tabs variant="pill" value={tab} onChange={setTab} items={[{ id: "gap", label: "The gap" }, { id: "have", label: "What transfers" }, { id: "all", label: "All skills" }]} />
            <span style={{ font: "var(--type-mono)", color: "var(--text-muted)" }}>{shown.length} of {total}</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {shown.map((s) => {
              const have = D.gap.have.indexOf(s) > -1;
              return <Tag key={s} tone={have ? "have" : "missing"} icon={have ? "check" : "plus"}>{s}</Tag>;
            })}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 26, paddingTop: 20, borderTop: "1px solid var(--border-hairline)" }}>
            <SkillMeter label="Skills you already have" value={D.gap.have.length} max={total} valueLabel={D.gap.have.length + " of " + total} tone="positive" size="lg" />
            <SkillMeter label="Gap to close" value={D.gap.missing.length} max={total} valueLabel={D.gap.missing.length + " of " + total} tone="caution" />
          </div>
        </Card>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Card variant="inverse" padding="md">
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--fir-300)" }}>Start here</div>
            <div style={{ font: "var(--weight-bold) 22px/1.2 var(--font-display)", color: "var(--paper-000)", letterSpacing: "-.014em", margin: "8px 0 8px" }}>SQL and data querying</div>
            <p style={{ fontSize: 14, lineHeight: 1.55, color: "var(--fir-200)" }}>
              It shows up in every posting for this role and it is the shortest course on the list — PCC runs an 8-week evening section.
            </p>
            <div style={{ marginTop: 16 }}><Button variant="secondary" iconEnd="arrow-up-right" as="a" href="#">PCC Career Pathways</Button></div>
          </Card>
          {D.resources.slice(0, 2).map((r) => (
            <Card key={r.name} padding="sm">
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <Icon name="life-buoy" size={18} color="var(--hood-700)" style={{ marginTop: 2 }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text-strong)" }}>{r.name}</div>
                  <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.45, marginTop: 2 }}>{r.what}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
        <Button variant="secondary" iconStart="arrow-left" onClick={onBack}>Pick a different target</Button>
        <Button variant="primary" iconEnd="arrow-right" onClick={onNext}>See open Portland roles</Button>
      </div>
    </Page>
  );
}
Object.assign(window, { GapScreen });
