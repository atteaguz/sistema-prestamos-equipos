import { Router } from "express";
import { PrestamoController } from "../controllers/PrestamoController";
import { checkJWT } from "../middleware/jwt";
import { checkRole } from "../middleware/role";
import { validateRequest } from "../middleware/validateRequests";
import { IdParamDto } from "../dtos/IdParamDto";
import { CreateUpdatePrestamoDto } from "../dtos/PrestamoDto";

const router = Router();

// Ruta para listar todos los préstamos (Todos los usuarios tienen acceso)
router.get("/", PrestamoController.getAllPrestamos);

// Ruta para listar préstamos por ID (Todos los usuarios tienen acceso)
router.get("/:id", validateRequest({ params: IdParamDto }), PrestamoController.getPrestamosById);

// Ruta para crear préstamos (Solo admin y user tienen acceso)
router.post("/", [checkJWT, checkRole(["admin","user","funcionario"]), validateRequest({ body: CreateUpdatePrestamoDto }), PrestamoController.createPrestamos]);

// Ruta para eliminar/devolver préstamos (Solo admin y user tienen acceso)
router.post("/:id/devolver", [checkJWT, checkRole(["admin","user"]), validateRequest({ params: IdParamDto }), PrestamoController.devolverPrestamos]);

export default router;