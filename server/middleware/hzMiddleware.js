const express = require("express");
const app = express();

app.use(express.json()); // Позволяет серверу понимать JSON тело запроса