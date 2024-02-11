<template>
  <div class="h-full w-full flex items-center justify-center">
    <div class="w-[50%] flex flex-col gap-5">
      <div class="flex flex-col gap-2 items-center justify-center">
        <span class="text-4xl font-medium uppercase text-[#00C22B] capitalize">SIGNUP AN ACCOUNT</span>
      </div>
      <span v-if="errorsMap.error" class="text-red-600 text-8md font-medium text-center">{{ errorsMap.message }}</span>
      <div class="w-full flex flex-row gap-10">
        <div class="w-full flex flex-col gap-2">
          <label for="firstname" class="text-[#00C22B]">Firstname</label>
          <input id="firstname" type="text" class="bg-transparent outline-none px-1 py-1.5 border-0 border-b-2 border-slate-950 placeholder-gray-500 focus:border-slate-400" placeholder="e.g. john" v-model="form.firstname"/>
        </div>
        <div class="w-full flex flex-col gap-2">
          <label for="lastname" class="text-[#00C22B]">Lastname</label>
          <input id="lastname" type="text" class="bg-transparent outline-none px-1 py-1.5 border-0 border-b-2 border-slate-950 placeholder-gray-500 focus:border-slate-400" placeholder="e.g. doe" v-model="form.lastname"/>
        </div>
      </div>
      <div class="w-full flex flex-row gap-10">
        <div class="w-full flex flex-col gap-2">
          <label for="email_address" class="text-[#00C22B]">Email Address</label>
          <input id="email_address" type="email" class="bg-transparent outline-none px-1 py-1.5 border-0 border-b-2 border-slate-950 placeholder-gray-500 focus:border-slate-400" placeholder="e.g. john@email.com" v-model="form.email_address"/>
        </div>
        <div class="w-full flex flex-col gap-2">
          <label for="preferred_username" class="text-[#00C22B]">Preferred Username</label>
          <input id="preferred_username" type="text" class="bg-transparent outline-none px-1 py-1.5 border-0 border-b-2 border-slate-950 placeholder-gray-500 focus:border-slate-400" placeholder="e.g. john123" v-model="form.username"/>
        </div>
      </div>
      <div class="w-full flex flex-row gap-10">
        <div class="w-full flex flex-col gap-2">
          <label for="password" class="text-[#00C22B]">Password</label>
          <input id="password" type="password" class="bg-transparent outline-none px-1 py-1.5 border-0 border-b-2 border-slate-950 placeholder-gray-500 focus:border-slate-400" placeholder="**********" v-model="form.password"/>
        </div>
        <div class="w-full flex flex-col gap-2">
          <label for="confirm_password" class="text-[#00C22B]">Confirm password</label>
          <input id="confirm_password" type="password" class="bg-transparent outline-none px-1 py-1.5 border-0 border-b-2 border-slate-950 placeholder-gray-500 focus:border-slate-400" placeholder="***********" v-model="confirm_password"/>
        </div>
      </div>
      <div class="font-medium lowercase flex flex-col text-slate-400">
        <span>a minimum of 20 characters in length</span>
        <span>a minimum of 1 special character: ~`!@#$%^&*()-_+={}[]|\;:"<>,./?</span>
      </div>
      <div class="flex flex-col items-center justify-center gap-3">
        <button class="py-1 px-5 text-center text-[18px] bg-[#00C22B] text-slate-900 rounded-md hover:bg-[#00F536]" @click="create_account">Signup</button>
        <div class="flex flex-row gap-2">
          <span class="font-medium text-4md">Already have an account?</span>
          <router-link to="/login" class="text-[#00C22B] hover:italic hover:underline">Signin Now.</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useUserStore } from '../stores/user';
  import { useRouter } from 'vue-router';

  const userStore = useUserStore();
  const router = useRouter()

  const errorsMap = ref({
    error: false,
    message: '',
  });

  const form = ref({
    firstname: '',
    lastname: '',
    email_address: '',
    username: '',
    password: '',
  });
  const confirm_password = ref('');

  const create_account = () => {
    if (form.value.firstname !== '' && form.value.lastname !== '' && form.value.email_address !== '' && form.value.username !== '' && form.value.password !== '') {
      if (form.value.password === confirm_password.value) {
        userStore.set_user(form.value);
        router.push({ name: 'login' });
      } else {
        errorsMap.error = true;
        errorsMap.message = 'Password does not match'
      }
    } else {
      return;
    }
  }
</script>
