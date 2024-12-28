const Card = require('../db/CardSchema');
module.exports = async function(app) {
    app.post('/createCard',(req,res) => {
        console.log(req.body);
        console.log(res);
    });
    var new_card = new Card({
        title: "teste",
        description: "teste"
    })
    new_card.save();
}