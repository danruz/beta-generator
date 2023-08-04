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
    if (text == 'TuNombre') {
      this.innerHTML = '';
      placeCaretAtEnd(this);
    }
  }
  function initialize(e){
    const target = e ? this : document.querySelector('h3');;
    const text = target.textContent;
    if (text === '') {
      target.innerHTML = split('TuNombre');
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

