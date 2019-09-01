# Junau-Player

DEMO: https://junauplayer.github.io

Dies ist eine abgespeckte, statisch lauffähige Open-Source-Version des Junau-Skripts (https://drch.cf), welches ursprünglich auf dem [WeinerRinkler-Skript](https://github.com/WeinerRinkler/WeinerRinkler.github.io) basiert.
Es sind nicht alle Features und Statistiken aus dem offiziellen Player vorhanden, da dafür ein Server benötigt wird, der die entsprechenden Daten (z.B. Barrenspenden) zwischenspeichert und aufbereitet.

Code darf frei benutzt und geändert werden, es gibt hier aber keinen Support und keine Garantie auf regelmäßige Updates. 



## Funktionen
- YouNow-Streams ohne Login ansehen, auch mit mehreren Gästen
- Screenshotfunktion
- Direktlinkfunktion
- Grundlegende Statistiken: Likes, Zuschauer auf YN, stummgeschaltete User
- Geschenke, SuperMessages und Mutes werden im Chat angezeigt (kann einzeln deaktiviert werden)

## Nutzung mit npm / Build
Benötigt wird [NodeJS](https://nodejs.org/en/), wenigstens Version 10.16.3 (LTS)  und [git](https://git-scm.com/downloads)  

```
git clone https://github.com/HengiFettlich/Drch-Electron.git

cd Drch-Electron

npm install

npm start
```

## Wer die App paketieren will, benötigt zusätzlich noch [yarn](https://yarnpkg.com/en/docs/install)  
Im geklonten Repository dann folgende Befehle ausführen:  
```
npm install

yarn dist
```

Danach wird ein dist Ordner erstellt mit der entpackten Applikation und einem Installer.exe
