<template>
  <div class="flex-d">
    <NavBar></NavBar>

    <router-view :messageprops="message" />
    <!--  user acces to any components (any page ) see page homeView ((((props:['messageprops']))))  -->
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/NavBar";

export default {
  name: "App",
  components: {
    NavBar,
  },

  data() {
    return {
      message: "hello everyOne",
    };
  },

  mounted() {
    if (localStorage.getItem("user")) {
      this.$store.dispatch("setToken", localStorage.getItem("user"));
      console.log(this.$store.state?.user);
      console.log(this.$store.state.userToken);
    }
  },

  /**** vbase */
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #5791ff;
 // width: auto;
  //overflow-x: hidden;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #5791ff;
    }
  }
}
</style>
