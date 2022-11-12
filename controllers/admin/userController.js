const Joi = require("joi");
const Users = require("../../Models/userModel");

const userController = {
  addUser(req, res) {
    const Schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    });

    try {
      const { error } = Schema.validate(req.body);
      if (error) {
        res.json({
          success: false,
          message: "Please put input data inside body properly",
          error: error.message,
        });
      } else {
        const { id, name, email, password } = req.body;

        Users.findOne({ email: email }, (err, user) => {
          if (user) {
            res.json({
              success: false,
              message: `User with given email ${email} already exists`,
            });
          } else {
            const base64_password = Buffer.from(password).toString("base64");
            const newUser = new Users({
              name: name,
              email: email,
              password: base64_password,
            });

            newUser.save((err, success) => {
              if (err) {
                res.json({
                  success: false,
                  message: err.message,
                  error: err,
                });
              } else {
                res.json({
                  success: true,
                  messgae: "User added successfully",
                });
              }
            });
          }
        });
      }
    } catch (err) {
      res.json({
        "success":false,
        "message":"Something went wrong",
        'error':Error
    })
    }
  },
};

module.exports = userController;
