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
// 🌟 요청하신 더미 데이터 배열입니다.
// 🌟 요청하신 더미 데이터 배열입니다.
export const DUMMY_STUDIO: Studio[] = [
  {
    id: 'A1',
    name: '야마하 스튜디오',
    imageUrl: 'https://placehold.co/144x144/333/fff?text=Studio+A',
    address: '성동구 행당동 19-1 1층',
    priceMin: 19,
    priceMax: 32,
    nearestStation: '한양대역',
    lineInfo: ['6', '경의', '수인', '인천1', '공항'],
    walkingTime: 5,
    rating: 4.2,
    reviewCount: 32,
    isAd: true,
    isNew: true,
    isWished: true,
    vacancy: 5,
    lat: 37.5559,
    lng: 127.0451,
  },
  {
    id: 'B2',
    name: '클래식 연습실',
    imageUrl: 'https://placehold.co/144x144/555/fff?text=Studio+B',
    address: '성동구 도선동 40 지하 1층',
    priceMin: 15,
    priceMax: 40,
    nearestStation: '왕십리역',
    lineInfo: ['5'],
    walkingTime: 8,
    rating: 4.8,
    reviewCount: 102,
    isAd: false,
    isNew: true,
    isWished: false,
    vacancy: 2,
    lat: 37.5613,
    lng: 127.0381,
  },
  {
    id: 'C3',
    name: '사운드 팩토리',
    imageUrl: 'https://placehold.co/144x144/777/fff?text=Studio+C',
    address: '성동구 성수동2가 315-61 3층',
    priceMin: 25,
    priceMax: 25,
    nearestStation: '성수역',
    lineInfo: ['2'],
    walkingTime: 3,
    rating: 4.5,
    reviewCount: 55,
    isAd: false,
    isNew: false,
    isWished: false,
    vacancy: 0,
    lat: 37.5446,
    lng: 127.0563,
  },
  {
    id: 'D4',
    name: '방음부스 스튜디오',
    imageUrl: 'https://placehold.co/144x144/999/fff?text=Studio+D',
    address: '영등포구 당산동3가 558-1 2층',
    priceMin: 30,
    priceMax: 50,
    nearestStation: '영등포구청역',
    lineInfo: ['2'],
    walkingTime: 1,
    rating: 4.0,
    reviewCount: 12,
    isAd: true,
    isNew: false,
    isWished: true,
    vacancy: 0,
    lat: 37.525,
    lng: 126.8964,
  },
];
