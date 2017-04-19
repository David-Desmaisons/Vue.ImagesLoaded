import imagesLoaded from 'imagesloaded'
import Vue from 'vue'

function isEqual (firstArray, secondArray) {
    const length = firstArray.length
    if ( length != secondArray.length) {
        return false;
    }   
    for (let i = 0; i < length; i++) {
        const first = firstArray[i], second = secondArray[i]
        if ((first.img!==second.img) || (first.src!==second.src)){
            return false;
        }
    }   
    return true;
}

function checkFunction(callBack, message=''){
    if (typeof callBack !=='function'){
        throw `imageLoaded directive error: objet ${callBack} should be a function ${message}`
    }
}

function registerImageLoaded(imgLoad, {value, arg, modifiers}) {   
    if (!arg) {
        checkFunction(value)
        imgLoad.on('always', (inst) => setTimeout(() => value(inst)) )
        return
    }

    const hasModifier = !!modifiers && !!Object.keys(modifiers).length
    const keys = hasModifier ? modifiers : value;
    const getCallBack = hasModifier ? (key) => {return value;} : (key) => value[key];

    for (var key in keys) {
        const callBack = getCallBack(key)
        checkFunction(callBack, !hasModifier? `property ${key} of ${value}` : '')
        imgLoad[arg](key, (inst, img) => setTimeout(() => callBack(inst, img)))
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