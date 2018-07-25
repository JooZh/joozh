window.onload = function () {
	
	// 创建刻度方法
	function createHand(selector, number, deg) {
		var domNumber = document.querySelector(selector);
		var domNumberHtml = "";
		for (let i = 0; i < number; i++) {
			domNumberHtml += '<li style="transform:rotate(' + (i * deg) + 'deg);"></li>';
		}
		domNumber.innerHTML = domNumberHtml;
	}
	
	// 创建小时刻度
	createHand(".number", 12, 30);
	// 创建分钟刻度
	createHand(".lines", 60, 6);
	
	// 初始数据对象
	var spaceObj = {
			spaceSecond: {
				deg: 6,
				space: 1000,
				nowTimeDeg: 0
			},
			spaceMinute: {
				deg: 0.2,
				space: 2000,
				nowTimeDeg: 0
			},
			spaceHour: {
				deg: 0.025,
				space: 3000,
				nowTimeDeg: 0
			}
		}
		
		// 获取当前的时间
	;(function getTime() {
		// 获取时间日期
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		var hour = date.getHours();
		var minute = date.getMinutes();
		var second = date.getSeconds();
		
		// 时间转角度
		var sDeg = (second - 1) * 6;
		var mDeg = minute * 6 + second * 0.1;
		var hDeg = 0;
		if (hour > 12) {
			hour = hour - 12;
			hDeg = (hour * 30 + minute * 0.5 + (Math.floor(second / 3) * 0.025));
		} else {
			hDeg = (hour * 30 + minute * 0.5 + (Math.floor(second / 3) * 0.025));
		}
		
		// 时间赋值
		spaceObj.spaceSecond.nowTimeDeg = sDeg;
		spaceObj.spaceMinute.nowTimeDeg = mDeg;
		spaceObj.spaceHour.nowTimeDeg = hDeg;
		
		// 控制台打印时间信息
		var time = '当前时间：' + year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
		console.log(time);
	})();
	
	// 每秒显示时间
	// setInterval(function () {
	//     getTime();
	// }, 1000);
	
	// 三针运行函数
	function runHand(selector, space) {
		var sTimer = space.nowTimeDeg;
		var oHand = document.querySelector(selector);
		(function run() {
			if (sTimer >= 360) {
				sTimer = 0;
			}
			sTimer += space.deg;
			oHand.style.transform = 'rotate(' + (-90 + sTimer) + 'deg)';
			setTimeout(function () {
				run();
			}, space.space);
		})()
	}
	
	// 刷新页面后一秒调用
	;(function () {
		runHand('.second-hand li', spaceObj.spaceSecond);
		runHand('.minute-hand li', spaceObj.spaceMinute);
		runHand('.hour-hand li', spaceObj.spaceHour);
	})();
	
	// 旋转 小时刻度
	// var oNumbers = document.querySelectorAll('.number li');
	// oNumbers.forEach(function (value, index, array) {
	//     value.style.transform = 'rotate(' + index * 30 + 'deg)';
	// });
	
	// // 旋转 每分刻度
	// var oLines = document.querySelectorAll('.lines li');
	// oLines.forEach(function (value, index, array) {
	//     value.style.transform = 'rotate(' + index * 6 + 'deg)';
	// });
	
	// 秒钟转动
	// var sTimer = 0;
	// var oSecondHand = document.querySelector('.second-hand li');
	
	// function runSecond() {
	//     if (sTimer >= 360) {
	//         sTimer = 0;
	//     }
	//     sTimer += 6;
	//     oSecondHand.style.transform = 'rotate(' + (-90 + sTimer) + 'deg)';
	//     setTimeout(function () {
	//         console.log('秒针', sTimer);
	//         runSecond();
	//     }, 1000);
	// };
	
	// // 分钟转动
	// var mTimer = 0;
	// var oMinuteHand = document.querySelector('.minute-hand li');
	
	// function runMinute() {
	//     if (mTimer >= 360) {
	//         mTimer = 0;
	//     }
	//     mTimer += 0.2;
	//     oMinuteHand.style.transform = 'rotate(' + (-90 + mTimer) + 'deg)';
	//     setTimeout(function () {
	//         console.log('分针', mTimer);
	//         runMinute();
	//     }, 2000);
	// };
	
	// // 时钟钟转动
	// var hTimer = 0;
	// var oHourHand = document.querySelector('.hour-hand li');
	
	// function runHour() {
	//     if (hTimer >= 360) {
	//         hTimer = 0;
	//     }
	//     hTimer += 0.025;
	//     oHourHand.style.transform = 'rotate(' + (-90 + hTimer) + 'deg)';
	//     setTimeout(function () {
	//         console.log('时针', hTimer);
	//         runHour();
	//     }, 3000);
	// };
	
	// // 刷新1秒后 开始转动
	// setTimeout(function () {
	//     runSecond();
	//     runMinute();
	//     runHour();
	// }, 1000)
	
};