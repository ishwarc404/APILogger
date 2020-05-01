import axios from "axios";

const state = {
  user: { username: null, password: null ,restrictLogs:[]},
};
const getters = {
  getUser: (state) => state.user,
};

const actions = {
  async checkUser({ commit }, userDetails) {
    let userData = await axios.get(
      `http://127.0.0.1:3000/users?username=${userDetails.username}&password=${userDetails.password}`
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
    let userData = await axios.get(
      `http://127.0.0.1:3000/users?username=${newuserDetails.username}`
    );
    userData = userData.data;
    console.log(userData);
    if (userData.length == 0) {
      //we need to add to db
      console.log(newuserDetails);
      await axios.post(`http://127.0.0.1:3000/users`, newuserDetails);
      commit("original", newuserDetails);
      return true;
    } else {
      
      return false;
    }
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
