define([], function() {

  'use strict';

  var determinant2x2 = function(m) {
    return m[0][0]*m[1][1] - m[0][1]*m[1][0];
  };

  var determinant3x3 = function(m) {
    return (m[0][0]*m[1][1]*m[2][2] + m[0][1]*m[1][2]*m[2][0] + m[0][2]*m[1][0]*m[2][1] - 
      m[0][0]*m[1][2]*m[2][1] - m[0][1]*m[1][0]*m[2][2] - m[0][2]*m[1][1]*m[2][0]);
  };

  var determinant4x4 = function(m) {
    return m[0][3]*m[1][2]*m[2][1]*m[3][0] - m[0][2]*m[1][3]*m[2][1]*m[3][0] - m[0][3]*m[1][1]*m[2][2]*m[3][0] + m[0][1]*m[1][3]*m[2][2]*m[3][0]+
         m[0][2]*m[1][1]*m[2][3]*m[3][0] - m[0][1]*m[1][2]*m[2][3]*m[3][0] - m[0][3]*m[1][2]*m[2][0]*m[3][1] + m[0][2]*m[1][3]*m[2][0]*m[3][1]+
         m[0][3]*m[1][0]*m[2][2]*m[3][1] - m[0][0]*m[1][3]*m[2][2]*m[3][1] - m[0][2]*m[1][0]*m[2][3]*m[3][1] + m[0][0]*m[1][2]*m[2][3]*m[3][1]+
         m[0][3]*m[1][1]*m[2][0]*m[3][2] - m[0][1]*m[1][3]*m[2][0]*m[3][2] - m[0][3]*m[1][0]*m[2][1]*m[3][2] + m[0][0]*m[1][3]*m[2][1]*m[3][2]+
         m[0][1]*m[1][0]*m[2][3]*m[3][2] - m[0][0]*m[1][1]*m[2][3]*m[3][2] - m[0][2]*m[1][1]*m[2][0]*m[3][3] + m[0][1]*m[1][2]*m[2][0]*m[3][3]+
         m[0][2]*m[1][0]*m[2][1]*m[3][3] - m[0][0]*m[1][2]*m[2][1]*m[3][3] - m[0][1]*m[1][0]*m[2][2]*m[3][3] + m[0][0]*m[1][1]*m[2][2]*m[3][3];
  };

  var minorDeterminant = function(m, i, j) {
    return m[(i+1)%3][(j+1)%3]*m[(i+2)%3][(j+2)%3] - m[(i+1)%3][(j+2)%3]*m[(i+2)%3][(j+1)%3];
  };

  var transpose2x2 = function(a) {
    return [
      [a[0][0], a[1][0]],
      [a[0][1], a[1][1]],
    ];
  };

  var transpose3x3 = function(a) {
    return [
      [a[0][0], a[1][0], a[2][0]],
      [a[0][1], a[1][1], a[2][1]],
      [a[0][2], a[1][2], a[2][2]]
    ];
  };

  var multiply3x3 = function(a,b) {
    return [
      [
        a[0][0] * b[0][0] + a[0][1] * b[1][0] + a[0][2] * b[2][0],
        a[1][0] * b[0][0] + a[1][1] * b[1][0] + a[1][2] * b[2][0],
        a[2][0] * b[0][0] + a[2][1] * b[1][0] + a[2][2] * b[2][0]
      ],
      [
        a[0][0] * b[0][1] + a[0][1] * b[1][1] + a[0][2] * b[2][1],
        a[1][0] * b[0][1] + a[1][1] * b[1][1] + a[1][2] * b[2][1],
        a[2][0] * b[0][1] + a[2][1] * b[1][1] + a[2][2] * b[2][1]
      ],
      [
        a[0][0] * b[0][2] + a[0][1] * b[1][2] + a[0][2] * b[2][2],
        a[1][0] * b[0][2] + a[1][1] * b[1][2] + a[1][2] * b[2][2],
        a[2][0] * b[0][2] + a[2][1] * b[1][2] + a[2][2] * b[2][2]
      ]
    ];
  };

  return {
    determinant2x2   : determinant2x2,
    transpose2x2   : transpose2x2,
    determinant3x3   : determinant3x3,
    minorDeterminant : minorDeterminant,
    transpose3x3   : transpose3x3,
    multiply3x3    : multiply3x3,
    determinant4x4   : determinant4x4,
  };

});