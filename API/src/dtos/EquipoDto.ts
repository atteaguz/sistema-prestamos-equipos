import { IsNotEmpty, IsOptional, IsString, MaxLength, Min, IsInt } from "class-validator";

export class EquipoResponseDto {
  id!: number;
  nombre!: string;
  descripcion?: string;
  categoriaId!: number;
  categoriaNombre?: string;
  stockTotal!: number;
  stockDisponible!: number;
  estado!: boolean;
}

// DTO para crear o actualizar un equipo
export class CreateUpdateEquipoDto {
  @IsNotEmpty({ message: "El nombre es obligatorio" })
  @IsString({ message: "El nombre debe ser texto" })
  @MaxLength(150, { message: "Máximo 150 caracteres" })
  nombre!: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsNotEmpty({ message: "La categoría es obligatoria" })
  @IsInt({ message: "ID de categoría inválido" })
  categoriaId!: number;

  @IsOptional()
  @IsInt()
  @Min(0, { message: "El stock no puede ser negativo" })
  stockTotal!: number;
}