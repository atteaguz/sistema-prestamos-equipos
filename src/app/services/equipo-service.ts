import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Equipo, EquipoResponse } from '../models/equipo.model';
import { enviroment } from '../../enviroments';

@Injectable({
  providedIn: 'root',
})
export class EquipoService {
  private http = inject(HttpClient);
  private apiUrl = `${enviroment.apiUrl}${enviroment.endpoints.equipos}`;

  // Obtener todos los equipos
  getEquipos(): Observable<EquipoResponse[]> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({ token: token });
    return this.http.get<EquipoResponse[]>(this.apiUrl, { headers });
  }

  // Obtener equipo por ID
  getEquipoById(id: number): Observable<EquipoResponse> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({ token: token });
    return this.http.get<EquipoResponse>(`${this.apiUrl}/${id}`, { headers });
  }

  // Crear nuevo equipo
  crearEquipo(equipo: Equipo): Observable<{ message: string }> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({ token: token });
    return this.http.post<{ message: string }>(this.apiUrl, equipo, { headers });
  }

  // Modificar equipo existente
  modificarEquipo(equipo: Equipo): Observable<{ message: string }> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({ token: token });
    return this.http.patch<{ message: string }>(`${this.apiUrl}/${equipo.id}`, equipo, { headers });
  }

  // Eliminar equipo
  eliminarEquipo(id: number): Observable<{ message: string }> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({ token: token });
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`, { headers });
  }
}