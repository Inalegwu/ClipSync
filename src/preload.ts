import { exposeApiToGlobalWindow } from "./shared/ipcs/ipcs";

/**
 *
 * HIDDEN TOKEN FOR WHOEVER DECIDES TO LOOK FOR THIS
 *
 */
console.log("Fuck Yeah I'm Mounted Up");

/**
 *
 * EXPOSES THE API TO THE RENDERER PROCESS
 *
 */
const { key, api } = exposeApiToGlobalWindow({
  exposeAll: true,
});

/**
 *
 * ATTACH THE API TO THE GLOBAL WINDOW OBJECT
 *
 */
declare global {
  interface Window {
    [key]: typeof api;
  }
}
