Renders a single Lucide glyph as a CSS mask so it always paints in `currentColor` — use it anywhere Forage needs an icon.

```jsx
<Icon name="map-pin" size={18} />
<Icon name="sprout" size={24} color="var(--moss-700)" title="Growth sector" />
```

Notes: names are Lucide kebab-case. Icons are decorative (aria-hidden) unless you pass `title`. Default stroke weight is Lucide's 2px at 24px — do not mix in other icon sets.
