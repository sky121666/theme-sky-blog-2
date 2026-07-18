import assert from "node:assert/strict";
import { registerHooks } from "node:module";
import test from "node:test";

const hooks = registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === "alpinejs") {
      return {
        shortCircuit: true,
        url: `data:text/javascript,${encodeURIComponent('export default { Alpine: { marker: "named", data() {} } };')}`,
      };
    }
    return nextResolve(specifier, context);
  },
});

test.after(() => hooks.deregister());

test("Alpine normalization accepts Node's named bridge export", async () => {
  const Alpine = (await import("../src/common/alpine.ts")).default;
  assert.equal(Alpine.marker, "named");
});
