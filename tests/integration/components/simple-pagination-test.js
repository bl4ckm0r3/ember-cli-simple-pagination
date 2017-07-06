import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { $hook, initialize as initializeTestHook } from 'ember-hook';
import Ember from 'ember';

const { $ } = Ember;

moduleForComponent('simple-pagination', 'Integration | Component | campaign pagination', {
  integration: true,
  beforeEach() {
    initializeTestHook();
  }
});

test('it renders without content', function(assert) {
  this.render(hbs`{{simple-pagination}}`);

  assert.equal($hook('pagination-container').length, 0);

  assert.equal($hook('pagination-previous').length, 0);
  assert.equal($hook('pagination-next').length, 0);
  assert.equal($hook('pagination-item').length, 0);
});

test('it renders with content', function(assert) {
  const totalResults = 50;
  const currentPage = 1;
  const limit = 10;
  const expectedPages = Math.ceil(totalResults / limit);

  this.set('totalResults', totalResults);
  this.set('currentPage', currentPage);
  this.set('limit', limit);

  this.render(hbs`{{simple-pagination totalResults=totalResults currentPage=currentPage limit=limit}}`);

  assert.equal($hook('pagination-container').length, 1);

  assert.equal($hook('pagination-previous').length, 1);
  assert.equal($hook('pagination-next').length, 1);
  assert.equal($hook('pagination-item').length, expectedPages);

  $hook('pagination-item').each((idx, el) => {
    assert.equal($(el).text().trim(), idx + 1);
  });
});

test('it does not render with overflow offset', function(assert) {
  const totalResults = 50;
  const currentPage = 10;
  const limit = 10;

  this.set('totalResults', totalResults);
  this.set('currentPage', currentPage);
  this.set('limit', limit);

  const expectedItems = [];
  const expectedPages = expectedItems.length;

  this.render(hbs`{{simple-pagination totalResults=totalResults currentPage=currentPage limit=limit}}`);

  assert.equal($hook('pagination-container').length, 0);

  assert.equal($hook('pagination-previous').length, 0);
  assert.equal($hook('pagination-next').length, 0);
  assert.equal($hook('pagination-item').length, expectedPages);

  assert.equal($hook('pagination-ellipsis').length, 0);
});

test('it renders with content - last page', function(assert) {
  const totalResults = 50;
  const currentPage = 4;
  const limit = 10;

  this.set('totalResults', totalResults);
  this.set('currentPage', currentPage);
  this.set('limit', limit);

  const expectedItems = [1, 2, 3, 4, 5];
  const expectedPages = expectedItems.length;

  this.render(hbs`{{simple-pagination totalResults=totalResults currentPage=currentPage limit=limit}}`);

  assert.equal($hook('pagination-container').length, 1);

  assert.equal($hook('pagination-previous').length, 1);
  assert.equal($hook('pagination-next').length, 1);
  assert.equal($hook('pagination-item').length, expectedPages);

  $hook('pagination-item').each((idx, el) => {
    assert.equal($(el).text().trim(), expectedItems[idx]);
  });

  assert.equal($hook('pagination-ellipsis').length, 0);
});

test('it renders with just 1 more than maxPages', function(assert) {
  const totalResults = 50;
  const currentPage = 5;
  const maxPages = 5;
  const limit = 9;

  this.set('totalResults', totalResults);
  this.set('currentPage', currentPage);
  this.set('limit', limit);
  this.set('maxPages', maxPages);

  const expectedItems = [1, 2, 3, 4, 5, 6];
  const expectedPages = expectedItems.length;

  this.render(hbs`{{simple-pagination maxPages=maxPages totalResults=totalResults currentPage=currentPage limit=limit}}`);

  assert.equal($hook('pagination-container').length, 1);

  assert.equal($hook('pagination-previous').length, 1);
  assert.equal($hook('pagination-next').length, 1);
  assert.equal($hook('pagination-item').length, expectedPages);

  $hook('pagination-item').each((idx, el) => {
    assert.equal($(el).text().trim(), expectedItems[idx]);
  });

  assert.equal($hook('pagination-ellipsis').length, 0);
});

test('it renders with lots of content - mid-start page', function(assert) {
  const totalResults = 50;
  const currentPage = 11;
  const limit = 2;

  const expectedItems = [1, 10, 11, 12, 13, 14, 25];
  const expectedPages = expectedItems.length;

  this.set('totalResults', totalResults);
  this.set('currentPage', currentPage);
  this.set('limit', limit);

  this.render(hbs`{{simple-pagination totalResults=totalResults currentPage=currentPage limit=limit}}`);

  assert.equal($hook('pagination-container').length, 1);

  assert.equal($hook('pagination-previous').length, 1);
  assert.equal($hook('pagination-next').length, 1);
  assert.equal($hook('pagination-ellipsis').length, 2);
  assert.equal($hook('pagination-item').length, expectedPages);

  $hook('pagination-item').each((idx, el) => {
    assert.equal($(el).text().trim(), expectedItems[idx]);
  });
});

test('it renders with lots of content - first page', function(assert) {
  const totalResults = 50;
  const limit = 2;
  const currentPage = 0;

  this.set('totalResults', totalResults);
  this.set('currentPage', currentPage);
  this.set('limit', limit);

  const expectedItems = [1, 2, 3, 4, 5, 25];

  const expectedPages = expectedItems.length;

  this.set('currentPage', currentPage);


  this.render(hbs`{{simple-pagination totalResults=totalResults currentPage=currentPage limit=limit}}`);

  assert.equal($hook('pagination-container').length, 1);

  assert.equal($hook('pagination-previous').length, 1);
  assert.equal($hook('pagination-next').length, 1);
  assert.equal($hook('pagination-ellipsis').length, 1);
  assert.equal($hook('pagination-item').length, expectedPages);

  $hook('pagination-item').each((idx, el) => {
    assert.equal($(el).text().trim(), expectedItems[idx]);
  });
});

test('it renders with lots of content - last page', function(assert) {
  const totalResults = 50;
  const limit = 2;
  const currentPage = 24;

  this.set('totalResults', totalResults);
  this.set('currentPage', currentPage);
  this.set('limit', limit);

  const expectedItems = [1, 21, 22, 23, 24, 25];

  const expectedPages = expectedItems.length;

  this.set('currentPage', currentPage);


  this.render(hbs`{{simple-pagination totalResults=totalResults currentPage=currentPage limit=limit}}`);

  assert.equal($hook('pagination-container').length, 1);

  assert.equal($hook('pagination-previous').length, 1);
  assert.equal($hook('pagination-next').length, 1);
  assert.equal($hook('pagination-ellipsis').length, 1);
  assert.equal($hook('pagination-item').length, expectedPages);

  $hook('pagination-item').each((idx, el) => {
    assert.equal($(el).text().trim(), expectedItems[idx]);
  });
});

test('it renders with lots of content - mid-end page', function(assert) {
  const totalResults = 50;
  const limit = 2;
  const currentPage = 22;

  this.set('totalResults', totalResults);
  this.set('currentPage', currentPage);
  this.set('limit', limit);

  const expectedItems = [1, 21, 22, 23, 24, 25];

  const expectedPages = expectedItems.length;

  this.set('currentPage', currentPage);


  this.render(hbs`{{simple-pagination totalResults=totalResults currentPage=currentPage limit=limit}}`);

  assert.equal($hook('pagination-container').length, 1);

  assert.equal($hook('pagination-previous').length, 1);
  assert.equal($hook('pagination-next').length, 1);
  assert.equal($hook('pagination-ellipsis').length, 1);
  assert.equal($hook('pagination-item').length, expectedPages);

  $hook('pagination-item').each((idx, el) => {
    assert.equal($(el).text().trim(), expectedItems[idx]);
  });
});

test('it disables next at last page', function(assert) {
  const totalResults = 50;
  const limit = 2;
  const currentPage = 24;

  this.set('totalResults', totalResults);
  this.set('currentPage', currentPage);
  this.set('limit', limit);
  this.set('currentPage', currentPage);


  this.render(hbs`{{simple-pagination totalResults=totalResults currentPage=currentPage limit=limit}}`);

  assert.notOk($hook('pagination-next').find('a').length, 'the next button will not have link when disabled');
  assert.equal($hook('pagination-next').attr('disabled'), 'disabled', 'next button is disabled');
});

test('it disables previous at first page', function(assert) {
  const totalResults = 50;
  const limit = 2;
  const currentPage = 0;

  this.set('totalResults', totalResults);
  this.set('currentPage', currentPage);
  this.set('limit', limit);
  this.set('currentPage', currentPage);


  this.render(hbs`{{simple-pagination totalResults=totalResults currentPage=currentPage limit=limit}}`);

  assert.notOk($hook('pagination-previous').find('a').length, 'the previous button will not have link when disabled');
  assert.equal($hook('pagination-previous').attr('disabled'), 'disabled', 'previous button is disabled');
});

test('it applies the current class correctly', function(assert) {
  const totalResults = 50;
  const limit = 2;
  let currentPage = 0;

  this.set('totalResults', totalResults);
  this.set('currentPage', currentPage);
  this.set('limit', limit);
  this.set('currentPage', currentPage);

  this.render(hbs`{{simple-pagination totalResults=totalResults currentPage=currentPage limit=limit}}`);

  assert.ok($hook('pagination-item').first().hasClass('current'));

  currentPage = 3;
  this.set('currentPage', currentPage);

  this.render(hbs`{{simple-pagination totalResults=totalResults currentPage=currentPage limit=limit}}`);
  assert.ok($hook('pagination-item').eq(3).hasClass('current'));
});

test('it will respect args', async function(assert) {
  assert.expect(8);

  const totalResults = 50;
  const limit = 2;
  let currentPage = 5;
  const selectedPage = 0;

  this.set('totalResults', totalResults);
  this.set('currentPage', currentPage);
  this.set('limit', limit);
  this.set('currentPage', currentPage);

  this.set('onNext', () => assert.ok(true, 'onNext Called'));
  this.set('onPrevious', () => assert.ok(true, 'onPrevious Called'));
  this.set('onPage', (page) => {
    assert.ok(true, 'onPage Called');
    assert.equal(page, selectedPage);
  });

  this.render(hbs`{{simple-pagination dry=true totalResults=totalResults currentPage=currentPage limit=limit onNext=(action onNext) onPrevious=(action onPrevious) onPage=(action onPage)}}`);

  assert.ok($hook('pagination-item').eq(3).hasClass('current'));

  await $hook('pagination-item-link-next').trigger('click');
  
  assert.ok($hook('pagination-item').eq(3).hasClass('current'));

  await $hook('pagination-item-link-previous').trigger('click'); 

  assert.ok($hook('pagination-item').eq(3).hasClass('current'));
  
  await $hook('pagination-item-link').eq(selectedPage).trigger('click');

  assert.ok($hook('pagination-item').eq(3).hasClass('current')); 
});

test('it yields when hasBlock', async function(assert) {
  const totalResults = 50;
  const limit = 2;

  this.set('totalResults', totalResults);
  this.set('limit', limit);

  this.render(hbs`{{#simple-pagination
    totalResults=totalResults
    limit=limit
    as |p|}}
      <p data-test={{hook 'currentPage'}}>{{p.currentPage}}</p>
      <p data-test={{hook 'totalPages'}}>{{p.totalPages}}</p>
      <div data-test={{hook 'range'}}>
        {{#each p.range as |item|}}
          <button {{action p.onPage (sub item 1)}}>{{item}}</button>
        {{/each}}
      </div>
      <button {{action p.onNext}} data-test={{hook 'onNext'}}>onNext</button>
      <button {{action p.onPrevious}} data-test={{hook 'onPrevious'}}>onPrevious</button>
    {{/simple-pagination}}
    `);

  assert.equal($hook('currentPage').text().trim(), '0');
  assert.equal($hook('totalPages').text().trim(), '25');
  assert.equal($hook('totalPages').text().trim(), '25');
  assert.ok($hook('range').children().length > 0, 'got results');
  
  let expectedItems = [0, 1, 2, 3, 4, null, 24];

  $hook('range').children().each((idx, item) => {
    assert.equal($(item).text().trim(), expectedItems[idx] === null ? '' : expectedItems[idx]);
  });

  await $hook('range').children().eq(4).trigger('click');
  
  assert.equal($hook('currentPage').text().trim(), '3');
 
  await $hook('onNext').trigger('click');
  await $hook('onNext').trigger('click');

  assert.equal($hook('currentPage').text().trim(), '5');
  
  expectedItems = [0, null, 3, 4, 5, 6, 7, null, 24];
  
  $hook('range').children().each((idx, item) => {
    assert.equal($(item).text().trim(), expectedItems[idx] === null ? '' : expectedItems[idx]);
  });

  await $hook('onPrevious').trigger('click');
  
  assert.equal($hook('currentPage').text().trim(), '4');
  
  expectedItems = [0, 1, 2, 3, 4, null, 24];
  
  $hook('range').children().each((idx, item) => {
    assert.equal($(item).text().trim(), expectedItems[idx] === null ? '' : expectedItems[idx]);
  });  
});
