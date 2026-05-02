import { IsNotEmpty, IsInt, Min, IsDateString, IsOptional, IsEnum } from "class-validator";

export class PrestamoResponseDto {
  id!: number;
  equipoId!: number;
  equipoNombre!: string;
  usuarioId!: number;
  usuarioNombre!: string;
  cantidad!: number;
  fechaPrestamo!: Date;
  fechaDevolucion?: Date | null;
  estadoPrestamo!: string;
}

// DTO para crear o actualizar un préstamo
export class CreateUpdatePrestamoDto {
  @IsNotEmpty({ message: "El equipo es obligatorio" })
  @IsInt()
  equipoId!: number;

  @IsNotEmpty({ message: "El usuario es obligatorio" })
  @IsInt()
  usuarioId!: number;

  @IsNotEmpty({ message: "La cantidad es obligatoria" })
  @IsInt()
  @Min(1, { message: "La cantidad mínima es 1" })
  cantidad!: number;

  @IsNotEmpty({ message: "La fecha de préstamo es obligatoria" })
  @IsDateString()
  fechaPrestamo!: Date;

  @IsOptional()
  @IsDateString()
  fechaDevolucion?: Date | null;
}