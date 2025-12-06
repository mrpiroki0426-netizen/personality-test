// js/result.js

// URLパラメータから type を取得
function getTypeFromQuery() {
  const params = new URLSearchParams(window.location.search);
  return params.get("type"); // "A" / "B" / "C" / "D" のどれか
}

const type = getTypeFromQuery();
const typeInfo = personalityTypes[type] || {
  label: "タイプ不明",
  description: "URLが正しくありません。もう一度診断を行ってください。"
};

document.getElementById("typeLabel").textContent = typeInfo.label;
document.getElementById("description").textContent = typeInfo.description;
