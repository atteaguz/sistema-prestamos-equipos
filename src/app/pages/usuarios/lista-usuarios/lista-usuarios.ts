import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../../../services/usuario-service';
import { Usuario, UsuarioResponse } from '../../../models/usuario.model';
import { MATERIAL_IMPORTS } from '../../../shared/material-imports';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioForm } from '../usuarios-form/usuarios-form';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-usuario',
  imports: [...MATERIAL_IMPORTS],
  templateUrl: './lista-usuarios.html',
  styleUrl: './lista-usuarios.scss',
})
export class ListaUsuario implements OnInit {
  private usuarioService = inject(UsuarioService);
  private dialog = inject(MatDialog);
  private toastr = inject(ToastrService);

  displayedColumns: string[] = ['id', 'username', 'role', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<UsuarioResponse>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Usuario>;

  ngOnInit(): void {
    this.loadUsuarios();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Carga los usuarios desde el servicio y maneja la respuesta
  loadUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.table.renderRows();
        this.toastr.success('Usuarios cargados', 'Éxito');
      },
      error: (error) => {
        this.toastr.error('Error al cargar usuarios. Contacta al administrador.', 'Error');
        console.error('Error al cargar usuarios:', error);
      },
    });
  }

  // Aplica un filtro a la tabla basado en el valor ingresado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Abre el diálogo para crear o modificar un usuario
  crearModificarUsuario(usuario: UsuarioResponse | null, isMod: boolean): void {
    const dialogRef = this.dialog.open(UsuarioForm, {
      width: '600px',
      height: 'auto',
      data: { usuario, isModificar: isMod },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      if (isMod && usuario) {
        // Para modificar
        this.usuarioService.modificarUsuario(result).subscribe({
          next: () => {
            this.toastr.success('Usuario modificado exitosamente', 'Éxito');
            this.loadUsuarios();
          },
          error: (error) => {
            this.toastr.error('Error al modificar el usuario. Contacta al administrador', 'Error');
            console.error('Error al modificar:', error);
          },
        });
      } else {
        // Para crear
        this.usuarioService.crearUsuario(result).subscribe({
          next: () => {
            this.toastr.success('Usuario creado exitosamente', 'Éxito');
            this.loadUsuarios();
          },
          error: (error) => {
            this.toastr.error('Error al crear el usuario. Contacta al administrador.', 'Error');
            console.error('Error al crear:', error);
          },
        });
      }
    });
  }

  // Elimina un usuario después de confirmar la acción (borrado lógico)
  eliminarUsuario(usuario: UsuarioResponse): void {
    if (confirm(`¿Estás seguro de eliminar al usuario "${usuario.username}"?`)) {
      this.usuarioService.eliminarUsuario(usuario.id).subscribe({
        next: () => {
          this.toastr.success('Usuario eliminado exitosamente', 'Éxito');
          this.loadUsuarios();
        },
        error: (error) => {
          this.toastr.error('Error al eliminar el usuario. Contacta al administrador.', 'Error');
          console.error('Error al eliminar:', error);
        },
      });
    }
  }
}