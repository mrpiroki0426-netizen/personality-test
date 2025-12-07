// js/index.js

// 質問コンテナ
const questionsContainer = document.getElementById("questions");

// 5段階の共通選択肢（左：当てはまらない〜右：とても当てはまる）
const likertOptions = [
  { value: 1, label: "" },
  { value: 2, label: "" },
  { value: 3, label: "" },
  { value: 4, label: "" },
  { value: 5, label: "" }
];

// 質問を丸●UIで表示する
function renderQuestions() {
  questionsContainer.innerHTML = "";

  questions.forEach((q, index) => {
    const qDiv = document.createElement("div");
    qDiv.className = "question";

    const title = document.createElement("div");
    title.className = "question-title";
    title.textContent = `Q${index + 1}. ${q.text}`;

    // 外枠（左右ラベル＋中央ドット）
    const wrapper = document.createElement("div");
    wrapper.className = "likert-row";

    // 左側ラベル（当てはまらない）
    const leftLabel = document.createElement("div");
    leftLabel.className = "likert-side-label";
    leftLabel.textContent = "当てはまらない";

    // 5つの丸ボタン
    const options = document.createElement("div");
    options.className = "likert-dots";

    likertOptions.forEach((opt) => {
      const name = `q${q.id}`;
      const id = `${name}_${opt.value}`;

      const label = document.createElement("label");
      label.className = "likert-dot";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = name;
      input.value = String(opt.value);
      input.id = id;

      const circle = document.createElement("span");
      circle.className = "dot-circle";

      label.appendChild(input);
      label.appendChild(circle);
      options.appendChild(label);
    });

    // 右側ラベル（とても当てはまる）
    const rightLabel = document.createElement("div");
    rightLabel.className = "likert-side-label";
    rightLabel.textContent = "とても当てはまる";

    wrapper.appendChild(leftLabel);
    wrapper.appendChild(options);
    wrapper.appendChild(rightLabel);

    qDiv.appendChild(title);
    qDiv.appendChild(wrapper);
    questionsContainer.appendChild(qDiv);
  });
}

// ページ読み込み時に質問を描画
renderQuestions();

// ====== 診断ロジック ======
const submitBtn = document.getElementById("submitBtn");
const messageEl = document.getElementById("message");

// Likert(1〜5) → -1〜+1 のスコアに変換
function likertToScore(num) {
  const v = Number(num);
  switch (v) {
    case 1:
      return -1;
    case 2:
      return -0.5;
    case 3:
      return 0;
    case 4:
      return 0.5;
    case 5:
      return 1;
    default:
      return 0;
  }
}

function diagnose() {
  messageEl.textContent = "";

  // 各軸のスコア
  let scoreE = 0,
    scoreI = 0;
  let scoreS = 0,
    scoreL = 0;
  let scoreA = 0,
    scoreC = 0;
  let scoreH = 0,
    scoreP = 0;

  // 全質問をチェック
  for (const q of questions) {
    const selected = document.querySelector(`input[name="q${q.id}"]:checked`);
    if (!selected) {
      messageEl.textContent =
        "未回答の質問があります。すべて回答してください。";
      return;
    }

    const rawValue = Number(selected.value); // 1〜5
    const score = likertToScore(rawValue); // -1〜+1 に変換

    // 軸とpositive（E/I/S/L/A/C/H/P）に応じてスコアを加算
    if (q.axis === "EI") {
      if (q.positive === "E") scoreE += score;
      else scoreI += score;
    } else if (q.axis === "SL") {
      if (q.positive === "S") scoreS += score;
      else scoreL += score;
    } else if (q.axis === "AC") {
      if (q.positive === "A") scoreA += score;
      else scoreC += score;
    } else if (q.axis === "HP") {
      if (q.positive === "H") scoreH += score;
      else scoreP += score;
    }
  }

  // 各軸でどちら側か判定
  const resultEI = scoreE >= scoreI ? "E" : "I";
  const resultSL = scoreS >= scoreL ? "S" : "L";
  const resultAC = scoreA >= scoreC ? "A" : "C";
  const resultHP = scoreH >= scoreP ? "H" : "P";

  const finalType = resultEI + resultSL + resultAC + resultHP;
  console.log("診断結果タイプ:", finalType);

  // 結果ページに遷移（例: ESAH など4文字）
  const url = `result.html?type=${encodeURIComponent(finalType)}`;
  window.location.href = url;
}

submitBtn.addEventListener("click", diagnose);
