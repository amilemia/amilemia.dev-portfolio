import { createRequire } from 'node:module';
import type { Environment } from 'vitest';
import { builtinEnvironments } from 'vitest/environments';

const require = createRequire(import.meta.url);
const vm = require('node:vm') as { constants?: { DONT_CONTEXTIFY?: unknown } };

const constants = vm.constants ?? {};
if (!('DONT_CONTEXTIFY' in constants)) {
  Object.defineProperty(constants, 'DONT_CONTEXTIFY', {
    value: Object.create(null),
    configurable: true,
    enumerable: true,
    writable: true,
  });
}

if (!vm.constants) {
  Object.defineProperty(vm, 'constants', {
    value: constants,
    configurable: true,
    enumerable: true,
    writable: true,
  });
}

const jsdomEnvironment = builtinEnvironments.jsdom;

export default {
  name: 'patched-jsdom',
  transformMode: 'web',
  async setup(global, options) {
    return jsdomEnvironment.setup(global, options);
  },
} satisfies Environment;
