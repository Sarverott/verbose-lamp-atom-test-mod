'use babel';

import VerboseLampView from './verbose-lamp-view';
import { CompositeDisposable } from 'atom';

export default {

  verboseLampView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.verboseLampView = new VerboseLampView(state.verboseLampViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.verboseLampView.getElement(),
      visible: false
    });
    //this.verboseLampView.setCloseButton(() => this.toggle())
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    /*this.subscriptions.add(atom.workspace.addOpener(uri => {
      if(uri==='atom://verbose-lamp'){
        this.toggle();
      }
    }));*/
    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'verbose-lamp:toggle': (search=null) => this.toggle(search)
    }));
    /*this.subscriptions.add(atom.commands.add('atom-workspace', {
      'verbose-lamp:toggle-': () => this.togle2()
    }));*/
    this.verboseLampView.setCloseButton(this);
    this.verboseLampView.printList(
      this,
      this.listPackages()
    );
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.verboseLampView.destroy();
  },

  listPackages(){
    const out={};
    const inputX={
      active:atom.packages.activePackages,
      loaded:atom.packages.loadedPackages,
      deprec:atom.packages.deprecatedPackages,
      depend:atom.packages.packageDependencies
    };
    for(var i in inputX){
      for(var j in inputX[i]){
        if(!out.hasOwnProperty(j)){
          out[j]={};
        }
        out[j][i]=true;
        //if(i=="depend")out[j].dependencies=inputX[j][i];
      }
    }
    return [
      atom.packages.ampPath,
      atom.packages.packageDirPaths,
      out
    ];
  },

  serialize() {
    return {
      verboseLampViewState: this.verboseLampView.serialize()
    };
  },

  toggle(data=null) {
    console.log('data toggle');
    console.log(data);
    this.verboseLampView.printList(
      this,
      this.listPackages(),
      data
    );
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  },
  togle() {
    this.toggle();
  },
  togle2() {
    this.toggle();
  }
};
