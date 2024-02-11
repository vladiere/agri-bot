<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import MenuBarComponent from '../components/MenuBarComponent.vue';
  import { useAuthUserStore } from '../stores/auth';

  const router = useRouter();
  const authStore = useAuthUserStore();

  const logout_out = () => {
    authStore.logout();
    router.push({ name: 'login' });
  }
    
</script>

<template>
  <div class="flex flex-col h-screen">
    <div class="w-full flex flex-row justify-between px-5 py-2 border-b-2 border-slate-500">
      <span class="font-bold text-4xl">AGRI BOT</span>
      <div class="flex flex-row gap-4 items-center">
        <router-link to="/">Home</router-link>
        <router-link to="/">History</router-link>
        <button class="bg-transparent" @click="logout_out">Logout</button>
      </div>
    </div>
    <div class="flex flex-row">
      <MenuBarComponent />
      <router-view />
    </div>
  </div>
</template>
