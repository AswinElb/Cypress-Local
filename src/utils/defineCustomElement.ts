import {
  defineCustomElement as VueDefineCustomElement,
  h,
  createApp,
  getCurrentInstance,
} from 'vue'
import type { ComponentInternalInstance } from 'vue'
import type { Plugin } from 'vue'

/**
 *  Define Custom Element Options
 */
interface DefineCustomElementOptions {
  plugins: Plugin | any
  // eslint-disable-next-line @typescript-eslint/ban-types
  onMounted: Function | null | undefined
}

/**
 * Get Nearest Element Parent
 * @param el
 */
const getNearestElementParent = (el: any) => {
  while (el?.nodeType !== 1 /* ELEMENT */) {
    el = el.parentElement
  }
  return el
}

/**
 * Define Custom Element
 * @param name
 * @param component
 * @param plugins
 * @param onMounted
 */
export const defineCustomElement = (
  name: string,
  component: any,
  { plugins, onMounted }: DefineCustomElementOptions
) => {
  let currentInstance: ComponentInternalInstance | null = null

  return VueDefineCustomElement({
    mounted: () => {
      if (typeof onMounted === 'function') {
        onMounted(currentInstance)
      }
    },
    // render: () => h(component),
    props: component.props,
    emits: component.emits,
    methods: component.methods,
    inject: component.inject,
    provides: component.provides,
    setup(props) {
      const app = createApp(component)

      // Pass the element name as global config
      // This can be access anywhere in the application
      app.config.globalProperties.elementName = name

      // install plugins
      plugins.forEach(app.use)

      app.mixin({
        mounted() {
          const insertStyles = (styles: any) => {
            if (styles?.length) {
              this.__style = document.createElement('style')
              this.__style.type = 'text/css'
              this.__style.innerText = styles.join().replace(/\n/g, '')
              getNearestElementParent(this.$el).prepend(this.__style)
            }
          }
          // load own styles
          insertStyles(this.$?.type.styles)
          // load styles of child components
          if (this.$options.components) {
            for (const comp of Object.values(this.$options.components) as any) {
              insertStyles(comp.styles)
            }
          }
        },
        unmounted() {
          this.__style?.remove()
          // TODO: Clear emitters once the web component is unmounted
          // this.emitter.all.clear()
        },
      })

      currentInstance = getCurrentInstance()
      if (currentInstance !== null) {
        Object.assign(currentInstance.appContext, app._context)
        Object.assign(
          currentInstance.appContext.provides,
          app._context.provides
        )
      }

      return () => h(component, props)
    },
  })
}
