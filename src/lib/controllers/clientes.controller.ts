import { sendSignal, Signal } from "$lib/utils/sinalizador";
import toast from "$lib/utils/toasts.svelte";

export type cliente = {
    id?: number,
    nome: string,
    documentoFiscal: string,
    cep: string,
    cidade: string,
    rua: string,
    bairro: string,
    estado: string,
    numero: string,
    whatsapp: string
}

export class ClientesController{

    async cadastrar(cliente:cliente){
        sendSignal(Signal.VALIDAR_INPUTS);
        return toast.alert('Em desenvolvimento','Funcionalidade em intergação com API')
    }
}