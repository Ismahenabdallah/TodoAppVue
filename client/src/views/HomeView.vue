<template>
  <div class="dashboard-layout">
    <!-- Top Nav / Welcome Banner -->
    <header class="dashboard-header">
      <div class="welcome-block">
        <h1>Dashboard Workspace</h1>
        <p v-if="username">
          Welcome back, <span class="user-highlight">{{ username }}</span> ✨
        </p>
      </div>
      <!-- <div class="actions-block">
        <button class="btn-create" @click="openCreateModal">
          <i class="uil uil-plus"></i> New Note
        </button>
      </div> -->
    </header>

    <!-- Content Grid -->
    <main class="dashboard-content">
      <div class="notes-grid">
        <!-- Empty Action Card Shortcut -->
        <div class="grid-card add-action-card" @click="openCreateModal">
          <div class="icon-box">
            <i class="uil uil-file-plus-alt"></i>
          </div>
          <span>Create a new note</span>
        </div>

        <!-- Dynamic Note Cards with Random Pastel Colors -->
        <template v-for="(item, index) in todos" :key="item._id">
          <div
            class="grid-card note-item-card"
            v-if="item.postedBy === UserId"
            :class="getRandomPastelClass(index)"
          >
            <div class="note-top-header">
              <span class="badge-category">{{
                item.category || getRandomCategory(index)
              }}</span>
              <div class="card-actions">
                <!-- ✏️ Edit Button -->
                <button
                  class="icon-btn edit"
                  @click="openEditModal(item)"
                  title="Edit Note"
                >
                  <i class="uil uil-edit"></i>
                </button>
                <!-- 🗑️ Delete Button -->
                <button
                  class="icon-btn delete"
                  @click="deleteTodo(item._id)"
                  title="Delete Note"
                >
                  <i class="uil uil-trash-alt"></i>
                </button>
              </div>
            </div>

            <div class="card-body">
              <h5 class="note-title">{{ item.title || "Note Workspace" }}</h5>
              <p class="note-content">{{ item.text || item.description }}</p>
            </div>
          </div>
        </template>
      </div>
    </main>

    <!-- Modal mtaç Create / Update Note (Popup) -->
    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal-card">
        <h3>{{ isEditing ? "Update Note" : "Create a New Note" }}</h3>
        <textarea
          v-model="newNoteText"
          placeholder="Write your note here..."
          rows="4"
          class="modal-textarea"
        ></textarea>
        <div class="modal-actions">
          <button class="btn-cancel" @click="closeModal">Cancel</button>
          <button
            class="btn-save"
            @click="isEditing ? updateTodo() : createTodo()"
          >
            {{ isEditing ? "Save Changes" : "Save Note" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations, mapState } from "vuex";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: "HomeView",
  data() {
    return {
      username: "",
      isModalOpen: false,
      isEditing: false,
      currentEditId: null,
      newNoteText: "",
    };
  },
  computed: {
    ...mapState({
      token: (state) => state.user,
      user: (state) => state.userToken,
      todos: (state) => state.AllToDo,
      UserId: (state) => state.LoggedUserId,
    }),
  },
  methods: {
    ...mapMutations(["isUserLoggInFunction"]),

    // 🎨 Assigns rotating pastel background and badge style based on index
    getRandomPastelClass(index) {
      const pastelClasses = [
        "pastel-purple",
        "pastel-blue",
        "pastel-green",
        "pastel-yellow",
        "pastel-pink",
        "pastel-orange",
      ];
      return pastelClasses[index % pastelClasses.length];
    },

    getRandomCategory(index) {
      const categories = [
        "PORTFOLIO & PROJECTS",
        "BRANDING & SOCIAL",
        "DATA & ANALYTICS",
        "BACKEND ROADMAP",
        "LANGUAGE",
        "CAREER & ROUTINE",
      ];
      return categories[index % categories.length];
    },

    async fetchTodos() {
      try {
        await this.$store.dispatch("getAllTodo");
      } catch (error) {
        toast.error(error.message);
      }
    },

    openCreateModal() {
      this.isEditing = false;
      this.currentEditId = null;
      this.newNoteText = "";
      this.isModalOpen = true;
    },

    openEditModal(item) {
      this.isEditing = true;
      this.currentEditId = item._id;
      this.newNoteText = item.text || item.description || "";
      this.isModalOpen = true;
    },

    closeModal() {
      this.isModalOpen = false;
      this.isEditing = false;
      this.currentEditId = null;
      this.newNoteText = "";
    },

    async createTodo() {
      if (!this.newNoteText.trim()) {
        toast.warning("Note text cannot be empty");
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:5000/new",
          {
            title: "Task Note",
            text: this.newNoteText,
            description: this.newNoteText,
          },
          {
            headers: {
              authorization: `Bearer ${this.token}`,
            },
          },
        );

        if (response.status === 200 || response.status === 201) {
          toast.success("Note created successfully!");
          this.closeModal();
          this.fetchTodos();
        }
      } catch (error) {
        toast.error(error.response?.data?.msg || "Failed to create note");
      }
    },

    async updateTodo() {
      if (!this.newNoteText.trim()) {
        toast.warning("Note text cannot be empty");
        return;
      }

      try {
        const response = await axios.put(
          `http://localhost:5000/update/${this.currentEditId}`,
          {
            text: this.newNoteText,
            description: this.newNoteText,
          },
          {
            headers: {
              authorization: `Bearer ${this.token}`,
            },
          },
        );

        if (response.status === 200) {
          toast.success("Note updated successfully!");
          this.closeModal();
          this.fetchTodos();
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to update note");
      }
    },

    async deleteTodo(id) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/delete/${id}`,
          {
            headers: {
              authorization: `Bearer ${this.token}`,
            },
          },
        );
        if (response.status === 200) {
          toast.success("Note deleted successfully");
          this.fetchTodos();
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Operation failed");
      }
    },

    resolveUsername() {
      if (!this.user?.email) return;
      const [namePart] = this.user.email.split("@");
      this.username = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    },
  },
  async mounted() {
    this.isUserLoggInFunction();
    if (localStorage.getItem("user")) {
      this.fetchTodos();
      this.resolveUsername();
    }
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap");

.dashboard-layout {
  min-height: 100vh;
  background-color: #f8fafc;
  padding: 2.5rem 5%;
  font-family: "Plus Jakarta Sans", sans-serif;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
  gap: 1rem;

  .welcome-block {
    h1 {
      font-size: 1.75rem;
      font-weight: 700;
      color: #0f172a;
      letter-spacing: -0.025em;
    }
    p {
      color: #64748b;
      font-size: 0.95rem;
      margin-top: 0.25rem;
      .user-highlight {
        color: #6366f1;
        font-weight: 600;
      }
    }
  }

  .btn-create {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background-color: #6366f1;
    color: white;
    border: none;
    padding: 0.75rem 1.25rem;
    border-radius: 0.75rem;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
    transition: all 0.2s ease;

    &:hover {
      background-color: #4f46e5;
      transform: translateY(-1px);
    }
  }
}

.notes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.grid-card {
  border-radius: 1.25rem;
  padding: 1.5rem;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 4px 20px -4px rgba(0, 0, 0, 0.03);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.06);
  }
}

/* Pastel Color Themes Matching the Screenshot */
.pastel-purple {
  background-color: #f3e8ff;
  border-color: #e9d5ff;
  .badge-category {
    background: #e0e7ff;
    color: #4338ca;
  }
}

.pastel-blue {
  background-color: #e0f2fe;
  border-color: #bae6fd;
  .badge-category {
    background: #bae6fd;
    color: #0369a1;
  }
}

.pastel-green {
  background-color: #dcfce7;
  border-color: #bbf7d0;
  .badge-category {
    background: #bbf7d0;
    color: #15803d;
  }
}

.pastel-yellow {
  background-color: #fef9c3;
  border-color: #fef08a;
  .badge-category {
    background: #fef08a;
    color: #a16207;
  }
}

.pastel-pink {
  background-color: #fce7f3;
  border-color: #fbcfe8;
  .badge-category {
    background: #fbcfe8;
    color: #be185d;
  }
}

.pastel-orange {
  background-color: #ffedd5;
  border-color: #fed7aa;
  .badge-category {
    background: #fed7aa;
    color: #c2410c;
  }
}

.add-action-card {
  border: 2px dashed #cbd5e1;
  background: transparent;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 220px;

  &:hover {
    border-color: #6366f1;
    background: rgba(99, 102, 241, 0.02);

    .icon-box {
      background: #6366f1;
      color: #ffffff;
    }
    span {
      color: #6366f1;
    }
  }

  .icon-box {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #eef2ff;
    color: #6366f1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    transition: all 0.2s ease;
  }

  span {
    font-weight: 600;
    font-size: 0.875rem;
    color: #475569;
    transition: color 0.2s ease;
  }
}

.note-item-card {
  .note-top-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.25rem;

    .badge-category {
      font-size: 0.7rem;
      font-weight: 700;
      padding: 0.3rem 0.75rem;
      border-radius: 50px;
      text-transform: uppercase;
      letter-spacing: 0.025em;
    }

    .card-actions {
      display: flex;
      gap: 0.4rem;

      .icon-btn {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: none;
        background: rgba(255, 255, 255, 0.7);
        color: #475569;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s;

        &.edit:hover {
          background: #ffffff;
          color: #4f46e5;
        }

        &.delete:hover {
          background: #ffffff;
          color: #ef4444;
        }
      }
    }
  }

  .card-body {
    flex-grow: 1;
    text-align: left;

    .note-title {
      font-weight: 700;
      color: #1e293b;
      font-size: 1.15rem;
      margin-bottom: 0.5rem;
    }

    .note-content {
      font-size: 0.9rem;
      color: #334155;
      line-height: 1.6;
      word-break: break-word;
    }
  }
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .modal-card {
    background: #ffffff;
    padding: 2rem;
    border-radius: 1rem;
    width: 100%;
    max-width: 450px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);

    h3 {
      margin-bottom: 1rem;
      font-size: 1.25rem;
      color: #0f172a;
    }

    .modal-textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #cbd5e1;
      border-radius: 0.5rem;
      font-family: inherit;
      resize: none;
      margin-bottom: 1.5rem;

      &:focus {
        outline: none;
        border-color: #6366f1;
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
      }
    }

    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;

      button {
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        font-weight: 600;
        cursor: pointer;
        border: none;
      }

      .btn-cancel {
        background: #f1f5f9;
        color: #475569;

        &:hover {
          background: #e2e8f0;
        }
      }

      .btn-save {
        background: #6366f1;
        color: #ffffff;

        &:hover {
          background: #4f46e5;
        }
      }
    }
  }
}
</style>
