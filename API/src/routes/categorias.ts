import { Router } from "express";
import CategoriaController from "../controllers/CategoriasController";
import { validateRequest } from "../middleware/validateRequests";
import { createUpdateCategoriaDto } from "../dtos/CategoriaDto";
import { IdParamDto } from "../dtos/IdParamDto";
import { checkJWT } from "../middleware/jwt";
import { checkRole } from "../middleware/role";

const ROUTES = Router();

// Ruta para listar todas categorías (Todos los usuarios tienen acceso)
ROUTES.get("/",CategoriaController.getAllCategorias);

// Ruta para listar categorías por ID (Todos los usuarios tienen acceso)
ROUTES.get(
  "/:id",
  [
    validateRequest({ params: IdParamDto }),
  ],
  CategoriaController.getCategoriaById,
);

// Ruta para crear categorías (Solo admin y user tienen acceso)
ROUTES.post(
  "/",
  [
    checkJWT,
    checkRole(["admin","user"]),
    validateRequest({ body: createUpdateCategoriaDto }),
  ],
  CategoriaController.createCategorias,
);

// Ruta para modificar categorías (Solo admin y user tienen acceso)
ROUTES.patch(
  "/:id",
  [
    checkJWT,
    checkRole(["admin","user"]),
    validateRequest({ params: IdParamDto, body: createUpdateCategoriaDto }),
  ],
  CategoriaController.updateCategorias,
);

// Ruta para eliminar categorías (Solo admin tiene acceso)
ROUTES.delete(
  "/:id",
  [
    checkJWT,
    checkRole(["admin"]),
    validateRequest({ params: IdParamDto }),
  ],
  CategoriaController.deleteCategorias,
);

export default ROUTES;
