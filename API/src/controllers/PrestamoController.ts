import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Prestamo } from "../entities/Prestamo";
import { Equipo } from "../entities/Equipo";
import { PrestamoMapper } from "../mappers/PrestamoMapper";

export class PrestamoController {
  // Metodo para obtener todos los préstamos
  static getAllPrestamos = async (req: Request, res: Response) => {
    try {
      const repo = AppDataSource.getRepository(Prestamo);
      const prestamos = await repo.find({ 
        relations: ["equipo", "usuario"]
      });
      
      return res.status(200).json(PrestamoMapper.toResponseDtoList(prestamos));
    } catch (error) {
      return res.status(500).json({ message: "Error al obtener préstamos" });
    }
  };

  // Metodo para obtener un préstamo por ID
  static getPrestamosById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const repo = AppDataSource.getRepository(Prestamo);
      const prestamo = await repo.findOne({ 
        where: { id: Number(id) },
        relations: ["equipo", "usuario"]
      });

      if (!prestamo) {
        return res.status(404).json({ message: "Préstamo no encontrado" });
      }

      return res.status(200).json(PrestamoMapper.toResponseDto(prestamo));
    } catch (error) {
      return res.status(500).json({ message: "Error al obtener préstamo" });
    }
  };

  // Metodo para crear un nuevo préstamo
  static createPrestamos = async (req: Request, res: Response) => {
    try {
      const { equipoId, usuarioId, cantidad, fechaPrestamo } = req.body;
      
      const equipoRepo = AppDataSource.getRepository(Equipo);
      const equipo = await equipoRepo.findOneBy({ id: equipoId });
      
      if (!equipo || equipo.stockDisponible < cantidad) {
        return res.status(400).json({ message: "Stock insuficiente" });
      }
      
      // Actualizar stock disponible
      equipo.stockDisponible -= cantidad;
      await equipoRepo.save(equipo);
      
      const prestamoRepo = AppDataSource.getRepository(Prestamo);
      const nuevoPrestamo = new Prestamo();
      nuevoPrestamo.equipo = equipoId;
      nuevoPrestamo.usuario = usuarioId;
      nuevoPrestamo.cantidad = cantidad;
      nuevoPrestamo.fechaPrestamo = fechaPrestamo;
      nuevoPrestamo.estadoPrestamo = "activo";
      
      await prestamoRepo.save(nuevoPrestamo);
      return res.status(201).json({ message: "Préstamo registrado con éxito" });
    } catch (error) {
      return res.status(500).json({ message: "Error al crear préstamo" });
    }
  };

  // Metodo para devolver un préstamo
  static devolverPrestamos = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const prestamoRepo = AppDataSource.getRepository(Prestamo);
      
      const prestamo = await prestamoRepo.findOne({ 
        where: { id: Number(id) },
        relations: ["equipo"]
      });
      
      if (!prestamo || prestamo.estadoPrestamo !== "activo") {
        return res.status(400).json({ message: "Préstamo no válido para devolución" });
      }
      
      const equipoRepo = AppDataSource.getRepository(Equipo);
      const equipo = await equipoRepo.findOneBy({ id: prestamo.equipo?.id });
      
      if (equipo) {
        equipo.stockDisponible += prestamo.cantidad;
        await equipoRepo.save(equipo);
      }
      
      prestamo.estadoPrestamo = "devuelto";
      prestamo.fechaDevolucion = new Date();
      await prestamoRepo.save(prestamo);
      
      return res.status(200).json({ message: "Equipo devuelto con éxito" });
    } catch (error) {
      return res.status(500).json({ message: "Error al devolver equipo" });
    }
  };
}