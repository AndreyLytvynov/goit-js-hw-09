function e(e){return e&&e.__esModule?e.default:e}var o="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},t={},r=o.parcelRequired7c6;null==r&&((r=function(e){if(e in n)return n[e].exports;if(e in t){var o=t[e];delete t[e];var r={id:e,exports:{}};return n[e]=r,o.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,o){t[e]=o},o.parcelRequired7c6=r);var i=r("eWCmQ");const l=document.querySelector(".form"),a=document.querySelector('[name="delay"]'),s=document.querySelector('[name="step"]'),c=document.querySelector('[name="amount"]');function f(e,o){return new Promise(((n,t)=>{setTimeout((()=>{Math.random()>.3?n({position:e,delay:o}):t({position:e,delay:o})}),o)}))}l.addEventListener("submit",(o=>{o.preventDefault();let n=Number(a.value);for(let o=1;o<=Number(c.value);o+=1)f(o,n).then((({position:o,delay:n})=>{e(i).Notify.success(`✅ Fulfilled promise ${o} in ${n}ms`)})).catch((({position:o,delay:n})=>{e(i).Notify.warning(`❌ Rejected promise ${o} in ${n}ms`)})),n+=Number(s.value)})),e(i).Notify.init({width:"280px",position:"center-center",success:{background:"#32c682",textColor:"#fff",childClassName:"notiflix-notify-success",notiflixIconColor:"rgba(0,0,0,0.2)",fontAwesomeClassName:"fas fa-check-circle",fontAwesomeIconColor:"rgba(0,0,0,0.2)",backOverlayColor:"rgba(50,198,130,0.2)"},warning:{background:"#d84545",textColor:"#fff",childClassName:"notiflix-notify-warning",notiflixIconColor:"rgba(0,0,0,0.2)",fontAwesomeClassName:"fas fa-exclamation-circle",fontAwesomeIconColor:"rgba(0,0,0,0.2)",backOverlayColor:"rgba(238,191,49,0.2)"}});
//# sourceMappingURL=03-promises.5a56c7a8.js.map
