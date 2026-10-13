export const routeHref = (path = '') => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
export const pageMetadata: Record<string, { title: string; description: string }> = {
  '/': { title: '데이터레이크 | 전류 기반 산업 설비 고장예지', description: '설비의 신호를 읽고, 산업의 내일을 예측합니다. 자체 IoT 디바이스와 AI 분석으로 펌프·전동기의 상태 모니터링과 고장 진단을 지원합니다.' },
  '/solutions/': { title: '산업 설비 고장예지 | AI 솔루션·IoT 디바이스 개발 | 데이터레이크', description: '데이터 수집, AI 솔루션 개발, 설비 모니터링을 연결하는 데이터레이크의 산업 설비 예지보전 솔루션과 도입 검토 과정을 살펴보세요.' },
  '/solutions/sensing/': { title: 'IoT 디바이스 개발 | 데이터레이크', description: '전류 센싱, 멀티 채널 수집 모듈, 코어보드, 이더넷과 데이터 로깅으로 구성되는 데이터레이크 IoT 하드웨어를 소개합니다.' },
  '/solutions/diagnostics/': { title: 'AI 솔루션 개발 | 데이터레이크', description: '전류 특징 분석, FFT·STFT 신호 처리, 데이터 군집 분석과 AI 모델을 활용한 산업 설비 결함 분석을 알아보세요.' },
  '/solutions/monitoring/': { title: '설비 상태 모니터링 | 데이터레이크', description: 'IoT 디바이스에서 수집한 데이터와 진단 결과를 관리자 서버·모바일로 연결하는 데이터레이크의 모니터링 구성을 소개합니다.' },
  '/technology/': { title: '핵심 기술 | 특징 분석·신호 처리·AI 분석 | 데이터레이크', description: '시계열 데이터, 주파수 분석, 차원축소와 군집화, AI 모델 학습으로 이어지는 데이터레이크의 설비 진단 기술을 살펴보세요.' },
  '/applications/': { title: '적용 분야 | 펌프·전동기·발전 설비 | 데이터레이크', description: '펌프, 전동기와 회전기기, 발전·산업 플랜트의 주요 진단 과제와 예지보전 적용 시 고려할 내용을 알아보세요.' },
  '/company/': { title: '회사 소개 | 데이터레이크', description: '2024년 설립된 산업 설비 예지보전 기술 기업 데이터레이크의 비전, 기술 역량, 주요 연혁과 연구개발 활동을 소개합니다.' },
  '/contact/': { title: 'Contact | 데이터레이크', description: '산업 설비 진단, IoT 디바이스와 기술 협력에 관해 데이터레이크에 문의하세요. japark.work@gmail.com' },
};

export const solutionLinks = [
  { path: '/solutions/diagnostics/', eyebrow: '01 / AI SOLUTION DEVELOPMENT', title: 'AI 솔루션 개발', description: '전류 데이터의 변화에서 고장의 징후를 찾고, 현장에 필요한 진단 솔루션을 개발합니다.', image: 'ai-algorithms-original.png', type: 'analysis' },
  { path: '/solutions/sensing/', eyebrow: '02 / IoT DEVICE DEVELOPMENT', title: 'IoT 디바이스 개발', description: '전류 신호의 수집부터 저장·전송까지, 진단을 위한 IoT 하드웨어를 설계합니다.', image: 'iot-module-refined.png', type: 'hardware' },
];

export const faqs = [
  { question: '어떤 설비부터 검토하면 좋을까요?', answer: '펌프와 전동기 등 회전기기를 중심으로 검토할 수 있습니다. 고장 이력이 있거나 운영 중단의 영향이 큰 설비를 정리해 주시면, 수집할 신호와 진단 목표를 함께 살펴볼 수 있습니다.' },
  { question: '기존 설비에도 적용할 수 있나요?', answer: '기존 설비에 센서를 부착해 전류를 수집하는 방식으로 접근합니다. 실제 적용 가능 여부는 센서 설치 위치, 전원과 통신 환경, 운전 조건을 확인한 뒤 검토합니다.' },
  { question: '상담 전에 어떤 정보를 준비해야 하나요?', answer: '설비 종류와 대수, 주요 고장·점검 이력, 현재 수집 중인 데이터가 있으면 도움이 됩니다. 자료가 충분하지 않더라도 현재 겪고 있는 문제부터 설명해 주시면 됩니다.' },
  { question: '구축 기간과 비용은 어떻게 정해지나요?', answer: '대상 설비 수, 센싱 구성, 수집·분석 범위와 모니터링 요구에 따라 달라집니다. 공개된 정액 요금이나 공통 구축 기간은 없으며, 문의 내용을 바탕으로 검토 범위를 구체화합니다.' },
  { question: '하드웨어 개발이나 연구 협력도 문의할 수 있나요?', answer: 'IoT 디바이스, 계측 시스템, 진단용 데이터 분석과 관련된 기술 협력을 문의하실 수 있습니다. 개발 목적과 요구 사양, 진행 중인 과제의 범위를 함께 알려주세요.' },
];
