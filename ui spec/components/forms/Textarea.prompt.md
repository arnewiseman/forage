Multi-line text entry — Forage's primary input is one of these ("describe your job in plain English").

```jsx
<Textarea label="What did you do?" rows={5} maxLength={600} value={text} onChange={e => setText(e.target.value)}
  placeholder="I managed ad campaigns and client relationships for 4 years" />
```

Pass `maxLength` with a controlled `value` to get the monospaced character counter.
