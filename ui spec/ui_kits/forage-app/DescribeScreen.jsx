const { Card, Button, Textarea, Tag, Callout, Icon, SkillMeter } = window.ForageDesignSystem_98e604;

function DescribeScreen({ text, setText, onSubmit }) {
  const D = window.FORAGE_DATA;
  return (
    <Page width={880}>
      <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 14, alignItems: "center", marginBottom: 32 }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--rose-600)" }}>Portland, Oregon</div>
        <h1 style={{ font: "var(--weight-bold) 56px/1.02 var(--font-display)", letterSpacing: "-.028em", maxWidth: "17ch" }}>Your job already transfers. Here is where.</h1>
        <p style={{ fontSize: 19, color: "var(--text-muted)", maxWidth: "52ch", lineHeight: 1.5 }}>
          Type what you did in plain English. We will name the occupations it maps to, the one gap to close, and the roles open in Portland right now.
        </p>
      </div>

      <Card variant="print" padding="lg">
        <Textarea label="What did you do?" rows={4} maxLength={600} value={text} onChange={(e) => setText(e.target.value)}
          placeholder="I managed ad campaigns and client relationships for 4 years" />
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 18, flexWrap: "wrap" }}>
          <Button variant="primary" size="lg" iconEnd="arrow-right" onClick={onSubmit} disabled={text.trim().length < 8}>Find what transfers</Button>
          <span style={{ fontSize: 13, color: "var(--text-muted)" }}>No account. Nothing is saved.</span>
        </div>
      </Card>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", margin: "20px 0 28px" }}>
        <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--text-muted)" }}>Try one</span>
        {D.examples.map((e) => <Tag key={e} onClick={() => setText(e)}>{e}</Tag>)}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 28 }}>
        {[["search", "Match", "Your words become an O*NET occupation code."],
          ["git-compare-arrows", "Compare", "Adjacent occupations, with the overlap explained."],
          ["map-pinned", "Apply", "Open Portland-area roles that fit the target."]].map(([icon, t, b]) => (
          <Card key={t} padding="md">
            <Icon name={icon} size={22} color="var(--fir-600)" />
            <div style={{ font: "var(--type-subtitle)", marginTop: 10 }}>{t}</div>
            <div style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 4, lineHeight: 1.5 }}>{b}</div>
          </Card>
        ))}
      </div>

      <Callout tone="disclosure">
        Occupation matching and skill gaps are live O*NET / CareerOneStop calls. The Portland job listings are a
        dataset assembled by hand from local employers' public job boards — not a live feed.
      </Callout>
    </Page>
  );
}
Object.assign(window, { DescribeScreen });
