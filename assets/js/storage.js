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

const security = {
  PRODUCT_ID_PATTERN: /^[0-9]{1,3}-[0-9]{3}$/,
  SAFE_IMAGE_PATTERN: /^(\.\.\/|\.\/)?assets\/img\/[a-z0-9._-]+\.(png|jpg|jpeg|webp|svg)$/i,
  CATEGORY_ALLOWLIST: new Set([
    'all',
    'section_tshirt',
    'section_long',
    'section_foodie',
    'section_bag',
    'section_accessory',
    'section_goods',
    'section_bottoms',
  ]),
  SIZE_ALLOWLIST: new Set(['M', 'L', 'XL']),
  COLOR_ALLOWLIST: new Set(['black', 'white']),
  MAX_CART_ITEMS: 50,
  MAX_WISH_ITEMS: 100,
  MAX_AMOUNT: 5,
};

function safeArray(value) {
  return Array.isArray(value) ? value : [];
}

function isKnownProductId(id) {
  const productList = typeof products !== 'undefined' ? products : [];
  return (
    typeof id === 'string' &&
    security.PRODUCT_ID_PATTERN.test(id) &&
    Array.isArray(productList) &&
    productList.some((product) => product.id === id)
  );
}

function sanitizeCartItem(item) {
  if (!item || !isKnownProductId(item.id)) return null;

  const amount = Number.parseInt(item.amount, 10);

  return {
    id: item.id,
    size: security.SIZE_ALLOWLIST.has(item.size) ? item.size : null,
    color: security.COLOR_ALLOWLIST.has(item.color) ? item.color : null,
    amount: Number.isInteger(amount)
      ? Math.min(Math.max(amount, 1), security.MAX_AMOUNT)
      : 1,
  };
}

function sanitizeWishItem(item) {
  if (!item || !isKnownProductId(item.id)) return null;
  return { id: item.id };
}

function sanitizeStoredItems(key, items) {
  const sanitizer =
    key === keys.CART_LIST_KEY ? sanitizeCartItem : sanitizeWishItem;
  const limit =
    key === keys.CART_LIST_KEY ? security.MAX_CART_ITEMS : security.MAX_WISH_ITEMS;
  const seen = new Set();

  return safeArray(items)
    .map(sanitizer)
    .filter(Boolean)
    .filter((item) => {
      const duplicateKey =
        key === keys.CART_LIST_KEY
          ? `${item.id}:${item.size || ''}:${item.color || ''}`
          : item.id;

      if (seen.has(duplicateKey)) return false;
      seen.add(duplicateKey);
      return true;
    })
    .slice(0, limit);
}

function safeImagePath(src) {
  if (typeof src !== 'string') return assetPath('assets/img/rogo.png');

  const normalized = src.replace(/^(\.\.\/|\.\/)+/, '');
  return security.SAFE_IMAGE_PATTERN.test(normalized)
    ? assetPath(normalized)
    : assetPath('assets/img/rogo.png');
}

function assetPath(path) {
  const normalized = String(path).replace(/^(\.\.\/|\.\/)+/, '');
  const isNestedPage =
    location.pathname.includes('/pages/') || location.pathname.includes('/products/');

  return isNestedPage ? `../${normalized}` : normalized;
}

function pagePath(path) {
  const normalized = String(path).replace(/^(\.\.\/|\.\/)+/, '');
  const isNestedPage =
    location.pathname.includes('/pages/') || location.pathname.includes('/products/');

  return isNestedPage ? `../${normalized}` : normalized;
}

function appendLineBreaks(element, text) {
  String(text || '')
    .split(/<br\s*\/?>/i)
    .forEach((line, index) => {
      if (index > 0) {
        element.appendChild(document.createElement('br'));
        element.appendChild(document.createElement('br'));
      }
      element.appendChild(document.createTextNode(line));
    });
}

/**
 * localStorageからデータを読み込む
 * @param {string} key - localStorageのキー
 * @returns {Array} 保存されたデータ配列（なければ空配列）
 */
function loadLocalStorage(key) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key));
    return sanitizeStoredItems(key, parsed);
  } catch (error) {
    localStorage.removeItem(key);
    return [];
  }
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
  const sanitized = sanitizeStoredItems(key, obj);
  localStorage.setItem(key, JSON.stringify(sanitized));
  if (key === keys.CART_LIST_KEY) data.cartItems = sanitized;
  if (key === keys.WISH_LIST_KEY) data.wishListItems = sanitized;
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
  const count = safeArray(dataList).length;
  if (count > 0) {
    const btn = document.querySelector(selector);
    if (!btn) return;
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
