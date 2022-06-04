const markov = require("./markov");

let text, mM;
beforeEach(function () {
    text = "the cat is in the hat which belongs to the cat";
    mM = new markov.MarkovMachine(text);
});

// teardown
afterEach(() => {
    text = "";
});

test('make chain', function () {
    //const chains = mM.makeChains();
    const chains = mM.textChains;                                           console.log(chains);
    expect(chains).toBeInstanceOf(Object)
    let randInd = Math.floor(Math.random() * Object.keys(chains).length);
    expect(Object.keys(chains).length).toEqual(9)
    expect(Object.values(chains)[randInd][0]).toEqual(expect.any(String))
})

let numWords = 10; 

test('output should not exceed default number of words', () => {
    const test =mM.makeText(numWords);                                      
    const textArr = test.split(" ");                                            console.log(textArr);
    expect(textArr.length).toBeLessThanOrEqual(numWords);
});

// describe('makeChains function', () => {
//     test('inputting sample text should output a chain including the word "the" twice at the key "is in"', () => {
//         const test = mM.makeChains();                                                             
//         expect(Object.keys(test)).toEqual(expect.arrayContaining(['is in']));
//         expect(test['cat in']).toEqual(expect.arrayContaining(['the']));
//         expect(test.in.length).toEqual(2);
//         expect(chain.in.filter(word => word === "the").length).toEqual(2);
//     });

//     test('inputting sample text should output a chain including two items, the last one null at the key "hat"', () => {
//         const test = mM.makeChains();
//         expect(Object.keys(test)).toEqual(expect.arrayContaining(['hat']));
                                                                                
//         expect(test.hat).toEqual(expect.arrayContaining(['is', null]));
//         expect(test.hat.length).toEqual(2);
//     });

//     test('inputting sample text should output expected chain', () => {
//         const test = mM.makeChains();
//         expect(test).toEqual(chain);
//     });
// });

// describe('makeText function', () => {
//     let numWords = 100;

//     // test('output should be at least as long as ')
//     test('output should not exceed default number of words', () => {
//         const test =mM.makeText();
//         const textArr = test.split(" ");
//         expect(textArr.length).toBeLessThanOrEqual(numWords);
//     });

//     test('output should not exceed specified word count', () => {
//         const test1 = mM.makeText(1);
//         const test20 = mM.makeText(5);
        
//         const array1 = test1.split(" ");
//         const array20 = test20.split(" ");
       
//         expect(array1.length).toBeLessThanOrEqual(1);
//         expect(array20.length).toBeLessThanOrEqual(20);
        
//     });

//     // the is actually testing if the output has *all* of the input words....
//     // test('output words should only have words from the input text', () => {
//     //     const test = mm.makeText().toLowerCase();
//     //     const testArray = test.split(/[ \r\n]+/);
//     //     expect(testArray).toEqual(expect.arrayContaining(mm.words))
//     // })
   
// });