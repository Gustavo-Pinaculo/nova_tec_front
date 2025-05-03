import apiService from "$lib/api/api";
import { sendSignal, Signal } from "$lib/utils/sinalizador";
import toast from "$lib/utils/toasts.svelte";

export class UsuariosController {

    async listar(page:number):Promise<[any,any]> {
        return await apiService.get('/user/user/?page='+page);
    }
    async cadastrar() {
        sendSignal(Signal.VALIDAR_INPUTS);
        return toast.alert('Em desenvolvimento','Funcionalidade em intergação com API')
    }
    async deletar(id:string) {
        return await apiService.delete('/user/user/'+id+'/');
    }
}