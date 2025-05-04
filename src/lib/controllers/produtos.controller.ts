import apiService from "$lib/api/api";
import type { ResponseDTO } from "$lib/api/api.dto";
import { sendSignal, Signal } from "$lib/utils/sinalizador";

export class ProdutosController {
    async listarProdutos(page:number):Promise<[ResponseDTO,any]> {
        return await apiService.get('/order/product/?page='+page);
    }
    async buscarProduto(id:string):Promise<[any,any]> {
        return await apiService.get('/order/product/'+id);
    }
    async cadastrarProduto(produto:any){
        sendSignal(Signal.VALIDAR_INPUTS);
        return await apiService.post('/order/product/', produto);
    }
    async editarProduto(produto:any, id:string){
        sendSignal(Signal.VALIDAR_INPUTS); 
        return await apiService.patch('/order/product/'+id, produto);
    }
    async deletarProduto(id:string){
        return await apiService.delete('/order/product/'+id);
    }
}

export type produto = {
    id?: string;
    name: string;
    quantity: string;
    price: string;
    status: "IN_ANALYSIS"|"CANCELLED"|"IN_PRODUCTION"|"FINISHED"|"DELIVERED";
    categories: string[];
    notes: string;
}

export const statusOptions = [
    { value: 'IN_ANALYSIS', label: 'Em análise' },
    { value: 'CANCELLED', label: 'Cancelado' },
    { value: 'IN_PRODUCTION', label: 'Em produção' },
    { value: 'FINISHED', label: 'Finalizado' },
    { value: 'DELIVERED', label: 'Entregue' },
] 