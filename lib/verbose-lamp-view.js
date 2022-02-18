'use babel';

const fs=require("fs");
const path=require("path");

export default class VerboseLampView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('verbose-lamp');

    // Create message element
    const message = document.createElement('div');
    message.innerHTML=fs.readFileSync(path.join(__dirname, '../interface/main-window.html'));
    //message.textContent = 'The VerboseLamp package is Alive! It\'s ALIVE!';

    message.classList.add('message');
    this.element.appendChild(message);
  }
  /*
  getTitle() {
    // Used by Atom for tab text
    return 'Active Editor Info';
  }

  getURI() {
    // Used by Atom to identify the view when toggling.
    return 'atom://verbose-lamp';
  }
  */
  printList(hook, packageBox, search=null){
    this.element.querySelector('.verbose-lamp-apmpath').textContent=packageBox.shift();
    this.element.querySelector('.verbose-lamp-packagepaths').innerHTML=packageBox.shift().join(" <br> ");
    const list=this.element.querySelector('.verbose-lamp-lister-package');
    list.innerHTML="";
    /* //moment of distruction, automatically writing
    for(var i=0;i<list.length;i++){
      var tmp=document.createElement(li);
      tmp.classList.add('two-lines');
      tmp.innerHTML=`
        <div class='status status-added icon icon-diff-added'></div>
        <div class='primary-line icon icon-file-text'>Primary line</div>
        <div class='secondary-line no-icon'>Secondary line</div>
      `
    }*/
    for(var i in packageBox[0]){
      var tmp=document.createElement("li");
      tmp.classList.add('two-lines');
      if(search&&i.includes(search.target.textContent))tmp.classList.add("selected");
      var secondliner="";
      secondliner+=
        (packageBox[0][i].hasOwnProperty("active"))
        ?
        "<span class='badge badge-success icon icon-verified'></span>"
        :
        "<span class='badge icon icon-dash'></span>";
      secondliner+=
        (packageBox[0][i].hasOwnProperty("loaded"))
        ?
        "<span class='badge badge-info icon icon-cloud-download'></span>"
        :
        "<span class='badge icon icon-dash'></span>";
      secondliner+=
        (packageBox[0][i].hasOwnProperty("deprec"))
        ?
        "<span class='badge badge-error icon icon-alert'></span>"
        :
        "<span class='badge icon icon-dash'></span>";
      //var depend=packageBox[0][i].dependencies
      tmp.innerHTML=`
        <div class='status status-added icon icon-mentioned'></div>
        <div class='primary-line icon icon-package-text'>${i}</div>
        <div class='secondary-line no-icon'>${secondliner} | ${packageBox[0][i].dependencies}</div>
      `
      list.appendChild(tmp);
    }
  }
  setCloseButton(hook){
    console.log(hook);
    this.element.querySelector('.verbose-lamp-colser').addEventListener(
      "click",
      function(){
        hook.toggle();
      }
    )
  }
  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
