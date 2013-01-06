if (typeof require !== "undefined") {
    var chai = require('chai'),
        requirejs = require('requirejs');
    requirejs.config({
        baseUrl: '..',
        nodeRequire: require,
    });

    var bsp = requirejs('../lib/bsp.js');
} else {
    var bsp = BSP;
}

var assert = chai.assert;
chai.Assertion.includeStack = true;

describe('BSP', function() {

    it('is a tree', function() {

        var a = new bsp.Node();
        var b = new bsp.Node();
        a.front = b;

    })

    it('can merge trees with a cell partition function', function() {

        var partitionBSP = function(node, partition) {
            if ((node.partition === 'x') && (partition === 'a')) {
                return {
                    front: new bsp.Node('xa+', undefined, undefined),
                    back: new bsp.Node('xa-', node.front, node.back)
                }
            } else if (partition === 'b') {
                return {
                    front: node,
                    back: undefined,
                }
            } 
            throw Error('invalid partition? node:', node.partition, 'partition', partition);
        }

        var mergeTreeWithCell = function(t1, t2) {
            return t1 === undefined ? t2 : t1;
        }

        var c = new bsp.Node('c'),
            b = new bsp.Node('b', undefined, c),
            a = new bsp.Node('a', undefined, b);

        var z = new bsp.Node('z'),
            y = new bsp.Node('y', undefined, z),
            x = new bsp.Node('x', undefined, y);


        var merged = new bsp.Merger(mergeTreeWithCell, partitionBSP).mergeTrees(a, x);
        assert.deepEqual({
            partition: 'a',
            front: {
                partition: 'xa+',
            },
            back: {
                partition: 'b',
                front: {
                    partition: 'xa-',
                    back: {
                        partition: 'y',
                        back: {
                            partition: 'z'
                        }
                    }
                },
                back: {
                    partition: 'c'
                }
            }
        }, merged);

    })

})
