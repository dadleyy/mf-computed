import DS from 'ember-data';
import MF from 'ember-data-model-fragments';

export default DS.Model.extend({
  name: DS.attr('string'),
  propertyValues: MF.fragmentArray('property-value-assignment'),
});
