const Place = require('../models/place.model.js');

// Create and Save a new Place
exports.create = (req, res) => {
    // Validate request
    if(!req.body.place_id) {
        return res.status(400).send({
            message: "place ID can not be empty"
        });
    }

    // Create a Place
    const place = new Place({
        name: req.body.name || "Untitled Place",
        place_id: req.body.place_id
    });

    // Save Place in the database
    place.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Place."
        });
    });
};


// Retrieve and return all places from the database.
exports.findAll = (req, res) => {
    Place.find()
        .then(places => {
            res.send(places);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving places."
        });
    });
};


// Find a single place with a place_id
exports.findOne = (req, res) => {
    Place.findById(req.params.place_id)
        .then(place => {
            if(!place) {
                return res.status(404).send({
                    message: "Place not found with id " + req.params.place_id
                });
            }
            res.send(place);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Place not found with id " + req.params.place_id
            });
        }
        return res.status(500).send({
            message: "Error retrieving place with id " + req.params.place_id
        });
    });
};


// Update a place identified by the place_id in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.place_id) {
        return res.status(400).send({
            message: "Place id can not be empty"
        });
    }

    // Find place and update it with the request body
    Place.findByIdAndUpdate(req.params.place_id, {
        name: req.body.name || "Untitled Place",
        place_id: req.body.place_id
    }, {new: true})
        .then(place => {
            if(!place) {
                return res.status(404).send({
                    message: "Place not found with id " + req.params.place_id
                });
            }
            res.send(place);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Place not found with id " + req.params.place_id
            });
        }
        return res.status(500).send({
            message: "Error updating place with id " + req.params.place_id
        });
    });
};


// Delete a place with the specified place_id in the request
exports.delete = (req, res) => {
    Place.findByIdAndRemove(req.params.place_id)
        .then(place => {
            if(!place) {
                return res.status(404).send({
                    message: "Place not found with id " + req.params.place_id
                });
            }
            res.send({message: "Place deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Place not found with id " + req.params.place_id
            });
        }
        return res.status(500).send({
            message: "Could not delete place with id " + req.params.place_id
        });
    });
};
