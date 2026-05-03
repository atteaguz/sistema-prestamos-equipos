import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Equipo } from "../entities/Equipo";
import { EquipoMapper } from "../mappers/EquipoMapper";

export class EquipoController {
  
  // Metodo para obtener todos los equipos
  static getAllEquipos = async (req: Request, res: Response) => {
    try {
      const repo = AppDataSource.getRepository(Equipo);
      const equipos = await repo.find({ 
        where: { estado: true },
        relations: ["categoria"]
      });
      
      if (equipos.length === 0) {
        return res.status(404).json({ message: "No hay equipos registrados" });
      }
      
      return res.status(200).json(EquipoMapper.toResponseDtoList(equipos));
    } catch (error) {
      return res.status(500).json({ message: "Error al obtener equipos" });
    }
  };

  // Metodo para obtener un equipo por su ID
  static getEquiposById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const repo = AppDataSource.getRepository(Equipo);
      const equipo = await repo.findOne({ 
        where: { id: Number(id), estado: true },
        relations: ["categoria"]
      });
      
      if (!equipo) {
        return res.status(404).json({ message: "Equipo no encontrado" });
      }
      
      return res.status(200).json(EquipoMapper.toResponseDto(equipo));
    } catch (error) {
      return res.status(500).json({ message: "Error al obtener equipo" });
    }
  };

  // Metodo para crear un nuevo equipo
  static createEquipos = async (req: Request, res: Response) => {
    try {
      const { nombre, descripcion, categoriaId, stockTotal } = req.body;
      const repo = AppDataSource.getRepository(Equipo);
      
      const nuevoEquipo = new Equipo();
      nuevoEquipo.nombre = nombre;
      nuevoEquipo.descripcion = descripcion;
      nuevoEquipo.categoria = categoriaId;
      nuevoEquipo.stockTotal = stockTotal;
      nuevoEquipo.stockDisponible = stockTotal;
      await repo.save(nuevoEquipo);

      return res.status(201).json({ message: "Equipo creado con éxito" });
    } catch (error) {
      return res.status(500).json({ message: "Error al crear equipo" });
    }
  };

  // Metodo para actualizar un equipo existente
  static updateEquipos = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { nombre, descripcion, categoriaId, stockTotal } = req.body;
      const repo = AppDataSource.getRepository(Equipo);
      
      const equipo = await repo.findOneBy({ id: Number(id) });
      if (!equipo) {
        return res.status(404).json({ message: "Equipo no encontrado" });
      }
      
      equipo.nombre = nombre;
      equipo.descripcion = descripcion;
      equipo.categoria = categoriaId;
      equipo.stockTotal = stockTotal;
      equipo.stockDisponible = stockTotal;
      
      await repo.save(equipo);
      return res.status(200).json({ message: "Equipo actualizado con éxito" });
    } catch (error) {
      return res.status(500).json({ message: "Error al actualizar equipo" });
    }
  };

  // Metodo para eliminar un equipo (Borrado lógico)
  static deleteEquipos = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const repo = AppDataSource.getRepository(Equipo);
      
      const equipo = await repo.findOneBy({ id: Number(id) });
      if (!equipo) {
        return res.status(404).json({ message: "Equipo no encontrado" });
      }
      
      equipo.estado = false;
      await repo.save(equipo);
      return res.status(200).json({ message: "Equipo eliminado con éxito" });
    } catch (error) {
      return res.status(500).json({ message: "Error al eliminar equipo" });
    }
  };
}