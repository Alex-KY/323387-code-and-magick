'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 15;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var barHeight = 150;
var stringText = 1;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var drawStringText = function (ctx, text) {
  var string = CLOUD_Y + GAP + (FONT_GAP + GAP / 2) * stringText;
  stringText++;
  ctx.fillText(text, CLOUD_X + FONT_GAP, string);
};

// Функция для выбора случайного цвета палитры rgb
// var getRandomColor = function () {
//   return (255 * (Math.random())).toFixed(0) + ', ' + (255 * (Math.random())).toFixed(0) + ', ' + (255 * (Math.random())).toFixed(0);
// };

var getRandomTransparent = function () {
  return (Math.floor(Math.random() * 10) + 1) / 10;
};

window.renderStatistics = function (ctx, players, times) {

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.strokeRect(CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.font = '16px PT Mono';
  drawStringText(ctx, 'Ура вы победили!');
  drawStringText(ctx, 'Список результатов:');

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var playerBarHeight = (barHeight * times[i]) / maxTime;
    var playerBarIndent = CLOUD_X + FONT_GAP + (BAR_WIDTH + BAR_GAP) * i;

    ctx.fillText(players[i], playerBarIndent, CLOUD_HEIGHT + CLOUD_Y - FONT_GAP);

    ctx.fillStyle = (players[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255, ' + getRandomTransparent() + ')';

    ctx.fillRect(playerBarIndent, CLOUD_HEIGHT + GAP - 2 * FONT_GAP - playerBarHeight, BAR_WIDTH, playerBarHeight);
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), playerBarIndent, CLOUD_HEIGHT - FONT_GAP - GAP - playerBarHeight);

  }
  stringText = 1;
};
