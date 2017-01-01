<template>
  <div class="hello">
    <isotope ref="isotope" :options='options' :list="list" v-images-loaded:on.progress="imageProgress">
        <div v-for="element in list" :key="element.id">
          {{element.name}}
          <img :src="element.src" alt="Not found">
        </div>
    </isotope>
    <button v-for="sort in ['name','id']" @click="$refs.isotope.sort(sort)">Filter by {{sort}}</button>
    <button @click="addItem()">Add item</button>
  </div>
</template>

<script>
import imagesLoaded from '../../src/imagesLoadedDirective'

import isotope from 'vueisotope'
const names= ['John', 'Ringo', 'Paul', 'George']

function getImageSrc () {
  var size = Math.random() * 3 + 1;
  var width = Math.random() * 110 + 100;
  width = Math.round( width * size );
  var height = Math.round( 140 * size );
  var rando = Math.ceil( Math.random() * 1000 );
  // 10% chance of broken image src
  // random parameter to prevent cached images
  return rando < 100 ? '//foo/broken-' + rando + '.jpg' :
    // use lorempixel for great random images
    '//lorempixel.com/' + width + '/' + height + '/' + '?' + rando;
}

var count = 4
var cpt=0;

export default {
  directives: {
    imagesLoaded
  },
  components: {
    isotope,
  },
  name: 'hello',
  data () {
    return {
      list: names.map((name, id)=>{return {name, id, src : getImageSrc()}}),
      options:{
				layoutMode: 'masonry',
        masonry: {
          gutter: 10
        },
				getSortData: {
          name: "name"
        }
      }
    }
  },
  methods:{
    imageProgress (imageLoaded, image){
      console.log('progress', cpt++, image)
      this.$refs.isotope.layout('masonry')
    },
    addItem () {
      this.list.push({name: 'Jimmy', id: count++, src : getImageSrc()})
    },
    getImageSrc () {
      return getImageSrc ()
    }
  }
}
</script>
<style>
.item {
  background-color: #eee;
  padding: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
  font-family: monospace;
  color: #333;
  border: 2px solid #b6b5b4;
}
</style>
