const inputsAutoOff = document.querySelectorAll('input[data-auto-off]');
inputsAutoOff.forEach(x => {    
    x.setAttribute('readonly', true);
    x.addEventListener('focus', (e) => {
        x.removeAttribute('readonly');        
    })
    x.addEventListener('blur', e => {
        x.setAttribute('readonly',true);
    })
})