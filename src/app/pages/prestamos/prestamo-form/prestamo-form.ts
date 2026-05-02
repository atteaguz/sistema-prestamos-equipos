import { Component, inject, OnInit } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../../shared/material-imports';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Prestamo, PrestamoResponse } from '../../../models/prestamo.model';
import { EquipoResponse } from '../../../models/equipo.model';
import { UsuarioResponse } from '../../../models/usuario.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EquipoService } from '../../../services/equipo-service';
import { UsuarioService } from '../../../services/usuario-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-prestamo-form',
  imports: [...MATERIAL_IMPORTS, ReactiveFormsModule],
  templateUrl: './prestamo-form.html',
  styleUrl: './prestamo-form.scss',
})

export class PrestamoForm implements OnInit {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<PrestamoForm>);
  private equipoService = inject(EquipoService);
  private usuarioService = inject(UsuarioService);
  private toastr = inject(ToastrService);
  data = inject(MAT_DIALOG_DATA) as { prestamo: PrestamoResponse | null; isModificar: boolean };

  equipos: EquipoResponse[] = [];
  usuarios: UsuarioResponse[] = [];

  form = this.fb.group({
    equipoId: ['', [Validators.required]],
    usuarioId: ['', [Validators.required]],
    cantidad: [1, [Validators.required, Validators.min(1)]],
    fechaPrestamo: [new Date().toISOString().split('T')[0], [Validators.required]],
  });

  ngOnInit(): void {
    this.cargarEquipos();
    this.cargarUsuarios();
  }

  // Metodo para cargar equipos disponibles desde el servicio
  cargarEquipos(): void {
    this.equipoService.getEquipos().subscribe({
      next: (data) => {
        this.equipos = data.filter(e => e.stockDisponible > 0);
      },
      error: (error) => {
        this.toastr.error('Error al cargar equipos', 'Error');
        console.error(error);
      },
    });
  }

  // Metodo para cargar usuarios desde el servicio
  cargarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: (error) => {
        this.toastr.error('Error al cargar usuarios', 'Error');
        console.error(error);
      },
    });
  }

  // Metodo para guardar el préstamo creado o modificado
  guardar(): void {
  if (this.form.valid) {
    const formValue = this.form.getRawValue();
    const fechaPrestamo = formValue.fechaPrestamo ?? new Date().toISOString().split('T')[0];
    
    const prestamoData: Prestamo = {
      id: 0,
      equipoId: Number(formValue.equipoId),
      usuarioId: Number(formValue.usuarioId),
      cantidad: Number(formValue.cantidad),
      fechaPrestamo,
      fechaDevolucion: null,
      estadoPrestamo: 'activo',
    };
    this.dialogRef.close(prestamoData);
  }
}
}