import AlpineImport from "alpinejs";

type AlpineModuleShape = typeof AlpineImport & {
  Alpine?: typeof AlpineImport;
  default?: typeof AlpineImport;
};

const alpineModule = AlpineImport as AlpineModuleShape;

// Vite exposes Alpine as the default export, while Node's ESM/CJS bridge used
// by DOM regression tests exposes it under `Alpine`. Normalize both without
// changing the browser bundle contract.
const Alpine =
  typeof alpineModule.data === "function"
    ? alpineModule
    : (alpineModule.Alpine ?? alpineModule.default ?? alpineModule);

export default Alpine;
