const router = require("express").Router();
const conn = require("../db/dbConnection");
const authorized = require("../middleware/authorize");
const seller = require("../middleware/seller");
const { body, validationResult } = require("express-validator");
const upload = require("../middleware/uploadImages");
const util = require("util"); // helper
const fs = require("fs"); // file system

// CREATE AUCTION [SELLER]
router.post(
  "",
  seller,
  upload.single("image"),
  body("name")
    .isString()
    .withMessage("please enter a valid auction name")
    .isLength({ min: 3 })
    .withMessage("auction name should be at lease 3 characters"),

  body("description")
    .isString()
    .withMessage("please enter a valid description ")
    .isLength({ min: 5 })
    .withMessage("description name should be at lease 5 characters"),
  async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 2- VALIDATE THE IMAGE
      if (!req.file) {
        return res.status(400).json({
          errors: [
            {
              msg: "Image is Required",
            },
          ],
        });
      }

      // 3- PREPARE AUCTION OBJECT
      const auction = {
        name: req.body.name,
        description: req.body.description,
        image_url: req.file.filename,
      };

      // 4 - INSERT AUCTION INTO DB
      const query = util.promisify(conn.query).bind(conn);
      await query("insert into auctions set ? ", auction);
      res.status(200).json({
        msg: "auction created successfully !",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// UPDATE AUCTION [SELLER]
router.put(
  "/:id", // params
  seller,
  upload.single("image"),
  body("name")
    .isString()
    .withMessage("please enter a valid auction name")
    .isLength({ min: 3 })
    .withMessage("auction name should be at lease 3 characters"),

  body("description")
    .isString()
    .withMessage("please enter a valid description ")
    .isLength({ min: 5 })
    .withMessage("description name should be at lease 5 characters"),
  async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const query = util.promisify(conn.query).bind(conn);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 2- CHECK IF AUCTION EXISTS OR NOT
      const auction = await query("select * from auctions where id = ?", [
        req.params.id,
      ]);
      if (!auction[0]) {
        res.status(404).json({ ms: "auction not found !" });
      }

      // 3- PREPARE AUCTION OBJECT
      const auctionObj = {
        name: req.body.name,
        description: req.body.description,
      };

      if (req.file) {
        auctionObj.image_url = req.file.filename;
        fs.unlinkSync("./upload/" + auction[0].image_url); // delete old image
      }

      // 4- UPDATE AUCTION
      await query("update auctions set ? where id = ?", [auctionObj, auction[0].id]);

      res.status(200).json({
        msg: "auction updated successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// DELETE AUCTION [SELLER]
router.delete(
  "/:id", // params
  seller,
  async (req, res) => {
    try {
      // 1- CHECK IF MOVIE EXISTS OR NOT
      const query = util.promisify(conn.query).bind(conn);
      const auction = await query("select * from auctions where id = ?", [
        req.params.id,
      ]);
      if (!auction[0]) {
        res.status(404).json({ ms: "auction not found !" });
      }
      // 2- REMOVE MOVIE IMAGE
      //fs.unlinkSync("./upload/" + auction[0].image_url); // delete old image
      await query("delete from auctions where id = ?", [auction[0].id]);
      res.status(200).json({
        msg: "auction delete successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// LIST & SEARCH [SELLER,BIDDER]
router.get("", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  let search = "";
  if (req.query.search) {
    // QUERY PARAMS
    search = `where name LIKE '%${req.query.search}%' or description LIKE '%${req.query.search}%'`;
  }
  const auctions = await query(`select * from auctions ${search}`);
  auctions.map((auction) => {
    auction.image_url = "http://" + req.hostname + ":4000/" + auction.image_url;
  });
  res.status(200).json(auctions);
});

// SHOW AUCTION [SELLER,BIDDER]
router.get("/:id", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  const auction = await query("select * from auctions where id = ?", [
    req.params.id,
  ]);
  if (!auction[0]) {
    res.status(404).json({ ms: "auction not found !" });
  }
  auction[0].image_url = "http://" + req.hostname + ":4000/" + auction[0].image_url;
  auction[0].bids = await query(
    "select * from user_auction_bid where auction_id = ?",
    auction[0].id
  );
  res.status(200).json(auction[0]);
});

// MAKE BID [BIDDER]
router.post(
  "/bid",
  authorized,
  body("auction_id").isNumeric().withMessage("please enter a valid auction ID"),
  body("bid").isString().withMessage("please enter a valid bid"),
  async (req, res) => {
    try {
      const query = util.promisify(conn.query).bind(conn);
      // 1- VALIDATION REQUEST [manual, express validation]
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 2- CHECK IF AUCTION EXISTS OR NOT
      const auction = await query("select * from auctions where id = ?", [
        req.body.auction_id,
      ]);
      if (!auction[0]) {
        res.status(404).json({ ms: "auction not found !" });
      }

      // 3 - PREPARE AUCTION BID OBJECT
      const auctionObj = {
        user_id: res.locals.user.id,
        auction_id: auction[0].id,
        bid: req.body.bid,
      };

      // 4- INSERT AUCTION OBJECT INTO DATABASE
      await query("insert into user_auction_bid set ?", auctionObj);

      res.status(200).json({
        msg: "bid added successfully !",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

module.exports = router;
