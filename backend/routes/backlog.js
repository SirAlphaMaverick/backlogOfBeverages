const router = require('express').Router();
let Backlog = require('../models/backlog.model');

router.route('/').get((req, res) => {
    Backlog.find()
        .then(backlog => res.json(backlog))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const beverage = req.body.beverage;
    const type = req.body.type;

    const newBacklog = new Backlog({ name, beverage, type });

    newBacklog.save()
        .then(() => res.json('Backlog Added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;