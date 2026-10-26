// Published songs use declared static assets; local file selection remains browser-only.
export function createMusicPlayer(work) {
  const $=id=>document.getElementById(id);
  const panel=$('music-panel'),audio=$('music-audio'),play=$('music-play'),seek=$('music-seek');
  const songs=new Map(work.songs.map(song=>[song.id,song]));
  const local=['127.0.0.1','localhost'].includes(location.hostname);
  const localFiles=new Map(),objectUrls=new Set();
  let chapterSong,loadedSong;
  const format=seconds=>Number.isFinite(seconds)?`${Math.floor(seconds/60)}:${String(Math.floor(seconds%60)).padStart(2,'0')}`:'0:00';
  const label=id=>{const song=songs.get(id);return song?`${song.artist}〈${song.title}〉`:'';};
  function status(message){$('music-status').textContent=message;}
  function sync(){const playing=!audio.paused&&!audio.ended;$('music-vinyl').classList.toggle('is-playing',playing);$('music-needle').classList.toggle('needle-on',playing);play.textContent=playing?'Ⅱ':'▶';play.setAttribute('aria-label',playing?'暫停音樂':'播放音樂');$('music-now-playing').textContent=loadedSong?`目前播放：${label(loadedSong)}`:'尚未播放';$('music-switch').hidden=!loadedSong||loadedSong===chapterSong;seek.value=audio.duration?String(Math.round(audio.currentTime/audio.duration*1000)):'0';$('music-current').textContent=format(audio.currentTime);$('music-duration').textContent=format(audio.duration);}
  function select(id){const song=songs.get(id);if(!song)return false;const source=localFiles.get(id)||song.audio||(local?`local-audio/${encodeURIComponent(id)}.mp3`:null);if(!source){status('請選擇本機 MP3；音檔只在這個瀏覽器頁面使用。');return false;}audio.pause();loadedSong=id;audio.src=source;audio.load();status('已選擇歌曲，點擊播放。');sync();return true;}
  panel.hidden=false;audio.volume=.7;
  play.onclick=async()=>{if(!audio.paused){audio.pause();return;}if(!loadedSong||!audio.getAttribute('src'))if(!select(loadedSong||chapterSong))return;try{await audio.play();status('正在播放');panel.open=false;}catch{status('音檔不存在或無法播放；可選擇本機 MP3。');sync();}};
  $('music-switch').onclick=()=>select(chapterSong);
  seek.oninput=()=>{if(audio.duration)audio.currentTime=Number(seek.value)/1000*audio.duration;};
  $('music-volume').oninput=event=>{audio.volume=Number(event.target.value)/100;};
  $('music-file').onchange=event=>{
    const files=[...event.target.files].filter(file=>/\.mp3$/i.test(file.name)||file.type==='audio/mpeg');
    let loaded=0;
    for(const file of files){
      const name=file.name.toLowerCase().replace(/\s+/g,'');
      const matches=[...songs.values()].filter((song,index)=>name.includes(song.title.toLowerCase())||name.startsWith(`${String(index+1).padStart(2,'0')}-`));
      const song=matches.length===1?matches[0]:files.length===1? songs.get(chapterSong):null;
      if(!song)continue;
      const url=URL.createObjectURL(file);objectUrls.add(url);localFiles.set(song.id,url);loaded++;
    }
    status(loaded?`已載入 ${loaded} 個本機音檔；不會上傳。${files.length>loaded?' 其餘檔名無法確定對應。':''}`:'無法辨識音檔；請在對應章節選擇單一 MP3。');
    if(loaded&&!loadedSong)select(chapterSong);
    event.target.value='';
  };
  for(const event of ['play','pause','ended','timeupdate','loadedmetadata'])audio.addEventListener(event,sync);
  audio.addEventListener('error',()=>{status('音檔不存在或無法播放。');sync();});
  if(!local&&!work.songs.some(song=>song.audio))status('公開版音源尚未備妥；可自行選擇本機檔案試聽。');
  addEventListener('pagehide',()=>objectUrls.forEach(url=>URL.revokeObjectURL(url)),{once:true});
  return {chapter(id){chapterSong=id;$('music-chapter-song').textContent=label(id);$('music-summary').textContent=label(id);if(loadedSong&&loadedSong!==id&& !audio.paused)status('原曲繼續播放；可自行切換本篇歌曲。');sync();}};
}
