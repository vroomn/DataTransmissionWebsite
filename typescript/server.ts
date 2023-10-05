import express from 'express';

const app = express();
const PORT:number = 3000;

//Routing adresses to html pages
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/html/index.html')
})

app.get("/Home_Router", (req, res) => {
    res.sendFile(__dirname + "/public/html/homeRouter.html")
})

app.get("/Local_Isp", (req, res) => {
    res.sendFile(__dirname + "/public/html/localISP.html")
})

app.get("/Internet_Backbone", (req, res) => {
    res.sendFile(__dirname + "/public/html/internetBackbone.html")
})

app.get("/Company_Isp", (req, res) => {
    res.sendFile(__dirname + "/public/html/corpISP.html")
})

app.get("/Company_Router", (req, res) => {
    res.sendFile(__dirname + "/public/html/corpRouter.html")
})

app.get("/Company_Server", (req, res) => {
    res.sendFile(__dirname + "/public/html/corpServer.html")
})

//Listening for connections and responding to requests
app.listen(PORT,() => {
    console.log('The application is listening '
          + 'on port http://localhost:'+PORT);
})