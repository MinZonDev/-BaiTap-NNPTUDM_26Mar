const express = require('express');
const router = express.Router();
const UserModel = require('../schemas/user');
const ResHelper = require('../helper/ResponseHelper');

router.get('/', async function (req, res, next) {
  try {
    const users = await UserModel.find({});
    ResHelper.RenderRes(res, true, users);
  } catch (error) {
    ResHelper.RenderRes(res, false, error);
  }
});


router.get('/:id', async function (req, res, next) {
  try {
    const user = await UserModel.findById(req.params.id);
    ResHelper.RenderRes(res, true, user);
  } catch (error) {
    ResHelper.RenderRes(res, false, error);
  }
});

router.post('/', async function (req, res, next) {
  try {
    const newUser = new UserModel(req.body);
    await newUser.save();
    ResHelper.RenderRes(res, true, newUser);
  } catch (error) {
    ResHelper.RenderRes(res, false, error);
  }
});

router.put('/:id', async function (req, res, next) {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    ResHelper.RenderRes(res, true, updatedUser);
  } catch (error) {
    ResHelper.RenderRes(res, false, error);
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    ResHelper.RenderRes(res, true, deletedUser);
  } catch (error) {
    ResHelper.RenderRes(res, false, error);
  }
});

module.exports = router;
