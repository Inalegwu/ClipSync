import path from "path";
import { BrowserWindow, Tray, app, globalShortcut } from "electron";
import { ipcMain } from "./shared/ipcs/ipcs";

const { handle, invoke } = ipcMain;

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    frame: false,
    autoHideMenuBar: true,
    width: 400,
    height: 400,
    resizable: false,
    vibrancy: "under-window",
    icon: path.join(__dirname, "assets/images/AppIcon.ico"),
    webPreferences: {
      preload: path.resolve(__dirname, "preload.js"),
      sandbox: false,
    },
    x: 960,
    y: 305,
  });

  mainWindow.loadFile("dist/index.html");
  mainWindow.hide();

  handle.readClipBoard();
  handle.appendToClipBoard();
  handle.readSettings();
  handle.saveSettings();
  handle.openLinkInBrowserWindow();
  handle.debugPrint();
  handle.sendErrorData();

  // new Tray(path.join(__dirname, "assets/images/AppIcon.ico"));

  globalShortcut.register("Shift+Space", () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
  });

  // mainWindow.webContents.openDevTools({ mode: "detach" });

  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.show();
  });
});

app.once("window-all-closed", () => app.quit());
