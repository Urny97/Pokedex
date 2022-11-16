const app = Vue.createApp({
  data() {
    return {
      pokemonArray: [],
      pokeName: "Charmander",
    };
  },
  computed: {
    pokeNum(id) {
      console.log(id);
      const parsedId = parseInt(id);
      if (1 <= parsedId < 10) {
        return "00" + id;
      } else if (10 <= parsedId < 100) {
        return "0" + id;
      } else {
        return id;
      }
    },
    bgAndBorderColor(typeSlot) {
      console.log(typeSlot);
      const colorname = typeSlot.type.name;
      return `bg-${colorname} border border-${colorname}`;
    },
    capitalize(string) {
      return string[0].toUpperCase() + string.slice(1, string.length);
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
      })
      .catch((error) => {
        console.log(error);
      });
  },
});

app.mount("#vapp");
