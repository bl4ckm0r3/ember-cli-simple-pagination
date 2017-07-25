import Component from 'ember-component';
import layout from '../templates/components/simple-pagination-item';
import get from 'ember-metal/get';

const NO_OP = () => {};

export default Component.extend({
  layout,
  tagName: 'button',
  hook: 'pagination-item',
  classNames: ['pagination-item'],
  classNameBindings: ['type','current'],
  attributeBindings: ['disabled', 'aria-label', 'aria-hidden'],
  onClickItem: NO_OP,

  type: '',

  click() {
    const number = get(this, 'number');
    
    get(this, 'onClickItem')(number);
  }
});
