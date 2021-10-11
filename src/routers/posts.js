const express = require('express');
const { Dombooks } = require('../db/models/dombooks');
const { postPostJoi, postPatchJoi } = require('../middleware/postsJoi');

function registerRouter(app) {
    const router = express.Router()
    router.use(express.json())

    router.get('/posts', async (req, res) => {
        const dombooks = await Dombooks.findAll();
        res.send(dombooks)
    })

    router.post('/posts', postPostJoi, async (req, res) => {
        if (req.body.id != undefined && await Dombooks.findByPk(req.body.id)) {
            res.status(409).send('id already is used')
            return;
        }
        const newDombook = await Dombooks.create(req.body)

        res.send(newDombook)
    })

    router.put('/posts/:id', postPatchJoi, async (req, res) => {
        let postId = parseInt(req.params.id)

        const curDombook = await Dombooks.findByPk(postId)

        if (curDombook == null) {
            res.status(404).send("post not found");
            return
        }

        await curDombook.update(req.body)

        res.send(curDombook);
    })

    router.delete('/posts/:id', async (req, res) => {
        let postId = parseInt(req.params.id)

        const curDombook = await Dombooks.findByPk(postId)

        if (curDombook == null) {
            res.status(404).send("post not found");
            return
        }

        await curDombook.destroy()

        res.send({ postId })
    })

    app.use(router)
}


module.exports = registerRouter