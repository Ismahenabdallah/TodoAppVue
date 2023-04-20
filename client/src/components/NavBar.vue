<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="#">Navbar</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item" v-if="isUserLoggIn">
            <router-link class="nav-link active" aria-current="page" to="/"
              >Home</router-link
            >
          </li>
          <li class="nav-item" v-if="!isUserLoggIn">
            <router-link class="nav-link active" aria-current="page" to="/login"
              >Login</router-link
            >
          </li>
          <li class="nav-item" v-if="!isUserLoggIn">
            <router-link
              class="nav-link active"
              aria-current="page"
              to="/register"
              >Register</router-link
            >
          </li>
        </ul>
        <form class="d-flex" v-if="isUserLoggIn">
          <button
            @click="logout"
            class="form-control me-2 btn btn-primary"
            aria-label="Search"
          >
            LogOut
          </button>
        </form>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["isUserLoggIn"]),
  },
  mounted() {
    let user = localStorage.getItem("user");

    if (user) {
      this.isUserLoggInFunction();
    }
  },
  methods: {
    ...mapMutations(["isUserLoggInFunction"]),
    logout() {
      localStorage.removeItem("user");
      this.$store.state.user = null;
      this.$store.state.userToken = null;
    },
  },
};
</script>
<style>
li a:hover {
  color: #5791ff !important;

  transition: all 0.3s ease-in-out;
}
</style>
