// Modelo de datos para la entidad "Usuario"
export interface Usuario {
  id: number;
  username: string;
  password?: string;  // Opcional para respuestas
  role: 'admin' | 'user' | 'funcionario';
  estado: boolean;
}

export interface UsuarioResponse {
  id: number;
  username: string;
  role: string;
  estado: boolean;
}