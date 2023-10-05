"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
//Routing adresses to html pages
app.use(express_1.default.static("public"));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/html/index.html');
});
app.get("/Home_Router", (req, res) => {
    res.sendFile(__dirname + "/public/html/homeRouter.html");
});
app.get("/Local_Isp", (req, res) => {
    res.sendFile(__dirname + "/public/html/localISP.html");
});
app.get("/Internet_Backbone", (req, res) => {
    res.sendFile(__dirname + "/public/html/internetBackbone.html");
});
app.get("/Company_Isp", (req, res) => {
    res.sendFile(__dirname + "/public/html/corpISP.html");
});
app.get("/Company_Router", (req, res) => {
    res.sendFile(__dirname + "/public/html/corpRouter.html");
});
app.get("/Company_Server", (req, res) => {
    res.sendFile(__dirname + "/public/html/corpServer.html");
});
//Listening for connections and responding to requests
app.listen(PORT, () => {
    console.log('The application is listening '
        + 'on port http://localhost:' + PORT);
});
