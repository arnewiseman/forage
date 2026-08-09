The honest "nothing here" state. Forage leans on this: when no Portland role matches, say so and point somewhere real.

```jsx
<EmptyState icon="map-pinned" title="No open Portland roles match this target yet"
  actions={<Button variant="secondary" as="a" href="#">WorkSource Oregon</Button>}>
  Our dataset has 18 roles from three local employers, pulled this morning. None of them line up with
  Marketing Manager today.
</EmptyState>
```

Never pad an empty state with an upsell. State the fact, then give one next step.
