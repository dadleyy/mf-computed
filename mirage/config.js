export default function() {
  this.get('/products', function(schema, request) {
    const { page } = request.queryParams;
    return {
      meta: { },
      data: [{
        id: 's-product-001-23456',
        type: 'product',
        attributes: {
          name: 'first-product',
          'property-values': [{
            propertyId: 's-property-001-23456',
            values: [page],
          }],
        },
      }],
      included: [{
        type: 'property',
        id: 's-property-001-23456',
        attributes: {
          name: 'hello world',
          'external-id': 'hello-world',
        },
      }],
    };
  });

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.3.x/shorthands/
  */
}
