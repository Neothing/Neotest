const Test = require("../database/models/test.model");

exports.findAll = (req, res) => {
  Test.find()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error on geting data",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Test.findById(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Data notfound",
        });
      } else {
        res.status(200).send(result);
      }
      console.log(result);
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Some error on geting id data",
      });
    });
};

exports.create = (req, res) => {
  const test = new Test({
    title: req.body.title,
    body: req.body.body,
    published: req.body.published ? req.body.published : false,
  });

  test
    .save(test)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Some error on posting data",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Test.findByIdAndUpdate(id, req.body)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Post not found",
        });
      } else {
        res.status(200).send({
          message: "Post was updated",
        });
      }
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Some error on updateing data",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Test.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Post not found",
        });
      } else {
        res.status(200).send({
          message: "Post was deleted",
        });
      }
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Some error on deleteing data",
      });
    });
};
