
import { Router } from "express"
import { deleteProducts, getProducts, patchProducts, postProducts } from "../controllers/productsController.js"
const router = Router()




//GET Routes
router.get("/", getProducts)

//POST Routes
router.post("/", postProducts)

//PATCH Routes
router.patch("/:id", patchProducts)

//DELETE Routes
router.delete("/:id", deleteProducts)
export default router
