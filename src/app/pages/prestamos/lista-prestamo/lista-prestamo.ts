import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { PrestamoService } from '../../../services/prestamo-service';
import { PrestamoResponse } from '../../../models/prestamo.model';
import { MATERIAL_IMPORTS } from '../../../shared/material-imports';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { PrestamoForm } from '../prestamo-form/prestamo-form';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-prestamo',
  imports: [...MATERIAL_IMPORTS],
  templateUrl: './lista-prestamo.html',
  styleUrl: './lista-prestamo.scss',
})

export class ListaPrestamo implements OnInit {
  private prestamoService = inject(PrestamoService);
  private dialog = inject(MatDialog);
  private toastr = inject(ToastrService);

  displayedColumns: string[] = ['id', 'equipoNombre', 'usuarioNombre', 'cantidad', 'fechaPrestamo', 'estadoPrestamo', 'acciones'];
  dataSource = new MatTableDataSource<PrestamoResponse>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadPrestamos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Metodo para cargar los préstamos desde el servicio
  loadPrestamos(): void {
    this.prestamoService.getPrestamos().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.toastr.success('Préstamos cargados', 'Éxito');
      },
      error: (error) => {
        this.toastr.error('Error al cargar préstamos', 'Error');
        console.error(error);
      },
    });
  }

  // Metodo para aplicar filtro en la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Metodo para abrir el formulario de creación de préstamo
  crearPrestamo(): void {
    const dialogRef = this.dialog.open(PrestamoForm, {
      width: '600px',
      height: 'auto',
      data: { prestamo: null, isModificar: false },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.prestamoService.crearPrestamo(result).subscribe({
          next: () => {
            this.toastr.success('Préstamo registrado exitosamente', 'Éxito');
            this.loadPrestamos();
          },
          error: (error) => {
            this.toastr.error(error.error?.message || 'Error al registrar préstamo', 'Error');
          },
        });
      }
    });
  }

  // Metodo para devolver un préstamo
  devolverPrestamo(prestamo: PrestamoResponse): void {
    if (confirm(`¿Devolver ${prestamo.equipoNombre} (${prestamo.cantidad} unidad/es)?`)) {
      this.prestamoService.devolverPrestamo(prestamo.id).subscribe({
        next: () => {
          this.toastr.success('Equipo devuelto exitosamente', 'Éxito');
          this.loadPrestamos();
        },
        error: (error) => {
          this.toastr.error(error.error?.message || 'Error al devolver equipo', 'Error');
        },
      });
    }
  }
}