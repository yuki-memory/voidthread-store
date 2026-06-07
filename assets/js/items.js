const buttons = document.querySelectorAll('.category_selector');

// カテゴリーのクラス名を定義する
const knownCategories = Array.from(security.CATEGORY_ALLOWLIST).filter(
  (category) => category !== 'all'
);

function normalizeCategory(categoryName) {
  return security.CATEGORY_ALLOWLIST.has(categoryName) ? categoryName : 'all';
}

function setDisplay(categoryName) {
  const safeCategoryName = normalizeCategory(categoryName);

  // 1. まず全カテゴリーのセクションを非表示にする
  knownCategories.forEach(cat => {
    const section = document.querySelector(`.${cat}`);
    if (section) {
      if (safeCategoryName === 'all') {
        section.style.display = 'block';
      } else {
        section.style.display = 'none';
      }
    }
  });

  // 2. 選択されたカテゴリーのみ表示する
  if (safeCategoryName !== 'all') {
    const target = document.querySelector(`.${safeCategoryName}`);
    if (target) {
      target.style.display = 'block';
    }
  }
}

// ページ読み込み時の処理
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const filter = normalizeCategory(params.get('filter'));

  if (filter) {
    setDisplay(filter);
  } else {
    // フィルターが未指定の場合は全て表示する
    setDisplay('all');
  }

  // カテゴリーボタンのクリックイベント
  buttons.forEach(b => {
    b.addEventListener('click', (e) => {
      e.preventDefault();
      const cate = normalizeCategory(b.dataset.cate);
      if (cate) {
        // 選択されたカテゴリーでページをリロードする
        location.search = `filter=${encodeURIComponent(cate)}`;
      }
    });
  });
});
