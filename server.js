// sk_test_51NFr73SHfC7XrxxPVfp6WPIVPyEOFkOAu3duL2lM70HAw0ZjTDindU86C2bvw6ePQO5YQLMtwlMsGKlvYsgvLFrC00A7SAXs5N
// Coffee: price_1NGJwjSHfC7XrxxPtnmBysgV
// Sunglasses: price_1NGJy8SHfC7XrxxPAuVzsddN
// Camera: price_1NGJynSHfC7XrxxPefCbUR4O
const express = require('express');
var cors = require('cors');
const stripe = require('stripe')('sk_test_51NFr73SHfC7XrxxPVfp6WPIVPyEOFkOAu3duL2lM70HAw0ZjTDindU86C2bvw6ePQO5YQLMtwlMsGKlvYsgvLFrC00A7SAXs5N');

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {
    /*
    req.body.items
    [
        {
            id: 1,
            quantity: 3
        }
    ]

    stripe wants
    [
        {
            price: 1,
            quantity: 3
        }
    ]
    */
    console.log(req.body);
    const items = req.body.items;
    let lineItems = [];
    items.forEach((item)=> {
        lineItems.push(
            {
                price: item.id,
                quantity: item.quantity
            }
        )
    });

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel"
    });

    res.send(JSON.stringify({
        url: session.url
    }));
});

app.listen(4000, () => console.log("Listening on port 4000!"));