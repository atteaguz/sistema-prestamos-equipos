import { Request, Response } from "express";
import { Categorias } from "../entities/Categorias";
import { AppDataSource } from "../data-source";
import { CategoriaMapper } from "../mappers/CategoriasMapper";
import { Not } from "typeorm/find-options/operator/Not.js";

class CategoriaController {
  // Metodo para obtener todas las categorías activas
  static getAllCategorias = async (req: Request, res: Response) => {
    try {
      const repo = AppDataSource.getRepository(Categorias);
      const listaCategorias = await repo.find({ where: { estado: true } });

      //verificar si hay categorías
      if (listaCategorias.length === 0) {
        return res
          .status(404)
          .json({ message: "No hay categorías registradas" });
      }

      //enviar la lista de categorías
      return res
        .status(200)
        .json(CategoriaMapper.toResponseDtoList(listaCategorias));

    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error al obtener las categorías" });
    }
  };

  // Metodo para obtener una categoría por su ID
  static getCategoriaById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const repo = AppDataSource.getRepository(Categorias);
      const categoria = await repo.findOneBy({ id: Number(id), estado: true });

      //verificar si la categoría existe
      if (!categoria) {
        return res.status(404).json({ message: "Categoría no encontrada" });
      }

      //enviar la categoría
      return res.status(200).json(CategoriaMapper.toResponseDto(categoria));
    } catch (error) {
      return res.status(500).json({ message: "Error al obtener la categoría" });
    }
  };

  // Metodo para crear una nueva categoría
  static createCategorias = async (req: Request, res: Response) => {
    try {
      const { nombre, descripcion } = req.body;
      const repo = AppDataSource.getRepository(Categorias);
      const categoriaExistente = await repo.findOneBy({
        nombre: nombre,
        estado: true,
      });
      if (categoriaExistente) {
        return res
          .status(400)
          .json({ message: "Ya existe una categoría con ese nombre" });
      }

      //crear una nueva instancia de Categoría
      const nuevaCategoria = repo.create({
        nombre: nombre,
        descripcion: descripcion,
        estado: true,
      });
      await repo.save(nuevaCategoria);

      return res
        .status(201)
        .json(CategoriaMapper.toResponseDto(nuevaCategoria));
    } catch (error) {
      return res.status(500).json({ message: "Error al crear la categoría" });
    }
  };

  // Metodo para actualizar una categoría existente
  static updateCategorias = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { nombre, descripcion } = req.body;
      const repo = AppDataSource.getRepository(Categorias);
      const categoria = await repo.findOneBy({ id: Number(id) });

      // Verificar si la categoría existe
      if (!categoria) {
        return res.status(404).json({ message: "Categoría no encontrada" });
      }

      // Verificar si el nuevo nombre ya existe en otra categoría
      const categoriaExistente = await repo.findOne({
      where: {
        nombre: nombre,
        estado: true,
        id: Not(Number(id))
      }
    });
      if (categoriaExistente) {
        return res
          .status(400)
          .json({ message: "Ya existe una categoría con ese nombre" });
      }

      categoria.nombre = nombre;
      categoria.descripcion = descripcion;

      await repo.save(categoria);

      return res.status(200).json(CategoriaMapper.toResponseDto(categoria));
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error al modificar la categoría" });
    }
  };

  // Metodo para borrar una categoría (borrado logico)
  static deleteCategorias = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const repo = AppDataSource.getRepository(Categorias);
      const categoria = await repo.findOneBy({ id: Number(id) });
      
      // Verificar si la categoría existe
      if (!categoria) {
        return res.status(404).json({ message: "Categoría no encontrada" });
      }
      
      // borrado lógico
      categoria.estado = false;
      
      // Guardra los cambios en la base de datos
      await repo.save(categoria);

      return res
        .status(200)
        .json({ message: "Categoría eliminada exitosamente" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error al eliminar la categoría" });
    }
  };
}
export default CategoriaController;
