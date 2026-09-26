import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

import {TorIndicator, TorPanelButton} from './ui/quickToggle.js';

export default class TorExtExtension extends Extension {
    enable() {
        this._indicator = new TorIndicator(this);
        Main.panel.statusArea.quickSettings.addExternalIndicator(this._indicator);

        this._panelButton = new TorPanelButton(this, this._indicator.toggle);
        Main.panel.addToStatusArea(this.metadata.uuid, this._panelButton, 1, 'system');

        console.log(`[${this.metadata.uuid}] enabled`);
    }

    disable() {
        this._panelButton?.destroy();
        this._panelButton = null;
        this._indicator?.destroy();
        this._indicator = null;
        console.log(`[${this.metadata.uuid}] disabled`);
    }
}
