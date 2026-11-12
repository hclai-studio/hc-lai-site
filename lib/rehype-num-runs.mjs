// Keeps the punctuation inside a number on the Geist Mono digit face.
//
// Running text (.prose-works p, lists, markdown table cells, strong) uses the
// NumDigitsText face from app/globals.css: Geist Mono for 0-9 and %, Georgia
// for everything else, so a comma, period, hyphen or slash in a sentence sits
// next to its words instead of in a monospace cell of its own. A number with
// punctuation inside it (8,300 · 5.3.3 · 55037-2022 · 300/200) is wrapped here
// in <span class="num">, which goes back to the full NumDigitsOnly face, so
// numbers render exactly as they did before.
//
// Only text in p / li / td is touched; headings, table headers and code have
// fonts of their own. Markdown inside a block MDX component (CaseExpandable's
// children) counts too; inline components style their own text and are left
// alone. Text a component receives as props never reaches this plugin: the
// component wraps it itself with withNums (app/components/mdx/withNums.tsx).

const NUMBER = /\d+(?:[.,/-]\d+)+/g;
const BODY = new Set(['p', 'li', 'td']);
const SKIP = new Set(['code', 'pre', 'kbd', 'samp', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'th']);

export default function rehypeNumRuns() {
  return (tree) => {
    visit(tree, false);
  };
}

function visit(node, inBody) {
  if (!node.children) return;
  const children = [];
  for (const child of node.children) {
    if (child.type === 'element') {
      if (!SKIP.has(child.tagName)) visit(child, inBody || BODY.has(child.tagName));
      children.push(child);
    } else if (child.type === 'mdxJsxFlowElement') {
      // A block component: only the markdown paragraphs, lists and tables
      // inside it count, not text it holds directly.
      visit(child, false);
      children.push(child);
    } else if (child.type === 'text' && inBody) {
      children.push(...wrapNumbers(child.value));
    } else {
      children.push(child);
    }
  }
  node.children = children;
}

function wrapNumbers(value) {
  const parts = [];
  let last = 0;
  for (const match of value.matchAll(NUMBER)) {
    if (match.index > last) parts.push({ type: 'text', value: value.slice(last, match.index) });
    parts.push({
      type: 'element',
      tagName: 'span',
      properties: { className: ['num'] },
      children: [{ type: 'text', value: match[0] }],
    });
    last = match.index + match[0].length;
  }
  if (last < value.length) parts.push({ type: 'text', value: value.slice(last) });
  return parts;
}
