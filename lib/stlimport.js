/**
 * Adapted from https://github.com/mrdoob/three.js/blob/master/examples/js/loaders/STLLoader.js
 */

define([
    './vector3',
    './plane2d',
    './polygon3d',
    './bsp',
  ], function(Vector3, Plane3D, Polygon3D, BSP) {

  function ensureBinary(buf) {

    if (typeof buf === "string") {
      var array_buffer = new Uint8Array(buf.length);
      for(var i = 0; i < buf.length; i++) {
        array_buffer[i] = buf.charCodeAt(i) & 0xff; // implicitly assumes little-endian
      }
      return array_buffer.buffer || array_buffer;
    } else {
      return buf;
    }

  }    


  function ensureString(buf) {

    if (typeof buf !== "string") {
      var array_buffer = new Uint8Array(buf);
      var str = '';
      for(var i = 0; i < buf.byteLength; i++) {
        str += String.fromCharCode(array_buffer[i]); // implicitly assumes little-endian
      }
      return str;
    } else {
      return buf;
    }
  }

  function isBinary(binData) {
    var expect, face_size, n_faces, reader;
    reader = new DataView(binData);
    face_size = (32 / 8 * 3) + ((32 / 8 * 3) * 3) + (16 / 8);
    n_faces = reader.getUint32(80,true);
    expect = 80 + (32 / 8) + (n_faces * face_size);
    return expect === reader.byteLength;
  }

  function parseBinary(data) {

    var reader = new DataView(data);
    var n_faces = reader.getUint32(80, true);
    var dataOffset = 84;
    var faceLength = 12 * 4 + 2;
    var normal, start;
    var faces = [];

    for (var face = 0; face < n_faces; face++) {

      start = dataOffset + face * faceLength;
      normal = new Vector3(
        reader.getFloat32(start,true),
        reader.getFloat32(start + 4,true),
        reader.getFloat32(start + 8,true)
      );

      var vertices = [1,2,3].map(function(i) {
        var vertexstart = start + i * 12;
        return new Vector3(
          reader.getFloat32(vertexstart,true),
          reader.getFloat32(vertexstart + 4,true),
          reader.getFloat32(vertexstart + 8,true));
      });

      faces.push(
        Polygon3D.from3PointsAndNormal(vertices[0], vertices[1], vertices[2], normal));
    }

    return faces;
  }

  function parseASCII(data) {

    var patternFace = /facet([\s\S]*?)endfacet/g;
    var patternNormal = /normal[\s]+([\-+]?[0-9]+\.?[0-9]*([eE][\-+]?[0-9]+)?)+[\s]+([\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?)+[\s]+([\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?)+/g;
    var patternVertex = /vertex[\s]+([\-+]?[0-9]+\.?[0-9]*([eE][\-+]?[0-9]+)?)+[\s]+([\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?)+[\s]+([\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?)+/g;
    var result, text, normal, vertices;
    var faces = [];

    while ((result = patternFace.exec(data)) !== null) {

      text = result[0];

      while ((result = patternNormal.exec(text)) !== null) {
        normal = new Vector3(
          parseFloat(result[1]),
          parseFloat(result[3]), 
          parseFloat(result[5]));
      }

      vertices = [];
      while ((result = patternVertex.exec(text)) !== null) {
        vertices.push(new Vector3(
          parseFloat(result[1]),
          parseFloat(result[3]),
          parseFloat(result[5])));
      }

      faces.push(
        Polygon3D.from3PointsAndNormal(vertices[0], vertices[1], vertices[2], normal));

    }

    return faces;
  }


  function addFaceToBsp(bsp, line) {
    
    if (bsp && (bsp instanceof BSP.Node)) {
      var splits = line.splitBy(bsp.plane);
      if (splits.back) {
        bsp.back = addFaceToBsp(bsp.back, splits.back);
      }
      if (splits.front) {
        bsp.front = addFaceToBsp(bsp.front, splits.front);
      }
      return bsp;
    } else {
      return new BSP.Node(line.s, new BSP.Cell(true), new BSP.Cell(false));
    }

  }

  // Faces can be either lines (2d) or polygons (3d)
  function fromFaces(faces) {
    var result;
    for (var i = 0; i < faces.length; ++i) {
      result = addFaceToBsp(result, faces[i]);
    }
    return result;
  }

  // Parse either binary or ASCII data
  function parse(data) {
    var binData = ensureBinary(data);
    var faces =  isBinary(binData) ?      
      parseBinary(binData) : parseASCII(ensureString(data));
    return fromFaces(faces);
  }

  return {
    parse: parse,
  };

});

