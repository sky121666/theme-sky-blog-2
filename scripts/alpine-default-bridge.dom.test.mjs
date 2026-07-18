import assert from "node:assert/strict";
import { registerHooks } from "node:module";
import test from "node:test";

const hooks = registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === "alpinejs") {
      return {
        shortCircuit: true,
        url: `data:text/javascript,${encodeURIComponent(
          'export default { default: { marker: "default", data() {} } };',
        )}`,
      };
    }
    return nextResolve(specifier, context);
  },
});

test.after(() => hooks.deregister());

test("Alpine normalization accepts a nested default bridge export", async () => {
  const Alpine = (await import("../src/common/alpine.ts")).default;
  assert.equal(Alpine.marker, "default");
});
