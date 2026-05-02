import { EquipoResponseDto } from "../dtos/EquipoDto";
import { Equipo } from "../entities/Equipo";

// Mapper para convertir entre la entidad Equipo y el DTO EquipoResponseDto
export class EquipoMapper {
  static toResponseDto(entity: Equipo): EquipoResponseDto {
    return {
      id: entity.id,
      nombre: entity.nombre,
      descripcion: entity.descripcion,
      categoriaId: entity.categoria?.id,
      categoriaNombre: entity.categoria?.nombre,
      stockTotal: entity.stockTotal,
      stockDisponible: entity.stockDisponible,
      estado: entity.estado,
    };
  }

  // Método para convertir una lista de entidades Equipo a una lista de DTOs EquipoResponseDto
  static toResponseDtoList(entities: Equipo[]): EquipoResponseDto[] {
    return entities.map(e => this.toResponseDto(e));
  }
}