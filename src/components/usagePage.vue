<template>
  <v-app>
    <div class="d-flex justify-content-center loginDiv" >
      <div>
        <v-chip color="black" label large text-color="white">
          <p id="apiheader">USAGE</p>
        </v-chip>
        <br />
        <br />
        <h1>
          <b>PYTHON</b>
        </h1>
        <br />
        <img :src="image" width="300px" />
        <br />
        <br />
        <v-btn large color="black" style="color:white;" @click="this.goHome">GO HOME</v-btn>
        <hr />
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    image: require("@/assets/carbon.png")
  }),
  methods: {
    goHome() {
      this.$router.push("home");
    }
  }
};
</script>

<style scoped>
.loginDiv {
  flex: 0%;
  background-color: white;
  padding-top: 20px;
}
#apiheader {
  font-size: 50px;
  padding-top: 10%;
  font-weight: bold;
  flex: 0%;
}
</style>
