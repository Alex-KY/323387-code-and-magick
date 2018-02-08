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
var FIRST_STRING_Y = CLOUD_Y + FONT_GAP * 2;
var FIRST_STRING_X = CLOUD_X + FONT_GAP;

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

//  Функция для выбора случайного цвета палитры rgb
var getRandomColor = function () {
  return (255 * (Math.random())).toFixed(0) + ', ' + (255 * (Math.random())).toFixed(0) + ', ' + (255 * (Math.random())).toFixed(0);
};

var getRandomTransparent = function () {
  return (Math.floor(Math.random() * 10) + 1) / 10;
};

var getPlayerBarHeight = function (index, times) {
  return (barHeight * times[index]) / getMaxElement(times);
};

var getPlayerBarIndent = function (index) {
  return FIRST_STRING_X + (BAR_WIDTH + BAR_GAP) * index;
};

var renderPlayerBar = function (ctx, index, times) {
  var playerBarHeight = getPlayerBarHeight(index, times);
  var playerBarIndent = getPlayerBarIndent(index);
  return ctx.fillRect(playerBarIndent, CLOUD_HEIGHT + GAP - 2 * FONT_GAP - playerBarHeight, BAR_WIDTH, playerBarHeight);
};

window.renderStatistics = function (ctx, players, times) {

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.strokeRect(CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', FIRST_STRING_X, FIRST_STRING_Y);
  ctx.fillText('Список результатов:', FIRST_STRING_X, FIRST_STRING_Y + GAP * 2);

  for (var i = 0; i < players.length; i++) {

    ctx.fillText(players[i], getPlayerBarIndent(i), CLOUD_HEIGHT + CLOUD_Y - FONT_GAP);

    ctx.fillStyle = (players[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'rgba(' + getRandomColor() + ', ' + getRandomTransparent() + ')';
    renderPlayerBar(ctx, i, times);

    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), getPlayerBarIndent(i), CLOUD_HEIGHT - FONT_GAP - GAP - getPlayerBarHeight(i, times));

  }
};
