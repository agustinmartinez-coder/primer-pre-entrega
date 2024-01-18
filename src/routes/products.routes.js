import { Router } from "express";
import { ProductManager } from "../models/index.js";

const prodRouter = Router();

const productManager = new ProductManager();

prodRouter.get("/", async (req, res) => {
const { limit } = req.query;
const products = await productManager.getProducts();

  if (!limit) {
    res.status(200).send(products);
} else {
    const limitToInt = parseInt(limit);
    if (!isNaN(limitToInt) && limitToInt > 0) {
    const limitedProds = await productManager.getProducts(limitToInt);
    res.status(200).send(limitedProds);
    } else {
    res.status(404).send({
        error: "Se ingresó mal el query param, tipo de dato incorrecto",
    });
    }
}
});

prodRouter.get("/:id", async (req, res) => {
const { id } = req.params;
const productsById = await productManager.getProductById(parseInt(id));

if (productsById) {
    res.status(200).send(productsById);
} else {
    res.status(404).send(`Producto con el id ${id} no se ha encontrado`);
}
});

prodRouter.post("/", async (req, res) => {
const validate = await productManager.addProduct(req.body);

if (validate) {
    res.status(200).send("Producto creado correctamente");
    return;
} else {
    res.status(400).send("Error en crear producto");
}
});

prodRouter.put("/:id", async (req, res) => {
const { id } = req.params;
const { body } = req;
const validate = await productManager.updateProduct(parseInt(id), body);

if (validate) {
    res.status(200).send("Producto actualizado correctamente");
} else {
    res.status(400).send("Error en actualizacion del producto");
}
});

prodRouter.delete("/:id", async (req, res) => {
const validate = await productManager.deleteProduct(parseInt(req.params.id));

if (validate) {
    res.status(200).send("Producto eliminado correctamente");
} else {
    res.status(400).send("Error al eliminar producto");
}
});

export { prodRouter };