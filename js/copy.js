var Copas = {
  resultList: "#result-list",
  resultInfo: "#result-info",
  baseId: "result-text-",
  hasResulContainer: false,
  funs: null,

  init: function(funs){
    Copas.funs = funs
  },
  addCopyable: function(key){
    var newText = document.createElement('div')
    newText.classList.add('copyable')
    newText.classList.add('copas-text')
    newText.id = Copas.baseId+key

    var newItem = document.createElement('div')
    newItem.classList.add('copas-item')
    newItem.onclick = function(){Copas.copyItem(this)}
    // newItem.classList.add('textarea-wrapper')
    newItem.appendChild(newText)
    document.querySelector(Copas.resultList).appendChild(newItem)
  },
  copyItem: function(itemEl){
    var copasText = itemEl.querySelector('.copas-text')
    copyToClipboard(copasText.innerHTML)
    var copasList = itemEl.closest(".copas-list")
    var selectedList = document.querySelectorAll(".copas-item.selected")
    selectedList.forEach(function(item){
      item.classList.remove('selected')
      item.removeChild(item.querySelector('.copied'));
    })
    itemEl.classList.add('selected')
    var infoSel = document.createElement('div')
    infoSel.innerHTML = "tercopy"
    infoSel.classList.add('copied')
    itemEl.appendChild(infoSel)
    if (typeof gtag === "function") {
      gtag('event', 'click', {
        'event_category' : 'copy',
        'event_label' : copasText.id
      });
    }
  },
  generateResult: function(el){
    if(!Copas.hasResulContainer) {
      Copas.funs.forEach(function(item, key){
        Copas.addCopyable(key)
      })
      document.querySelector(Copas.resultInfo).classList.remove('hidden')
      Copas.hasResulContainer = true
    }
    if(el.value == ""){
      document.querySelector(Copas.resultInfo).classList.add('hidden')
      document.querySelector(Copas.resultList).innerHTML = ""
      Copas.hasResulContainer = false
      return
    }
    Copas.funs.forEach(function(fun, key){
      var resVal = fun(el.value)
      document.getElementById(Copas.baseId+key).innerHTML = resVal
    })
  }
}

function applyCharMap(map, text) {
  let out = "";
   for(let c of text.split("")) {
     if(map[c] !== undefined) out += map[c];
     else if(map[c.toLowerCase()] !== undefined) out += map[c.toLowerCase()];
     else out += c;
   }
  return out;
}
function applyCharCode(arChar, index, text){
  let out = "";
  var baseChar = arChar[index]
  for(let c of text.split("")) {
    arChar[index] = baseChar + c.charCodeAt(0)
    var charTo = String.fromCharCode.apply(String, arChar)
    if(charTo !== undefined && c !== " ") out += charTo;
    else out += c;
  }
  return out;
}
