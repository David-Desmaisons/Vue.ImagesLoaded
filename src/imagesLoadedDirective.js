import imagesLoaded from 'imagesLoaded'
import lodashEqual from 'lodash.isequal'
import Vue from 'vue'

const { isEqual = lodashEqual } = lodashEqual

function checkFunction(callBack, message=''){
    if (typeof callBack !=='function'){
        throw `imageLoaded directive error: objet ${callBack} should be a function ${message}`
    }
}

function registerImageLoaded(imgLoad, {value, arg, modifiers}) {   
    if (!arg) {
        checkFunction(value)
        imgLoad.on('always', value)
        return
    }

    const hasModifier = !!modifiers && !!Object.keys(modifiers).length
    const keys = hasModifier ? modifiers : value;
    const getCallBack = hasModifier ? (key) => {return value;} : (key) => value[key];

    for (var key in keys) {
        const callBack = getCallBack(key)
        checkFunction(callBack, !hasModifier? `property ${key} of ${value}` : '')
        imgLoad[arg](key, callBack)
    } 
}

function applyImagesLoaded (el, binding) { 
    const newContext = imagesLoaded( el );
    const contextImages = newContext.images.map(img => {return {img: img.img, src: img.img.src} })
    const oldcontextImages = el.__imagesLoaded__.context
    if (isEqual(oldcontextImages, contextImages)) {
        return
    }

    registerImageLoaded( newContext, binding)
    Object.assign(el.__imagesLoaded__, {context: contextImages, imageLoaded: newContext})
}

export default {
    bind (el) {
        el.__imagesLoaded__ = { context: [] }
    },
    inserted (el, binding){
        applyImagesLoaded(el, binding)
    },
    componentUpdated (el, binding){
        Vue.nextTick( () => {
            applyImagesLoaded(el, binding)
        });       
    },
    unbind (el, binding) {
        el.__imagesLoaded__ = null
    }
}