import Component from 'ember-component';
import layout from '../templates/components/simple-pagination-item';
import get from 'ember-metal/get';

const NO_OP = () => {};

export default Component.extend({
  layout,
  tagName: 'button',
  hook: 'pagination-item',
  classNames: ['pagination-item'],
  classNameBindings: ['current'],
  attributeBindings: ['disabled'],
  onClickItem: NO_OP,

  actions: {
    onClickItem() {
      get(this, 'onClickItem')(...arguments);
    }
  }
});
