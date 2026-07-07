const https = require("https");
const query = `query { cosmetics(ids: ["01JEY00EDNVW20AWX2NPG4HTNF"]) { id ... on CosmeticPaint { name function angle shape repeat stops { at color } shadows { x_offset y_offset radius color } } } }`;
const data = JSON.stringify({ query });
const req = https.request({
  hostname: "7tv.io",
  path: "/v3/gql",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(data)
  }
}, res => {
  let body = "";
  res.on("data", c => body += c);
  res.on("end", () => console.log(body));
});
req.on("error", e => console.error("ERR", e));
req.write(data);
req.end();
