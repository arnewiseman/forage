const { Card, Button, Badge, Tag, SkillMeter, Tooltip, Icon, Callout } = window.ForageDesignSystem_98e604;

function MatchScreen({ text, target, onPick, onBack, onNext }) {
  const D = window.FORAGE_DATA;
  return (
    <Page>
      <SectionHead eyebrow="Step 2 — your match" title="You described an ad-ops account manager.">
        We matched your description to one O*NET occupation, then pulled the occupations closest to it.
      </SectionHead>

      <div style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: 24, alignItems: "start" }}>
        <Card variant="print" padding="md">
          <Badge tone="brand">Closest match</Badge>
          <h3 style={{ font: "var(--weight-bold) 22px/1.2 var(--font-display)", letterSpacing: "-.014em", margin: "10px 0 6px" }}>{D.match.title}</h3>
          <Tooltip content="O*NET Standard Occupational Classification code">
            <span style={{ font: "var(--type-mono)", color: "var(--text-muted)", borderBottom: "1px dashed var(--rain-500)" }}>{D.match.code}</span>
          </Tooltip>
          <p style={{ fontSize: 14, color: "var(--text-body)", lineHeight: 1.55, margin: "12px 0 18px" }}>{D.match.summary}</p>
          <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 10 }}>Top skills O*NET lists</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {D.match.skills.map((s) => <SkillMeter key={s.name} size="sm" label={s.name} value={s.importance} tone="brand" />)}
          </div>
          <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid var(--border-hairline)", fontSize: 13, color: "var(--text-muted)" }}>
            From your words: “{text.length > 84 ? text.slice(0, 84) + "…" : text}”
          </div>
        </Card>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <div style={{ font: "var(--type-subtitle)" }}>Where it transfers</div>
            <div style={{ fontSize: 14, color: "var(--text-muted)" }}>Pick one to see the gap.</div>
          </div>
          {D.related.map((r) => {
            const on = target && target.code === r.code;
            return (
              <Card key={r.code} interactive padding="md" onClick={() => onPick(r)}
                style={on ? { borderColor: "var(--fir-600)", background: "var(--fir-050)", boxShadow: "var(--shadow-2)" } : undefined}>
                <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                  <div style={{ flex: "1 1 auto", minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ font: "var(--type-subtitle)", color: "var(--text-strong)" }}>{r.title}</span>
                      {on ? <Badge tone="positive" icon="check">Target</Badge> : null}
                    </div>
                    <div style={{ font: "var(--type-mono)", color: "var(--text-muted)", margin: "3px 0 8px" }}>{r.code}</div>
                    <div style={{ fontSize: 14, color: "var(--text-body)", lineHeight: 1.5 }}>{r.why}</div>
                  </div>
                  <div style={{ flex: "0 0 168px" }}>
                    <SkillMeter size="sm" label="Overlap" value={r.overlap} tone={r.overlap >= 60 ? "positive" : "caution"} />
                  </div>
                </div>
              </Card>
            );
          })}
          <Callout tone="neutral" icon="info">
            Overlap is computed from shared O*NET skills and work activities. It is a starting point for a conversation, not a score of you.
          </Callout>
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
        <Button variant="secondary" iconStart="arrow-left" onClick={onBack}>Change my description</Button>
        <Button variant="primary" iconEnd="arrow-right" disabled={!target} onClick={onNext}>
          {target ? "See the gap to " + target.title : "Pick a target occupation"}
        </Button>
      </div>
    </Page>
  );
}
Object.assign(window, { MatchScreen });
