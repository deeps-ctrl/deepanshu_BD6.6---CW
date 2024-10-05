const {app} = require("./index");

const PORT = 3000;

app.listen(PORT,() => console.log(`Server started listening on ${PORT} port.`))