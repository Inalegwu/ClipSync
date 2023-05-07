import path from "path";
import { BrowserWindow, Tray, app, globalShortcut, screen } from "electron";
import { ipcMain } from "./shared/ipcs/ipcs";

const { handle, invoke } = ipcMain;

app.whenReady().then(() => {
  // i should probably be using this to determine the position of the window on the screen right?
  // well that doesn't seem to be how electron wants it to work
  const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } =
    screen.getPrimaryDisplay().workAreaSize;

  const mainWindow = new BrowserWindow({
    frame: false,
    autoHideMenuBar: true,
    width: 400,
    height: 400,
    resizable: false,
    vibrancy: "under-window",
    webPreferences: {
      preload: path.resolve(__dirname, "preload.js"),
      sandbox: false,
    },
    x: 960,
    y: 305,
    icon: "./assets/images/AppIcon.ico",
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
