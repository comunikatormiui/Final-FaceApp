'use strict';

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.post("/", (req, res) => {
    req.session = null;
    res.redirect("/images/new");
  });
  // returns information
  return router;
}
