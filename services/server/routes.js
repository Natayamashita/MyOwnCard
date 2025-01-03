const Card = require('../db/CardSchema');
module.exports = async function(app) {
    app.post('/createCard',(req,res) => {
        let { title, description, images, features } = req.body;  // Desestruturando os dados recebidos
        console.log('Card Title:', title);
        console.log('Card Description:', description);
        console.log('Card Images: ', images)
        console.log('Card features: ', features)
        images = images.map(el => {
            return el.split(',')[1]
        })
        res.status(200).json({
            message: 'Card created successfully!',
            card: {
                title: title,
                description: description,
                images: images,
                features: features
            }
        });
        var new_card = new Card({
            title: title,
            description: description,
            images: images,
            features: features
        })
        new_card.save();
    });
    app.get('/findCards', async (req,res) => {
       try {
            const cards = await Card.find();
            console.log(cards)
            res.status(200).json({
                message: 'cards returned successfull',
                cards: cards
            });
        } catch(err) {
            res.status(500).json({
                message: 'Error searching cards',
                error: err
            });
            console.log(err)
        }
    });
}