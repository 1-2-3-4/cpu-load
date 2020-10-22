const express = require('express');
const router = express.Router();
const os = require('os');

router.get('/', function(req, res, next) {
  const cpus = os.cpus().length
  const loadAverage = os.loadavg()[0] / cpus
  res.send({'loadAverage': loadAverage})
});

module.exports = router;