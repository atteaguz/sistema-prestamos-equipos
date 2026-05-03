import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController";
import { validateRequest } from "../middleware/validateRequests";
import { createUpdateUsuarioDto } from "../dtos/UsuarioDto";
import { checkRole } from "../middleware/role";
import { checkJWT } from "../middleware/jwt";

const ROUTES = Router();

// Ruta para listar todos los usuarios (todos)
ROUTES.get(
  "/",
  checkJWT,
  checkRole(["admin","user","funcionario"]),
  UsuarioController.getAllUsuarios
);

// Ruta para listar usuario por ID (todos)
ROUTES.get(
  "/:id",
  checkJWT,
  checkRole(["admin","user","funcionario"]),
  UsuarioController.getUsuarioById
);

// Ruta para crear usuario (solo admin y user)
ROUTES.post(
  "/",
  checkJWT,
  checkRole(["admin","user"]),
  validateRequest({ body: createUpdateUsuarioDto }),
  UsuarioController.createUsuarios
);

// Ruta para modificar usuario (solo admin)
ROUTES.patch(
  "/:id",
  checkJWT,
  checkRole(["admin"]),
  validateRequest({ body: createUpdateUsuarioDto }),
  UsuarioController.updateUsuario
);

// Ruta para eliminar usuario (solo admin)
ROUTES.delete(
  "/:id",
  checkJWT,
  checkRole(["admin"]),
  UsuarioController.deleteUsuario
);

export default ROUTES;