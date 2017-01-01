var count=0;

function getImageSrc () {
  var size = Math.random() * 3 + 1;
  var width = Math.random() * 110 + 100;
  width = Math.round( width * size );
  var height = Math.round( 140 * size );
  var rando = Math.ceil( Math.random() * 1000 );
  // 10% chance of broken image src
  // random parameter to prevent cached images
  return rando < 100 ? 'http://foo/broken-' + rando + '.jpg' :
    // use lorempixel for great random images
    'http://lorempixel.com/' + width + '/' + height + '/' + '?' + rando;
}

var vm = new Vue({
	el: "#main",
	directives: {
		imagesLoaded: window.VueImagesLoaded
	},
	data: {
		list:[
			{name:"John", id:25, src: getImageSrc ()}, 
			{name:"Joao", id: 7, src: getImageSrc ()},
			{name:"Albert", id: 12, src: getImageSrc ()}, 
			{name:"Jean", id: 100, src: getImageSrc ()}],
		selected: null,
		sortOption:null,
		filterOption:null,
		filterText: ""
	},
	methods:{
		getOptions: function () {
			var _this = this
			return {
				layoutMode: 'masonry',
	          	masonry: {
	            	gutter: 10
	          	},
				getSortData: {
	        		id: "id",
	        		name: function(itemElem){
	        			return itemElem.name.toLowerCase();     
	        		}
	        	},
	      		getFilterData:{
	      			isEven: function(itemElem){
	      				return itemElem.id % 2 === 0;
	      			},
	      			isOdd: function(itemElem){
	      				return itemElem.id % 2 !== 0;
	      			},
	      			filterByText: function(itemElem){
	        			return itemElem.name.toLowerCase().includes(_this.filterText.toLowerCase());
	        		}
	      		}
	      	}
		},
		add: function () {
			this.list.push({name:'Juan', id:count++, src: getImageSrc ()});
		},
		layout: function () {
			this.$refs.cpt.layout('masonry');
		},
		replace: function(){
			this.list=[{name:'Edgard', id: count++, src: getImageSrc ()}, {name:'James', id:count++, src: getImageSrc ()}]
		},
		remove: function(){
			if (this.list.length)
				this.list.splice(0, 1)
		}
	}
});
