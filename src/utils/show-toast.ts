import { useLoggedInUserStore } from '@/store'
import { Toast, Variant } from '@/types/toast'

export const displayToast = (
  body: string,
  variant: Variant,
  title?: string
) => {
  const store = useLoggedInUserStore()

  const newToast: Toast = {
    show: true,
    title: title,
    body: body,
    variant: variant,
  }

  store.updateToast(newToast)
}
