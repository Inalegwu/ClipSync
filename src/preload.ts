import { exposeApiToGlobalWindow } from "./shared/ipcs/ipcs";

console.log("Fuck Yeah I'm Mounted Up");

const { key, api } = exposeApiToGlobalWindow({
  exposeAll: true,
});

declare global {
  interface Window {
    [key]: typeof api;
  }
}
