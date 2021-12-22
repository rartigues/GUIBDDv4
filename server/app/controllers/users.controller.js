const db = require("../models");
const Empleado = db.empleado;
const Estado = db.estado;
const Departamento = db.departamento;
const Contrato= db.contrato
const Pago= db.pago
const Horas_semana= db.horas_semana
const Empezar= db.empezar
const Terminar= db.terminar
const Op = db.Sequelize.Op;





// !Crear nuevo empleado
exports.create = (req, res) => {
  //todo Validar input
  if (!req.body.rut) {
    res.status(400).send({
      message: "El RUT del empleado es requerido"
    });
    return;
  }
  if (!req.body.nombre) {
    res.status(400).send({
      message: "El nombre del empleado es requerido"
    });
    return;
  }
  if (!req.body.apellido) {
    res.status(400).send({
      message: "El apellido del empleado es requerido"
    });
    return;
  }
  if (!req.body.email) {
    res.status(400).send({
      message: "El email del empleado es requerido"
    });
    return;
  }

  //todo Crear nuevo empleado
  const input = {
    RUT: req.body.rut,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    fecha_nacimiento: req.body.fecha_nacimiento,
    telefono: req.body.telefono,
    email: req.body.email,
  }

  // console.log(db);
  // console.log(db.sequelize.models.empleado);
  //Para la BDD
  Empleado.create(input)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err|| "Error al crear un nuevo empleado."
      });
    });
}

//todo Listar todos los empleados
exports.findAll = (req, res) => {
  Empleado.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err|| "Error al listar todos los empleados."
      });
    });
}

//todo Buscar empleado por RUT
exports.findOne = (req, res) => {
  Empleado.findByPk(req.params.rut)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al buscar el empleado con RUT=" + req.params.RUT
      });
    });
}

//todo Eliminar un empleado
exports.delete = (req, res) => {
  Empleado.destroy({
    where: {
      RUT: req.params.rut
    }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Empleado eliminado correctamente."
        });
      } else {
        res.send({
          message: `Error al eliminar el empleado con RUT ${req.params.rut}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al eliminar el empleado."
      });
    });
}


//todo Conseguir todos los contratos
exports.findAllContrato = (req, res) => {
  Contrato.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err|| "Error al listar todos los contratos."
      });
    });
}

//todo Conseguir cargo de contrato por rut
exports.findOneContrato = (req, res) => {
  let RUT_e= req.params.rut;
  Contrato.findAll({
    where: {
      RUT_e: RUT_e
    }
  })
    .then(data => {
      res.send(data[0]);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al buscar el empleado con RUT=" + req.params.RUT
      });
    });

  
}

//todo Conseguir estado de un empleado

//todo Cambiar estado de un empleado
exports.changeEstado = (req, res) => {
  const input = {
    RUT_e: req.body.rut,
    estado: req.body.estado,
    fecha_fin_estado: req.body.fecha_fin_estado,
    dias_libres_restantes: req.body.dias_libres_restantes,
  }

  Empleado.update(input, {
    where: {
      RUT: req.body.rut
    }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Empleado actualizado correctamente."
        });
      } else {
        res.send({
          message: `Error al actualizar el empleado con RUT ${req.body.rut}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al actualizar el empleado."
      });
    });
}



// // Retrieve all Tutorials from the database.
// exports.findAll = (req, res) => {
//     const user_email = req.query.user_email;
//     var condition = user_email ? { user_email: { [Op.like]: `%${user_email}%` } } : null;
    
//     User.findAll({ where: condition })
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving tutorials."
//         });
//       });
//   };

// //find a user with a user_email
// exports.findOneUser = (req, res) => {
//     const user_email = req.params.user_email;
  
//     User.findOne({
//       where: { user_email: user_email }
//     })
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error retrieving User with email=" + user_email
//         });
//       });
//   };

// //find user_name by user_id
// exports.findOneName = (req, res) => {
//     const user_id = req.params.user_id;
  
//     User.findOne({
//       where: { user_id: user_id },
//       attributes: ['user_name']
//     })
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error retrieving User with id=" + user_id
//         });
//       });
// };


// // Find a single user with a user_id
// exports.findOne = (req, res) => {
//     const user_id = req.params.user_id;
  
//     User.findByPk(user_id)
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error retrieving User with id=" + user_id
//         });
//       });
//   };
// //Update user_password by user_id in the request
// exports.updateUser = (req, res) => {
//     const user_id = req.params.user_id;
  
//     User.update(req.body, {
//       where: { user_id: user_id }
//     })
//       .then(num => {
//         if (num == 1) {
//           res.send({
//             message: "User was updated successfully."
//           });
//         } else {
//           res.send({
//             message: `Cannot update User with id=${user_id}. Maybe User was not found or req.body is empty!`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error updating User with id=" + user_id
//         });
//       });
//   };


// //Delete a user with the specified id in the request
// exports.deleteUser = (req, res) => {
//     const user_id = req.params.user_id;
  
//     User.destroy({
//       where: { user_id: user_id }
//     })
//       .then(num => {
//         if (num == 1) {
//           res.send({
//             message: "User was deleted successfully!"
//           });
//         } else {
//           res.send({
//             message: `Cannot delete User with id=${user_id}. Maybe User was not found!`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Could not delete User with id=" + user_id
//         });
//       });
//   };




// // Delete all users from the database.
// exports.deleteAllUsers = (req, res) => {
//   const sure = req.query.sure;
//   if (sure == "yes") {
//     User.destroy({
//       where: {},
//       truncate: false,
//     })
//       .then((nums) => {
//         res.send({ message: `${nums} Users were deleted successfully!` });
//       })
//       .catch((err) => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while removing all users.",
//         });
//       });
//   } else {
//     res.send({ message: "No estas seguro de esta accion! (query sure = 'yes' para proceder)" });
//   } 

//   };

// Find a single Tutorial with an id
/*exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Tutorial.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Tutorial with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
  };*/

// Update a Tutorial by the id in the request
/*exports.update = (req, res) => {
    const id = req.params.id;
  
    Tutorial.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
  };*/

/*
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    User.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with id=" + id
        });
      });
  };*/

// Delete all Tutorials from the database.
/*exports.deleteAll = (req, res) => {
    Tutorial.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Tutorials were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials."
        });
      });
  };*/
// Find all published Tutorials
/*
exports.findAllPublished = (req, res) => {
    Tutorial.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };*/
