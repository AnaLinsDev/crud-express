import Express from "express"
import Products from "./products.js"

const app = Express()
app.use(Express.json())
app.use(Express.urlencoded( { extended: true }))

app.get("/products", (req, res) => {
    res.json(Products);
})

app.get("/products/:id", (req, res) => {
    res.json(Products.filter(p =>  p.id == req.params.id));
})

app.post("/products/add", (req, res) => {

    const maxId = Math.max(...Products.map(p => p.id), 0);
    req.body.id = maxId + 1

    Products.push(req.body)

    res.json(Products);

})

app.put("/products/update/:id", (req, res) => {

    Products.map( p =>  
        p.id == req.params.id ? 
        (
            p.name = req.body.name, 
            p.price = req.body.price, 
            p.quant = req.body.quant
        )
        : '')

        res.json(Products);

})


app.delete("/products/delete/:id", (req, res) => {

    const prod = Products.indexOf(
        Products.find(p => p.id == req.params.id)
        )

    Products.splice(prod , 1)
    res.json(Products);

})

app.listen(3000);



