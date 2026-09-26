#!/usr/bin/env -S gjs -m
import GLib from 'gi://GLib';
import {TorController} from '../lib/torController.js';

const c = new TorController({
    port: 9051,
    cookiePath: '/run/tor/control.authcookie',
});
const loop = GLib.MainLoop.new(null, false);
c.connectAndAuth()
    .then(() => { print('auth_ok'); loop.quit(); })
    .catch(e => { print(`auth_fail: ${e.message}`); loop.quit(); });
loop.run();
