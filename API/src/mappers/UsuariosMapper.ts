import { UsuarioResponseDto } from "../dtos/UsuarioDto";
import { Usuario } from "../entities/Usuario";

// Mapper para convertir entre la entidad Usuario y el DTO UsuarioResponseDto
export class UsuarioMapper {
  static toResponseDto(entity: Usuario): UsuarioResponseDto {
    return {
      id: entity.id,
      username: entity.username,
      role: entity.role,
      estado: entity.estado,
    };
  }

  // Método para convertir una lista de entidades Usuario a una lista de DTOs UsuarioResponseDto
  static toResponseDtoList(entities: Usuario[]): UsuarioResponseDto[] {
    return entities.map(this.toResponseDto);
  }
}
