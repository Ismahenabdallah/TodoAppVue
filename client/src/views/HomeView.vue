<template>
  <div class="home">
    <div class="wrapper">
      <li class="add-box">
        <div class="icon"><i class="uil uil-plus"></i></div>
        <p>Add new note</p>
      </li>
      <ul v-for="item in todos" :key="item._id">
        <li class="note">
          <div class="details" v-if="item.postedBy === UserId">
            <p>{{ item.text }}</p>
            <img :src="item.photo" alt="" width="40" />
          </div>
        </li>
      </ul>
    </div>
  </div>

  <!-- props -->
  <!-- {{ messageprops }} -->
</template>

<script>
// @ is an alias to /src
// import { reactive, onMounted } from "vue";
import { mapMutations, mapState } from "vuex";
// import axios from "axios";
//import router from "@/router";
export default {
  name: "HomeView",
  props: ["messageprops"],

  data() {
    return {
      username: "",
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.userToken,
      todos: (state) => state.AllToDo,
      UserId: (state) => state.LoggedUserId,
    }),
  },
  methods: {
    ...mapMutations(["isUserLoggInFunction"]),
    // ...mapActions(["getAllTodo"]),
    async getAllTodoS() {
      try {
        await this.$store.dispatch("getAllTodo");
        console.log(this.$store.state.AllToDo);
      } catch (error) {
        alert(error.message);
      }
    },

    getUsername() {
      const parts = this.user.email.split("@");
      if (parts.length === 2 && parts[1] === "gmail.com") {
        this.username = parts[0];
      } else {
        this.username = "";
      }
    },
  },
  async mounted() {
    let user = localStorage.getItem("user");
    this.isUserLoggInFunction();
    if (user) {
      this.getAllTodoS();
      this.getUsername();
    }
  },
  // created() {
  //   this.getAllTodoS();
  // },
  // setup() {
  //   // const obj = reactive({
  //   //   name: " hello every one ",
  //   // });
  //   const state = reactive({
  //     todo: {},
  //   });
  //   /**
  //    * you can use  toRefs FROM vue
  //    * return {...toRefs(test)}
  //    * w heka tnajem f template tdaher {name } min 8ir m ta3mil {obj.name}
  //    */

  //   function GetAll() {
  //     axios
  //       .get("http://localhost:5000/")
  //       .then((res) => {
  //         state.todo = res.data;
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   }
  //   // return{obj}
  //   onMounted(() => {
  //     GetAll();
  //   });
  //   return { state, GetAll };
  // },
};
</script>
<style lang="scss" scoped>
/* Import Google Font - Poppins */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

::selection {
  color: #fff;
  background: #618cf8;
}
.wrapper {
  margin: 50px;
  display: grid;
  gap: 25px;
  grid-template-columns: repeat(auto-fill, 265px);
}
.wrapper li {
  height: 250px;
  list-style: none;
  border-radius: 5px;
  padding: 15px 20px 20px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}
.add-box,
.icon {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.add-box {
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
}
.add-box .icon {
  height: 78px;
  width: 78px;
  color: #88abff;
  font-size: 40px;
  border-radius: 50%;
  justify-content: center;
  border: 2px dashed #88abff;
}
.add-box p {
  color: #88abff;
  font-weight: 500;
  margin-top: 20px;
}
.note {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.note .details {
  max-height: 165px;
  overflow-y: auto;
}
.note .details::-webkit-scrollbar,
.popup textarea::-webkit-scrollbar {
  width: 0;
}
.note .details:hover::-webkit-scrollbar,
.note .details:hover::-webkit-scrollbar-track,
.note .details:hover::-webkit-scrollbar-thumb {
  background: #e6e6e6;
  border-radius: 25px;
}
.note p {
  font-size: 22px;
  font-weight: 500;
}
.note span {
  display: block;
  color: #575757;
  font-size: 16px;
  margin-top: 5px;
}
.note {
  padding-top: 10px;
  border-top: 1px solid #ccc;
}

// form :where(input, textarea):focus {
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.11);
// }

@media (max-width: 660px) {
  .wrapper {
    margin: 15px;
    gap: 15px;
    grid-template-columns: repeat(auto-fill, 100%);
  }
}
</style>
