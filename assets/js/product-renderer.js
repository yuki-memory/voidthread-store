/**
 * product-renderer.js
 * 商品一覧ページ（index.html）と商品詳細ページ（detail.html）の
 * 動的コンテンツ生成を担当する
 */

document.addEventListener('DOMContentLoaded', () => {
  renderProductList();
  renderProductDetail();
});

/**
 * index.html の商品一覧を動的に生成する
 */
function renderProductList() {
  const itemList = document.getElementById('dynamic-item-list');
  if (!itemList) return;

  itemList.replaceChildren();

  products.forEach((product) => {
    if (!isKnownProductId(product.id)) return;

    const section = create('div');
    section.classList.add('section_content');

    const list = create('ul');
    list.classList.add('item_list');

    const item = create('li');
    item.classList.add('item');

    const link = create('a');
    link.classList.add('item_wrap');
    link.href = `${pagePath('products/detail.html')}?id=${encodeURIComponent(product.id)}`;

    const imageWrap = create('div');
    imageWrap.classList.add('item_img');

    const image = create('img');
    image.src = safeImagePath(product.img);
    image.alt = product.alt || product.name || 'product image';

    const textWrap = create('div');
    textWrap.classList.add('item_text');

    const name = create('p');
    name.classList.add('item_name');
    name.textContent = product.name;

    const price = create('p');
    price.classList.add('item_price');
    price.textContent = `¥${Number(product.price).toLocaleString()}`;

    imageWrap.appendChild(image);
    textWrap.appendChild(name);
    textWrap.appendChild(price);
    link.appendChild(imageWrap);
    link.appendChild(textWrap);
    item.appendChild(link);
    list.appendChild(item);
    section.appendChild(list);
    itemList.appendChild(section);
  });
}

/**
 * detail.html の商品詳細を動的に生成する
 * URLパラメータ ?id=xxx から商品IDを取得して表示する
 */
function renderProductDetail() {
  const container = document.querySelector('#product_container');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');
  const product = isKnownProductId(productId)
    ? products.find((p) => p.id === productId)
    : null;

  if (!product) {
    container.replaceChildren();
    const message = create('h2');
    message.style.textAlign = 'center';
    message.style.width = '100%';
    message.style.margin = '50px 0';
    message.textContent = '商品が見つかりませんでした';
    container.appendChild(message);
    return;
  }

  // 商品情報をDOMに反映
  const nameEl = container.querySelector('.product_name');
  const priceEl = container.querySelector('.product_price');
  const descEl = container.querySelector('.product_description');

  if (nameEl) nameEl.textContent = product.name;
  if (priceEl) priceEl.textContent = `¥${Number(product.price).toLocaleString()}`;
  if (descEl) {
    descEl.replaceChildren();
    appendLineBreaks(descEl, product.description);
  }

  const images = safeArray(product.images).map(safeImagePath);

  // メイン画像を設定
  const mainImageDiv = container.querySelector('.main_image');
  if (mainImageDiv && images.length > 0) {
    mainImageDiv.replaceChildren();
    const image = create('img');
    image.src = images[0];
    image.alt = product.alt || product.name || 'product image';
    mainImageDiv.appendChild(image);
  }

  // サムネイル画像を設定（最大2枚）
  const thumbnailDiv = container.querySelector('.thumbnail_container');
  if (thumbnailDiv && mainImageDiv && images.length > 0) {
    const maxThumbnails = Math.min(images.length, 2);
    thumbnailDiv.replaceChildren();
    images.slice(0, maxThumbnails).forEach((src) => {
      const image = create('img');
      image.src = src;
      image.alt = product.alt || product.name || 'product image';
      thumbnailDiv.appendChild(image);
    });

    // サムネイルクリックでメイン画像を切り替える
    const mainImg = mainImageDiv.querySelector('img');
    thumbnailDiv.querySelectorAll('img').forEach((thumb) => {
      thumb.addEventListener('click', function () {
        if (mainImg) mainImg.src = this.src;
      });
    });
  }
}
