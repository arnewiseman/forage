The Forage action button — one `primary` per view, everything else `secondary` or `ghost`.

```jsx
<Button variant="primary" size="lg" iconEnd="arrow-right">Find what transfers</Button>
<Button variant="secondary" iconStart="rotate-ccw">Start over</Button>
```

Variants: `primary` (fir green fill), `secondary` (paper fill, 1.5px ink border, gains a 3px hard offset shadow on hover), `ghost`, `danger` (rose), `link`. Sizes `sm | md | lg`. `block` fills the container. Never stack two primaries side by side.
