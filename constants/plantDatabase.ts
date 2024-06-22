interface Plant {
  id: number;
  name: string;
  scientificName: string;
  fileName: string;
  family: string;
  genus: string;
  cutType: string;
  startDate: Date;
  notes: string;
  relatedId: number[];
  reading: string;
}

export const plants: Plant[] = [
  {
    id: 0,
    name: "",
    scientificName: "",
    fileName: "",
    family: "",
    genus: "",
    cutType: "",
    startDate: new Date(),
    notes: "",
    relatedId: [],
    reading: ""
  },
  {
    id: 1,
    name: "朧月",
    scientificName: "Graptopetalum paraguayense",
    fileName: "graptopetalum-paraguayense",
    family: "ベンケイソウ科",
    genus: "グラプトペタルム属",
    cutType: "",
    startDate: new Date(),
    notes: "",
    relatedId: [32, 33, 34],
    reading: "オボロヅキ"
  },
  {
    id: 2,
    name: "初恋",
    scientificName: "Douglas Huth",
    fileName: "douglas-huth",
    family: "ベンケイソウ科",
    genus: "グラプトベリア属",
    cutType: "",
    startDate: new Date(),
    notes: "",
    relatedId: [],
    reading: "ハツコイ"
  },
  {
    id: 3,
    name: "万象 白虎",
    scientificName: "Byakko",
    fileName: "byakko",
    family: "キジカクシ科ツルボラン亜科",
    genus: "ハオルチア属",
    cutType: "",
    startDate: new Date(),
    notes: "",
    relatedId: [],
    reading: "バンショウ ビャッコ"
  },
  {
    id: 4,
    name: "薄氷",
    scientificName: "Caerulescens",
    fileName: "caerulescens",
    family: "ベンケイソウ科",
    genus: "グラプトベリア属",
    cutType: "",
    startDate: new Date(),
    notes: "",
    relatedId: [],
    reading: "ウスゴオリ"
  },
  {
    id: 5,
    name: "斑入り丸葉万年草",
    scientificName: "Variegata",
    fileName: "variegata",
    family: "ベンケイソウ科",
    genus: "マンネングサ属",
    cutType: "",
    startDate: new Date(),
    notes: "",
    relatedId: [],
    reading: "フイリマルバマンネングサ"
  },
  {
    id: 6,
    name: "青リンゴ",
    scientificName: "Blue Apple",
    fileName: "blue-apple",
    family: "ベンケイソウ科",
    genus: "セデベリア属",
    cutType: "",
    startDate: new Date(),
    notes: "",
    relatedId: [7],
    reading: "アオリンゴ"
  },
  {
    id: 7,
    name: "ブルーエルフ",
    scientificName: "Blue Elf",
    fileName: "blue-elf",
    family: "ベンケイソウ科",
    genus: "セデベリア属",
    cutType: "",
    startDate: new Date(),
    notes: "",
    relatedId: [6],
    reading: "ブルーエルフ"
  },
  {
    id: 8,
    name: "火祭り",
    scientificName: "Camp Fire",
    fileName: "camp-fire",
    family: "ベンケイソウ科",
    genus: "クラッスラ属",
    cutType: "",
    startDate: new Date(),
    notes: "",
    relatedId: [],
    reading: "ヒマツリ"
  },
  {
    id: 9,
    name: "ブラウンローズ",
    scientificName: "Brown Rose",
    fileName: "brown-rose",
    family: "ベンケイソウ科",
    genus: "エケベリア属",
    cutType: "",
    startDate: new Date(),
    notes: "",
    relatedId: [],
    reading: "ブラウンローズ"
  },
  {
    id: 10,
    name: "ホワイトストーンクロプ",
    scientificName: "Whitestonecrop",
    fileName: "whitestonecrop",
    family: "ベンケイソウ科",
    genus: "セデベリア属",
    cutType: "",
    startDate: new Date(),
    notes: "",
    relatedId: [],
    reading: "ホワイトストーンクロプ"
  },
  {
    id: 11,
    name: "ビクターケーン",
    scientificName: "Victor Kane",
    fileName: "victor-kane",
    family: "ベンケイソウ科",
    genus: "グラプトペタルム属",
    cutType: "",
    startDate: new Date(),
    notes: "",
    relatedId: [],
    reading: "ビクターケーン"
  },
  {
    id: 12,
    name: "ピンクルルビー",
    scientificName: "Pinkle Ruby",
    fileName: "pinkle-ruby",
    family: "ベンケイソウ科",
    genus: "グラプトベリア属",
    cutType: "",
    startDate: new Date(),
    notes: "",
    relatedId: [13],
    reading: "ピンクルルビー"
  },
  {
    id: 13,
    name: "ピンクルビー",
    scientificName: "Pinkle Ruby",
    fileName: "pinkle-ruby",
    family: "ベンケイソウ科",
    genus: "エケベリア属",
    cutType: "",
    startDate: new Date(),
    notes: "",
    relatedId: [12],
    reading: "ピンクルビー"
  },
  {
    id: 14,
    name: "フェイスライクジェイド",
    scientificName: "Face like jade",
    fileName: "face-like-jade",
    family: "",
    genus: "",
    cutType: "",
    startDate: new Date(),
    notes: "",
    relatedId: [],
    reading: "フェイスライクジェイド"
  },
  {
    id: 15,
    name: "ピンクベリー",
    scientificName: "Canny Hinny",
    fileName: "canny-hinny",
    family: "ベンケイソウ科",
    genus: "セダム属",
    cutType: "",
    startDate: new Date(),
    notes: "",
    relatedId: [16],
    reading: "ピンクベリー"
  },
  {
    id: 16,
    name: "ピンクベリー",
    scientificName: "Pink Berry",
    fileName: "pink-berry",
    family: "ベンケイソウ科",
    genus: "セダム属",
    cutType: "",
    startDate: new Date(),
    notes: "",
    relatedId: [15],
    reading: "ピンクベリー"
  },
  {
    id: 17,
    name: "姫秋麗",
    scientificName: "Graptopetalum mendozae",
    fileName: "graptopetalum-mendozae",
    family: "ベンケイソウ科",
    genus: "グラプトペタルム属",
    cutType: "",
    startDate: new Date(),
    notes: "",
    relatedId: [],
    reading: "ヒメシュウレイ"
  },
  {
    id: 18,
    name: "ピーチプリティ",
    scientificName: "Peach Pretty",
    fileName: "peach-pretty",
    family: "ベンケイソウ科",
    genus: "エケベリア属",
    cutType: "",
    startDate: new Date(),
    notes: "",
    relatedId: [],
    reading: "ピーチプリティ"
  },
  {
    id: 19,
    name: "パープルディライト",
    scientificName: "Purple Delight",
    fileName: "purple-delight",
    family: "ベンケイソウ科",
    genus: "グラプトペタルム属",
    cutType: "",
    startDate: new Date(),
    notes: "",
    relatedId: [],
    reading: "パープルディライト"
  },
  {
    id: 20,
    name: "ヘラクレス",
    scientificName: "Heracles",
    fileName: "heracles",
    family: "ベンケイソウ科",
    genus: "エケベリア属",
    cutType: "",
    startDate: new Date(),
    notes: "",
    relatedId: [],
    reading: "ヘラクレス"
  },
  {
    id: 21,
    name: "プロリフィカ",
    scientificName: "prolifica",
    fileName: "prolifica",
    family: "ベンケイソウ科",
    genus: "エケベリア属",
    cutType: "",
    startDate: new Date(),
    notes: "",
    relatedId: [],
    reading: "プロリフィカ"
  },
  {
    id: 22,
    name: "ブルーライト",
    scientificName: "Blue Light",
    fileName: "blue-light",
    family: "ベンケイソウ科",
    genus: "エケベリア属",
    cutType: "",
    startDate: new Date(),
    notes: "",
    relatedId: [],
    reading: "ブルーライト"
  },
  {
    id: 23,
    name: "ハウォルヤ",
    scientificName: "Hawolya",
    fileName: "hawolya",
    family: "ベンケイソウ科",
    genus: "エケベリア属",
    cutType: "",
    startDate: new Date(),
    notes: "",
    relatedId: [],
    reading: "ハウォルヤ"
  },
  {
    id: 24,
    name: "フロリディティ",
    scientificName: "Floridity",
    fileName: "floridity",
    family: "ベンケイソウ科",
    genus: "エケベリア属",
    cutType: "",
    startDate: new Date(),
    notes: "",
    relatedId: [],
    reading: "フロリディティ"
  },
  {
    id: 25,
    name: "ラウリンゼ",
    scientificName: "Laulindsa",
    fileName: "laulindsa",
    family: "ベンケイソウ科",
    genus: "エケベリア属",
    cutType: "",
    startDate: new Date(),
    notes: "",
    relatedId: [],
    reading: "ラウリンゼ"
  },
  {
    id: 26,
    name: "ムーンガドニス",
    scientificName: "Esther",
    fileName: "esther",
    family: "ベンケイソウ科",
    genus: "エケベリア属",
    cutType: "",
    startDate: new Date(),
    notes: "",
    relatedId: [],
    reading: "ムーンガドニス"
  },
  {
    id: 27,
    name: "花うらら",
    scientificName: "Pulidonis",
    fileName: "pulidonis",
    family: "ベンケイソウ科",
    genus: "エケベリア属",
    cutType: "",
    startDate: new Date(),
    notes: "",
    relatedId: [],
    reading: "ハナウララ"
  },
  {
    id: 28,
    name: "パープルヘイズ",
    scientificName: "Purple Haze",
    fileName: "purple-haze",
    family: "ベンケイソウ科",
    genus: "セダム属",
    cutType: "",
    startDate: new Date(),
    notes: "",
    relatedId: [],
    reading: "パープルヘイズ"
  },
  {
    id: 29,
    name: "ペンタンドルム",
    scientificName: "Pentandrum",
    fileName: "pentandrum",
    family: "ベンケイソウ科",
    genus: "グラプトペタルム属",
    cutType: "",
    startDate: new Date(),
    notes: "",
    relatedId: [],
    reading: "ペンタンドルム"
  },
  {
    id: 30,
    name: "紅司",
    scientificName: "Nodulosa",
    fileName: "nodulosa",
    family: "ベンケイソウ科",
    genus: "エケベリア属",
    cutType: "",
    startDate: new Date(),
    notes: "",
    relatedId: [],
    reading: "ベニツカサ"
  },
  {
    id: 31,
    name: "ハンベルティー",
    scientificName: "humbertii",
    fileName: "humbertii",
    family: "ベンケイソウ科",
    genus: "クラッスラ属",
    cutType: "",
    startDate: new Date(),
    notes: "",
    relatedId: [],
    reading: "ハンベルティー"
  },
  {
    id: 32,
    name: "おぼろ月",
    scientificName: "Graptopetalum paraguayense",
    fileName: "graptopetalum-paraguayense",
    family: "ベンケイソウ科",
    genus: "グラプトペタルム属",
    cutType: "",
    startDate: new Date(),
    notes: "",
    relatedId: [1, 33, 34],
    reading: "オボロヅキ"
  },
  {
    id: 33,
    name: "石蓮花",
    scientificName: "Graptopetalum paraguayense",
    fileName: "graptopetalum-paraguayense",
    family: "ベンケイソウ科",
    genus: "グラプトペタルム属",
    cutType: "",
    startDate: new Date(),
    notes: "",
    relatedId: [1, 32, 34],
    reading: "セキレンカ"
  },
  {
    id: 34,
    name: "パラグアイエンセ",
    scientificName: "Graptopetalum paraguayense",
    fileName: "graptopetalum-paraguayense",
    family: "ベンケイソウ科",
    genus: "グラプトペタルム属",
    cutType: "",
    startDate: new Date(),
    notes: "",
    relatedId: [1, 32, 33],
    reading: "パラグアイエンセ"
  }
];
