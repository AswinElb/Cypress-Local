/// <reference types="vite/client" />
declare module '*.svg?component' {
  const component: { render: () => any }
  export default component
}

declare module '*.svg?component-raw' {
  const component: { render: () => any }
  export default component
}

declare module 'html-parsed-element' {}

declare let __DEV__: boolean

declare module 'vue-multiselect' {}

/// <reference types="vite-svg-loader" />
