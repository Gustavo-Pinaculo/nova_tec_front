import apiService from "$lib/api/api";

export class PedidosController {
    async listarPedidos(page: number) {
        return await apiService.get('/order/order/?page=' + page);
    }
}