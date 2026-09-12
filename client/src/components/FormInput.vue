<template>
  <div class="pro-input-group">
    <label :for="id">{{ label }}</label>
    <div class="input-container">
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', $event.target.value)"
        class="pro-input-field"
      />
    </div>
    <span v-if="error" class="error-hint">{{ error }}</span>
  </div>
</template>

<script>
export default {
  name: "FormInput",
  props: {
    id: { type: String, required: true },
    label: { type: String, required: true },
    type: { type: String, default: "text" },
    modelValue: { type: String, default: "" },
    placeholder: { type: String, default: "" },
    error: { type: String, default: "" },
  },
  emits: ["update:modelValue"],
};
</script>

<style lang="scss" scoped>
$border-color: #cbd5e1;
$primary: #6366f1;
$error: #ef4444;

.pro-input-group {
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  label {
    font-size: 0.85rem;
    font-weight: 600;
    color: #334155;
    margin-bottom: 0.4rem;
  }

  .input-container {
    width: 100%;

    .pro-input-field {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 1.5px solid $border-color;
      border-radius: 0.75rem;
      font-size: 0.95rem;
      color: #0f172a;
      background-color: #f8fafc;
      transition: all 0.2s ease;

      &:focus {
        outline: none;
        border-color: $primary;
        background-color: #ffffff;
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
      }

      &::placeholder {
        color: #94a3b8;
      }
    }
  }

  .error-hint {
    color: $error;
    font-size: 0.75rem;
    font-weight: 500;
    margin-top: 0.3rem;
  }
}
</style>
