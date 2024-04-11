const httpService = axios.create({
	timeout: 10000
});

// 获取参数值
function getPathValue(obj, desc) {
	var arr = desc.split('.');
	while (arr.length) {
		obj = obj[arr.shift()];
	}
	return obj;
}

//获取值
function getRestUrl(url, data) {
	if (!data) {
		return url;
	} else if (data !== null && typeof data === 'object') {
		url = url.replace(/\{\{(.+?)\}\}/g, (_, key) => {
			let name = key.trim();
			return getPathValue(data, name);
		});
		url = url.replace(/\{(.+?)\}/g, (_, key) => {
			let name = key.trim();
			return getPathValue(data, name);
		});
		return url;
	}
	return url;
}

/**
 * 设置请求路径
 */
function setUrl(url, param) {
	return getRestUrl(url, param);
}

httpService.interceptors.request.use(
	(request) => {
		request.url = getRestUrl(request.url, request.data);
		if (request.data && request.data.constructor != FormData) {
			if (request.method === 'post') {
				let data = new FormData();
				for (var key in request.data) {
					var val = request.data[key];
					if (val === null || val === undefined) {
						data.append(key, '');
					} else if (val.constructor == Array) {
						for (var i = 0; i < val.length; i++) {
							data.append(key, typeof val[i] == 'object' ? JSON.stringify(val[i]) : val[i]);
						}
					} else {
						data.append(key, typeof val == 'object' ? JSON.stringify(val) : val);
					}
				}
				request.data = data;
			}
		} else if (request.method === 'get' && request.params) {
			request.url = this.getRestUrl(request.url, request.params);
			let url = request.url + '?';
			for (const propName of Object.keys(request.params)) {
				const value = request.params[propName];
				var part = encodeURIComponent(propName) + '=';
				if (value !== null && typeof value !== 'undefined') {
					if (typeof value === 'object') {
						for (const key of Object.keys(value)) {
							let params = propName + '[' + key + ']';
							var subPart = encodeURIComponent(params) + '=';
							url += subPart + encodeURIComponent(value[key]) + '&';
						}
					} else {
						url += part + encodeURIComponent(value) + '&';
					}
				}
			}
			url = url.slice(0, -1);
			request.params = {};
			request.url = url;
		}
		request.headers = request.headers || {};
		request.requestTimestamp = new Date().getTime();
		if (Session.getToken()) {
			request.headers.Authorization = Session.getToken();
		}
		if (request.data) {
			vant.Toast(request.data.loadmsg || '加载中...');
			if (request.data['redirecturl']) {
				Session.setRedirecturl(request.data['redirecturl']);
				delete request.data['redirecturl'];
			}
			delete request.data['loadmsg'];
		} else {
			vant.Toast('加载中...');
		}

		return request;
	},
	(error) => {
		return Promise.reject(error);
	}
);

httpService.interceptors.response.use(
	(response) => {
		const res = response.data;
		/*if (res.code !== undefined && res.code !== 200) {
			vant.Toast(res.msg);
			return Promise.reject(res.msg);
		}
		vant.Toast.clear();*/
		return res;
	},
	(error) => {
		return error;
	}
);
