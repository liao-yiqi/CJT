export const useGlobalStore = defineStore('global', {
  state: (): GlobalState => {
    return {
      existLoading: false
    }
  },
  actions: {
    setExistLoading(existLoading: boolean) {
      this.existLoading = existLoading
    }
  }
})
