import { marked } from '../vendor/marked.js';
import DOMPurify from '../vendor/purify.js';
// Extracted from the uncommitted working copy. See docs/CORE_PROVENANCE.md.
export function createReaderCore() {
const MAX_PAGINATION_STABILITY_ITERATIONS = 12;
const READING_BLOCK_SELECTOR = 'p, h1, h2, h3';
let currentChapterModel = null;
let currentMetrics = null;
let measureRig = null;
function getPaginationMetrics() { return currentMetrics; }
function ensureMeasureRig(metrics) {
  if (!measureRig) {
    const root = document.createElement('div');
    root.className = 'reader-measure-rig';
    root.setAttribute('aria-hidden', 'true');
    root.innerHTML = '<div class="book-page-body prose"></div><aside class="page-footnotes"></aside>';
    document.body.append(root);
    measureRig = { root, body: root.firstElementChild, footnotes: root.lastElementChild };
  }
  measureRig.root.style.width = metrics.availableW + 'px';
  return measureRig;
}
function escapeHtml(value) {
    return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function stripFootnoteMarker(text) {
    return String(text || '').replace(/^〔[^〕]+〕\s*/, '').trim();
}

function markerToFootnoteId(marker) {
    const m = String(marker || '').match(/〔\s*([^〕\s]+)\s*〕/);
    return m ? m[1] : '';
}

function getFootnoteById(id, model = currentChapterModel) {
    if (!model || !model.footnotesById) return null;
    return model.footnotesById.get(String(id)) || null;
}

function collectNoteIdsFromHtml(html) {
    const ids = [];
    const seen = new Set();
    const temp = document.createElement('div');
    temp.innerHTML = html || '';
    temp.querySelectorAll('[data-fn-id]').forEach(el => {
        const id = el.getAttribute('data-fn-id');
        if (id && !seen.has(id)) {
            seen.add(id);
            ids.push(id);
        }
    });
    return ids;
}

function buildChapterModel(md) {
    let html = DOMPurify.sanitize(marked.parse(md));
    html = html.replace(/<p>(\s*<img[^>]+>\s*)<\/p>/gi, '<p class="img-container" style="text-indent:0 !important; text-align:center !important; margin:1.2em 0 !important; padding:0 !important;">$1</p>');

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    const footnotes = [];
    const footnotesById = new Map();
    const footnoteSection = tempDiv.querySelector('.footnotes');
    if (footnoteSection) {
        Array.from(footnoteSection.querySelectorAll('p, li')).forEach((el, idx) => {
            const rawText = (el.textContent || '').trim();
            if (!rawText) return;
            const markerMatch = rawText.match(/^〔\s*([^〕\s]+)\s*〕/);
            const id = markerMatch ? markerMatch[1] : String(idx + 1);
            const marker = markerMatch ? `〔${id}〕` : `〔${idx + 1}〕`;
            const noteText = stripFootnoteMarker(rawText);
            const note = {
                id,
                marker,
                text: noteText,
                html: escapeHtml(noteText)
            };
            footnotes.push(note);
            footnotesById.set(id, note);
        });
        footnoteSection.remove();
    }

    Array.from(tempDiv.querySelectorAll('sup.fn-ref')).forEach(ref => {
        const marker = (ref.textContent || '').trim();
        const id = markerToFootnoteId(marker);
        if (!id || !footnotesById.has(id)) return;
        ref.className = 'fn-ref-wrap';
        ref.innerHTML = `<button type="button" class="fn-ref" data-fn-id="${escapeHtml(id)}" aria-label="${escapeHtml('查看註解' + marker)}" aria-expanded="false">${escapeHtml(marker)}</button>`;
    });

    let pIdx = 0;
    Array.from(tempDiv.querySelectorAll(READING_BLOCK_SELECTOR)).forEach(el => {
        const text = (el.textContent || '').trim();
        if (text.length > 0 && !text.includes('載入中')) {
            el.setAttribute('data-idx', pIdx++);
        } else {
            el.removeAttribute('data-idx');
        }
    });

    return {
        bodyHtml: tempDiv.innerHTML,
        footnotes,
        footnotesById
    };
}

function buildChapterHtml(md) {
    return buildChapterModel(md).bodyHtml;
}

function renderFootnoteItems(noteIds, className) {
    if (!currentChapterModel || !Array.isArray(noteIds) || noteIds.length === 0) return '';
    return noteIds.map(id => {
        const note = getFootnoteById(id);
        if (!note) return '';
        return `<div class="${className}" data-fn-note-id="${escapeHtml(note.id)}"><span class="footnote-marker">${escapeHtml(note.marker)}</span><span class="footnote-text">${note.html}</span></div>`;
    }).join('');
}

function renderChapterEndnotes(model) {
    if (!model || !model.footnotes || model.footnotes.length === 0) return '';
    const ids = model.footnotes.map(note => note.id);
    return `
        <section class="chapter-endnotes" aria-label="註釋">
            <h2>註釋</h2>
            <div class="chapter-endnotes-list">
                ${renderFootnoteItems(ids, 'chapter-endnote')}
            </div>
        </section>`;
}

function renderPageFootnotes(page) {
    if (!page || !page.noteIds || page.noteIds.length === 0) return '';
    const compactIds = new Set(page.compactNoteIds || []);
    const html = renderMeasuredFootnotes(page.noteIds, compactIds);
    if (!html) return '';
    return `<aside class="page-footnotes" aria-label="本頁註釋">${html}</aside>`;
}

function getStackHeight(el) {
    if (!el || !el.children || el.children.length === 0) return 0;
    let height = 0;
    Array.from(el.children).forEach(child => {
        const style = getComputedStyle(child);
        const rect = child.getBoundingClientRect();
        height += rect.height;
        height += parseFloat(style.marginTop) || 0;
        height += parseFloat(style.marginBottom) || 0;
    });
    return Math.ceil(height);
}

function measureBodyHtml(html, rig) {
    rig.body.innerHTML = html || '';
    rig.footnotes.innerHTML = '';
    return getStackHeight(rig.body);
}

function renderMeasuredFootnotes(noteIds, compactIds = new Set()) {
    if (!currentChapterModel || !noteIds || noteIds.length === 0) return '';
    return noteIds.map(id => {
        const note = getFootnoteById(id);
        if (!note) return '';
        const compact = compactIds.has(id);
        const text = compact ? '完整註釋見章末註釋。' : note.text;
        return `<div class="page-footnote${compact ? ' is-compact' : ''}" data-fn-note-id="${escapeHtml(note.id)}"><span class="footnote-marker">${escapeHtml(note.marker)}</span><span class="footnote-text">${escapeHtml(text)}</span></div>`;
    }).join('');
}

function measureFootnotes(noteIds, rig, compactIds = new Set()) {
    rig.body.innerHTML = '';
    rig.footnotes.innerHTML = renderMeasuredFootnotes(noteIds, compactIds);
    if (!noteIds.length) return 0;
    // Include the separator, padding and gap used by the visible page.
    const style = getComputedStyle(rig.footnotes);
    return getStackHeight(rig.footnotes) + ['marginTop','paddingTop','paddingBottom','borderTopWidth'].reduce((sum,key) => sum + (parseFloat(style[key]) || 0), 0);
}

function makePage(bodyBlocks, noteIds, compactIds = new Set()) {
    return {
        bodyHtml: bodyBlocks.join(''),
        noteIds: noteIds.slice(),
        compactNoteIds: Array.from(compactIds)
    };
}

function stabilizePageBlocks(candidateBlocks, rig, metrics, model) {
    let bodyBlocks = candidateBlocks.slice();
    let lastSignature = '';
    const maxFootnoteH = Math.max(metrics.fontVal * 4, Math.floor(metrics.availableH * 0.45));

    for (let iteration = 0; iteration < MAX_PAGINATION_STABILITY_ITERATIONS; iteration++) {
        const bodyHtml = bodyBlocks.join('');
        const noteIds = collectNoteIdsFromHtml(bodyHtml).filter(id => model.footnotesById.has(id));
        const compactIds = new Set();
        let footnoteH = measureFootnotes(noteIds, rig);

        if (footnoteH > maxFootnoteH) {
            noteIds.forEach(id => compactIds.add(id));
            if (!model.pageEndnoteFallbackIds) model.pageEndnoteFallbackIds = new Set();
            noteIds.forEach(id => model.pageEndnoteFallbackIds.add(id));
            footnoteH = measureFootnotes(noteIds, rig, compactIds);
        }

        const availableBodyH = Math.max(0, metrics.availableH - footnoteH);
        const bodyH = measureBodyHtml(bodyHtml, rig);
        const signature = `${bodyBlocks.length}|${noteIds.join(',')}|${footnoteH}|${availableBodyH}|${bodyH}`;

        if (bodyH <= availableBodyH) {
            return {
                fit: true,
                bodyBlocks,
                noteIds,
                compactIds,
                bodyH,
                footnoteH
            };
        }

        if (bodyBlocks.length <= 1) {
            return {
                fit: false,
                bodyBlocks,
                noteIds,
                compactIds,
                bodyH,
                footnoteH
            };
        }

        if (signature === lastSignature) {
            console.warn('[buildPages] pagination stability guard: repeated signature, moving last block to next page');
            bodyBlocks = bodyBlocks.slice(0, -1);
            continue;
        }
        lastSignature = signature;
        bodyBlocks = bodyBlocks.slice(0, -1);
    }

    console.warn('[buildPages] pagination stability guard reached, conservatively moving last candidate block');
    if (bodyBlocks.length > 1) bodyBlocks = bodyBlocks.slice(0, -1);
    const bodyHtml = bodyBlocks.join('');
    const noteIds = collectNoteIdsFromHtml(bodyHtml).filter(id => model.footnotesById.has(id));
    return {
        fit: true,
        bodyBlocks,
        noteIds,
        compactIds: new Set(),
        bodyH: measureBodyHtml(bodyHtml, rig),
        footnoteH: measureFootnotes(noteIds, rig)
    };
}

function estimateImageBlockHeight(block, metrics) {
    const imgEl = block.querySelector ? block.querySelector('img') : null;
    if (!imgEl) return 0;
    let imgRatio = 0.746;
    if (imgEl.naturalWidth > 0 && imgEl.naturalHeight > 0) {
        imgRatio = imgEl.naturalHeight / imgEl.naturalWidth;
    }
    return Math.min(metrics.availableH * 0.65, metrics.availableW * imgRatio);
}

function splitLongBlock(block, availableH, rig, metrics) {
    const text = block.textContent || '';
    const result = [];
    if (!text || block.querySelector('img,table,pre')) return [block.outerHTML];
    // Fix inherited plain-text slicing: retain inline markup and keep note markers atomic.
    const walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let node, total = 0;
    while ((node = walker.nextNode())) { nodes.push({node,start:total}); total += node.length; }
    const boundaries = [0];
    const segmenter = new Intl.Segmenter('zh-Hant', {granularity:'grapheme'});
    const protectedRanges = [];
    for (const {node,start} of nodes) {
        if (node.parentElement.closest('[data-fn-id]')) protectedRanges.push([Math.max(0,start-1),start+node.length]);
    }
    for (const s of segmenter.segment(text)) {
        const end = s.index + s.segment.length;
        if (!protectedRanges.some(([a,b]) => end > a && end < b)) boundaries.push(end);
    }
    function point(offset) {
        for (const item of nodes) if (offset <= item.start + item.node.length) return [item.node,offset-item.start];
        return [nodes.at(-1).node,nodes.at(-1).node.length];
    }
    function fragment(start,end) {
        const range = document.createRange();
        range.setStart(...point(start)); range.setEnd(...point(end));
        const clone = block.cloneNode(false);
        clone.dataset.start = String(Number(block.dataset.start || 0) + start);
        if (start > 0) clone.classList.add('continued-block');
        clone.append(range.cloneContents());
        return clone.outerHTML;
    }
    let start = 0;
    while (start < boundaries.length - 1) {
        let low = start + 1, high = boundaries.length - 1, bestEnd = start;
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            const html = fragment(boundaries[start],boundaries[mid]);
            const layout = stabilizePageBlocks([html],rig,{...metrics,availableH},currentChapterModel);
            if (layout.fit) {
                bestEnd = mid;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        if (bestEnd === start) throw new Error('可用頁面高度不足，請切換滾動閱讀或縮小字級。');
        result.push(fragment(boundaries[start],boundaries[bestEnd]));
        start = bestEnd;
    }
    return result;
}

function buildFallbackEndnotePages(model, rig, metrics) {
    if (!model.pageEndnoteFallbackIds || model.pageEndnoteFallbackIds.size === 0) return [];
    const ids = Array.from(model.pageEndnoteFallbackIds).filter(id => model.footnotesById.has(id));
    if (ids.length === 0) return [];

    const blocks = [
        '<h2 class="page-endnote-title">註釋</h2>',
        ...ids.map(id => {
            const note = getFootnoteById(id, model);
            return `<p class="page-endnote-item"><span class="footnote-marker">${escapeHtml(note.marker)}</span>${escapeHtml(note.text)}</p>`;
        })
    ];

    const fallbackPages = [];
    let current = [];
    blocks.forEach(blockHtml => {
        const candidate = current.concat(blockHtml);
        if (measureBodyHtml(candidate.join(''), rig) <= metrics.availableH || current.length === 0) {
            current = candidate;
        } else {
            fallbackPages.push({ bodyHtml: current.join(''), noteIds: [], compactNoteIds: [] });
            current = [blockHtml];
        }
    });
    if (current.length > 0) fallbackPages.push({ bodyHtml: current.join(''), noteIds: [], compactNoteIds: [] });
    return fallbackPages;
}

function buildPages(model) {
    console.log('[buildPages] 開始分頁計算...');

    if (!model) return [];
    model.pageEndnoteFallbackIds = new Set();
    const metrics = getPaginationMetrics();
    const rig = ensureMeasureRig(metrics);
    console.log('[buildPages] isMobile:', metrics.isMobile, 'pageH:', metrics.pageH, 'pageW:', metrics.pageW, 'availableH:', metrics.availableH, 'availableW:', metrics.availableW);

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = model.bodyHtml;
    const blocks = Array.from(tempDiv.children).map(block => block.outerHTML);

    if (blocks.length === 0) {
        return model.bodyHtml ? [{ bodyHtml: model.bodyHtml, noteIds: [], compactNoteIds: [] }] : [];
    }

    const result = [];
    let index = 0;

    while (index < blocks.length) {
        let candidate = [];
        let lastGood = null;
        let consumed = 0;

        while (index + consumed < blocks.length) {
            candidate.push(blocks[index + consumed]);
            const layout = stabilizePageBlocks(candidate, rig, metrics, model);
            if (layout.fit && layout.bodyBlocks.length === candidate.length) {
                lastGood = layout;
                consumed++;
                continue;
            }
            break;
        }

        if (lastGood && lastGood.bodyBlocks.length > 0) {
            result.push(makePage(lastGood.bodyBlocks, lastGood.noteIds, lastGood.compactIds));
            index += lastGood.bodyBlocks.length;
            continue;
        }

        const blockDiv = document.createElement('div');
        blockDiv.innerHTML = blocks[index];
        const firstBlock = blockDiv.firstElementChild;
        const splitAvailable = Math.max(metrics.fontVal * 3, metrics.availableH);
        const splitPages = firstBlock ? splitLongBlock(firstBlock, splitAvailable, rig, metrics) : [blocks[index]];
        if (splitPages.length > 1) {
            splitPages.forEach(pageHtml => {
                const layout = stabilizePageBlocks([pageHtml], rig, metrics, model);
                result.push(makePage(layout.bodyBlocks, layout.noteIds, layout.compactIds));
            });
        } else {
            const layout = stabilizePageBlocks([blocks[index]], rig, metrics, model);
            console.warn('[buildPages] Oversized block placed alone to prevent pagination stall');
            result.push(makePage(layout.bodyBlocks, layout.noteIds, layout.compactIds));
        }
        index++;
    }

    result.push(...buildFallbackEndnotePages(model, rig, metrics));
    console.log('[buildPages] 分頁完成:', result.length, '頁');
    return result.length > 0 ? result : [{ bodyHtml: model.bodyHtml, noteIds: [], compactNoteIds: [] }];
}


return {
 parse(md) { currentChapterModel = buildChapterModel(md); return currentChapterModel; },
 paginate(model, metrics) { currentChapterModel = model; currentMetrics = metrics; return buildPages(model); },
 pageNotes: renderPageFootnotes,
 endnotes(model) { currentChapterModel = model; return renderChapterEndnotes(model); },
 dispose() { measureRig?.root.remove(); measureRig = null; }
};
}
