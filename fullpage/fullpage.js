import './bindings.js';
import './dynamic.js';
import './normalScrollElements.js';
import './resize.js';
import './index.js';
import './index.js';
import './scrollTo.js';
import './index.js';
import './index.js';
import './index.js';
import './index.js';
import './index.js';
import './waterMark.js';
import './index.min.js';

import * as utils from './utils.js';
import { setOptions, setOption, getOptions } from './options.js';
import { setContainer, getContainer } from './options.js';
import { init } from './instance.js';
import { FP, win } from './constants.js';
import { $html, setCache } from './cache.js';
import { displayWarnings } from './console.js';
import { ENABLED } from './selectors.js';
import { EventEmitter } from './eventEmitter.js';
import { events } from './events.js';

export default function fullpage(containerSelector, options) {
    setCache();

    //only once my friend!
    if(utils.hasClass($html, ENABLED)){ displayWarnings(); return; }

    setOption('touchWrapper', typeof containerSelector === 'string' ? utils.$(containerSelector)[0] : containerSelector);

    // Creating some defaults, extending them with any options that were provided
    setOptions(options);

    setContainer(typeof containerSelector === 'string' ? utils.$(containerSelector)[0] : containerSelector);

    EventEmitter.emit(events.onInitialise);

    displayWarnings();

    setAPI();

    if(getContainer()){
        EventEmitter.emit(events.beforeInit);
        init();
        EventEmitter.emit(events.bindEvents);
    }

    // @ts-ignore
    return win.fullpage_api;
}

function setAPI(){
    FP.getFullpageData = function(){ 
        return {
            options: getOptions()
        };
    };

    //public functions
    FP.version = '4.0.20';

    FP.test = Object.assign(FP.test, {
        top: '0px',
        translate3d: 'translate3d(0px, 0px, 0px)',
        translate3dH: (function(){
            var a = [];
            for(var i = 0; i < utils.$(getOptions().sectionSelector, getContainer()).length; i++){
                a.push('translate3d(0px, 0px, 0px)');
            }
            return a;
        })(),
        left: (function(){
            var a = [];
            for(var i = 0; i < utils.$(getOptions().sectionSelector, getContainer()).length; i++){
                a.push(0);
            }
            return a;
        })(),
        options: getOptions(),
        setAutoScrolling: null
    });

    //functions we want to share across files but which are not
    //mean to be used on their own by developers
    FP.shared = Object.assign(FP.shared, {
        afterRenderActions: null,
        isNormalScrollElement: false
    });

    // @ts-ignore
    win.fullpage_api = FP;
}