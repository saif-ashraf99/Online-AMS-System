const router = require("express").Router();
const conn = require("../db/dbConnection");
const admin = require("../middleware/admin");
const util = require("util"); // helper
const { body, validationResult } = require("express-validator");

// GET ALL USERS
router.get('', admin, async (req, res) => {
    try {
      const query = util.promisify(conn.query).bind(conn);
      const users = await query('SELECT * FROM users');
  
      res.status(200).json({
        users
      });
    } catch (err) {
      res.status(500).json({
        error: err.message
      });
    }
  });


  // ACTIVATE USER
router.put(
    "/:id", // params
    admin,
    body("status")
      .isString()
      .withMessage("please enter a status")
      .isLength({ min: 3 })
      .withMessage("status name should be at lease 3 characters"),
    async (req, res) => {
      try {
        // 1- VALIDATION REQUEST [manual, express validation]
        const query = util.promisify(conn.query).bind(conn);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
  
        // 2- CHECK IF AUCTION EXISTS OR NOT
        const user = await query("select * from users where id = ?", [
          req.params.id,
        ]);
        if (!user[0]) {
          res.status(404).json({ ms: "user not found !" });
        }
  
        // 3- PREPARE USER OBJECT
        const userObj = {
            status: req.body.status,
        };
  
        // 4- UPDATE USER
        await query("update users set ? where id = ?", [userObj, user[0].id]);
  
        res.status(200).json({
          msg: "user updated successfully",
        });
      } catch (err) {
        res.status(500).json(err);
      }
    }
  );
  
  // DELETE USER
  router.delete(
    "/:id", // params
    admin,
    async (req, res) => {
      try {
        // 1- CHECK IF User EXISTS OR NOT
        const query = util.promisify(conn.query).bind(conn);
        const user = await query("select * from users where id = ?", [
          req.params.id,
        ]);
        if (!user[0]) {
          res.status(404).json({ ms: "user not found !" });
        }
        await query("delete from users where id = ?", [user[0].id]);
        res.status(200).json({
          msg: "user delete successfully",
        });
      } catch (err) {
        res.status(500).json(err);
      }
    }
  );
  
  module.exports = router;