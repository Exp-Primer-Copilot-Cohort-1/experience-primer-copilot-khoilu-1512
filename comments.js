// Create web server
var express = require('express');
var router = express.Router();
var comments = require('../models/comments');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/CommentsDB');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Get comments
router.get('/', function(req, res) {
    comments.find({}, function(err, comments) {
        if (err) {
            res.status(500).send({ error: "Could not fetch comments" });
        } else {
            res.send(comments);
        }
    });
});

// Get comment by id
router.get('/:id', function(req, res) {
    comments.findById(req.params.id, function(err, comment) {
        if (err) {
            res.status(500).send({ error: "Could not fetch comment" });
        } else {
            res.send(comment);
        }
    });
});

// Post comment
router.post('/', function(req, res) {
    var comment = new comments(req.body);
    comment.save(function(err) {
        if (err) {
            res.status(500).send({ error: "Could not save comment" });
        } else {
            res.send(comment);
        }
    });
});

// Update comment
router.put('/:id', function(req, res) {
    comments.findByIdAndUpdate(req.params.id, req.body, function(err, comment) {
        if (err) {
            res.status(500).send({ error: "Could not update comment" });
        } else {
            res.send(comment);
        }
    });
});

// Delete comment
router.delete('/:id', function(req, res) {
    comments.findByIdAndRemove(req.params.id, function(err, comment) {
        if (err) {
            res.status(500).send({ error: "Could not delete comment" });
        } else {
            res.send(comment);
        }
    });
});

module.exports = router;