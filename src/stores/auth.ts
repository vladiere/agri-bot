import { defineStore } from 'pinia';

export const useAuthUserStore = defineStore('auth', {
  state: () => ({
    is_auth: false
  }),
  getters: {
    is_authenticated: (state) => state.is_auth,
  },
  actions: {
    set_auth() {
      this.is_auth = true;
    },
    logout() {
      this.is_auth = false;
    }
  },
  persist: true
})
