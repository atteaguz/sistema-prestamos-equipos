import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Equipo } from "./Equipo";
import { Usuario } from "./Usuario";

// Definición de la entidad Prestamo que representa la tabla "tbprestamos" en la base de datos
@Entity({ name: "tbprestamos" })
export class Prestamo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Equipo)
  equipo: Equipo;

  @ManyToOne(() => Usuario)
  usuario: Usuario;

  @Column({ default: 1 })
  cantidad: number;

  @Column({ type: "date", name: "fecha_prestamo" })
  fechaPrestamo: Date;

  @Column({ type: "date", name: "fecha_devolucion", nullable: true })
  fechaDevolucion: Date | null;

  @Column({ type: "enum", enum: ["activo", "devuelto", "vencido"], default: "activo" })
  estadoPrestamo: string;
}