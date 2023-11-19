const { classify } = require("./controller/cohere");

(async () => {
  console.log(classify);

  const responses = await classify([
    "broski my care cup is so empty :joy",
    "RAAAH!!!! frickin idiots die!!!!!",
    "i love the world",
  ]);

  for (const { input, predictions } of responses) {
    console.log(`"${input}" got classified as ${predictions[0]}`);
  }
})();
