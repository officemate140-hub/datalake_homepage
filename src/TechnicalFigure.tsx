import { useId, useRef, useState } from 'react';
import { Expand, X, ZoomIn, ZoomOut, ArrowUpRight } from 'lucide-react';
import { routeHref } from './pageContent';

export function TechnicalFigure({ image, title, caption }: { image: string; title: string; caption: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [zoomed, setZoomed] = useState(false);
  const titleId = useId();
  const src = routeHref(`assets/${image}`);
  return <figure className="technical-figure">
    <button className="figure-preview" onClick={() => { setZoomed(false); dialog.current?.showModal(); }} aria-label={`${title} 확대 보기`}>
      <img src={src} alt={title} loading="lazy" />
      <span><Expand size={16} /> 도표 확대 보기</span>
    </button>
    <figcaption>{caption}</figcaption>
    <dialog ref={dialog} className="figure-dialog" aria-labelledby={titleId} onClick={event => { if (event.target === dialog.current) dialog.current?.close(); }}>
      <div className="figure-toolbar"><h2 id={titleId}>{title}</h2><div><button aria-label={zoomed ? '도표 축소' : '도표 원본 크기로 확대'} onClick={() => setZoomed(!zoomed)}>{zoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}</button><a href={src} target="_blank" rel="noopener noreferrer" aria-label="도표 원본 새 창에서 보기"><ArrowUpRight size={20} /></a><button aria-label="도표 닫기" onClick={() => dialog.current?.close()}><X size={22} /></button></div></div>
      <div className={`figure-scroll ${zoomed ? 'is-zoomed' : ''}`} tabIndex={0} aria-label="도표 이미지 영역"><img src={src} alt={title} /></div>
      <p>확대 버튼으로 글자를 크게 볼 수 있습니다. 확대 후 좌우로 이동해 살펴보세요.</p>
    </dialog>
  </figure>;
}

export function CurrentSignalFigure() {
  const path = Array.from({ length: 480 }, (_, i) => `${i ? 'L' : 'M'}${i + 40},${105 + Math.sin(i * .093) * (43 + 8 * Math.sin(i * .011)) + Math.sin(i * .64) * 2}`).join(' ');
  return <svg className="current-signal" viewBox="0 0 560 225" role="img" aria-label="시간에 따른 전류 변화를 설명하는 예시 파형">
    <rect width="560" height="225" fill="#f7faf7" />
    {[55,105,155].map(y => <path key={y} d={`M40 ${y}H520`} stroke="#dce7de" />)}
    {[40,160,280,400,520].map(x => <path key={x} d={`M${x} 38V173`} stroke="#dce7de" />)}
    <text x="40" y="25" fill="#4c7665" fontSize="11">CURRENT SIGNAL</text>
    <path d={path} stroke="#078e79" strokeWidth="2" fill="none" />
    <text x="40" y="201" fill="#698276" fontSize="10">전류 신호 · 설명용 예시</text>
    <text x="520" y="201" textAnchor="end" fill="#698276" fontSize="10">TIME →</text>
  </svg>;
}
