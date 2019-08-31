const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig () {
  console.log('creating windows installer')
  const rootPath = path.join('./')
  const outPath = path.join(rootPath, 'release-builds')

  return Promise.resolve({
    appDirectory: path.join(outPath, 'Drch-Electron-win32-x64/'),
    authors: 'Hengi Fettlich',
    noMsi: true,
    outputDirectory: path.join(outPath, 'windows-installer'),
    exe: 'Drch-Electron.exe',
    setupExe: 'Drch_Electron-1.0.0-setup.exe',
    setupIcon: path.join(rootPath, 'assets','icons','win','icon.ico')
  })
}