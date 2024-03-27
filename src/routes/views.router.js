import express from 'express';
import passport from 'passport';

import { ProductsManagerDB } from '../dao/products.manager.DB.js';
import { CartsManagerDB } from '../dao/carts.manager.DB.js';

const router = express.Router();

const redirectToProductsIfAuthenticated = (req, res, next) => {
    if (req.query && Object.keys(req.query).length > 0) {
        return next()
    }
    passport.authenticate('current', { session: false }, (error, user, info) => {
        if (error) {
            return next(error);
        }
        if (user) {
            return res.redirect('/products');
        }
        next();
    })(req, res, next);
};

router.get('/login', redirectToProductsIfAuthenticated, (req, res) => {
    res.render('login');
});

router.get('/register', redirectToProductsIfAuthenticated, (req, res) => {
    res.render('register');
});

router.get('/restore', redirectToProductsIfAuthenticated, (req, res) => {
    res.render('restore');
});

router.get('/products',
    passport.authenticate('current', { session: false, failureRedirect: '/login' }),
    async (req, res) => {
        const user = req.user.user;
        try {
            const products = await ProductsManagerDB.getInstance().getProducts(req);
            res.render('products', {
                user,
                products
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);

router.get('/carts/:cid',
    passport.authenticate('current', { session: false, failureRedirect: '/login' }),
    async (req, res) => {
        const { cid } = req.params;
        try {
            const cart = await CartsManagerDB.getInstance().getCartById(cid);
            cart.products = cart.products.map(product => {
                return {
                    ...product,
                    total: product.product.price * product.quantity
                }
            })
            cart.total = cart.products.reduce((acc, product) => acc + product.total, 0)
            res.render('carts', {
                cart
            })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
)

router.get('/profile',
    passport.authenticate('current', { session: false, failureRedirect: '/login' }),
    (req, res) => {
        const user = req.user.user
        res.render('profile', {
            user
        })
    }
)

export default router;