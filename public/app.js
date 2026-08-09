// Frontend. OWNER: design system + UI.
//
// No backend: api.js computes everything in the browser off the same lib/
// modules the dev server uses. That's what makes this deployable to a static
// host with no cold start. Shapes are the ones documented in API.md.
//
// Markup follows the design system's fg-* classes (see DESIGN_MAPPING.md).
// Voice rules from `ui spec/readme.md`: sentence case, numbers attached, no
// hype, no emoji.

import { match, gap, findJobs } from './api.js';

const $ = (id) => document.getElementById(id);
const el = { form: $('job-form'), text: $('job-text'), submit: $('submit-btn') };

// The matched occupation, held so the gap can ask "from where?".
let matched = null;

// --- plumbing -------------------------------------------------------------

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

function clear(id) {
  const target = $(id);
  target.replaceChildren();
  return target;
}

// textContent everywhere — never innerHTML with data we didn't author.
function node(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text != null) element.textContent = text;
  return element;
}

/** Advance the header stepper. 0 = Describe, 1 = Match, 2 = Gap, 3 = Roles. */
function setStep(current) {
  $('stepper').querySelectorAll('.fg-stepper__step').forEach((step, i) => {
    step.classList.toggle('fg-stepper__step--current', i === current);
    step.classList.toggle('fg-stepper__step--done', i < current);
    if (i === current) step.setAttribute('aria-current', 'step');
    else step.removeAttribute('aria-current');
  });
}

// --- step 1 -> 2: match ---------------------------------------------------

async function onSubmit(event) {
  event.preventDefault();
  const text = el.text.value.trim();
  if (!text) return showError('Tell us a little about the work you did.');

  hide('error'); hide('step-match'); hide('step-gap'); hide('step-jobs');
  busy(true);

  try {
    matched = await match(text);
    renderMatch(matched);
    setStep(1);
  } catch (err) {
    showError(err.message);
  } finally {
    busy(false);
  }
}

function renderMatch({ occupation, skills, related }) {
  const occ = clear('occupation');
  occ.append(
    node('div', 'fga-occupation__title', occupation.title),
    // O*NET codes are quoted verbatim in monospace — brand rule.
    node('div', 'fga-code', occupation.code),
    node('p', 'fga-occupation__desc', occupation.description)
  );

  // Importance is a real 0-100 O*NET score, so show it as one.
  const skillList = clear('skills');
  for (const skill of skills) {
    const meter = node('div', 'fg-meter fg-meter--sm');
    const top = node('div', 'fg-meter__top');
    top.append(
      node('span', 'fg-meter__label', skill.name),
      node('span', 'fg-meter__value', String(skill.importance))
    );
    const track = node('div', 'fg-meter__track');
    const fill = node('div', 'fg-meter__fill');
    fill.style.width = `${skill.importance}%`;
    track.append(fill);
    meter.append(top, track);
    skillList.append(meter);
  }

  // Card interactive already renders a <button>, so this stays a real control.
  const relatedList = clear('related');
  for (const rel of related) {
    const button = node('button', 'fg-card fg-card--print fg-card--interactive fg-card--pad-sm');
    button.type = 'button';
    button.addEventListener('click', () => onPickTarget(rel));
    button.append(
      node('span', 'fga-related__title', rel.title),
      node('span', 'fga-code', rel.code),
      node('span', 'fga-related__overlap', rel.overlap),
      node('span', 'fga-related__cue', 'See the gap')
    );
    relatedList.append(button);
  }

  show('step-match');
}

// --- steps 3 & 4: gap, then jobs -----------------------------------------

async function onPickTarget(target) {
  hide('error');
  busy(true);
  try {
    // Independent — fire together, the demo clock is 90 seconds.
    const [gapResult, jobsResult] = await Promise.all([
      gap(matched.occupation.code, target.code),
      findJobs(target.code, target.title),
    ]);
    renderGap(gapResult, target);
    renderJobs(jobsResult);
    setStep(3);
    $('step-gap').scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (err) {
    showError(err.message);
  } finally {
    busy(false);
  }
}

// Param is `result`, not `gap` — `gap` is the imported API function.
function renderGap(result, target) {
  $('gap-heading').textContent =
    `From ${matched.occupation.title} to ${target.title}`;

  // Things you already have are just tags — no explanation needed.
  const have = clear('gap-have');
  for (const item of result.have) {
    have.append(node('span', 'fg-tag fg-tag--have', item.name));
  }

  // Things you're missing carry the "why", so they get a row each.
  const missing = clear('gap-missing');
  for (const item of result.missing) {
    const row = node('div', 'fga-gap__row');
    row.append(node('span', 'fg-tag fg-tag--missing', item.name));
    if (item.note) row.append(node('span', 'fga-gap__note', item.note));
    missing.append(row);
  }

  show('step-gap');
}

function renderJobs({ matches, fallback, live, boards }) {
  const list = clear('jobs');
  const fallbackBox = clear('jobs-fallback');

  // Provenance in the UI every time — this is a live feed and we say so.
  $('jobs-provenance').textContent = live
    ? `Fetched live just now from ${boards} Portland employers' public job boards.`
    : 'Boards unreachable — showing our most recent saved pull.';

  if (matches.length) {
    hide('jobs-fallback');
    for (const job of matches) {
      const row = node('li', 'fga-job');
      const link = node('a', 'fga-job__title', job.title);
      link.href = job.url;
      link.target = '_blank';
      link.rel = 'noopener';

      const meta = node(
        'span',
        'fga-job__meta',
        `${job.company} · ${job.location}${job.remote ? ' · remote-eligible' : ''}`
      );

      const wrap = node('div');
      wrap.append(link, meta);
      row.append(wrap);
      list.append(row);
    }
  } else if (fallback) {
    // No dead ends: say it plainly, then give exactly one real next step.
    const empty = node('div', 'fg-empty');
    empty.append(
      node('div', 'fg-empty__title', 'No match in the boards we watch'),
      node('div', 'fg-empty__body', fallback.message)
    );
    fallbackBox.append(empty);

    fallbackBox.append(node('h3', 'fga-subhead', 'Where the metro is growing'));
    const sectors = node('ul', 'fga-list');
    for (const sector of fallback.sectors) {
      const item = node('li', 'fga-sector');
      item.append(
        node('span', 'fga-sector__name', sector.name),
        node('span', 'fga-sector__trend', sector.trend)
      );
      sectors.append(item);
    }

    const resource = node('p', 'fga-resource');
    const link = node('a', null, fallback.resource.name);
    link.href = fallback.resource.url;
    link.target = '_blank';
    link.rel = 'noopener';
    resource.append('Start here: ', link, ` — ${fallback.resource.description}`);

    fallbackBox.append(sectors, resource);
    show('jobs-fallback');
  }

  show('step-jobs');
}

// --- example chips --------------------------------------------------------
// Fill the box rather than submitting, so the demo can show the text landing.

for (const chip of document.querySelectorAll('#examples .fg-tag')) {
  chip.addEventListener('click', () => {
    el.text.value = chip.textContent;
    el.text.focus();
  });
}

el.form.addEventListener('submit', onSubmit);
