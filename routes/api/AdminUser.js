const { getAllUser, createUser, EditUser, deleteUser, getUser } = require('../../controllers/AdminController');

const router = require('express').Router();

router.route('/')
    .get(getAllUser)
    .post(createUser)
    .patch(EditUser)
    .delete(deleteUser)


router.route('/:id')
.get(getUser);


module.exports = router;
