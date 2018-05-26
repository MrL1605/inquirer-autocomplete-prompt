/**
 * List prompt example
 */

'use strict';
var inquirer = require('inquirer');
var _ = require('lodash');
var fuzzy = require('fuzzy');
var Promise = require('promise');

inquirer.registerPrompt('autocomplete', require('./index'));

var states = [
  'Alabama',
  'Alaska',
  'American Samoa',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'District Of Columbia',
  'Federated States Of Micronesia',
  'Florida',
  'Georgia',
  'Guam',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Marshall Islands',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Northern Mariana Islands',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Palau',
  'Pennsylvania',
  'Puerto Rico',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virgin Islands',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming'
];

var foods = [
'Apple',
'Orange',
'Banana',
'Kiwi',
'Lichi',
'Grapefruit',
]


function searchStates(answers, input) {
  input = input || '';
  return new Promise(function(resolve) {
    setTimeout(function() {
      var fuzzyResult = fuzzy.filter(input, states);
      resolve(fuzzyResult.map(function(el) {
        return el.original;
      }));
    }, _.random(30, 500));
  });
}

function search(answers, input) {
  input = input || '';
  var words = input.split(" ");
  input = words[words.length - 1];
  return new Promise(function(resolve) {
    setTimeout(function() {
      var fuzzyResult = fuzzy.filter(input, foods.concat(states));
      resolve(fuzzyResult.map(function(el) {
        return el.original;
      }));
    }, _.random(30));
  });
}


function searchFood(answers, input) {
  input = input || '';
  return new Promise(function(resolve) {
    setTimeout(function() {
      var fuzzyResult = fuzzy.filter(input, foods);
      resolve(fuzzyResult.map(function(el) {
        return el.original;
      }));
    }, _.random(30, 500));
  });
}

inquirer.prompt([{
    type: 'autocomplete',
    name: 'story',
    suggestOnly: true,
    wordComplete: true,
    message: 'Tell me a story.',
    source: search,
    pageSize: 3,
    prefix: "HH",
    suffix: "DD",
    replaceOnSubmit: function(answers, currentAnswer) {
        return "Oh really? " + currentAnswer;
    },
    validate: function(val) {
      return val ? 
        true : 'Type something!';
    } 
  },
  {
    type: 'autocomplete',
    name: 'fruit',
    suggestOnly: true,
    message: 'What is your favorite fruit?',
    source: searchFood,
    pageSize: 4,
    validate: function(val) {
      return val
        ? true : 'Type something!';
    }
  }, {
    type: 'autocomplete',
    name: 'state',
    message: 'Select a state to travel from',
    source: searchStates
  }
]).then(function(answers) {
  console.log(JSON.stringify(answers, null, 2));
});
