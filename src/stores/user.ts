import { defineStore } from 'pinia';

type User = {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as User[],
  }),
  getters: {
    get_user: (state) => state.user,
  },
  actions: {
    set_user(user: User) {
      this.users.push(user);
    },
    check_user(username: string, password: string): bool {
      const index = this.users.findIndex(user => user.username === username && user.password === password);

      return index !== -1 ? true : false;
    }
  },
  persist: true
})
