import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import EmberObject, { get, computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import debugLogger from 'ember-debug-logger';

const X = EmberObject.extend({
  debug: debugLogger('index:x'),

  valueById: computed('product.propertyValues.[]', function() {
    const values = this.get('product.propertyValues');
    const stuff = [];

    for (const val of values.toArray()) {
      const external = get(val, 'property.externalId');
      const internal = get(val, 'propertyId') || get(val, 'property.id');

      stuff.push([external, val], [internal, val]);
    }

    this.debug('building value by id map: %o', stuff);
    return new Map(stuff);
  }),

  stuff(ys) {
    this.debug('looking up %o', ys);
    return ys.map(v => this.get('valueById').get(v)).compact();
  },
});

const Y = EmberObject.extend({
});

const CellData = EmberObject.extend({
  debug: debugLogger('index:cell-data'),

  stale: computed('x.values.[]', 'y.values.[]', function() {
    const ys = this.get('y.values');

    if (isEmpty(ys)) {
      return true;
    }

    const x = this.get('x');
    const r = x.stuff(ys);
    this.debug('staleness check against %o: "%o"', ys, r);
    return isEmpty(r);
  }),
});

export default Controller.extend({
  debug: debugLogger(),
  store: service(),
  page: 1,
  actions: {
    async go() {
      const page = this.get('page');
      this.debug('loading page %s', page);
      const product = get(await this.store.query('product', { page }), 'firstObject');
      const shared = X.create({ product });

      const first = CellData.create({
        x: shared,
        y: Y.create(),
      });

      const second = CellData.create({
        x: shared,
        y: Y.create({ values: ['5'] }),
      });

      this.debug('loading index route');
      this.set('first', first);
      this.set('second', second);
    }
  },
});
