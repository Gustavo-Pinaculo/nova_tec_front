import apiService from "$lib/api/api";
import type { ResponseDTO } from "$lib/api/api.dto";

export class ProdutosController {
    async listarProdutos(page:number):Promise<[ResponseDTO,any]> {
        return await apiService.get('/order/product/?page='+page);
    }
}