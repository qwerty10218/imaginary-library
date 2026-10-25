// Reuses the original reader's OpenCC tw -> cn conversion, with a project-only preference.
import {Converter} from './vendor/opencc.js';

const key='imaginary-library:v1:language';
const originals=new WeakMap();
const attributes=new WeakMap();
const convert=Converter({from:'tw',to:'cn'});
let language='tw';
try { if(localStorage.getItem(key)==='cn') language='cn'; } catch {}

export const getLanguage=()=>language;
// OpenCC's tw→cn table maps 抬 to the variant 擡; standardize the displayed Simplified glyph.
export const convertText=text=>language==='cn'?convert(String(text)).replace(/擡/g,'抬'):String(text);
export function setLanguage(next) {
  language=next==='cn'?'cn':'tw';
  try { localStorage.setItem(key,language); } catch {}
  document.documentElement.lang=language==='cn'?'zh-CN':'zh-TW';
}
export function convertHtml(html) {
  if(language!=='cn')return html;
  const root=document.createElement('div');root.innerHTML=html;
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  while(walker.nextNode())walker.currentNode.nodeValue=convertText(walker.currentNode.nodeValue);
  for(const element of root.querySelectorAll('[aria-label], [alt], [title]'))
    for(const name of ['aria-label','alt','title'])if(element.hasAttribute(name))element.setAttribute(name,convertText(element.getAttribute(name)));
  return root.innerHTML;
}
export function translatePage(root=document.body) {
  document.documentElement.lang=language==='cn'?'zh-CN':'zh-TW';
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:node=>node.parentElement?.closest('[data-localized-content]')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});
  while(walker.nextNode()) {
    const node=walker.currentNode;
    if(!originals.has(node))originals.set(node,node.nodeValue);
    node.nodeValue=convertText(originals.get(node));
  }
  for(const element of root.querySelectorAll('[aria-label], [alt], [placeholder], [title]')) {
    if(element.closest('[data-localized-content]'))continue;
    if(!attributes.has(element))attributes.set(element,{});
    const saved=attributes.get(element);
    for(const name of ['aria-label','alt','placeholder','title'])if(element.hasAttribute(name)){
      if(!(name in saved))saved[name]=element.getAttribute(name);
      element.setAttribute(name,convertText(saved[name]));
    }
  }
  for(const button of root.querySelectorAll('[data-language-toggle]')){
    button.textContent=language==='cn'?'简／繁':'繁／簡';
    button.setAttribute('aria-label',language==='cn'?'切换为繁体中文':'切換為簡體中文');
  }
}
export function wireLanguage(onChange=()=>translatePage()) {
  document.querySelectorAll('[data-language-toggle]').forEach(button=>button.addEventListener('click',async()=>{
    setLanguage(language==='tw'?'cn':'tw');await onChange();
  }));
}
