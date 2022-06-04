/** Textual markov chain generator */

class MarkovMachine {

  /** build markov machine; read in text.*/
  constructor(text) {
    let sentences = text.split('.');
    this.wordsArr = [];
    for (let s = 0; s < sentences.length; s++) {
      let words = sentences[s].split(/[ \r\n]+/);
      this.words = words.filter(c => c !== "");
      this.wordsArr.push(this.words);
    }

    this.textChains = {};
    this.makeChains();
  }
  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let w1, w2, bigram;
    //  this.textChains[bigram] = [];
    for (let a = 0; a < this.wordsArr.length; a++) {//looping over array of sentences
      let wordsChunk = this.wordsArr[a]; //former sentence
    
      for (let w = 0; w < wordsChunk.length; w++) {//looping over words in sentence
        w1 = wordsChunk[w];
        if (wordsChunk[w + 1]) {
          w2 = wordsChunk[w + 1]; bigram = w1 + ' ' + w2;

          if (wordsChunk[w + 2]) {
            this.textChains[bigram] = (this.textChains[bigram] || []).concat([wordsChunk[w + 2]]);
   
          } else {

            this.textChains[bigram] = (this.textChains[bigram] || []).concat([wordsChunk[0]]);
            break;
          }

        } else {
          bigram = w1 + ' '; this.textChains[bigram] = '';
        }
      }
    }                                                         //console.log(this.textChains);
  }

  /** return random text from chains */
  makeText(numWords = 50) {
    let newText = '';
   
      let randArr = Array.from({ length: Object.keys(this.textChains).length }, (x, i) => i);
      randArr.sort(() => 0.5 - Math.random()); // shuffle array
      randArr.splice(numWords);                            //   console.log(randArr);
      for (let k = 0; k < randArr.length; k++) {
        let ind = randArr[k];                             //console.log(ind);
        let keyText = Object.keys(this.textChains)[ind]; //console.log(keyText);
        let nextPosition = Math.floor(Math.random() * Object.values(this.textChains[keyText]).length);
        let valText = Object.values(this.textChains[keyText])[nextPosition];
        newText += keyText + ' ' + valText + ' ';
      }
      return newText;
  }
}

module.exports = {
  MarkovMachine,
};