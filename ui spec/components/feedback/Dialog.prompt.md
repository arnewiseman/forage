Modal for a decision that must be made before continuing — Forage uses it for full job detail and for "start over?".

```jsx
<Dialog open={open} title="Start over?" description="Your current match will be cleared."
  onClose={close}
  footer={<><Button variant="secondary" onClick={close}>Keep going</Button><Button variant="danger">Start over</Button></>}>
  You will lose the occupation match and target you picked.
</Dialog>
```

Bordered in ink with a heavy drop shadow. Do not nest dialogs.
