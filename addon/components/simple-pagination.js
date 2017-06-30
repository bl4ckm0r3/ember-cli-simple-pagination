import Component from 'ember-component';
import layout from '../templates/components/simple-pagination';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import computed, { reads } from 'ember-computed';
import { isEmpty } from 'ember-utils';

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

      return Math.ceil(totalResults / limit);
    }
  }).readOnly(),

  leftRange: computed('currentPage', 'totalPages', 'maxPages', {
    get() {
      const totalPages = get(this, 'totalPages');
      const maxPages = get(this, 'maxPages');
      const range = [];
      
      for (let i = 0; i < maxPages && i < totalPages; i++) {
        range[i] = i;
      }
      return range;
    }
  }),

  rightRange: computed('currentPage', 'totalPages', 'maxPages', {
    get() {
      const totalPages = get(this, 'totalPages');
      const maxPages = get(this, 'maxPages');
      const range = [];
      let start = 2;
      
      range[0] = 0;
      
      if (totalPages <= maxPages + 1) {
        start -= 1;
      } else {
        range[1] = null;
      }
      for (let value = totalPages - maxPages, idx = start; value < totalPages - 1; value+=1, idx+=1) {
        range[idx] = value;
      }
      return range;
    }
  }),

  midRange: computed('currentPage', 'totalPages', 'maxPages', {
    get() {
      const totalPages = get(this, 'totalPages');
      const currentPage = get(this, 'currentPage');
      const maxPages = get(this, 'maxPages');
      const range = [];
      
      range[0] = 0;
      range[1] = null;
      for (let value = currentPage - Math.floor(maxPages / 2), idx = 2; value < currentPage + Math.ceil(maxPages / 2) && value < totalPages -1; value+=1, idx+=1) {
        range[idx] = value;
      }
      return range;
    }
  }),

  range: computed('leftRange', 'midRange', 'rightRange', {
    get() {
      const currentPage = get(this, 'currentPage');
      const totalPages = get(this, 'totalPages');
      const maxPages = get(this, 'maxPages');
      let range = [];

      if (!totalPages || totalPages <= 0 || currentPage >= totalPages) {
        return range;
      }

      if (currentPage < maxPages) {
        range = get(this, 'leftRange');
      } else if (currentPage > totalPages - maxPages) {
        range = get(this, 'rightRange');
      } else {
        range = get(this, 'midRange');
      }
      if (totalPages > maxPages) {
        if (currentPage < totalPages - Math.ceil(maxPages / 2) - 1) {
          range[range.length] = null;
        }
        range[range.length] = totalPages - 1;
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
