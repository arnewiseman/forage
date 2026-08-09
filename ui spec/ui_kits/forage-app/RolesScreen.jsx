const { Card, Button, IconButton, Badge, Tag, SkillMeter, Callout, Icon, Tabs, Select, Switch, Input, EmptyState, Dialog } = window.ForageDesignSystem_98e604;

function JobRow({ job, onOpen, onSave, saved }) {
  return (
    <Card padding="md">
      <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
        <div style={{ flex: "1 1 auto", minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span style={{ font: "var(--type-subtitle)", color: "var(--text-strong)" }}>{job.role}</span>
            <Badge tone={job.mode === "Remote" ? "info" : job.mode === "Hybrid" ? "brand" : "neutral"}>{job.mode}</Badge>
            {job.type !== "Full-time" ? <Badge tone="caution">{job.type}</Badge> : null}
          </div>
          <div style={{ fontSize: 14, color: "var(--text-body)", marginTop: 4 }}>{job.org} · {job.place}</div>
          <div style={{ display: "flex", gap: 16, marginTop: 10, font: "var(--type-mono)", color: "var(--text-muted)" }}>
            <span>{job.pay}</span><span>{job.posted}</span><span>via {job.board}</span>
          </div>
        </div>
        <div style={{ flex: "0 0 150px", display: "flex", flexDirection: "column", gap: 10 }}>
          <SkillMeter size="sm" label="Fit" value={job.match} tone={job.match >= 70 ? "positive" : "caution"} />
          <div style={{ display: "flex", gap: 8 }}>
            <Button size="sm" variant="secondary" onClick={() => onOpen(job)}>View</Button>
            <IconButton size="sm" variant="ghost" icon={saved ? "bookmark-check" : "bookmark"} label="Save this role" onClick={() => onSave(job)} />
          </div>
        </div>
      </div>
    </Card>
  );
}

function RolesScreen({ target, onBack, onSave, savedIds }) {
  const D = window.FORAGE_DATA;
  const [tab, setTab] = React.useState("roles");
  const [q, setQ] = React.useState("");
  const [remote, setRemote] = React.useState(false);
  const [sort, setSort] = React.useState("Best fit");
  const [open, setOpen] = React.useState(null);

  let jobs = D.jobs.filter((j) => (!remote || j.mode !== "On-site") && (q === "" || (j.role + j.org).toLowerCase().indexOf(q.toLowerCase()) > -1));
  if (sort === "Newest posting") jobs = jobs.slice().reverse();

  return (
    <Page>
      <SectionHead eyebrow="Step 5 — open roles" title={"Portland roles for " + target.title}>
        Six roles in our dataset line up with this target. Fit is the overlap between the posting and the skills you already have.
      </SectionHead>

      <Tabs value={tab} onChange={setTab} items={[{ id: "roles", label: "Open roles", count: D.jobs.length }, { id: "sectors", label: "Growth sectors", icon: "sprout" }]} />

      {tab === "roles" ? (
        <div style={{ marginTop: 20 }}>
          <div style={{ display: "flex", gap: 16, alignItems: "flex-end", marginBottom: 18, flexWrap: "wrap" }}>
            <Input className="grow" style={{ minWidth: 280 }} label="Search" iconStart="search" placeholder="Role or employer" value={q} onChange={(e) => setQ(e.target.value)} />
            <Select label="Sort by" value={sort} onChange={(e) => setSort(e.target.value)} options={["Best fit", "Newest posting"]} />
            <div style={{ paddingBottom: 10 }}><Switch label="Not on-site only" checked={remote} onChange={(e) => setRemote(e.target.checked)} /></div>
          </div>

          {jobs.length ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {jobs.map((j) => <JobRow key={j.id} job={j} onOpen={setOpen} onSave={onSave} saved={savedIds.indexOf(j.id) > -1} />)}
            </div>
          ) : (
            <EmptyState icon="map-pinned" title="No open Portland roles match those filters"
              actions={<Button variant="secondary" onClick={() => { setQ(""); setRemote(false); }}>Clear filters</Button>}>
              Our dataset has {D.jobs.length} roles from local employers, pulled this morning. None of them match right now — that is the dataset being honest, not a bug.
            </EmptyState>
          )}

          <div style={{ marginTop: 20 }}>
            <Callout tone="disclosure">
              These listings are a hand-assembled dataset from local employers' public job boards, captured 8 Aug 2026. Always confirm on the employer's own site before applying.
            </Callout>
          </div>
        </div>
      ) : (
        <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
          {D.sectors.map((s) => (
            <Card key={s.name} padding="md">
              <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
                <div style={{ flex: "1 1 auto" }}>
                  <div style={{ font: "var(--type-subtitle)", color: "var(--text-strong)" }}>{s.name}</div>
                  <div style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 3 }}>{s.note}</div>
                </div>
                <div style={{ flex: "0 0 90px", textAlign: "right" }}>
                  <div style={{ font: "var(--type-mono)", fontSize: 20, color: s.growth >= 7 ? "var(--moss-700)" : "var(--text-body)" }}>+{s.growth}%</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>10-yr growth</div>
                </div>
                <div style={{ flex: "0 0 90px", textAlign: "right" }}>
                  <div style={{ font: "var(--type-mono)", fontSize: 20, color: "var(--text-strong)" }}>{s.openings}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>annual openings</div>
                </div>
              </div>
            </Card>
          ))}
          <Callout tone="disclosure">Portland metro sector figures transcribed by hand from QualityInfo.org (Oregon Employment Department).</Callout>
        </div>
      )}

      <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
        <Button variant="secondary" iconStart="arrow-left" onClick={onBack}>Back to the gap</Button>
      </div>

      <Dialog open={!!open} title={open ? open.role : ""} description={open ? open.org + " · " + open.place : ""} onClose={() => setOpen(null)}
        footer={<><Button variant="secondary" onClick={() => setOpen(null)}>Close</Button><Button variant="primary" iconEnd="arrow-up-right" as="a" href="#">Apply on {open ? open.board : ""}</Button></>}>
        {open ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Badge tone="brand">{open.mode}</Badge><Badge tone="neutral">{open.type}</Badge><Badge tone="info">{open.pay}</Badge><Badge tone="neutral">{open.posted}</Badge>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.6 }}>{open.desc}</p>
            <SkillMeter label="Fit with your transferable skills" value={open.match} tone={open.match >= 70 ? "positive" : "caution"} />
            <div>
              <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 8 }}>Against this posting</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {D.gap.have.map((s) => <Tag key={s} tone="have" icon="check">{s}</Tag>)}
                {D.gap.missing.slice(0, 2).map((s) => <Tag key={s} tone="missing" icon="plus">{s}</Tag>)}
              </div>
            </div>
          </div>
        ) : null}
      </Dialog>
    </Page>
  );
}
Object.assign(window, { RolesScreen, JobRow });
