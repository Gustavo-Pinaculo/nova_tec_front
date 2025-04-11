    <script lang="ts">
        import type { SVGAttributes } from "svelte/elements";
            
        interface Props{
            props?:SVGAttributes<SVGSVGElement>
        }
    
        let {props}:Props = $props()
    </script>
    
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.04899 6.29581C3.29344 6.05211 3.68917 6.05272 3.93287 6.29718L10.98 13.3661L18.049 6.31894C18.2934 6.07523 18.6891 6.07584 18.9329 6.3203C19.1766 6.56475 19.1759 6.96048 18.9315 7.20418L11.4199 14.6926C11.1755 14.9363 10.7798 14.9357 10.5361 14.6912L3.04762 7.1797C2.80392 6.93524 2.80453 6.53951 3.04899 6.29581Z" fill="black"/>
    </svg>