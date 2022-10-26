const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Metrics = db.metrics;




var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  console.log("_____", req.body);
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    });
};


exports.getMetrics = (req, res) => {
  Metrics.find({})
    .exec((err, result) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send({
        message: "success",
        data: result
      });
    });
};

exports.addMetrics = async (req, res) => {
  const data = await Metrics.find().count();

  const metrics = new Metrics({
    id: data + 1,
    metric: req.body.metric,
    weightage: req.body.weightage,
    customerview: req.body.customerview,
  });

  metrics.save((err, results) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ data: results, message: "Metrics was registered successfully!" });
  });
};

exports.updateMetrics = (req, res) => {
  console.log("_____", req.body);
  const id = req.body.id;
  const metrics = new Metrics({
    id: req.body.id,
    metric: req.body.metric,
    weightage: req.body.weightage,
    customerview: req.body.customerview,
  });
  console.log('metrics', metrics)
  Metrics.updateOne({ id: req.body.id }, { $set: { metric: req.body.metric, weightage: req.body.weightage,customerview: req.body.customerview } })
    .exec((err, result) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send({
        message: "Metrics was update successfully",
        res: result
      });
    });
};

exports.deleteMetrics = (req, res) => {
  console.log("_____", req.body);
  const id = req.body.id;

  Metrics.deleteOne({ weightage: 5 })
    .exec((err, result) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send({
        message: metrics,
        message: "Metrics was delete successfully"
      });
    });
};