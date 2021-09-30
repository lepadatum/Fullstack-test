const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get posts
router.get('/', async (req,res) => {
    const posts = await loadPostsCollections();
    res.send(await posts.find({}).toArray());
})


//Add posts
router.post('/', async (req,res) => {
    const posts = await loadPostsCollections();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date(),
    });
    res.status(201).send();
})

//Delete posts
router.delete('/:id', async (req,res) => {
    const posts = await loadPostsCollections();
    await posts.deleteOne({_id: new mongodb.ObjectId( req.params.id)});
    res.status(200).send();
})

async function loadPostsCollections() {
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://misu:12345@cluster0.ptqvf.mongodb.net/Cluster0?retryWrites=true&w=majority',
    {
        useNewUrlParser: true
    });

    return client.db('Cluster0').collection('posts');
}


module.exports = router;