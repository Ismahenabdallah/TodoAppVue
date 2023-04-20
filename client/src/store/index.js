

import { createStore } from 'vuex'
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import router from '@/router';

export default createStore({


  state: {
    userToken: null,
    user: localStorage?.getItem('user'),
    isUserLoggIn: "",
    LoggedUserId: "",
    AllToDo: []
  },
  getters: {},
  mutations: {
    setUser(state, token) {
      state.userToken = jwtDecode(token);
    },
    isUserLoggInFunction(state) {
      if (state.user) {
        state.isUserLoggIn = true
        let user = jwtDecode(state.user);
        state.LoggedUserId = user._id
        console.log("LoggedUserId", state.LoggedUserId)
        router.push({ name: "home" })

      } else {
        state.isUserLoggIn = false
        router.push({ name: "login" })
      }
    },
    setAllToDo(state, AllToDo) {
      state.AllToDo = AllToDo;
    },
  },
  actions: {



    setToken({ commit }, token) {
      commit('setUser', token);
    },
    async getAllTodo({ commit }) {
      try {
        const response = await axios.get('http://localhost:5000/');
        const todos = response.data;
        commit('setAllToDo', todos);
      } catch (error) {
        console.error(error);

      }
    },

  },
  modules: {
  }
})
