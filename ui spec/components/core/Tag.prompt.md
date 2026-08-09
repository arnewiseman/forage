A pill for a skill, filter, or any selectable value. Becomes a button when `onClick` is passed.

```jsx
<Tag tone="have" icon="check">Client relationship management</Tag>
<Tag tone="missing" icon="plus">SQL</Tag>
<Tag onClick={pick} selected={isPicked}>Remote only</Tag>
```

Skill-gap convention: `have` for skills that transfer, `missing` for the gap. Pass `onRemove` for a dismissible filter chip.
