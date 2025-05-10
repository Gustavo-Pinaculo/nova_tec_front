import { writable } from 'svelte/store';
import { goto } from "$app/navigation";

export const activePage = writable(0);
export const hovered = writable(false);

class SidebarController {

    static pages = [
        { label: 'Início', route: '/dashboard', icon: '/icons/dashboard-icon.svg' },
        { label: 'Pedidos', route: '/pedidos', icon: '/icons/pedidos-icon.svg' },
        { label: 'Produtos', route: '/produtos', icon: '/icons/produtos-icon.svg' },
        { label: 'Clientes', route: '/clientes', icon: '/icons/clientes-icon.svg' },
        { label: 'Usuários', route: '/usuarios', icon: '/icons/usuario-icon.svg' },
        { label: 'Relatórios', route: '/relatorios', icon: '/icons/relatorios-icon.svg' },
        { label: 'Configuração', route: '/configuracao', icon: '/icons/config-icon.svg' },
    ];

    static setActivePage(page: number) {
        localStorage.setItem('novatec-activePage', page.toString());
        activePage.update(() => page);
        goto(this.pages[page].route);
    }

    static logout() {
        localStorage.clear();
        goto('/login');
    }
}

export default SidebarController;
