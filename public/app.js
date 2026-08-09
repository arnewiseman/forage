// Frontend. OWNER: Engineer B.
// Talks only to our own backend, only in the shapes in API.md.
// Run `MOCK=1 node server.js` and this is fully exercisable with no credentials.

const $ = (id) => document.getElementById(id);
const el = { form: $('job-form'), text: $('job-text'), submit: $('submit-btn') };

// The matched occupation, held so /api/gap can ask "from where?".
let matched = null;

// --- plumbing -------------------------------------------------------------

async function api(path, options) {
  const res = await fetch(path, options);
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error || `Request failed (${res.status})`);
  return body;
}

function show(id) { $(id).classList.remove('hidden'); }
function hide(id) { $(id).classList.add('hidden'); }

function busy(on) {
  el.submit.disabled = on;
  on ? show('loading') : hide('loading');
}

function showError(message) {
  $('error').textContent = message;
  show('error');
}

// textContent everywhere — never innerHTML with API strings.
function li(parent, build) {
  const node = document.createElement('li');
  build(node);
  parent.appendChild(node);
  return node;
}

function clear(id) {
  const node = $(id);
  node.replaceChildren();
  return node;
}

// --- step 2: match --------------------------------------------------------

async function onSubmit(event) {
  event.preventDefault();
  const text = el.text.value.trim();
  if (!text) return showError('Tell us a little about the work you did.');

  hide('error'); hide('step-match'); hide('step-gap'); hide('step-jobs');
  busy(true);

  try {
    matched = await api('/api/match', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    renderMatch(matched);
  } catch (err) {
    showError(err.message);
  } finally {
    busy(false);
  }
}

function renderMatch({ occupation, skills, related }) {
  const occ = clear('occupation');
  const title = document.createElement('h3');
  title.textContent = occupation.title;
  const desc = document.createElement('p');
  desc.textContent = occupation.description;
  occ.append(title, desc);

  const skillList = clear('skills');
  for (const skill of skills) {
    li(skillList, (node) => {
      const name = document.createElement('strong');
      name.textContent = skill.name;
      node.append(name);
      if (skill.description) {
        const d = document.createElement('span');
        d.textContent = ` — ${skill.description}`;
        node.append(d);
      }
    });
  }

  const relatedList = clear('related');
  for (const rel of related) {
    li(relatedList, (node) => {
      const button = document.createElement('button');
      button.className = 'related-btn';
      button.type = 'button';
      button.addEventListener('click', () => onPickTarget(rel));

      const name = document.createElement('span');
      name.className = 'related-title';
      name.textContent = rel.title;
      const why = document.createElement('span');
      why.className = 'related-overlap';
      why.textContent = rel.overlap;

      button.append(name, why);
      node.append(button);
    });
  }

  show('step-match');
}

// --- steps 3 & 4: gap, then jobs -----------------------------------------

async function onPickTarget(target) {
  hide('error');
  busy(true);
  try {
    // Independent calls — fire together, the demo clock is 90 seconds.
    const [gap, jobs] = await Promise.all([
      api(`/api/gap?from=${encodeURIComponent(matched.occupation.code)}&to=${encodeURIComponent(target.code)}`),
      api(`/api/jobs?code=${encodeURIComponent(target.code)}&title=${encodeURIComponent(target.title)}`),
    ]);
    renderGap(gap, target);
    renderJobs(jobs);
    $('step-gap').scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (err) {
    showError(err.message);
  } finally {
    busy(false);
  }
}

function renderGap(gap, target) {
  $('gap-heading').textContent = `From ${matched.occupation.title} to ${target.title}`;

  for (const [id, items] of [['gap-have', gap.have], ['gap-missing', gap.missing]]) {
    const list = clear(id);
    for (const item of items) {
      li(list, (node) => {
        const name = document.createElement('strong');
        name.textContent = item.name;
        node.append(name);
        if (item.note) {
          const note = document.createElement('span');
          note.className = 'note';
          note.textContent = ` ${item.note}`;
          node.append(note);
        }
      });
    }
  }
  show('step-gap');
}

function renderJobs({ matches, fallback, live, boards }) {
  const list = clear('jobs');
  const fallbackBox = clear('jobs-fallback');

  // Provenance, in the UI, every time — this is a live feed and we say so.
  const provenance = $('jobs-provenance');
  provenance.textContent = live
    ? `Fetched live just now from ${boards} public employer job boards (Greenhouse + Lever).`
    : 'Boards unreachable — showing our most recent saved pull.';

  if (matches.length) {
    hide('jobs-fallback');
    for (const job of matches) {
      li(list, (node) => {
        const link = document.createElement('a');
        link.href = job.url;
        link.target = '_blank';
        link.rel = 'noopener';
        link.textContent = job.title;

        const meta = document.createElement('span');
        meta.className = 'job-meta';
        meta.textContent = `${job.company} · ${job.location}${job.remote ? ' · remote-eligible' : ''}`;

        node.append(link, meta);
      });
    }
  } else if (fallback) {
    // No dead ends: say it plainly, then point somewhere real.
    const message = document.createElement('p');
    message.textContent = fallback.message;
    fallbackBox.append(message);

    const sectors = document.createElement('ul');
    for (const sector of fallback.sectors) {
      li(sectors, (node) => {
        const name = document.createElement('strong');
        name.textContent = sector.name;
        const trend = document.createElement('span');
        trend.textContent = ` — ${sector.trend}`;
        node.append(name, trend);
      });
    }

    const resource = document.createElement('p');
    const link = document.createElement('a');
    link.href = fallback.resource.url;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = fallback.resource.name;
    resource.append('Start here: ', link, ` — ${fallback.resource.description}`);

    fallbackBox.append(sectors, resource);
    show('jobs-fallback');
  }

  show('step-jobs');
}

el.form.addEventListener('submit', onSubmit);
