Quantifies overlap or importance in one line — Forage's only chart primitive.

```jsx
<SkillMeter label="Skill overlap with Marketing Manager" value={68} tone="positive" />
<SkillMeter label="Gap to close" value={3} max={7} valueLabel="3 of 7 skills" tone="caution" size="sm" />
```

Always label the bar; a bare bar with no number is not usable. Use `positive` for what transfers, `caution` for the gap.
