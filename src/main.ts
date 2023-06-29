import path from "path";
import { BrowserWindow, Tray, app, globalShortcut, screen } from "electron";
import { ipcMain } from "./shared/ipcs/ipcs";

const { handle, invoke } = ipcMain;

app.setLoginItemSettings({
  openAtLogin: true,
  openAsHidden: true,
});

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    frame: false,
    autoHideMenuBar: true,
    width: 400,
    height: 445,
    resizable: false,
    vibrancy: "under-window",
    webPreferences: {
      preload: path.resolve(__dirname, "preload.js"),
      sandbox: false,
    },
    x: 960,
    y: 258,
  });

  mainWindow.loadFile("dist/index.html");
  mainWindow.hide();

  handle.readClipBoardText();
  handle.appendTextToClipBoard();
  handle.readSettings();
  handle.saveSettings();
  handle.openLinkInBrowserWindow();
  handle.debugPrint();
  handle.sendErrorData();
  handle.clearClipBoard();
  handle.logSyncFinished();
  handle.readClipBoardImage();

  globalShortcut.register("Shift+Space", () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
  });

  // mainWindow.webContents.openDevTools({ mode: "detach" });

  // console.log("ACTIVE");

  // wait until the final content of the page is loaded before showing the
  // window, to prevent having a white screen while the app is still spinning up...
  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.show();
  });
});

app.setName("ClipSync");

app.once("window-all-closed", () => app.quit());
