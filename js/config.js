// js/config.js

// タイプ定義
const personalityTypes = {
  A: {
    label: "Aタイプ：リーダーシップ型",
    description:
      "行動力があり、決断も早いタイプです。\n" +
      "周りを引っ張る役割になることが多く、\n" +
      "プロジェクトの推進役として力を発揮します。",
    image: "img/type_A.png"
  },
  B: {
    label: "Bタイプ：ムードメーカー型",
    description:
      "明るく社交的で、場の雰囲気を和ませるタイプです。\n" +
      "人との関わりからエネルギーをもらいやすく、\n" +
      "チームの潤滑油として活躍します。",
    image: "img/type_B.png"
  },
  C: {
    label: "Cタイプ：マイペース研究型",
    description:
      "一人でじっくり考えたり、深く掘り下げることが得意です。\n" +
      "感情に流されにくく、冷静な分析力を持っています。",
    image: "img/type_C.png"
  },
  D: {
    label: "Dタイプ：サポート・調整型",
    description:
      "相手の気持ちをよく考え、気配りができるタイプです。\n" +
      "チーム全体のバランスを見ながら、\n" +
      "細かいフォローができる貴重な存在です。",
    image: "img/type_D.png"
  }
};


// 各質問が “どのタイプの指標か” を targetType で指定
const questions = [
  {
    id: 1,
    text: "新しいことに挑戦するとき、ワクワク感の方が不安よりも強い。",
    targetType: "A"
  },
  {
    id: 2,
    text: "人と話していると、つい場を盛り上げようとしてしまう。",
    targetType: "B"
  },
  {
    id: 3,
    text: "一人で考え込んだり、情報を調べる時間がとても好きだ。",
    targetType: "C"
  },
  {
    id: 4,
    text: "チームの中で、誰かが困っていないかつい気になってしまう。",
    targetType: "D"
  },
  {
    id: 5,
    text: "多少リスクがあっても、チャンスだと思えば行動するほうだ。",
    targetType: "A"
  }
];
