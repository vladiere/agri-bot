<template>
  <div class="h-full w-full flex items-center justify-center" id="login">
    <div class="w-[25%] flex flex-col gap-5">
      <div class="flex flex-col gap-2 items-center justify-center">
        <span class="text-4xl font-medium uppercase text-[#00C22B]">sign in</span>
      </div>
      <span v-if="errorsMap.error" class="text-red-600 text-8md font-medium text-center">{{ errorsMap.message }}</span>
      <div class="w-full flex flex-col gap-5">
        <input type="text" class="bg-transparent outline-none px-3 py-1.5 border-0 border-b-2 border-slate-950 placeholder-gray-500 focus:border-slate-400" placeholder="Username" v-model="form.username"/>
        <input type="password" class="bg-transparent outline-none px-3 py-1.5 border-0 border-b-2 border-slate-950 placeholder-gray-500 focus:border-slate-400" placeholder="Password" v-model="form.password"/>
        <div class="flex flex-row items-center justify-end gap-2">
          <router-link to="/forgot-password" class="font-medium text-4md hover:italic hover:underline text-[#00C22B] cursor-pointer">Forgot Password?</router-link>
        </div>
        <button type="button" class="py-1 px-10 hover:bg-[#00F536] text-center text-2xl bg-[#00C22B] text-slate-900 rounded-md self-start" @click="login_user">Login</button>
      </div>
      <div class="flex flex-row items-center justify-start gap-3">
        <span class="text-4md font-medium">Don't have an account?</span>
        <router-link to="/register" class="underline text-[#00C22B] hover:italic">Create an account</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useUserStore } from '../stores/user';
  import { useAuthUserStore } from '../stores/auth';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const userStore = useUserStore();
  const authUser = useAuthUserStore();

  const form = ref({
    username: '',
    password: '',
  });

  const errorsMap = ref({
    error: false,
    message: '',
  });

  const login_user = () => {
    if (form.value.username !== '' && form.value.password !== '') {
      const found_user = userStore.check_user(form.value.username, form.value.password);
      if (found_user) {
        authUser.set_auth();
        router.push({ name: 'home' });
      } else {
        errorsMap.error = true;
        errorsMap.message = 'Username or password incorrect';
      }
    } else {
      return;
    }
  }
</script>
