const Users = require("../Models/userModel");
const key = "x-access-token";
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const loginController = {
  login(req, res) {
    const Schemas = Joi.object({
      id: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    try {
      const { error } = Schemas.validate(req.body);

      if (error) {
        res.json({
          success: false,
          message: "Please put input data inside body properly",
          error: error.message,
        });
      } else {
        const { id, password } = req.body;

        Users.findOne({ email: id }, (err, user) => {
          if (err) {
            res.json({
              success: false,
              message: err.message,
              error: err,
            });
          } else {
            if (!user) {
              res.json({
                success: false,
                message: `No user exsists with given email address ${id}`,
              });
            } else {
              const base64_password = Buffer.from(password).toString("base64");

              if (base64_password != user.password) {
                res.json({
                  success: false,
                  message: "Wrong password",
                });
              } else {
                const token = jwt.sign({ id: user._id,role: 'Admin' }, key, {
                  expiresIn: "1d",
                });
                user.token = token;
                user.save((err, user) => {
                  if (err) {  
                    res.json({
                      success: false,
                      message: err.message,
                      error: err,
                    });
                  }else{
                    res.json({
                      success: true,
                      message: "Login Successfull",
                      user: user
                    })
                  }
                });
              }
            }
          }
        });
      }
    } catch (err) {
      res.json({
        "success":false,
        "message":"Something went wrong",
        'error':err
    })
    }
  },

  logout(req, res, next) {
    try {

      Users.findById(req.data.id,(err, user) => {
        console.log(err,"err")
        console.log(user,"user")

        user.token = null

        user.save((err, user) => {
          if(err){
            res.json({
              success: false,
              message: err.message,
              error: err
            })
          }else{
            res.json({
              success: true,
              message: "Logout successfully"
            })
          }
        })
      })
        
    }
    catch(e) {
            res.json({
                "success":false,
                "message":"Something went wrong",
                'error':e
            })
        }
    }
};

module.exports = loginController;
