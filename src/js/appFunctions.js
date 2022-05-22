const { ipcRenderer } = require('electron')
const ipc = ipcRenderer
const closeApp = document.getElementById('closeApp');
const minimizeBtn = document.getElementById('minimizeBtn');
const maximizeBtn = document.getElementById('maximizeBtn')


minimizeBtn.addEventListener('click', ()=> {
    ipc.send('minimizeApp')
})

maximizeBtn.addEventListener('click', ()=> {
    ipc.send('maximizeApp')
})

closeApp.addEventListener('click', ()=> {
    ipc.send('closeApp')
})
