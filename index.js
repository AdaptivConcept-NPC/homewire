const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const axios = require('axios');
const { response } = require('express');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/popper.js/dist')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
    //public/index.html
});
app.post('/payment', (req, res) => {
    //res.send(req.body);
    axios.post('https://online.yoco.com/v1/charges/', {
        token: req.body.token,
        amountInCents: req.body.amountInCents, //29699
        currency: 'ZAR'
    }, {
        headers: {
            'X-Auth-Secret-Key': 'sk_test_7a5eedc54LP0lm702af46a089e5d'
        }
    })
        .then( response => {
            res.send(response.data)
        })
        .catch( error => {
            res.send("[Server ChargeAPI POST Catch Error]: "+error.response.data)
        })
})
app.listen(PORT, (req, res) => console.log(`Server Running on Port: ${PORT}`))