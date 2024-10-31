
export function create<
  K extends keyof HTMLElementTagNameMap,
  Attrs extends HTMLElementTagNameMap[K]
>(name: K, attrs: Partial<Attrs> = {}, ...children: (string | Node)[]) {
  const el = document.createElement(name);

  el.append(...children);

  return Object.assign(el, attrs);
}
