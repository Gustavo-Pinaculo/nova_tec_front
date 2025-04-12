import { writable } from "svelte/store";

export enum Signal {
    VALIDAR_INPUTS = 'validar_inputs',
}

export const sinal = writable('');

export function sendSignal(signal: Signal) {
    sinal.set(signal);
    setTimeout(() => {
        sinal.set('');
    }, 1000);
}