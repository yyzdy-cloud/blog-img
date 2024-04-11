const httpService = axios.create({
	timeout: 10000
});

httpService.interceptors.request.use(
	(request) => {
		request.header = request.header || {};
		request.requestTimestamp = new Date().getTime();
		if (request.data.login && request.data.login === '1') {
			request.header.Authorization = Session.getToken();
		}
		vant.Toast(request.data.loadmsg || '加载中...');
		if (request.data['redirecturl']) {
			Session.setRedirecturl(request.data['redirecturl']);
			delete request.data['redirecturl'];
		}
		delete request.data['loadmsg'];
		return request;
	},
	(error) => {
		return Promise.reject(error);
	}
);

httpService.interceptors.response.use(
	(response) => {
		const res = response.data;
		if (res.code !== undefined && res.code !== 200) {
			vant.Toast(res.msg);
			return Promise.reject(res.msg);
		}
		vant.Toast.clear();
		return res;
	},
	(error) => {
		return error;
	}
);
