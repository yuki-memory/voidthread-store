/**
 * storage.js
 * localStorage を使ったデータの保存・読み込み処理
 * お気に入り・カートのバッジ表示を管理する
 */

// localStorageのキー定数
const keys = {
  WISH_LIST_KEY: 'WISH_LIST',
  CART_LIST_KEY: 'CART_LIST',
};

/**
 * localStorageからデータを読み込む
 * @param {string} key - localStorageのキー
 * @returns {Array} 保存されたデータ配列（なければ空配列）
 */
function loadLocalStorage(key) {
  const parsed = JSON.parse(localStorage.getItem(key));
  return parsed ? Array.from(parsed) : [];
}

// 現在のお気に入り・カートデータを取得
const data = {
  wishListItems: loadLocalStorage(keys.WISH_LIST_KEY),
  cartItems: loadLocalStorage(keys.CART_LIST_KEY),
};

/**
 * localStorageにデータを保存し、ページをリロードする
 * @param {string} key - localStorageのキー
 * @param {Array} obj - 保存するデータ配列
 */
function saveLocalStorage(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj));
  updateItemsCount('.icon-fav', data.wishListItems);
  updateItemsCount('.icon-cart', data.cartItems);
  location.reload();
}

/**
 * ナビゲーションアイコンにバッジ（個数）を表示する
 * @param {string} selector - アイコンのCSSセレクター
 * @param {Array} dataList - 対象データの配列
 */
function updateItemsCount(selector, dataList) {
  const count = dataList.length;
  if (count > 0) {
    const btn = document.querySelector(selector);
    // 既存のバッジを削除
    Array.from(btn.children).forEach((child) => {
      if (child.classList.contains('count')) {
        child.remove();
      }
    });

    const countBadge = document.createElement('div');
    countBadge.classList.add('count');
    countBadge.textContent = count >= 10 ? '9+' : `${count}`;
    btn.appendChild(countBadge);
  }
}

/**
 * DOM要素を生成するヘルパー関数
 * @param {string} tagName - 生成するHTML要素のタグ名
 * @returns {HTMLElement}
 */
function create(tagName) {
  return document.createElement(tagName);
}

// 初期表示時にバッジを更新
updateItemsCount('.icon-fav', data.wishListItems);
updateItemsCount('.icon-cart', data.cartItems);
