/**
 * script.js
 * ナビゲーション・UI関連の処理を管理する
 * - レスポンシブドロップダウンメニュー
 * - スクロール時のヘッダー固定
 * - 「もっと見る」ボタンの表示制御
 * - カテゴリページへの遷移処理
 */

// ============================
// ドロップダウンメニュー
// ============================

/**
 * 画面幅に応じてドロップダウンメニューの動作を切り替える
 * 768px以下: クリックで開閉（モバイル向け）
 * 769px以上: ホバーで表示（デスクトップ向け）
 */
function mediaQueriesWin() {
  var width = $(window).width();
  if (width <= 768) {
    $('.has-child>a').off('click');
    $('.has-child>a').on('click', function () {
      var parentElem = $(this).parent();
      $(parentElem).toggleClass('active');
      $(parentElem).children('ul').stop().slideToggle(500);
      return false;
    });
  } else {
    $('.has-child>a').off('click');
    $('.has-child').removeClass('active');
    $('.has-child').children('ul').css('display', '');
  }
}

$(window).resize(function () {
  mediaQueriesWin();
});

$(window).on('load', function () {
  mediaQueriesWin();
});

// ============================
// スクロール時のヘッダー固定
// ============================

/**
 * ユーザーのスクロール位置に応じて、ナビゲーションバーを画面上部に固定する
 * コンテンツのバウンド（ジャンプ）を防ぐために、固定時にmargin-topを追加する
 */
function fixedHeaderOnScroll() {
  var $nav = $('#nav');
  var headerHeight = $nav.outerHeight(true);
  var scrollPosition = $(window).scrollTop();
  var threshold = $('.header-rogo').length
    ? $('.header-rogo').outerHeight(true) +
      ($('.header-promotion').length
        ? $('.header-promotion').outerHeight(true)
        : 0)
    : headerHeight;

  if (scrollPosition >= threshold) {
    $nav.addClass('fixed');
    $('.main').css('margin-top', headerHeight + 'px');
  } else {
    $nav.removeClass('fixed');
    $('.main').css('margin-top', '0');
  }
}

$(window).scroll(function () {
  fixedHeaderOnScroll();
});

$(window).on('load', function () {
  fixedHeaderOnScroll();
});

// ============================
// 「もっと見る」ボタンの制御
// ============================

var SHOW_MORE_COUNT = 10;

// section_content 用（トップページ）
$('.section_content:nth-child(n + ' + (SHOW_MORE_COUNT + 1) + ')').addClass(
  'hidden'
);

// section_content_list 用（カテゴリ一覧ページ）
$('.section_content_list:nth-child(n + ' + (SHOW_MORE_COUNT + 1) + ')').addClass(
  'hidden'
);

$('.button').on('click', function () {
  // 非表示の要素を指定数だけ表示する
  $('.section_content.hidden, .section_content_list.hidden')
    .slice(0, SHOW_MORE_COUNT)
    .removeClass('hidden')
    .css('display', '');

  // すべて表示し終えたらボタンを非表示にする
  if (
    $('.section_content.hidden').length === 0 &&
    $('.section_content_list.hidden').length === 0
  ) {
    $('.button').fadeOut();
  }
});

// ============================
// サムネイル画像の切り替え
// ============================

document.addEventListener('DOMContentLoaded', function () {
  var thumbnails = document.querySelectorAll('.thumbnail_container img');
  var mainImage = document.querySelector('.main_image img');

  thumbnails.forEach(function (thumbnail) {
    thumbnail.addEventListener('click', function () {
      if (mainImage) mainImage.src = this.src;
    });
  });
});

// ============================
// カテゴリページへの遷移
// ============================

/**
 * カテゴリボタンがクリックされたとき、
 * list.html以外のページからは商品一覧ページへ遷移する
 */
if (!location.pathname.endsWith('list.html')) {
  var categoryButtons = document.querySelectorAll('.category_selector');

  categoryButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var form = document.createElement('form');
      form.style.display = 'none';
      form.method = 'get';
      form.action = '../products/list.html';

      var input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'filter';
      input.value = button.dataset.cate;

      form.appendChild(input);
      document.body.appendChild(form);
      form.submit();
    });
  });
}
