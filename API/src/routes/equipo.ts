import { Router } from "express";
import { EquipoController } from "../controllers/EquipoController";
import { checkJWT } from "../middleware/jwt";
import { IdParamDto } from "../dtos/IdParamDto";
import { checkRole } from "../middleware/role";
import { validateRequest } from "../middleware/validateRequests";
import { CreateUpdateEquipoDto } from "../dtos/EquipoDto";

const router = Router();

// Ruta para listar todos los equipos (Todos los usuarios tienen acceso)
router.get("/",EquipoController.getAllEquipos);

// Ruta para listar equipos por ID (Todos los usuarios tienen acceso)
router.get("/:id", validateRequest({ params: IdParamDto }), EquipoController.getEquiposById);

// Ruta para crear equipos (Solo admin y user tienen acceso)
router.post("/", [checkJWT, checkRole(["admin","user"]), validateRequest({ body: CreateUpdateEquipoDto }), EquipoController.createEquipos]);

// Ruta para modificar equipos (Solo admin y user tienen acceso)
router.patch("/:id", [checkJWT, checkRole(["admin","user"]), validateRequest({ params: IdParamDto, body: CreateUpdateEquipoDto }), EquipoController.updateEquipos]);

// Ruta para eliminar equipos (Solo admin tiene acceso)
router.delete("/:id", [checkJWT, checkRole(["admin"]), validateRequest({ params: IdParamDto }), EquipoController.deleteEquipos]);

export default router;