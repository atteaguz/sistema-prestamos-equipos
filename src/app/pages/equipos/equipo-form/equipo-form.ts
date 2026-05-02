import { Component, inject, OnInit} from '@angular/core';
import { MATERIAL_IMPORTS } from '../../../shared/material-imports';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Equipo, EquipoResponse } from '../../../models/equipo.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriaService } from '../../../services/categoria-service';
import { Categorias } from '../../../models/categoria.model';

@Component({
  selector: 'app-equipo-form',
  imports: [...MATERIAL_IMPORTS, ReactiveFormsModule],
  templateUrl: './equipo-form.html',
  styleUrl: './equipo-form.scss',
})

export class EquipoForm implements OnInit {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<EquipoForm>);
  private categoriaService = inject(CategoriaService);
  data = inject(MAT_DIALOG_DATA) as { equipo: EquipoResponse | null; isModificar: boolean };

  categorias: Categorias[] = [];

  form = this.fb.group({
    id: [{ value: this.data.equipo?.id || '', disabled: true }],
    nombre: [this.data.equipo?.nombre || '', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
    descripcion: [this.data.equipo?.descripcion || '', [Validators.maxLength(500)]],
    categoriaId: [this.data.equipo?.categoriaId || '', [Validators.required]],
    stockTotal: [this.data.equipo?.stockTotal || 1, [Validators.required, Validators.min(1)]],
  });

  ngOnInit(): void {
    this.cargarCategorias();

    if (!this.data.isModificar && this.data.equipo) {
      this.form.disable();
    }
  }

  // Método para cargar las categorías desde el servicio
  cargarCategorias(): void {
    this.categoriaService.getCategorias().subscribe({
      next: (data) => {
        setTimeout(() => {
          this.categorias = data;
        });
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
      },
    });
  }

  // Método para guardar el equipo
  guardar(): void {
  if (this.form.valid) {
    const formValue = this.form.getRawValue();
    const equipoData: Partial<Equipo> = {
      nombre: formValue.nombre?.toString() || '',
      descripcion: formValue.descripcion?.toString() || '',
      categoriaId: Number(formValue.categoriaId),
      stockTotal: Number(formValue.stockTotal) || 1,
      stockDisponible: Number(formValue.stockTotal) || 1,
      estado: true,
    };
    
    // Solo agregar id si estamos modificando y existe
    if (this.data.isModificar && formValue.id) {
      equipoData.id = Number(formValue.id);
    }
    console.log('Datos a guardar:', equipoData);
    this.dialogRef.close(equipoData);
  }
}
}