"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args) {
    const [channel, listener] = args;
    return electron.ipcRenderer.on(channel, (event, ...args2) => listener(event, ...args2));
  },
  off(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.off(channel, ...omit);
  },
  send(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.send(channel, ...omit);
  },
  invoke(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.invoke(channel, ...omit);
  }
});
electron.contextBridge.exposeInMainWorld("electronStore", {
  get: (key) => electron.ipcRenderer.invoke("electron-store-get", key),
  set: (key, value) => electron.ipcRenderer.invoke("electron-store-set", key, value),
  getAll: () => electron.ipcRenderer.invoke("electron-store-get-all"),
  reset: () => electron.ipcRenderer.invoke("electron-store-reset")
});
