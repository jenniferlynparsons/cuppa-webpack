const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const teaTypeNormalizer = require("../../normalizers/teaTypeNormalizer");

// Load input validation
const validateTeaTypeInput = require("../../validation/teaTypes");

// Load Tea Type model
const TeaType = require("../../models/TeaType");

// @route POST api/tea-types
// @desc Add new tea type
// @access Public
router.post("/", (req, res) => {
  const { errors, isValid } = validateTeaTypeInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  TeaType.findOne({ name: req.body.name }).then(teaType => {
    if (teaType) {
      return res
        .status(409)
        .json({ duplicate: "This tea type already exists" });
    }

    const newTeaType = new TeaType({
      id: new mongoose.mongo.ObjectId(),
      userID: req.body.userID,
      name: req.body.name,
      brewTime: req.body.brewTime
    });

    newTeaType.save().then(teaType => {
      res.status(200).json(teaTypeNormalizer(teaType));
    });
  });
});

// @route PUT api/tea-types
// @desc Edit tea type
// @access Public
router.patch("/:id", (req, res) => {
  const { errors, isValid } = validateTeaTypeInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  TeaType.findOneAndUpdate(
    { id: req.params.id },
    req.body,
    { new: true },
    function(err, teaType) {
      if (err) return res.send(500, { error: err });
      return res.status(200).json(teaTypeNormalizer(teaType));
    }
  );
});

// @route DELETE api/tea-types
// @desc Delete tea type
// @access Public
router.delete("/:id", (req, res) => {
  // The "teaType" in this callback function represents the document that was found.
  // It allows you to pass a reference back to the client in case they need a reference for some reason.
  TeaType.findOneAndDelete({ id: req.params.id }, {}, err => {
    // As always, handle any potential errors:
    if (err) return res.status(500).send(err);
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.
    const response = {
      message: "Tea Type successfully deleted",
      id: req.body.id
    };
    return res.status(200).send(response);
  });
});

// @route GET api/tea-types/:id
// @desc Get individual tea type
// @access Public
router.get("/:id", (req, res) => {
  TeaType.findOne({ id: req.params.id }, (err, teaType) => {
    if (err) {
      return res.status(404).send(err);
    }
    if (teaType) {
      return res.status(200).json(teaTypeNormalizer(teaType));
    } else {
      return res
        .status(404)
        .json({ teaTypeMissing: "TeaType does not exist." });
    }
  });
});

// @route GET api/tea-types/:id
// @desc Get all tea types
// @access Public
router.get("/", function(req, res) {
  TeaType.find({ userID: req.query.userID }, function(err, teaTypes) {
    if (err) {
      return res.status(404).send(err);
    }
    if (teaTypes) {
      return res.status(200).send(teaTypes.map(teaTypeNormalizer));
    } else {
      return res
        .status(404)
        .json({ teaTypesMissing: "TeaTypes do not exist." });
    }
  });
});

module.exports = router;
