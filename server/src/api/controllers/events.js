const mongoose = require('mongoose');

const Event = require('../models/event');
const User = require('../models/user');

exports.events_get_all = (req, res, next) => {
  Event.find()
    .select('name description dates _id')
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        events: docs.map((doc) => {
          return {
            name: doc.name,
            description: doc.price,
            dates: {
              start: doc.dates.start ? doc.dates.start.toLocaleString() : '',
              end: doc.dates.end ? doc.dates.end.toLocaleString() : '',
            },
            _id: doc._id,
            links: [
              {
                rel: 'event',
                action: 'GET',
                href: '/events/' + doc._id,
              },
            ],
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.events_create_event = (req, res, next) => {
  const userId = req.userData.userId;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        const error = new Error('User not found');
        error.status = 404;
        throw error;
      }
      const event = new Event({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        dates: {
          start: req.body.dates.start,
          end: req.body.dates.end,
        },
        user: userId,
      });
      return event.save();
    })
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: 'Created event successfully',
        createdEvent: {
          name: result.name,
          description: result.description,
          dates: result.dates,
          _id: result._id,
          links: [
            {
              rel: 'event',
              action: 'GET',
              href: '/events/' + result._id,
            },
          ],
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.events_get_event = (req, res, next) => {
  const id = req.params.eventId;
  Event.findById(id)
    .exec()
    .then((doc) => {
      console.log('From database', doc);
      if (doc) {
        res.status(200).json({
          event: doc,
          link: {
            action: 'GET',
            description: 'Get all events',
            href: '/events',
          },
        });
      } else {
        res
          .status(404)
          .json({ message: 'No valid entry found for provided ID' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.events_update_event = (req, res, next) => {
  const id = req.params.eventId;
  const updateOps = {};
  for (const key of Object.keys(req.body)) {
    updateOps[key] = req.body[key];
  }
  Event.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      console.log(result);
      if (!result.matchedCount) {
        res
          .status(404)
          .json({ message: 'No valid entry found for provided ID' });
      } else {
        res.status(200).json({
          message: 'Event updated',
          links: [
            {
              rel: 'event',
              action: 'GET',
              href: '/events/' + id,
            },
          ],
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.events_delete_event = (req, res, next) => {
  const id = req.params.eventId;
  Event.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(204).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
