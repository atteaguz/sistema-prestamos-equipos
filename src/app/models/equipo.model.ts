// Modelo de datos para la entidad "Equipo"
export interface CategoriaSimplificada {
  id: number;
  nombre: string;
}

export interface Equipo {
  id: number;
  nombre: string;
  descripcion: string;
  categoriaId: number;
  categoriaNombre?: string;
  stockTotal: number;
  stockDisponible: number;
  estado: boolean;
}

export interface EquipoResponse {
  id: number;
  nombre: string;
  descripcion?: string;
  categoriaId: number;
  categoriaNombre: string;
  stockTotal: number;
  stockDisponible: number;
  estado: boolean;
}