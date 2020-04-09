### redirect 

//内部跳转，直接走name即可 
routes:[
  // named redirect
  { path: '/named-redirect', redirect: { name: 'baz' }},

  // redirect with params
  { path: '/redirect-with-params/:id', redirect: '/with-params/:id' },

  // redirect with caseSensitive
  { path: '/foobar', component: Foobar, caseSensitive: true },

  // redirect with pathToRegexpOptions
  { path: '/FooBar', component: FooBar, pathToRegexpOptions: { sensitive: true } }
]