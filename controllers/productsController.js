import fs from "fs"
//import { v4 } from "uuid"

//GET
export const getProducts = (req, res) => {
    //res.send("GET request in working fine!")
    res.sendFile("./models/products.json", { root: "." })
}
//POST
export const postProducts = (req, res) => {
    console.log(req.body)
    const product = fs.readFileSync("./models/products.json", "utf8")
    console.log(product)
    const parseProduct = JSON.parse(product)
    const item = { id: req.body.id, title: req.body.title, description: req.body.description, price: req.body.price, quantity: req.body.quantity }





    parseProduct.push(req.body)
    fs.writeFileSync("./models/products.json", JSON.stringify(parseProduct, null, 2))
    console.log(parseProduct)
    res.send("POST request in working fine!")
}


//PATCH

export const patchProducts = (req, res) => {
    console.log(req.params)
    // Read the products.json file

    const product = fs.readFileSync("./models/products.json", "utf8")
    //bcos i get data as json FORMAT so i shsould parse it like next line to read the data
    const parseProduct = JSON.parse(product)
    // Find the product by name

    const singleProduct = parseProduct.find(item => item.id === req.params.id)
    console.log(singleProduct)
    //we are not sure which property will be update so use Object
    Object.keys(req.body).forEach((property) => {
        singleProduct[property] = req.body[property]
    })
    // Write the updated data back to products.json

    fs.writeFileSync("./models/products.json", JSON.stringify(parseProduct, null, 2))
    console.log(parseProduct)

    res.send("PATCH request in working fine!" + req.params.id)
}



//DELETE

export const deleteProducts = (req, res) => {
    console.log(req.params)
    // Read the products.json file

    const product = fs.readFileSync("./models/products.json", "utf8")
    const parseProduct = JSON.parse(product)
    const deleteProductIndex = parseProduct.findIndex((item) => item.id === req.params.id)
    parseProduct.splice(deleteProductIndex, 1)
    fs.writeFileSync("./models/products.json", JSON.stringify(parseProduct, null, 2));

    res.send(`Product with id ${req.params.id} has been deleted.`);
}