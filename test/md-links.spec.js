const mdLinks = require('./index.js');


describe('mdLinks', () => {

  it('deberia devolver una promesa', () => {
    expect(mdLinks()).toBe(typeof Promise);
  });

  it('deberia.', () => {
    console.log('FIX ME!');
  });
});
