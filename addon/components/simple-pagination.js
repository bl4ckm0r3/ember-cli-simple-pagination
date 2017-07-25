import Component from 'ember-component';
import layout from '../templates/components/simple-pagination';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import computed, { reads } from 'ember-computed';
import { isEmpty, isNone } from 'ember-utils';

const DEFAULT_LIMIT = 10;
const NO_OP = () => {};

export default Component.extend({
  tagName: '',
  layout,

  maxPages: 5,
  limit: 5,
  currentPage: 0,

  onPage: NO_OP,
  onNext: NO_OP,
  onPrevious: NO_OP,

  hasItems: reads('range.length'),

  totalPages: computed('totalResults', 'limit', {
    get() {
      const totalResults = get(this, 'totalResults');
      const limit = get(this, 'limit') || DEFAULT_LIMIT;

      return totalResults ? Math.ceil(totalResults / limit) : null;
    }
  }).readOnly(),

  range: computed('currentPage', 'totalPages', 'maxPages', {
    get() {
      const currentPage = get(this, 'currentPage');
      const totalPages = get(this, 'totalPages');
      const maxPages = get(this, 'maxPages');
      const ellipsis = null;

      if (isNone(totalPages) || currentPage > totalPages) {
        return null;
      }

      
      let start = totalPages <= maxPages ? 1 : Math.max(currentPage - Math.floor(maxPages / 2), 1);
      let end = maxPages;
      
      if (totalPages !== maxPages) {
        if (currentPage > totalPages - maxPages) {
          start = totalPages - maxPages;
        }
        
        if (currentPage >= maxPages - 1) {
          end = Math.min(currentPage + Math.floor(maxPages / 2) + 1, totalPages - 1);
        }
      }
      
      const range = [0];

      if (totalPages > maxPages && start > 1) {
        range.push(ellipsis);
      }
      
      for (let i = start; i < end; i++) {
        range.push(i);
      }

      if (end < totalPages - 1) {
        range.push(ellipsis);
      }
      
      if (totalPages !== maxPages) {
        range.push(totalPages - 1);
      }
      
      return range;
    }
  }).readOnly(),

  actions: {
    onNext() {
      const currentPage = get(this, 'currentPage');
      const totalPages = get(this, 'totalPages');
      
      if (isEmpty(this.attrs.dry) && currentPage < totalPages - 1) {
        set(this, 'currentPage', currentPage + 1);
      }

      get(this, 'onNext')();
    },

    onPrevious() {
      const currentPage = get(this, 'currentPage');
      
      if (isEmpty(this.attrs.dry) && currentPage > 0) {
        set(this, 'currentPage', currentPage - 1);
      }
      
      get(this, 'onPrevious')();
    },

    onPage(page) {
      const totalPages = get(this, 'totalPages');
      
      if (isEmpty(this.attrs.dry) && page >= 0 && page < totalPages) {
        set(this, 'currentPage', page);
      }

      get(this, 'onPage')(page); 
    }
  }
});
