<template>
  <v-app>
    <div class="d-flex justify-content-center loginDiv">
      <div>
        <v-chip color="black" label large text-color="white">
          <p id="apiheader">API LOGS</p>
        </v-chip>
        <br />
        <br />
        <h3>
          <b>LOGIN</b>
        </h3>
        <v-text-field label="USERNAME" v-model="loginuserData.username" outlined></v-text-field>
        <v-text-field label="PASSWORD" v-model="loginuserData.password" outlined type="password"></v-text-field>
        <v-btn medium color="black" style="color:white;" @click="this.enterLogs">ENTER!</v-btn>
        <br />
        <br />
        <hr />
        <h3>
          <b>CREATE NEW</b>
        </h3>
        <v-text-field label="USERNAME" v-model="newuserData.username" outlined></v-text-field>
        <v-text-field label="PASSWORD" v-model="newuserData.password" outlined type="password"></v-text-field>
        <v-btn medium color="black" style="color:white;" @click="this.createnewuser">CREATE!</v-btn>
        <br />
        <br />
        <v-btn medium color="black" style="color:white;" @click="this.viewUsage">HOW TO USE</v-btn>
        <br />
        <br />
        <h6>Created by Ishwar Choudhary :)</h6>
      </div>
    </div>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "App",

  components: {},

  data() {
    return {
      loginuserData: {
        username: null,
        password: null
      },
      newuserData: {
        username: null,
        password: null,
        restrictLogs: []
      }
    };
  },
  methods: {
    ...mapActions(["checkUser", "createUser"]),

    async enterLogs() {
      if (
        this.loginuserData.username != null ||
        this.loginuserData.password != null
      ) {
        var check = await this.checkUser(this.loginuserData);
        if (check) {
          this.$router.push("logs");
        } else {
          alert("Invalid Credentials!");
        }
      }
    },
    async createnewuser() {
      if (
        this.newuserData.username != null ||
        this.newuserData.password != null
      ) {
        var check = await this.createUser(this.newuserData);
        console.log("here", check);
        if (check) {
          this.loginuserData.username = this.newuserData.username;
          this.loginuserData.password = this.newuserData.password;
          this.enterLogs();
        } else {
          alert("Uername unavailable :(");
        }
      }
    },
    viewUsage() {
      this.$router.push("usage");
    }
  }
};
</script>

<style scoped>
.loginDiv {
  flex: 0%;
  background-color: white;
  padding-top: 10px;
}
#apiheader {
  font-size: 30px;
  padding-top: 10%;
  font-weight: bold;
  flex: 0%;
}
</style>
