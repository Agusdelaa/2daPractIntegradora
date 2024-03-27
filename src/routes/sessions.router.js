import express from 'express'
import passport from 'passport'

import { generateToken } from '../utils.js'

const router = express.Router()

router.post('/register', (req, res, next) => {
    passport.authenticate('register', (error, user, info) => {
        if (error) {
            res.status(500).json({ status: 'error', message: error.message })
        } else if (!user) {
            res.status(401).json({ status: 'error', message: info })
        } else {
            res.status(201).json({ status: 'success', message: info })
        }
    })(req, res, next)
});

router.post('/login', (req, res, next) => {
    passport.authenticate('login', (error, user, info) => {
        if (error) {
            res.status(500).json({ status: 'error', message: error.message })
        } else if (!user) {
            res.status(401).json({ status: 'error', message: info })
        } else {
            generateToken(res, user);
            res.status(200).json({ status: 'success', message: info })
        }
    })(req, res, next);
});

router.get('/github',
    passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { }
);

router.get('/githubcallback', (req, res, next) => {
    passport.authenticate('github', (error, user, info) => {
        if (error) {
            return res.redirect(`/login?success=false&message=${error.message}`);
        } else if (!user) {
            return res.redirect(`/login?success=false&message=${info}`);
        } else {
            generateToken(res, user);
            return res.redirect(`/login?success=true&message=${info}`);
        }
    })(req, res, next)
});

router.post('/restore', (req, res, next) => {
    passport.authenticate('restore', (error, user, info) => {
        if (error) {
            res.status(500).json({ status: 'error', message: error.message })
        } else if (!user) {
            res.status(401).json({ status: 'error', message: info })
        } else {
            res.status(201).json({ status: 'success', message: info })
        }
    })(req, res, next);
});

router.get('/current', passport.authenticate('current', { session: false }), (req, res) => {
    res.status(200).json({ status: 'success', payload: req.user })
});

router.post('/logout', passport.authenticate('current', { session: false }), (req, res) => {
    res.clearCookie('token')
    res.status(200).json({ status: 'success', message: 'Sesión cerrada con éxito' });
});

export default router