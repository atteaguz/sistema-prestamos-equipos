import "reflect-metadata";
import { DataSource } from "typeorm";
import { Usuario } from "./entities/Usuario";
import { Categorias } from "./entities/Categorias";
import { Equipo } from "./entities/Equipo";
import { Prestamo } from "./entities/Prestamo";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "1234",
  database: "sistema-prestamos-equipos", // DB existente
  synchronize: false, // true: solo para crear entidades en DB, false: durante modificaciones en codigo y pruebas
  logging: false,
  entities: [Usuario, Categorias, Equipo, Prestamo], //Entidades a crear en la BD
});
