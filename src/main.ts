import path from "path";
import { BrowserWindow, app, globalShortcut } from "electron";
import { ipcMain } from "./shared/ipcs/ipcs";

const { handle, invoke } = ipcMain;

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    frame: false,
    autoHideMenuBar: true,
    width: 400,
    height: 400,
    webPreferences: {
      preload: path.resolve(__dirname, "preload.js"),
      sandbox: false,
    },
    x: 950,
    y: 300,
  });

  mainWindow.loadFile("dist/index.html");
  mainWindow.hide();

  handle.readClipBoard();
  handle.appendToClipBoard();
  handle.readSettings();
  handle.saveSettings();

  globalShortcut.register("Shift+Space", () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
  });

  // mainWindow.webContents.openDevTools({ mode: "detach" });

  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.show();
  });
});

app.once("window-all-closed", () => app.quit());
