import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// Definición de la entidad Categorias que representa la tabla "tbcategorias" en la base de datos
@Entity({ name: "tbcategorias" })
export class Categorias {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true, nullable: false })
  nombre: string;

  @Column({ length: 500, nullable: true, default: null })
  descripcion: string;
  
  @Column({ default: true, nullable: false })
  estado: boolean;
}
