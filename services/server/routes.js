const Card = require('../db/CardSchema');
module.exports = async function(app) {
    app.post('/createCard',(req,res) => {
        const { title, description, images, features } = req.body;  // Desestruturando os dados recebidos
        console.log('Card Title:', title);
        console.log('Card Description:', description);
        res.status(200).json({
            message: 'Card created successfully!',
            card: {
                title: title,
                description: description
            }
        });
        var new_card = new Card({
            title: "teste2",
            description: "teste2"
        })
        new_card.save();
    });
}