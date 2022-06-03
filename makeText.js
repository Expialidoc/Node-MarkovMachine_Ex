/** Command-line tool to generate Markov text. */
const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

/** Make Markov machine from text and generate text from it. */
function generateText(text) {
    let mM = new markov.MarkovMachine(text);
    console.log(mM.makeText());
}

/** read file and generate text from it. */
function makeText(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`Cannot read file: ${path}: ${err}`);
            process.kill(1);
        } else {
            generateText(data);
        }
    });
}

/** read URL and make text from it. */
async function makeURLText(url) {
    let res;
    try {
        res = await axios.get(url);
    }
    catch (err) {
        console.error(`Cannot read url ${url}: ${err}`);
        process.exit(1);
    }
    generateText(res.data);
}

/** interpret cmdline to decide what to do. */
let [method, path] = process.argv.slice(2);

const argv = process.argv;
for (let i = 0; i < argv.length; i += 1) {
    console.log(i, argv[i]);
}


if (method === "file") { makeText(path);}

else if (method === "url") { makeURLText(path);}

else {
    console.error(`Unknown method: ${method}`);
    process.exit(1);
}
