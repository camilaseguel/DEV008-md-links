//const mdLinks = require('./index.js');
const functions = require('../function')
 const fs = require('fs');
const path = require('path');

describe('debería retornar algo', () => {
  it('routeExist debería devolver true si la ruta existe', () => {
    expect(typeof functions.routeExist()).toBe('boolean');
  });
  it('routeAbsolut should be a function', () => {
    const a = 'README.md';
    expect(typeof functions.routeAbsolut(a)).toBe('boolean');
  });
  it('isFile should be a function', () => {
    const ab = 'index.js';
    const result = functions.isFile(ab);
    expect(typeof result).toBe('boolean');
  });
  it('pathResolve should be a function', () => {
    const a = 'osito.md';
    const b = 'C:\Users\camil\Desktop\bootcamp\DEV008-md-links\osito.md';
    const result = functions.pathResolve(a)
    expect(typeof result).toBe('string');
  });
  it('extensionMDFile should be a function', () => {
    const filenoMD = 'index.js';
    const filesMD = 'osito.md';
    const result = functions.extensionMDFile(filesMD);
    expect(typeof result).toBe('boolean');
  });
  it('readFile debería leer el archivo MD', async () => {
    const texts = '08.[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado.';
    const fileMarkdown = 'osito.md';
    const resultFinal = functions.readFile(fileMarkdown);
    const result = await resultFinal;

    expect(result).toBe(texts);
  });
  it('countUrls should be a function', () => {
    const array = [1, 2, 3, 4, 5];
    const newArray = array.length;
    const result = functions.countUrls(array);
    expect(typeof result).toBe('number');
  });
  it('statisticsOfUrls should be a function', () => {
    const array = [1, 2, 2, 3, 4, 4, 5];
    const result = functions.statisticsOfUrls(array);
    expect(typeof result).toBe('number');
  });
  it('statisticsBrokenUrls should be a function', () => {
    const array = ['https://neoattack.com/proyectos/','https://aula.cdichile.org/login/index.php'];
    const result = functions.countUrls(array);
    expect(typeof result).toBe('number');
  });
});

