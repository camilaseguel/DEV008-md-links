#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const [, , ...args] = process.argv
const route = args[0];
const option = args[1];

//fs.existsSync => Me dice si la ruta existe (true) o no (false). Método sincrónico
function routeExist(route) {
  return fs.existsSync(route)
};


//fs.statSync => dice si es archivo o no.
function isFile(route) {
  return fs.statSync(route).isFile();
};


//fs.isAbsolute => dice si la rutroutea es absoluta o no.
function routeAbsolut(route) {
  return path.isAbsolute(route);
};

//path.resolve => pasar de ruta relativa a absoluta. SIEMPRE se usa para generar rutas absolutas.
function pathResolve(route) {
  return path.resolve(route);
};


//path.extname => devuelve la extensión de un archivo. extensión de archivos
function extensionMDFile(route) {
  if (path.extname(route) === '.md') {
    return true
  } else {
    return false
  }
};


//fs.readFile => lee todo lo que esté dentro del archivo. Método asincrono para leer archivos. (recibe 3 parámetros 1.nombre del archivo que desamos leer.- 2. codificación.- 3. callback con dos parámetros)
const readFile = (route) => {
  return new Promise((resolve, reject) => {
    fs.readFile((route), 'utf-8', (err, data) => {
      if (err) {
        // console.log('no puedo leer');
        reject(err)
      } else {
        //console.log('readFile', data);
        resolve(data)
      }
    });
  })
};


/*
//fs.readdirSync => Muestra los nombres de los archivos dentro de un directorio. Método sincronico.
function readDirectory(route){
  return fs.readdirSync(route)
}
// console.log(readDirectory('foldertest'))

function extensionMDFileInDirectory(route) {
  const filesInDirectory = fs.readdirSync(__dirname);
  let links = [];

  filesInDirectory.forEach(filePath => {
    if (path.extname(filePath) === '.md')
      links.push(filePath);
  });
  console.log(links);
}
extensionMDFileInDirectory(route);
*/

/*//usando regex y .match(), logro extraer en un array los links del archivo
function getLinksFiles(fileMD) {
  console.log(fileMD, 'archivoMD')
  let urls = [];
  const regex = /\[[^\[\]]*\]\((http|https):\/\/[^\(\)]+\)/g;
  const resultado = fileMD.match(regex);
  console.log(resultado, 'este es archivo .md')
  resultado.forEach((item) => {
    // console.log(item.slice(1, item.indexOf(']')));
    // console.log(item.slice(item.indexOf('(') + 1, item.length - 1));
    urls.push({
      text: item.slice(1, item.indexOf(']')),
      href: item.slice(item.indexOf('(') + 1, item.length - 1)
    }
    );
  })
  return urls;
  // urls.forEach((item) => {
  //   validateURL(item.href);
  // })
};
console.log(getLinksFiles(readFile('pruebass.md')))

*/
function validateURL(urls) {
  //console.log(urls, 'fetch')
  fetch(urls.href)
 
    .then(response => {
      // if (response.ok)
      // return response.txt();
      const statusLink = {
        text: urls.text,
        href: urls.href,
        status: response.status,
        message: response.statusText,
        file: urls.route
      }
      // console.log(response.status);
      console.log(statusLink);
    })
    // .then(data => {
    //     console.log('datos:' + data);
    // })
    .catch(err => {
      console.error('ERROR:', err.message)
    });
};
//Text,href,file,status,mensaje

module.exports = {
  routeExist,
  routeAbsolut,
  isFile,
  readFile,
  pathResolve,
  //extensionMDFileInDirectory,
  extensionMDFile,
  //getLinksFiles
  validateURL
};

