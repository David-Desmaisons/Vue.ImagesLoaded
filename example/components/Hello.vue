<template>
  <div class="hello">
    <div class="status">
      <div class="progress-half" v-show="loading">
        Loding images: {{currentImg}} of {{maxImg}}
        <progress-bar :type="status" :size="'large'" :value="currentImg" :max="maxImg" :show-label="false"></progress-bar>
      </div>
      
    </div>

    <isotope ref="isotope" :options='options' :list="list" v-images-loaded:on="getLoadingCallBack()">
        <div v-for="element in list" :key="element.id" class="item">
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
import ProgressBar from 'vue-bulma-progress-bar'

import isotope from 'vueisotope'
const names = ['John', 'Ringo', 'Paul', 'George', 'Jimmy', 'Mick', 'John', 'Ringo', 'Paul', 'George']
let count = names.length

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

var cpt=0;

export default {
  directives: {
    imagesLoaded
  },
  components: {
    isotope,
    ProgressBar
  },
  name: 'hello',
  data () {
    return {
      list: names.map((name, id)=>{return {name, id, src : getImageSrc()}}),
      loading: false,
      maxImg: 0,
      currentImg: 0,
      status: 'success',
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
    getLoadingCallBack () {
      return {
        progress: (instance, img ) => {
          this.loading = true
          this.currentImg++
          this.maxImg = instance.images.length
          if (!img.isLoaded) {
            this.status = 'danger'
          }
          this.$refs.isotope.layout('masonry')
        },
        always: (instance) => {
          setTimeout(()=> {
            this.loading = false
            this.currentImg = 0
          }, 250);
        }
      }
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

.progress-half{
  width: 50%;
  justify-content: space-around;
  margin: 0 auto;
}

.status {
  height: 60px;
  display: flex;
  align-items: center;
}
</style>
