import imagesLoaded from 'imagesLoaded'
import Vue from 'vue'

function checkFunction(callBack, message=''){
    if (typeof callBack !=='function'){
        throw `imageLoaded directive error: objet ${callBack} should be a function ${message}`
    }
}

function getImagesLoaded(elem, {value, arg, modifiers}) {   
    if (!arg) {
        checkFunction(value)
        return imagesLoaded( elem, value );
    }

    const imgLoad = imagesLoaded( elem );
    const hasModifier = !!modifiers && !!Object.keys(modifiers).length
    const keys = hasModifier ? modifiers : value;
    const getCallBack = hasModifier ? (key) => {return value;} : (key) => value[key];

    for (var key in keys) {
        const callBack = getCallBack(key)
        checkFunction(callBack, !hasModifier? `property ${key} of ${value}` : '')
        imgLoad[arg](key, callBack)
    } 
    return imgLoad
}

function updateImage( newImage, oldImage){
    !oldImage || Object.assign(newImage, oldImage) 
}

function applyImagesLoaded (el, binding, oldContext) { 
    const newContext = getImagesLoaded(el, binding) 
    if (oldContext) {
        const oldImages = oldContext.images
        newContext.images.forEach(img => updateImage(img, oldImages.find(oldImg => {return oldImg.img === img.img})) )
    }
    return newContext   
}

export default {
    inserted (el, binding){
        el.__imagesLoaded__ = applyImagesLoaded(el, binding)
    },
    componentUpdated (el, binding){
        Vue.nextTick( () => {
            el.__imagesLoaded__ =  applyImagesLoaded(el, binding, el.__imagesLoaded__)
        });       
    },
    unbind (el, binding) {
        el.__imagesLoaded__ = null
    }
} 