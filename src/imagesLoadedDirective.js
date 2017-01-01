import imagesLoaded from 'imagesLoaded'
import Vue from 'vue'

function updateList(array, {src, img}){
    const found = array.find(element => {return element.img===img})
    if (!!found) {
        found.src = src
        return
    }
    array.push({src, img})
}

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

function getProgress (el) {
    return (imageLoaded, image) => updateList(el.__imagesLoaded__.images, {src: image.img.src, img: image.img }) 
}

function applyImagesLoaded (el, binding, oldContext) { 
    const progress = el.__imagesLoaded__.progress
    const newContext = getImagesLoaded(el, binding) 
    if (oldContext){
        oldContext.off('progress', progress);
        const alreadyProcessed = el.__imagesLoaded__.images
        const images = newContext.images.filter(loadingImg => {return !alreadyProcessed.find(processed => {return processed.img===loadingImg.img && processed.src===loadingImg.img.src})})
        newContext.images = images
    }
    newContext.on( 'progress', progress);
    return newContext   
}

export default {
    bind (el) {
        el.__imagesLoaded__ = { progress: getProgress(el), images: [] }
    },
    inserted (el, binding){
        const imageLoaded = applyImagesLoaded(el, binding)
        el.__imagesLoaded__.imageLoaded = imageLoaded
    },
    componentUpdated (el, binding){
        Vue.nextTick( () => {
            const imageLoaded = applyImagesLoaded(el, binding, el.__imagesLoaded__.imageLoaded)
            el.__imagesLoaded__.imageLoaded = imageLoaded
        });       
    },
    unbind (el, binding) {
        el.__imagesLoaded__ = null
    }
} 