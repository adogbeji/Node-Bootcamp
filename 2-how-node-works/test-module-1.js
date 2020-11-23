//jshint esversion:6

class Calculator {
  add(a, b) {
    return a+b;
  }

  multiply(a, b) {
    return a*b;
  }

  divide(a, b) {
    return a/b;
  }
}

module.exports = Calculator;  //NB: 'module.exports' is exactly what is returned from ONE module
