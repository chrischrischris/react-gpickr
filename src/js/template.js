import {utils} from '@simonwep/pickr';

export default utils.createFromTemplate(`
<div data-key="root" class="gpcr-app">

    <div data-key="pickr"></div>

    <div data-con="gradient" class="gpcr-interaction">
    
        <div data-con="stops" class="gpcr-stops">
            <div data-key="preview" class="gpcr-stop-preview"></div>
            <div data-key="markers" class="gpcr-stop-marker"></div>
        </div>
        
        <div data-key="result" class="gpcr-result"/>
    </div>
    
</div>
`)