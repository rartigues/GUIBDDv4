const router = require("express").Router();
const db= require("../models");
const Users = db.users;
// const jwtGenerator = require("../utils/jwtGenerator");
// const validInfo = require("../middleware/validInfo");
// const authorization = require("../middleware/authorization");

//registro
router.post("/register", validInfo, async (req, res) => {
    try {
        //Conseguir nombre, email y password
        const {user_name, user_email, user_password }= req.body;
        // Revisar si existe el usuario
        const user= await Users.findOne({where: {user_email}});
        if (user) {
            return res.status(401).json({ msg: "El usuario ya existe" });
        }
        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user_password, salt);
        // Ingresar nuevo usuario a la base de datos
        await Users.create({
            user_name,
            user_email,
            user_password: hashPassword
        });
        //res.status(200).json({ msg: "Usuario registrado" });
        // Generar jwt token
        const ingresado = await Users.findOne({where: {user_email}});
        const token = jwtGenerator(ingresado.user_id);
        res.status(200).json({token});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//login 
router.post("/login", validInfo, async (req, res) => {
    try {
        //Conseguir email y password
        const {user_email, user_password }= req.body;
        // Revisar si existe el usuario
        const user= await Users.findOne({where: {user_email}});
        if (!user) {
            return res.status(401).json({msg: "El usuario no existe"});
        }
        // Revisar el password
        const validPass = await bcrypt.compare(user_password, user.user_password);
        if (!validPass) {
            return res.status(401).json({msg: "Contraseña incorrecta"});
        }
        // Generar jwt token
        const ingresado = await Users.findOne({where: {user_email}});
        const token = jwtGenerator(ingresado.user_id);
        res.status(200).json({token});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//verificar
router.get("/verify", authorization, async (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});




module.exports = router;