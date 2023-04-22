import path from "path";
import { BrowserWindow, app, globalShortcut } from "electron";
import { ipcMain } from "./shared/ipcs";

const { handle, invoke } = ipcMain;

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    frame: false,
    autoHideMenuBar: true,
    width: 400,
    height: 400,
    webPreferences: {
      preload: path.resolve(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile("dist/index.html");

  handle.readClipBoard();

  globalShortcut.register("Shift+Space", () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
  });

  // mainWindow.webContents.openDevTools({ mode: 'detach' });
});

app.once("window-all-closed", () => app.quit());
