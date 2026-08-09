// Isomorphic JSON loader — the one thing standing between this codebase and
// running unchanged in a browser.
//
// Firebase Hosting's free tier is static only, and every data source this app
// needs works from a browser: the job boards all send
// `Access-Control-Allow-Origin: *`, and O*NET is a local file. So rather than
// duplicate lib/ into a client bundle and let the two drift, the modules stay
// single-source and only their file access is abstracted here.
//
// Callers pass a URL built with `new URL('../data/x.json', import.meta.url)`,
// which resolves correctly in both worlds:
//   Node    file:///repo/lib/… -> file:///repo/data/x.json
//   Browser https://host/lib/… -> https://host/data/x.json

export async function loadJson(url) {
  const target = new URL(url);

  // Node can't fetch() a file: URL, and a browser will never produce one.
  // The dynamic import is only evaluated on this branch, so bundlers and
  // browsers never have to resolve node:fs.
  if (target.protocol === 'file:') {
    const { readFile } = await import('node:fs/promises');
    return JSON.parse(await readFile(target, 'utf8'));
  }

  const res = await fetch(target);
  if (!res.ok) throw new Error(`${res.status} loading ${target.pathname}`);
  return res.json();
}
