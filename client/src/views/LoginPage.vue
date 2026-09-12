<template>
  <AuthFormLayout :isRegister="false" @submit="login">
    <template #inputs>
      <FormInput
        id="email"
        label="Email Address"
        type="email"
        placeholder="name@example.com"
        v-model="state.email"
        :error="v$.email.$error ? v$.email.$errors[0].$message : ''"
      />
      <FormInput
        id="password"
        label="Password"
        type="password"
        placeholder="••••••••"
        v-model="state.password"
        :error="v$.password.$error ? v$.password.$errors[0].$message : ''"
      />
    </template>
  </AuthFormLayout>
</template>

<script>
import { reactive, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import AuthFormLayout from "@/components/AuthForm.vue";
import FormInput from "@/components/FormInput.vue";

export default {
  name: "LoginView",
  components: { AuthFormLayout, FormInput },
  setup() {
    const store = useStore();
    const router = useRouter();

    const state = reactive({ email: "", password: "" });
    const rules = computed(() => ({
      email: { required, email },
      password: { required },
    }));
    const v$ = useVuelidate(rules, state);

    const login = async () => {
      try {
        const isFormCorrect = await v$.value.$validate();
        if (!isFormCorrect) return;

        let response = await axios.post(
          "http://localhost:5000/user/login",
          state,
        );

        if (response.status === 200) {
          const token = response.data?.token || response.data;
          localStorage.setItem("user", token);
          await store.dispatch("setToken", token);

          toast.success("Welcome back!", { autoClose: 1000 });
          router.push({ name: "home" });
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Invalid credentials");
      }
    };

    return { state, v$, login };
  },
};
</script>
