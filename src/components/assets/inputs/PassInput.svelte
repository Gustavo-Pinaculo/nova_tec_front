<script lang="ts">
    import type { SVGAttributes } from "svelte/elements";
    import type { Component } from "svelte";
  
    interface Props {
      value: string;
      label: string;
      subLabel?:string;
      placeholder: string;
      Icon?: Component<{ props?: SVGAttributes<SVGSVGElement> }>;
      mandatory?: boolean;
      tip?: string;
      validate?:(v?:string)=>string;
      extraTip?:string;
      disabled?: boolean;
      extraAction?:VoidFunction;
      extraLabel?:string
      sanitize?: (value: string) => string;
      onEnter?: (value: string) => void;
    }
  
    let {
      value = $bindable(),
      label,
      mandatory = false,
      tip,
      validate = () => "",
      placeholder,
      Icon,
      disabled,
      sanitize,
      onEnter,
    }: Props = $props();
  
    let security = $state<boolean>(false)
    let focused = $state<boolean>(false)
    let error = $state<string>("")
  
    $effect(() => {
      if (sanitize) value = sanitize(value);
      if(value.length>0) focused = true 
    });

    function handleEnter(e:KeyboardEvent){
        if(e.key==="Enter" && onEnter) onEnter(value)
    }
    function handleBlur(){
        if(value.length>0) return error = validate()
        focused = false
        error = ""
    }
    function handleFocus(){
        focused = true
        error = "";
    }
    
  </script>

    <div class="flex flex-col gap-2 relative border {focused ? 'border-[#25384B]' : 'border-[#00000066]'} rounded-xl" title={tip}>
        <p class="text-sm absolute z-0 {focused ? 'top-[-25%] left-2 bg-white px-1' : 'top-[25%] left-3'} pointer-events-none {error && error.length > 0 ? 'text-red-700' : ''}">
            {label}
            {#if mandatory}
                <span class="text-red-700">*</span>
            {/if}
        </p>
        <div class="flex px-3 text-sm h-10 max-h-10 font-normal items-center gap-2 rounded-lg apply-class-focus input" 
          data-disabled={disabled ? true : null} data-error={error && error.length > 0 ? true : null}>
          {#if Icon}
            <Icon props={{width:15,height:13}}/>
          {/if}
          {#if security}
          <input {disabled} type="text" name="input" bind:value onfocus={handleFocus} onblur={handleBlur} onkeydown={handleEnter}
            class="w-full outline-none text-sm disabled:text-disabled-300" />
          {:else}
            <input {disabled} type="password" name="input" bind:value onfocus={handleFocus} onblur={handleBlur} onkeydown={handleEnter}
            class="w-full outline-none text-sm disabled:text-disabled-300" />
          {/if}
            <button onclick={() => security = !security}>
              {!security ?'Ver': 'Ocultar'}
              <!-- <img src="/icons/eye-icon.svg" alt="" class="absolute right-2 cursor-pointer" /> -->
            </button>
          </div>
        {#if error && error.length > 0}
            <p class="text-xs text-red-700">{error}</p>
        {/if}
    </div>