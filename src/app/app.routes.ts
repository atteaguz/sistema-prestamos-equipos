import { Routes } from '@angular/router';

export const routes: Routes = [

    // Rutas de la aplicación
    {path:'', loadComponent: () => import('./pages/auth/login/login').then(m => m.Login)},
    {path: 'inicio', loadComponent: () => import('./pages/home/home').then(m => m.Home)},
    {path: 'iniciarsesion', loadComponent: () => import('./pages/auth/login/login').then(m => m.Login)},
    {path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard)},
    {path: 'listaCategorias', loadComponent: () => import('./pages/categorias/lista-categoria/lista-categoria').then(m => m.ListaCategoria)},
    {path: 'listaUsuarios', loadComponent: () => import('./pages/usuarios/lista-usuarios/lista-usuarios').then(m => m.ListaUsuario)},
    {path: 'listaEquipos', loadComponent: () => import('./pages/equipos/lista-equipo/lista-equipo').then(m => m.ListaEquipo)},
    {path: 'listaPrestamos', loadComponent: () => import('./pages/prestamos/lista-prestamo/lista-prestamo').then(m => m.ListaPrestamo)},
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: '**', redirectTo: 'login'},
];
