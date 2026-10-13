import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { ArrowUpRight, ArrowRight, ArrowDown, Menu, X, Activity, Cpu, Radio, MoveUpRight, Check, Mail, MapPin, Plus, Minus, ChevronDown } from 'lucide-react';

import DetailPage, { HomeTechnology, InlineSolutionDetails } from './DetailPages';
import { routeHref, pageMetadata, solutionLinks } from './pageContent';
import { ContactDeliveryError, sendContact } from './contact';

const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;
const EMAIL = import.meta.env.VITE_COMPANY_EMAIL || 'japark.work@gmail.com';
const ADDRESS = '강원특별자치도 원주시 입춘로 45, 씨동 1213호 (반곡동, 엔터비즈타워)';
const navigation = [{ label: '솔루션', href: '/solutions/' }, { label: '핵심 기술', href: '/technology/' }, { label: '적용 분야', href: '/applications/' }, { label: '회사 소개', href: '/company/' }];

function Brand({ light = false, href = routeHref() }: { light?: boolean; href?: string }) {
  return <a href={href} className={`brand ${light ? 'brand-light' : ''}`} aria-label="데이터레이크 홈으로">
    <span className="brand-symbol"><img src={asset('datalake-logo.png')} alt="" width="64" height="64" /></span>
    <span className="brand-word">DATALAKE<span>주식회사 데이터레이크</span></span>
  </a>;
}

function DataLandscape() {
  const uid = useId().replaceAll(':', '');
  const point = (x: number, row: number) => {
    const depth = row / 38;
    return [x, 155 + row * 10 + Math.sin(x / 190 + depth * 1.6) * 66 - Math.exp(-(((x - 660) / 215) ** 2)) * (75 + depth * 80) + Math.sin(x / 370) * 42];
  };
  const lines = Array.from({ length: 39 }, (_, row) => Array.from({ length: 101 }, (_, col) => { const [x, y] = point(col * 12, row); return `${col ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`; }).join(' '));
  return <div className="data-landscape" aria-hidden="true">
    <div className="landscape-glow" />
    <svg viewBox="0 0 1200 650" fill="none" className="landscape-svg">
      <defs>
        <linearGradient id={`${uid}-wave`} x1="60" y1="350" x2="1130" y2="200" gradientUnits="userSpaceOnUse"><stop stopColor="#06c7ad" stopOpacity="0" /><stop offset=".38" stopColor="#15baa6" stopOpacity=".65" /><stop offset=".7" stopColor="#94fce2" /><stop offset="1" stopColor="#12a48e" stopOpacity=".1" /></linearGradient>
        <linearGradient id={`${uid}-columns`} x1="500" y1="120" x2="650" y2="550" gradientUnits="userSpaceOnUse"><stop stopColor="#b2ffe8" stopOpacity=".2" /><stop offset="1" stopColor="#58dcc1" stopOpacity="0" /></linearGradient>
      </defs>
      <g className="wave-lines">{lines.map((d, i) => <path key={i} d={d} stroke={`url(#${uid}-wave)`} strokeWidth={i % 8 === 0 ? 1.7 : .7} opacity={.35 + i / 65} />)}</g>
      {Array.from({ length: 42 }, (_, i) => <path key={i} d={Array.from({ length: 39 }, (_, row) => { const [x, y] = point(i * 29, row); return `${row ? 'L' : 'M'}${x},${y}`; }).join(' ')} stroke={`url(#${uid}-columns)`} strokeWidth=".7" />)}
      {[20, 29, 37, 45, 55, 65, 76, 83, 91].map((col, i) => { const [x, y] = point(col * 12, i % 3 * 11 + 8); return <g key={col} className="signal-point" style={{ animationDelay: `${i * -.6}s` }}><circle cx={x} cy={y} r="3" fill="#baffea" /><circle cx={x} cy={y} r="8" stroke="#a1ffdf" strokeOpacity=".35" /></g>; })}
    </svg>
    <span className="landscape-label label-one"><span /> CURRENT INTO INSIGHT</span>
    <span className="landscape-label label-two">DATA INTO FORESIGHT <ArrowUpRight size={15} /></span>
    <span className="coordinate">37°20′ N &nbsp; 127°59′ E</span>
  </div>;
}

const solutions = [
  { id: 'analysis', label: 'AI 솔루션 개발', english: 'AI Solution', number: '01', title: <>전류의 변화에서,<br />고장의 징후를 찾습니다.</>, text: '전류의 시계열 데이터를 분석해 설비 상태를 파악합니다. 신호 처리와 AI 모델을 연결하고, 현장 데이터를 반영해 진단 솔루션을 고도화합니다.', features: ['FFT·STFT 기반 신호 분석', '특징 추출 및 데이터 군집 분석', 'RF·SVM·DNN 모델 활용'], visualLabel: 'AI SOLUTION DEVELOPMENT', caption: '전류 분석 흐름을 설명하기 위한 예시 시각화' },
  { id: 'sensing', label: 'IoT 디바이스 개발', english: 'IoT Device', number: '02', title: <>전류를 데이터로,<br />현장에 맞는 하드웨어.</>, text: '설비의 전류를 수집하는 IoT 디바이스를 개발합니다. 수집 모듈과 코어보드, 저장·전송 구성을 연결해 AI 진단에 필요한 데이터를 확보합니다.', features: ['전류 센싱 및 데이터 수집', '수집 모듈·코어보드 설계', '이더넷 전송 및 데이터 로깅'], visualLabel: 'IoT DEVICE DEVELOPMENT', caption: '데이터레이크 IoT 모듈 · 회사소개서 이미지 보정본' },
];

function WaveChart({ compact = false }: { compact?: boolean }) {
  const d = Array.from({ length: 250 }, (_, i) => {
    const burst = Math.exp(-(((i - 157) / 13) ** 2));
    return `${i ? 'L' : 'M'}${i * 2},${62 + Math.sin(i * .59) * (8 + burst * 40) + Math.sin(i * .19) * 4}`;
  }).join(' ');
  return <svg viewBox="0 0 500 130" fill="none" className={compact ? 'wave-chart compact' : 'wave-chart'} role="img" aria-label="전류의 신호 변화를 보여주는 설명용 파형">
    {[20, 60, 100].map(y => <path key={y} d={`M0 ${y}H500`} stroke="currentColor" strokeOpacity=".12" />)}
    {[0, 100, 200, 300, 400, 500].map(x => <path key={x} d={`M${x} 0V130`} stroke="currentColor" strokeOpacity=".08" />)}
    <rect x="286" y="0" width="60" height="130" fill="#27d2b4" fillOpacity=".09" />
    <path d={d} stroke="#45d9bc" strokeWidth="1.6" />
  </svg>;
}

function SolutionVisual({ selected }: { selected: number }) {
  const solution = solutions[selected];
  return <div className={`solution-visual ${selected === 0 ? 'visual-ai' : 'visual-hardware'}`}>
    <div className="visual-topline"><span><i /> {solution.visualLabel}</span><span>DL / {solution.number}</span></div>
    {selected === 1 ? <div className="hardware-visual"><img src={asset('iot-module-refined.png')} alt="데이터레이크 IoT 데이터 수집 모듈 보드" loading="lazy" /><div className="hardware-tags"><span>Current Sensing</span><span>Data Acquisition</span></div></div>
      : <div className="analysis-visual"><div className="analysis-title"><span>CURRENT-BASED DIAGNOSTICS</span><strong>전류에서 패턴으로</strong></div><WaveChart /><div className="model-flow"><span>신호 처리</span><ArrowRight size={16} /><span>특징 추출</span><ArrowRight size={16} /><span className="model-result">결함 분석</span></div></div>}
    <p className="visual-caption">{solution.caption}</p>
  </div>;
}

const applications = [
  { title: '펌프 설비', en: 'Pump systems', text: '연속 운전되는 펌프의 작은 변화를 살핍니다.', description: '다양한 부하와 운전 환경에 노출되는 펌프. 전류 신호를 통해 베어링 마모, 축 정렬 불량, 임펠러 손상 등 주요 결함을 분석합니다.', tags: ['원심펌프', '다단펌프', '베어링·임펠러'], number: '01' },
  { title: '전동기·회전기기', en: 'Motors & rotating equipment', text: '설비를 움직이는 핵심 부품의 상태를 읽습니다.', description: '전동기의 전류 데이터를 분석합니다. 회전자와 베어링의 결함 특성을 파악하고, 중복·다중 결함의 진단을 위한 데이터를 축적합니다.', tags: ['전동기', '회전자', '특징 분석'], number: '02' },
  { title: '발전·산업 플랜트', en: 'Power & industrial plants', text: '안정적인 설비 운영에 필요한 진단을 지원합니다.', description: '주요 회전기기와 펌프계통의 상태를 모니터링합니다. 발전소 회전기기 진단 장비 개발 경험을 바탕으로 현장의 계측·분석 요구에 맞춰 접근합니다.', tags: ['발전소 회전기기', '정밀 계측', '상태 진단'], number: '03' },
];

function ContactDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const pending = useRef(false);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const [notice, setNotice] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const sending = status === 'sending';
  useEffect(() => {
    if (open) { ref.current?.showModal(); document.body.style.overflow = 'hidden'; }
    else { ref.current?.close(); document.body.style.overflow = ''; }
    return () => { document.body.style.overflow = ''; };
  }, [open]);
  useEffect(() => {
    if (status === 'sent' || status === 'error') statusRef.current?.focus();
  }, [status]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current || status === 'sent') return;
    const form = event.currentTarget;
    const values = new FormData(form);
    if (['company', 'name', 'message'].some(key => !String(values.get(key) ?? '').trim())) {
      setStatus('error'); setNotice('회사·기관명, 담당자명과 문의 내용을 입력해 주세요.'); return;
    }
    pending.current = true;
    setStatus('sending'); setNotice('문의를 전송하고 있습니다. 잠시만 기다려 주세요.');
    try {
      const result = await sendContact(values, EMAIL, window.location.href);
      if (result === 'activation-required') {
        setStatus('error');
        setNotice('현재 문의 수신 설정을 확인하고 있습니다. 입력하신 내용은 유지되며, 급한 문의는 아래 이메일로 보내 주세요.');
      } else {
        setStatus('sent');
        setNotice('문의가 접수되었습니다. 남겨주신 이메일로 답변드리겠습니다.');
        form.reset();
      }
    } catch (error) {
      setStatus('error');
      setNotice(error instanceof ContactDeliveryError && error.uncertain
        ? '전송 결과를 확인하지 못했습니다. 중복 접수를 피하려면 아래 이메일로 접수 여부를 확인해 주세요. 입력 내용은 그대로 유지됩니다.'
        : '문의를 전송하지 못했습니다. 입력 내용은 유지됩니다. 잠시 후 다시 시도하거나 아래 이메일로 문의해 주세요.');
    } finally { pending.current = false; }
  }
  return <dialog ref={ref} className="contact-dialog" onCancel={e => { if (pending.current) e.preventDefault(); else onClose(); }} onClose={onClose} onClick={e => { if (e.target === ref.current && !pending.current) onClose(); }} aria-labelledby="contact-title">
    <button className="dialog-close icon-button" onClick={onClose} disabled={sending} aria-label="문의 창 닫기"><X size={24} /></button>
    <p className="eyebrow">LET’S TALK</p><h2 id="contact-title">어떤 설비를<br />함께 살펴볼까요?</h2>
    <p className="dialog-intro">궁금한 점과 현장의 고민을 남겨주세요.</p>
    <form onSubmit={submit} aria-busy={sending}>
      <fieldset className="contact-fields" disabled={sending || status === 'sent'}>
      <legend className="contact-sr-only">문의 정보</legend>
      <div className="form-row"><label>회사 / 기관명 <span>*</span><input name="company" autoComplete="organization" placeholder="회사 또는 기관명" required maxLength={80} /></label><label>담당자명 <span>*</span><input name="name" autoComplete="name" placeholder="성함" required maxLength={40} /></label></div>
      <label>회신 이메일 <span>*</span><input type="email" name="email" autoComplete="email" placeholder="name@company.com" required maxLength={120} /></label>
      <label>관심 분야<select name="equipment" defaultValue="산업 설비 고장예지"><option>산업 설비 고장예지</option><option>AI 솔루션 개발</option><option>IoT 디바이스 개발</option><option>기술 협력 및 기타</option></select></label>
      <label>문의 내용 <span>*</span><textarea name="message" rows={3} placeholder="대상 설비와 필요하신 내용을 알려주세요." required maxLength={1200} /></label>
      <div className="contact-honeypot" aria-hidden="true"><label>이 칸은 비워 주세요<input name="_honey" tabIndex={-1} autoComplete="off" /></label></div>
      <p className="form-note">문의는 데이터레이크 담당자에게 이메일로 전달됩니다. 메일 앱을 따로 열 필요가 없습니다.</p>
      <details className="contact-privacy"><summary>문의 정보 처리 안내</summary><p>회사·기관명, 담당자명, 회신 이메일과 문의 내용은 문의 접수 및 답변을 위해 사용합니다. 전송 서비스 FormSubmit을 통해 전달되며, 해당 서비스에 문의 내용이 30일간 보관됩니다. <a href="https://formsubmit.co/privacy.pdf" target="_blank" rel="noopener noreferrer">서비스 개인정보 안내</a></p></details>
      <button type="submit" className="button button-dark">{sending ? '전송 중…' : status === 'sent' ? '접수 완료' : '문의 보내기'}{status === 'sent' ? <Check size={19} /> : <ArrowUpRight size={19} />}</button>
      </fieldset>
      <p ref={statusRef} tabIndex={-1} className={`form-status ${status === 'error' ? 'form-status-error' : ''}`} role="status" aria-live="polite" aria-atomic="true">{notice}</p>
      {status === 'sent' && <button type="button" className="contact-new" onClick={() => { setStatus('idle'); setNotice(''); }}>새 문의 작성하기</button>}
      <a className="direct-email" href={`mailto:${EMAIL}`}>{EMAIL}<ArrowUpRight size={14} /></a>
    </form>
  </dialog>;
}

export default function App({ path = '/' }: { path?: string }) {
  const currentPath = path.endsWith('/') ? path : path + '/';
  const isHome = currentPath === '/';
  function sectionHref(path: string) {
    const sections: Record<string, string> = { '/solutions/': 'solutions', '/solutions/diagnostics/': 'analysis', '/solutions/sensing/': 'sensing', '/technology/': 'technology', '/applications/': 'applications', '/company/': 'company', '/contact/': 'contact' };
    const [page, fragment] = path.split('#');
    const hash = '#' + (fragment || sections[page] || 'home');
    return isHome ? hash : routeHref(hash);
  }
  useEffect(() => { if (pageMetadata[currentPath]) document.title = pageMetadata[currentPath].title; }, [currentPath]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const [application, setApplication] = useState(0);
  const [contactOpen, setContactOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const solution = solutions[selected];
  const sector = applications[application];
  useEffect(() => {
    const close = (event: globalThis.KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  useEffect(() => {
    if (!isHome) return;
    let frame = 0;
    function reveal(hash: string) {
      let id: string;
      try { id = decodeURIComponent(hash.slice(1)); } catch { return; }
      const target = document.getElementById(id);
      if (!target) return;
      for (let node: HTMLElement | null = target; node; node = node.parentElement) {
        if (node instanceof HTMLDetailsElement) node.open = true;
      }
      const industry = ['pumps', 'motors', 'plants'].indexOf(id);
      if (industry >= 0) setApplication(industry);
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
    }
    function onHash() { reveal(window.location.hash); }
    function onAnchor(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest('a') : null;
      const href = link?.getAttribute('href');
      if (href?.startsWith('#') && href.length > 1) reveal(href);
    }
    document.addEventListener('click', onAnchor);
    window.addEventListener('hashchange', onHash);
    if (window.location.hash) onHash();
    return () => { cancelAnimationFrame(frame); document.removeEventListener('click', onAnchor); window.removeEventListener('hashchange', onHash); };
  }, [isHome]);
  function navigateTab(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % solutions.length;
    else if (event.key === 'ArrowLeft') next = (index + solutions.length - 1) % solutions.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = solutions.length - 1;
    else return;
    event.preventDefault(); setSelected(next); tabsRef.current[next]?.focus();
  }
  function openContact() { setMenuOpen(false); setContactOpen(true); }
  async function copyEmail() {
    try { await navigator.clipboard.writeText(EMAIL); setCopied(true); }
    catch { window.location.href = `mailto:${EMAIL}`; }
  }
  return <>
    <a href="#main" className="skip-link">본문으로 바로가기</a>
    <header className="header" id="top"><div className="header-inner"><Brand href={isHome ? "#home" : routeHref()} /><nav aria-label="주요 메뉴" className="desktop-nav">{navigation.map(item => item.href === "/solutions/" ? <div className="nav-group" key={item.href}><a href={sectionHref(item.href)} aria-current={currentPath.startsWith(item.href) ? "page" : undefined}>{item.label}<ChevronDown size={12} /></a><div className="nav-dropdown"><a href={sectionHref("/solutions/")}>산업 설비 고장예지<ArrowUpRight size={15} /></a>{solutionLinks.map((link,i) => <a href={sectionHref(link.path)} key={link.path}><span>0{i+1}</span>{link.title}</a>)}</div></div> : <a key={item.href} href={sectionHref(item.href)} aria-current={currentPath === item.href ? "page" : undefined}>{item.label}</a>)}</nav><a className="header-contact" href={sectionHref("/contact/")}>Contact <ArrowUpRight size={18} /></a><button className="menu-toggle icon-button" aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></div>
      {menuOpen && <nav id="mobile-nav" className="mobile-nav" aria-label="모바일 메뉴" onClick={() => setMenuOpen(false)}>{navigation.map(item => <a key={item.href} href={sectionHref(item.href)} onClick={() => setMenuOpen(false)}>{item.label}<ArrowUpRight size={20} /></a>)}{solutionLinks.map(item => <a className="mobile-sublink" key={item.path} href={sectionHref(item.path)}>{item.title}<ArrowUpRight size={14} /></a>)}<a href={sectionHref("/contact/")} onClick={() => setMenuOpen(false)}>Contact<ArrowUpRight size={20} /></a></nav>}
    </header>
    <main id="main">{isHome ? <>
      <section className="hero" id="home" aria-labelledby="hero-title"><div className="hero-grid" /><DataLandscape /><div className="container hero-content"><p className="eyebrow hero-eyebrow"><span /> PRECISION IN PREDICTION</p><h1 id="hero-title">설비의 신호를 읽고,<br />산업의 내일을<br className="mobile-break" /> <em>예측합니다.</em></h1><p className="hero-description">전류의 변화에서 찾는 고장의 징후.<br />IoT와 AI로 산업 설비의 변화를 먼저 발견합니다.</p><a className="button button-mint" href={sectionHref("/solutions/")}>솔루션 알아보기 <ArrowDown size={20} /></a><div className="hero-bottom"><p>ENGINEERED FOR<br /><strong>A MORE PREDICTABLE TOMORROW.</strong></p><div className="hero-bottom-center"><span>IoT Sensing</span><i /><span>AI Diagnostics</span><i /><span>Predictive Maintenance</span></div><a href="#overview" className="scroll-link" aria-label="아래 회사 개요로 이동"><span>SCROLL TO EXPLORE</span><ArrowDown size={20} /></a></div></div><span className="hero-side">INDUSTRIAL INTELLIGENCE / DATALAKE</span></section>

      <section id="overview" className="overview section-pad"><div className="container"><div className="section-heading overview-heading"><div><p className="eyebrow">CONNECTED DATA. CLEARER DECISIONS.</p><h2>설비를 바꾸기 전에,<br />데이터를 바라보는 방식을 바꿉니다.</h2></div><p className="section-description">익숙한 설비에도 새로운 가능성이 있습니다.<br />데이터레이크는 자체 IoT 하드웨어와 AI 분석 기술로<br className="desktop-break" /> 노후 설비의 스마트화를 돕는 예지보전 기술 기업입니다.</p></div><div className="principles"><article><span className="principle-number">01</span><div><Radio strokeWidth={1.4} /><h3>현장에서 시작하는 데이터</h3><p>설비가 보내는 전류 신호를 수집합니다.</p></div></article><article><span className="principle-number">02</span><div><Cpu strokeWidth={1.4} /><h3>변화를 읽어내는 AI</h3><p>복합적인 신호 속에서 고장의 징후를 분석합니다.</p></div></article><article><span className="principle-number">03</span><div><Activity strokeWidth={1.4} /><h3>판단을 돕는 모니터링</h3><p>진단 결과를 현장의 유지보수 판단에 연결합니다.</p></div></article></div></div></section>

      <section id="solutions" className="solutions section-pad"><div className="container"><div className="section-heading"><div><p className="eyebrow">OUR SOLUTION</p><h2>산업 설비 고장예지.</h2></div><p className="section-description">전류 데이터로 설비의 상태를 이해합니다.<br />AI 솔루션과 IoT 디바이스, 두 가지 개발 역량을 연결합니다.</p></div><a className="business-feature" href="#system"><img src={asset('power-plant.png')} alt="발전소 건물과 산업 설비를 보여주는 분야 설명용 이미지" loading="lazy" /><div><p className="eyebrow">INDUSTRIAL PREDICTIVE MAINTENANCE</p><h3>설비의 변화를 먼저 읽는 기술.</h3><p>발전소와 산업 현장의 안정적인 운영을 위한 전류 기반 고장예지.</p><span>산업 설비 고장예지 알아보기 <ArrowDown size={19} /></span></div><small>발전소 분야 설명용 이미지</small></a><div className="business-children-label"><span>DEVELOPMENT CAPABILITIES</span><p>고장예지를 구현하는 두 가지 개발 역량</p></div><div className="solution-tabs" role="tablist" aria-label="개발 분야">{solutions.map((item, index) => <button key={item.id} ref={node => { tabsRef.current[index] = node; }} id={`tab-${item.id}`} role="tab" aria-selected={selected === index} aria-controls={`panel-${item.id}`} tabIndex={selected === index ? 0 : -1} onKeyDown={e => navigateTab(e, index)} onClick={() => setSelected(index)} className={selected === index ? 'active' : ''}><span className="tab-number">{item.number}</span><span>{item.label}<small>{item.english}</small></span><ArrowUpRight size={22} /></button>)}</div><div className="solution-panel" id={`panel-${solution.id}`} role="tabpanel" aria-labelledby={`tab-${solution.id}`} tabIndex={0}><div className="solution-copy"><span className="solution-kicker">{solution.number} / {solution.english.toUpperCase()}</span><h3>{solution.title}</h3><p>{solution.text}</p><ul>{solution.features.map(feature => <li key={feature}><Check size={16} />{feature}</li>)}</ul><a className="text-link solution-detail-link" href={sectionHref(solutionLinks[selected].path)}>상세 내용 펼쳐 보기 <ArrowDown size={19} /></a><button className="text-link" onClick={openContact}>우리 설비에 적용하려면 <ArrowUpRight size={19} /></button></div><SolutionVisual selected={selected} /></div><div className="solution-footnote"><span>FROM SIGNAL TO INSIGHT</span><p>설비 데이터 수집 <ArrowRight size={14} /> 신호 처리 <ArrowRight size={14} /> AI 분석 <ArrowRight size={14} /> 유지보수 판단</p></div><InlineSolutionDetails path="/" onContact={openContact} visual={index => <SolutionVisual selected={index} />} /></div></section><HomeTechnology path="/" onContact={openContact} visual={index => <SolutionVisual selected={index} />} />

      <section className="applications section-pad" id="applications"><div className="container"><div className="section-heading"><div><p className="eyebrow">WHERE WE WORK</p><h2>멈추지 않아야 할 현장에,<br />먼저 알아차리는 기술.</h2></div><p className="section-description">펌프에서 전동기, 산업 플랜트까지.<br />설비의 특성과 운영 환경에 맞춰 접근합니다.</p></div><div className="application-layout"><div className="application-image"><img src={asset('pump-facility.png')} alt="여러 대의 산업용 펌프와 전동기가 설치된 펌프실 예시" width="1536" height="1024" loading="lazy" /><div className="image-shade" /><span className="image-label">INDUSTRIAL APPLICATIONS</span><div className="image-title"><span>BUILT AROUND YOUR EQUIPMENT</span><h3>{sector.en}</h3></div><span className="image-caption">적용 분야 이해를 위한 소개서 수록 이미지</span></div><div className="application-list">{applications.map((item, index) => <div key={item.title} id={["pumps", "motors", "plants"][index]} className={`application-item ${application === index ? 'active' : ''}`}><button onClick={() => setApplication(index)} aria-expanded={application === index} aria-controls={`application-${index}`}><span className="app-number">{item.number}</span><span>{item.title}</span>{application === index ? <Minus size={21} /> : <Plus size={21} />}</button><div id={`application-${index}`} hidden={application !== index}><h4>{item.text}</h4><p>{item.description}</p><div className="application-tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div></div>)}</div></div></div></section>

      <section className="home-insights section-pad"><div className="container"><div className="section-heading"><div><p className="eyebrow">INSIDE DATALAKE</p><h2>데이터레이크를<br />조금 더 깊이 만나보세요.</h2></div><p className="section-description">기술의 원리부터 하드웨어, 기업의 발걸음까지.<br />궁금한 이야기에서 시작하세요.</p></div><div className="insight-grid"><a className="insight-link" href={sectionHref('/technology/')}><div className="insight-picture"><img src={asset('data-clusters.png')} alt="센서 데이터의 군집 분포" loading="lazy" /></div><span>01 / TECHNOLOGY</span><h3>데이터는 어떻게 진단이 될까요?<ArrowUpRight size={21} /></h3><p>특징 분석, 신호 처리, 군집화와 AI 모델을 직접 탐색해 보세요.</p></a><a className="insight-link" href={sectionHref('/solutions/sensing/')}><div className="insight-picture hardware"><img src={asset('iot-module-refined.png')} alt="자체 IoT 하드웨어 모듈" loading="lazy" /></div><span>02 / HARDWARE</span><h3>현장의 신호를 모으는 하드웨어<ArrowUpRight size={21} /></h3><p>센서에서 코어보드, 데이터 로깅까지. IoT 시스템의 구성을 소개합니다.</p></a><a className="insight-link" href={sectionHref('/company/')}><div className="insight-picture brand-picture"><img src={asset('datalake-logo.png')} alt="데이터레이크 회사 로고" loading="lazy" /></div><span>03 / COMPANY</span><h3>우리가 만들어가는 내일<ArrowUpRight size={21} /></h3><p>데이터레이크의 기술 역량, 연구개발 활동과 주요 연혁을 만나보세요.</p></a></div></div></section>
      <section id="company" className="company section-pad"><div className="container"><div className="company-top"><div><p className="eyebrow">ABOUT DATALAKE</p><h2>데이터를 이해하는 기술.<br />현장을 이해하는 사람들.</h2></div><p>2024년, 산업 설비의 더 나은 내일을 위해 시작했습니다.<br />하드웨어와 소프트웨어, 전기전자와 데이터 분석의 경험을<br className="desktop-break" /> 하나로 모아 현장에 필요한 기술을 만듭니다.</p></div><div className="company-details"><div className="company-statement"><span className="est">EST.</span><span className="year">2024<span>07</span></span><span className="company-english">PRECISION IN PREDICTION</span><p>작은 신호가 모여<br />큰 가능성이 되는 곳,<br /><strong>데이터레이크.</strong></p></div><div className="timeline" id="history"><article><span className="timeline-year">2025</span><div><h3>기술을 현장으로 연결하다</h3><ul><li>고려대학교 산학협력단 발전소 회전기기 진단 장비 개발용역 수행</li><li>기업부설연구소 설립 · 성과공유기업 확인</li><li>SK 기술나눔기업 선정 및 등록특허 기술이전</li><li>강원대학교 창업중심대학 지원사업 참여</li></ul></div></article><article><span className="timeline-year">2024</span><div><h3>예측 가능한 미래를 향한 시작</h3><ul><li>주식회사 데이터레이크 법인 설립</li><li>제11회 ICT 스마트 디바이스 전국 공모전 최우수상</li><li>서울여성 창업아이디어 공모전 창의상</li><li>성균관대학교 창업중심대학 지원사업 선정</li></ul></div></article></div></div><div className="evidence-row"><div><span>RECOGNITION</span><strong>ICT 스마트 디바이스<br />전국 공모전 최우수상</strong><small>2024</small></div><div><span>RESEARCH</span><strong>기업부설연구소<br />설립</strong><small>2025</small></div><div><span>TECHNOLOGY</span><strong>SK 기술나눔<br />등록특허 기술이전</strong><small>특허 제10-1855317호</small></div></div></div></section>

      <section id="contact" className="contact section-pad"><div className="container contact-inner"><div><p className="eyebrow">CONTACT</p><h2>당신의 현장에는<br />어떤 가능성이 있나요?</h2><p className="contact-description">설비 진단부터 IoT 디바이스, 기술 협력까지.<br />데이터레이크와 함께 이야기해 보세요.</p><button className="button button-dark" onClick={openContact}>프로젝트 문의하기 <ArrowUpRight size={20} /></button></div><div className="contact-details"><div className="contact-item"><Mail size={20} strokeWidth={1.4} /><div><span>EMAIL</span><a href={`mailto:${EMAIL}`}>{EMAIL}<ArrowUpRight size={19} /></a><button onClick={copyEmail} className="copy-email" aria-live="polite">{copied ? '이메일 주소를 복사했습니다' : '이메일 주소 복사'}</button></div></div><div className="contact-item"><MapPin size={20} strokeWidth={1.4} /><div><span>OFFICE</span><p>{ADDRESS}</p><a className="map-link" href={`https://map.naver.com/p/search/${encodeURIComponent('강원특별자치도 원주시 입춘로 45 엔터비즈타워')}`} target="_blank" rel="noopener noreferrer">지도에서 보기 <MoveUpRight size={13} /></a></div></div></div></div><div className="contact-decoration" aria-hidden="true">DATALAKE</div></section>
    </> : <DetailPage path={currentPath} onContact={openContact} visual={index => <SolutionVisual selected={index} />} />}</main>
    <footer className="footer"><div className="container"><div className="footer-top"><Brand light href={isHome ? "#home" : routeHref()} /><a href="#top" className="back-top">Back to top <ArrowUpRight size={17} /></a></div><div className="footer-sitemap"><div><strong>Solutions</strong><a href={sectionHref("/solutions/")}>산업 설비 고장예지</a>{solutionLinks.map(item => <a key={item.path} href={sectionHref(item.path)}>{item.title}</a>)}</div><div><strong>Technology</strong><a href={sectionHref("/technology/#explorer")}>신호 처리·특징 분석</a><a href={sectionHref("/technology/#models")}>AI 알고리즘</a><a href={sectionHref("/solutions/#approach")}>도입 검토 과정</a></div><div><strong>Applications</strong><a href={sectionHref("/applications/#pumps")}>펌프 설비</a><a href={sectionHref("/applications/#motors")}>전동기·회전기기</a><a href={sectionHref("/applications/#plants")}>발전·산업 플랜트</a></div><div><strong>Company</strong><a href={sectionHref("/company/")}>데이터레이크 소개</a><a href={sectionHref("/company/#history")}>주요 연혁</a><a href={sectionHref("/contact/")}>Contact</a></div></div><div className="footer-bottom"><div><p>주식회사 데이터레이크 <span>대표 박진아</span><span>사업자등록번호 533-86-03345</span></p><p>{ADDRESS}</p></div><p>© 2026 DATALAKE. All rights reserved.</p></div></div></footer>
    <ContactDialog open={contactOpen} onClose={() => setContactOpen(false)} />
  </>;
}
