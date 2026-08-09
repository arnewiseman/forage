Single-choice control. Wrap a set in `RadioGroup` so they share a legend and spacing.

```jsx
<RadioGroup legend="Pick one target occupation">
  <Radio name="target" label="Marketing Manager" description="68% skill overlap" defaultChecked />
  <Radio name="target" label="Customer Success Manager" description="61% skill overlap" />
</RadioGroup>
```

Checked state is drawn with a thick 6px fir ring, not an inner dot element.
