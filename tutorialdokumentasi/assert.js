//buka terminal ketik node assert

//
// rumus: assert(value[, message])

// contoh
// const assert = require('assert');
// assert(true) hasilnya = ok
// assert (false) hasilnya = throw "assertionError: false == true"

// assert.deepEqual(actual, expected[, message])
// assert.deepStrictEqual(actual, expected[, message])
// assert.doesNotThrow(block[, error][, message])
// assert.equal(actual, expected[, message])
// assert.fail(actual, expected, message, operator)
// assert.ifError(value)
// assert.notDeepEqual(actual, expected[, message])
// assert.notDeepStrictEqual(actual, expected[, message])
// assert.notEqual(actual, expected[, message])
// assert.notStrictEqual(actual, expected[, message])
// assert.ok(value[, message])
// assert.strictEqual(actual, expected[, message])
// assert.throws(block[, error][, message])

// assert module melayani simple set pemasukan test yang dapat digunakan untuk test invariant. module dimaksudkan untuk penggunaan internal yang digunakan node.js, tetapi dapat digunakan dalam aplikasi code via require('assert'). bagaimanapun assert adalah bukan testing framework dan itu tidak dimaksukan sebagai tujuan umum assertion library

// API untuk assert modul dikunci. ini berarti disana akan tidak ada atambahan atau perubahan ke method yang mengimiplementasikan dan membuka ke module



const assert = require('assert');

assert(false); // akan throw pesan AssertionError: false == true


