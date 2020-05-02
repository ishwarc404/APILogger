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
    let userData = await axios.post(
      "http://34.236.75.17/checkUser",
      newuserDetails
    );
    userData = userData.data;
    if (userData.length == 0) {
      //we need to add to db
      console.log(newuserDetails);
      await axios.post("http://34.236.75.17/addUser", newuserDetails);
      commit("original", newuserDetails);
      return true;
    } else {
      return false;
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
