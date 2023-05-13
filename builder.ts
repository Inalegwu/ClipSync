import { build } from "electron-builder";

build({
  config: {
    appId: "com.clipsync.app",
    productName: "ClipSync",
    artifactName: "${productName}-${version}-${platform}-${arch}.${ext}",
    directories: {
      output: "./release",
    },
    win: {
      icon: "./src/assets/images/AppIcon.ico",
    },
    mac: {
      icon: "./src/assets/images/AppIcon.icns",
    },
  },
});
