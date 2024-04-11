let SESSION_KEY = 'user_session_diygw_com';
let REDIRECT_SESSION_KEY = 'redirect_session_diygw_com';

var Session = {
	getRedirecturl() {
		return localStorage.getItem(REDIRECT_SESSION_KEY) || null;
	},

	setRedirecturl(url) {
		localStorage.setItem(REDIRECT_SESSION_KEY, url);
	},
	getUser() {
		if (localStorage.getItem(SESSION_KEY)) {
			return JSON.parse(localStorage.getItem(SESSION_KEY));
		}
		return null;
	},

	setUser(session) {
		localStorage.setItem(SESSION_KEY, JSON.stringify(session));
	},

	clearUser() {
		localStorage.removeItem(SESSION_KEY);
	},

	getToken() {
		let userInfo = this.getUser();
		return userInfo ? userInfo.token : null;
	},

	getOpenId() {
		let userInfo = this.getUser();
		return userInfo ? userInfo.openid : null;
	},

	setValue(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	},

	getValue(key) {
		if (localStorage.getItem(key)) {
			return JSON.parse(localStorage.getItem(key));
		}
		return null;
	}
};
