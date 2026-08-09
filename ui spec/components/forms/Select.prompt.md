Native single-select with a Lucide chevron and Forage field chrome.

```jsx
<Select label="Sort by" options={["Best overlap", "Newest", "Closest to me"]} />
<Select label="Sector" placeholder="All sectors" options={[{value:"health",label:"Health care"}]} />
```

Native `<select>` on purpose — no custom popover. Use `Tag` rows for multi-select filtering instead.
