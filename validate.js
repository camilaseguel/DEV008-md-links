//ejemplo encontrado
//debe ir dentro de una función

//response.ok = comprobamos si la peticion es correcta
//usamos response.text para procesar la petición
//capturamos el error con catch()
fetch('/robots.txt')
    .then(response => {
        if (response.ok)
            return response.txt();
        throw new Error(response.status);
    })
    .then(data => {
        console.log('datos:' + data);
    })
    .catch(err => {
        console.error('ERROR:', err.message)
    });

/*
    
//ejemplo encontrado
//debe ir dentro de una función

//response.ok = comprobamos si la peticion es correcta
//usamos response.text para procesar la petición
//capturamos el error con catch()
function validateURL(url) {
    fetch(url)
      .then(response => response.text())
    //.then(data => console.log(data))
    // if (response.clone().ok)
    //     return response.json();
    // throw new Error(response.status);
    // console.log(response);
    // if (response.ok){
    //   return response.status
    // }
  }
  //   .then(data => {
  //   console.log("Datos: " + data);
  // })
  //   .catch(err => {
  //     console.error('ERROR:', err.message)
  //   });
  */
 /*
 
function validateOk(url){
  fetch(url)
    .then(response => {
      if (response.ok) {
          return true;
      } else {
        return false
      }
      throw new Error(response.status);
  })
  .then(data => {
      console.log('datos:' + data);
  })
  .catch(err => {
      console.error('ERROR:', err.message)
  });
}

validateOk('https://www.youtube.com/watch?v=Lub5qOmY4JQ')
*/