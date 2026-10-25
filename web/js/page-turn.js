// Transient visual layer only: receives already rendered pages, never paginates.
export const PAGE_TURN_DURATION = 480;

export function createPageTurn() {
 let active = null;
 function cancel() {
  if (!active) return;
  for (const animation of active.animations) animation.cancel();
  active.root.remove();
 }
 function cloneSheet(spread, index) {
  const sheet = spread.children[index]?.cloneNode(true);
  if (!sheet) throw new Error('Missing rendered page');
  // These copies are purely visual; they must not participate in reading anchors or focus.
  sheet.querySelectorAll('[data-idx],[data-fn-id],[id]').forEach(el => {
   el.removeAttribute('data-idx'); el.removeAttribute('data-fn-id'); el.removeAttribute('id');
  });
  sheet.querySelectorAll('button,a,input,select,textarea,[tabindex]').forEach(el => el.setAttribute('tabindex','-1'));
  return sheet;
 }
 async function play({book,from,to,direction,single,style}) {
  cancel();
  if (typeof Element.prototype.animate !== 'function' || (style === 'fold' && (typeof CSS === 'undefined' || typeof CSS.supports !== 'function' || !CSS.supports('perspective','1200px') || !CSS.supports('transform-style','preserve-3d')))) return;
  const root = document.createElement('div');
  root.className = `turn-overlay ${single ? 'is-single' : 'is-spread'} ${direction < 0 ? 'is-back' : 'is-forward'}`;
  root.setAttribute('aria-hidden','true'); root.inert = true;
  const state = {root,animations:[],timer:null};
  active = state;
  const animate = (el,frames,options={}) => {
   const animation = el.animate(frames,{duration:PAGE_TURN_DURATION,fill:'both',easing:'linear',...options});
   state.animations.push(animation);
  };
  try {
   if (style === 'fade') {
    root.append(from); book.append(root);
    animate(root,[{opacity:1},{opacity:0}],{duration:180,easing:'ease-out'});
   } else {
    root.innerHTML = '<div class="turn-stage"><div class="turn-stationary"></div><div class="turn-shadow turn-shadow-under"></div><div class="turn-shadow turn-shadow-landing"></div><div class="turn-leaf"><div class="turn-face turn-front"><div class="turn-face-shade"></div><div class="turn-edge-light"></div></div><div class="turn-face turn-back"><div class="turn-face-shade"></div></div></div></div>';
    const stage = root.firstElementChild;
    const stationary = stage.querySelector('.turn-stationary');
    const leaf = stage.querySelector('.turn-leaf');
    const front = leaf.querySelector('.turn-front'), back = leaf.querySelector('.turn-back');
    const under = stage.querySelector('.turn-shadow-under'), landing = stage.querySelector('.turn-shadow-landing');
    if (single) {
     if (direction < 0) stationary.append(cloneSheet(from,0));
     else stationary.hidden = true;
     front.prepend(cloneSheet(direction > 0 ? from : to,0));
     back.classList.add('is-blank');
    } else {
     stationary.append(cloneSheet(from,direction > 0 ? 0 : 1));
     front.prepend(cloneSheet(from,direction > 0 ? 1 : 0));
     back.prepend(cloneSheet(to,direction > 0 ? 0 : 1));
    }
    book.append(root);
    const sign = direction > 0 ? -1 : 1;
    const transform = single
     ? direction > 0
      ? ['rotateY(0deg) rotateZ(0deg)','rotateY(-12deg) rotateZ(-.35deg)','rotateY(-86deg) rotateZ(-.5deg)','rotateY(-106deg) rotateZ(0deg)']
      : ['rotateY(-106deg) rotateZ(0deg)','rotateY(-86deg) rotateZ(-.5deg)','rotateY(-10deg) rotateZ(-.2deg)','rotateY(0deg) rotateZ(0deg)']
     : [`rotateY(0deg) rotateZ(0deg)`,`rotateY(${sign*12}deg) rotateZ(${sign*.25}deg)`,`rotateY(${sign*158}deg) rotateZ(${sign*.3}deg)`,`rotateY(${sign*180}deg) rotateZ(0deg)`];
    // 0–20% lift; 20–80% sweep; 80–100% settle. The hinge never translates.
    animate(leaf,[
     {transform:transform[0],offset:0,easing:'cubic-bezier(.2,.7,.4,1)'},
     {transform:transform[1],offset:.2,easing:'cubic-bezier(.45,0,.25,1)'},
     {transform:transform[2],offset:.8,easing:'cubic-bezier(.15,.6,.25,1)'},
     {transform:transform[3],offset:1}
    ]);
    animate(front.querySelector('.turn-face-shade'),[{opacity:0,offset:0},{opacity:.22,offset:.2},{opacity:.6,offset:.55},{opacity:.12,offset:1}]);
    animate(back.querySelector('.turn-face-shade'),[{opacity:.55,offset:0},{opacity:.45,offset:.55},{opacity:.18,offset:.8},{opacity:0,offset:1}]);
    animate(front.querySelector('.turn-edge-light'),[
     {opacity:0,transform:'scaleX(.1)',offset:0},
     {opacity:.8,transform:'scaleX(.8)',offset:.2},
     {opacity:.55,transform:'scaleX(1)',offset:.65},
     {opacity:0,transform:'scaleX(.2)',offset:1}
    ]);
    animate(under,[
     {opacity:0,transform:'scaleX(.03)',offset:0},
     {opacity:.25,transform:'scaleX(.5)',offset:.2},
     {opacity:.48,transform:'scaleX(.9)',offset:.5},
     {opacity:.12,transform:'scaleX(.16)',offset:.8},
     {opacity:0,transform:'scaleX(.01)',offset:1}
    ]);
    animate(landing,[
     {opacity:0,transform:'scaleX(.01)',offset:0},
     {opacity:.12,transform:'scaleX(.4)',offset:.55},
     {opacity:.28,transform:'scaleX(.9)',offset:.8},
     {opacity:0,transform:'scaleX(1)',offset:1}
    ]);
   }
   // A background tab or canceled animation cannot leave a stuck input lock or layer.
   await Promise.race([
    Promise.allSettled(state.animations.map(animation => animation.finished)),
    new Promise(resolve => {state.timer = setTimeout(resolve,PAGE_TURN_DURATION + 200);})
   ]);
  } catch {
   // The target page is already rendered; unsupported effects degrade to that page.
  } finally {
   clearTimeout(state.timer);
   for (const animation of state.animations) animation.cancel();
   root.remove();
   if (active === state) active = null;
  }
 }
 return {play,cancel};
}
