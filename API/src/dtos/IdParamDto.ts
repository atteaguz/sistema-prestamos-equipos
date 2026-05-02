import { Type } from "class-transformer";
import { IsInt, Min } from "class-validator";

// DTO para validar el parámetro de ID en rutas que lo requieran
export class IdParamDto {
  @Type(() => Number)
  @IsInt({ message: "El ID debe ser un número entero" })
  @Min(1, { message: "El ID debe ser un número entero positivo" })
  id!: number;
}
