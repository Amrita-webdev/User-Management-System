"use strict";

var express = require('express');

var router = express.Router();

var userController = require('../controllers/userController'); // Routes


router.get('/', userController.view);
router.post('/', userController.find);
router.get('/adduser', userController.form);
router.post('/adduser', userController.create);
router.get('/edituser/:id', userController.edit);
router.post('/edituser/:id', userController.update);
router.get('/viewuser/:id', userController.viewall);
router.get('/:id', userController["delete"]);
module.exports = router;