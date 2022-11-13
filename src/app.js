const axios = require("axios").default;

axios
  .get("https://pokeapi.co/api/v2/pokemon")
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

const app = Vue.createApp({
  data() {
    return {};
  },
});
