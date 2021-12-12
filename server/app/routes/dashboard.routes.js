const router = require("express").Router();
const db= require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;
const authorization= require("../middleware/authorization");

router.get("/",  async (req, res) => {
    try {
        const user = await Users.findOne({
            where: {user_id: req.user.user_id},
            attributes: ["user_name"]
        });
        res.json(user);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})






module.exports = router;