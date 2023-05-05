import { build } from "electron-builder";

build({
  config: {
    appId: "com.clipsync.app",
    productName: "ClipSync",
    artifactName: "${productName}-${version}-${platform}-${arch}.${ext}",
    directories: {
      output: "../clipsync/release",
    },
    win: {
      icon: "./src/assets/images/AppIcon.ico",
      target: "msi",
      runAfterFinish: true,
    },
    mac: {
      icon: "./src/assets/images/AppIcon.icns",
      target: "dmg",
    },
  },
});
