import test from 'node:test';
import assert from 'node:assert/strict';

// The text converter needs only these browser globals at module initialization.
globalThis.document={documentElement:{lang:''}};
globalThis.localStorage={getItem:()=>null,setItem:()=>{}};
const {convertText,setLanguage}=await import('../web/js/language.js');

test('Simplified display converts phrases and preserves distinct meanings',()=>{
  setLanguage('cn');
  for(const [source,expected] of [
    ['倒楣鬼，真倒楣；門楣','倒霉鬼，真倒霉；门楣'],
    ['抬頭，擡起擔架','抬头，抬起担架'],
    ['乾隆，乾淨，乾脆，幹活，干涉','乾隆，干净，干脆，干活，干涉'],
    ['頭髮、發財、皇后、後來','头发、发财、皇后、后来'],
    ['金鍊、鍊子、鐵鏈、鐘錶、手錶','金链、链子、铁链、钟表、手表'],
    ['菸、捲菸、儘管、裡頭、瞭解','烟、卷烟、尽管、里头、了解'],
    ['陳正、伍德勝、唐紹廷、老齊、上海、浦東','陈正、伍德胜、唐绍廷、老齐、上海、浦东'],
  ])assert.equal(convertText(source),expected);
});

test('Traditional display preserves the original text after switching back',()=>{
  const source='倒楣鬼、門楣、抬頭、乾隆、頭髮、金鍊';
  setLanguage('cn');convertText(source);
  setLanguage('tw');assert.equal(convertText(source),source);
  assert.equal(document.documentElement.lang,'zh-TW');
});
