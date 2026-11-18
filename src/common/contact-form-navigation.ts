export function findReusedContactFormLoader(currentHead: HTMLHeadElement, nextHead: HTMLHeadElement, origin: string) {
  // ContactForm's embed script appends its loader and observes newly inserted forms.
  const ownerSelector = 'script[src="/contact-form/embed.js"]';
  const loaderPath = "/plugins/PluginContactForm/assets/static/contact-form-loader.iife.js";
  const loaderSelector = `script[defer][src*="${loaderPath}?build="]`;
  const loader = currentHead.querySelector<HTMLScriptElement>(loaderSelector);
  if (!loader) return undefined;

  const source = new URL(loader.src);
  if (
    source.origin === origin &&
    source.pathname === loaderPath &&
    currentHead.querySelector(ownerSelector) &&
    nextHead.querySelector(ownerSelector) &&
    !nextHead.querySelector(loaderSelector)
  ) {
    return loader;
  }
  return undefined;
}
