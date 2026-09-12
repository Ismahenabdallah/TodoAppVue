<template>
  <div class="auth-master-wrapper">
    <!-- Left Hero/Branding Side -->
    <div class="auth-hero-section">
      <div class="hero-content">
        <div class="logo-badge">
          <i class="uil uil-layers-alt"></i>
          <span>TaskFlow Enterprise</span>
        </div>
        <h1>Manage your workflow with absolute precision.</h1>
        <p>
          Streamline your daily tasks, track progress in real-time, and boost
          your engineering productivity.
        </p>

        <div class="hero-features">
          <div class="feature-item">
            <i class="uil uil-check-circle"></i> Real-time synchronization
          </div>
          <div class="feature-item">
            <i class="uil uil-check-circle"></i> Secure JWT Authentication
          </div>
          <div class="feature-item">
            <i class="uil uil-check-circle"></i> Clean Architecture principles
          </div>
        </div>
      </div>
      <div class="glow-orb orb-1"></div>
      <div class="glow-orb orb-2"></div>
    </div>

    <!-- Right Form Container Side -->
    <div class="auth-form-section">
      <div class="auth-card-modern">
        <div class="form-header">
          <h2>{{ isRegister ? "Create an account" : "Welcome back" }}</h2>
          <p>
            {{
              isRegister
                ? "Enter your details to register your workspace."
                : "Please enter your details to sign in."
            }}
          </p>
        </div>

        <form @submit.prevent="onSubmit" novalidate>
          <slot name="inputs"></slot>

          <button type="submit" class="btn-submit-pro" :disabled="loading">
            <span v-if="loading" class="spinner"></span>
            <span v-else>{{
              isRegister ? "Create Account" : "Sign In to Workspace"
            }}</span>
          </button>

          <div class="form-switch-footer">
            <p>
              {{
                isRegister
                  ? "Already have an account?"
                  : "Don't have an account?"
              }}
              <router-link :to="{ name: isRegister ? 'login' : 'register' }">
                {{ isRegister ? "Sign In" : "Register now" }}
              </router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthFormLayout",
  props: {
    isRegister: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
  },
  emits: ["submit"],
  methods: {
    onSubmit() {
      this.$emit("submit");
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap");

$primary: #6366f1;
$text-main: #1e293b;
$text-muted: #64748b;

.auth-master-wrapper {
  display: flex;
  min-height: 100vh;
  width: 100%;
  font-family: "Plus Jakarta Sans", sans-serif;
  background-color: #f8fafc;

  @media (max-width: 968px) {
    flex-direction: column;
  }
}

.auth-hero-section {
  flex: 1;
  background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 4rem;
  color: #ffffff;

  @media (max-width: 968px) {
    display: none;
  }

  .hero-content {
    position: relative;
    z-index: 2;
    max-width: 480px;

    .logo-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.12);
      padding: 0.5rem 1rem;
      border-radius: 2rem;
      font-size: 0.85rem;
      font-weight: 600;
      margin-bottom: 2rem;
      backdrop-filter: blur(10px);
      color: #818cf8;

      i {
        font-size: 1.1rem;
      }
    }

    h1 {
      font-size: 2.75rem;
      font-weight: 800;
      line-height: 1.2;
      letter-spacing: -0.03em;
      margin-bottom: 1.25rem;
      background: linear-gradient(to right, #ffffff, #94a3b8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    p {
      color: #94a3b8;
      font-size: 1.05rem;
      line-height: 1.6;
      margin-bottom: 2.5rem;
    }

    .hero-features {
      display: flex;
      flex-direction: column;
      gap: 0.875rem;

      .feature-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-size: 0.95rem;
        color: #cbd5e1;
        font-weight: 500;

        i {
          color: #34d399;
          font-size: 1.2rem;
        }
      }
    }
  }

  .glow-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    z-index: 1;
  }
  .orb-1 {
    width: 300px;
    height: 300px;
    background: rgba(99, 102, 241, 0.25);
    top: -50px;
    left: -50px;
  }
  .orb-2 {
    width: 350px;
    height: 350px;
    background: rgba(14, 165, 233, 0.15);
    bottom: -100px;
    right: -50px;
  }
}

.auth-form-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  background-color: #ffffff;

  @media (max-width: 968px) {
    background-color: #f8fafc;
  }
}

.auth-card-modern {
  width: 100%;
  max-width: 440px;

  .form-header {
    margin-bottom: 2.25rem;

    h2 {
      font-size: 1.85rem;
      font-weight: 700;
      color: $text-main;
      letter-spacing: -0.025em;
    }

    p {
      color: $text-muted;
      font-size: 0.9rem;
      margin-top: 0.5rem;
    }
  }
}

.btn-submit-pro {
  width: 100%;
  padding: 0.95rem;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  border: none;
  border-radius: 0.85rem;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  box-shadow: 0 10px 20px -5px rgba(99, 102, 241, 0.4);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  margin-top: 0.75rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 24px -5px rgba(99, 102, 241, 0.5);
    background: linear-gradient(135deg, #4f46e5 0%, #4338ca 100%);
  }
}

.form-switch-footer {
  text-align: center;
  margin-top: 2rem;
  font-size: 0.9rem;
  color: $text-muted;

  a {
    color: $primary;
    font-weight: 600;
    text-decoration: none;
    margin-left: 0.25rem;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
