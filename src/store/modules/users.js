import axios from "axios";

const state = {
  user: { username: null, password: null, restrictLogs: [] },
};
const getters = {
  getUser: (state) => state.user,
};

const actions = {
  async checkUser({ commit }, userDetails) {
    let userData = await axios.post(
      "http://34.236.75.17/checkUser",
      userDetails
    );
    userData = userData.data;
    if (userData.length == 1) {
      commit("original", userData[0]);
      return true;
    } else {
      return false;
    }
  },
  async createUser({ commit }, newuserDetails) {
    try {
      await axios.post(
        "http://34.236.75.17/createUser",
        // "http://127.0.0.1:5000/createUser",
        newuserDetails
      );
      commit("original", newuserDetails);
      return true;
    } catch (error) {
      // Error
      if (error.response) {
        return false;
      }
    }

  },
  async clearUser({ commit }) {
    let userData = { username: null, password: null, restrictLogs: [] };
    commit("original", userData);
  },
};

const mutations = {
  original: (state, userData) => (state.user = userData),
};

export default {
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations,
};
