const app = Vue.createApp({
  data() {
    return {
      pokemonArray: [],
    };
  },
  computed: {
    imageSource(index) {
      let noProxyArray = JSON.parse(JSON.stringify(this.pokemonArray));
      return noProxyArray[index]["sprites"]["front_default"];
    },
  },
  methods: {},
  beforeCreate() {
    axios
      .get("https://stoplight.io/mocks/appwise-be/pokemon/57519009/pokemon")
      .then((res) => {
        let initialArray = res.data;
        for (let i = 0; i <= 150; i++) {
          let id = i + 1;
          axios
            .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((res) => {
              let newSprite =
                res["data"]["sprites"]["other"]["official-artwork"][
                  "front_default"
                ];
              initialArray[i]["sprites"]["front_default"] = newSprite;
            })
            .catch((error) => {
              console.log(error);
            });
        }
        this.pokemonArray = initialArray;
        console.log(this.pokemonArray);
        let noProxyArray = JSON.parse(JSON.stringify(this.pokemonArray));
        console.log(noProxyArray);
      })
      .catch((error) => {
        console.log(error);
      });
  },
});

app.mount("#pokemon");
