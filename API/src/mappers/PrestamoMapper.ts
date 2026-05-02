import { PrestamoResponseDto } from "../dtos/PrestamoDto";
import { Prestamo } from "../entities/Prestamo";

// Mapper para convertir entre la entidad Prestamo y el DTO PrestamoResponseDto
export class PrestamoMapper {
  static toResponseDto(entity: Prestamo): PrestamoResponseDto {
    return {
      id: entity.id,
      equipoId: entity.equipo?.id,
      equipoNombre: entity.equipo?.nombre,
      usuarioId: entity.usuario?.id,
      usuarioNombre: entity.usuario?.username,
      cantidad: entity.cantidad,
      fechaPrestamo: entity.fechaPrestamo,
      fechaDevolucion: entity.fechaDevolucion,
      estadoPrestamo: entity.estadoPrestamo,
    };
  }

  // Método para convertir una lista de entidades Prestamo a una lista de DTOs PrestamoResponseDto
  static toResponseDtoList(entities: Prestamo[]): PrestamoResponseDto[] {
    return entities.map(p => this.toResponseDto(p));
  }
}