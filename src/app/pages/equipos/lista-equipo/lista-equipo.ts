import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { EquipoService } from '../../../services/equipo-service';
import { EquipoResponse } from '../../../models/equipo.model';
import { MATERIAL_IMPORTS } from '../../../shared/material-imports';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { EquipoForm } from '../equipo-form/equipo-form';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-equipo',
  imports: [...MATERIAL_IMPORTS],
  templateUrl: './lista-equipo.html',
  styleUrl: './lista-equipo.scss',
})
export class ListaEquipo implements OnInit {
  private equipoService = inject(EquipoService);
  private dialog = inject(MatDialog);
  private toastr = inject(ToastrService);

  displayedColumns: string[] = ['id', 'nombre', 'categoriaNombre', 'stockTotal', 'stockDisponible', 'acciones'];
  dataSource = new MatTableDataSource<EquipoResponse>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadEquipos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Método para cargar los equipos desde el servicio
  loadEquipos(): void {
    this.equipoService.getEquipos().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.toastr.success('Equipos cargados exitosamente', 'Éxito');
      },
      error: (error) => {
        this.toastr.error('Error al cargar equipos', 'Error');
        console.error(error);
      },
    });
  }

  // Método para aplicar filtro en la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Método para abrir el formulario de creación o modificación de equipo
  crearModificarEquipo(equipo: EquipoResponse | null, isMod: boolean): void {
    const dialogRef = this.dialog.open(EquipoForm, {
      width: '600px',
      height: 'auto',
      data: { equipo, isModificar: isMod },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      if (isMod && equipo) {
        this.equipoService.modificarEquipo(result).subscribe({
          next: () => {
            this.toastr.success('Equipo modificado exitosamente', 'Éxito');
            this.loadEquipos();
          },
          error: (error) => {
            this.toastr.error('Error al modificar equipo', 'Error');
          },
        });
      } else {
        this.equipoService.crearEquipo(result).subscribe({
          next: () => {
            this.toastr.success('Equipo creado exitosamente', 'Éxito');
            this.loadEquipos();
          },
          error: (error) => {
            this.toastr.error('Error al crear equipo', 'Error');
          },
        });
      }
    });
  }

  // Método para eliminar un equipo (borrado lógico)
  eliminarEquipo(equipo: EquipoResponse): void {
    if (confirm(`¿Eliminar el equipo "${equipo.nombre}"?`)) {
      this.equipoService.eliminarEquipo(equipo.id).subscribe({
        next: () => {
          this.toastr.success('Equipo eliminado', 'Éxito');
          this.loadEquipos();
        },
        error: (error) => {
          this.toastr.error('Error al eliminar equipo', 'Error');
        },
      });
    }
  }
}