const express  = require('express')
const router  = express.Router()

router.get('/', function(req, res) {
 res.status(200).send({data:"working fine"})
});

router.post('/', function(req, res) {
  res.status(200).send({data:"delete working  fine"})
 });
 router.delete('/:id', function(req, res) {
  return res.status(401).send({data:"delete working  fine"})
 });

module.exports = {router}