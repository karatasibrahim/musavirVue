const wbm = require("./wbm");
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
  //  app.use(function (req, res, next) {
  //    //Enabling CORS
  //    res.header("Access-Control-Allow-Origin", "*");
  //    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  //    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
  //      next();
  //    });
  // let headers = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Headers': 'Content-Type',
  //   'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  //   'Authorization': 'Bearer szdp79a2kz4wh4frjzuqu4sz6qeth8m3',
  // });
app.post("/api", (req, res) => {
  const { phone, msg } = req.body;



  wbm
    .start({ qrCodeData: true, session: false, showBrowser: true })
    .then(async (qrCodeData) => {
      console.log(qrCodeData); // show data used to generate QR Code
      res.send(qrCodeData);
      await wbm.waitQRCode();

      const phones = [phone];
      const message = msg;

      await wbm.send(phones, message);
      await wbm.end();
    })
    .catch((err) => {
      console.log(err);
    });
}) ;

// Loading frontend
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

const PORT = process.env.PORT || 8087;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
