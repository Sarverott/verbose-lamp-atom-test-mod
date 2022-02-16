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
