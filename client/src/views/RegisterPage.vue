<template>
  <AuthFormLayout :isRegister="true" @submit="register">
    <template #inputs>
      <!-- Email Input -->
      <FormInput
        id="email"
        label="Email Address"
        type="email"
        placeholder="name@example.com"
        v-model="state.email"
        :error="v$.email.$error ? v$.email.$errors[0].$message : ''"
      />
      <!-- Password Input -->
      <FormInput
        id="password"
        label="Password"
        type="password"
        placeholder="••••••••"
        v-model="state.password"
        :error="v$.password.$error ? v$.password.$errors[0].$message : ''"
      />
      <!-- Confirm Password Input -->
      <FormInput
        id="confirmpassword"
        label="Confirm Password"
        type="password"
        placeholder="••••••••"
        v-model="state.confirm"
        :error="v$.confirm.$error ? v$.confirm.$errors[0].$message : ''"
      />
    </template>
  </AuthFormLayout>
</template>

<script>
import { reactive, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useRouter } from "vue-router";

import AuthFormLayout from "@/components/AuthForm.vue";
import FormInput from "@/components/FormInput.vue";

export default {
  name: "RegisterView",
  components: {
    AuthFormLayout,
    FormInput,
  },
  setup() {
    const router = useRouter();

    const state = reactive({
      email: "",
      password: "",
      confirm: "",
    });

    const rules = computed(() => ({
      email: { required, email },
      password: { required },
      confirm: { required, sameAs: sameAs(state.password) },
    }));

    const v$ = useVuelidate(rules, state);

    const register = async () => {
      try {
        const isFormCorrect = await v$.value.$validate();
        if (!isFormCorrect) return;

        let response = await axios.post(
          "http://localhost:5000/user/register",
          state,
        );

        if (response.status === 200) {
          toast.success(
            response.data.message || "Account created successfully",
            { autoClose: 1000 },
          );
          router.push({ name: "login" });
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Registration failed");
      }
    };

    return { state, v$, register };
  },
  mounted() {
    const user = localStorage.getItem("user");
    if (user) {
      this.$router.push({ name: "home" });
    }
  },
};
</script>
