import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categorias } from "./Categorias";

// Definición de la entidad Equipo que representa la tabla "tbequipos" en la base de datos
@Entity({ name: "tbequipos" })
export class Equipo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  nombre: string;

  @Column({ type: "text", nullable: true })
  descripcion: string;

  @ManyToOne(() => Categorias)
  categoria: Categorias;

  @Column({ name: "stock_total", default: 1 })
  stockTotal: number;

  @Column({ name: "stock_disponible", default: 1 })
  stockDisponible: number;

  @Column({ default: true })
  estado: boolean;
}