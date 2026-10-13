# 이미지 출처와 생성 기록

## 추가 이미지 정리

- 사용자 후속 요청에 따라 iot-board-top.png는 화면에서 제외.
- 최종 파일: public/assets/iot-board-side-clean.png. 원본 iot-board-side.png를 보존하고 내장 image_gen 편집으로 오른쪽 아래 별 마크만 제거하도록 요청.
- 메인 펼쳐 보기와 IoT 상세 페이지에 같은 보정본 적용.

최종 프롬프트:

Use case: precise-object-edit. Edit target: the supplied wide side-view photograph/illustration of a green electronic circuit board assembly on a black base, on a gray studio background. Make exactly one local change: remove the small white four-point sparkle/Gemini mark in the extreme bottom-right corner, fill only that tiny mark region with the matching existing gray background. Preserve EVERYTHING else as faithfully as possible: every board component, port, terminal block, screw, support post, circuit trace, focus, blur, original lighting and framing. Do not sharpen or redesign, do not crop, no additional content, no text. The electronics must remain unchanged. Keep the wide aspect ratio.


## 원본 자료

- public/assets/datalake-logo.png: 사용자가 제공한 회사 로고, 원본 유지.
- public/assets/ai-algorithms-original.png: 사용자 첨부 codex-clipboard-85f75830-98f9-4945-ada1-8e918ffc8492.png 그대로 복사. SHA-256 C7BC9549C9C87C9EC3C02FC3D87FAB7DC2B094F79E3EAD8BD2C16AB55FF570BF.
- public/assets/predictive-system-original.png: 사용자 첨부 codex-clipboard-75b4d3d8-531f-4699-aac1-6354abe7b3d7.png 그대로 복사. SHA-256 B276636556BEFDBC21E8D138D62C7D7407659B4AAD5F52A5D3A9215ABFB2D1F9.
- 나머지 보드·펌프·모델·군집 이미지는 제공 회사소개서의 매체 자산. 계약서·견적서·보험증권·개인 경력 증빙은 공개하지 않음.

## 하드웨어 보정

- 최종 파일: public/assets/iot-module-refined.png
- 입력: public/assets/iot-module.png (회사소개서 image16.png).
- 내장 image_gen 편집 사용. 원본 보존, 세 보드 구성을 유지하며 선명도 개선 및 하단 문구/별 장식 제거. 페이지에서도 색상 혼합 효과 제거.
- 기술 사양을 입증하는 실물 촬영본으로 취급하지 않으며 회사소개서 이미지 보정본으로 표기.

최종 프롬프트:

Use case: precise-object-edit. Asset type: industrial company website hardware image. Edit target: attached image of three green electronic circuit boards on black baseplates. Preserve all three boards, exact arrangement, PCB shapes, component placement, ports, heat sinks, perspective and gray studio setting. Improve apparent clarity and clean contrast, natural sharp detail, neutral lighting, with no tinted overlay or soft haze. Remove only the bottom white text 'Innovation in Power Electronics' and bottom right white four-point sparkle, replacing that empty area with matching plain gray background. Do not invent connectors or circuit details, do not add any text or logo. Retain the wide composition and all board edges. This is a clarity edit of the supplied company illustration, not a redesign.

## 발전소 분야 이미지

- 최종 파일: public/assets/power-plant.png
- 내장 image_gen 신규 생성 사용. 특정 고객사·자사 구축 현장 사진이 아닌 발전소 분야 설명용 이미지.

최종 프롬프트:

Use case: photorealistic-natural. Asset type: wide industrial company website hero, 16:9 landscape. Create a crisp high-resolution editorial architectural image of a modern electricity generation plant seen from an elevated diagonal viewpoint. Turbine halls, carefully organized steel pipework, metal service structures and tall slim exhaust stacks, blue-gray roofs, realistic industrial engineering scale. Clear daylight, subtle cool teal and navy palette, restrained professional Korean industrial technology brand feeling, natural photographic detail, distant wooded hills, clean sky. No people, no company logos, no text or annotations, no dramatic smoke, no fantasy equipment. This is a generic illustrative industrial site, not an identified customer facility.

