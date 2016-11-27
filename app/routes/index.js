import Ember from 'ember';

export default Ember.Route.extend({
    model: function () {
        /*this.store.push({
            data: [{
                    id: 1,
                    type: 'character',
                    attributes: {
                        title: 'Ant man',
                        description: 'descrição do item 1',
                        thumbnail: 'foto1'
                    }
                }, {
                    id: 2,
                    type: 'character',
                    attributes: {
                        title: 'Ant man 2',
                        description: 'descrição do item 2',
                        thumbnail: 'foto2'
                    }
                }]  
        });*/
        return {};
    },
     actions: {
        getApiData: function(data){
           // store.createRecord('login', data);
            console.log('Route getApiData: ',data);
            this.transitionTo('list');
        }
    }
});
