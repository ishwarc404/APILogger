<template>
  <v-container>
    <div class="header font-weight-black d-flex justify-content-center">
      <p>CURRENT LOGS</p>
    </div>

    <div class="d-flex justify-content-around">
      <v-btn color="primary" @click="clearLogs">CLEAR LOGS</v-btn>
    </div>
    <hr />
    <div class="logs d-flex justify-content-center flex-container">
      <div v-for="value in messages" :key="value.id">
        <v-chip
          class="ma-2"
          :color="value.color"
          label
          text-color="black"
          x-medium
        >
          <v-icon left>mdi-label</v-icon>
          {{ value.message }}
        </v-chip>
      </div>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "HelloWorld",
  computed: mapGetters(["getUser"]),
  data() {
    return {
      messages: [],
      messagesDisplayed: [],
      filter: [],
    };
  },
  methods: {
    async startLogging() {
      let recvdata = await axios.get(
        `http://35.168.69.196:3000/logs?username=${this.getUser.username}`
      );
      recvdata = recvdata.data;

      var i;
      
      this.messagesDisplayed = this.messagesDisplayed.concat(this.getUser.restrictLogs);
      console.log("filterr:", this.filter);
      for (i = 0; i < recvdata.length; i++) {
        if (!this.messagesDisplayed.includes(recvdata[i].id)) {
          console.log(recvdata[i].message);
          this.messages.push({
            message: recvdata[i].message,
            color: recvdata[i].color,
          });
          this.messagesDisplayed.push(recvdata[i].id);
        }
      }

      setTimeout(this.startLogging, 1000);
    },
    async clearLogs() {
      let newData = {
        id: this.getUser.id,
        username: this.getUser.username,
        password: this.getUser.password,
        restrictLogs: this.messagesDisplayed,
      };
      console.log("filter is:", this.messagesDisplayed);
      await axios.put(
        `http://35.168.69.196:3000/users/${this.getUser.id}/`,
        newData
      );
      this.messages = []
    },
  },
  created() {
    this.startLogging();
  },
};
</script>

<style scoped>
.header {
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
