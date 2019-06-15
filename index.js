const express = require('express');
const agent=require('superagent');

console.log(tn);
server = express();

server.use(express.static('front'));

/*server.get('/src', (req, res) => {
    agent.get('http://localhost:2014/')
    res.send('###');
});*/

server.listen(8080, () => {console.log("listing 8080");});
