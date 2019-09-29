const express = require('express');
const router = express.Router();
const Helpers = require('../utils/helpers');
const blockchainConnector = require('../utils/blockchainConnector');

router.get('/', (req, res) => {
    let token = req.headers.authorization;
    Helpers.verifyToken(token, (err, user) => {
        if(err){
            res.status(500).json(err);
        }
        blockchainConnector.queryAllAssets('car')
        .then(cars => {
            res.json(cars);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    })
});

router.get('/:id', (req, res) => {
    let token = req.headers.authorization;
    let id = req.params.id;
    Helpers.verifyToken(token, (err, user) => {
        if(err){
            res.status(500).json(err);
        }
        blockchainConnector.queryAssetById('car', id)
        .then(car => {
            if(!car){
                res.status(404).json('no car with key: ', id);
            }
            res.json(car);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    })
});

router.post('/', (req, res) => {
    let token = req.headers.authorization;
    let model = req.body.model;
    let make = req.body.make;
    let color = req.body.color;
    let owner = req.body.owner;
    let values = {
        model: model,
        make: make,
        color: color,
        owner: owner
    };
    Helpers.isAdmin(token)
    .then(() => {
        blockchainConnector.instantiateAsset('car', values)
        .then( car => {
            res.json(car);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    })
    .catch(err => {
        res.status(401).json('Unauthorized');
    })
});

router.put('/:id', (req, res) => {
    let token = req.headers.authorization;
    let id = req.params.id;
    let values = req.body.values;
    Helpers.verifyToken(token, (err, user) => {
        if(err){
            res.status(500).json(err);
        }
        blockchainConnector.updateAssetInstance('car', id, values)
        .then( car => {
            res.json(car);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    })
});

router.delete('/:id', (req, res) => {
    let token = req.headers.authorization;
    let id = req.params.id;
    Helpers.isAdmin(token)
    .then(() => {
        blockchainConnector.deleteAssetById('car', id)
        .then( key => {
            res.json(key);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    })
    .catch(err => {
        res.status(401).json('Unauthorized');
    })
});

router.post('/changeCarOwner', (req, res) => {
    let token = req.headers.authorization;
    let car = req.body.car;
    let newOwner = req.body.newOwner;
    Helpers.isAdmin(token)
        .then(() => {
            blockchainConnector.updateAssetInstance('car', car, {
                    'owner': newOwner
                })
                .then(car => res.json(car))
                .catch(err => res.status(500).json(err));
        })
        .catch(err => {
            res.status(401).json('Unauthorized');
        })
});

module.exports = router;
