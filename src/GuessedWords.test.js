import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "../test/testUtils";
import GuessedWords from "./GuessedWords";

const defaultProps = 
  {
    guessedWords: [{ guessedWord: "train", matchLetterCount: 3 }]
  };

const setup = (props={}) => {
const setupProps = {...defaultProps, ...props};
return shallow(<GuessedWords {...setupProps} />);
};

test('does not throw warning with expected props', () => {
checkProps(GuessedWords, defaultProps);
});

describe('if there are no words guessed', () => {
  
  let wrapper;
  
  beforeEach(() => {
    wrapper = setup({guessedWords: []});
  });
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-guessed-words');
    expect(component.length).toBe(1);
  });
  

  test('renders instructions to guess the words', () => {
    const instructions = findByTestAttr(wrapper, 'guess-instructions');
    expect(instructions.text().length).not.toBe(0);
  });

})

describe('if there are words guessed', () => {

  let wrapper;
  const guessedWords = [
    {guessedWord: 'train', matchLetterCount: 3},
    {guessedWord: 'agile', matchLetterCount: 1},
    {guessedWord: 'party', matchLetterCount: 5}
  ];

  beforeEach(() => {
    wrapper = setup({guessedWords});
  });


  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-guessed-words');
    expect(component.length).toBe(1);
  });

  test('renders "guessed words" section', () => {
    const guessedWordsNode = findByTestAttr(wrapper, 'guessed-words');
    expect(guessedWordsNode.length).toBe(1);
  });

  test('correct number of guessed words', () => {
    const guessedWordNodes = findByTestAttr(wrapper, 'guessed-word');
    expect(guessedWordNodes.length).toBe(guessedWords.length);
  });
  
});