import { createStore } from 'vuex'
import * as jwtDecodePkg from 'jwt-decode';
import axios from 'axios';

const decodeToken = (token) => {
  const jwt = jwtDecodePkg.jwtDecode || jwtDecodePkg.default || jwtDecodePkg;
  return jwt(token);
};

export default createStore({
  state: {
    userToken: null,
    user: localStorage?.getItem('user') || null,
    isUserLoggIn: !!localStorage?.getItem('user'),
    LoggedUserId: "",
    AllToDo: []
  },
  getters: {},
  mutations: {
    setUser(state, token) {
      if (!token) return;
      let cleanToken = token;
      if (typeof cleanToken === 'string' && cleanToken.startsWith('Bearer ')) {
        cleanToken = cleanToken.split(' ')[1];
      }
      try {
        state.userToken = decodeToken(cleanToken);
        state.user = cleanToken;
        state.isUserLoggIn = true;
        state.LoggedUserId = state.userToken._id;
        localStorage.setItem('user', cleanToken);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    },
    logoutUser(state) {
      state.userToken = null;
      state.user = null;
      state.isUserLoggIn = false;
      state.LoggedUserId = "";
      localStorage.removeItem('user');
    },
    isUserLoggInFunction(state) {
      const token = localStorage.getItem('user');
      if (token) {
        state.isUserLoggIn = true;
        let cleanToken = token;
        if (typeof cleanToken === 'string' && cleanToken.startsWith('Bearer ')) {
          cleanToken = cleanToken.split(' ')[1];
        }
        try {
          let decodedUser = decodeToken(cleanToken);
          state.userToken = decodedUser;
          state.LoggedUserId = decodedUser._id;
        } catch (e) {
          state.isUserLoggIn = false;
          localStorage.removeItem('user');
        }
      } else {
        state.isUserLoggIn = false;
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
    logout({ commit }) {
      commit('logoutUser');
    },
    async getAllTodo({ commit }) {
      try {
        const response = await axios.get('http://localhost:5000/');
        commit('setAllToDo', response.data);
      } catch (error) {
        console.error(error);
      }
    },
  },
  modules: {}
})