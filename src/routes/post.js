const express = require('express')
const List = require('../models/list')
const Post = require('../models/post')
const checkAuth = require("../middleware/check-auth");
const mongoose = require("mongoose");

const router = express.Router();


// save a new list
router.post( "/lists/newlist", checkAuth, (req, res, next) => {
    const post = new List({
    title: req.body.title,
    creator: req.userData.userId
    });
    post
    .save()
    .then(list => {
        res.status(201).json({
        message: "List added successfully",
        list
        });
    })
    .catch(error => {
        res.status(500).json({
        message: "Creating a List failed!"
        });
    });
  }
);

//update a post
router.put("/lists/:listid/:postid", checkAuth, (req, res, next) => {
    const post = new Post({
      _id: req.params.postid,
      listid: req.params.listid,
      title: req.body.title,
      content: req.body.content,
      price: req.body.price,
      imageLink: req.body.imageLink
    });
    Post.updateOne({ _id: req.params.postid, list: req.params.listid}, post)
      .then(result => {
        if (result.nModified > 0) {
          res.status(200).json({ message: "Updated post successfully!" });
        } else {
          res.status(401).json({ message: "Couldn't udpate post!" });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Not authorized!"
        });
      });
  }
);

//delete a post
router.delete("/lists/:listid/:postid", checkAuth, (req, res, next) => {
  Post.deleteOne({ _id: req.params.postid, list: req.params.listid})
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Couldn't find the post!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting post failed!"
      });
    });
});

//get a post by it's Id
router.get("/lists/:listid/:postid", checkAuth, (req, res, next) => {
  Post.findById(req.params.postid)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching post failed!"
      });
    });
});

//delete a list
router.delete("/lists/:id", checkAuth, (req, res, next) => {
  List.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Couldn't find the list!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting list failed!"
      });
    });
});

// get all lists of a particular user
router.get("/lists", checkAuth, (req, res, next) => {
    List.find({creator: req.userData.userId})

      .then(lists => {
        if (lists) {
          res.status(200).json(lists);

        } else {
          res.status(404).json({ message: "No lists found!" });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Fetching Lists failed!"
        });
      });
  });

// save a new post
router.post( "/lists/:listId", checkAuth, (req, res, next) => {
  const post = new Post({
  title: req.body.title,
  content: req.body.content,
  price: req.body.price,
  imageLink: req.body.imageLink,
  list: req.params.listId
  });
  post
  .save()
  .then(createdPost => {
      res.status(201).json({
      message: "Post added successfully",
      post: {
          ...createdPost,
          id: createdPost._id
      }
      });
  })
  .catch(error => {
      res.status(500).json({
      message: "Creating a post failed!"
      });
  });
}
);

//get all the posts of a list
router.get("/lists/:listId", checkAuth, (req, res, next) => {
  Post.find({list: req.params.listId})
    .then(posts => {
      if (posts) {
        res.status(200).json(posts);
        res.json()
      } else {
        res.status(404).json({ message: "No posts found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching posts failed!"
      });
    });
});

module.exports = router;
