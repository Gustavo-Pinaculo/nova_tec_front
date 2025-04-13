import { sendSignal, Signal } from "$lib/utils/sinalizador";
import toast from "$lib/utils/toasts.svelte";

export class UsuariosController {
    async cadastrar() {
        sendSignal(Signal.VALIDAR_INPUTS);
        return toast.alert('Em desenvolvimento','Funcionalidade em intergação com API')
    }
}