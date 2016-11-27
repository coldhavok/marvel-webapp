import DS from 'ember-data';

var ApplicationAdapter = DS.RESTAdapter.extend({
    host: 'http://gateway.marvel.com',
    namespace: '/v1/public/comics?apikey=adaa03994293d271df3582232a9c6ba2&hash=bcf5b6c2dd4ee487755198f72784e1fa&ts=1480224078080'
});

export default ApplicationAdapter;

/*export default DS.RESTAdapter.extend({
    host: 'http://gateway.marvel.com',
    namespace: '/v1/public/comics?apikey=adaa03994293d271df3582232a9c6ba2&hash=bcf5b6c2dd4ee487755198f72784e1fa&ts=1480224078080' 
});*/
