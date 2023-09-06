const { routeExist, routeAbsolut, isFile, readFile, pathResolve, extensionMDFile, validateURL2, statisticsOfUrls, statisticsBrokenUrls, countUrls } = require('./function.js')

// const [, , ...args] = process.argv
// const route = args[0];
// const option = args[1];


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

            result.forEach((item) => {
              // console.log(item.slice(1, item.indexOf(']')));
              // console.log(item.slice(item.indexOf('(') + 1, item.length - 1));
              urls.push({
                text: item.slice(1, item.indexOf(']')),
                href: item.slice(item.indexOf('(http') + 1, item.length - 1),
                route: finalPath
              });
            })

            const promiseArray = [];
            

            if (options.validate === true && options.stats === false) {
              

              urls.forEach((item) => {
                console.log('hola')
                promiseArray.push(validateURL2(item))
              })
              Promise.all(promiseArray).then((responses) => {
                
                resolve(responses)

              }).catch((errors) => {
                console.log(errors)
              })
            } else if (
              options.validate === false && options.stats === false) {
              urls.forEach((item) => {
                console.log(item)
              })
            } else if (
              options.validate === false && options.stats === true) {
              return ({
                total: countUrls(urls),
                unique: statisticsOfUrls(urls),
              });
            } else if (
              options.validate === true && options.stats === true) {
              resolve({
                total: countUrls(urls),
                unique: statisticsOfUrls(urls),
                broken: statisticsBrokenUrls(urls)
              })
            }

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

mdLinks('README.md', { validate: true })
  .then((result) => {
    console.log(result)
  })
  .catch((error) => {
    console.log(error)
  });

// module.exports = {
//   mdLinks
// };
