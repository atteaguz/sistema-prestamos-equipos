import { Component, ViewChild, inject } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { MATERIAL_IMPORTS } from '../../shared/material-imports';
import { Footer } from '../../layout/footer/footer';
import { AuthService } from '../../services/authService';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-home',
  imports: [RouterLink,RouterOutlet, ...MATERIAL_IMPORTS,Footer],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})

export class Home {
  authService = inject(AuthService);
  router = inject(Router);

  @ViewChild('sidenav') sidenav?: MatSidenav;
  
  isLoggedIn = this.authService.isLoggedIn();

  titulo: string = 'Bienvenido';
    opened: boolean = true;
    menuItems = [
    { icon: 'home', label: 'Inicio', route: '/dashboard' },
    { icon: 'people', label: 'Usuarios', route: '/listaUsuarios' },
    { icon: 'inventory_2', label: 'Equipos', route: '/listaEquipos' },
    { icon: 'receipt', label: 'Préstamos', route: '/listaPrestamos' },
    { icon: 'category', label: 'Categorías', route: '/listaCategorias' },
  ];

   toggleMenu() {
    if (this.authService.isLoggedIn()) {
      this.sidenav?.toggle();
    }
  }

  closeMenu(): void {
    this.sidenav?.close();
  }

  // Método para cerrar sesión
  logout(): void {
    this.authService.logout();
    this.closeMenu();
    this.router.navigate(['/iniciarsesion'], { replaceUrl: true });
  }
}
