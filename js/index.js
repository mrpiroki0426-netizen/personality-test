// js/index.js

// 質問コンテナ
const questionsContainer = document.getElementById("questions");

// 5段階の共通選択肢
const likertOptions = [
  { value: 5, label: "とてもあてはまる" },
  { value: 4, label: "まああてはまる" },
  { value: 3, label: "どちらともいえない" },
  { value: 2, label: "あまりあてはまらない" },
  { value: 1, label: "まったくあてはまらない" }
];

function renderQuestions() {
  questionsContainer.innerHTML = "";

  questions.forEach((q, index) => {
    const qDiv = document.createElement("div");
    qDiv.className = "question";

    const title = document.createElement("div");
    title.className = "question-title";
    title.textContent = `Q${index + 1}. ${q.text}`;

    const optionsDiv = document.createElement("div");
    optionsDiv.className = "options likert";

    likertOptions.forEach((opt) => {
      const name = `q${q.id}`;
      const id = `${name}_${opt.value}`;

      const label = document.createElement("label");
      label.className = "likert-option";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = name;
      input.value = String(opt.value);
      input.id = id;

      const span = document.createElement("span");
      span.textContent = opt.label;

      label.appendChild(input);
      label.appendChild(span);
      optionsDiv.appendChild(label);
    });

    qDiv.appendChild(title);
    qDiv.appendChild(optionsDiv);
    questionsContainer.appendChild(qDiv);
  });
}

// ページ読み込み時に質問を描画
renderQuestions();

// ====== 診断ロジック ======
const submitBtn = document.getElementById("submitBtn");
const messageEl = document.getElementById("message");

function diagnose() {
  messageEl.textContent = "";

  // A/B/C/D のスコア
  const scores = { A: 0, B: 0, C: 0, D: 0 };

  for (const q of questions) {
    const selected = document.querySelector(`input[name="q${q.id}"]:checked`);
    if (!selected) {
      messageEl.textContent = "未回答の質問があります。すべて回答してください。";
      return;
    }

    const value = Number(selected.value); // 1〜5
    const type = q.targetType; // "A" 等

    if (!scores.hasOwnProperty(type)) {
      console.warn("未知のタイプ:", type);
      continue;
    }

    scores[type] += value;
  }

  // 一番スコアが高いタイプを選ぶ
  let topType = null;
  let topScore = -Infinity;
  for (const [type, score] of Object.entries(scores)) {
    if (score > topScore) {
      topType = type;
      topScore = score;
    }
  }

  if (!topType) {
    messageEl.textContent = "診断中にエラーが発生しました。";
    return;
  }

  // 結果ページに遷移（A/B/C/D をクエリパラメータで渡す）
  const url = `result.html?type=${encodeURIComponent(topType)}`;
  window.location.href = url;
}

submitBtn.addEventListener("click", diagnose);
