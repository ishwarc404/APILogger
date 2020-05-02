<template>
  <v-app>
    <div class="d-flex justify-content-center loginDiv">
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
        <div class="d-flex justify-content-center headinginfo">
          <div>
            <h4>
              Just include the above code anywhere in your code, along with your username and password to create a checkpoint which will be
              displayed here.
            </h4>
            <h5>
              <a href="https://textsaver.flap.tv/lists/3cz1">Click me for the code</a>
            </h5>
          </div>
        </div>

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
.headinginfo {
  width: 300px;
}
#apiheader {
  font-size: 50px;
  padding-top: 10%;
  font-weight: bold;
  flex: 0%;
}
</style>
