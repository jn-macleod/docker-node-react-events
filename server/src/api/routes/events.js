const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// const Event = require('../models/event');

router.get('/', (req, res, next) => {
  // Event.find()
  //   .exec()
  //   .then((docs) => {
  //     console.log(docs);
  //     res.status(200).json(docs);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json({ error: err });
  //   });
});

// router.post('/', (req, res, next) => {
//   const event = new Event({
//     _id: new mongoose.Types.ObjectId(),
//     name: req.body.name,
//     decscription: req.body.decscription,
//   });
//   event
//     .save()
//     .then((result) => {
//       console.log(result);
//       res.status(201).json({
//         message: 'Handling POST to /events',
//         createdEvent: result,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ error: err });
//     });
// });

// router.get('/:eventId', (req, res, next) => {
//   const id = req.params.eventId;
//   Event.findById(id)
//     .exec()
//     .then((doc) => {
//       console.log('From database', doc);
//       if (doc) {
//         res.status(200).json(doc);
//       } else {
//         res
//           .status(404)
//           .json({ message: 'No valid entry found for provided ID' });
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ error: err });
//     });
// });

// router.patch('/:eventId', (req, res, next) => {
//   const id = req.params.eventId;
//   const updateOps = {};
//   for (const key of Object.keys(req.body)) {
//     updateOps[key] = req.body[key];
//   }
//   Event.updateOne({ _id: id }, { $set: updateOps })
//     .exec()
//     .then((result) => {
//       console.log(result);
//       res.status(200).json(result);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ error: err });
//     });
// });

// router.delete('/:eventId', (req, res, next) => {
//   const id = req.params.eventId;
//   Product.deleteOne({ _id: id })
//     .exec()
//     .then((res) => {
//       res.status(200).json(res);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ error: err });
//     });
// });

module.exports = router;
