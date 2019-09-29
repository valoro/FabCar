const express = require('express');
const router = express.Router();
const blockchainConnector = require('../utils/blockchainConnector');

router.get('/', (req, res) => {
    blockchainConnector.queryAllAssets('car')
    .then(cars => {
        res.json(cars);
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
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
});

router.post('/', (req, res) => {
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
    blockchainConnector.instantiateAsset('car', values)
    .then( car => {
        res.json(car);
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let values = req.body.values;
    blockchainConnector.updateAssetInstance('car', id, values)
    .then( car => {
        res.json(car);
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    blockchainConnector.deleteAssetById('car', id)
    .then( key => {
        res.json(key);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

router.post('/changeCarOwner', (req, res) => {
    let car = req.body.car;
    let newOwner = req.body.newOwner;
    blockchainConnector.updateAssetInstance('car', car, {'owner': newOwner})
    .then( car => res.json(car))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
