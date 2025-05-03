import apiService from "$lib/api/api";

import { sendSignal, Signal } from "$lib/utils/sinalizador";
import type { ResponseDTO } from "$lib/api/api.dto";

export type cliente = {
    id?: number,
    name: string,
    cpf_cnpj: string,
    cep: string,
    city: string,
    street: string,
    district: string,
    state: string,
    number: string,
    whatsapp: string
}

export class ClientesController{

    async listarClientes(page:number):Promise<[ResponseDTO,any]> {
        return await apiService.get('/order/client/?page='+page);
    }

    async buscarCliente(id:string):Promise<[any,any]> {
        return await apiService.get('/order/client/'+id);
    }

    async cadastrar(cliente:FormData){
        sendSignal(Signal.VALIDAR_INPUTS);
        return await apiService.postFormData('/order/client/', cliente);
    }

    async editar(cliente:FormData, id:string){
        sendSignal(Signal.VALIDAR_INPUTS); 
        return await apiService.patchFormData('/order/client/'+id, cliente);
    }

    async deletarCliente(id:string){
        return await apiService.delete('/order/client/'+id);
    }
}