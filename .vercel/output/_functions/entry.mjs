import { r as renderers } from './chunks/_@astro-renderers_CWQ4nJnC.mjs';
import { c as createExports } from './chunks/entrypoint_BYkUlsBB.mjs';
import { manifest } from './manifest_BgxR_EuN.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/blog/404.astro.mjs');
const _page2 = () => import('./pages/blog/api/proxy.astro.mjs');
const _page3 = () => import('./pages/blog/open-graph/_---route_.astro.mjs');
const _page4 = () => import('./pages/blog.astro.mjs');
const _page5 = () => import('./pages/blog/_---slug_.astro.mjs');
const _page6 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/blog/404.astro", _page1],
    ["src/pages/blog/api/proxy.ts", _page2],
    ["src/pages/blog/open-graph/[...route].ts", _page3],
    ["src/pages/blog/index.astro", _page4],
    ["src/pages/blog/[...slug].astro", _page5],
    ["src/pages/index.astro", _page6]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "2a1744be-fe46-4c69-ab07-df2b4959565b",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
