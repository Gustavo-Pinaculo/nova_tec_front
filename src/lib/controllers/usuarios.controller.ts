import apiService from "$lib/api/api";
import { sendSignal, Signal } from "$lib/utils/sinalizador";
import toast from "$lib/utils/toasts.svelte";

export class UsuariosController {

    async listar(page:number):Promise<[any,any]> {
        return await apiService.get('/user/user/?page='+page);
    }
    async cadastrar(user:usuario) {
        return await apiService.post('/user/user/', user);
    }
    async deletar(id:string) {
        return await apiService.delete('/user/user/'+id+'/');
    }

}

export type usuario = {
    password: string,
    deleted_at?: string,
    email: string,
    username: string,
    cpf_cnpj: string,
    rg?: string,
    status: "ACTIVE" | "BANNED" | "INACTIVE",
    terms?: boolean,
    join_whatsapp_community?: boolean,
    whatsapp_messages?: boolean,
    receive_emails?: boolean,
    deleted_by?: string,
    user_permissions: string[]
}