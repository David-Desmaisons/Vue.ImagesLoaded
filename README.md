# Vue.ImagesLoaded

[![GitHub open issues](https://img.shields.io/github/issues/David-Desmaisons/Vue.ImagesLoaded.svg?maxAge=2592000)](https://github.com/David-Desmaisons/Vue.ImagesLoaded/issues?q=is%3Aopen+is%3Aissue)
[![GitHub closed issues](https://img.shields.io/github/issues-closed/David-Desmaisons/Vue.ImagesLoaded.svg?maxAge=2592000)](https://github.com/David-Desmaisons/Vue.ImagesLoaded/issues?q=is%3Aissue+is%3Aclosed)
[![Npm download](https://img.shields.io/npm/dt/vue-images-loaded.svg?maxAge=2592000)](https://www.npmjs.com/package/vue-images-loaded)
[![Npm version](https://img.shields.io/npm/v/vue-images-loaded.svg?maxAge=2592000)](https://www.npmjs.com/package/vue-images-loaded)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)
[![MIT License](https://img.shields.io/github/license/David-Desmaisons/Vue.ImagesLoaded.svg)](https://github.com/David-Desmaisons/Vue.ImagesLoaded/blob/master/LICENSE)

A Vue.js 2.0 directive to detect when images have been loaded, based on [imagesLoaded](http://imagesloaded.desandro.com/)

This directive allows to get a callback when children images are loaded in a container element.<br>
Plays nicely with [vue.isotope](https://github.com/David-Desmaisons/Vue.Isotope) to allow re-layout when images are loaded.


## Typical usage
```HTML
<div v-images-loaded:on.progress="imageProgress">
	<div v-for="element in list">
		<img :src="element.src">
	</div>
</div>
```

```javascript
import imagesLoaded from 'vue-images-loaded'

export default {
    directives: {
        imagesLoaded
    },
    methods: {
        imageProgress(instance, image ) {
        const result = image.isLoaded ? 'loaded' : 'broken';
        console.log( 'image is ' + result + ' for ' + image.img.src );
    }
```

## Isotope Example
```HTML
<isotope ref="cpt" :options='getOptions()' v-images-loaded:on.progress="layout" :list="list">
    <div v-for="element in list" :key="element.id"  @click="selected=element">
        {{element.name}}
        <br>
        {{element.id}}
        <img :src="element.src" alt="Not found">
    </div>
</isotope>
```

```javascript
import imagesLoaded from 'vue-images-loaded'

export default {
    directives: {
        imagesLoaded
    },
    methods: {
        layout () {
            this.$refs.cpt.layout('masonry');
        }     
    }
```


## Installation
- Available through:
``` js
 npm install vue-images-loaded --save
```
``` js
 Bower install vue.ImagesLoaded -save
```

- #### For Modules

  ``` js
  // ES6
  import imagesLoaded from 'vue-images-loaded'
  ...
  export default {
        directives: {
            imagesLoaded,
        }
    ...
  
  // ES5
  var imagesLoaded = require('vue-images-loaded')
  ```

- #### For `<script>` Include

  Just include `vueimagesloaded.js` after `imagesloaded.pkgd.min.js` script.<br>

