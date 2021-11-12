function toCDB(str) {

	var tmp = "";
	for (var i = 0; i < str.length; i++) {
		var num = str.charCodeAt(i);
		// 将小写字母全角替换成半角\xff41-\xff5a
		// 将大写字母全角替换成半角\xff21-\xff3a
		// 将数字全角替换成半角\xff10-\xff19
		if (num >= 0xff41 && num <= 0xff5a ||
			num >= 0xff21 && num <= 0xff3a ||
			num >= 0xff10 && num <= 0xff19) {
			tmp += String.fromCharCode(num - 0xfee0);
		}else{
			tmp += String.fromCharCode(num);
		}
	}
	return tmp
}

function handle(text) {
	// 去除断行和空格
	text = text.replace(/\s+/g, '');

	// 替换全角数字字母为半角
	text = toCDB(text)

	return text;
}

window.exports = {
	"handle": {
		mode: "none",
		args: {
			enter: (action) => {
				window.utools.hideMainWindow()
				var payload = action.payload;

				var copyText = handle(payload);

				utools.copyText(copyText);

				utools.showNotification(copyText);
				window.utools.outPlugin()
			}
		}
	},
	"smart-handle": {
		mode: "none",
		args: {
			enter: (action) => {
				window.utools.hideMainWindow()
				var payload = action.payload;

				var copyText = handle(payload);

				utools.copyText(copyText);

				utools.showNotification(copyText);
				window.utools.outPlugin()
			}
		}
	}
}
