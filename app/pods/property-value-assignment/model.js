import DS from 'ember-data';
import MF from 'ember-data-model-fragments';
import { get, computed } from '@ember/object';

export default MF.Fragment.extend({
  values: MF.array('string'),
  propertyId: DS.attr('string'),

  property: computed('propertyId', function() {
    // Effectively belongsTo('property', { async: false })
    return this.store.peekRecord('property', this.get('propertyId'));
  }),
});
