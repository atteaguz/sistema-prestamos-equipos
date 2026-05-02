// Modelo de datos para la entidad "Prestamo"
export interface Prestamo {
  id: number;
  equipoId: number;
  equipoNombre?: string;
  usuarioId: number;
  cantidad: number;
  fechaPrestamo: string;
  fechaDevolucion?: string | null;
  estadoPrestamo: 'activo' | 'devuelto' | 'vencido';
}

export interface PrestamoResponse {
  id: number;
  equipoId: number;
  equipoNombre: string;
  usuarioId: number;
  usuarioNombre: string;
  cantidad: number;
  fechaPrestamo: string;
  fechaDevolucion?: string | null;
  estadoPrestamo: string;
}