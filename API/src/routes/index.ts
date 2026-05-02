import { Router } from "express";
import auth from "./auth";
import categorias from "./categorias";
import usuario from "./usuario";
import prestamo from "./prestamo";
import equipo from "./equipo";

// Rutas principales de la API
const ROUTES = Router();
ROUTES.use("/auth", auth);
ROUTES.use("/usuarios", usuario);
ROUTES.use("/categorias", categorias);
ROUTES.use("/equipos", equipo);
ROUTES.use("/prestamos", prestamo);

export default ROUTES;
