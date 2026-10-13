import { useState, type ReactNode } from 'react';
import { ArrowUpRight, ArrowRight, ArrowDown, ChevronRight, Check, Plus, Radio, Cpu, Activity, Layers3, CircuitBoard, Network, Database, Mail, MapPin } from 'lucide-react';
import { TechnicalFigure, CurrentSignalFigure } from './TechnicalFigure';
import { faqs, pageMetadata, routeHref, solutionLinks } from './pageContent';

const asset = (name: string) => routeHref(`assets/${name}`);
type Props = { path: string; onContact: () => void; visual: (index: number) => ReactNode; embedded?: boolean };

function Intro({ category, title, description, visual, anchors }: { category: string; title: ReactNode; description: string; visual?: ReactNode; anchors?: { id: string; label: string }[] }) {
  return <><section className={`detail-intro ${visual ? 'has-visual' : ''}`}><div className="container"><nav className="breadcrumb" aria-label="현재 위치"><a href={routeHref()}>Home</a><ChevronRight size={12} /><span>{category}</span></nav><div className="detail-intro-inner"><div><p className="eyebrow">DATALAKE / {category.toUpperCase()}</p><h1>{title}</h1><p className="detail-lead">{description}</p></div>{visual && <div className="intro-visual">{visual}</div>}</div></div></section>{anchors && <nav className="section-nav" aria-label="페이지 목차"><div className="container">{anchors.map(item => <a key={item.id} href={`#${item.id}`}>{item.label}<ArrowDown size={12} /></a>)}</div></nav>}</>;
}

function Heading({ eyebrow, title, description }: { eyebrow: string; title: ReactNode; description?: string }) {
  return <div className="detail-heading"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{description && <p>{description}</p>}</div>;
}

function NextStep({ onContact, text = '우리 설비의 다음 단계를 함께 찾아보세요.' }: { onContact: () => void; text?: string }) {
  return <section className="next-step"><div className="container"><div><p className="eyebrow">LET’S MAKE IT CLEAR</p><h2>{text}</h2></div><button className="button button-dark" onClick={onContact}>프로젝트 문의하기 <ArrowUpRight size={20} /></button></div></section>;
}

function Related({ current = '' }: { current?: string }) {
  return <section className="related section-pad"><div className="container"><Heading eyebrow="KEEP EXPLORING" title="다음 이야기도 살펴보세요." /><div className="related-grid">{solutionLinks.filter(item => item.path !== current).map(item => <a className="related-link" href={routeHref(item.path)} key={item.path}><span>{item.eyebrow}</span><h3>{item.title}</h3><p>{item.description}</p><ArrowUpRight size={24} /></a>)}{current && <a className="related-link" href={routeHref('/technology/')}><span>THE TECHNOLOGY</span><h3>핵심 기술</h3><p>특징 분석과 AI 진단을 만드는 기술을 알아보세요.</p><ArrowUpRight size={24} /></a>}</div></div></section>;
}

function FAQ({ limit = faqs.length }: { limit?: number }) {
  return <div className="faq-list">{faqs.slice(0, limit).map((faq, i) => <details key={faq.question}><summary><span>0{i + 1}</span>{faq.question}<Plus size={18} /></summary><p>{faq.answer}</p></details>)}</div>;
}

const processSteps = [
  ['01', '현장과 과제 확인', '설비 종류, 운전 조건, 고장 이력과 도입 목적을 확인합니다.'],
  ['02', '센싱·수집 구성 검토', '설치 위치, 수집 신호, 통신과 저장 환경을 검토합니다.'],
  ['03', '데이터·진단 범위 검토', '수집 데이터의 특성과 분석할 결함 유형을 살펴봅니다.'],
  ['04', '운영 방식 구체화', '담당자가 확인할 정보와 결과 전달 방식을 정리합니다.'],
];

function Process() {
  return <div className="process-grid">{processSteps.map(([n, title, text]) => <article key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p><ArrowRight size={19} /></article>)}</div>;
}

function SolutionOverview({ onContact, visual }: Props) {
  return <><Intro category="Solutions" title={<>산업 설비<br /><em>고장예지.</em></>} description="설비의 전류에서 변화의 징후를 읽습니다. 데이터레이크는 AI 솔루션 개발과 IoT 디바이스 개발을 연결해 발전소와 산업 현장의 유지보수 판단을 지원합니다." visual={<figure className="plant-intro"><img src={asset('power-plant.png')} alt="발전소 건물과 산업 설비" /><figcaption>POWER & INDUSTRY · 분야 설명용 이미지</figcaption></figure>} anchors={[{ id: 'solution-family', label: 'AI · IoT 개발' }, { id: 'system', label: '고장예지 구성' }, { id: 'approach', label: '도입 검토 과정' }, { id: 'faq', label: '자주 묻는 질문' }]} />
    <section id="solution-family" className="section-pad"><div className="container"><Heading eyebrow="TWO CAPABILITIES. ONE PURPOSE." title={<>고장예지를 구현하는<br />두 가지 개발 역량.</>} description="현장의 전류를 수집하는 하드웨어와, 데이터를 해석하는 AI. 필요한 기술을 하나의 진단 흐름으로 연결합니다." />{solutionLinks.map((item, i) => <article className={`solution-editorial ${i % 2 ? 'reverse' : ''}`} key={item.path}><div className="editorial-visual">{visual(i)}</div><div className="editorial-copy"><p className="eyebrow">{item.eyebrow}</p><h2>{item.title}</h2><p>{item.description}</p><ul>{(i === 0 ? ['전류 데이터 기반 신호 처리', '특징 추출·차원축소·군집 분석', 'RF·SVM·DNN 모델 활용'] : ['전류 센싱 및 데이터 수집', 'IoT 수집 모듈과 코어보드 설계', '이더넷 전송·데이터 로깅']).map(text => <li key={text}><Check size={14} />{text}</li>)}</ul><a className="text-link" href={routeHref(item.path)}>개발 분야 자세히 보기 <ArrowUpRight size={18} /></a></div></article>)}</div></section>
    <section id="system" className="section-pad pale-section"><div className="container"><Heading eyebrow="PREDICTIVE MAINTENANCE SYSTEM" title="수집부터 분석, 판단까지." description="전류 데이터 수집과 신호 처리, AI 분석을 연결합니다. 회사소개서의 고장예지 솔루션 구성도를 통해 전체 흐름을 살펴보세요." /><TechnicalFigure image="predictive-system-original.png" title="산업 설비 고장 예지 솔루션 구성도" caption="회사소개서 원본 구성도 · 다양한 수집 신호와 진단 방식의 전체 개요입니다. 데이터레이크의 핵심 센싱은 전류 기반입니다." /><a className="text-link" href={routeHref('/solutions/monitoring/')}>운영·모니터링 구성 더 알아보기 <ArrowUpRight size={18} /></a></div></section>
    <section id="approach" className="section-pad"><div className="container"><Heading eyebrow="OUR APPROACH" title={<>설비의 조건부터,<br />차근차근 함께 살펴봅니다.</>} description="도입 검토를 위한 기본 흐름입니다. 실제 진행 범위와 일정은 현장 조건에 맞춰 협의합니다." /><Process /></div></section>
    <section id="faq" className="section-pad pale-section"><div className="container faq-layout"><Heading eyebrow="FAQ" title={<>시작하기 전에<br />궁금한 점.</>} /><FAQ /></div></section><NextStep onContact={onContact} /></>;
}

function Sensing({ onContact, path, embedded = false }: Props) {
  const architecture = [{ icon: Radio, name: '센서', text: '전류 신호' }, { icon: CircuitBoard, name: '수집 모듈', text: '멀티 채널 · ADC' }, { icon: Cpu, name: '코어보드', text: 'MCU · SoM' }, { icon: Database, name: '데이터 로깅', text: 'SD 카드 · 저장' }, { icon: Network, name: '서버 연결', text: '이더넷 전송' }];
  return <>{!embedded && <Intro category="IoT Device Development" title={<>IoT 디바이스 개발.<br /><em>전류를 데이터로.</em></>} description="전류를 읽는 것부터 예지보전은 시작됩니다. 기존 설비의 특성에 맞춘 센싱과 데이터 수집 구성을 검토합니다." visual={<img src={asset('iot-module-refined.png')} alt="IoT 수집 모듈 구성" />} anchors={[{ id: 'architecture', label: '시스템 구성' }, { id: 'hardware', label: '하드웨어 설계' }, { id: 'checklist', label: '현장 검토 사항' }]} />}
    <section id="architecture" className="section-pad"><div className="container"><Heading eyebrow="SYSTEM ARCHITECTURE" title="설비에서 서버까지 이어지는 데이터." description="센서의 신호를 수집·변환·저장하고, 진단에 활용할 수 있도록 전송합니다." /><div className="architecture-flow">{architecture.map((item, i) => <article key={item.name}><span className="architecture-index">0{i + 1}</span><item.icon size={30} strokeWidth={1.2} /><h3>{item.name}</h3><p>{item.text}</p>{i < 4 && <ArrowRight className="architecture-arrow" size={18} />}</article>)}</div><p className="diagram-note">회사소개서의 시스템 설계 개요를 바탕으로 정리한 구성도입니다. 실제 모듈 구성은 요구 사양에 따라 검토합니다.</p></div></section>
    <section id="hardware" className="section-pad pale-section"><div className="container detail-split"><div><Heading eyebrow="DESIGNED FOR THE FIELD" title={<>하드웨어부터<br />현장에 맞게 설계합니다.</>} description="회로 설계와 IoT 모듈 개발 과정에서 전압·부하, 크기와 비용을 함께 검토합니다. 수집부와 코어보드, 기구 구성을 연결해 진단용 데이터를 확보합니다." /><a className="text-link" href={embedded ? '#technology' : routeHref('/technology/')}>데이터 분석 기술 살펴보기 <ArrowUpRight size={18} /></a></div><div className="product-gallery"><img src={asset('iot-board-side-clean.png')} alt="코어보드와 수집 모듈의 측면 구성" loading="lazy" /><p className="diagram-note">회사소개서의 IoT H/W 구성 이미지 · 보정본</p></div></div></section>
    <section id="checklist" className="section-pad"><div className="container detail-split"><Heading eyebrow="BEFORE WE START" title={<>어떤 데이터를,<br />어떤 환경에서 수집할까요?</>} /><dl className="spec-list"><div><dt>수집 신호</dt><dd>전류를 중심으로 설비 진단에 필요한 신호를 검토합니다. 온도·자속 등은 시스템 설계 요구에 따라 확인합니다.</dd></div><div><dt>설치 조건</dt><dd>설비 및 배전함의 센서 부착 위치, 전원, 공간과 운전 환경을 확인합니다.</dd></div><div><dt>통신·저장</dt><dd>이더넷 연결 환경과 데이터 로깅 요구, 서버 전달 방식을 검토합니다.</dd></div><div><dt>분석 목표</dt><dd>확인하려는 부품과 결함 유형에 맞춰 수집·분석 범위를 정리합니다.</dd></div></dl></div></section>{!embedded && <><Related current={path} /><NextStep onContact={onContact} /></>}</>;
}

function Diagnostics({ onContact, path, visual, embedded = false }: Props) {
  return <>{!embedded && <Intro category="AI Solution Development" title={<>AI 솔루션 개발.<br /><em>전류에서 진단으로.</em></>} description="전류 데이터를 살펴 설비의 상태를 분석합니다. 신호 처리와 AI 모델로 결함의 특성을 파악하고, 현장 데이터를 바탕으로 진단 모델을 고도화합니다." visual={visual(0)} anchors={[{ id: 'pipeline', label: '분석 과정' }, { id: 'fusion', label: '특징 분석' }, { id: 'algorithms', label: 'AI 알고리즘' }, { id: 'learning', label: '학습과 고도화' }]} />}
    <section id="pipeline" className="section-pad"><div className="container"><Heading eyebrow="DIAGNOSTIC PIPELINE" title="신호를 수집하고, 특성을 찾고, 결함을 분석합니다." /><div className="numbered-rows">{[['01', '시계열 데이터 확인', '전류 데이터의 시간에 따른 변화와 운전 조건을 살펴봅니다.'], ['02', '신호 처리 및 특징 분석', 'FFT·STFT 등을 활용해 신호의 주파수 특성과 시간에 따른 패턴을 분석합니다.'], ['03', '특징 분석 및 군집 분석', '전류 데이터의 여러 특성을 함께 보고, 차원축소와 군집 시각화로 데이터 분포를 확인합니다.'], ['04', 'AI 모델 기반 결함 분석', 'RF·SVM·DNN 등의 모델을 활용해 결함 유형을 분석하고, 현장 데이터를 반영해 검토합니다.']].map(([number,title,text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
    <section id="fusion" className="section-pad pale-section"><div className="container detail-split"><div><Heading eyebrow="CURRENT SIGNAL FEATURES" title={<>전류에 담긴 변화,<br />여러 관점으로 분석합니다.</>} description="전류 데이터를 활용합니다. 고차원 데이터의 특징을 정리하고 군집의 경계와 중첩 영역을 살펴, 중복·다중 결함 분석에 필요한 단서를 찾습니다." /><div className="keyword-row"><span>Current</span><span>Signal Features</span><span>PCA · t-SNE · UMAP</span></div></div><figure className="research-figure"><img src={asset('data-clusters.png')} alt="회사소개서에 제시된 고차원 데이터의 군집 시각화" loading="lazy" /><figcaption>회사소개서의 차원축소·군집화 예시. 색상은 데이터 군집을 구분합니다.</figcaption></figure></div></section>
    <section id="algorithms" className="section-pad"><div className="container"><Heading eyebrow="AI ALGORITHMS" title="설비 결함 분석을 위한 AI 알고리즘." description="데이터 특성과 진단 목적에 맞춰 RF·SVM·DNN 모델을 검토합니다." /><TechnicalFigure image="ai-algorithms-original.png" title="산업 설비 결함 분석 AI 알고리즘" caption="회사소개서 원본 · Random Forest / SVM / DNN의 개념과 특성" /><div id="models"><ModelExplorer /></div></div></section><section id="learning" className="section-pad"><div className="container"><Heading eyebrow="CONTINUOUS LEARNING" title="현장 데이터가 쌓일수록, 분석의 맥락도 깊어집니다." description="테스트베드에서 취득한 데이터에 이상 여부를 라벨링하고, 필드 데이터를 추가해 데이터셋을 보완합니다. 재학습과 검토를 반복하며 모델을 개선하는 과정입니다." /><div className="learning-loop">{['데이터 취득', '시계열 라벨링', '모델 학습', '필드 데이터 반영'].map((label,i) => <div key={label}><span>0{i+1}</span><strong>{label}</strong><ArrowRight size={20} /></div>)}</div><a className="text-link" href={embedded ? '#technology' : routeHref('/technology/')}>분석 기술 더 알아보기 <ArrowUpRight size={18} /></a></div></section>{!embedded && <><Related current={path} /><NextStep onContact={onContact} /></>}</>;
}

function Monitoring({ onContact, path }: Props) {
  return <><Intro category="Monitoring" title={<>진단 결과가<br /><em>현장의 판단에 닿도록.</em></>} description="수집된 설비 데이터와 점검 결과를 관리자에게 전달합니다. 서버와 모바일 디바이스의 연결을 통해 설비의 상태를 확인하고, 유지보수 판단에 활용하도록 지원합니다." anchors={[{ id: 'connection', label: '연결 구조' }, { id: 'information', label: '확인할 정보' }, { id: 'operation', label: '운영 환경 검토' }]} />
    <section id="connection" className="section-pad"><div className="container"><Heading eyebrow="CONNECTED MAINTENANCE" title="흩어진 신호를, 함께 볼 수 있는 정보로." /><div className="connection-diagram"><div><Radio size={33} strokeWidth={1.3} /><h3>설비 · IoT 디바이스</h3><p>전류 데이터 수집</p></div><ArrowRight /><div><Cpu size={33} strokeWidth={1.3} /><h3>수집 · 진단 서버</h3><p>데이터 저장 및 고장 진단</p></div><ArrowRight /><div><Activity size={33} strokeWidth={1.3} /><h3>관리자 · 모바일</h3><p>점검 결과 확인 및 판단</p></div></div></div></section>
    <section id="information" className="section-pad pale-section"><div className="container"><Heading eyebrow="WHAT TO LOOK AT" title="운영에 필요한 세 가지 관점." /><div className="content-columns"><article><span>01 / EQUIPMENT</span><h3>어떤 설비인가요?</h3><p>관리 대상 설비와 주요 부품을 구분하고, 수집할 데이터와 점검 목적을 정리합니다.</p></article><article><span>02 / CONDITION</span><h3>어떤 변화가 있나요?</h3><p>데이터의 변화와 진단 결과를 살펴보며 설비 상태를 이해할 수 있도록 구성합니다.</p></article><article><span>03 / DECISION</span><h3>무엇을 확인해야 하나요?</h3><p>관리자가 점검 결과를 확인하고 유지보수 판단에 참고할 수 있도록 전달 방식을 검토합니다.</p></article></div></div></section>
    <section id="operation" className="section-pad"><div className="container detail-split"><Heading eyebrow="OPERATING ENVIRONMENT" title={<>좋은 정보는,<br />현장의 일하는 방식과<br />함께 설계됩니다.</>} /><dl className="spec-list"><div><dt>관리 대상</dt><dd>설비 종류와 대수, 부품 구성과 운영 현황을 확인합니다.</dd></div><div><dt>사용 환경</dt><dd>담당자가 결과를 확인하는 환경과 서버·모바일 연계 요구를 검토합니다.</dd></div><div><dt>전달 정보</dt><dd>점검 결과와 분석 정보 중 운영에 필요한 항목을 정리합니다.</dd></div><div><dt>연계 범위</dt><dd>기존 시스템이 있다면 데이터 형식과 연결 방식, 필요한 개발 범위를 별도로 협의합니다.</dd></div></dl></div></section><Related current={path} /><NextStep onContact={onContact} /></>;
}

const techTopics = [
  { title: '시계열 데이터', english: 'Time-series data', text: '시간의 흐름에 따른 설비의 변화를 읽습니다. 전류 파형을 살펴 운전 상태와 신호의 특징을 파악합니다.', image: 'current-signal', alt: '전동기의 전류 파형', caption: '전류 신호를 설명하기 위한 예시 파형 · 실제 계측값이 아닙니다.', points: ['전동기 전류 데이터', '운전 조건별 신호 특성', '이상 여부에 대한 시계열 라벨링'] },
  { title: '신호 처리', english: 'Signal processing', text: '시간에 따라 변하는 신호를 분석하기 좋은 형태로 살펴봅니다. FFT·STFT를 활용해 주파수 특성과 시간에 따른 패턴을 분석합니다.', image: 'predictive-system-original.png', alt: '신호 처리와 분석으로 이어지는 시스템 구성', caption: '회사소개서의 신호 수집·분석 시스템 개요', points: ['FFT 기반 주파수 분석', 'STFT 기반 시간·주파수 분석', '진단에 필요한 신호 특성 확인'] },
  { title: '차원축소·군집화', english: 'Patterns & clusters', text: '전류 신호에서 추출한 고차원 데이터를 시각화합니다. 데이터 군집과 경계, 중첩 영역을 보며 결함 유형별 특징을 탐색합니다.', image: 'data-clusters.png', alt: '여러 색상으로 구분한 데이터 군집 분포', caption: '회사소개서의 차원축소 및 군집 시각화 예시', points: ['PCA · t-SNE · UMAP', '운전 조건별 데이터의 분포 확인', '중복·다중 결함 특성 분석'] },
  { title: 'AI 모델 학습', english: 'Model learning', text: '라벨링한 데이터를 바탕으로 AI 모델을 학습하고 분석합니다. 테스트베드 데이터와 필드 데이터를 함께 활용해 모델을 보완합니다.', image: 'model-network.png', alt: '입력층과 은닉층으로 구성된 신경망 예시', caption: '회사소개서의 DNN 구조 설명 이미지', points: ['RF · SVM · DNN 모델 활용', '테스트베드 데이터셋 구축', '현장 데이터 반영 및 재학습'] },
];

function ModelExplorer() {
  const [model, setModel] = useState(0);
  const models = [{ name: 'Random Forest', short: 'RF', text: '여러 의사결정나무의 예측을 종합하는 방식입니다. 센서 데이터에서 얻은 특징을 활용해 분류와 예측을 수행하는 모델로 검토합니다.', image: 'model-rf.png' }, { name: 'Support Vector Machine', short: 'SVM', text: '데이터를 구분하는 경계를 학습하는 지도학습 모델입니다. 추출한 특징을 바탕으로 서로 다른 상태나 범주를 구분하는 데 활용합니다.', image: 'model-svm.png' }, { name: 'Deep Neural Network', short: 'DNN', text: '여러 신경망 층을 통해 데이터의 패턴을 학습합니다. 입력 데이터와 진단 목적에 맞춰 신경망 구조와 학습 방법을 검토합니다.', image: 'model-network.png' }];
  return <div className="model-explorer"><div className="model-selector">{models.map((item,i) => <button key={item.short} onClick={() => setModel(i)} aria-pressed={model===i} className={model===i ? 'active' : ''}><strong>{item.short}</strong><span>{item.name}</span><ArrowRight size={20} /></button>)}</div><div className="model-detail" aria-live="polite"><img src={asset(models[model].image)} alt={`${models[model].name} 개념도`} loading="lazy" /><div><p className="eyebrow">{models[model].short}</p><h3>{models[model].name}</h3><p>{models[model].text}</p></div></div></div>;
}

function Technology({ onContact, embedded = false }: Props) {
  const [topic, setTopic] = useState(0);
  return <>{!embedded && <Intro category="Technology" title={<>데이터가 진단이 되는 과정,<br /><em>그 안의 기술을 만나보세요.</em></>} description="특징 분석, 신호 처리, 차원축소와 AI 모델. 데이터레이크는 여러 기술을 연결해 산업 설비의 상태를 이해합니다." anchors={[{ id: 'explorer', label: '기술 탐색' }, { id: 'models', label: 'AI 알고리즘' }, { id: 'research', label: '연구개발 과정' }]} />}
    <section id="explorer" className="section-pad"><div className="container"><Heading eyebrow="EXPLORE THE TECHNOLOGY" title={embedded ? "전류 데이터가 진단이 되는 과정." : "분석의 각 단계를 직접 살펴보세요."} /><div className="technology-explorer"><div className="tech-topic-list">{techTopics.map((item,i) => <button key={item.title} onClick={() => setTopic(i)} aria-pressed={topic===i} className={topic===i ? 'active' : ''}><span>0{i+1}</span><div>{item.title}<small>{item.english}</small></div><ArrowUpRight size={20} /></button>)}</div><div className="tech-topic-content" aria-live="polite"><figure>{techTopics[topic].image === "current-signal" ? <CurrentSignalFigure /> : <img src={asset(techTopics[topic].image)} alt={techTopics[topic].alt} />}<figcaption>{techTopics[topic].caption}</figcaption></figure><h3>{techTopics[topic].title}</h3><p>{techTopics[topic].text}</p><div className="keyword-row">{techTopics[topic].points.map(p => <span key={p}>{p}</span>)}</div></div></div></div></section>
    {!embedded && <section id="models" className="section-pad pale-section"><div className="container"><Heading eyebrow="AI ALGORITHMS" title="진단 목적에 맞는 모델을 검토합니다." description="모델별 특성과 데이터의 상태를 함께 고려합니다. 아래 내용은 회사소개서에 제시된 알고리즘의 기본 개념입니다." /><TechnicalFigure image="ai-algorithms-original.png" title="산업 설비 결함 분석 AI 알고리즘" caption="회사소개서 원본 · 확대해서 알고리즘별 설명을 확인할 수 있습니다." /><ModelExplorer /></div></section>}
    <section id="research" className="section-pad"><div className="container detail-split"><Heading eyebrow="RESEARCH & DEVELOPMENT" title={<>현장에서 검토하고,<br />데이터로 보완합니다.</>} description="데이터레이크는 테스트베드의 데이터와 실제 현장 데이터를 결합하는 피드백 과정을 지향합니다." /><div className="research-steps">{[['테스트베드 데이터 취득', '전류를 수집하고 이상 여부를 라벨링합니다.'],['현장 데이터셋 보완', '필드 데이터를 추가해 운전 환경의 차이를 반영합니다.'],['재학습 및 분석 검토', '모델을 보완하며 결함 분류와 군집 특성을 살펴봅니다.']].map(([title,text],i) => <article key={title}><span>0{i+1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>{!embedded && <><Related /><NextStep onContact={onContact} text="기술적인 질문도 편하게 나눠주세요." /></>}</>;
}

function Applications({ onContact }: Props) {
  const industries = [
    { id: 'pumps', n:'01', en:'PUMP SYSTEMS', title:'펌프 설비', image:'pump-cutaway.png', alt:'원심펌프의 전동기·커플링·임펠러 구조', intro:'유체와 맞닿은 설비의 변화를 살핍니다.', text:'펌프는 가동 중 다양한 부하와 열응력에 노출됩니다. 전동기와 펌프계통에서 수집한 신호로 주요 부품의 결함 특성을 분석합니다.', concerns:['베어링 마모','축 정렬 불량','임펠러 손상'], focus:'전류의 특성, 설비의 운전 조건과 점검 이력', caption:'회사소개서의 원심펌프 구동 원리 설명 이미지' },
    { id:'motors', n:'02', en:'MOTORS & ROTATING EQUIPMENT', title:'전동기·회전기기', image:'rotating-components.png', alt:'회전자, 임펠러, 베어링, 기어 등 회전기기 주요 부품', intro:'여러 신호를 모아, 복합적인 결함을 이해합니다.', text:'전류 데이터를 활용해 전동기의 상태를 분석합니다. 두 가지 이상의 결함이 겹치는 경우도 살펴볼 수 있도록 데이터 분포와 군집을 탐색합니다.', concerns:['회전자 결함','베어링 상태','중복·다중 결함'], focus:'전류 데이터의 특징 분석, 데이터 군집 경계와 중첩 영역', caption:'회사소개서의 주요 회전기기 부품 이미지' },
    { id:'plants', n:'03', en:'POWER & INDUSTRIAL PLANTS', title:'발전·산업 플랜트', image:'power-plant.png', alt:'발전소와 산업 설비의 전경', intro:'연속 운전 설비의 상태를 더 세밀하게 파악합니다.', text:'주요 회전기기와 펌프계통의 안정적인 운영을 위한 계측과 진단을 검토합니다. 발전소 회전기기 진단 장비 개발용역 경험을 바탕으로 현장의 요구를 구체화합니다.', concerns:['주요 회전기기','펌프계통','정밀 계측'], focus:'설비 구성, 진단 대상 부품, 데이터 수집·전달 환경', caption:'발전·산업 플랜트 분야 설명용 이미지' },
  ];
  return <><Intro category="Applications" title={<>현장은 다르지만,<br /><em>더 나은 판단은 필요합니다.</em></>} description="펌프, 전동기, 발전·산업 플랜트. 대상 설비의 특성과 현장의 운영 조건에서부터 적용 가능성을 검토합니다." anchors={industries.map(item => ({id:item.id,label:item.title}))} />
    <div className="container">{industries.map(item => <section id={item.id} key={item.id} className="industry-detail section-pad"><div className="industry-detail-head"><span>{item.n}</span><div><p className="eyebrow">{item.en}</p><h2>{item.title}</h2></div></div><div className="detail-split"><figure className={`industry-figure ${item.id}`}><img src={asset(item.image)} alt={item.alt} loading="lazy" /><figcaption>{item.caption}</figcaption></figure><div className="industry-copy"><h3>{item.intro}</h3><p>{item.text}</p><h4>주요 검토 대상</h4><div className="keyword-row">{item.concerns.map(c => <span key={c}>{c}</span>)}</div><h4>함께 살펴볼 정보</h4><p>{item.focus}</p><button className="text-link" onClick={onContact}>적용 가능성 문의하기 <ArrowUpRight size={17} /></button></div></div></section>)}</div><section className="section-pad pale-section"><div className="container"><Heading eyebrow="START WITH YOUR EQUIPMENT" title="도입 검토는 현장의 이야기에서 시작됩니다." /><Process /></div></section><NextStep onContact={onContact} /></>;
}

function Company({ onContact }: Props) {
  return <><Intro category="Company" title={<>작은 신호가 모여,<br /><em>큰 가능성이 되는 곳.</em></>} description="주식회사 데이터레이크는 2024년 설립된 IoT 기반 설비 예지보전 솔루션 기업입니다. 하드웨어와 AI 분석 기술을 바탕으로 산업 설비의 스마트화를 연구합니다." visual={<div className="company-logo-art"><img src={asset('datalake-logo.png')} alt="데이터와 물결을 표현한 데이터레이크 로고" /><span>DATALAKE</span></div>} anchors={[{id:'vision',label:'기업 소개'},{id:'expertise',label:'기술 역량'},{id:'history',label:'주요 연혁'},{id:'project',label:'연구개발 활동'}]} />
    <section id="vision" className="section-pad"><div className="container detail-split"><Heading eyebrow="OUR VISION" title={<>산업 설비의 미래를<br />예측합니다.</>} description="설비가 보내는 데이터를 이해하고, 현장에서 활용할 수 있는 진단 정보로 연결합니다. 자체 IoT 하드웨어와 AI 분석 기술을 기반으로 노후 설비의 스마트화를 실현하고자 합니다." /><dl className="spec-list company-facts"><div><dt>회사명</dt><dd>주식회사 데이터레이크</dd></div><div><dt>설립</dt><dd>2024년 7월</dd></div><div><dt>대표자</dt><dd>박진아</dd></div><div><dt>주요 사업</dt><dd>산업 설비 고장예지 · AI 솔루션 개발 · IoT 디바이스 개발</dd></div><div><dt>소재지</dt><dd>강원특별자치도 원주시 입춘로 45, 씨동 1213호</dd></div></dl></div></section>
    <section id="expertise" className="section-pad pale-section"><div className="container"><Heading eyebrow="OUR EXPERTISE" title="서로 다른 전문성이, 하나의 현장으로 향합니다." /><div className="expertise-grid">{[{icon:CircuitBoard,title:'전기전자 · 계측',text:'회로와 수집 모듈, 계측 시스템을 설계하고 IoT 하드웨어를 개발합니다.'},{icon:Cpu,title:'데이터 · AI',text:'시계열 데이터의 전처리와 분석, 데이터셋 구축 및 AI 모델 개발을 수행합니다.'},{icon:Layers3,title:'소프트웨어 · 자동화',text:'스마트팩토리, 설비 모니터링과 MES·ERP·PLC 관련 시스템 구축 경험을 연결합니다.'},{icon:Network,title:'사업 · 사용자 경험',text:'현장의 요구와 사용자의 관점을 반영해 사업 기획, UI/UX와 협업을 지원합니다.'}].map(item => <article key={item.title}><item.icon size={28} strokeWidth={1.3} /><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></div></section>
    <section id="history" className="section-pad"><div className="container history-layout"><Heading eyebrow="OUR JOURNEY" title={<>시작의 기록,<br />기술의 발걸음.</>} /><div className="full-timeline"><article><span>2025</span><div><h3>연구개발과 협력의 확장</h3><p><b>02</b> 기업부설연구소 설립 · 성과공유기업 확인</p><p><b>02–04</b> 고려대학교 산학협력단 발전소 회전기기 진단 장비 개발용역 수행</p><p><b>05</b> 강원대학교 창업중심대학 지원사업 참여</p><p><b>기술이전</b> SK 기술나눔기업 선정 및 등록특허 제10-1855317호 기술이전</p></div></article><article><span>2024</span><div><h3>데이터레이크의 시작</h3><p><b>03</b> 성균관대학교 창업중심대학 지원사업 선정</p><p><b>07</b> 주식회사 데이터레이크 법인 설립</p><p><b>08</b> 제11회 ICT 스마트 디바이스 전국 공모전 최우수상</p><p><b>09</b> 서울여성 창업아이디어 공모전 창의상</p></div></article></div></div></section>
    <section id="project" className="section-pad project-feature"><div className="container detail-split"><div><p className="eyebrow">R&D PROJECT / 2025</p><h2>발전소 회전기기<br />진단 장비 개발.</h2><p>고려대학교 산학협력단과 발전소 회전기기 진단 정밀장비 시제품 개발용역을 수행했습니다. 한국전력공사 공동개발과제와 관련한 계측·진단 장비 개발 경험입니다.</p><a className="text-link" href={routeHref('/technology/')}>관련 기술 살펴보기 <ArrowUpRight size={18} /></a></div><div className="project-facts"><span>PROJECT FOCUS</span><h3>정밀 계측과<br />설비 진단의 연결</h3><dl><div><dt>수행 분야</dt><dd>발전소 회전기기 진단 정밀장비 시제품</dd></div><div><dt>계약 상대</dt><dd>고려대학교 산학협력단</dd></div><div><dt>수행 연도</dt><dd>2025년</dd></div></dl></div></div></section><NextStep onContact={onContact} text="함께 풀어갈 산업의 문제를 기다립니다." /></>;
}

function Contact({ onContact }: Props) {
  return <><Intro category="Contact" title={<>당신의 현장에는<br /><em>어떤 가능성이 있나요?</em></>} description="설비 고장 진단부터 IoT 디바이스, 연구개발 협력까지. 현재의 고민과 필요하신 내용을 들려주세요." />
    <section className="section-pad"><div className="container contact-page-layout"><div><p className="eyebrow">START A CONVERSATION</p><a href="mailto:japark.work@gmail.com" className="contact-large-email">japark.work@gmail.com<ArrowUpRight size={28} /></a><p className="contact-page-note">간단한 문의는 이메일로 바로 보내실 수 있습니다.<br />아래 버튼을 누르면 문의 내용을 정리해 메일 앱으로 연결합니다.</p><button className="button button-dark" onClick={onContact}>프로젝트 문의하기 <ArrowUpRight size={19} /></button><div className="inquiry-topics"><span>설비 진단</span><span>IoT · 계측</span><span>AI 분석</span><span>기술 협력</span></div></div><aside className="contact-checklist"><Mail size={26} strokeWidth={1.3} /><h2>이런 내용을 알려주시면 좋아요.</h2><ul><li><Check size={15} />회사·기관명과 담당자 연락 이메일</li><li><Check size={15} />설비 종류, 대수와 주요 운전 조건</li><li><Check size={15} />현재 겪고 있는 문제 또는 개발 목표</li><li><Check size={15} />고장·점검 이력과 수집 중인 데이터</li></ul><p>모든 자료를 갖추지 않아도 괜찮습니다.<br />현재 알고 계신 내용부터 함께 살펴보겠습니다.</p></aside></div></section>
    <section className="section-pad pale-section"><div className="container office-panel"><div><p className="eyebrow">OUR OFFICE</p><h2>데이터레이크</h2><p>강원특별자치도 원주시 입춘로 45<br />씨동 1213호 (반곡동, 엔터비즈타워)</p><a href="https://map.naver.com/p/search/%EC%9B%90%EC%A3%BC%20%EC%9E%85%EC%B6%98%EB%A1%9C%2045" target="_blank" rel="noopener noreferrer" className="text-link">네이버 지도에서 보기 <ArrowUpRight size={17} /></a></div><div className="office-location-art" aria-hidden="true"><MapPin size={42} strokeWidth={1} /><span>WONJU, KOREA</span><strong>DATALAKE</strong></div></div></section><section className="section-pad"><div className="container faq-layout"><Heading eyebrow="FAQ" title="문의 전 참고해 주세요." /><FAQ /></div></section></>;
}


export function InlineSolutionDetails(props: Props) {
  return <div className="inline-solutions">
    <details id="system" className="inline-detail">
      <summary><span className="summary-thumbnail thumbnail-plant"><img src={asset('power-plant.png')} alt="" loading="lazy" width="196" height="118" /></span><span className="summary-copy"><small>PREDICTIVE MAINTENANCE</small><strong>산업 설비 고장예지 구성</strong><em>전체 구성도와 도입 과정을 살펴보세요.</em></span><Plus size={23} /></summary>
      <div className="inline-solution-content">
        <section className="section-pad"><div className="container"><Heading eyebrow="FROM CURRENT TO INSIGHT" title="수집부터 분석, 판단까지." description="전류 데이터 수집과 신호 처리, AI 분석을 연결합니다. 회사소개서의 구성도에서 고장예지의 전체 흐름을 살펴보세요." /><TechnicalFigure image="predictive-system-original.png" title="산업 설비 고장 예지 솔루션 구성도" caption="회사소개서 원본 구성도 · 전체 설계 개요이며, 데이터레이크의 핵심 센싱은 전류 기반입니다." /></div></section>
        <section id="approach" className="section-pad pale-section"><div className="container"><Heading eyebrow="OUR APPROACH" title="설비의 조건부터 함께 살펴봅니다." /><Process /></div></section>
        <section id="faq" className="section-pad"><div className="container"><Heading eyebrow="FAQ" title="시작하기 전에 궁금한 점." /><FAQ /></div></section>
      </div>
    </details>
    <details id="analysis" className="inline-detail">
      <summary><span className="summary-thumbnail thumbnail-ai"><img src={asset('ai-algorithms-original.png')} alt="" loading="lazy" width="196" height="118" /></span><span className="summary-copy"><small>01 / AI SOLUTION DEVELOPMENT</small><strong>AI 솔루션 개발</strong><em>전류 분석 과정부터 AI 알고리즘까지.</em></span><Plus size={23} /></summary>
      <div className="inline-solution-content"><Diagnostics {...props} path="/solutions/diagnostics/" embedded /></div>
    </details>
    <details id="sensing" className="inline-detail">
      <summary><span className="summary-thumbnail thumbnail-iot"><img src={asset('iot-board-side-clean.png')} alt="" loading="lazy" width="196" height="118" /></span><span className="summary-copy"><small>02 / IoT DEVICE DEVELOPMENT</small><strong>IoT 디바이스 개발</strong><em>수집 모듈과 코어보드, 현장 검토 사항까지.</em></span><Plus size={23} /></summary>
      <div className="inline-solution-content"><Sensing {...props} path="/solutions/sensing/" embedded /></div>
    </details>
  </div>;
}

export function HomeTechnology(props: Props) {
  return <section id="technology" aria-label="핵심 기술"><Technology {...props} embedded /></section>;
}

export default function DetailPage(props: Props) {
  const pages: Record<string, (props: Props) => ReactNode> = { '/solutions/': SolutionOverview, '/solutions/sensing/': Sensing, '/solutions/diagnostics/': Diagnostics, '/solutions/monitoring/': Monitoring, '/technology/': Technology, '/applications/': Applications, '/company/': Company, '/contact/': Contact };
  const Page = pages[props.path];
  if (!Page || !pageMetadata[props.path]) return <section className="section-pad container not-found"><p className="eyebrow">404 / PAGE NOT FOUND</p><h1>페이지를 찾을 수 없습니다.</h1><p>주소를 확인하거나 홈페이지에서 다시 둘러보세요.</p><a href={routeHref()} className="button button-dark">홈으로 돌아가기 <ArrowUpRight size={18} /></a></section>;
  return <Page {...props} />;
}
