An inline notice block. The `disclosure` tone is a Forage-specific pattern: it states plainly which data is live and which is hand-assembled.

```jsx
<Callout tone="disclosure">
  Occupation matching and skill gaps are live O*NET/CareerOneStop calls. Portland listings
  were pulled by hand from three local employers' public job boards — not a live feed.
</Callout>
<Callout tone="caution" title="No local match yet">Here is one place to start instead.</Callout>
```

Every screen that shows sourced data carries a disclosure callout. Never hide it behind a tooltip.
