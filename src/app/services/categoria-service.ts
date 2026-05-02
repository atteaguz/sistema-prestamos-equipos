import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorias } from '../models/categoria.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { enviroment } from '../../enviroments';

@Injectable({
  providedIn: 'root',
})

export class CategoriaService {

  private http= inject(HttpClient);
  private apiUrl = `${enviroment.apiUrl}${enviroment.endpoints.categorias}`;

  // Obtener todas las categorias
  getCategorias(): Observable<Categorias[]> {
    return this.http.get<Categorias[]>(this.apiUrl);
  }

  // Obtener categoria por ID
  getCategoriaById(id: number): Observable<Categorias> {
    return this.http.get<Categorias >(`${this.apiUrl}/${id}`);
  }

  // Crear nueva categoria
  crearCategoria(categoria: Categorias): Observable<Categorias> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({token: token});
    return this.http.post<Categorias>(this.apiUrl, categoria, { headers: headers });
  }

  // Modificar categoria existente
  modificarCategoria(categoria: Categorias): Observable<Categorias> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({token: token});
    return this.http.patch<Categorias>(`${this.apiUrl}/${categoria.id}`, categoria, { headers: headers });
  }

  // Eliminar categoria
  eliminarCategoria(id: number): Observable<void> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({token: token});
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: headers });
  }
}
