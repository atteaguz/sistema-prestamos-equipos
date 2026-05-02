import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Prestamo, PrestamoResponse } from '../models/prestamo.model';
import { enviroment } from '../../enviroments';

@Injectable({
  providedIn: 'root',
})
export class PrestamoService {
  private http = inject(HttpClient);
  private apiUrl = `${enviroment.apiUrl}${enviroment.endpoints.prestamos}`;

  // Obtener todos los prestamos
  getPrestamos(): Observable<PrestamoResponse[]> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({ token: token });
    return this.http.get<PrestamoResponse[]>(this.apiUrl, { headers: headers });
  }

  // Obtener prestamo por ID
  getPrestamoById(id: number): Observable<PrestamoResponse> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({ token: token });
    return this.http.get<PrestamoResponse>(`${this.apiUrl}/${id}`, { headers: headers });
  }

  // Crear nuevo prestamo
  crearPrestamo(prestamo: Prestamo): Observable<{ message: string }> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({ token: token });
    return this.http.post<{ message: string }>(this.apiUrl, prestamo, { headers: headers });
  }

  // Devolver prestamo
  devolverPrestamo(id: number): Observable<{ message: string }> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({ token: token });
    return this.http.post<{ message: string }>(`${this.apiUrl}/${id}/devolver`, {}, { headers: headers });
  }
}