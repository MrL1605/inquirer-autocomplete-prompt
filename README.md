# inquirer-autocomplete-prompt


Autocomplete prompt for [inquirer](https://github.com/SBoudrias/Inquirer.js)


## Installation

```
npm i -S inquirer-autocomplete
```

## Usage


This prompt is anonymous, meaning you can register this prompt with the type name you please:

```javascript
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete'));
inquirer.prompt({
  type: 'autocomplete',
  ...
})
```

Change `autocomplete` to whatever you might prefer.

### Options

> **Note:** _allowed options written inside square brackets (`[]`) are optional. Others are required._

`type`, `name`, `message`, `source`[, `pageSize`, `filter`, `when`, `suggestOnly`, `wordComplete`, `validate`]

See [inquirer](https://github.com/SBoudrias/Inquirer.js) readme for meaning of all except **source** and **suggestOnly**.

**Source** will be called with previous answers object and the current user input each time the user types, it **must** return a promise.

**Source** will be called once at at first before the user types anything with **null** as the value. If a new search is triggered by user input it maintains the correct order, meaning that if the first call completes after the second starts, the results of the first call are never displayed.

**suggestOnly** is default **false**. Setting it to true turns the input into a normal text input. Meaning that pressing enter selects whatever value you currently have. And pressing tab autocompletes the currently selected value in the list. This way you can accept manual input instead of forcing a selection from the list.

**wordComplete** is default **false**. This attribute is used when you want to replace only the last word in current text with the selected choice, instead of the whole answer. If this is set, **suggestOnly** is set to true.

**validate** is only active when **suggestOnly** is set to **true**. It behaves like validate for the input prompt.

**replaceOnSubmit** is a function which will be called after user submits an answer. Similar to source it takes past answers and current question's answer as parameters and expects a string. This string will be replaced by current question and then moves to next question/exits. 

#### Example

```javascript
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete'));
inquirer.prompt([{
  type: 'autocomplete',
  name: 'from',
  message: 'Select a state to travel from',
  source: function(answersSoFar, input) {
    return myApi.searchStates(input);
  }
}]).then(function(answers) {
  //etc
});
```

See also [example.js](https://github.com/mokkabonna/inquirer-autocomplete-prompt/blob/master/example.js) for a working example.

I recommend using this package with [fuzzy](https://www.npmjs.com/package/fuzzy) if you want fuzzy search. Again, see the example for a demonstration of this.

![Autocomplete prompt](./inquirer.gif)

## Credits
[Martin Hansen](https://github.com/mokkabonna/)
[Lalit Umbarkar](https://github.com/mrl1605/)

## License

ISC
