
### lazy-loading

// async components are defined as:
// - resolve => resolve(Component)
// or
// - () => Promise<Component>

// For single component, we can simply use dynamic import which returns a Promise.

const Foo = () => import('./Foo.vue')

