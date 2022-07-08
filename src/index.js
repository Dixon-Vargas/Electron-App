const { app,BrowserWindow, Menu, MenuItem } = require('electron');

const url = require('url');
const path = require('path');

if(process.env.NODE_ENV !== 'production'){
    require('electron-reload')(__dirname,{
        Electron:path.join(__dirname, '../node_modules', '.bin', 'electron')

    })  
}

let mainWindow
let newProductWindow

app.on('ready', () => {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,'views/index.html'),
        protocol: 'file',
        slashes:true
    }))

    const mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu);

    mainWindow.on('closed',() => {
        app.quit();
    });
});

function createNewProductWindow(){
    newProductWindow = new BrowserWindow({
    
        width:400,
        height:400,
        title: 'Add A New Product'
    });
    newProductWindow.setMenu(null);
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,'views/new-product.html'),
        protocol: 'file',
        slashes:true
    }))
    newProductWindow.on('closed',() => {
        newProductWindow=null;
    });
}

const templateMenu = [
    {
        label:'File',
        submenu: [
            {
                label:'New Product',
                accelerator:'Ctrl+N',
                click(){
                    createNewProductWindow();
                }
            }
        ]
    }

];