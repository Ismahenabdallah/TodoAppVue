<template>
  <div>
    <div class="registration-form">
      <form @submit.prevent="login">
        <div class="form-group">
          <input
            type="text"
            class="form-control item"
            id="email"
            placeholder="Email"
            v-model="state.email"
          />
          <p v-if="v$.email.$error" class="btn btn-danger mb-2">
            {{ v$.email.$errors[0].$message }}
          </p>
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control item"
            id="password"
            placeholder="Password"
            v-model="state.password"
          />
          <p v-if="v$.password.$error" class="btn btn-danger mb-2">
            {{ v$.password.$errors[0].$message }}
          </p>
        </div>

        <div class="form-group">
          <button type="submit" class="btn btn-block create-account">
            Login
          </button>
          <p>
            Don't have an account
            <router-link to="/register">Register</router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { reactive, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import axios from "axios";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import router from "@/router";
import { mapMutations } from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "login",
  async mounted() {
    //let user = localStorage.getItem("user");

   
  
      this.isUserLoggInFunction();
    
  },
  setup() {
    const state = reactive({
      email: "",
      password: "",
      error: "",
    });
    const rules = computed(() => {
      return {
        email: { required, email },
        password: {
          required,
        },
      };
    });

    const v$ = useVuelidate(rules, state);
    let login = async () => {
      try {
        const isFormCorrect = await v$.value.$validate();
        if (!isFormCorrect) return;
        // alert("passed");
        let response = await axios.post(
          `http://localhost:5000/user/login`,
          state
        );
        window.location.reload();
        if (response.status == 200) {
          localStorage.setItem("user", JSON.stringify(response.data?.token));
          this.$store.dispatch("user", response.data?.token);

          router.push({ name: "home" });
          window.location.reload();
        }
      } catch (error) {
        /**An error occurred while submitting the form */
        toast.error(error?.response.data?.message);
        console.log(error.response.data?.message);
      }
    };

    return { state, v$, login };
  },
  methods: {
    ...mapMutations(["isUserLoggInFunction"]),
  },
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700;900&display=swap");

.registration-form {
  padding: 50px 0;
  form {
    background-color: #fff;
    max-width: 600px;
    margin: auto;
    padding: 50px 70px;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.075);
  }

  .item {
    border-radius: 20px;
    margin-bottom: 25px;
    padding: 10px 20px;
  }
  .create-account {
    border-radius: 30px;
    padding: 10px 20px;
    font-size: 18px;
    font-weight: bold;
    background-color: #5791ff;
    border: none;
    color: white;
    margin-top: 20px;
  }

  @media (max-width: 576px) {
    .registration-form form {
      padding: 50px 20px;
    }
  }
}
</style>
