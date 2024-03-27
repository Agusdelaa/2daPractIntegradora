import express from 'express'
import { ProductsManagerDB } from '../dao/products.manager.DB.js'

const router = express.Router()

router.use((req, res, next) => {
    if (req.method === 'POST' || req.method === 'PUT') {
        const { title, description, code, price, status, stock, category, thumbnails } = req.body
        if (!title || !description || !code || !price || !status || !stock || !category || !thumbnails) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' })
        }
    }
    next();
});

router.get('/', async (req, res) => {
    try {
        const products = await ProductsManagerDB.getInstance().getProducts(req);
        res.json({
            status: 'success',
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.prevLink,
            nextLink: products.nextLink
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:pid', async (req, res) => {
    try {
        const id = req.params.pid;
        const product = await ProductsManagerDB.getInstance().getProductById(id);
        res.json({ status: 'success', payload: product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const product = req.body;
        const newProduct = await ProductsManagerDB.getInstance().createProduct(product);
        res.json({ status: 'success', payload: newProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:pid', async (req, res) => {
    try {
        const id = req.params.pid;
        const product = req.body;
        const updatedProduct = await ProductsManagerDB.getInstance().updateProduct(id, product);
        res.json({ status: 'success', payload: updatedProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:pid', async (req, res) => {
    try {
        const id = req.params.pid;
        const deletedProduct = await ProductsManagerDB.getInstance().deleteProduct(id);
        res.json({ status: 'success', payload: deletedProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;