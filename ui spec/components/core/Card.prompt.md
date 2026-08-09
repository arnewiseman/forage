The default content surface — warm off-white on a paper page, hairline border, 8px radius.

```jsx
<Card>Occupation summary</Card>
<Card variant="print" padding="lg">The one thing you want people to look at</Card>
<Card interactive onClick={pick}>Marketing Manager — 68% overlap</Card>
```

Use `print` for at most one card per screen; `raised` for floating panels; `inverse` for fir-green feature blocks. Nested cards should drop to `sunken`.
