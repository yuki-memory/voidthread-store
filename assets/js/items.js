const buttons = document.querySelectorAll('.category_selector');

// カテゴリーのクラス名を定義する
const knownCategories = [
  'section_tshirt',
  'section_long',
  'section_foodie',
  'section_bag',
  'section_accessory',
  'section_goods',
  'section_bottoms'
];

function setDisplay(categoryName) {
  // 1. まず全カテゴリーのセクションを非表示にする
  knownCategories.forEach(cat => {
    const section = document.querySelector(`.${cat}`);
    if (section) {
      if (categoryName === 'all' || !categoryName) {
        section.style.display = 'block';
      } else {
        section.style.display = 'none';
      }
    }
  });

  // 2. 選択されたカテゴリーのみ表示する
  if (categoryName && categoryName !== 'all') {
    const target = document.querySelector(`.${categoryName}`);
    if (target) {
      target.style.display = 'block';
    }
  }
}

// ページ読み込み時の処理
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const filter = params.get('filter');
  
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
      const cate = b.dataset.cate;
      if (cate) {
        // 選択されたカテゴリーでページをリロードする
        location.search = `filter=${cate}`;
      }
    });
  });
});
