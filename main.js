import express from "express"
import productsRoutes from "./routes/productsRoute.js"
import createHttpError from "http-errors"
const PORT = 4000
const app = express()
//to handle JSON request bodies
app.use(express.json())


app.use((req, res, next) => {
    console.log(
        "method: ",
        req.method,
        "request URL: ",
        req.url,
        "request ip: ",
        req.ip
    );
    next(); // forwarding your request to next handler
});


app.use("/products", productsRoutes)

app.use((req, res, next) => {
    res.status(404).sendFile("./index.html", { root: "." });
});
//universal error handling middleware
// request along with the error
// Universal error handling middleware
app.use((err, req, res, next) => {
    // Ensure that next is called only if there's an error
    res.status(err.status || 500).send({
        error: {
            message: err.message || "An unexpected error occurred.",
            status: err.status || 500,
        },
    });
});
app.listen(PORT, () => console.log("Server is running on port:", PORT))