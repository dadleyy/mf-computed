import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import debugLogger from 'ember-debug-logger';

export default Route.extend({
  debug: debugLogger(),
  store: service(),

  queryParams: {
    page: { refreshModel: false },
  },

  setupController(controller) {
    this.debug('setting controller');
    controller.send('go');
  },
});
