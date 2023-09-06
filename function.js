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


//Peticiones al servidor con FETCH()
function validateURL2(urls) {
  return fetch(urls.href)
    .then(response => {
      return {
        text: urls.text,
        href: urls.href,
        status: response.status,
        message: response.statusText,
        file: urls.route
      }
    })
    .catch(err => {
    });
};

function countUrls(urls) {
  const nCountLinks = urls.length;

  return nCountLinks;
}

function statisticsOfUrls(urls) {
  const uniqueLinks = [];

  urls.forEach((item) => {
    if (!uniqueLinks.includes(item.href)) {
      uniqueLinks.push(item.href);
    }
  });

  const totalUnique = uniqueLinks.length;

  return totalUnique;
}

function statisticsBrokenUrls(urls) {
  let count = 0;

  for (const link of urls) {
    if (link.ok !== 'ok') {
      count++;
    }

    return count;
  }
}

module.exports = {
  routeExist,
  routeAbsolut,
  isFile,
  readFile,
  pathResolve,
  extensionMDFile,
  validateURL2,
  countUrls,
  statisticsOfUrls,
  statisticsBrokenUrls

};

