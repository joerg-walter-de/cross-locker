import {
  app,
  BrowserWindow,
  nativeTheme,
  ipcMain
} from 'electron'

import path from 'path'
import os from 'os'
//import keytar from 'keytar';
import fs from 'fs';
import chokidar from 'chokidar';
import storage from 'electron-json-storage';
import { config } from 'process';

import forge from 'node-forge';

const demonstrateKeyBasedAsymmetricEncryption = () => {
 try {
   // replace with yout actual String
   const exampleString =
     'Text that is going to be sent over an insecure channel and must be encrypted at all costs!';
   // generate Keypair, in asynchronous encryption both keys need to be related
   // and cannot be independently generated keys
   // keylength adheres to the 'ECRYPT-CSA Recommendations' on 'www.keylength.com'

   const options= {
    bits: 3072,
    e: 0x10001
   };

   const keypair = forge.pki.rsa.generateKeyPair(options);


   console.log(exampleString);

   // ENCRYPT String
   const encrypted1 = forge.util.encode64(
     keypair.publicKey.encrypt(exampleString, 'RSA-OAEP')
   );

   const encrypted2 = forge.util.encode64(
    keypair.publicKey.encrypt(exampleString, 'RSA-OAEP')
  );
    console.log(forge.pki.privateKeyToPem(keypair.privateKey))
    console.log(forge.pki.publicKeyToPem(keypair.publicKey))
  console.log('1:')
   console.log(encrypted1);
   console.log('2:')
   console.log(encrypted2);

   // DECRYPT String
   const decrypted = keypair.privateKey.decrypt(
     forge.util.decode64(encrypted1),
     'RSA-OAEP'
   );

   console.log('3:')
   console.log(decrypted);

 } catch (error) {
  console.log(error)
 }
};

demonstrateKeyBasedAsymmetricEncryption();


//import PackageInfo from 'package.json';

// needed in case process is undefined under Linux
const platform = process.platform || os.platform()

//--------------------------------------------------------------------------------------------------

try {
  if (platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    fs.unlinkSync(path.join(app.getPath('userData'), 'DevTools Extensions'))
  }
}
catch (_) { }

let mainWindow;

let appConfig = {

};

//--------------------------------------------------------------------------------------------------

const homePath = app.getPath('home');
console.log(`homePath: ${homePath}`);
const settingsPath = path.join(homePath, '.crosslocker');
console.log(`settingsPath: ${settingsPath}`);
storage.setDataPath(settingsPath);
const dataPath = storage.getDataPath();
console.log(`dataPath: ${dataPath}`);
storage.set('config', appConfig);

demonstrateKeyBasedAsymmetricEncryption();

//--------------------------------------------------------------------------------------------------

/* ipcMain.on('get-password', (event, user) => {
  event.returnValue = keytar.getPassword('ServiceName', user);
});
 */
/* ipcMain.on('set-password', (event, user, pass) => {
  event.returnValue = keytar.replacePassword('ServiceName', user, pass);
}); */

//--------------------------------------------------------------------------------------------------
/*
function StartWatcher(path){


  var watcher = chokidar.watch(path, {
      ignored: /[\/\\]\./,
      persistent: true
  });

  function onWatcherReady(){
      console.info('From here can you check for real changes, the initial scan has been completed.');
  }

  // Declare the listeners of the watcher
  watcher
  .on('add', function(path) {
        console.log('File', path, 'has been added');
  })
  .on('addDir', function(path) {
        console.log('Directory', path, 'has been added');
  })
  .on('change', function(path) {
       console.log('File', path, 'has been changed');
  })
  .on('unlink', function(path) {
       console.log('File', path, 'has been removed');
  })
  .on('unlinkDir', function(path) {
       console.log('Directory', path, 'has been removed');
  })
  .on('error', function(error) {
       console.log('Error happened', error);
  })
  .on('ready', onWatcherReady)
  .on('raw', function(event, path, details) {
       // This event should be triggered everytime something happens.
       console.log('Raw event info:', event, path, details);
  });
}
 */

//--------------------------------------------------------------------------------------------------

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
    width: 1000,
    height: 600,
    title: 'Cross Locker',
    //titleBarStyle: 'hidden',
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      enableRemoteModule: true,
      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
    //  preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD)
      preload: path.resolve(__dirname, 'electron-preload.js'),
    }
  })

  mainWindow.setMenu(null);

  void mainWindow.loadURL(process.env.APP_URL);

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools()
  }
  else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow.webContents.closeDevTools();
    })
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

//--------------------------------------------------------------------------------------------------

void app.whenReady().then(createWindow);

//--------------------------------------------------------------------------------------------------

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit()
  }
})

//--------------------------------------------------------------------------------------------------

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  //  void keytar.getPassword('xxx', 'yyy');
  }
})

//--------------------------------------------------------------------------------------------------

console.info('Creating file watchers...');

var watcher = chokidar.watch('D:/test', {ignored: /^\./, persistent: true});

watcher
  .on('add', function(path) {console.log('File', path, 'has been added');})
  .on('change', function(path) {console.log('File', path, 'has been changed');})
  .on('unlink', function(path) {console.log('File', path, 'has been removed');})
  .on('error', function(error) {console.error('Error happened', error);})

//--------------------------------------------------------------------------------------------------
