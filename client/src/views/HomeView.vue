<template>
  <div class="home">
    <div class="wrapper">
      <li class="add-box">
        <div class="icon"><i class="uil uil-plus"></i></div>
        <p>Add new note</p>
      </li>
    </div>
    <div class="gridnote">
      <div v-for="item in todos" :key="item._id">
        <li class="note" v-if="item.postedBy === UserId">
          <div class="details">
            <p>{{ item.text }}</p>
            <img :src="item.photo" alt="" width="100" />
          </div>
          <div class="buttom">
            <button class="btn btn-success">
              <i class="uil uil-pen"></i>
            </button>
            <button class="btn btn-danger" @click="deleteTodo(item._id)">
              <i class="uil uil-trash"></i>
            </button>
          </div>
        </li>
      </div>
    </div>
  </div>

  <!-- props -->
  <!-- {{ messageprops }} -->
</template>

<script>
import axios from "axios";
// @ is an alias to /src
// import { reactive, onMounted } from "vue";
import { mapMutations, mapState } from "vuex";
// import axios from "axios";
//import router from "@/router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
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
      token: (state) => state.user,
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

    async deleteTodo(id) {
      try {
        let response = await axios.delete(
          `http://localhost:5000/delete/${id}`,
          {
            headers: {
              authorization: JSON.parse(this.token),
            },
          }
        );
        //alert("delete");
        if (response.status == 200) {
          toast.success(response.data);
          window.location.reload();
        }
      } catch (error) {
        console.log(error.message);
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
    console.log(this.token);
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

.wrapper {
  margin: 50px;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, 20%);
}
.wrapper li {
  height: 250px;

  list-style: none;
  border-radius: 5px;
  padding: 15px 20px 20px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}
.gridnote {
  display: flex;
  flex-wrap: wrap;
  margin: 30px;


  li {
    height: 40vh;
    width: 40vh;

    margin: 30px;
    list-style: none;
    border-radius: 5px;
    padding: 15px 20px 20px;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  }
  // grid-column-gap: 20px;
  // grid-row-gap: 20px;
  // justify-items: stretch;
  // align-items: stretch;
 




  .note {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  .note .details {
    max-height: 165px;
    overflow: hidden;

    margin-top: 5%;
  }
  .note .details::-webkit-scrollbar,
  .note .details:hover::-webkit-scrollbar,
  .note .details:hover::-webkit-scrollbar-track,
  .note .details:hover::-webkit-scrollbar-thumb {
    background: #e6e6e6;
    border-radius: 25px;
  }

  .note {
    padding-top: 10px;
    border-top: 1px solid #ccc;
    p {
      font-size: 22px;
      font-weight: 200;
    }
  }
  .buttom {
    button {
      padding: 5px;
      margin: 5px;
    }
  }
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
  color: #5791ff;
  font-size: 40px;
  border-radius: 50%;
  justify-content: center;
  border: 2px dashed #5791ff;
}
.add-box p {
  color: #5791ff;
  font-weight: 500;
  margin-top: 20px;
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
