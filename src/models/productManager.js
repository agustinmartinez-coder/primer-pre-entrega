import { promises as fs } from "node:fs";
import { join } from "node:path";
import { __dirname } from "../path.js";


const PATH = join(__dirname, "db", "products.json");

const jsonReadFile = JSON.parse(await fs.readFile(PATH), "utf-8");
const products = jsonReadFile;

class ProductManager {
        constructor() {
    this.products = [];
}
NextId(products) {
    let nextId = products.reduce((maxId, product) => {
    return product.id > maxId ? product.id : maxId;
    }, 0);
    return nextId + 1;
}
async addProduct(product) {
    const validateProd = this.products.find(
    (prod) => prod.code === product.code
    );

    if (validateProd) {
    console.log("Producto ya existente, intenta agregar uno distinto");
    } else {
    product.id = this.NextId(products);
    product.push(product);
    await fs.writeFile(PATH, json.stringify(products));
    }
}
async updateProduct(id, prodBody) {
    const prodIndex = products.findIndex(prod => prod.id === parseInt(id));

    if (prodIndex !== -1) {
    Object.keys(prodBody).forEach(element => {
        if (element in products[prodIndex]) {
        products[prodIndex][element] = prodBody[element];
        }
    });
    await fs.writeFile(PATH, JSON.stringify(products));
    return true;
    } else {
return false;
    }
}

async deleteProduct(id) {
    try {
    const prodById = products.find((prod) => prod.id === id);

    if (prodById) {
        const updatedProducts = products.filter((prod) => prod.id !== id);
        await fs.writeFile(PATH, JSON.stringify(updatedProducts, null, 2));
        console.log(`El producto fue eliminado correctamente`);
        return true;
    } else {
        console.log("Producto no encontrado");
        return false;
    }
    } catch (error) {
    console.error("Error al eliminar producto:", error);
    return false;
    }
}

async getProducts(limit) {
    if (limit) {
    return products.slice(0, limit);
    } else {
    return products;
    }
}

async getProductById(id) {
    const prodById = products.find((prod) => prod.id === parseInt(id));
    return prodById;
}
}

export { ProductManager };