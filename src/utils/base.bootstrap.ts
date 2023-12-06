import { createPinia } from 'pinia'
import { defineCustomElement } from '@/utils/defineCustomElement'
import App from '@/App.ce.vue'

/**
 * Interface Register CE Options
 */
interface RegisterCEOptions {
  // eslint-disable-next-line @typescript-eslint/ban-types
  onMounted?: Function | null | undefined
}

// Initialize Pinia.
const pinia = createPinia()

/**
 * Register Custom Element
 * @param name
 * @param component
 * @param onMounted
 */
export function registerCustomElement(
  name: string,
  { onMounted }: RegisterCEOptions
) {
  // Initialize the App component
  const component = App

  const customElement = defineCustomElement(name, component, {
    plugins: [pinia],
    onMounted,
  })

  customElements.define(name, customElement, {})
}

export function getShadowRoot() {
  const shadowDivs = document.getElementsByTagName('bl-wc-rlp-report')
  return shadowDivs.length ? shadowDivs[0].shadowRoot : null
}
