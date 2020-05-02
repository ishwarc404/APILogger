<template>
  <v-container>
    <div class="header font-weight-black d-flex justify-content-center">
      <p>CURRENT LOGS</p>
    </div>

    <div class="d-flex justify-content-around">
      <v-btn color="primary" @click="clearLogs">CLEAR LOGS</v-btn>
      <v-btn color="primary" @click="logOut">LOG OUT</v-btn>
    </div>
    <br />

    <div class="font-weight-thin d-flex justify-content-center">
      <p>The logs will automatically appear. You don't have to refresh the page.</p>
    </div>
    <div class="font-weight-thin d-flex justify-content-center">
      <p>Once deleted, logs cannot be recovered.</p>
    </div>
    <hr />
    <div
      v-if="getUser.username==null"
      class="header2 font-weight-black d-flex justify-content-center"
    >
      <p>LOGIN FIRST SMARTY PANTS!</p>
    </div>
    <div
      v-if="getUser.username==null"
      class="header2 font-weight-black d-flex justify-content-center"
    >
      <v-btn color="primary" @click="logOut">LOGIN</v-btn>
    </div>
    <div v-if="getUser.username!=null" class="logs d-flex justify-content-center flex-container">
      <div v-for="value in messages" :key="value.id">
        <v-chip class="ma-2" :color="value.color" label text-color="black" x-medium>
          <v-icon left>mdi-label</v-icon>
          {{ value.message }}
        </v-chip>
      </div>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "HelloWorld",
  computed: mapGetters(["getUser"]),
  data() {
    return {
      messages: [],
      messagesDisplayed: [],
      filter: []
    };
  },
  methods: {
    ...mapActions(["clearUser"]),
    logOut() {
      this.clearUser();
      this.$router.push("/");
    },
    async startLogging() {
      // let recvdata = await axios.get(
      //   `http://192.168.0.9:3000/logs?username=${this.getUser.username}`
      // );
      let data = {
        username: this.getUser.username
      };
      // let recvdata = await axios.post("http://127.0.0.1:5000/getLogs", data);
      let recvdata = await axios.post("http://34.236.75.17/getLogs", data);

      recvdata = recvdata.data;

      var i;

      this.messagesDisplayed = this.messagesDisplayed.concat(
        this.getUser.restrictLogs
      );
      for (i = 0; i < recvdata.length; i++) {
        if (!this.messagesDisplayed.includes(recvdata[i].id)) {
          this.messages.push({
            message: recvdata[i].message,
            color: recvdata[i].color
          });
          this.messagesDisplayed.push(recvdata[i].id);
        }
      }

      setTimeout(this.startLogging, 100);
    },
    async clearLogs() {
      let newData = {
        id: this.getUser.id,
        username: this.getUser.username,
        password: this.getUser.password,
        restrictLogs: this.messagesDisplayed
      };

      // await axios.post(
      //   "http://127.0.0.1:5000/clearLogs",
      //   newData
      // );
            await axios.post(
        "http://34.236.75.17/clearLogs",
        newData
      );
      this.messages = [];
    }
  },
  created() {
    this.startLogging();
  }
};
</script>

<style scoped>
.header {
  font-size: 300%;
}

.header2 {
  font-size: 300%;
}

.flex-container {
  flex-wrap: wrap;
}
@media screen and (min-width: 480px) {
  .header {
    font-size: 600%;
  }
}
</style>
