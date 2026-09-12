<template>
  <nav class="navbar navbar-expand-lg custom-navbar sticky-top">
    <div class="container-fluid px-5">
      <!-- Brand Logo -->
      <router-link class="navbar-brand d-flex align-items-center gap-2" to="/">
        <div class="brand-icon-box">
          <i class="uil uil-check-circle"></i>
        </div>
        <span class="brand-text">Todo<span class="highlight">App</span></span>
      </router-link>

      <!-- Mobile Toggle Button -->
      <button
        class="navbar-toggler custom-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="uil uil-bars"></i>
      </button>

      <!-- Navbar Links -->
      <div
        class="collapse navbar-collapse justify-content-end"
        id="navbarSupportedContent"
      >
        <ul
          class="navbar-nav align-items-center gap-2 mb-2 mb-lg-0 mt-3 mt-lg-0"
        >
          <template v-if="isUserLoggIn">
            <li class="nav-item">
              <router-link class="nav-link custom-link" to="/">
                <i class="uil uil-estate"></i> Home
              </router-link>
            </li>

            <li class="nav-item ms-lg-2">
              <button @click="logout" class="btn btn-logout">
                <i class="uil uil-signout"></i> LogOut
              </button>
            </li>
          </template>

          <template v-else>
            <li class="nav-item">
              <router-link class="nav-link custom-link" to="/login">
                Login
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="btn btn-register" to="/register">
                Register
              </router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "NavBar",
  computed: {
    ...mapState(["isUserLoggIn"]),
  },
  mounted() {
    if (localStorage.getItem("user")) {
      this.isUserLoggInFunction();
    }
  },
  methods: {
    ...mapMutations(["isUserLoggInFunction"]),
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push({ name: "login" });
      });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap");

/* Navbar Container Styling - Match HomeView background & border */
.custom-navbar {
  background-color: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  font-family: "Plus Jakarta Sans", sans-serif;
  padding: 0.75rem 0;
}

/* Brand Styling */
.navbar-brand {
  font-weight: 700;
  font-size: 1.35rem;
  color: #0f172a !important;
  text-decoration: none;

  .brand-icon-box {
    width: 38px;
    height: 38px;
    background: #6366f1;
    color: white;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    box-shadow: 0 4px 10px rgba(99, 102, 241, 0.2);
  }

  .brand-text {
    letter-spacing: -0.03em;
    color: #0f172a;
    .highlight {
      color: #6366f1;
    }
  }
}

/* Custom Toggler for Mobile */
.custom-toggler {
  border: 1px solid #cbd5e1;
  background: #ffffff;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  color: #475569;
  font-size: 1.1rem;

  &:focus {
    box-shadow: none;
    border-color: #6366f1;
  }
}

/* Nav Links */
.custom-link {
  color: #475569 !important;
  font-weight: 600;
  font-size: 0.95rem;
  padding: 0.5rem 1rem !important;
  border-radius: 8px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.4rem;

  &:hover,
  &.router-link-exact-active {
    color: #6366f1 !important;
    background: rgba(99, 102, 241, 0.05);
  }
}

/* Logout Button */
.btn-logout {
  background: #f1f5f9;
  color: #475569;
  border: none;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0.5rem 1.25rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.2s ease;

  &:hover {
    background: #fee2e2;
    color: #ef4444;
  }
}

/* Register Button */
.btn-register {
  background: #6366f1;
  color: white !important;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0.5rem 1.25rem;
  border-radius: 0.75rem;
  border: none;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
  transition: all 0.2s ease;

  &:hover {
    background: #4f46e5;
    transform: translateY(-1px);
  }
}

/* Responsive adjustments */
@media (max-width: 991px) {
  .navbar-collapse {
    background: white;
    padding: 1.25rem;
    border-radius: 1rem;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
    margin-top: 1rem;
    border: 1px solid #e2e8f0;
  }

  .container-fluid {
    padding-left: 1.5rem !important;
    padding-right: 1.5rem !important;
  }
}
</style>
