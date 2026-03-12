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

  const htmlContent = products
    .map(
      (product) => `
      <div class="section_content">
        <ul class="item_list">
          <li class="item">
            <a href="../products/detail.html?id=${product.id}" class="item_wrap">
              <div class="item_img">
                <img src="${product.img}" alt="${product.alt}">
              </div>
              <div class="item_text">
                <p class="item_name">${product.name}</p>
                <p class="item_price">&yen;${product.price.toLocaleString()}</p>
              </div>
            </a>
          </li>
        </ul>
      </div>
    `
    )
    .join('');

  itemList.innerHTML = htmlContent;
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
  const product = products.find((p) => p.id === productId);

  if (!product) {
    container.innerHTML =
      "<h2 style='text-align: center; width: 100%; margin: 50px 0;'>商品が見つかりませんでした</h2>";
    return;
  }

  // 商品情報をDOMに反映
  const nameEl = container.querySelector('.product_name');
  const priceEl = container.querySelector('.product_price');
  const descEl = container.querySelector('.product_description');

  if (nameEl) nameEl.textContent = product.name;
  if (priceEl) priceEl.innerHTML = `&yen;${product.price.toLocaleString()}`;
  if (descEl) descEl.innerHTML = product.description;

  // メイン画像を設定
  const mainImageDiv = container.querySelector('.main_image');
  if (mainImageDiv && product.images.length > 0) {
    mainImageDiv.innerHTML = `<img src="${product.images[0]}" alt="${product.alt}" />`;
  }

  // サムネイル画像を設定（最大2枚）
  const thumbnailDiv = container.querySelector('.thumbnail_container');
  if (thumbnailDiv && product.images.length > 0) {
    const maxThumbnails = Math.min(product.images.length, 2);
    thumbnailDiv.innerHTML = product.images
      .slice(0, maxThumbnails)
      .map((src) => `<img src="${src}" alt="${product.alt}" />`)
      .join('');

    // サムネイルクリックでメイン画像を切り替える
    const mainImg = mainImageDiv.querySelector('img');
    thumbnailDiv.querySelectorAll('img').forEach((thumb) => {
      thumb.addEventListener('click', function () {
        if (mainImg) mainImg.src = this.src;
      });
    });
  }
}
