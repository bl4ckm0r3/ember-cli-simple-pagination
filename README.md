# ember-cli-simple-pagination

This README outlines the details of collaborating on this Ember addon.

## Installation

```
ember install ember-cli-simple-pagination-component
```

## Usage

The only required property is `totalResults`

*  totalResults `<int>` _The amount of items you have (usually the length of your model/collection)_
*  maxPages `<int>` _The number of pages to show in the pagination component before showing ellipsis_
*  limit `<int>` _The number of items per page_
*  currentPage `<int>` _self explanatory_
*  dry `<boolean>`
*  onPage `<fn>` _Function that will be called when changing page by clicking on any the pagination items but previous and next_
*  onNext `<fn>` _Function that will be called when clicking on `next`_
*  onPrevious `<fn>` _function that will be called when clickin on `previous`_

```js
{{simple-pagination totalResults=86}}
```

```js
{{simple-pagination currentPage=13 totalResults=86}}
```

## Block mode
The component can be used in block mode, in that case it won't be rendereing it's own components but only yielding
```hbs
{{#simple-pagination totalResults=totalResults as |p|}}
  <p>{{p.currentPage}}</p>
  <p>{{p.totalPages}}</p>
  <div>
    {{#each p.range as |item|}}
      <button {{action p.onPage item}}>{{item}}</button>
    {{/each}}
  </div>
  <button {{action p.onNext}}>onNext</button>
  <button {{action p.onPrevious}}>onPrevious</button>
{{/simple-pagination}}
```