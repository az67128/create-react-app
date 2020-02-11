const readline = require("readline");
const { Writable } = require("stream");
const fs = require("fs");

const ask = (question, muted = false) =>
  new Promise(resolve => {
    const mutableStdout = new Writable({
      write: function(chunk, encoding, callback) {
        if (!this.muted) process.stdout.write(chunk, encoding);
        callback();
      }
    });
    mutableStdout.muted = false;
    const rl = readline.createInterface({
      input: process.stdin,
      output: mutableStdout,
      terminal: true
    });
    rl.question(question + ":", function(answer) {
      rl.close();
      // To add line after password
      if (muted) console.log("");
      resolve(answer);
    });
    mutableStdout.muted = muted;
  });

function toCamel(string) {
  return string.replace(/(.)_+(.)/gi, (_, $1, $2) => $1 + $2.toUpperCase())
}


function makeBoFolder(path) {
    fs.mkdirSync(path, { recursive: true }, err => {
      throw new Error("Not possible to create path " + path);
    });
  }

module.exports = { ask, toCamel, makeBoFolder };
