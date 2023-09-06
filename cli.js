const {mdLinks} = require ('./index.js')
const [, , ...args] = process.argv;
console.log(args)
const route = args[0];
const validate = args.includes('--validate');
const stats = args.includes('--stats');
const option = { validate, stats };
console.log(option)

mdLinks(route, option)
.then(()=>{
//si options es = =  a validate
})
.catch((error)=>{
    console.log(error)
})

//node cli.js 'siempre me devuelve una ruta' [options] ==> cuando uso ==> $ node cli.js 'index.js' ==> ['index.js']
//node cli.js 'siempre me devuelve una ruta' --validate ==> $ node cli.js 'index.js' --validate ==> [ 'index.js', '--validate' ]
//node cli.js 'siempre me devuelve una ruta' --stats ==> $ node cli.js 'index.js' --stats ==> [ 'index.js', '--stats' ]
//node cli.js 'siempre me devuelve una ruta' --validate --stats ==> $ node cli.js 'index.js' --validate --stats ==> [ 'index.js', '--validate', '--stats' ]

