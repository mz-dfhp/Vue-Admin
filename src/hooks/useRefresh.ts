import { useRoute, useRouter } from 'vue-router'

export function useRefresh() {
  const router = useRouter()
  const route = useRoute()
  const refresh = () => {
    router.push({
      path: `/redirect${route.fullPath}`,
      query: route.query,
    })
  }
  return { refresh }
}
