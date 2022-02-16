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
      'verbose-lamp:toggle': () => this.toggle()
    }));
    this.verboseLampView.setCloseButton(this);
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.verboseLampView.destroy();
  },

  listPackages(){
    Object.keys(atom.packages.activePackages);
    Object.keys(atom.packages.loadedPackages);
    Object.keys(atom.packages.deprecatedPackages);
    Object.keys(atom.packages.packageDependencies);
    atom.packages.ampPath;
  },

  serialize() {
    return {
      verboseLampViewState: this.verboseLampView.serialize()
    };
  },

  toggle() {
    console.log('opening VERBOSE LAMP!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
