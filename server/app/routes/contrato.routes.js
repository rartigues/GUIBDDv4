module.exports = app => {
    const users = require("../controllers/users.controller.js");
  
    var router = require("express").Router();
  
    // // Create a new User
    // router.post("/", users.create);

    // // Retrieve all Users
    // router.get("/", users.findAll);

    // // Conseguir empleado por rut
    // router.get("/:rut", users.findOne);

    // Conseguir todos los contratos
    router.get("/", users.findAllContrato);

    // Conseguir cargo de contrato por rut
    router.get("/:rut", users.findOneContrato);

    // // Cambiar estado de un empleado
    // router.put("/", users.changeEstado);

    // // Retrieve a single User with email
    // router.get("/:user_email", users.findOneUser);

    // // Update User by id
    // router.put("/:user_id", users.updateUser);

    // // Delete a User with the specified id in the request
    // router.delete("/:user_id", users.deleteUser);

    // // Delete all Users
    // router.delete("/", users.deleteAllUsers);

    app.use('/api/contrato', router);
};