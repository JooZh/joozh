let lyricStr = `
[ti:十年]
[ar:陈奕迅]
[al:你的陈奕迅 国语精选]
[by:]
[offset:0]
[00:00.10]十年 (《 明年今日》国语版|《隐婚男女》电影插曲|《摆渡人》电影插曲) - 陈奕迅
[00:00.30]词：林夕
[00:00.40]曲：陈小霞
[00:00.50]编曲：陈辉阳
[00:00.60]
[00:15.57]如果那两个字没有颤抖
[00:19.32]我不会发现 我难受
[00:22.07]
[00:22.61]怎么说出口
[00:24.23]
[00:26.33]也不过是分手
[00:28.18]
[00:30.88]如果对于明天没有要求
[00:34.35]
[00:34:96]牵牵手就像旅游
[00:37.83]成千上万个门口
[00:40.20]
[00:41.79]总有一个人要先走
[00:44.38]
[00:47.40]怀抱既然不能逗留
[00:50.32]
[00:50.94]何不在离开的时候
[00:53.32]
[00:53.85]一边享受 一边泪流
[00:59.80]
[01:01.03]十年之前
[01:03.07]我不认识你
[01:04.91]你不属于我
[01:06.83]我们还是一样
[01:09.28]陪在一个陌生人左右
[01:12.18]
[01:13.14]走过渐渐熟悉的街头
[01:16.46]十年之后
[01:18.40]我们是朋友
[01:20.31]还可以问候
[01:22.27]只是那种温柔
[01:24.71]再也找不到拥抱的理由
[01:27.94]
[01:28.60]情人最后难免沦为朋友
[01:34.48]
[01:57.23]怀抱既然不能逗留
[02:00.01]
[02:00.62]何不在离开的时候
[02:02.96]
[02:03.53]一边享受 一边泪流
[02:09.92]
[02:10.82]十年之前
[02:12.71]我不认识你
[02:14.69]你不属于我
[02:16.50]我们还是一样
[02:18.96]陪在一个陌生人左右
[02:21.95]
[02:22.84]走过渐渐熟悉的街头
[02:26.25]十年之后 我们是朋友
[02:30.03]还可以问候 只是那种温柔
[02:34.44]再也找不到拥抱的理由
[02:38.24]情人最后难免沦为朋友
[02:44.17]
[02:48.32]直到和你做了多年朋友
[02:51.79]
[02:52.38]才明白我的眼泪
[02:55.22]不是为你而流
[02:57.45]
[02:59.14]也为别人而流
`;

// 使用换行符拆分歌词为数组

class Lyric {
	constructor(obj) {
		// this.time = obj.songTime;
		this.lyric = obj.lyricStr;
		this.lines = [];
		this.tags = {};
		let arrLyric = this.lyric.split('\n');
		let regLyric = /^\[\d+:\d+((\.|\:)\d+)?\].+$/;
		let regTags = /^\[[a-z]+:.*\]$/;
		for (let i = 0; i < arrLyric.length; i++) {
			// 去掉每行行首空格
			let lyricLine = arrLyric[i].replace(/\s+/, '');
			// 匹配成功
			if (regTags.test(lyricLine)) {
				let str = lyricLine.replace(/(\[|\])/g, '');
				let tagArr = str.split(':');
				this.tags[tagArr[0]] = tagArr[1];
			} else if (regLyric.test(lyricLine)) {
				// time 是毫秒
				let time = Lyric.getTime(lyricLine, obj);
				let text = lyricLine.replace(/\[([\s\S]+)\]/, '');
				this.lines.push({
					time: time,
					text: text
				})
			}
		}
		// 参数中传递了滚动节点的话就执行创建dom方法
		if (obj.showElement) {
			this.dom(obj);
		}
	}
	
	// 时间转换
	static getTime(str, obj) {
		let time, aStr, timeArr;
		if (str.indexOf('[') !== -1) {
			aStr = str.match(/\[\d+:\d+((\.|\:)\d+)?\]/g)
			if (aStr.length > 1) {
				str = aStr[1].replace(/(\[|\])/g, '');
			}
		}
		timeArr = str.match(/\d+/g);
		if (timeArr.length === 3) {
			time = (parseInt(timeArr[0]) * 60 + parseInt(timeArr[1])) * 1000;
			time += parseInt(timeArr[2]) * 10;
		} else {
			time = (parseInt(timeArr[0]) * 60 + parseInt(timeArr[1])) * 1000;
		}
		// 解决延迟时间
		if (obj.lateTime) {
			time += obj.lateTime;
			if (time < 100) {
				time += Math.abs(obj.lateTime);
			}
		}
		return time;
	}
	
	// 创建歌词节点
	dom(obj) {
		let oScroll = document.querySelector(obj.showElement);
		let html = '';
		if (obj.lyricLineClass) {
			let arr;
			if (obj.lyricLineClass.indexOf('.') !== -1 && obj.lyricLineClass.indexOf('.') > 0) {
				arr = obj.lyricLineClass.split('.');
			} else {
				arr = obj.lyricLineClass;
			}
			// 判断传入的类型			
			for (let i = 0; i < this.lines.length; i++) {
				if (typeof arr === 'string' && arr.indexOf('.') !== -1) {
					html += `<p class="${arr.substr(1)}">${this.lines[i].text}</p>`;
				} else if (typeof arr === 'object') {
					html += `<${arr[0]} class="${arr[1]}">${this.lines[i].text}</${arr[0]}>`;
				} else {
					html += `<${arr}>${this.lines[i].text}</${arr}>`;
				}
			}
		} else {
			for (let i = 0; i < this.lines.length; i++) {
				html += `<p>${this.lines[i].text}</p>`;
			}
		}
		oScroll.innerHTML = html;
	}
}


