 // From https://stackoverflow.com/a/4238971/259824

 function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
      var range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
      var textRange = document.body.createTextRange();
      textRange.moveToElementText(el);
      textRange.collapse(false);
      textRange.select();
    }
  }

  // name
  function split(str) {
    let result = [];
    str = str.trimStart();
    for (var i = 0; i < str.length; i++) {
      result.push(`<span class='char' style='z-index: ${100-i}'>${str[i]}</span>`);
    }
    return result.join('');
  }
  function colorize(e){
    const text = this.textContent;
    this.innerHTML = split(this.textContent);
    placeCaretAtEnd(this);
  }
  function cleanup(e) {
    const text = this.textContent;
    if (text == 'TUNOMBRE') {
      this.innerHTML = '';
      placeCaretAtEnd(this);
    }
  }
  function initialize(e){
    const target = e ? this : document.querySelector('h3');;
    const text = target.textContent;
    if (text === '') {
      target.innerHTML = split('TUNOMBRE');
    }
  }
  function main(){
    const target = document.querySelector('h3');
    target.addEventListener('input', colorize, false);
    target.addEventListener('focusin', cleanup, false);
    target.addEventListener('focusout', initialize, false);
    initialize();
  }
  main();

/* *** */
    // create img & download
  function downloadCanvas(canvasId, filename) {
    // Obteniendo la etiqueta la cual se desea convertir en imagen
    var domElement = document.getElementById(canvasId);
 
    // Utilizando la función html2canvas para hacer la conversión
    html2canvas(domElement, {
        onrendered: function(domElementCanvas) {
            // Obteniendo el contexto del canvas ya generado
            var context = domElementCanvas.getContext('2d');
 
            // Creando enlace para descargar la imagen generada
            var link = document.createElement('a');
            link.href = domElementCanvas.toDataURL("image/png");
            link.download = filename;
 
            // Chequeando para browsers más viejos
            if (document.createEvent) {
                var event = document.createEvent('MouseEvents');
                // Simulando clic para descargar
                event.initMouseEvent("click", true, true, window, 0,
                    0, 0, 0, 0,
                    false, false, false, false,
                    0, null);
                link.dispatchEvent(event);
            } else {
                // Simulando clic para descargar
                link.click();
            }
        }
    });
}
 
// Haciendo la conversión y descarga de la imagen al presionar el botón
$('#boton-descarga').click(function() {
    downloadCanvas('imagen', 'imagen.png');
});



