<script lang="ts">
    import { Signal, sinal } from "$lib/utils/sinalizador";
  
    interface Props {
      value: string;
      label: string;
      options: {label:string,value:string}[];
      mandatory?: boolean;
      tip?: string;
      validate?:(value:string)=>string;
      disabled?: boolean;
      multiple?:boolean
    }
  
    let {
      value = $bindable(),
      label,
      mandatory = false,
      tip,
      validate = () => "",
      disabled,
      options,
      multiple = false,
    }: Props = $props();
  
    let focused = $state<boolean>(false)
    let selected = $state<string>("")
    let error = $state<string>("")

    function handleSelection(v:string){
        if(!multiple){
            focused = false
            error = ""
            if(value === v){
                value = ""
                selected = label
                return
            }
            value = v
            selected = options.find(o => o.value === v)!.label
            return
        }
        if(value.includes(v)){
            value = value.replace(v,'')
            selected = selected.replace(v,'')
            return
        }
        value = value + ',' + v
        selected = selected + ',' + options.find(o => o.value === v)!.label
    }
    function handleOpen(){
        focused = !focused
    }

    $effect(() => {
        if(focused) error = ''
        if($sinal === Signal.VALIDAR_INPUTS) error = validate(value)
    });
</script>

<div class="flex flex-col gap-1">
    <div class="flex flex-col gap-2 relative border {disabled ? 'pointer-events-none' : ''} {focused ? 'border-[#25384B]' : 'border-[#00000066]'} rounded-xl"
        title={tip}>
        <button class="text-sm text-start font-medium px-3 h-10 max-h-10 {focused || selected !== "" ? 'text-[#25384B]' : 'text-[#21252966]'}" onclick={handleOpen}>
            {selected === "" ? label : selected}
            {#if mandatory && value.length === 0}
                <span class="text-red-700">*</span>
            {/if}
        </button>
        {#if focused}
            <div class="absolute top-12 left-0 right-0 bg-white rounded-xl overflow-hidden border border-[#25384B] z-10">
                {#each options as {label,value}}
                    <button onclick={() => handleSelection(value)} class="{selected.includes(label) ? 'bg-[#25384B] text-white' : ''} text-sm text-start w-full font-medium p-3 hover:bg-[#25384B] hover:text-white ">
                        {label}
                    </button>
                {/each}
            </div>
        {/if}
    </div>
    {#if error && error.length > 0}
        <p class="text-xs font-semibold text-red-700">{error}</p>
    {/if}
  </div>