declare namespace svelte.JSX {
    interface HTMLProps<T> {
        oninputChange?: (e: CustomEvent) => void;
    }
}