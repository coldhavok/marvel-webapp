import Ember from 'ember';
import md5 from '../../utils/md5-generator';
import $ from 'jquery';

export default Ember.Component.extend({
	store: Ember.inject.service(),
	actions: {
		getApiData: function(model) {
			let ts = +new Date();
			let publicKey = model.publickey;
			let privateKey =  model.privatekey;
			let hashBase = ts + privateKey + publicKey;
			let hash = md5(hashBase);
			let req = $.getJSON('https://gateway.marvel.com/v1/public/characters?limit=100&offset=100&apikey=' + publicKey + '&hash=' + hash + '&ts=' + ts);
			let reqComic = $.getJSON('http://gateway.marvel.com/v1/public/characters/1009188/comics?apikey=' + publicKey + '&hash=' + hash + '&ts=' + ts);
			//let req = $.getJSON('http://gateway.marvel.com/v1/public/comics?apikey=' + publicKey + '&hash=' + hash + '&ts=' + ts);
			let self = this;
			req.then(function(res) {
				var characters = res.data.results;
				var store = self.get('store');
				var els = {};
				els['data'] = [];
				$.each(characters, (i, character) =>{
					var char = {};
					var thumb = character.thumbnail.path+'.'+character.thumbnail.extension;
					char['id'] = character.id;
					char['type'] = 'character';
					char['attributes'] = {};					
					char['attributes']['name'] = character.name;
					char['attributes']['description'] = character.description;
					char['attributes']['thumbnail'] = thumb;
					els['data'].push(char);
				});
				store.push(els);
				self.sendAction('getApiData', els);
			});
			
		}, 
		getCharacterDetail: function(id) {
			let ts = +new Date();
			let publicKey = window.localStorage.publickey;
			let privateKey =  window.localStorage.privatekey;
			let hashBase = ts + privateKey + publicKey;
			let hash = md5(hashBase);
			let reqComic = $.getJSON('http://gateway.marvel.com/v1/public/characters/'+id+'/comics?apikey=' + publicKey + '&hash=' + hash + '&ts=' + ts);
			let self = this;
			reqComic.then(function(res) {
				var comics = res.data.results;
				var store = self.get('store');
				var els = {};
				els['data'] = [];
				$.each(comics, (i, comic) =>{
					var char = {};
					var thumb = comic.thumbnail.path+'.'+comic.thumbnail.extension;
					char['id'] = comic.id;
					char['type'] = 'comic';
					char['attributes'] = {};					
					char['attributes']['name'] = comic.name;
					char['attributes']['description'] = comic.description;
					char['attributes']['thumbnail'] = thumb;
					els['data'].push(char);
				});
				store.push(els);
        		//this.transitionTo('thank-you');
				self.sendAction('getApiData', els);
			});
			
		}
	}
});
