Transient confirmation, bottom-right, dark fir surface. One action link at most.

```jsx
<ToastStack>
  <Toast tone="positive" title="Saved to your list" actionLabel="Undo" onAction={undo} onClose={dismiss} />
</ToastStack>
```

Toasts are for confirmations, not errors that need a decision — use `Callout` inline or `Dialog` for those.
