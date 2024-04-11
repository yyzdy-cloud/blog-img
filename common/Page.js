function setData(dataset) {
	for (let field in dataset) {
		// 通过正则表达式  查找路径数据
		const regex = /([\w$]+)|\[(:\d)\]/g;
		const patten = field.match(regex);
		let result = this; // 指向调用的数据 如data
		// 遍历路径  逐级查找  最后一级用于直接赋值
		for (let i = 0; i < patten.length - 1; i++) {
			const key = patten[i];
			result = result[key];
		}
		result[patten[patten.length - 1]] = dataset[field];
	}
}

function navigateTo(e) {
	let dataset = e.currentTarget ? e.currentTarget.dataset : e;
	let { id, type } = dataset;
	let thiz = this;
	if (type == 'openmodal') {
		thiz[id] = 'show';
	} else if (type == 'closemodal') {
		thiz[id] = '';
	} else if (type == 'page' || type == 'inner' || type == 'href') {
		thiz.$tools.navigateTo(dataset.url, dataset);
	} else if (type == 'submit') {
		showToast('将执行表单提交动作');
	} else if (type == 'reset') {
		showToast('将执行表单重置动作');
	} else if (type == 'tip') {
		showToast(dataset.tip);
	} else if (type == 'confirm') {
		vant.Dialog.alert({
			title: '提示',
			message: dataset.tip
		});
	} else if (type == 'daohang') {
		let $urladdr = 'https://apis.map.qq.com/tools/poimarker?type=0&';
		$urladdr += 'marker=coord:' + dataset.lat + ',' + dataset.lng + ';';
		$urladdr += 'title:' + dataset.address + ';';
		$urladdr += 'addr:' + dataset.address;
		$urladdr += '&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp';
		window.open($urladdr, '_blank');
	} else if (type == 'phone') {
		thiz.$tools.makePhoneCall(e);
	} else if (type == 'previewImage' || type == 'preview') {
		vant.ImagePreview({
			images: [thiz.$tools.renderImage(dataset.img)],
			closeable: true
		});
	} else if (type == 'copy') {
		const el = document.createElement('input');
		el.class = 'diygw-copy';
		document.body.appendChild(el);
		el.value = dataset.copy;
		el.setAttribute('readonly', 'true');
		el.setAttribute('type', 'text');
		el.select();
		el.setSelectionRange(0, 9999);
		try {
			document.execCommand('copy');
			showToast(dataset.tip || '复制成功', 'none');
		} catch (e) {
			return false;
		} finally {
			document.body.removeChild(el);
		}
	} else if (type == 'xcx') {
		showToast('不支持哟');
	} else if (typeof thiz[type] == 'function') {
		thiz[type](dataset);
	} else {
		showToast(type + '类型有待实现');
	}
}

function showModal(message, title = '提示', iscancel = true) {
	return new Promise((resolve) => {
		if (iscancel) {
			vant.Dialog.alert({
				message
			}).then(() => {
				resolve(true);
			});
		} else {
			vant.Dialog.confirm({
				title: title,
				message: message
			})
				.then(() => {
					resolve(true);
				})
				.catch(() => {
					resolve(false);
				});
		}
	});
}

function showToast(title, icon) {
	if (icon) {
		vant.Toast({
			message: title,
			icon: icon
		});
	} else {
		vant.Toast(title);
	}
}

// 根据field获取数据
function getData(thiz, field) {
	// 通过正则表达式  查找路径数据
	const regex = /([\w$]+)|\[(:\d)\]/g;
	const patten = field.match(regex);
	let result = thiz; // 指向调用的数据 如data
	// 遍历路径  逐级查找  最后一级用于直接赋值
	for (let i = 0; i < patten.length - 1; i++) {
		let key = patten[i];
		result = result[key];
	}
	return result[patten[patten.length - 1]];
}
function uploadImage(thiz, field, fieldData) {
	//   uni.chooseImage({
	//     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
	//     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有javascript:;
	//     success: function(res) {
	//       // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
	//       let tempFilePaths = res.tempFilePaths
	//       for (let i = 0; i < tempFilePaths.length; i++) {
	//         uni.uploadFile({
	//           url: thiz.$http.setUrl('/data/file.html'), // 仅为示例，非真实的接口地址
	//           filePath: tempFilePaths[0],
	//           name: 'file',
	//           success: function(res) {
	//             let data = thiz.$tools.fromJson(res.data)
	//             let url = thiz.$tools.renderImage(data.url)
	//             let files = getData(thiz, fieldData).concat(url)
	//             thiz.setData({
	//               [fieldData]: files,
	//               [field]: (files || []).join(',').replace(/^[]/, '')
	//             })
	//           }
	//         })
	//       }
	//     }
	//   })
}

function Validate(rules, messages) {
	return new ValidateClazz(rules, messages);
}
