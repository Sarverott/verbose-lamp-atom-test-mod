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

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'verbose-lamp:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.verboseLampView.destroy();
  },

  serialize() {
    return {
      verboseLampViewState: this.verboseLampView.serialize()
    };
  },

  toggle() {
    console.log('VerboseLamp was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
