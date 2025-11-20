export type SubwayLine =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '경의'
  | '수인'
  | '공항'
  | '인천1';

export interface Studio {
  id: string;
  name: string; // 매물 이름 (예: "야마하 스튜디오")
  imageUrl: string; // 대표 사진
  address: string; // [!] 추가된 주소값
  priceMin: number; // 매물의 최저 가격 (예: 19)
  priceMax: number; // 매물의 최대 가격 (예: 32)
  nearestStation: string; // 가장 가까운 역 (예: "한양대역")
  lineInfo: SubwayLine[] | null; // 지하철 호선 정보 (없는 경우 null)
  walkingTime: number; // 도보 시간 (분) (예: 5)
  rating: number; // 별점 (예: 4.2)
  reviewCount: number; // 리뷰 수 (예: 32)
  isAd: boolean; // 광고 여부
  isNew: boolean; // 신규 여부
  isWished: boolean; // 찜 여부
  vacancy: number; // 공실 수
  // 지도 좌표
  lat: number;
  lng: number;
}

export const DUMMY_STUDIO: Studio[] = [
  {
    id: 'S1',
    name: '그루브 멘탈리티 스튜디오 (Groove Mentality)',
    imageUrl: 'https://placehold.co/144x144/333/fff?text=Groove',
    address: '마포구 연남동',
    priceMin: 19,
    priceMax: 32,
    nearestStation: '홍대입구역',
    lineInfo: ['2', '경의', '공항'],
    walkingTime: 5,
    rating: 4.2,
    reviewCount: 32,
    isAd: true,
    isNew: true,
    isWished: true,
    vacancy: 5,
    lat: 37.557192,
    lng: 126.925381,
  },
  {
    id: 'S2',
    name: '네온 시티 레코즈 (Neon City Records)',
    imageUrl: 'https://placehold.co/144x144/555/fff?text=Neon',
    address: '마포구 연남동',
    priceMin: 15,
    priceMax: 40,
    nearestStation: '홍대입구역',
    lineInfo: ['2', '경의', '공항'],
    walkingTime: 8,
    rating: 4.8,
    reviewCount: 102,
    isAd: false,
    isNew: true,
    isWished: false,
    vacancy: 2,
    lat: 37.558107,
    lng: 126.925892,
  },
  {
    id: 'S3',
    name: '아날로그 베이스먼트 (Analog Basement)',
    imageUrl: 'https://placehold.co/144x144/777/fff?text=Analog',
    address: '마포구 연남동',
    priceMin: 25,
    priceMax: 25,
    nearestStation: '홍대입구역',
    lineInfo: ['2', '경의', '공항'],
    walkingTime: 3,
    rating: 4.5,
    reviewCount: 55,
    isAd: false,
    isNew: false,
    isWished: false,
    vacancy: 0,
    lat: 37.558384,
    lng: 126.926523,
  },
  {
    id: 'S4',
    name: '딥 포커스 오디오 (Deep Focus Audio)',
    imageUrl: 'https://placehold.co/144x144/999/fff?text=DeepFocus',
    address: '마포구 연남동',
    priceMin: 30,
    priceMax: 50,
    nearestStation: '홍대입구역',
    lineInfo: ['2', '경의', '공항'],
    walkingTime: 1,
    rating: 4.0,
    reviewCount: 12,
    isAd: true,
    isNew: false,
    isWished: true,
    vacancy: 0,
    lat: 37.557144,
    lng: 126.922804,
  },
  {
    id: 'S5',
    name: '리듬 하이브 랩 (Rhythm Hive Lab)',
    imageUrl: 'https://placehold.co/144x144/333/fff?text=Rhythm',
    address: '마포구 동교동',
    priceMin: 22,
    priceMax: 35,
    nearestStation: '홍대입구역',
    lineInfo: ['2', '경의', '공항'],
    walkingTime: 6,
    rating: 4.3,
    reviewCount: 28,
    isAd: false,
    isNew: true,
    isWished: true,
    vacancy: 3,
    lat: 37.556389,
    lng: 126.925143,
  },
  {
    id: 'S6',
    name: '사운드 스케이프 연남 (Sound Scape)',
    imageUrl: 'https://placehold.co/144x144/555/fff?text=Sound',
    address: '마포구 연남동',
    priceMin: 18,
    priceMax: 28,
    nearestStation: '홍대입구역',
    lineInfo: ['2', '경의', '공항'],
    walkingTime: 10,
    rating: 4.7,
    reviewCount: 45,
    isAd: false,
    isNew: false,
    isWished: false,
    vacancy: 1,
    lat: 37.560524,
    lng: 126.924681,
  },
  {
    id: 'S7',
    name: '버텍스 프로듀서 룸 (Vertex Room)',
    imageUrl: 'https://placehold.co/144x144/777/fff?text=Vertex',
    address: '마포구 서교동',
    priceMin: 28,
    priceMax: 45,
    nearestStation: '합정역',
    lineInfo: ['2', '6'],
    walkingTime: 4,
    rating: 4.6,
    reviewCount: 60,
    isAd: true,
    isNew: true,
    isWished: true,
    vacancy: 2,
    lat: 37.551464,
    lng: 126.925011,
  },
  {
    id: 'S8',
    name: '에코 챔버 서울 (Echo Chamber Seoul)',
    imageUrl: 'https://placehold.co/144x144/999/fff?text=Echo',
    address: '마포구 서교동',
    priceMin: 20,
    priceMax: 30,
    nearestStation: '합정역',
    lineInfo: ['2', '6'],
    walkingTime: 7,
    rating: 4.1,
    reviewCount: 15,
    isAd: false,
    isNew: false,
    isWished: false,
    vacancy: 4,
    lat: 37.553128,
    lng: 126.92301,
  },
  {
    id: 'S9',
    name: '미드나잇 웨이브 (Midnight Wave)',
    imageUrl: 'https://placehold.co/144x144/333/fff?text=Midnight',
    address: '마포구 합정동',
    priceMin: 35,
    priceMax: 55,
    nearestStation: '합정역',
    lineInfo: ['2', '6'],
    walkingTime: 2,
    rating: 4.9,
    reviewCount: 88,
    isAd: true,
    isNew: true,
    isWished: true,
    vacancy: 0,
    lat: 37.550953,
    lng: 126.922591,
  },
  {
    id: 'S10',
    name: '트랙 제로 로프트 (Track Zero Loft)',
    imageUrl: 'https://placehold.co/144x144/555/fff?text=TrackZero',
    address: '마포구 동교동',
    priceMin: 24,
    priceMax: 38,
    nearestStation: '홍대입구역',
    lineInfo: ['2', '경의', '공항'],
    walkingTime: 5,
    rating: 4.4,
    reviewCount: 37,
    isAd: false,
    isNew: false,
    isWished: true,
    vacancy: 1,
    lat: 37.555962,
    lng: 126.929073,
  },
];
