// js/result.js

// URLクエリから type（例: ESAH）を取得
function getTypeFromQuery() {
  const params = new URLSearchParams(window.location.search);
  return params.get("type"); // "ESAH" など
}

document.addEventListener("DOMContentLoaded", () => {
  const type = getTypeFromQuery();

  // config.js で定義した personalityTypes から情報を取得
  const typeInfo = personalityTypes[type] || {
    label: "タイプ不明",
    description: "URLが正しくありません。もう一度診断を行ってください。"
  };

  const typeLabelEl = document.getElementById("typeLabel");
  const descriptionEl = document.getElementById("description");

  if (!typeLabelEl || !descriptionEl) {
    console.error("結果表示用の要素が見つかりません (typeLabel / description)");
    return;
  }

  // 4文字コードも一緒に見せたい場合はこんな感じ
  // typeLabelEl.textContent = `${type}：${typeInfo.label}`;
  typeLabelEl.textContent = typeInfo.label;
  descriptionEl.textContent = typeInfo.description;

  console.log("診断結果タイプ:", type, typeInfo);
});
