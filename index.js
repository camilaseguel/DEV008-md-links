const { routeExist, routeAbsolut, isFile, readFile, pathResolve, extensionMDFile, validateURL } = require('./function.js')

const [, , ...args] = process.argv
const route = args[0];
const option = args[1];


const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    if (routeExist(path)) {
      // resolve('path exist');
      let finalPath;
      if (routeAbsolut(path)) {
        //resolve('is absolut')
        finalPath = path;
      } else {
        const absolutPath = pathResolve(path)
        //resolve (absolutPath)
        finalPath = absolutPath;
      }
      if (isFile(finalPath)) {
        if (extensionMDFile(finalPath)) {
          //resolve ('is .md')
          readFile(finalPath).then((fileContent) => {
            let urls = [];
            const regex = /\[[^\[\]]*\]\((http|https):\/\/[^\(\)]+\)/g;
            const result = fileContent.match(regex);
            //console.log(result)
            result.forEach((item) => {
              // console.log(item.slice(1, item.indexOf(']')));
              // console.log(item.slice(item.indexOf('(') + 1, item.length - 1));
              urls.push({
                text: item.slice(1, item.indexOf(']')),
                href: item.slice(item.indexOf('(http') + 1, item.length - 1),
                route: finalPath
              });
            })
            urls.forEach((item) => {
              validateURL(item)
            })
          }).catch((error) => {
            reject(error)
          })
        } else {
          reject('is not .md')
        }
        //resolve('is a file')
      } else {
        reject(' is not a file')
      }
    } else {
      reject('invalid');
    }
  })
};

mdLinks('README.md', {})
  .then((result) => {
    console.log(result)
  })
  .catch((error) => {
    console.log(error)
  });

module.exports = {
  mdLinks
};
