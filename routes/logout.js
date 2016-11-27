'use strict';

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.post("/", (req, res) => {
    req.session.destroy()
    res.redirect("/");
  });
  // returns information
  return router;
}
