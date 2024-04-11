(function (p, Q) {
	typeof exports == 'object' && typeof module < 'u' ? (module.exports = Q(require('vue'))) : typeof define == 'function' && define.amd ? define(['vue'], Q) : ((p = typeof globalThis < 'u' ? globalThis : p || self), (p.DiygwLib = Q(p.Vue)));
})(this, function (p) {
	'use strict';
	var Q = {
			version: 'v2.4.3-20220505',
			yAxisWidth: 15,
			xAxisHeight: 22,
			xAxisTextPadding: 3,
			padding: [10, 10, 10, 10],
			pixelRatio: 1,
			rotate: !1,
			fontSize: 13,
			fontColor: '#666666',
			dataPointShape: ['circle', 'circle', 'circle', 'circle'],
			color: ['#1890FF', '#91CB74', '#FAC858', '#EE6666', '#73C0DE', '#3CA272', '#FC8452', '#9A60B4', '#ea7ccc'],
			linearColor: ['#0EE2F8', '#2BDCA8', '#FA7D8D', '#EB88E2', '#2AE3A0', '#0EE2F8', '#EB88E2', '#6773E3', '#F78A85'],
			pieChartLinePadding: 15,
			pieChartTextPadding: 5,
			titleFontSize: 20,
			subtitleFontSize: 15,
			toolTipPadding: 3,
			toolTipBackground: '#000000',
			toolTipOpacity: 0.7,
			toolTipLineHeight: 20,
			radarLabelTextMargin: 13
		},
		F = function (i, ...e) {
			if (i == null) throw new TypeError('[uCharts] Cannot convert undefined or null to object');
			if (!e || e.length <= 0) return i;
			function t(a, l) {
				for (let r in l) a[r] = a[r] && a[r].toString() === '[object Object]' ? t(a[r], l[r]) : (a[r] = l[r]);
				return a;
			}
			return (
				e.forEach((a) => {
					i = t(i, a);
				}),
				i
			);
		},
		de = {
			toFixed: function (e, t) {
				return (t = t || 2), this.isFloat(e) && (e = e.toFixed(t)), e;
			},
			isFloat: function (e) {
				return e % 1 !== 0;
			},
			approximatelyEqual: function (e, t) {
				return Math.abs(e - t) < 1e-10;
			},
			isSameSign: function (e, t) {
				return (Math.abs(e) === e && Math.abs(t) === t) || (Math.abs(e) !== e && Math.abs(t) !== t);
			},
			isSameXCoordinateArea: function (e, t) {
				return this.isSameSign(e.x, t.x);
			},
			isCollision: function (e, t) {
				(e.end = {}), (e.end.x = e.start.x + e.width), (e.end.y = e.start.y - e.height), (t.end = {}), (t.end.x = t.start.x + t.width), (t.end.y = t.start.y - t.height);
				var a = t.start.x > e.end.x || t.end.x < e.start.x || t.end.y > e.start.y || t.start.y < e.end.y;
				return !a;
			}
		};
	function P(i, e) {
		var t = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
			a = i.replace(t, function (d, u, s, f) {
				return u + u + s + s + f + f;
			}),
			l = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a),
			r = parseInt(l[1], 16),
			n = parseInt(l[2], 16),
			h = parseInt(l[3], 16);
		return 'rgba(' + r + ',' + n + ',' + h + ',' + e + ')';
	}
	function Ne(i, e, t) {
		if (isNaN(i)) throw new Error('[uCharts] series\u6570\u636E\u9700\u4E3ANumber\u683C\u5F0F');
		(t = t || 10), (e = e || 'upper');
		for (var a = 1; t < 1; ) (t *= 10), (a *= 10);
		for (e === 'upper' ? (i = Math.ceil(i * a)) : (i = Math.floor(i * a)); i % t !== 0; )
			if (e === 'upper') {
				if (i == i + 1) break;
				i++;
			} else i--;
		return i / a;
	}
	function ta(i, e, t, a) {
		let l = [];
		for (let r = 0; r < i.length; r++) {
			let n = { data: [], name: e[r], color: t[r] };
			for (let h = 0, d = a.length; h < d; h++) {
				if (h < i[r]) {
					n.data.push(null);
					continue;
				}
				let u = 0;
				for (let s = 0; s < i[r]; s++) u += a[h - s][1];
				n.data.push(+(u / i[r]).toFixed(3));
			}
			l.push(n);
		}
		return l;
	}
	function Fe(i, e, t, a, l) {
		var r = l.width - l.area[1] - l.area[3],
			n = t.eachSpacing * (l.chartData.xAxisData.xAxisPoints.length - 1);
		l.type == 'mount' && l.extra && l.extra.mount && l.extra.mount.widthRatio && l.extra.mount.widthRatio > 1 && (l.extra.mount.widthRatio > 2 && (l.extra.mount.widthRatio = 2), (n += (l.extra.mount.widthRatio - 1) * t.eachSpacing));
		var h = e;
		return e >= 0 ? ((h = 0), i.uevent.trigger('scrollLeft'), (i.scrollOption.position = 'left'), (l.xAxis.scrollPosition = 'left')) : Math.abs(e) >= n - r ? ((h = r - n), i.uevent.trigger('scrollRight'), (i.scrollOption.position = 'right'), (l.xAxis.scrollPosition = 'right')) : ((i.scrollOption.position = e), (l.xAxis.scrollPosition = e)), h;
	}
	function Ge(i, e, t) {
		function a(l) {
			for (; l < 0; ) l += 2 * Math.PI;
			for (; l > 2 * Math.PI; ) l -= 2 * Math.PI;
			return l;
		}
		return (i = a(i)), (e = a(e)), (t = a(t)), e > t && ((t += 2 * Math.PI), i < e && (i += 2 * Math.PI)), i >= e && i <= t;
	}
	function ce(i, e) {
		function t(f, o) {
			return f[o - 1] && f[o + 1] ? f[o].y >= Math.max(f[o - 1].y, f[o + 1].y) || f[o].y <= Math.min(f[o - 1].y, f[o + 1].y) : !1;
		}
		function a(f, o) {
			return f[o - 1] && f[o + 1] ? f[o].x >= Math.max(f[o - 1].x, f[o + 1].x) || f[o].x <= Math.min(f[o - 1].x, f[o + 1].x) : !1;
		}
		var l = 0.2,
			r = 0.2,
			n = null,
			h = null,
			d = null,
			u = null;
		if ((e < 1 ? ((n = i[0].x + (i[1].x - i[0].x) * l), (h = i[0].y + (i[1].y - i[0].y) * l)) : ((n = i[e].x + (i[e + 1].x - i[e - 1].x) * l), (h = i[e].y + (i[e + 1].y - i[e - 1].y) * l)), e > i.length - 3)) {
			var s = i.length - 1;
			(d = i[s].x - (i[s].x - i[s - 1].x) * r), (u = i[s].y - (i[s].y - i[s - 1].y) * r);
		} else (d = i[e + 1].x - (i[e + 2].x - i[e].x) * r), (u = i[e + 1].y - (i[e + 2].y - i[e].y) * r);
		return (
			t(i, e + 1) && (u = i[e + 1].y),
			t(i, e) && (h = i[e].y),
			a(i, e + 1) && (d = i[e + 1].x),
			a(i, e) && (n = i[e].x),
			(h >= Math.max(i[e].y, i[e + 1].y) || h <= Math.min(i[e].y, i[e + 1].y)) && (h = i[e].y),
			(u >= Math.max(i[e].y, i[e + 1].y) || u <= Math.min(i[e].y, i[e + 1].y)) && (u = i[e + 1].y),
			(n >= Math.max(i[e].x, i[e + 1].x) || n <= Math.min(i[e].x, i[e + 1].x)) && (n = i[e].x),
			(d >= Math.max(i[e].x, i[e + 1].x) || d <= Math.min(i[e].x, i[e + 1].x)) && (d = i[e + 1].x),
			{ ctrA: { x: n, y: h }, ctrB: { x: d, y: u } }
		);
	}
	function ee(i, e, t) {
		return { x: t.x + i, y: t.y - e };
	}
	function la(i, e) {
		if (e) for (; de.isCollision(i, e); ) i.start.x > 0 ? i.start.y-- : i.start.x < 0 || i.start.y > 0 ? i.start.y++ : i.start.y--;
		return i;
	}
	function na(i, e, t) {
		let a = [];
		if (i.length > 0 && i[0].data.constructor.toString().indexOf('Array') > -1) {
			e._pieSeries_ = i;
			let r = i[0].data;
			for (var l = 0; l < r.length; l++) (r[l].formatter = i[0].formatter), (r[l].data = r[l].value), a.push(r[l]);
			e.series = a;
		} else a = i;
		return a;
	}
	function ke(i, e, t) {
		for (var a = 0, l = 0; l < i.length; l++) {
			let r = i[l];
			if ((r.color || ((r.color = t.color[a]), (a = (a + 1) % t.color.length)), r.linearIndex || (r.linearIndex = l), r.index || (r.index = 0), r.type || (r.type = e.type), typeof r.show > 'u' && (r.show = !0), r.type || (r.type = e.type), r.pointShape || (r.pointShape = 'circle'), !r.legendShape))
				switch (r.type) {
					case 'line':
						r.legendShape = 'line';
						break;
					case 'column':
					case 'bar':
						r.legendShape = 'rect';
						break;
					case 'area':
					case 'mount':
						r.legendShape = 'triangle';
						break;
					default:
						r.legendShape = 'circle';
				}
		}
		return i;
	}
	function ae(i, e, t, a) {
		var l = e || [];
		if ((i == 'custom' && l.length == 0 && (l = a.linearColor), i == 'custom' && l.length < t.length)) {
			let n = t.length - l.length;
			for (var r = 0; r < n; r++) l.push(a.linearColor[(r + 1) % a.linearColor.length]);
		}
		return l;
	}
	function ha(i, e) {
		var t = 0,
			a = e - i;
		return a >= 1e4 ? (t = 1e3) : a >= 1e3 ? (t = 100) : a >= 100 ? (t = 10) : a >= 10 ? (t = 5) : a >= 1 ? (t = 1) : a >= 0.1 ? (t = 0.1) : a >= 0.01 ? (t = 0.01) : a >= 0.001 ? (t = 0.001) : a >= 1e-4 ? (t = 1e-4) : a >= 1e-5 ? (t = 1e-5) : (t = 1e-6), { minRange: Ne(i, 'lower', t), maxRange: Ne(e, 'upper', t) };
	}
	function G(i, e, t) {
		var a = 0;
		if (((i = String(i)), (t = !1), t !== !1 && t !== void 0 && t.setFontSize && t.measureText)) return t.setFontSize(e), t.measureText(i).width;
		var i = i.split('');
		for (let r = 0; r < i.length; r++) {
			let n = i[r];
			/[a-zA-Z]/.test(n) ? (a += 7) : /[0-9]/.test(n) ? (a += 5.5) : /\./.test(n) ? (a += 2.7) : /-/.test(n) ? (a += 3.25) : /:/.test(n) ? (a += 2.5) : /[\u4e00-\u9fa5]/.test(n) ? (a += 10) : /\(|\)/.test(n) ? (a += 3.73) : /\s/.test(n) ? (a += 2.5) : /%/.test(n) ? (a += 8) : (a += 10);
		}
		return (a * e) / 10;
	}
	function Ae(i) {
		return i.reduce(function (e, t) {
			return (e.data ? e.data : e).concat(t.data);
		}, []);
	}
	function Xe(i, e) {
		for (var t = new Array(e), a = 0; a < t.length; a++) t[a] = 0;
		for (var l = 0; l < i.length; l++) for (var a = 0; a < t.length; a++) t[a] += i[l].data[a];
		return i.reduce(function (r, n) {
			return (r.data ? r.data : r).concat(n.data).concat(t);
		}, []);
	}
	function oe(i, e, t) {
		let a, l;
		return i.clientX ? (e.rotate ? ((l = e.height - i.clientX * e.pix), (a = (i.pageY - t.currentTarget.offsetTop - (e.height / e.pix / 2) * (e.pix - 1)) * e.pix)) : ((a = i.clientX * e.pix), (l = (i.pageY - t.currentTarget.offsetTop - (e.height / e.pix / 2) * (e.pix - 1)) * e.pix))) : e.rotate ? ((l = e.height - i.x * e.pix), (a = i.y * e.pix)) : ((a = i.x * e.pix), (l = i.y * e.pix)), { x: a, y: l };
	}
	function be(i, e, t) {
		var a = [],
			l = [],
			r = e.constructor.toString().indexOf('Array') > -1;
		if (r) {
			let h = $e(i);
			for (var n = 0; n < t.length; n++) l.push(h[t[n]]);
		} else l = i;
		for (let h = 0; h < l.length; h++) {
			let d = l[h],
				u = -1;
			if ((r ? (u = e[h]) : (u = e), d.data[u] !== null && typeof d.data[u] < 'u' && d.show)) {
				let s = {};
				(s.color = d.color), (s.type = d.type), (s.style = d.style), (s.pointShape = d.pointShape), (s.disableLegend = d.disableLegend), (s.name = d.name), (s.show = d.show), (s.data = d.formatter ? d.formatter(d.data[u]) : d.data[u]), a.push(s);
			}
		}
		return a;
	}
	function da(i, e, t) {
		var a = i.map(function (l) {
			return G(l, e, t);
		});
		return Math.max.apply(null, a);
	}
	function oa(i) {
		for (var e = (2 * Math.PI) / i, t = [], a = 0; a < i; a++) t.push(e * a);
		return t.map(function (l) {
			return -1 * l + Math.PI / 2;
		});
	}
	function He(i, e, t, a, l) {
		var r = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {},
			n = e.chartData.calPoints ? e.chartData.calPoints : [];
		let h = {};
		if (a.length > 0) {
			let s = [];
			for (let f = 0; f < a.length; f++) s.push(n[a[f]]);
			h = s[0][t[0]];
		} else
			for (let s = 0; s < n.length; s++)
				if (n[s][t]) {
					h = n[s][t];
					break;
				}
		var d = i.map(function (s) {
				let f = null;
				return e.categories && e.categories.length > 0 && (f = l[t]), { text: r.formatter ? r.formatter(s, f, t, e) : s.name + ': ' + s.data, color: s.color };
			}),
			u = { x: Math.round(h.x), y: Math.round(h.y) };
		return { textList: d, offset: u };
	}
	function sa(i, e, t, a) {
		var l = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {},
			r = e.chartData.xAxisPoints[t] + e.chartData.eachSpacing / 2,
			n = i.map(function (d) {
				return { text: l.formatter ? l.formatter(d, a[t], t, e) : d.name + ': ' + d.data, color: d.color, disableLegend: !!d.disableLegend };
			});
		n = n.filter(function (d) {
			if (d.disableLegend !== !0) return d;
		});
		var h = { x: Math.round(r), y: 0 };
		return { textList: n, offset: h };
	}
	function fa(i, e, t, a, l, r) {
		var n = t.chartData.calPoints;
		let h = r.color.upFill,
			d = r.color.downFill,
			u = [h, h, d, h];
		var s = [];
		e.map(function (m) {
			a == 0 ? (m.data[1] - m.data[0] < 0 ? (u[1] = d) : (u[1] = h)) : (m.data[0] < i[a - 1][1] && (u[0] = d), m.data[1] < m.data[0] && (u[1] = d), m.data[2] > i[a - 1][1] && (u[2] = h), m.data[3] < i[a - 1][1] && (u[3] = d));
			let c = { text: '\u5F00\u76D8\uFF1A' + m.data[0], color: u[0] },
				g = { text: '\u6536\u76D8\uFF1A' + m.data[1], color: u[1] },
				x = { text: '\u6700\u4F4E\uFF1A' + m.data[2], color: u[2] },
				v = { text: '\u6700\u9AD8\uFF1A' + m.data[3], color: u[3] };
			s.push(c, g, x, v);
		});
		var f = [],
			o = { x: 0, y: 0 };
		for (let m = 0; m < n.length; m++) {
			let c = n[m];
			typeof c[a] < 'u' && c[a] !== null && f.push(c[a]);
		}
		return (o.x = Math.round(f[0][0].x)), { textList: s, offset: o };
	}
	function $e(i) {
		let e = [];
		for (let t = 0; t < i.length; t++) i[t].show == !0 && e.push(i[t]);
		return e;
	}
	function ua(i, e, t, a) {
		var l = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0,
			r = { index: -1, group: [] },
			n = t.chartData.eachSpacing / 2;
		let h = [];
		if (e && e.length > 0) {
			if (!t.categories) n = 0;
			else {
				for (let d = 1; d < t.chartData.xAxisPoints.length; d++) h.push(t.chartData.xAxisPoints[d] - n);
				(t.type == 'line' || t.type == 'area') && t.xAxis.boundaryGap == 'justify' && (h = t.chartData.xAxisPoints);
			}
			if (Ve(i, t))
				if (t.categories)
					h.forEach(function (d, u) {
						i.x + l + n > d && (r.index = u);
					});
				else {
					let d = Array(e.length);
					for (let o = 0; o < e.length; o++) {
						d[o] = Array(e[o].length);
						for (let m = 0; m < e[o].length; m++) d[o][m] = Math.abs(e[o][m].x - i.x);
					}
					let u = Array(d.length),
						s = Array(d.length);
					for (let o = 0; o < d.length; o++) (u[o] = Math.min.apply(null, d[o])), (s[o] = d[o].indexOf(u[o]));
					let f = Math.min.apply(null, u);
					r.index = [];
					for (let o = 0; o < u.length; o++) u[o] == f && (r.group.push(o), r.index.push(s[o]));
				}
		}
		return r;
	}
	function ga(i, e, t, a) {
		var l = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0,
			r = { index: -1, group: [] },
			n = t.chartData.eachSpacing / 2;
		let h = t.chartData.yAxisPoints;
		return (
			e &&
				e.length > 0 &&
				Ve(i, t) &&
				h.forEach(function (d, u) {
					i.y + l + n > d && (r.index = u);
				}),
			r
		);
	}
	function ca(i, e, t) {
		let a = -1,
			l = 0;
		if (ya(i, e.area)) {
			let r = e.points,
				n = -1;
			for (let h = 0, d = r.length; h < d; h++) {
				let u = r[h];
				for (let s = 0; s < u.length; s++) {
					n += 1;
					let f = u[s].area;
					if (f && i.x > f[0] - l && i.x < f[2] + l && i.y > f[1] - l && i.y < f[3] + l) {
						a = n;
						break;
					}
				}
			}
			return a;
		}
		return a;
	}
	function ya(i, e) {
		return i.x > e.start.x && i.x < e.end.x && i.y > e.start.y && i.y < e.end.y;
	}
	function Ve(i, e, t) {
		return i.x <= e.width - e.area[1] + 10 && i.x >= e.area[3] - 10 && i.y >= e.area[0] && i.y <= e.height - e.area[2];
	}
	function ma(i, e, t) {
		var a = (2 * Math.PI) / t,
			l = -1;
		if (Ie(i, e.center, e.radius)) {
			var r = function (u) {
					return u < 0 && (u += 2 * Math.PI), u > 2 * Math.PI && (u -= 2 * Math.PI), u;
				},
				n = Math.atan2(e.center.y - i.y, i.x - e.center.x);
			(n = -1 * n), n < 0 && (n += 2 * Math.PI);
			var h = e.angleList.map(function (d) {
				return (d = r(-1 * d)), d;
			});
			h.forEach(function (d, u) {
				var s = r(d - a / 2),
					f = r(d + a / 2);
				f < s && (f += 2 * Math.PI), ((n >= s && n <= f) || (n + 2 * Math.PI >= s && n + 2 * Math.PI <= f)) && (l = u);
			});
		}
		return l;
	}
	function xa(i, e) {
		for (var t = -1, a = 0, l = e.series.length; a < l; a++) {
			var r = e.series[a];
			if (i.x > r.funnelArea[0] && i.x < r.funnelArea[2] && i.y > r.funnelArea[1] && i.y < r.funnelArea[3]) {
				t = a;
				break;
			}
		}
		return t;
	}
	function va(i, e) {
		for (var t = -1, a = 0, l = e.length; a < l; a++) {
			var r = e[a];
			if (i.x > r.area[0] && i.x < r.area[2] && i.y > r.area[1] && i.y < r.area[3]) {
				t = a;
				break;
			}
		}
		return t;
	}
	function ba(i, e) {
		for (var t = -1, a = e.chartData.mapData, l = e.series, r = ni(i.y, i.x, a.bounds, a.scale, a.xoffset, a.yoffset), n = [r.x, r.y], h = 0, d = l.length; h < d; h++) {
			var u = l[h].geometry.coordinates;
			if (di(n, u, e.chartData.mapData.mercator)) {
				t = h;
				break;
			}
		}
		return t;
	}
	function wa(i, e, t) {
		var a = -1,
			l = qe(t._series_, t.extra.rose.type, e.radius, e.radius);
		if (e && e.center && Ie(i, e.center, e.radius)) {
			var r = Math.atan2(e.center.y - i.y, i.x - e.center.x);
			(r = -r), t.extra.rose && t.extra.rose.offsetAngle && (r = r - (t.extra.rose.offsetAngle * Math.PI) / 180);
			for (var n = 0, h = l.length; n < h; n++)
				if (Ge(r, l[n]._start_, l[n]._start_ + l[n]._rose_proportion_ * 2 * Math.PI)) {
					a = n;
					break;
				}
		}
		return a;
	}
	function Ta(i, e, t) {
		var a = -1,
			l = Ee(e.series);
		if (e && e.center && Ie(i, e.center, e.radius)) {
			var r = Math.atan2(e.center.y - i.y, i.x - e.center.x);
			(r = -r), t.extra.pie && t.extra.pie.offsetAngle && (r = r - (t.extra.pie.offsetAngle * Math.PI) / 180), t.extra.ring && t.extra.ring.offsetAngle && (r = r - (t.extra.ring.offsetAngle * Math.PI) / 180);
			for (var n = 0, h = l.length; n < h; n++)
				if (Ge(r, l[n]._start_, l[n]._start_ + l[n]._proportion_ * 2 * Math.PI)) {
					a = n;
					break;
				}
		}
		return a;
	}
	function Ie(i, e, t) {
		return Math.pow(i.x - e.x, 2) + Math.pow(i.y - e.y, 2) <= Math.pow(t, 2);
	}
	function ye(i, e) {
		var t = [],
			a = [];
		return (
			i.forEach(function (l, r) {
				e.connectNulls ? l !== null && a.push(l) : l !== null ? a.push(l) : (a.length && t.push(a), (a = []));
			}),
			a.length && t.push(a),
			t
		);
	}
	function Aa(i, e, t, a, l) {
		let r = { area: { start: { x: 0, y: 0 }, end: { x: 0, y: 0 }, width: 0, height: 0, wholeWidth: 0, wholeHeight: 0 }, points: [], widthArr: [], heightArr: [] };
		if (e.legend.show === !1) return (a.legendData = r), r;
		let n = e.legend.padding * e.pix,
			h = e.legend.margin * e.pix,
			d = e.legend.fontSize ? e.legend.fontSize * e.pix : t.fontSize,
			u = 15 * e.pix,
			s = 5 * e.pix,
			f = Math.max(e.legend.lineHeight * e.pix, d);
		if (e.legend.position == 'top' || e.legend.position == 'bottom') {
			let o = [],
				m = 0,
				c = [],
				g = [];
			for (let x = 0; x < i.length; x++) {
				let v = i[x];
				const y = v.legendText ? v.legendText : v.name;
				let b = u + s + G(y || 'undefined', d, l) + e.legend.itemGap * e.pix;
				m + b > e.width - e.area[1] - e.area[3] ? (o.push(g), c.push(m - e.legend.itemGap * e.pix), (m = b), (g = [v])) : ((m += b), g.push(v));
			}
			if (g.length) {
				o.push(g), c.push(m - e.legend.itemGap * e.pix), (r.widthArr = c);
				let x = Math.max.apply(null, c);
				switch (e.legend.float) {
					case 'left':
						(r.area.start.x = e.area[3]), (r.area.end.x = e.area[3] + x + 2 * n);
						break;
					case 'right':
						(r.area.start.x = e.width - e.area[1] - x - 2 * n), (r.area.end.x = e.width - e.area[1]);
						break;
					default:
						(r.area.start.x = (e.width - x) / 2 - n), (r.area.end.x = (e.width + x) / 2 + n);
				}
				(r.area.width = x + 2 * n), (r.area.wholeWidth = x + 2 * n), (r.area.height = o.length * f + 2 * n), (r.area.wholeHeight = o.length * f + 2 * n + 2 * h), (r.points = o);
			}
		} else {
			let o = i.length,
				m = e.height - e.area[0] - e.area[2] - 2 * h - 2 * n,
				c = Math.min(Math.floor(m / f), o);
			switch (((r.area.height = c * f + n * 2), (r.area.wholeHeight = c * f + n * 2), e.legend.float)) {
				case 'top':
					(r.area.start.y = e.area[0] + h), (r.area.end.y = e.area[0] + h + r.area.height);
					break;
				case 'bottom':
					(r.area.start.y = e.height - e.area[2] - h - r.area.height), (r.area.end.y = e.height - e.area[2] - h);
					break;
				default:
					(r.area.start.y = (e.height - r.area.height) / 2), (r.area.end.y = (e.height + r.area.height) / 2);
			}
			let g = o % c === 0 ? o / c : Math.floor(o / c + 1),
				x = [];
			for (let v = 0; v < g; v++) {
				let y = i.slice(v * c, v * c + c);
				x.push(y);
			}
			if (((r.points = x), x.length)) {
				for (let y = 0; y < x.length; y++) {
					let b = x[y],
						w = 0;
					for (let S = 0; S < b.length; S++) {
						let D = u + s + G(b[S].name || 'undefined', d, l) + e.legend.itemGap * e.pix;
						D > w && (w = D);
					}
					r.widthArr.push(w), r.heightArr.push(b.length * f + n * 2);
				}
				let v = 0;
				for (let y = 0; y < r.widthArr.length; y++) v += r.widthArr[y];
				(r.area.width = v - e.legend.itemGap * e.pix + 2 * n), (r.area.wholeWidth = r.area.width + n);
			}
		}
		switch (e.legend.position) {
			case 'top':
				(r.area.start.y = e.area[0] + h), (r.area.end.y = e.area[0] + h + r.area.height);
				break;
			case 'bottom':
				(r.area.start.y = e.height - e.area[2] - r.area.height - h), (r.area.end.y = e.height - e.area[2] - h);
				break;
			case 'left':
				(r.area.start.x = e.area[3]), (r.area.end.x = e.area[3] + r.area.width);
				break;
			case 'right':
				(r.area.start.x = e.width - e.area[1] - r.area.width), (r.area.end.x = e.width - e.area[1]);
				break;
		}
		return (a.legendData = r), r;
	}
	function Ye(i, e, t, a, l) {
		var r = { angle: 0, xAxisHeight: t.xAxisHeight },
			n = e.xAxis.fontSize * e.pix || t.fontSize,
			h = i.map(function (u, s) {
				var f = e.xAxis.formatter ? e.xAxis.formatter(u, s, e) : u;
				return G(String(f), n, l);
			}),
			d = Math.max.apply(this, h);
		if (e.xAxis.rotateLabel == !0) {
			r.angle = (e.xAxis.rotateAngle * Math.PI) / 180;
			let u = 2 * t.xAxisTextPadding + Math.abs(d * Math.sin(r.angle));
			(u = u < n + 2 * t.xAxisTextPadding ? u + 2 * t.xAxisTextPadding : u), e.enableScroll == !0 && e.xAxis.scrollShow == !0 && (u += 12 * e.pix), (r.xAxisHeight = u);
		}
		return e.xAxis.disabled && (r.xAxisHeight = 0), r;
	}
	function Sa(i, e, t, a) {
		var l = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : -1,
			r;
		a == 'stack' ? (r = Xe(i, e.categories.length)) : (r = Ae(i));
		var n = [];
		(r = r.filter(function (g) {
			return typeof g == 'object' && g !== null ? (g.constructor.toString().indexOf('Array') > -1 ? g !== null : g.value !== null) : g !== null;
		})),
			r.map(function (g) {
				typeof g == 'object'
					? g.constructor.toString().indexOf('Array') > -1
						? e.type == 'candle'
							? g.map(function (x) {
									n.push(x);
							  })
							: n.push(g[0])
						: n.push(g.value)
					: n.push(g);
			});
		var h = 0,
			d = 0;
		if ((n.length > 0 && ((h = Math.min.apply(this, n)), (d = Math.max.apply(this, n))), l > -1 ? (typeof e.xAxis.data[l].min == 'number' && (h = Math.min(e.xAxis.data[l].min, h)), typeof e.xAxis.data[l].max == 'number' && (d = Math.max(e.xAxis.data[l].max, d))) : (typeof e.xAxis.min == 'number' && (h = Math.min(e.xAxis.min, h)), typeof e.xAxis.max == 'number' && (d = Math.max(e.xAxis.max, d))), h === d)) {
			var u = d || 10;
			d += u;
		}
		for (var s = h, f = d, o = [], m = (f - s) / e.xAxis.splitNumber, c = 0; c <= e.xAxis.splitNumber; c++) o.push(s + m * c);
		return o;
	}
	function _a(i, e, t, a) {
		var l = F({}, { type: '' }, e.extra.bar),
			r = { angle: 0, xAxisHeight: t.xAxisHeight };
		(r.ranges = Sa(i, e, t, l.type)),
			(r.rangesFormat = r.ranges.map(function (s) {
				return (s = de.toFixed(s, 2)), s;
			}));
		var n = r.ranges.map(function (s) {
			return (s = de.toFixed(s, 2)), s;
		});
		r = Object.assign(r, we(n, e));
		var h = r.eachSpacing,
			d = n.map(function (s) {
				return G(s, e.xAxis.fontSize * e.pix || t.fontSize, a);
			}),
			u = Math.max.apply(this, d);
		return u + 2 * t.xAxisTextPadding > h && ((r.angle = (45 * Math.PI) / 180), (r.xAxisHeight = 2 * t.xAxisTextPadding + u * Math.sin(r.angle))), e.xAxis.disabled === !0 && (r.xAxisHeight = 0), r;
	}
	function Pa(i, e, t, a, l) {
		var r = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 1,
			n = l.extra.radar || {};
		n.max = n.max || 0;
		var h = Math.max(n.max, Math.max.apply(null, Ae(a))),
			d = [];
		for (let u = 0; u < a.length; u++) {
			let s = a[u],
				f = {};
			(f.color = s.color),
				(f.legendShape = s.legendShape),
				(f.pointShape = s.pointShape),
				(f.data = []),
				s.data.forEach(function (o, m) {
					let c = {};
					(c.angle = i[m]), (c.proportion = o / h), (c.value = o), (c.position = ee(t * c.proportion * r * Math.cos(c.angle), t * c.proportion * r * Math.sin(c.angle), e)), f.data.push(c);
				}),
				d.push(f);
		}
		return d;
	}
	function Ee(i, e) {
		var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1,
			a = 0,
			l = 0;
		for (let r = 0; r < i.length; r++) {
			let n = i[r];
			(n.data = n.data === null ? 0 : n.data), (a += n.data);
		}
		for (let r = 0; r < i.length; r++) {
			let n = i[r];
			(n.data = n.data === null ? 0 : n.data), a === 0 ? (n._proportion_ = (1 / i.length) * t) : (n._proportion_ = (n.data / a) * t), (n._radius_ = e);
		}
		for (let r = 0; r < i.length; r++) {
			let n = i[r];
			(n._start_ = l), (l += 2 * n._proportion_ * Math.PI);
		}
		return i;
	}
	function Ca(i, e, t, a) {
		var l = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1;
		i = i.sort(function (r, n) {
			return parseInt(n.data) - parseInt(r.data);
		});
		for (let r = 0; r < i.length; r++) t == 'funnel' ? (i[r].radius = (i[r].data / i[0].data) * e * l) : (i[r].radius = ((a * (i.length - r)) / (a * i.length)) * e * l), (i[r]._proportion_ = i[r].data / i[0].data);
		return t !== 'pyramid' && i.reverse(), i;
	}
	function qe(i, e, t, a) {
		var l = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1,
			r = 0,
			n = 0,
			h = [];
		for (let f = 0; f < i.length; f++) {
			let o = i[f];
			(o.data = o.data === null ? 0 : o.data), (r += o.data), h.push(o.data);
		}
		var d = Math.min.apply(null, h),
			u = Math.max.apply(null, h),
			s = a - t;
		for (let f = 0; f < i.length; f++) {
			let o = i[f];
			(o.data = o.data === null ? 0 : o.data), r === 0 ? ((o._proportion_ = (1 / i.length) * l), (o._rose_proportion_ = (1 / i.length) * l)) : ((o._proportion_ = (o.data / r) * l), e == 'area' ? (o._rose_proportion_ = (1 / i.length) * l) : (o._rose_proportion_ = (o.data / r) * l)), (o._radius_ = t + s * ((o.data - d) / (u - d)) || a);
		}
		for (let f = 0; f < i.length; f++) {
			let o = i[f];
			(o._start_ = n), (n += 2 * o._rose_proportion_ * Math.PI);
		}
		return i;
	}
	function pa(i, e) {
		var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
		t == 1 && (t = 0.999999);
		for (let a = 0; a < i.length; a++) {
			let l = i[a];
			l.data = l.data === null ? 0 : l.data;
			let r;
			e.type == 'circle' ? (r = 2) : e.endAngle < e.startAngle ? (r = 2 + e.endAngle - e.startAngle) : (r = e.startAngle - e.endAngle), (l._proportion_ = r * l.data * t + e.startAngle), l._proportion_ >= 2 && (l._proportion_ = l._proportion_ % 2);
		}
		return i;
	}
	function Da(i, e) {
		var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
		t == 1 && (t = 0.999999);
		for (let a = 0; a < i.length; a++) {
			let l = i[a];
			l.data = l.data === null ? 0 : l.data;
			let r;
			e.type == 'circle' ? (r = 2) : e.endAngle < e.startAngle ? (r = 2 + e.endAngle - e.startAngle) : (r = e.startAngle - e.endAngle), (l._proportion_ = r * l.data * t + e.startAngle), l._proportion_ >= 2 && (l._proportion_ = l._proportion_ % 2);
		}
		return i;
	}
	function La(i, e, t) {
		let a = e - t + 1,
			l = e;
		for (let r = 0; r < i.length; r++) (i[r].value = i[r].value === null ? 0 : i[r].value), (i[r]._startAngle_ = l), (i[r]._endAngle_ = a * i[r].value + e), i[r]._endAngle_ >= 2 && (i[r]._endAngle_ = i[r]._endAngle_ % 2), (l = i[r]._endAngle_);
		return i;
	}
	function Ma(i, e, t) {
		let a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 1;
		for (let l = 0; l < i.length; l++) {
			let r = i[l];
			if (((r.data = r.data === null ? 0 : r.data), t.pointer.color == 'auto')) {
				for (let h = 0; h < e.length; h++)
					if (r.data <= e[h].value) {
						r.color = e[h].color;
						break;
					}
			} else r.color = t.pointer.color;
			let n = t.startAngle - t.endAngle + 1;
			(r._endAngle_ = n * r.data + t.startAngle), (r._oldAngle_ = t.oldAngle), t.oldAngle < t.endAngle && (r._oldAngle_ += 2), r.data >= t.oldData ? (r._proportion_ = (r._endAngle_ - r._oldAngle_) * a + t.oldAngle) : (r._proportion_ = r._oldAngle_ - (r._oldAngle_ - r._endAngle_) * a), r._proportion_ >= 2 && (r._proportion_ = r._proportion_ % 2);
		}
		return i;
	}
	function Fa(i, e, t, a) {
		i = Ee(i);
		let l = 0;
		for (let r = 0; r < i.length; r++) {
			let n = i[r],
				h = n.formatter ? n.formatter(+n._proportion_.toFixed(2)) : de.toFixed(n._proportion_ * 100) + '%';
			l = Math.max(l, G(h, n.textSize * a.pix || e.fontSize, t));
		}
		return l;
	}
	function Se(i, e, t, a, l, r) {
		return i.map(function (n) {
			if (n === null) return null;
			var h = 0,
				d = 0;
			return (
				r.type == 'mix' ? ((h = r.extra.mix.column.seriesGap * r.pix || 0), (d = r.extra.mix.column.categoryGap * r.pix || 0)) : ((h = r.extra.column.seriesGap * r.pix || 0), (d = r.extra.column.categoryGap * r.pix || 0)),
				(h = Math.min(h, e / t)),
				(d = Math.min(d, e / t)),
				(n.width = Math.ceil((e - 2 * d - h * (t - 1)) / t)),
				r.extra.mix && r.extra.mix.column.width && +r.extra.mix.column.width > 0 && (n.width = Math.min(n.width, +r.extra.mix.column.width * r.pix)),
				r.extra.column && r.extra.column.width && +r.extra.column.width > 0 && (n.width = Math.min(n.width, +r.extra.column.width * r.pix)),
				n.width <= 0 && (n.width = 1),
				(n.x += (a + 0.5 - t / 2) * (n.width + h)),
				n
			);
		});
	}
	function je(i, e, t, a, l, r) {
		return i.map(function (n) {
			if (n === null) return null;
			var h = 0,
				d = 0;
			return (h = r.extra.bar.seriesGap * r.pix || 0), (d = r.extra.bar.categoryGap * r.pix || 0), (h = Math.min(h, e / t)), (d = Math.min(d, e / t)), (n.width = Math.ceil((e - 2 * d - h * (t - 1)) / t)), r.extra.bar && r.extra.bar.width && +r.extra.bar.width > 0 && (n.width = Math.min(n.width, +r.extra.bar.width * r.pix)), n.width <= 0 && (n.width = 1), (n.y += (a + 0.5 - t / 2) * (n.width + h)), n;
		});
	}
	function ka(i, e, t, a, l, r, n) {
		var h = r.extra.column.categoryGap * r.pix || 0;
		return i.map(function (d) {
			return d === null ? null : ((d.width = e - 2 * h), r.extra.column && r.extra.column.width && +r.extra.column.width > 0 && (d.width = Math.min(d.width, +r.extra.column.width * r.pix)), a > 0 && (d.width -= n), d);
		});
	}
	function Ia(i, e, t, a, l, r, n) {
		var h = r.extra.column.categoryGap * r.pix || 0;
		return i.map(function (d, u) {
			return d === null ? null : ((d.width = Math.ceil(e - 2 * h)), r.extra.column && r.extra.column.width && +r.extra.column.width > 0 && (d.width = Math.min(d.width, +r.extra.column.width * r.pix)), d.width <= 0 && (d.width = 1), d);
		});
	}
	function Ea(i, e, t, a, l, r, n) {
		var h = r.extra.bar.categoryGap * r.pix || 0;
		return i.map(function (d, u) {
			return d === null ? null : ((d.width = Math.ceil(e - 2 * h)), r.extra.bar && r.extra.bar.width && +r.extra.bar.width > 0 && (d.width = Math.min(d.width, +r.extra.bar.width * r.pix)), d.width <= 0 && (d.width = 1), d);
		});
	}
	function we(i, e, t) {
		var a = e.width - e.area[1] - e.area[3],
			l = e.enableScroll ? Math.min(e.xAxis.itemCount, i.length) : i.length;
		(e.type == 'line' || e.type == 'area' || e.type == 'scatter' || e.type == 'bubble' || e.type == 'bar') && l > 1 && e.xAxis.boundaryGap == 'justify' && (l -= 1);
		var r = 0;
		e.type == 'mount' && e.extra && e.extra.mount && e.extra.mount.widthRatio && e.extra.mount.widthRatio > 1 && (e.extra.mount.widthRatio > 2 && (e.extra.mount.widthRatio = 2), (r = e.extra.mount.widthRatio - 1), (l += r));
		var n = a / l,
			h = [],
			d = e.area[3],
			u = e.width - e.area[1];
		return (
			i.forEach(function (s, f) {
				h.push(d + (r / 2) * n + f * n);
			}),
			e.xAxis.boundaryGap !== 'justify' && (e.enableScroll === !0 ? h.push(d + r * n + i.length * n) : h.push(u)),
			{ xAxisPoints: h, startX: d, endX: u, eachSpacing: n }
		);
	}
	function Ra(i, e, t, a, l, r, n) {
		var h = arguments.length > 7 && arguments[7] !== void 0 ? arguments[7] : 1,
			d = [],
			u = r.height - r.area[0] - r.area[2];
		return (
			i.forEach(function (s, f) {
				if (s === null) d.push(null);
				else {
					var o = [];
					s.forEach(function (m, c) {
						var g = {};
						g.x = a[f] + Math.round(l / 2);
						var x = m.value || m,
							v = (u * (x - e)) / (t - e);
						(v *= h), (g.y = r.height - Math.round(v) - r.area[2]), o.push(g);
					}),
						d.push(o);
				}
			}),
			d
		);
	}
	function K(i, e, t, a, l, r, n) {
		var h = arguments.length > 7 && arguments[7] !== void 0 ? arguments[7] : 1,
			d = 'center';
		(r.type == 'line' || r.type == 'area' || r.type == 'scatter' || r.type == 'bubble') && (d = r.xAxis.boundaryGap);
		var u = [],
			s = r.height - r.area[0] - r.area[2],
			f = r.width - r.area[1] - r.area[3];
		return (
			i.forEach(function (o, m) {
				if (o === null) u.push(null);
				else {
					var c = {};
					(c.color = o.color), (c.x = a[m]);
					var g = o;
					if (typeof o == 'object' && o !== null)
						if (o.constructor.toString().indexOf('Array') > -1) {
							let v, y, b;
							(v = [].concat(r.chartData.xAxisData.ranges)), (y = v.shift()), (b = v.pop()), (g = o[1]), (c.x = r.area[3] + (f * (o[0] - y)) / (b - y)), r.type == 'bubble' && ((c.r = o[2]), (c.t = o[3]));
						} else g = o.value;
					d == 'center' && (c.x += l / 2);
					var x = (s * (g - e)) / (t - e);
					(x *= h), (c.y = r.height - x - r.area[2]), u.push(c);
				}
			}),
			u
		);
	}
	function Ue(i, e, t, a, l, r, n) {
		var h = arguments.length > 7 && arguments[7] !== void 0 ? arguments[7] : 1,
			d = [],
			u = r.height - r.area[0] - r.area[2];
		r.width - r.area[1] - r.area[3];
		var s = l * n.widthRatio;
		return (
			i.forEach(function (f, o) {
				if (f === null) d.push(null);
				else {
					var m = {};
					(m.color = f.color), (m.x = a[o]), (m.x += l / 2);
					var c = f.data,
						g = (u * (c - e)) / (t - e);
					(g *= h), (m.y = r.height - g - r.area[2]), (m.value = c), (m.width = s), d.push(m);
				}
			}),
			d
		);
	}
	function Je(i, e, t, a, l, r, n) {
		var h = arguments.length > 7 && arguments[7] !== void 0 ? arguments[7] : 1,
			d = [];
		r.height - r.area[0] - r.area[2];
		var u = r.width - r.area[1] - r.area[3];
		return (
			i.forEach(function (s, f) {
				if (s === null) d.push(null);
				else {
					var o = {};
					(o.color = s.color), (o.y = a[f]);
					var m = s;
					typeof s == 'object' && s !== null && (m = s.value);
					var c = (u * (m - e)) / (t - e);
					(c *= h), (o.height = c), (o.value = m), (o.x = c + r.area[3]), d.push(o);
				}
			}),
			d
		);
	}
	function Re(i, e, t, a, l, r, n, h, d) {
		var u = arguments.length > 9 && arguments[9] !== void 0 ? arguments[9] : 1,
			s = [],
			f = r.height - r.area[0] - r.area[2];
		return (
			i.forEach(function (o, m) {
				if (o === null) s.push(null);
				else {
					var c = {};
					if (((c.color = o.color), (c.x = a[m] + Math.round(l / 2)), h > 0)) {
						var g = 0;
						for (let w = 0; w <= h; w++) g += d[w].data[m];
						var x = g - o,
							v = (f * (g - e)) / (t - e),
							y = (f * (x - e)) / (t - e);
					} else
						var g = o,
							v = (f * (g - e)) / (t - e),
							y = 0;
					var b = y;
					(v *= u), (b *= u), (c.y = r.height - Math.round(v) - r.area[2]), (c.y0 = r.height - Math.round(b) - r.area[2]), s.push(c);
				}
			}),
			s
		);
	}
	function Oe(i, e, t, a, l, r, n, h, d) {
		var u = arguments.length > 9 && arguments[9] !== void 0 ? arguments[9] : 1,
			s = [],
			f = r.width - r.area[1] - r.area[3];
		return (
			i.forEach(function (o, m) {
				if (o === null) s.push(null);
				else {
					var c = {};
					if (((c.color = o.color), (c.y = a[m]), h > 0)) {
						var g = 0;
						for (let w = 0; w <= h; w++) g += d[w].data[m];
						var x = g - o,
							v = (f * (g - e)) / (t - e),
							y = (f * (x - e)) / (t - e);
					} else
						var g = o,
							v = (f * (g - e)) / (t - e),
							y = 0;
					var b = y;
					(v *= u), (b *= u), (c.height = v - b), (c.x = r.area[3] + v), (c.x0 = r.area[3] + b), s.push(c);
				}
			}),
			s
		);
	}
	function Ze(i, e, t, a, l) {
		var r;
		a == 'stack' ? (r = Xe(i, e.categories.length)) : (r = Ae(i));
		var n = [];
		(r = r.filter(function (g) {
			return typeof g == 'object' && g !== null ? (g.constructor.toString().indexOf('Array') > -1 ? g !== null : g.value !== null) : g !== null;
		})),
			r.map(function (g) {
				typeof g == 'object'
					? g.constructor.toString().indexOf('Array') > -1
						? e.type == 'candle'
							? g.map(function (x) {
									n.push(x);
							  })
							: n.push(g[1])
						: n.push(g.value)
					: n.push(g);
			});
		var h = l.min || 0,
			d = l.max || 0;
		n.length > 0 && ((h = Math.min.apply(this, n)), (d = Math.max.apply(this, n))), h === d && (d == 0 ? (d = 10) : (h = 0));
		for (var u = ha(h, d), s = l.min === void 0 || l.min === null ? u.minRange : l.min, f = l.max === void 0 || l.max === null ? u.maxRange : l.max, o = [], m = (f - s) / e.yAxis.splitNumber, c = 0; c <= e.yAxis.splitNumber; c++) o.push(s + m * c);
		return o.reverse();
	}
	function Be(i, e, t, a) {
		var l = F({}, { type: '' }, e.extra.column),
			r = e.yAxis.data.length,
			n = new Array(r);
		if (r > 0) {
			for (let f = 0; f < r; f++) {
				n[f] = [];
				for (let o = 0; o < i.length; o++) i[o].index == f && n[f].push(i[o]);
			}
			var h = new Array(r),
				d = new Array(r),
				u = new Array(r);
			for (let f = 0; f < r; f++) {
				let o = e.yAxis.data[f];
				e.yAxis.disabled == !0 && (o.disabled = !0), o.type === 'categories' ? (o.formatter || (o.formatter = (g, x, v) => g + (o.unit || '')), (o.categories = o.categories || e.categories), (h[f] = o.categories)) : (o.formatter || (o.formatter = (g, x, v) => g.toFixed(o.tofix) + (o.unit || '')), (h[f] = Ze(n[f], e, t, l.type, o)));
				let m = o.fontSize * e.pix || t.fontSize;
				(u[f] = { position: o.position ? o.position : 'left', width: 0 }),
					(d[f] = h[f].map(function (g, x) {
						return (g = o.formatter(g, x, e)), (u[f].width = Math.max(u[f].width, G(g, m, a) + 5)), g;
					}));
				let c = o.calibration ? 4 * e.pix : 0;
				(u[f].width += c + 3 * e.pix), o.disabled === !0 && (u[f].width = 0);
			}
		} else {
			var h = new Array(1),
				d = new Array(1),
				u = new Array(1);
			e.type === 'bar' ? ((h[0] = e.categories), e.yAxis.formatter || (e.yAxis.formatter = (c, g, x) => c + (x.yAxis.unit || ''))) : (e.yAxis.formatter || (e.yAxis.formatter = (c, g, x) => c.toFixed(x.yAxis.tofix) + (x.yAxis.unit || '')), (h[0] = Ze(i, e, t, l.type, {}))), (u[0] = { position: 'left', width: 0 });
			var s = e.yAxis.fontSize * e.pix || t.fontSize;
			(d[0] = h[0].map(function (c, g) {
				return (c = e.yAxis.formatter(c, g, e)), (u[0].width = Math.max(u[0].width, G(c, s, a) + 5)), c;
			})),
				(u[0].width += 3 * e.pix),
				e.yAxis.disabled === !0 ? ((u[0] = { position: 'left', width: 0 }), (e.yAxis.data[0] = { disabled: !0 })) : ((e.yAxis.data[0] = { disabled: !1, position: 'left', max: e.yAxis.max, min: e.yAxis.min, formatter: e.yAxis.formatter }), e.type === 'bar' && ((e.yAxis.data[0].categories = e.categories), (e.yAxis.data[0].type = 'categories')));
		}
		return { rangesFormat: d, ranges: h, yAxisWidth: u };
	}
	function Oa(i, e, t, a, l) {
		let r = [].concat(t.chartData.yAxisData.ranges),
			n = t.height - t.area[0] - t.area[2],
			h = t.area[0],
			d = [];
		for (let u = 0; u < r.length; u++) {
			let s = r[u].shift(),
				f = r[u].pop(),
				o = s - ((s - f) * (i - h)) / n;
			(o = t.yAxis.data[u].formatter ? t.yAxis.data[u].formatter(o, u, t) : o.toFixed(0)), d.push(String(o));
		}
		return d;
	}
	function Ba(i, e) {
		let t,
			a,
			l = e.height - e.area[0] - e.area[2];
		for (let r = 0; r < i.length; r++) {
			i[r].yAxisIndex = i[r].yAxisIndex ? i[r].yAxisIndex : 0;
			let n = [].concat(e.chartData.yAxisData.ranges[i[r].yAxisIndex]);
			(t = n.pop()), (a = n.shift());
			let h = (l * (i[r].value - t)) / (a - t);
			i[r].y = e.height - Math.round(h) - e.area[2];
		}
		return i;
	}
	function Y(i, e) {
		e.rotateLock !== !0 ? (i.translate(e.height, 0), i.rotate((90 * Math.PI) / 180)) : e._rotate_ !== !0 && (i.translate(e.height, 0), i.rotate((90 * Math.PI) / 180), (e._rotate_ = !0));
	}
	function _e(i, e, t, a, l) {
		if ((a.beginPath(), l.dataPointShapeType == 'hollow' ? (a.setStrokeStyle(e), a.setFillStyle(l.background), a.setLineWidth(2 * l.pix)) : (a.setStrokeStyle('#ffffff'), a.setFillStyle(e), a.setLineWidth(1 * l.pix)), t === 'diamond'))
			i.forEach(function (r, n) {
				r !== null && (a.moveTo(r.x, r.y - 4.5), a.lineTo(r.x - 4.5, r.y), a.lineTo(r.x, r.y + 4.5), a.lineTo(r.x + 4.5, r.y), a.lineTo(r.x, r.y - 4.5));
			});
		else if (t === 'circle')
			i.forEach(function (r, n) {
				r !== null && (a.moveTo(r.x + 2.5 * l.pix, r.y), a.arc(r.x, r.y, 3 * l.pix, 0, 2 * Math.PI, !1));
			});
		else if (t === 'square')
			i.forEach(function (r, n) {
				r !== null && (a.moveTo(r.x - 3.5, r.y - 3.5), a.rect(r.x - 3.5, r.y - 3.5, 7, 7));
			});
		else if (t === 'triangle')
			i.forEach(function (r, n) {
				r !== null && (a.moveTo(r.x, r.y - 4.5), a.lineTo(r.x - 4.5, r.y + 4.5), a.lineTo(r.x + 4.5, r.y + 4.5), a.lineTo(r.x, r.y - 4.5));
			});
		else if (t === 'triangle') return;
		a.closePath(), a.fill(), a.stroke();
	}
	function We(i, e, t, a) {
		var l = i.title.fontSize || e.titleFontSize,
			r = i.subtitle.fontSize || e.subtitleFontSize,
			n = i.title.name || '',
			h = i.subtitle.name || '',
			d = i.title.color || i.fontColor,
			u = i.subtitle.color || i.fontColor,
			s = n ? l : 0,
			f = h ? r : 0,
			o = 5;
		if (h) {
			var m = G(h, r * i.pix, t),
				c = a.x - m / 2 + (i.subtitle.offsetX || 0) * i.pix,
				g = a.y + (r * i.pix) / 2 + (i.subtitle.offsetY || 0) * i.pix;
			n && (g += (s * i.pix + o) / 2), t.beginPath(), t.setFontSize(r * i.pix), t.setFillStyle(u), t.fillText(h, c, g), t.closePath(), t.stroke();
		}
		if (n) {
			var x = G(n, l * i.pix, t),
				v = a.x - x / 2 + (i.title.offsetX || 0),
				y = a.y + (l * i.pix) / 2 + (i.title.offsetY || 0) * i.pix;
			h && (y -= (f * i.pix + o) / 2), t.beginPath(), t.setFontSize(l * i.pix), t.setFillStyle(d), t.fillText(n, v, y), t.closePath(), t.stroke();
		}
	}
	function se(i, e, t, a, l) {
		var r = e.data,
			n = e.textOffset ? e.textOffset : 0;
		i.forEach(function (h, d) {
			if (h !== null) {
				a.beginPath();
				var u = e.textSize ? e.textSize * l.pix : t.fontSize;
				a.setFontSize(u), a.setFillStyle(e.textColor || l.fontColor);
				var s = r[d];
				typeof r[d] == 'object' && r[d] !== null && (r[d].constructor.toString().indexOf('Array') > -1 ? (s = r[d][1]) : (s = r[d].value));
				var f = e.formatter ? e.formatter(s, d, e, l) : s;
				a.setTextAlign('center'), a.fillText(String(f), h.x, h.y - 4 + n * l.pix), a.closePath(), a.stroke(), a.setTextAlign('left');
			}
		});
	}
	function Wa(i, e, t, a, l) {
		e.data;
		var r = e.textOffset ? e.textOffset : 0;
		i.forEach(function (n, h) {
			if (n !== null) {
				a.beginPath();
				var d = e[h].textSize ? e[h].textSize * l.pix : t.fontSize;
				a.setFontSize(d), a.setFillStyle(e[h].textColor || l.fontColor);
				var u = n.value,
					s = e[h].formatter ? e[h].formatter(u, h, e, l) : u;
				a.setTextAlign('center'), a.fillText(String(s), n.x, n.y - 4 + r * l.pix), a.closePath(), a.stroke(), a.setTextAlign('left');
			}
		});
	}
	function Ke(i, e, t, a, l) {
		var r = e.data;
		e.textOffset && e.textOffset,
			i.forEach(function (n, h) {
				if (n !== null) {
					a.beginPath();
					var d = e.textSize ? e.textSize * l.pix : t.fontSize;
					a.setFontSize(d), a.setFillStyle(e.textColor || l.fontColor);
					var u = r[h];
					typeof r[h] == 'object' && r[h] !== null && (u = r[h].value);
					var s = e.formatter ? e.formatter(u, h, e, l) : u;
					a.setTextAlign('left'), a.fillText(String(s), n.x + 4 * l.pix, n.y + d / 2 - 3), a.closePath(), a.stroke();
				}
			});
	}
	function za(i, e, t, a, l, r) {
		(e -= i.width / 2 + i.labelOffset * a.pix), (e = e < 10 ? 10 : e);
		let h = (i.startAngle - i.endAngle + 1) / i.splitLine.splitNumber,
			u = (i.endNumber - i.startNumber) / i.splitLine.splitNumber,
			s = i.startAngle,
			f = i.startNumber;
		for (let x = 0; x < i.splitLine.splitNumber + 1; x++) {
			var o = { x: e * Math.cos(s * Math.PI), y: e * Math.sin(s * Math.PI) },
				m = i.formatter ? i.formatter(f, x, a) : f;
			(o.x += t.x - G(m, l.fontSize, r) / 2), (o.y += t.y);
			var c = o.x,
				g = o.y;
			r.beginPath(), r.setFontSize(l.fontSize), r.setFillStyle(i.labelColor || a.fontColor), r.fillText(m, c, g + l.fontSize / 2), r.closePath(), r.stroke(), (s += h), s >= 2 && (s = s % 2), (f += u);
		}
	}
	function Na(i, e, t, a, l, r) {
		var n = a.extra.radar || {};
		i.forEach(function (h, d) {
			if (n.labelPointShow === !0 && a.categories[d] !== '') {
				var u = { x: e * Math.cos(h), y: e * Math.sin(h) },
					s = ee(u.x, u.y, t);
				r.setFillStyle(n.labelPointColor), r.beginPath(), r.arc(s.x, s.y, n.labelPointRadius * a.pix, 0, 2 * Math.PI, !1), r.closePath(), r.fill();
			}
			var f = { x: (e + l.radarLabelTextMargin * a.pix) * Math.cos(h), y: (e + l.radarLabelTextMargin * a.pix) * Math.sin(h) },
				o = ee(f.x, f.y, t),
				m = o.x,
				c = o.y;
			de.approximatelyEqual(f.x, 0) ? (m -= G(a.categories[d] || '', l.fontSize, r) / 2) : f.x < 0 && (m -= G(a.categories[d] || '', l.fontSize, r)), r.beginPath(), r.setFontSize(l.fontSize), r.setFillStyle(n.labelColor || a.fontColor), r.fillText(a.categories[d] || '', m, c + l.fontSize / 2), r.closePath(), r.stroke();
		});
	}
	function Qe(i, e, t, a, l, r) {
		var n = t.pieChartLinePadding,
			h = [],
			d = null,
			u = i.map(function (s, f) {
				var o = s.formatter ? s.formatter(s, f, i, e) : de.toFixed(s._proportion_.toFixed(4) * 100) + '%';
				o = s.labelText ? s.labelText : o;
				var m = 2 * Math.PI - (s._start_ + (2 * Math.PI * s._proportion_) / 2);
				s._rose_proportion_ && (m = 2 * Math.PI - (s._start_ + (2 * Math.PI * s._rose_proportion_) / 2));
				var c = s.color,
					g = s._radius_;
				return { arc: m, text: o, color: c, radius: g, textColor: s.textColor, textSize: s.textSize, labelShow: s.labelShow };
			});
		for (let s = 0; s < u.length; s++) {
			let f = u[s],
				o = Math.cos(f.arc) * (f.radius + n),
				m = Math.sin(f.arc) * (f.radius + n),
				c = Math.cos(f.arc) * f.radius,
				g = Math.sin(f.arc) * f.radius,
				x = o >= 0 ? o + t.pieChartTextPadding : o - t.pieChartTextPadding,
				v = m,
				y = G(f.text, f.textSize * e.pix || t.fontSize, a),
				b = v;
			d && de.isSameXCoordinateArea(d.start, { x }) && (x > 0 ? (b = Math.min(v, d.start.y)) : o < 0 || v > 0 ? (b = Math.max(v, d.start.y)) : (b = Math.min(v, d.start.y))), x < 0 && (x -= y);
			let w = { lineStart: { x: c, y: g }, lineEnd: { x: o, y: m }, start: { x, y: b }, width: y, height: t.fontSize, text: f.text, color: f.color, textColor: f.textColor, textSize: f.textSize };
			(d = la(w, d)), h.push(d);
		}
		for (let s = 0; s < h.length; s++) {
			if (u[s].labelShow === !1) continue;
			let f = h[s],
				o = ee(f.lineStart.x, f.lineStart.y, r),
				m = ee(f.lineEnd.x, f.lineEnd.y, r),
				c = ee(f.start.x, f.start.y, r);
			a.setLineWidth(1 * e.pix), a.setFontSize(f.textSize * e.pix || t.fontSize), a.beginPath(), a.setStrokeStyle(f.color), a.setFillStyle(f.color), a.moveTo(o.x, o.y);
			let g = f.start.x < 0 ? c.x + f.width : c.x,
				x = f.start.x < 0 ? c.x - 5 : c.x + 5;
			a.quadraticCurveTo(m.x, m.y, g, c.y), a.moveTo(o.x, o.y), a.stroke(), a.closePath(), a.beginPath(), a.moveTo(c.x + f.width, c.y), a.arc(g, c.y, 2 * e.pix, 0, 2 * Math.PI), a.closePath(), a.fill(), a.beginPath(), a.setFontSize(f.textSize * e.pix || t.fontSize), a.setFillStyle(f.textColor || e.fontColor), a.fillText(f.text, x, c.y + 3), a.closePath(), a.stroke(), a.closePath();
		}
	}
	function Ga(i, e, t, a) {
		var l = e.extra.tooltip || {};
		(l.gridType = l.gridType == null ? 'solid' : l.gridType), (l.dashLength = l.dashLength == null ? 4 : l.dashLength);
		var r = e.area[0],
			n = e.height - e.area[2];
		if ((l.gridType == 'dash' && a.setLineDash([l.dashLength, l.dashLength]), a.setStrokeStyle(l.gridColor || '#cccccc'), a.setLineWidth(1 * e.pix), a.beginPath(), a.moveTo(i, r), a.lineTo(i, n), a.stroke(), a.setLineDash([]), l.xAxisLabel)) {
			let h = e.categories[e.tooltip.index];
			a.setFontSize(t.fontSize);
			let d = G(h, t.fontSize, a),
				u = i - 0.5 * d,
				s = n;
			a.beginPath(),
				a.setFillStyle(P(l.labelBgColor || t.toolTipBackground, l.labelBgOpacity || t.toolTipOpacity)),
				a.setStrokeStyle(l.labelBgColor || t.toolTipBackground),
				a.setLineWidth(1 * e.pix),
				a.rect(u - t.toolTipPadding, s, d + 2 * t.toolTipPadding, t.fontSize + 2 * t.toolTipPadding),
				a.closePath(),
				a.stroke(),
				a.fill(),
				a.beginPath(),
				a.setFontSize(t.fontSize),
				a.setFillStyle(l.labelFontColor || e.fontColor),
				a.fillText(String(h), u, s + t.toolTipPadding + t.fontSize),
				a.closePath(),
				a.stroke();
		}
	}
	function ie(i, e, t) {
		let a = F({}, { type: 'solid', dashLength: 4, data: [] }, i.extra.markLine),
			l = i.area[3],
			r = i.width - i.area[1],
			n = Ba(a.data, i);
		for (let h = 0; h < n.length; h++) {
			let d = F({}, { lineColor: '#DE4A42', showLabel: !1, labelFontColor: '#666666', labelBgColor: '#DFE8FF', labelBgOpacity: 0.8, labelAlign: 'left', labelOffsetX: 0, labelOffsetY: 0 }, n[h]);
			if ((a.type == 'dash' && t.setLineDash([a.dashLength, a.dashLength]), t.setStrokeStyle(d.lineColor), t.setLineWidth(1 * i.pix), t.beginPath(), t.moveTo(l, d.y), t.lineTo(r, d.y), t.stroke(), t.setLineDash([]), d.showLabel)) {
				let u = d.labelText ? d.labelText : d.value;
				t.setFontSize(e.fontSize);
				let f = G(u, e.fontSize, t) + e.toolTipPadding * 2,
					o = d.labelAlign == 'left' ? i.area[3] - f : i.width - i.area[1];
				o += d.labelOffsetX;
				let m = d.y - 0.5 * e.fontSize - e.toolTipPadding;
				m += d.labelOffsetY;
				let c = o + e.toolTipPadding;
				d.y, t.setFillStyle(P(d.labelBgColor, d.labelBgOpacity)), t.setStrokeStyle(d.labelBgColor), t.setLineWidth(1 * i.pix), t.beginPath(), t.rect(o, m, f, e.fontSize + 2 * e.toolTipPadding), t.closePath(), t.stroke(), t.fill(), t.setFontSize(e.fontSize), t.setTextAlign('left'), t.setFillStyle(d.labelFontColor), t.fillText(String(u), c, m + e.fontSize + e.toolTipPadding / 2), t.stroke(), t.setTextAlign('left');
			}
		}
	}
	function Xa(i, e, t, a, l) {
		var r = F({}, { gridType: 'solid', dashLength: 4 }, i.extra.tooltip),
			n = i.area[3],
			h = i.width - i.area[1];
		if ((r.gridType == 'dash' && t.setLineDash([r.dashLength, r.dashLength]), t.setStrokeStyle(r.gridColor || '#cccccc'), t.setLineWidth(1 * i.pix), t.beginPath(), t.moveTo(n, i.tooltip.offset.y), t.lineTo(h, i.tooltip.offset.y), t.stroke(), t.setLineDash([]), r.yAxisLabel)) {
			let d = Oa(i.tooltip.offset.y, i.series, i),
				u = i.chartData.yAxisData.yAxisWidth,
				s = i.area[3],
				f = i.width - i.area[1];
			for (let o = 0; o < d.length; o++) {
				t.setFontSize(e.fontSize);
				let m = G(d[o], e.fontSize, t),
					c,
					g,
					x;
				u[o].position == 'left' ? ((c = s - u[o].width), (g = Math.max(c, c + m + e.toolTipPadding * 2))) : ((c = f), (g = Math.max(c + u[o].width, c + m + e.toolTipPadding * 2))), (x = g - c);
				let v = c + (x - m) / 2,
					y = i.tooltip.offset.y;
				t.beginPath(),
					t.setFillStyle(P(r.labelBgColor || e.toolTipBackground, r.labelBgOpacity || e.toolTipOpacity)),
					t.setStrokeStyle(r.labelBgColor || e.toolTipBackground),
					t.setLineWidth(1 * i.pix),
					t.rect(c, y - 0.5 * e.fontSize - e.toolTipPadding, x, e.fontSize + 2 * e.toolTipPadding),
					t.closePath(),
					t.stroke(),
					t.fill(),
					t.beginPath(),
					t.setFontSize(e.fontSize),
					t.setFillStyle(r.labelFontColor || i.fontColor),
					t.fillText(d[o], v, y + 0.5 * e.fontSize),
					t.closePath(),
					t.stroke(),
					u[o].position == 'left' ? (s -= u[o].width + i.yAxis.padding * i.pix) : (f += u[o].width + i.yAxis.padding * i.pix);
			}
		}
	}
	function Ha(i, e, t, a, l) {
		var r = F({}, { activeBgColor: '#000000', activeBgOpacity: 0.08, activeWidth: l }, e.extra.column);
		r.activeWidth = r.activeWidth > l ? l : r.activeWidth;
		var n = e.area[0],
			h = e.height - e.area[2];
		a.beginPath(), a.setFillStyle(P(r.activeBgColor, r.activeBgOpacity)), a.rect(i - r.activeWidth / 2, n, r.activeWidth, h - n), a.closePath(), a.fill(), a.setFillStyle('#FFFFFF');
	}
	function $a(i, e, t, a, l) {
		var r = F({}, { activeBgColor: '#000000', activeBgOpacity: 0.08 }, e.extra.bar),
			n = e.area[3],
			h = e.width - e.area[1];
		a.beginPath(), a.setFillStyle(P(r.activeBgColor, r.activeBgOpacity)), a.rect(n, i - l / 2, h - n, l), a.closePath(), a.fill(), a.setFillStyle('#FFFFFF');
	}
	function Va(i, e, t, a, l, r, n) {
		var h = F({}, { showBox: !0, showArrow: !0, showCategory: !1, bgColor: '#000000', bgOpacity: 0.7, borderColor: '#000000', borderWidth: 0, borderRadius: 0, borderOpacity: 0.7, fontColor: '#FFFFFF', splitLine: !0 }, t.extra.tooltip);
		h.showCategory == !0 && t.categories && i.unshift({ text: t.categories[t.tooltip.index], color: null });
		var d = 4 * t.pix,
			u = 5 * t.pix,
			s = h.showArrow ? 8 * t.pix : 0,
			f = !1;
		(t.type == 'line' || t.type == 'mount' || t.type == 'area' || t.type == 'candle' || t.type == 'mix') && h.splitLine == !0 && Ga(t.tooltip.offset.x, t, a, l), (e = F({ x: 0, y: 0 }, e)), (e.y -= 8 * t.pix);
		var o = i.map(function (x) {
				return G(x.text, a.fontSize, l);
			}),
			m = d + u + 4 * a.toolTipPadding + Math.max.apply(null, o),
			c = 2 * a.toolTipPadding + i.length * a.toolTipLineHeight;
		if (h.showBox != !1) {
			e.x - Math.abs(t._scrollDistance_ || 0) + s + m > t.width && (f = !0), c + e.y > t.height && (e.y = t.height - c), l.beginPath(), l.setFillStyle(P(h.bgColor || a.toolTipBackground, h.bgOpacity || a.toolTipOpacity)), l.setLineWidth(h.borderWidth * t.pix), l.setStrokeStyle(P(h.borderColor, h.borderOpacity));
			var g = h.borderRadius;
			f
				? (h.showArrow && (l.moveTo(e.x, e.y + 10 * t.pix), l.lineTo(e.x - s, e.y + 10 * t.pix + 5 * t.pix)), l.arc(e.x - s - g, e.y + c - g, g, 0, Math.PI / 2, !1), l.arc(e.x - s - Math.round(m) + g, e.y + c - g, g, Math.PI / 2, Math.PI, !1), l.arc(e.x - s - Math.round(m) + g, e.y + g, g, -Math.PI, -Math.PI / 2, !1), l.arc(e.x - s - g, e.y + g, g, -Math.PI / 2, 0, !1), h.showArrow && (l.lineTo(e.x - s, e.y + 10 * t.pix - 5 * t.pix), l.lineTo(e.x, e.y + 10 * t.pix)))
				: (h.showArrow && (l.moveTo(e.x, e.y + 10 * t.pix), l.lineTo(e.x + s, e.y + 10 * t.pix - 5 * t.pix)), l.arc(e.x + s + g, e.y + g, g, -Math.PI, -Math.PI / 2, !1), l.arc(e.x + s + Math.round(m) - g, e.y + g, g, -Math.PI / 2, 0, !1), l.arc(e.x + s + Math.round(m) - g, e.y + c - g, g, 0, Math.PI / 2, !1), l.arc(e.x + s + g, e.y + c - g, g, Math.PI / 2, Math.PI, !1), h.showArrow && (l.lineTo(e.x + s, e.y + 10 * t.pix + 5 * t.pix), l.lineTo(e.x, e.y + 10 * t.pix))),
				l.closePath(),
				l.fill(),
				h.borderWidth > 0 && l.stroke(),
				i.forEach(function (x, v) {
					if (x.color !== null) {
						l.beginPath(), l.setFillStyle(x.color);
						var y = e.x + s + 2 * a.toolTipPadding,
							b = e.y + (a.toolTipLineHeight - a.fontSize) / 2 + a.toolTipLineHeight * v + a.toolTipPadding + 1;
						f && (y = e.x - m - s + 2 * a.toolTipPadding), l.fillRect(y, b, d, a.fontSize), l.closePath();
					}
				}),
				i.forEach(function (x, v) {
					var y = e.x + s + 2 * a.toolTipPadding + d + u;
					f && (y = e.x - m - s + 2 * a.toolTipPadding + +d + u);
					var b = e.y + (a.toolTipLineHeight - a.fontSize) / 2 + a.toolTipLineHeight * v + a.toolTipPadding;
					l.beginPath(), l.setFontSize(a.fontSize), l.setFillStyle(h.fontColor), l.fillText(x.text, y, b + a.fontSize), l.closePath(), l.stroke();
				});
		}
	}
	function Ya(i, e, t, a) {
		let l = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1,
			r = e.chartData.xAxisData,
			n = r.xAxisPoints,
			h = r.eachSpacing,
			d = F({}, { type: 'group', width: h / 2, meterBorder: 4, meterFillColor: '#FFFFFF', barBorderCircle: !1, barBorderRadius: [], seriesGap: 2, linearType: 'none', linearOpacity: 1, customColor: [], colorStop: 0 }, e.extra.column),
			u = [];
		a.save();
		let s = -2,
			f = n.length + 2;
		return (
			e._scrollDistance_ && e._scrollDistance_ !== 0 && e.enableScroll === !0 && (a.translate(e._scrollDistance_, 0), (s = Math.floor(-e._scrollDistance_ / h) - 2), (f = s + e.xAxis.itemCount + 4)),
			e.tooltip && e.tooltip.textList && e.tooltip.textList.length && l === 1 && Ha(e.tooltip.offset.x, e, t, a, h),
			(d.customColor = ae(d.linearType, d.customColor, i, t)),
			i.forEach(function (o, m) {
				let c, g, x;
				(c = [].concat(e.chartData.yAxisData.ranges[o.index])), (g = c.pop()), (x = c.shift());
				var v = o.data;
				switch (d.type) {
					case 'group':
						var T = K(v, g, x, n, h, e, t, l),
							y = Re(v, g, x, n, h, e, t, m, i, l);
						u.push(y), (T = Se(T, h, i.length, m, t, e));
						for (let M = 0; M < T.length; M++) {
							let L = T[M];
							if (L !== null && M > s && M < f) {
								var b = L.x - L.width / 2,
									w = e.height - L.y - e.area[2];
								a.beginPath();
								var S = L.color || o.color,
									D = L.color || o.color;
								if (d.linearType !== 'none') {
									var _ = a.createLinearGradient(b, L.y, b, e.height - e.area[2]);
									d.linearType == 'opacity' ? (_.addColorStop(0, P(S, d.linearOpacity)), _.addColorStop(1, P(S, 1))) : (_.addColorStop(0, P(d.customColor[o.linearIndex], d.linearOpacity)), _.addColorStop(d.colorStop, P(d.customColor[o.linearIndex], d.linearOpacity)), _.addColorStop(1, P(S, 1))), (S = _);
								}
								if ((d.barBorderRadius && d.barBorderRadius.length === 4) || d.barBorderCircle === !0) {
									const W = b,
										X = L.y,
										z = L.width,
										$ = e.height - e.area[2] - L.y;
									d.barBorderCircle && (d.barBorderRadius = [z / 2, z / 2, 0, 0]);
									let [k, R, I, E] = d.barBorderRadius,
										O = Math.min(z / 2, $ / 2);
									(k = k > O ? O : k), (R = R > O ? O : R), (I = I > O ? O : I), (E = E > O ? O : E), (k = k < 0 ? 0 : k), (R = R < 0 ? 0 : R), (I = I < 0 ? 0 : I), (E = E < 0 ? 0 : E), a.arc(W + k, X + k, k, -Math.PI, -Math.PI / 2), a.arc(W + z - R, X + R, R, -Math.PI / 2, 0), a.arc(W + z - I, X + $ - I, I, 0, Math.PI / 2), a.arc(W + E, X + $ - E, E, Math.PI / 2, Math.PI);
								} else a.moveTo(b, L.y), a.lineTo(b + L.width, L.y), a.lineTo(b + L.width, e.height - e.area[2]), a.lineTo(b, e.height - e.area[2]), a.lineTo(b, L.y), a.setLineWidth(1), a.setStrokeStyle(D);
								a.setFillStyle(S), a.closePath(), a.fill();
							}
						}
						break;
					case 'stack':
						var T = Re(v, g, x, n, h, e, t, m, i, l);
						u.push(T), (T = Ia(T, h, i.length, m, t, e));
						for (let M = 0; M < T.length; M++) {
							let L = T[M];
							if (L !== null && M > s && M < f) {
								a.beginPath();
								var S = L.color || o.color,
									b = L.x - L.width / 2 + 1,
									w = e.height - L.y - e.area[2],
									A = e.height - L.y0 - e.area[2];
								m > 0 && (w -= A), a.setFillStyle(S), a.moveTo(b, L.y), a.fillRect(b, L.y, L.width, w), a.closePath(), a.fill();
							}
						}
						break;
					case 'meter':
						var T = K(v, g, x, n, h, e, t, l);
						u.push(T), (T = ka(T, h, i.length, m, t, e, d.meterBorder));
						for (let M = 0; M < T.length; M++) {
							let L = T[M];
							if (L !== null && M > s && M < f) {
								a.beginPath(), m == 0 && d.meterBorder > 0 && (a.setStrokeStyle(o.color), a.setLineWidth(d.meterBorder * e.pix)), m == 0 ? a.setFillStyle(d.meterFillColor) : a.setFillStyle(L.color || o.color);
								var b = L.x - L.width / 2,
									w = e.height - L.y - e.area[2];
								if ((d.barBorderRadius && d.barBorderRadius.length === 4) || d.barBorderCircle === !0) {
									const z = b,
										$ = L.y,
										k = L.width,
										R = e.height - e.area[2] - L.y;
									d.barBorderCircle && (d.barBorderRadius = [k / 2, k / 2, 0, 0]);
									let [I, E, O, B] = d.barBorderRadius,
										N = Math.min(k / 2, R / 2);
									(I = I > N ? N : I), (E = E > N ? N : E), (O = O > N ? N : O), (B = B > N ? N : B), (I = I < 0 ? 0 : I), (E = E < 0 ? 0 : E), (O = O < 0 ? 0 : O), (B = B < 0 ? 0 : B), a.arc(z + I, $ + I, I, -Math.PI, -Math.PI / 2), a.arc(z + k - E, $ + E, E, -Math.PI / 2, 0), a.arc(z + k - O, $ + R - O, O, 0, Math.PI / 2), a.arc(z + B, $ + R - B, B, Math.PI / 2, Math.PI), a.fill();
								} else a.moveTo(b, L.y), a.lineTo(b + L.width, L.y), a.lineTo(b + L.width, e.height - e.area[2]), a.lineTo(b, e.height - e.area[2]), a.lineTo(b, L.y), a.fill();
								m == 0 && d.meterBorder > 0 && (a.closePath(), a.stroke());
							}
						}
						break;
				}
			}),
			e.dataLabel !== !1 &&
				l === 1 &&
				i.forEach(function (o, m) {
					let c, g, x;
					(c = [].concat(e.chartData.yAxisData.ranges[o.index])), (g = c.pop()), (x = c.shift());
					var v = o.data;
					switch (d.type) {
						case 'group':
							var y = K(v, g, x, n, h, e, t, l);
							(y = Se(y, h, i.length, m, t, e)), se(y, o, t, a, e);
							break;
						case 'stack':
							var y = Re(v, g, x, n, h, e, t, m, i, l);
							se(y, o, t, a, e);
							break;
						case 'meter':
							var y = K(v, g, x, n, h, e, t, l);
							se(y, o, t, a, e);
							break;
					}
				}),
			a.restore(),
			{ xAxisPoints: n, calPoints: u, eachSpacing: h }
		);
	}
	function qa(i, e, t, a) {
		let l = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1,
			r = e.chartData.xAxisData,
			n = r.xAxisPoints,
			h = r.eachSpacing,
			d = F({}, { type: 'mount', widthRatio: 1, borderWidth: 1, barBorderCircle: !1, barBorderRadius: [], linearType: 'none', linearOpacity: 1, customColor: [], colorStop: 0 }, e.extra.mount);
		(d.widthRatio = d.widthRatio <= 0 ? 0 : d.widthRatio), (d.widthRatio = d.widthRatio >= 2 ? 2 : d.widthRatio), a.save();
		let u = -2,
			s = n.length + 2;
		e._scrollDistance_ && e._scrollDistance_ !== 0 && e.enableScroll === !0 && (a.translate(e._scrollDistance_, 0), (u = Math.floor(-e._scrollDistance_ / h) - 2), (s = u + e.xAxis.itemCount + 4)), (d.customColor = ae(d.linearType, d.customColor, i, t));
		let f, o, m;
		(f = [].concat(e.chartData.yAxisData.ranges[0])), (o = f.pop()), (m = f.shift());
		var c = Ue(i, o, m, n, h, e, d, l);
		switch (d.type) {
			case 'bar':
				for (let w = 0; w < c.length; w++) {
					let S = c[w];
					if (S !== null && w > u && w < s) {
						var g = S.x - (h * d.widthRatio) / 2,
							x = e.height - S.y - e.area[2];
						a.beginPath();
						var v = S.color || i[w].color,
							y = S.color || i[w].color;
						if (d.linearType !== 'none') {
							var b = a.createLinearGradient(g, S.y, g, e.height - e.area[2]);
							d.linearType == 'opacity' ? (b.addColorStop(0, P(v, d.linearOpacity)), b.addColorStop(1, P(v, 1))) : (b.addColorStop(0, P(d.customColor[i[w].linearIndex], d.linearOpacity)), b.addColorStop(d.colorStop, P(d.customColor[i[w].linearIndex], d.linearOpacity)), b.addColorStop(1, P(v, 1))), (v = b);
						}
						if ((d.barBorderRadius && d.barBorderRadius.length === 4) || d.barBorderCircle === !0) {
							const D = g,
								_ = S.y,
								A = S.width,
								T = e.height - e.area[2] - S.y - (d.borderWidth * e.pix) / 2;
							d.barBorderCircle && (d.barBorderRadius = [A / 2, A / 2, 0, 0]);
							let [M, L, W, X] = d.barBorderRadius,
								z = Math.min(A / 2, T / 2);
							(M = M > z ? z : M), (L = L > z ? z : L), (W = W > z ? z : W), (X = X > z ? z : X), (M = M < 0 ? 0 : M), (L = L < 0 ? 0 : L), (W = W < 0 ? 0 : W), (X = X < 0 ? 0 : X), a.arc(D + M, _ + M, M, -Math.PI, -Math.PI / 2), a.arc(D + A - L, _ + L, L, -Math.PI / 2, 0), a.arc(D + A - W, _ + T - W, W, 0, Math.PI / 2), a.arc(D + X, _ + T - X, X, Math.PI / 2, Math.PI);
						} else a.moveTo(g, S.y), a.lineTo(g + S.width, S.y), a.lineTo(g + S.width, e.height - e.area[2]), a.lineTo(g, e.height - e.area[2]), a.lineTo(g, S.y);
						a.setStrokeStyle(y), a.setFillStyle(v), d.borderWidth > 0 && (a.setLineWidth(d.borderWidth * e.pix), a.closePath(), a.stroke()), a.fill();
					}
				}
				break;
			case 'triangle':
				for (let w = 0; w < c.length; w++) {
					let S = c[w];
					if (S !== null && w > u && w < s) {
						var g = S.x - (h * d.widthRatio) / 2,
							x = e.height - S.y - e.area[2];
						a.beginPath();
						var v = S.color || i[w].color,
							y = S.color || i[w].color;
						if (d.linearType !== 'none') {
							var b = a.createLinearGradient(g, S.y, g, e.height - e.area[2]);
							d.linearType == 'opacity' ? (b.addColorStop(0, P(v, d.linearOpacity)), b.addColorStop(1, P(v, 1))) : (b.addColorStop(0, P(d.customColor[i[w].linearIndex], d.linearOpacity)), b.addColorStop(d.colorStop, P(d.customColor[i[w].linearIndex], d.linearOpacity)), b.addColorStop(1, P(v, 1))), (v = b);
						}
						a.moveTo(g, e.height - e.area[2]), a.lineTo(S.x, S.y), a.lineTo(g + S.width, e.height - e.area[2]), a.setStrokeStyle(y), a.setFillStyle(v), d.borderWidth > 0 && (a.setLineWidth(d.borderWidth * e.pix), a.stroke()), a.fill();
					}
				}
				break;
			case 'mount':
				for (let w = 0; w < c.length; w++) {
					let S = c[w];
					if (S !== null && w > u && w < s) {
						var g = S.x - (h * d.widthRatio) / 2,
							x = e.height - S.y - e.area[2];
						a.beginPath();
						var v = S.color || i[w].color,
							y = S.color || i[w].color;
						if (d.linearType !== 'none') {
							var b = a.createLinearGradient(g, S.y, g, e.height - e.area[2]);
							d.linearType == 'opacity' ? (b.addColorStop(0, P(v, d.linearOpacity)), b.addColorStop(1, P(v, 1))) : (b.addColorStop(0, P(d.customColor[i[w].linearIndex], d.linearOpacity)), b.addColorStop(d.colorStop, P(d.customColor[i[w].linearIndex], d.linearOpacity)), b.addColorStop(1, P(v, 1))), (v = b);
						}
						a.moveTo(g, e.height - e.area[2]), a.bezierCurveTo(S.x - S.width / 4, e.height - e.area[2], S.x - S.width / 4, S.y, S.x, S.y), a.bezierCurveTo(S.x + S.width / 4, S.y, S.x + S.width / 4, e.height - e.area[2], g + S.width, e.height - e.area[2]), a.setStrokeStyle(y), a.setFillStyle(v), d.borderWidth > 0 && (a.setLineWidth(d.borderWidth * e.pix), a.stroke()), a.fill();
					}
				}
				break;
			case 'sharp':
				for (let w = 0; w < c.length; w++) {
					let S = c[w];
					if (S !== null && w > u && w < s) {
						var g = S.x - (h * d.widthRatio) / 2,
							x = e.height - S.y - e.area[2];
						a.beginPath();
						var v = S.color || i[w].color,
							y = S.color || i[w].color;
						if (d.linearType !== 'none') {
							var b = a.createLinearGradient(g, S.y, g, e.height - e.area[2]);
							d.linearType == 'opacity' ? (b.addColorStop(0, P(v, d.linearOpacity)), b.addColorStop(1, P(v, 1))) : (b.addColorStop(0, P(d.customColor[i[w].linearIndex], d.linearOpacity)), b.addColorStop(d.colorStop, P(d.customColor[i[w].linearIndex], d.linearOpacity)), b.addColorStop(1, P(v, 1))), (v = b);
						}
						a.moveTo(g, e.height - e.area[2]), a.quadraticCurveTo(S.x - 0, e.height - e.area[2] - x / 4, S.x, S.y), a.quadraticCurveTo(S.x + 0, e.height - e.area[2] - x / 4, g + S.width, e.height - e.area[2]), a.setStrokeStyle(y), a.setFillStyle(v), d.borderWidth > 0 && (a.setLineWidth(d.borderWidth * e.pix), a.stroke()), a.fill();
					}
				}
				break;
		}
		if (e.dataLabel !== !1 && l === 1) {
			let w, S, D;
			(w = [].concat(e.chartData.yAxisData.ranges[0])), (S = w.pop()), (D = w.shift());
			var c = Ue(i, S, D, n, h, e, d, l);
			Wa(c, i, t, a, e);
		}
		return a.restore(), { xAxisPoints: n, calPoints: c, eachSpacing: h };
	}
	function ja(i, e, t, a) {
		let l = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1,
			r = [],
			n = (e.height - e.area[0] - e.area[2]) / e.categories.length;
		for (let f = 0; f < e.categories.length; f++) r.push(e.area[0] + n / 2 + n * f);
		let h = F({}, { type: 'group', width: n / 2, meterBorder: 4, meterFillColor: '#FFFFFF', barBorderCircle: !1, barBorderRadius: [], seriesGap: 2, linearType: 'none', linearOpacity: 1, customColor: [], colorStop: 0 }, e.extra.bar),
			d = [];
		a.save();
		let u = -2,
			s = r.length + 2;
		return (
			e.tooltip && e.tooltip.textList && e.tooltip.textList.length && l === 1 && $a(e.tooltip.offset.y, e, t, a, n),
			(h.customColor = ae(h.linearType, h.customColor, i, t)),
			i.forEach(function (f, o) {
				let m, c, g;
				(m = [].concat(e.chartData.xAxisData.ranges)), (g = m.pop()), (c = m.shift());
				var x = f.data;
				switch (h.type) {
					case 'group':
						var _ = Je(x, c, g, r, n, e, t, l),
							v = Oe(x, c, g, r, n, e, t, o, i, l);
						d.push(v), (_ = je(_, n, i.length, o, t, e));
						for (let A = 0; A < _.length; A++) {
							let T = _[A];
							if (T !== null && A > u && A < s) {
								var y = e.area[3],
									b = T.y - T.width / 2;
								T.height, a.beginPath();
								var w = T.color || f.color,
									S = T.color || f.color;
								if (h.linearType !== 'none') {
									var D = a.createLinearGradient(y, T.y, T.x, T.y);
									h.linearType == 'opacity' ? (D.addColorStop(0, P(w, h.linearOpacity)), D.addColorStop(1, P(w, 1))) : (D.addColorStop(0, P(h.customColor[f.linearIndex], h.linearOpacity)), D.addColorStop(h.colorStop, P(h.customColor[f.linearIndex], h.linearOpacity)), D.addColorStop(1, P(w, 1))), (w = D);
								}
								if ((h.barBorderRadius && h.barBorderRadius.length === 4) || h.barBorderCircle === !0) {
									const M = y,
										L = T.width,
										W = T.y - T.width / 2,
										X = T.height;
									h.barBorderCircle && (h.barBorderRadius = [L / 2, L / 2, 0, 0]);
									let [z, $, k, R] = h.barBorderRadius,
										I = Math.min(L / 2, X / 2);
									(z = z > I ? I : z), ($ = $ > I ? I : $), (k = k > I ? I : k), (R = R > I ? I : R), (z = z < 0 ? 0 : z), ($ = $ < 0 ? 0 : $), (k = k < 0 ? 0 : k), (R = R < 0 ? 0 : R), a.arc(M + R, W + R, R, -Math.PI, -Math.PI / 2), a.arc(T.x - z, W + z, z, -Math.PI / 2, 0), a.arc(T.x - $, W + L - $, $, 0, Math.PI / 2), a.arc(M + k, W + L - k, k, Math.PI / 2, Math.PI);
								} else a.moveTo(y, b), a.lineTo(T.x, b), a.lineTo(T.x, b + T.width), a.lineTo(y, b + T.width), a.lineTo(y, b), a.setLineWidth(1), a.setStrokeStyle(S);
								a.setFillStyle(w), a.closePath(), a.fill();
							}
						}
						break;
					case 'stack':
						var _ = Oe(x, c, g, r, n, e, t, o, i, l);
						d.push(_), (_ = Ea(_, n, i.length, o, t, e));
						for (let A = 0; A < _.length; A++) {
							let T = _[A];
							if (T !== null && A > u && A < s) {
								a.beginPath();
								var w = T.color || f.color,
									y = T.x0;
								a.setFillStyle(w), a.moveTo(y, T.y - T.width / 2), a.fillRect(y, T.y - T.width / 2, T.height, T.width), a.closePath(), a.fill();
							}
						}
						break;
				}
			}),
			e.dataLabel !== !1 &&
				l === 1 &&
				i.forEach(function (f, o) {
					let m, c, g;
					(m = [].concat(e.chartData.xAxisData.ranges)), (g = m.pop()), (c = m.shift());
					var x = f.data;
					switch (h.type) {
						case 'group':
							var v = Je(x, c, g, r, n, e, t, l);
							(v = je(v, n, i.length, o, t, e)), Ke(v, f, t, a, e);
							break;
						case 'stack':
							var v = Oe(x, c, g, r, n, e, t, o, i, l);
							Ke(v, f, t, a, e);
							break;
					}
				}),
			{ yAxisPoints: r, calPoints: d, eachSpacing: n }
		);
	}
	function Ua(i, e, t, a, l) {
		var r = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 1,
			n = F({}, { color: {}, average: {} }, t.extra.candle);
		(n.color = F({}, { upLine: '#f04864', upFill: '#f04864', downLine: '#2fc25b', downFill: '#2fc25b' }, n.color)), (n.average = F({}, { show: !1, name: [], day: [], color: a.color }, n.average)), (t.extra.candle = n);
		let h = t.chartData.xAxisData,
			d = h.xAxisPoints,
			u = h.eachSpacing,
			s = [];
		l.save();
		let f = -2,
			o = d.length + 2,
			m = 0,
			c = t.width + u;
		return (
			t._scrollDistance_ && t._scrollDistance_ !== 0 && t.enableScroll === !0 && (l.translate(t._scrollDistance_, 0), (f = Math.floor(-t._scrollDistance_ / u) - 2), (o = f + t.xAxis.itemCount + 4), (m = -t._scrollDistance_ - u * 2 + t.area[3]), (c = m + (t.xAxis.itemCount + 4) * u)),
			(n.average.show || e) &&
				e.forEach(function (g, x) {
					let v, y, b;
					(v = [].concat(t.chartData.yAxisData.ranges[g.index])), (y = v.pop()), (b = v.shift());
					var w = g.data,
						S = K(w, y, b, d, u, t, a, r),
						D = ye(S, g);
					for (let A = 0; A < D.length; A++) {
						let T = D[A];
						if ((l.beginPath(), l.setStrokeStyle(g.color), l.setLineWidth(1), T.length === 1)) l.moveTo(T[0].x, T[0].y), l.arc(T[0].x, T[0].y, 1, 0, 2 * Math.PI);
						else {
							l.moveTo(T[0].x, T[0].y);
							let M = 0;
							for (let L = 0; L < T.length; L++) {
								let W = T[L];
								if ((M == 0 && W.x > m && (l.moveTo(W.x, W.y), (M = 1)), L > 0 && W.x > m && W.x < c)) {
									var _ = ce(T, L - 1);
									l.bezierCurveTo(_.ctrA.x, _.ctrA.y, _.ctrB.x, _.ctrB.y, W.x, W.y);
								}
							}
							l.moveTo(T[0].x, T[0].y);
						}
						l.closePath(), l.stroke();
					}
				}),
			i.forEach(function (g, x) {
				let v, y, b;
				(v = [].concat(t.chartData.yAxisData.ranges[g.index])), (y = v.pop()), (b = v.shift());
				var w = g.data,
					S = Ra(w, y, b, d, u, t, a, r);
				s.push(S);
				var D = ye(S, g);
				for (let _ = 0; _ < D[0].length; _++)
					if (_ > f && _ < o) {
						let A = D[0][_];
						l.beginPath(),
							w[_][1] - w[_][0] > 0
								? (l.setStrokeStyle(n.color.upLine), l.setFillStyle(n.color.upFill), l.setLineWidth(1 * t.pix), l.moveTo(A[3].x, A[3].y), l.lineTo(A[1].x, A[1].y), l.lineTo(A[1].x - u / 4, A[1].y), l.lineTo(A[0].x - u / 4, A[0].y), l.lineTo(A[0].x, A[0].y), l.lineTo(A[2].x, A[2].y), l.lineTo(A[0].x, A[0].y), l.lineTo(A[0].x + u / 4, A[0].y), l.lineTo(A[1].x + u / 4, A[1].y), l.lineTo(A[1].x, A[1].y), l.moveTo(A[3].x, A[3].y))
								: (l.setStrokeStyle(n.color.downLine), l.setFillStyle(n.color.downFill), l.setLineWidth(1 * t.pix), l.moveTo(A[3].x, A[3].y), l.lineTo(A[0].x, A[0].y), l.lineTo(A[0].x - u / 4, A[0].y), l.lineTo(A[1].x - u / 4, A[1].y), l.lineTo(A[1].x, A[1].y), l.lineTo(A[2].x, A[2].y), l.lineTo(A[1].x, A[1].y), l.lineTo(A[1].x + u / 4, A[1].y), l.lineTo(A[0].x + u / 4, A[0].y), l.lineTo(A[0].x, A[0].y), l.moveTo(A[3].x, A[3].y)),
							l.closePath(),
							l.fill(),
							l.stroke();
					}
			}),
			l.restore(),
			{ xAxisPoints: d, calPoints: s, eachSpacing: u }
		);
	}
	function Ja(i, e, t, a) {
		var l = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1,
			r = F({}, { type: 'straight', opacity: 0.2, addLine: !1, width: 2, gradient: !1 }, e.extra.area);
		let n = e.chartData.xAxisData,
			h = n.xAxisPoints,
			d = n.eachSpacing,
			u = e.height - e.area[2],
			s = [];
		a.save();
		let f = 0,
			o = e.width + d;
		return (
			e._scrollDistance_ && e._scrollDistance_ !== 0 && e.enableScroll === !0 && (a.translate(e._scrollDistance_, 0), (f = -e._scrollDistance_ - d * 2 + e.area[3]), (o = f + (e.xAxis.itemCount + 4) * d)),
			i.forEach(function (m, c) {
				let g, x, v;
				(g = [].concat(e.chartData.yAxisData.ranges[m.index])), (x = g.pop()), (v = g.shift());
				let y = m.data,
					b = K(y, x, v, h, d, e, t, l);
				s.push(b);
				let w = ye(b, m);
				for (let S = 0; S < w.length; S++) {
					let D = w[S];
					if ((a.beginPath(), a.setStrokeStyle(P(m.color, r.opacity)), r.gradient)) {
						let _ = a.createLinearGradient(0, e.area[0], 0, e.height - e.area[2]);
						_.addColorStop('0', P(m.color, r.opacity)), _.addColorStop('1.0', P('#FFFFFF', 0.1)), a.setFillStyle(_);
					} else a.setFillStyle(P(m.color, r.opacity));
					if ((a.setLineWidth(r.width * e.pix), D.length > 1)) {
						let _ = D[0],
							A = D[D.length - 1];
						a.moveTo(_.x, _.y);
						let T = 0;
						if (r.type === 'curve')
							for (let M = 0; M < D.length; M++) {
								let L = D[M];
								if ((T == 0 && L.x > f && (a.moveTo(L.x, L.y), (T = 1)), M > 0 && L.x > f && L.x < o)) {
									let W = ce(D, M - 1);
									a.bezierCurveTo(W.ctrA.x, W.ctrA.y, W.ctrB.x, W.ctrB.y, L.x, L.y);
								}
							}
						if (r.type === 'straight')
							for (let M = 0; M < D.length; M++) {
								let L = D[M];
								T == 0 && L.x > f && (a.moveTo(L.x, L.y), (T = 1)), M > 0 && L.x > f && L.x < o && a.lineTo(L.x, L.y);
							}
						if (r.type === 'step')
							for (let M = 0; M < D.length; M++) {
								let L = D[M];
								T == 0 && L.x > f && (a.moveTo(L.x, L.y), (T = 1)), M > 0 && L.x > f && L.x < o && (a.lineTo(L.x, D[M - 1].y), a.lineTo(L.x, L.y));
							}
						a.lineTo(A.x, u), a.lineTo(_.x, u), a.lineTo(_.x, _.y);
					} else {
						let _ = D[0];
						a.moveTo(_.x - d / 2, _.y), a.lineTo(_.x + d / 2, _.y), a.lineTo(_.x + d / 2, u), a.lineTo(_.x - d / 2, u), a.moveTo(_.x - d / 2, _.y);
					}
					if ((a.closePath(), a.fill(), r.addLine)) {
						if (m.lineType == 'dash') {
							let _ = m.dashLength ? m.dashLength : 8;
							(_ *= e.pix), a.setLineDash([_, _]);
						}
						if ((a.beginPath(), a.setStrokeStyle(m.color), a.setLineWidth(r.width * e.pix), D.length === 1)) a.moveTo(D[0].x, D[0].y), a.arc(D[0].x, D[0].y, 1, 0, 2 * Math.PI);
						else {
							a.moveTo(D[0].x, D[0].y);
							let _ = 0;
							if (r.type === 'curve')
								for (let A = 0; A < D.length; A++) {
									let T = D[A];
									if ((_ == 0 && T.x > f && (a.moveTo(T.x, T.y), (_ = 1)), A > 0 && T.x > f && T.x < o)) {
										let M = ce(D, A - 1);
										a.bezierCurveTo(M.ctrA.x, M.ctrA.y, M.ctrB.x, M.ctrB.y, T.x, T.y);
									}
								}
							if (r.type === 'straight')
								for (let A = 0; A < D.length; A++) {
									let T = D[A];
									_ == 0 && T.x > f && (a.moveTo(T.x, T.y), (_ = 1)), A > 0 && T.x > f && T.x < o && a.lineTo(T.x, T.y);
								}
							if (r.type === 'step')
								for (let A = 0; A < D.length; A++) {
									let T = D[A];
									_ == 0 && T.x > f && (a.moveTo(T.x, T.y), (_ = 1)), A > 0 && T.x > f && T.x < o && (a.lineTo(T.x, D[A - 1].y), a.lineTo(T.x, T.y));
								}
							a.moveTo(D[0].x, D[0].y);
						}
						a.stroke(), a.setLineDash([]);
					}
				}
				e.dataPointShape !== !1 && _e(b, m.color, m.pointShape, a, e);
			}),
			e.dataLabel !== !1 &&
				l === 1 &&
				i.forEach(function (m, c) {
					let g, x, v;
					(g = [].concat(e.chartData.yAxisData.ranges[m.index])), (x = g.pop()), (v = g.shift());
					var y = m.data,
						b = K(y, x, v, h, d, e, t, l);
					se(b, m, t, a, e);
				}),
			a.restore(),
			{ xAxisPoints: h, calPoints: s, eachSpacing: d }
		);
	}
	function Za(i, e, t, a) {
		var l = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1;
		F({}, { type: 'circle' }, e.extra.scatter);
		let r = e.chartData.xAxisData,
			n = r.xAxisPoints,
			h = r.eachSpacing;
		var d = [];
		a.save();
		let u = 0;
		return (
			e.width + h,
			e._scrollDistance_ && e._scrollDistance_ !== 0 && e.enableScroll === !0 && (a.translate(e._scrollDistance_, 0), (u = -e._scrollDistance_ - h * 2 + e.area[3]), u + (e.xAxis.itemCount + 4) * h),
			i.forEach(function (s, f) {
				let o, m, c;
				(o = [].concat(e.chartData.yAxisData.ranges[s.index])), (m = o.pop()), (c = o.shift());
				var g = s.data,
					x = K(g, m, c, n, h, e, t, l);
				a.beginPath(), a.setStrokeStyle(s.color), a.setFillStyle(s.color), a.setLineWidth(1 * e.pix);
				var v = s.pointShape;
				if (v === 'diamond')
					x.forEach(function (y, b) {
						y !== null && (a.moveTo(y.x, y.y - 4.5), a.lineTo(y.x - 4.5, y.y), a.lineTo(y.x, y.y + 4.5), a.lineTo(y.x + 4.5, y.y), a.lineTo(y.x, y.y - 4.5));
					});
				else if (v === 'circle')
					x.forEach(function (y, b) {
						y !== null && (a.moveTo(y.x + 2.5 * e.pix, y.y), a.arc(y.x, y.y, 3 * e.pix, 0, 2 * Math.PI, !1));
					});
				else if (v === 'square')
					x.forEach(function (y, b) {
						y !== null && (a.moveTo(y.x - 3.5, y.y - 3.5), a.rect(y.x - 3.5, y.y - 3.5, 7, 7));
					});
				else if (v === 'triangle')
					x.forEach(function (y, b) {
						y !== null && (a.moveTo(y.x, y.y - 4.5), a.lineTo(y.x - 4.5, y.y + 4.5), a.lineTo(y.x + 4.5, y.y + 4.5), a.lineTo(y.x, y.y - 4.5));
					});
				else if (v === 'triangle') return;
				a.closePath(), a.fill(), a.stroke();
			}),
			e.dataLabel !== !1 &&
				l === 1 &&
				i.forEach(function (s, f) {
					let o, m, c;
					(o = [].concat(e.chartData.yAxisData.ranges[s.index])), (m = o.pop()), (c = o.shift());
					var g = s.data,
						x = K(g, m, c, n, h, e, t, l);
					se(x, s, t, a, e);
				}),
			a.restore(),
			{ xAxisPoints: n, calPoints: d, eachSpacing: h }
		);
	}
	function Ka(i, e, t, a) {
		var l = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1,
			r = F({}, { opacity: 1, border: 2 }, e.extra.bubble);
		let n = e.chartData.xAxisData,
			h = n.xAxisPoints,
			d = n.eachSpacing;
		var u = [];
		a.save();
		let s = 0;
		return (
			e.width + d,
			e._scrollDistance_ && e._scrollDistance_ !== 0 && e.enableScroll === !0 && (a.translate(e._scrollDistance_, 0), (s = -e._scrollDistance_ - d * 2 + e.area[3]), s + (e.xAxis.itemCount + 4) * d),
			i.forEach(function (f, o) {
				let m, c, g;
				(m = [].concat(e.chartData.yAxisData.ranges[f.index])), (c = m.pop()), (g = m.shift());
				var x = f.data,
					v = K(x, c, g, h, d, e, t, l);
				a.beginPath(),
					a.setStrokeStyle(f.color),
					a.setLineWidth(r.border * e.pix),
					a.setFillStyle(P(f.color, r.opacity)),
					v.forEach(function (y, b) {
						a.moveTo(y.x + y.r, y.y), a.arc(y.x, y.y, y.r * e.pix, 0, 2 * Math.PI, !1);
					}),
					a.closePath(),
					a.fill(),
					a.stroke(),
					e.dataLabel !== !1 &&
						l === 1 &&
						v.forEach(function (y, b) {
							a.beginPath();
							var w = i.textSize * e.pix || t.fontSize;
							a.setFontSize(w), a.setFillStyle(i.textColor || '#FFFFFF'), a.setTextAlign('center'), a.fillText(String(y.t), y.x, y.y + w / 2), a.closePath(), a.stroke(), a.setTextAlign('left');
						});
			}),
			a.restore(),
			{ xAxisPoints: h, calPoints: u, eachSpacing: d }
		);
	}
	function Qa(i, e, t, a) {
		var l = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1,
			r = F({}, { type: 'straight', width: 2 }, e.extra.line);
		r.width *= e.pix;
		let n = e.chartData.xAxisData,
			h = n.xAxisPoints,
			d = n.eachSpacing;
		var u = [];
		a.save();
		let s = 0,
			f = e.width + d;
		return (
			e._scrollDistance_ && e._scrollDistance_ !== 0 && e.enableScroll === !0 && (a.translate(e._scrollDistance_, 0), (s = -e._scrollDistance_ - d * 2 + e.area[3]), (f = s + (e.xAxis.itemCount + 4) * d)),
			i.forEach(function (o, m) {
				let c, g, x;
				(c = [].concat(e.chartData.yAxisData.ranges[o.index])), (g = c.pop()), (x = c.shift());
				var v = o.data,
					y = K(v, g, x, h, d, e, t, l);
				u.push(y);
				var b = ye(y, o);
				if (o.lineType == 'dash') {
					let w = o.dashLength ? o.dashLength : 8;
					(w *= e.pix), a.setLineDash([w, w]);
				}
				a.beginPath(),
					a.setStrokeStyle(o.color),
					a.setLineWidth(r.width),
					b.forEach(function (w, S) {
						if (w.length === 1) a.moveTo(w[0].x, w[0].y), a.arc(w[0].x, w[0].y, 1, 0, 2 * Math.PI);
						else {
							a.moveTo(w[0].x, w[0].y);
							let _ = 0;
							if (r.type === 'curve')
								for (let A = 0; A < w.length; A++) {
									let T = w[A];
									if ((_ == 0 && T.x > s && (a.moveTo(T.x, T.y), (_ = 1)), A > 0 && T.x > s && T.x < f)) {
										var D = ce(w, A - 1);
										a.bezierCurveTo(D.ctrA.x, D.ctrA.y, D.ctrB.x, D.ctrB.y, T.x, T.y);
									}
								}
							if (r.type === 'straight')
								for (let A = 0; A < w.length; A++) {
									let T = w[A];
									_ == 0 && T.x > s && (a.moveTo(T.x, T.y), (_ = 1)), A > 0 && T.x > s && T.x < f && a.lineTo(T.x, T.y);
								}
							if (r.type === 'step')
								for (let A = 0; A < w.length; A++) {
									let T = w[A];
									_ == 0 && T.x > s && (a.moveTo(T.x, T.y), (_ = 1)), A > 0 && T.x > s && T.x < f && (a.lineTo(T.x, w[A - 1].y), a.lineTo(T.x, T.y));
								}
							a.moveTo(w[0].x, w[0].y);
						}
					}),
					a.stroke(),
					a.setLineDash([]),
					e.dataPointShape !== !1 && _e(y, o.color, o.pointShape, a, e);
			}),
			e.dataLabel !== !1 &&
				l === 1 &&
				i.forEach(function (o, m) {
					let c, g, x;
					(c = [].concat(e.chartData.yAxisData.ranges[o.index])), (g = c.pop()), (x = c.shift());
					var v = o.data,
						y = K(v, g, x, h, d, e, t, l);
					se(y, o, t, a, e);
				}),
			a.restore(),
			{ xAxisPoints: h, calPoints: u, eachSpacing: d }
		);
	}
	function ei(i, e, t, a) {
		let l = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1,
			r = e.chartData.xAxisData,
			n = r.xAxisPoints,
			h = r.eachSpacing,
			d = F({}, { width: h / 2, barBorderCircle: !1, barBorderRadius: [], seriesGap: 2, linearType: 'none', linearOpacity: 1, customColor: [], colorStop: 0 }, e.extra.mix.column),
			u = F({}, { opacity: 0.2, gradient: !1 }, e.extra.mix.area),
			s = e.height - e.area[2],
			f = [];
		var o = 0,
			m = 0;
		i.forEach(function (y, b) {
			y.type == 'column' && (m += 1);
		}),
			a.save();
		let c = -2,
			g = n.length + 2,
			x = 0,
			v = e.width + h;
		if (
			(e._scrollDistance_ && e._scrollDistance_ !== 0 && e.enableScroll === !0 && (a.translate(e._scrollDistance_, 0), (c = Math.floor(-e._scrollDistance_ / h) - 2), (g = c + e.xAxis.itemCount + 4), (x = -e._scrollDistance_ - h * 2 + e.area[3]), (v = x + (e.xAxis.itemCount + 4) * h)),
			(d.customColor = ae(d.linearType, d.customColor, i, t)),
			i.forEach(function (y, b) {
				let w, S, D;
				(w = [].concat(e.chartData.yAxisData.ranges[y.index])), (S = w.pop()), (D = w.shift());
				var _ = y.data,
					A = K(_, S, D, n, h, e, t, l);
				if ((f.push(A), y.type == 'column')) {
					A = Se(A, h, m, o, t, e);
					for (let k = 0; k < A.length; k++) {
						let R = A[k];
						if (R !== null && k > c && k < g) {
							var T = R.x - R.width / 2;
							e.height - R.y - e.area[2], a.beginPath();
							var M = R.color || y.color,
								L = R.color || y.color;
							if (d.linearType !== 'none') {
								var W = a.createLinearGradient(T, R.y, T, e.height - e.area[2]);
								d.linearType == 'opacity' ? (W.addColorStop(0, P(M, d.linearOpacity)), W.addColorStop(1, P(M, 1))) : (W.addColorStop(0, P(d.customColor[y.linearIndex], d.linearOpacity)), W.addColorStop(d.colorStop, P(d.customColor[y.linearIndex], d.linearOpacity)), W.addColorStop(1, P(M, 1))), (M = W);
							}
							if ((d.barBorderRadius && d.barBorderRadius.length === 4) || d.barBorderCircle) {
								const I = T,
									E = R.y,
									O = R.width,
									B = e.height - e.area[2] - R.y;
								d.barBorderCircle && (d.barBorderRadius = [O / 2, O / 2, 0, 0]);
								let [N, le, ne, he] = d.barBorderRadius,
									ge = Math.min(O / 2, B / 2);
								(N = N > ge ? ge : N), (le = le > ge ? ge : le), (ne = ne > ge ? ge : ne), (he = he > ge ? ge : he), (N = N < 0 ? 0 : N), (le = le < 0 ? 0 : le), (ne = ne < 0 ? 0 : ne), (he = he < 0 ? 0 : he), a.arc(I + N, E + N, N, -Math.PI, -Math.PI / 2), a.arc(I + O - le, E + le, le, -Math.PI / 2, 0), a.arc(I + O - ne, E + B - ne, ne, 0, Math.PI / 2), a.arc(I + he, E + B - he, he, Math.PI / 2, Math.PI);
							} else a.moveTo(T, R.y), a.lineTo(T + R.width, R.y), a.lineTo(T + R.width, e.height - e.area[2]), a.lineTo(T, e.height - e.area[2]), a.lineTo(T, R.y), a.setLineWidth(1), a.setStrokeStyle(L);
							a.setFillStyle(M), a.closePath(), a.fill();
						}
					}
					o += 1;
				}
				if (y.type == 'area') {
					let k = ye(A, y);
					for (let R = 0; R < k.length; R++) {
						let I = k[R];
						if ((a.beginPath(), a.setStrokeStyle(y.color), a.setStrokeStyle(P(y.color, u.opacity)), u.gradient)) {
							let E = a.createLinearGradient(0, e.area[0], 0, e.height - e.area[2]);
							E.addColorStop('0', P(y.color, u.opacity)), E.addColorStop('1.0', P('#FFFFFF', 0.1)), a.setFillStyle(E);
						} else a.setFillStyle(P(y.color, u.opacity));
						if ((a.setLineWidth(2 * e.pix), I.length > 1)) {
							var X = I[0];
							let E = I[I.length - 1];
							a.moveTo(X.x, X.y);
							let O = 0;
							if (y.style === 'curve')
								for (let B = 0; B < I.length; B++) {
									let N = I[B];
									if ((O == 0 && N.x > x && (a.moveTo(N.x, N.y), (O = 1)), B > 0 && N.x > x && N.x < v)) {
										var z = ce(I, B - 1);
										a.bezierCurveTo(z.ctrA.x, z.ctrA.y, z.ctrB.x, z.ctrB.y, N.x, N.y);
									}
								}
							else
								for (let B = 0; B < I.length; B++) {
									let N = I[B];
									O == 0 && N.x > x && (a.moveTo(N.x, N.y), (O = 1)), B > 0 && N.x > x && N.x < v && a.lineTo(N.x, N.y);
								}
							a.lineTo(E.x, s), a.lineTo(X.x, s), a.lineTo(X.x, X.y);
						} else {
							let E = I[0];
							a.moveTo(E.x - h / 2, E.y), a.lineTo(E.x + h / 2, E.y), a.lineTo(E.x + h / 2, s), a.lineTo(E.x - h / 2, s), a.moveTo(E.x - h / 2, E.y);
						}
						a.closePath(), a.fill();
					}
				}
				if (y.type == 'line') {
					var $ = ye(A, y);
					$.forEach(function (k, R) {
						if (y.lineType == 'dash') {
							let E = y.dashLength ? y.dashLength : 8;
							(E *= e.pix), a.setLineDash([E, E]);
						}
						if ((a.beginPath(), a.setStrokeStyle(y.color), a.setLineWidth(2 * e.pix), k.length === 1)) a.moveTo(k[0].x, k[0].y), a.arc(k[0].x, k[0].y, 1, 0, 2 * Math.PI);
						else {
							a.moveTo(k[0].x, k[0].y);
							let E = 0;
							if (y.style == 'curve')
								for (let O = 0; O < k.length; O++) {
									let B = k[O];
									if ((E == 0 && B.x > x && (a.moveTo(B.x, B.y), (E = 1)), O > 0 && B.x > x && B.x < v)) {
										var I = ce(k, O - 1);
										a.bezierCurveTo(I.ctrA.x, I.ctrA.y, I.ctrB.x, I.ctrB.y, B.x, B.y);
									}
								}
							else
								for (let O = 0; O < k.length; O++) {
									let B = k[O];
									E == 0 && B.x > x && (a.moveTo(B.x, B.y), (E = 1)), O > 0 && B.x > x && B.x < v && a.lineTo(B.x, B.y);
								}
							a.moveTo(k[0].x, k[0].y);
						}
						a.stroke(), a.setLineDash([]);
					});
				}
				y.type == 'point' && (y.addPoint = !0), y.addPoint == !0 && y.type !== 'column' && _e(A, y.color, y.pointShape, a, e);
			}),
			e.dataLabel !== !1 && l === 1)
		) {
			var o = 0;
			i.forEach(function (b, w) {
				let S, D, _;
				(S = [].concat(e.chartData.yAxisData.ranges[b.index])), (D = S.pop()), (_ = S.shift());
				var A = b.data,
					T = K(A, D, _, n, h, e, t, l);
				b.type !== 'column' ? se(T, b, t, a, e) : ((T = Se(T, h, m, o, t, e)), se(T, b, t, a, e), (o += 1));
			});
		}
		return a.restore(), { xAxisPoints: n, calPoints: f, eachSpacing: h };
	}
	function U(i, e, t, a, l, r) {
		var n = i.extra.tooltip || {};
		n.horizentalLine && i.tooltip && a === 1 && (i.type == 'line' || i.type == 'area' || i.type == 'column' || i.type == 'mount' || i.type == 'candle' || i.type == 'mix') && Xa(i, e, t), t.save(), i._scrollDistance_ && i._scrollDistance_ !== 0 && i.enableScroll === !0 && t.translate(i._scrollDistance_, 0), i.tooltip && i.tooltip.textList && i.tooltip.textList.length && a === 1 && Va(i.tooltip.textList, i.tooltip.offset, i, e, t), t.restore();
	}
	function re(i, e, t, a) {
		let l = e.chartData.xAxisData,
			r = l.xAxisPoints,
			n = l.startX,
			h = l.endX,
			d = l.eachSpacing;
		var u = 'center';
		(e.type == 'bar' || e.type == 'line' || e.type == 'area' || e.type == 'scatter' || e.type == 'bubble') && (u = e.xAxis.boundaryGap);
		var s = e.height - e.area[2],
			f = e.area[0];
		if (e.enableScroll && e.xAxis.scrollShow) {
			var o = e.height - e.area[2] + t.xAxisHeight,
				m = h - n,
				c = d * (r.length - 1);
			e.type == 'mount' && e.extra && e.extra.mount && e.extra.mount.widthRatio && e.extra.mount.widthRatio > 1 && (e.extra.mount.widthRatio > 2 && (e.extra.mount.widthRatio = 2), (c += (e.extra.mount.widthRatio - 1) * d));
			var g = (m * m) / c,
				x = 0;
			e._scrollDistance_ && (x = (-e._scrollDistance_ * m) / c), a.beginPath(), a.setLineCap('round'), a.setLineWidth(6 * e.pix), a.setStrokeStyle(e.xAxis.scrollBackgroundColor || '#EFEBEF'), a.moveTo(n, o), a.lineTo(h, o), a.stroke(), a.closePath(), a.beginPath(), a.setLineCap('round'), a.setLineWidth(6 * e.pix), a.setStrokeStyle(e.xAxis.scrollColor || '#A6A6A6'), a.moveTo(n + x, o), a.lineTo(n + x + g, o), a.stroke(), a.closePath(), a.setLineCap('butt');
		}
		if (
			(a.save(),
			e._scrollDistance_ && e._scrollDistance_ !== 0 && a.translate(e._scrollDistance_, 0),
			e.xAxis.calibration === !0 &&
				(a.setStrokeStyle(e.xAxis.gridColor || '#cccccc'),
				a.setLineCap('butt'),
				a.setLineWidth(1 * e.pix),
				r.forEach(function (y, b) {
					b > 0 && (a.beginPath(), a.moveTo(y - d / 2, s), a.lineTo(y - d / 2, s + 3 * e.pix), a.closePath(), a.stroke());
				})),
			e.xAxis.disableGrid !== !0 &&
				(a.setStrokeStyle(e.xAxis.gridColor || '#cccccc'),
				a.setLineCap('butt'),
				a.setLineWidth(1 * e.pix),
				e.xAxis.gridType == 'dash' && a.setLineDash([e.xAxis.dashLength * e.pix, e.xAxis.dashLength * e.pix]),
				(e.xAxis.gridEval = e.xAxis.gridEval || 1),
				r.forEach(function (y, b) {
					b % e.xAxis.gridEval == 0 && (a.beginPath(), a.moveTo(y, s), a.lineTo(y, f), a.stroke());
				}),
				a.setLineDash([])),
			e.xAxis.disabled !== !0)
		) {
			let y = i.length;
			e.xAxis.labelCount && (e.xAxis.itemCount ? (y = Math.ceil((i.length / e.xAxis.itemCount) * e.xAxis.labelCount)) : (y = e.xAxis.labelCount), (y -= 1));
			let b = Math.ceil(i.length / y),
				w = [],
				S = i.length;
			for (let D = 0; D < S; D++) D % b !== 0 ? w.push('') : w.push(i[D]);
			w[S - 1] = i[S - 1];
			var v = e.xAxis.fontSize * e.pix || t.fontSize;
			t._xAxisTextAngle_ === 0
				? w.forEach(function (D, _) {
						var A = e.xAxis.formatter ? e.xAxis.formatter(D, _, e) : D,
							T = -G(String(A), v, a) / 2;
						u == 'center' && (T += d / 2);
						var M = 0;
						e.xAxis.scrollShow && (M = 6 * e.pix), a.beginPath(), a.setFontSize(v), a.setFillStyle(e.xAxis.fontColor || e.fontColor), a.fillText(String(A), r[_] + T, s + v + (t.xAxisHeight - M - v) / 2), a.closePath(), a.stroke();
				  })
				: w.forEach(function (D, _) {
						var A = e.xAxis.formatter ? e.xAxis.formatter(D) : D;
						a.save(), a.beginPath(), a.setFontSize(v), a.setFillStyle(e.xAxis.fontColor || e.fontColor);
						var T = G(String(A), v, a),
							M = r[_];
						u == 'center' && (M = r[_] + d / 2), e.xAxis.scrollShow && 6 * e.pix;
						var L = s + 6 * e.pix + v - v * Math.abs(Math.sin(t._xAxisTextAngle_));
						e.xAxis.rotateAngle < 0 ? ((M -= v / 2), (T = 0)) : ((M += v / 2), (T = -T)), a.translate(M, L), a.rotate(-1 * t._xAxisTextAngle_), a.fillText(String(A), T, 0), a.closePath(), a.stroke(), a.restore();
				  });
		}
		a.restore(), e.xAxis.axisLine && (a.beginPath(), a.setStrokeStyle(e.xAxis.axisLineColor), a.setLineWidth(1 * e.pix), a.moveTo(n, e.height - e.area[2]), a.lineTo(h, e.height - e.area[2]), a.stroke());
	}
	function fe(i, e, t, a) {
		if (e.yAxis.disableGrid === !0) return;
		let r = (e.height - e.area[0] - e.area[2]) / e.yAxis.splitNumber,
			n = e.area[3],
			h = e.chartData.xAxisData.xAxisPoints,
			d = e.chartData.xAxisData.eachSpacing,
			u = d * (h.length - 1);
		e.type == 'mount' && e.extra && e.extra.mount && e.extra.mount.widthRatio && e.extra.mount.widthRatio > 1 && (e.extra.mount.widthRatio > 2 && (e.extra.mount.widthRatio = 2), (u += (e.extra.mount.widthRatio - 1) * d));
		let s = n + u,
			f = [],
			o = 1;
		e.xAxis.axisLine === !1 && (o = 0);
		for (let m = o; m < e.yAxis.splitNumber + 1; m++) f.push(e.height - e.area[2] - r * m);
		a.save(),
			e._scrollDistance_ && e._scrollDistance_ !== 0 && a.translate(e._scrollDistance_, 0),
			e.yAxis.gridType == 'dash' && a.setLineDash([e.yAxis.dashLength * e.pix, e.yAxis.dashLength * e.pix]),
			a.setStrokeStyle(e.yAxis.gridColor),
			a.setLineWidth(1 * e.pix),
			f.forEach(function (m, c) {
				a.beginPath(), a.moveTo(n, m), a.lineTo(s, m), a.stroke();
			}),
			a.setLineDash([]),
			a.restore();
	}
	function te(i, e, t, a) {
		if (e.yAxis.disabled === !0) return;
		var l = e.height - e.area[0] - e.area[2],
			r = l / e.yAxis.splitNumber,
			n = e.area[3],
			h = e.width - e.area[1],
			d = e.height - e.area[2],
			u = d + t.xAxisHeight;
		e.xAxis.scrollShow && (u -= 3 * e.pix), e.xAxis.rotateLabel && (u = e.height - e.area[2] + (e.fontSize * e.pix) / 2), a.beginPath(), a.setFillStyle(e.background), e.enableScroll == !0 && e.xAxis.scrollPosition && e.xAxis.scrollPosition !== 'left' && a.fillRect(0, 0, n, u), e.enableScroll == !0 && e.xAxis.scrollPosition && e.xAxis.scrollPosition !== 'right' && a.fillRect(h, 0, e.width, u), a.closePath(), a.stroke();
		let s = e.area[3],
			f = e.width - e.area[1],
			o = e.area[3] + (e.width - e.area[1] - e.area[3]) / 2;
		if (e.yAxis.data)
			for (let c = 0; c < e.yAxis.data.length; c++) {
				let g = e.yAxis.data[c];
				var m = [];
				if (g.type === 'categories') for (let x = 0; x <= g.categories.length; x++) m.push(e.area[0] + l / g.categories.length / 2 + (l / g.categories.length) * x);
				else for (let x = 0; x <= e.yAxis.splitNumber; x++) m.push(e.area[0] + r * x);
				if (g.disabled !== !0) {
					let x = e.chartData.yAxisData.rangesFormat[c],
						v = g.fontSize ? g.fontSize * e.pix : t.fontSize,
						y = e.chartData.yAxisData.yAxisWidth[c],
						b = g.textAlign || 'right';
					if (
						(x.forEach(function (w, S) {
							var D = m[S];
							a.beginPath(), a.setFontSize(v), a.setLineWidth(1 * e.pix), a.setStrokeStyle(g.axisLineColor || '#cccccc'), a.setFillStyle(g.fontColor || e.fontColor);
							let _ = 0,
								A = 4 * e.pix;
							if (y.position == 'left') {
								switch ((g.calibration == !0 && (a.moveTo(s, D), a.lineTo(s - 3 * e.pix, D), (A += 3 * e.pix)), b)) {
									case 'left':
										a.setTextAlign('left'), (_ = s - y.width);
										break;
									case 'right':
										a.setTextAlign('right'), (_ = s - A);
										break;
									default:
										a.setTextAlign('center'), (_ = s - y.width / 2);
								}
								a.fillText(String(w), _, D + v / 2 - 3 * e.pix);
							} else if (y.position == 'right') {
								switch ((g.calibration == !0 && (a.moveTo(f, D), a.lineTo(f + 3 * e.pix, D), (A += 3 * e.pix)), b)) {
									case 'left':
										a.setTextAlign('left'), (_ = f + A);
										break;
									case 'right':
										a.setTextAlign('right'), (_ = f + y.width);
										break;
									default:
										a.setTextAlign('center'), (_ = f + y.width / 2);
								}
								a.fillText(String(w), _, D + v / 2 - 3 * e.pix);
							} else if (y.position == 'center') {
								switch ((g.calibration == !0 && (a.moveTo(o, D), a.lineTo(o - 3 * e.pix, D), (A += 3 * e.pix)), b)) {
									case 'left':
										a.setTextAlign('left'), (_ = o - y.width);
										break;
									case 'right':
										a.setTextAlign('right'), (_ = o - A);
										break;
									default:
										a.setTextAlign('center'), (_ = o - y.width / 2);
								}
								a.fillText(String(w), _, D + v / 2 - 3 * e.pix);
							}
							a.closePath(), a.stroke(), a.setTextAlign('left');
						}),
						g.axisLine !== !1 && (a.beginPath(), a.setStrokeStyle(g.axisLineColor || '#cccccc'), a.setLineWidth(1 * e.pix), y.position == 'left' ? (a.moveTo(s, e.height - e.area[2]), a.lineTo(s, e.area[0])) : y.position == 'right' ? (a.moveTo(f, e.height - e.area[2]), a.lineTo(f, e.area[0])) : y.position == 'center' && (a.moveTo(o, e.height - e.area[2]), a.lineTo(o, e.area[0])), a.stroke()),
						e.yAxis.showTitle)
					) {
						let w = g.titleFontSize * e.pix || t.fontSize,
							S = g.title;
						a.beginPath(),
							a.setFontSize(w),
							a.setFillStyle(g.titleFontColor || e.fontColor),
							y.position == 'left' ? a.fillText(S, s - G(S, w, a) / 2 + (g.titleOffsetX || 0), e.area[0] - (10 - (g.titleOffsetY || 0)) * e.pix) : y.position == 'right' ? a.fillText(S, f - G(S, w, a) / 2 + (g.titleOffsetX || 0), e.area[0] - (10 - (g.titleOffsetY || 0)) * e.pix) : y.position == 'center' && a.fillText(S, o - G(S, w, a) / 2 + (g.titleOffsetX || 0), e.area[0] - (10 - (g.titleOffsetY || 0)) * e.pix),
							a.closePath(),
							a.stroke();
					}
					y.position == 'left' ? (s -= y.width + e.yAxis.padding * e.pix) : (f += y.width + e.yAxis.padding * e.pix);
				}
			}
	}
	function J(i, e, t, a, l) {
		if (e.legend.show === !1) return;
		let r = l.legendData,
			n = r.points,
			h = r.area,
			d = e.legend.padding * e.pix,
			u = e.legend.fontSize * e.pix,
			s = 15 * e.pix,
			f = 5 * e.pix,
			o = e.legend.itemGap * e.pix,
			m = Math.max(e.legend.lineHeight * e.pix, u);
		a.beginPath(),
			a.setLineWidth(e.legend.borderWidth * e.pix),
			a.setStrokeStyle(e.legend.borderColor),
			a.setFillStyle(e.legend.backgroundColor),
			a.moveTo(h.start.x, h.start.y),
			a.rect(h.start.x, h.start.y, h.width, h.height),
			a.closePath(),
			a.fill(),
			a.stroke(),
			n.forEach(function (c, g) {
				let x = 0,
					v = 0;
				(x = r.widthArr[g]), (v = r.heightArr[g]);
				let y = 0,
					b = 0;
				if (e.legend.position == 'top' || e.legend.position == 'bottom') {
					switch (e.legend.float) {
						case 'left':
							y = h.start.x + d;
							break;
						case 'right':
							y = h.start.x + h.width - x;
							break;
						default:
							y = h.start.x + (h.width - x) / 2;
					}
					b = h.start.y + d + g * m;
				} else g == 0 ? (x = 0) : (x = r.widthArr[g - 1]), (y = h.start.x + d + x), (b = h.start.y + d + (h.height - v) / 2);
				a.setFontSize(t.fontSize);
				for (let w = 0; w < c.length; w++) {
					let S = c[w];
					switch (((S.area = [0, 0, 0, 0]), (S.area[0] = y), (S.area[1] = b), (S.area[3] = b + m), a.beginPath(), a.setLineWidth(1 * e.pix), a.setStrokeStyle(S.show ? S.color : e.legend.hiddenColor), a.setFillStyle(S.show ? S.color : e.legend.hiddenColor), S.legendShape)) {
						case 'line':
							a.moveTo(y, b + 0.5 * m - 2 * e.pix), a.fillRect(y, b + 0.5 * m - 2 * e.pix, 15 * e.pix, 4 * e.pix);
							break;
						case 'triangle':
							a.moveTo(y + 7.5 * e.pix, b + 0.5 * m - 5 * e.pix), a.lineTo(y + 2.5 * e.pix, b + 0.5 * m + 5 * e.pix), a.lineTo(y + 12.5 * e.pix, b + 0.5 * m + 5 * e.pix), a.lineTo(y + 7.5 * e.pix, b + 0.5 * m - 5 * e.pix);
							break;
						case 'diamond':
							a.moveTo(y + 7.5 * e.pix, b + 0.5 * m - 5 * e.pix), a.lineTo(y + 2.5 * e.pix, b + 0.5 * m), a.lineTo(y + 7.5 * e.pix, b + 0.5 * m + 5 * e.pix), a.lineTo(y + 12.5 * e.pix, b + 0.5 * m), a.lineTo(y + 7.5 * e.pix, b + 0.5 * m - 5 * e.pix);
							break;
						case 'circle':
							a.moveTo(y + 7.5 * e.pix, b + 0.5 * m), a.arc(y + 7.5 * e.pix, b + 0.5 * m, 5 * e.pix, 0, 2 * Math.PI);
							break;
						case 'rect':
							a.moveTo(y, b + 0.5 * m - 5 * e.pix), a.fillRect(y, b + 0.5 * m - 5 * e.pix, 15 * e.pix, 10 * e.pix);
							break;
						case 'square':
							a.moveTo(y + 5 * e.pix, b + 0.5 * m - 5 * e.pix), a.fillRect(y + 5 * e.pix, b + 0.5 * m - 5 * e.pix, 10 * e.pix, 10 * e.pix);
							break;
						case 'none':
							break;
						default:
							a.moveTo(y, b + 0.5 * m - 5 * e.pix), a.fillRect(y, b + 0.5 * m - 5 * e.pix, 15 * e.pix, 10 * e.pix);
					}
					a.closePath(), a.fill(), a.stroke(), (y += s + f);
					let D = 0.5 * m + 0.5 * u - 2;
					const _ = S.legendText ? S.legendText : S.name;
					a.beginPath(), a.setFontSize(u), a.setFillStyle(S.show ? e.legend.fontColor : e.legend.hiddenColor), a.fillText(_, y, b + D), a.closePath(), a.stroke(), e.legend.position == 'top' || e.legend.position == 'bottom' ? ((y += G(_, u, a) + o), (S.area[2] = y)) : ((S.area[2] = y + G(_, u, a) + o), (y -= s + f), (b += m));
				}
			});
	}
	function ea(i, e, t, a) {
		var l = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1,
			r = F({}, { activeOpacity: 0.5, activeRadius: 10, offsetAngle: 0, labelWidth: 15, ringWidth: 30, customRadius: 0, border: !1, borderWidth: 2, borderColor: '#FFFFFF', centerColor: '#FFFFFF', linearType: 'none', customColor: [] }, e.type == 'pie' ? e.extra.pie : e.extra.ring),
			n = { x: e.area[3] + (e.width - e.area[1] - e.area[3]) / 2, y: e.area[0] + (e.height - e.area[0] - e.area[2]) / 2 };
		t.pieChartLinePadding == 0 && (t.pieChartLinePadding = r.activeRadius * e.pix);
		var h = Math.min((e.width - e.area[1] - e.area[3]) / 2 - t.pieChartLinePadding - t.pieChartTextPadding - t._pieTextMaxLength_, (e.height - e.area[0] - e.area[2]) / 2 - t.pieChartLinePadding - t.pieChartTextPadding);
		(h = h < 10 ? 10 : h), r.customRadius > 0 && (h = r.customRadius * e.pix), (i = Ee(i, h, l));
		var d = r.activeRadius * e.pix;
		if (
			((r.customColor = ae(r.linearType, r.customColor, i, t)),
			(i = i.map(function (s) {
				return (s._start_ += (r.offsetAngle * Math.PI) / 180), s;
			})),
			i.forEach(function (s, f) {
				e.tooltip && e.tooltip.index == f && (a.beginPath(), a.setFillStyle(P(s.color, r.activeOpacity || 0.5)), a.moveTo(n.x, n.y), a.arc(n.x, n.y, s._radius_ + d, s._start_, s._start_ + 2 * s._proportion_ * Math.PI), a.closePath(), a.fill()), a.beginPath(), a.setLineWidth(r.borderWidth * e.pix), (a.lineJoin = 'round'), a.setStrokeStyle(r.borderColor);
				var o = s.color;
				if (r.linearType == 'custom') {
					var m;
					a.createCircularGradient ? (m = a.createCircularGradient(n.x, n.y, s._radius_)) : (m = a.createRadialGradient(n.x, n.y, 0, n.x, n.y, s._radius_)), m.addColorStop(0, P(r.customColor[s.linearIndex], 1)), m.addColorStop(1, P(s.color, 1)), (o = m);
				}
				a.setFillStyle(o), a.moveTo(n.x, n.y), a.arc(n.x, n.y, s._radius_, s._start_, s._start_ + 2 * s._proportion_ * Math.PI), a.closePath(), a.fill(), r.border == !0 && a.stroke();
			}),
			e.type === 'ring')
		) {
			var u = h * 0.6;
			typeof r.ringWidth == 'number' && r.ringWidth > 0 && (u = Math.max(0, h - r.ringWidth * e.pix)), a.beginPath(), a.setFillStyle(r.centerColor), a.moveTo(n.x, n.y), a.arc(n.x, n.y, u, 0, 2 * Math.PI), a.closePath(), a.fill();
		}
		return e.dataLabel !== !1 && l === 1 && Qe(i, e, t, a, h, n), l === 1 && e.type === 'ring' && We(e, t, a, n), { center: n, radius: h, series: i };
	}
	function ai(i, e, t, a) {
		var l = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1,
			r = F({}, { type: 'area', activeOpacity: 0.5, activeRadius: 10, offsetAngle: 0, labelWidth: 15, border: !1, borderWidth: 2, borderColor: '#FFFFFF', linearType: 'none', customColor: [] }, e.extra.rose);
		t.pieChartLinePadding == 0 && (t.pieChartLinePadding = r.activeRadius * e.pix);
		var n = { x: e.area[3] + (e.width - e.area[1] - e.area[3]) / 2, y: e.area[0] + (e.height - e.area[0] - e.area[2]) / 2 },
			h = Math.min((e.width - e.area[1] - e.area[3]) / 2 - t.pieChartLinePadding - t.pieChartTextPadding - t._pieTextMaxLength_, (e.height - e.area[0] - e.area[2]) / 2 - t.pieChartLinePadding - t.pieChartTextPadding);
		h = h < 10 ? 10 : h;
		var d = r.minRadius || h * 0.5;
		i = qe(i, r.type, d, h, l);
		var u = r.activeRadius * e.pix;
		return (
			(r.customColor = ae(r.linearType, r.customColor, i, t)),
			(i = i.map(function (s) {
				return (s._start_ += ((r.offsetAngle || 0) * Math.PI) / 180), s;
			})),
			i.forEach(function (s, f) {
				e.tooltip && e.tooltip.index == f && (a.beginPath(), a.setFillStyle(P(s.color, r.activeOpacity || 0.5)), a.moveTo(n.x, n.y), a.arc(n.x, n.y, u + s._radius_, s._start_, s._start_ + 2 * s._rose_proportion_ * Math.PI), a.closePath(), a.fill()), a.beginPath(), a.setLineWidth(r.borderWidth * e.pix), (a.lineJoin = 'round'), a.setStrokeStyle(r.borderColor);
				var o = s.color;
				if (r.linearType == 'custom') {
					var m;
					a.createCircularGradient ? (m = a.createCircularGradient(n.x, n.y, s._radius_)) : (m = a.createRadialGradient(n.x, n.y, 0, n.x, n.y, s._radius_)), m.addColorStop(0, P(r.customColor[s.linearIndex], 1)), m.addColorStop(1, P(s.color, 1)), (o = m);
				}
				a.setFillStyle(o), a.moveTo(n.x, n.y), a.arc(n.x, n.y, s._radius_, s._start_, s._start_ + 2 * s._rose_proportion_ * Math.PI), a.closePath(), a.fill(), r.border == !0 && a.stroke();
			}),
			e.dataLabel !== !1 && l === 1 && Qe(i, e, t, a, h, n),
			{ center: n, radius: h, series: i }
		);
	}
	function ii(i, e, t, a) {
		var l = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1,
			r = F({}, { startAngle: 0.75, endAngle: 0.25, type: 'default', lineCap: 'round', width: 12, gap: 2, linearType: 'none', customColor: [] }, e.extra.arcbar);
		i = pa(i, r, l);
		var n;
		r.centerX || r.centerY ? (n = { x: r.centerX ? r.centerX : e.width / 2, y: r.centerY ? r.centerY : e.height / 2 }) : (n = { x: e.width / 2, y: e.height / 2 });
		var h;
		r.radius ? (h = r.radius) : ((h = Math.min(n.x, n.y)), (h -= 5 * e.pix), (h -= r.width / 2)), (h = h < 10 ? 10 : h), (r.customColor = ae(r.linearType, r.customColor, i, t));
		for (let s = 0; s < i.length; s++) {
			let f = i[s];
			a.setLineWidth(r.width * e.pix), a.setStrokeStyle(r.backgroundColor || '#E9E9E9'), a.setLineCap(r.lineCap), a.beginPath(), r.type == 'default' ? a.arc(n.x, n.y, h - (r.width * e.pix + r.gap * e.pix) * s, r.startAngle * Math.PI, r.endAngle * Math.PI, !1) : a.arc(n.x, n.y, h - (r.width * e.pix + r.gap * e.pix) * s, 0, 2 * Math.PI, !1), a.stroke();
			var d = f.color;
			if (r.linearType == 'custom') {
				var u = a.createLinearGradient(n.x - h, n.y, n.x + h, n.y);
				u.addColorStop(1, P(r.customColor[f.linearIndex], 1)), u.addColorStop(0, P(f.color, 1)), (d = u);
			}
			a.setLineWidth(r.width * e.pix), a.setStrokeStyle(d), a.setLineCap(r.lineCap), a.beginPath(), a.arc(n.x, n.y, h - (r.width * e.pix + r.gap * e.pix) * s, r.startAngle * Math.PI, f._proportion_ * Math.PI, !1), a.stroke();
		}
		return We(e, t, a, n), { center: n, radius: h, series: i };
	}
	function ri(i, e, t, a, l) {
		var r = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 1,
			n = F({}, { type: 'default', startAngle: 0.75, endAngle: 0.25, width: 15, labelOffset: 13, splitLine: { fixRadius: 0, splitNumber: 10, width: 15, color: '#FFFFFF', childNumber: 5, childWidth: 5 }, pointer: { width: 15, color: 'auto' } }, t.extra.gauge);
		n.oldAngle == null && (n.oldAngle = n.startAngle), n.oldData == null && (n.oldData = 0), (i = La(i, n.startAngle, n.endAngle));
		var h = { x: t.width / 2, y: t.height / 2 },
			d = Math.min(h.x, h.y);
		(d -= 5 * t.pix), (d -= n.width / 2), (d = d < 10 ? 10 : d);
		var u = d - n.width,
			s = 0;
		if (n.type == 'progress') {
			var f = d - n.width * 3;
			l.beginPath();
			let o = l.createLinearGradient(h.x, h.y - f, h.x, h.y + f);
			o.addColorStop('0', P(e[0].color, 0.3)), o.addColorStop('1.0', P('#FFFFFF', 0.1)), l.setFillStyle(o), l.arc(h.x, h.y, f, 0, 2 * Math.PI, !1), l.fill(), l.setLineWidth(n.width), l.setStrokeStyle(P(e[0].color, 0.3)), l.setLineCap('round'), l.beginPath(), l.arc(h.x, h.y, u, n.startAngle * Math.PI, n.endAngle * Math.PI, !1), l.stroke(), (s = n.startAngle - n.endAngle + 1), s / n.splitLine.splitNumber;
			let m = s / n.splitLine.splitNumber / n.splitLine.childNumber,
				c = -d - n.width * 0.5 - n.splitLine.fixRadius,
				g = -d - n.width - n.splitLine.fixRadius + n.splitLine.width;
			l.save(), l.translate(h.x, h.y), l.rotate((n.startAngle - 1) * Math.PI);
			let x = n.splitLine.splitNumber * n.splitLine.childNumber + 1,
				v = e[0].data * r;
			for (let w = 0; w < x; w++) l.beginPath(), v > w / x ? l.setStrokeStyle(P(e[0].color, 1)) : l.setStrokeStyle(P(e[0].color, 0.3)), l.setLineWidth(3 * t.pix), l.moveTo(c, 0), l.lineTo(g, 0), l.stroke(), l.rotate(m * Math.PI);
			l.restore(), (e = Da(e, n, r)), l.setLineWidth(n.width), l.setStrokeStyle(e[0].color), l.setLineCap('round'), l.beginPath(), l.arc(h.x, h.y, u, n.startAngle * Math.PI, e[0]._proportion_ * Math.PI, !1), l.stroke();
			let y = d - n.width * 2.5;
			l.save(), l.translate(h.x, h.y), l.rotate((e[0]._proportion_ - 1) * Math.PI), l.beginPath(), l.setLineWidth(n.width / 3);
			let b = l.createLinearGradient(0, -y * 0.6, 0, y * 0.6);
			b.addColorStop('0', P('#FFFFFF', 0)), b.addColorStop('0.5', P(e[0].color, 1)), b.addColorStop('1.0', P('#FFFFFF', 0)), l.setStrokeStyle(b), l.arc(0, 0, y, 0.85 * Math.PI, 1.15 * Math.PI, !1), l.stroke(), l.beginPath(), l.setLineWidth(1), l.setStrokeStyle(e[0].color), l.setFillStyle(e[0].color), l.moveTo(-y - n.width / 3 / 2, -4), l.lineTo(-y - n.width / 3 / 2 - 4, 0), l.lineTo(-y - n.width / 3 / 2, 4), l.lineTo(-y - n.width / 3 / 2, -4), l.stroke(), l.fill(), l.restore();
		} else {
			l.setLineWidth(n.width), l.setLineCap('butt');
			for (let v = 0; v < i.length; v++) {
				let y = i[v];
				l.beginPath(), l.setStrokeStyle(y.color), l.arc(h.x, h.y, d, y._startAngle_ * Math.PI, y._endAngle_ * Math.PI, !1), l.stroke();
			}
			l.save(), (s = n.startAngle - n.endAngle + 1);
			let o = s / n.splitLine.splitNumber,
				m = s / n.splitLine.splitNumber / n.splitLine.childNumber,
				c = -d - n.width * 0.5 - n.splitLine.fixRadius,
				g = -d - n.width * 0.5 - n.splitLine.fixRadius + n.splitLine.width,
				x = -d - n.width * 0.5 - n.splitLine.fixRadius + n.splitLine.childWidth;
			l.translate(h.x, h.y), l.rotate((n.startAngle - 1) * Math.PI);
			for (let v = 0; v < n.splitLine.splitNumber + 1; v++) l.beginPath(), l.setStrokeStyle(n.splitLine.color), l.setLineWidth(2 * t.pix), l.moveTo(c, 0), l.lineTo(g, 0), l.stroke(), l.rotate(o * Math.PI);
			l.restore(), l.save(), l.translate(h.x, h.y), l.rotate((n.startAngle - 1) * Math.PI);
			for (let v = 0; v < n.splitLine.splitNumber * n.splitLine.childNumber + 1; v++) l.beginPath(), l.setStrokeStyle(n.splitLine.color), l.setLineWidth(1 * t.pix), l.moveTo(c, 0), l.lineTo(x, 0), l.stroke(), l.rotate(m * Math.PI);
			l.restore(), (e = Ma(e, i, n, r));
			for (let v = 0; v < e.length; v++) {
				let y = e[v];
				l.save(), l.translate(h.x, h.y), l.rotate((y._proportion_ - 1) * Math.PI), l.beginPath(), l.setFillStyle(y.color), l.moveTo(n.pointer.width, 0), l.lineTo(0, -n.pointer.width / 2), l.lineTo(-u, 0), l.lineTo(0, n.pointer.width / 2), l.lineTo(n.pointer.width, 0), l.closePath(), l.fill(), l.beginPath(), l.setFillStyle('#FFFFFF'), l.arc(0, 0, n.pointer.width / 6, 0, 2 * Math.PI, !1), l.fill(), l.restore();
			}
			t.dataLabel !== !1 && za(n, d, h, t, a, l);
		}
		return We(t, a, l, h), r === 1 && t.type === 'gauge' && ((t.extra.gauge.oldAngle = e[0]._proportion_), (t.extra.gauge.oldData = e[0].data)), { center: h, radius: d, innerRadius: u, categories: i, totalAngle: s };
	}
	function ti(i, e, t, a) {
		var l = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1,
			r = F({}, { gridColor: '#cccccc', gridType: 'radar', gridEval: 1, axisLabel: !1, axisLabelTofix: 0, labelColor: '#666666', labelPointShow: !1, labelPointRadius: 3, labelPointColor: '#cccccc', opacity: 0.2, gridCount: 3, border: !1, borderWidth: 2, linearType: 'none', customColor: [] }, e.extra.radar),
			n = oa(e.categories.length),
			h = { x: e.area[3] + (e.width - e.area[1] - e.area[3]) / 2, y: e.area[0] + (e.height - e.area[0] - e.area[2]) / 2 },
			d = (e.width - e.area[1] - e.area[3]) / 2,
			u = (e.height - e.area[0] - e.area[2]) / 2,
			s = Math.min(d - (da(e.categories, t.fontSize, a) + t.radarLabelTextMargin), u - t.radarLabelTextMargin);
		(s -= t.radarLabelTextMargin * e.pix),
			(s = s < 10 ? 10 : s),
			a.beginPath(),
			a.setLineWidth(1 * e.pix),
			a.setStrokeStyle(r.gridColor),
			n.forEach(function (c, g) {
				var x = ee(s * Math.cos(c), s * Math.sin(c), h);
				a.moveTo(h.x, h.y), g % r.gridEval == 0 && a.lineTo(x.x, x.y);
			}),
			a.stroke(),
			a.closePath();
		for (
			var f = function (g) {
					var x = {};
					if ((a.beginPath(), a.setLineWidth(1 * e.pix), a.setStrokeStyle(r.gridColor), r.gridType == 'radar'))
						n.forEach(function (y, b) {
							var w = ee((s / r.gridCount) * g * Math.cos(y), (s / r.gridCount) * g * Math.sin(y), h);
							b === 0 ? ((x = w), a.moveTo(w.x, w.y)) : a.lineTo(w.x, w.y);
						}),
							a.lineTo(x.x, x.y);
					else {
						var v = ee((s / r.gridCount) * g * Math.cos(1.5), (s / r.gridCount) * g * Math.sin(1.5), h);
						a.arc(h.x, h.y, h.y - v.y, 0, 2 * Math.PI, !1);
					}
					a.stroke(), a.closePath();
				},
				o = 1;
			o <= r.gridCount;
			o++
		)
			f(o);
		r.customColor = ae(r.linearType, r.customColor, i, t);
		var m = Pa(n, h, s, i, e, l);
		if (
			(m.forEach(function (c, g) {
				a.beginPath(), a.setLineWidth(r.borderWidth * e.pix), a.setStrokeStyle(c.color);
				var x = P(c.color, r.opacity);
				if (r.linearType == 'custom') {
					var v;
					a.createCircularGradient ? (v = a.createCircularGradient(h.x, h.y, s)) : (v = a.createRadialGradient(h.x, h.y, 0, h.x, h.y, s)), v.addColorStop(0, P(r.customColor[i[g].linearIndex], r.opacity)), v.addColorStop(1, P(c.color, r.opacity)), (x = v);
				}
				if (
					(a.setFillStyle(x),
					c.data.forEach(function (b, w) {
						w === 0 ? a.moveTo(b.position.x, b.position.y) : a.lineTo(b.position.x, b.position.y);
					}),
					a.closePath(),
					a.fill(),
					r.border === !0 && a.stroke(),
					a.closePath(),
					e.dataPointShape !== !1)
				) {
					var y = c.data.map(function (b) {
						return b.position;
					});
					_e(y, c.color, c.pointShape, a, e);
				}
			}),
			r.axisLabel === !0)
		) {
			const c = Math.max(r.max, Math.max.apply(null, Ae(i))),
				g = s / r.gridCount,
				x = e.fontSize * e.pix;
			a.setFontSize(x), a.setFillStyle(e.fontColor), a.setTextAlign('left');
			for (var o = 0; o < r.gridCount + 1; o++) {
				let y = (o * c) / r.gridCount;
				(y = y.toFixed(r.axisLabelTofix)), a.fillText(String(y), h.x + 3 * e.pix, h.y - o * g + x / 2);
			}
		}
		return (
			Na(n, s, h, e, t, a),
			e.dataLabel !== !1 &&
				l === 1 &&
				(m.forEach(function (c, g) {
					a.beginPath();
					var x = c.textSize * e.pix || t.fontSize;
					a.setFontSize(x),
						a.setFillStyle(c.textColor || e.fontColor),
						c.data.forEach(function (v, y) {
							Math.abs(v.position.x - h.x) < 2 ? (v.position.y < h.y ? (a.setTextAlign('center'), a.fillText(v.value, v.position.x, v.position.y - 4)) : (a.setTextAlign('center'), a.fillText(v.value, v.position.x, v.position.y + x + 2))) : v.position.x < h.x ? (a.setTextAlign('right'), a.fillText(v.value, v.position.x - 4, v.position.y + x / 2 - 2)) : (a.setTextAlign('left'), a.fillText(v.value, v.position.x + 4, v.position.y + x / 2 - 2));
						}),
						a.closePath(),
						a.stroke();
				}),
				a.setTextAlign('left')),
			{ center: h, radius: s, angleList: n }
		);
	}
	function me(i, e) {
		var t = Array(2),
			a = (i * 2003750834e-2) / 180,
			l = Math.log(Math.tan(((90 + e) * Math.PI) / 360)) / (Math.PI / 180);
		return (l = (l * 2003750834e-2) / 180), (t[0] = a), (t[1] = l), t;
	}
	function li(i) {
		var e = {},
			t;
		(e.xMin = 180), (e.xMax = 0), (e.yMin = 90), (e.yMax = 0);
		for (var a = 0; a < i.length; a++)
			for (var l = i[a].geometry.coordinates, r = 0; r < l.length; r++) {
				(t = l[r]), t.length == 1 && (t = t[0]);
				for (var n = 0; n < t.length; n++) {
					var h = t[n][0],
						d = t[n][1],
						u = { x: h, y: d };
					(e.xMin = e.xMin < u.x ? e.xMin : u.x), (e.xMax = e.xMax > u.x ? e.xMax : u.x), (e.yMin = e.yMin < u.y ? e.yMin : u.y), (e.yMax = e.yMax > u.y ? e.yMax : u.y);
				}
			}
		return e;
	}
	function aa(i, e, t, a, l, r) {
		return { x: (e - t.xMin) * a + l, y: (t.yMax - i) * a + r };
	}
	function ni(i, e, t, a, l, r) {
		return { x: (e - l) / a + t.xMin, y: t.yMax - (i - r) / a };
	}
	function hi(i, e, t) {
		return !(e[1] == t[1] || (e[1] > i[1] && t[1] > i[1]) || (e[1] < i[1] && t[1] < i[1]) || (e[1] == i[1] && t[1] > i[1]) || (t[1] == i[1] && e[1] > i[1]) || (e[0] < i[0] && t[1] < i[1]) || t[0] - ((t[0] - e[0]) * (t[1] - i[1])) / (t[1] - e[1]) < i[0]);
	}
	function di(i, e, t) {
		let a = 0;
		for (let l = 0; l < e.length; l++) {
			let r = e[l][0];
			e.length == 1 && (r = e[l][0]);
			for (let n = 0; n < r.length - 1; n++) {
				let h = r[n],
					d = r[n + 1];
				t && ((h = me(r[n][0], r[n][1])), (d = me(r[n + 1][0], r[n + 1][1]))), hi(i, h, d) && (a += 1);
			}
		}
		return a % 2 == 1;
	}
	function oi(i, e, t, a) {
		var l = F({}, { border: !0, mercator: !1, borderWidth: 1, borderColor: '#666666', fillOpacity: 0.6, activeBorderColor: '#f04864', activeFillColor: '#facc14', activeFillOpacity: 1 }, e.extra.map),
			r,
			n,
			h = i,
			d = li(h);
		if (l.mercator) {
			var u = me(d.xMax, d.yMax),
				s = me(d.xMin, d.yMin);
			(d.xMax = u[0]), (d.yMax = u[1]), (d.xMin = s[0]), (d.yMin = s[1]);
		}
		for (var f = e.width / Math.abs(d.xMax - d.xMin), o = e.height / Math.abs(d.yMax - d.yMin), m = f < o ? f : o, c = e.width / 2 - (Math.abs(d.xMax - d.xMin) / 2) * m, g = e.height / 2 - (Math.abs(d.yMax - d.yMin) / 2) * m, x = 0; x < h.length; x++) {
			a.beginPath(), a.setLineWidth(l.borderWidth * e.pix), a.setStrokeStyle(l.borderColor), a.setFillStyle(P(i[x].color, i[x].fillOpacity || l.fillOpacity)), e.tooltip && e.tooltip.index == x && (a.setStrokeStyle(l.activeBorderColor), a.setFillStyle(P(l.activeFillColor, l.activeFillOpacity)));
			for (var v = h[x].geometry.coordinates, y = 0; y < v.length; y++) {
				(r = v[y]), r.length == 1 && (r = r[0]);
				for (var b = 0; b < r.length; b++) {
					var w = Array(2);
					l.mercator ? (w = me(r[b][0], r[b][1])) : (w = r[b]), (n = aa(w[1], w[0], d, m, c, g)), b === 0 ? (a.beginPath(), a.moveTo(n.x, n.y)) : a.lineTo(n.x, n.y);
				}
				a.fill(), l.border == !0 && a.stroke();
			}
		}
		if (e.dataLabel == !0)
			for (var x = 0; x < h.length; x++) {
				var S = h[x].properties.centroid;
				if (S) {
					l.mercator && (S = me(h[x].properties.centroid[0], h[x].properties.centroid[1])), (n = aa(S[1], S[0], d, m, c, g));
					let _ = h[x].textSize * e.pix || t.fontSize,
						A = h[x].properties.name;
					a.beginPath(), a.setFontSize(_), a.setFillStyle(h[x].textColor || e.fontColor), a.fillText(A, n.x - G(A, _, a) / 2, n.y + _ / 2), a.closePath(), a.stroke();
				}
			}
		(e.chartData.mapData = { bounds: d, scale: m, xoffset: c, yoffset: g, mercator: l.mercator }), U(e, t, a, 1), a.draw();
	}
	function xe(i, e, t) {
		t = t == 0 ? 1 : t;
		for (var a = [], l = 0; l < t; l++) a[l] = Math.random();
		return (
			Math.floor(
				(a.reduce(function (r, n) {
					return r + n;
				}) /
					t) *
					(e - i)
			) + i
		);
	}
	function ze(i, e, t, a) {
		var l = !1;
		for (let r = 0; r < e.length; r++)
			if (e[r].area)
				if (i[3] < e[r].area[1] || i[0] > e[r].area[2] || i[1] > e[r].area[3] || i[2] < e[r].area[0])
					if (i[0] < 0 || i[1] < 0 || i[2] > t || i[3] > a) {
						l = !0;
						break;
					} else l = !1;
				else {
					l = !0;
					break;
				}
		return l;
	}
	function si(i, e, t) {
		let a = i.series;
		switch (e) {
			case 'normal':
				for (let r = 0; r < a.length; r++) {
					let n = a[r].name,
						h = a[r].textSize * i.pix,
						d = G(n, h, t),
						u,
						s,
						f,
						o = 0;
					for (; o++, (u = xe(-i.width / 2, i.width / 2, 5) - d / 2), (s = xe(-i.height / 2, i.height / 2, 5) + h / 2), (f = [u - 5 + i.width / 2, s - 5 - h + i.height / 2, u + d + 5 + i.width / 2, s + 5 + i.height / 2]), !!ze(f, a, i.width, i.height); )
						if (o == 1e3) {
							f = [-100, -100, -100, -100];
							break;
						}
					a[r].area = f;
				}
				break;
			case 'vertical':
				let l = function () {
					return Math.random() > 0.7;
				};
				for (let r = 0; r < a.length; r++) {
					let n = a[r].name,
						h = a[r].textSize * i.pix,
						d = G(n, h, t),
						u = l(),
						s,
						f,
						o,
						m,
						c = 0;
					for (;;) {
						c++;
						let g;
						if (
							(u
								? ((s = xe(-i.width / 2, i.width / 2, 5) - d / 2),
								  (f = xe(-i.height / 2, i.height / 2, 5) + h / 2),
								  (o = [f - 5 - d + i.width / 2, -s - 5 + i.height / 2, f + 5 + i.width / 2, -s + h + 5 + i.height / 2]),
								  (m = [i.width - (i.width / 2 - i.height / 2) - (-s + h + 5 + i.height / 2) - 5, i.height / 2 - i.width / 2 + (f - 5 - d + i.width / 2) - 5, i.width - (i.width / 2 - i.height / 2) - (-s + h + 5 + i.height / 2) + h, i.height / 2 - i.width / 2 + (f - 5 - d + i.width / 2) + d + 5]),
								  (g = ze(m, a, i.height, i.width)))
								: ((s = xe(-i.width / 2, i.width / 2, 5) - d / 2), (f = xe(-i.height / 2, i.height / 2, 5) + h / 2), (o = [s - 5 + i.width / 2, f - 5 - h + i.height / 2, s + d + 5 + i.width / 2, f + 5 + i.height / 2]), (g = ze(o, a, i.width, i.height))),
							!g)
						)
							break;
						if (c == 1e3) {
							o = [-1e3, -1e3, -1e3, -1e3];
							break;
						}
					}
					u ? ((a[r].area = m), (a[r].areav = o)) : (a[r].area = o), (a[r].rotate = u);
				}
				break;
		}
		return a;
	}
	function fi(i, e, t, a) {
		let l = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1,
			r = F({}, { type: 'normal', autoColors: !0 }, e.extra.word);
		e.chartData.wordCloudData || (e.chartData.wordCloudData = si(e, r.type, a)), a.beginPath(), a.setFillStyle(e.background), a.rect(0, 0, e.width, e.height), a.fill(), a.save();
		let n = e.chartData.wordCloudData;
		a.translate(e.width / 2, e.height / 2);
		for (let h = 0; h < n.length; h++) {
			a.save(), n[h].rotate && a.rotate((90 * Math.PI) / 180);
			let d = n[h].name,
				u = n[h].textSize * e.pix,
				s = G(d, u, a);
			a.beginPath(),
				a.setStrokeStyle(n[h].color),
				a.setFillStyle(n[h].color),
				a.setFontSize(u),
				n[h].rotate
					? n[h].areav[0] > 0 && (e.tooltip && e.tooltip.index == h ? a.strokeText(d, (n[h].areav[0] + 5 - e.width / 2) * l - (s * (1 - l)) / 2, (n[h].areav[1] + 5 + u - e.height / 2) * l) : a.fillText(d, (n[h].areav[0] + 5 - e.width / 2) * l - (s * (1 - l)) / 2, (n[h].areav[1] + 5 + u - e.height / 2) * l))
					: n[h].area[0] > 0 && (e.tooltip && e.tooltip.index == h ? a.strokeText(d, (n[h].area[0] + 5 - e.width / 2) * l - (s * (1 - l)) / 2, (n[h].area[1] + 5 + u - e.height / 2) * l) : a.fillText(d, (n[h].area[0] + 5 - e.width / 2) * l - (s * (1 - l)) / 2, (n[h].area[1] + 5 + u - e.height / 2) * l)),
				a.stroke(),
				a.restore();
		}
		a.restore();
	}
	function ui(i, e, t, a) {
		let l = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1,
			r = F({}, { type: 'funnel', activeWidth: 10, activeOpacity: 0.3, border: !1, borderWidth: 2, borderColor: '#FFFFFF', fillOpacity: 1, labelAlign: 'right', linearType: 'none', customColor: [] }, e.extra.funnel),
			n = (e.height - e.area[0] - e.area[2]) / i.length,
			h = { x: e.area[3] + (e.width - e.area[1] - e.area[3]) / 2, y: e.height - e.area[2] },
			d = r.activeWidth * e.pix,
			u = Math.min((e.width - e.area[1] - e.area[3]) / 2 - d, (e.height - e.area[0] - e.area[2]) / 2 - d);
		if (((i = Ca(i, u, r.type, n, l)), a.save(), a.translate(h.x, h.y), (r.customColor = ae(r.linearType, r.customColor, i, t)), r.type == 'pyramid'))
			for (let o = 0; o < i.length; o++) {
				if (o == i.length - 1) {
					e.tooltip && e.tooltip.index == o && (a.beginPath(), a.setFillStyle(P(i[o].color, r.activeOpacity)), a.moveTo(-d, -n), a.lineTo(-i[o].radius - d, 0), a.lineTo(i[o].radius + d, 0), a.lineTo(d, -n), a.lineTo(-d, -n), a.closePath(), a.fill()), (i[o].funnelArea = [h.x - i[o].radius, h.y - n * (o + 1), h.x + i[o].radius, h.y - n * o]), a.beginPath(), a.setLineWidth(r.borderWidth * e.pix), a.setStrokeStyle(r.borderColor);
					var s = P(i[o].color, r.fillOpacity);
					if (r.linearType == 'custom') {
						var f = a.createLinearGradient(i[o].radius, -n, -i[o].radius, -n);
						f.addColorStop(0, P(i[o].color, r.fillOpacity)), f.addColorStop(0.5, P(r.customColor[i[o].linearIndex], r.fillOpacity)), f.addColorStop(1, P(i[o].color, r.fillOpacity)), (s = f);
					}
					a.setFillStyle(s), a.moveTo(0, -n), a.lineTo(-i[o].radius, 0), a.lineTo(i[o].radius, 0), a.lineTo(0, -n), a.closePath(), a.fill(), r.border == !0 && a.stroke();
				} else {
					e.tooltip && e.tooltip.index == o && (a.beginPath(), a.setFillStyle(P(i[o].color, r.activeOpacity)), a.moveTo(0, 0), a.lineTo(-i[o].radius - d, 0), a.lineTo(-i[o + 1].radius - d, -n), a.lineTo(i[o + 1].radius + d, -n), a.lineTo(i[o].radius + d, 0), a.lineTo(0, 0), a.closePath(), a.fill()), (i[o].funnelArea = [h.x - i[o].radius, h.y - n * (o + 1), h.x + i[o].radius, h.y - n * o]), a.beginPath(), a.setLineWidth(r.borderWidth * e.pix), a.setStrokeStyle(r.borderColor);
					var s = P(i[o].color, r.fillOpacity);
					if (r.linearType == 'custom') {
						var f = a.createLinearGradient(i[o].radius, -n, -i[o].radius, -n);
						f.addColorStop(0, P(i[o].color, r.fillOpacity)), f.addColorStop(0.5, P(r.customColor[i[o].linearIndex], r.fillOpacity)), f.addColorStop(1, P(i[o].color, r.fillOpacity)), (s = f);
					}
					a.setFillStyle(s), a.moveTo(0, 0), a.lineTo(-i[o].radius, 0), a.lineTo(-i[o + 1].radius, -n), a.lineTo(i[o + 1].radius, -n), a.lineTo(i[o].radius, 0), a.lineTo(0, 0), a.closePath(), a.fill(), r.border == !0 && a.stroke();
				}
				a.translate(0, -n);
			}
		else
			for (let o = 0; o < i.length; o++) {
				if (o == 0) {
					e.tooltip && e.tooltip.index == o && (a.beginPath(), a.setFillStyle(P(i[o].color, r.activeOpacity)), a.moveTo(-d, 0), a.lineTo(-i[o].radius - d, -n), a.lineTo(i[o].radius + d, -n), a.lineTo(d, 0), a.lineTo(-d, 0), a.closePath(), a.fill()), (i[o].funnelArea = [h.x - i[o].radius, h.y - n, h.x + i[o].radius, h.y]), a.beginPath(), a.setLineWidth(r.borderWidth * e.pix), a.setStrokeStyle(r.borderColor);
					var s = P(i[o].color, r.fillOpacity);
					if (r.linearType == 'custom') {
						var f = a.createLinearGradient(i[o].radius, -n, -i[o].radius, -n);
						f.addColorStop(0, P(i[o].color, r.fillOpacity)), f.addColorStop(0.5, P(r.customColor[i[o].linearIndex], r.fillOpacity)), f.addColorStop(1, P(i[o].color, r.fillOpacity)), (s = f);
					}
					a.setFillStyle(s), a.moveTo(0, 0), a.lineTo(-i[o].radius, -n), a.lineTo(i[o].radius, -n), a.lineTo(0, 0), a.closePath(), a.fill(), r.border == !0 && a.stroke();
				} else {
					e.tooltip && e.tooltip.index == o && (a.beginPath(), a.setFillStyle(P(i[o].color, r.activeOpacity)), a.moveTo(0, 0), a.lineTo(-i[o - 1].radius - d, 0), a.lineTo(-i[o].radius - d, -n), a.lineTo(i[o].radius + d, -n), a.lineTo(i[o - 1].radius + d, 0), a.lineTo(0, 0), a.closePath(), a.fill()), (i[o].funnelArea = [h.x - i[o].radius, h.y - n * (o + 1), h.x + i[o].radius, h.y - n * o]), a.beginPath(), a.setLineWidth(r.borderWidth * e.pix), a.setStrokeStyle(r.borderColor);
					var s = P(i[o].color, r.fillOpacity);
					if (r.linearType == 'custom') {
						var f = a.createLinearGradient(i[o].radius, -n, -i[o].radius, -n);
						f.addColorStop(0, P(i[o].color, r.fillOpacity)), f.addColorStop(0.5, P(r.customColor[i[o].linearIndex], r.fillOpacity)), f.addColorStop(1, P(i[o].color, r.fillOpacity)), (s = f);
					}
					a.setFillStyle(s), a.moveTo(0, 0), a.lineTo(-i[o - 1].radius, 0), a.lineTo(-i[o].radius, -n), a.lineTo(i[o].radius, -n), a.lineTo(i[o - 1].radius, 0), a.lineTo(0, 0), a.closePath(), a.fill(), r.border == !0 && a.stroke();
				}
				a.translate(0, -n);
			}
		return a.restore(), e.dataLabel !== !1 && l === 1 && gi(i, e, a, n, r.labelAlign, d, h), { center: h, radius: u, series: i };
	}
	function gi(i, e, t, a, l, r, n) {
		for (let h = 0; h < i.length; h++) {
			let d = i[h];
			if (d.labelShow === !1) continue;
			let u,
				s,
				f,
				o,
				m = d.formatter ? d.formatter(d, h, i, e) : de.toFixed(d._proportion_ * 100) + '%';
			(m = d.labelText ? d.labelText : m),
				l == 'right'
					? (e.extra.funnel.type === 'pyramid' ? (h == i.length - 1 ? (u = (d.funnelArea[2] + n.x) / 2) : (u = (d.funnelArea[2] + i[h + 1].funnelArea[2]) / 2)) : h == 0 ? (u = (d.funnelArea[2] + n.x) / 2) : (u = (d.funnelArea[2] + i[h - 1].funnelArea[2]) / 2),
					  (s = u + r * 2),
					  (f = d.funnelArea[1] + a / 2),
					  (o = d.textSize * e.pix || e.fontSize * e.pix),
					  t.setLineWidth(1 * e.pix),
					  t.setStrokeStyle(d.color),
					  t.setFillStyle(d.color),
					  t.beginPath(),
					  t.moveTo(u, f),
					  t.lineTo(s, f),
					  t.stroke(),
					  t.closePath(),
					  t.beginPath(),
					  t.moveTo(s, f),
					  t.arc(s, f, 2 * e.pix, 0, 2 * Math.PI),
					  t.closePath(),
					  t.fill(),
					  t.beginPath(),
					  t.setFontSize(o),
					  t.setFillStyle(d.textColor || e.fontColor),
					  t.fillText(m, s + 5, f + o / 2 - 2),
					  t.closePath(),
					  t.stroke(),
					  t.closePath())
					: (e.extra.funnel.type === 'pyramid' ? (h == i.length - 1 ? (u = (d.funnelArea[0] + n.x) / 2) : (u = (d.funnelArea[0] + i[h + 1].funnelArea[0]) / 2)) : h == 0 ? (u = (d.funnelArea[0] + n.x) / 2) : (u = (d.funnelArea[0] + i[h - 1].funnelArea[0]) / 2),
					  (s = u - r * 2),
					  (f = d.funnelArea[1] + a / 2),
					  (o = d.textSize * e.pix || e.fontSize * e.pix),
					  t.setLineWidth(1 * e.pix),
					  t.setStrokeStyle(d.color),
					  t.setFillStyle(d.color),
					  t.beginPath(),
					  t.moveTo(u, f),
					  t.lineTo(s, f),
					  t.stroke(),
					  t.closePath(),
					  t.beginPath(),
					  t.moveTo(s, f),
					  t.arc(s, f, 2, 0, 2 * Math.PI),
					  t.closePath(),
					  t.fill(),
					  t.beginPath(),
					  t.setFontSize(o),
					  t.setFillStyle(d.textColor || e.fontColor),
					  t.fillText(m, s - 5 - G(m, o, t), f + o / 2 - 2),
					  t.closePath(),
					  t.stroke(),
					  t.closePath());
		}
	}
	function q(i, e) {
		e.draw();
	}
	var ci = {
		easeIn: function (e) {
			return Math.pow(e, 3);
		},
		easeOut: function (e) {
			return Math.pow(e - 1, 3) + 1;
		},
		easeInOut: function (e) {
			return (e /= 0.5) < 1 ? 0.5 * Math.pow(e, 3) : 0.5 * (Math.pow(e - 2, 3) + 2);
		},
		linear: function (e) {
			return e;
		}
	};
	function V(i) {
		(this.isStop = !1), (i.duration = typeof i.duration > 'u' ? 1e3 : i.duration), (i.timing = i.timing || 'easeInOut');
		var e = 17;
		function t() {
			return typeof setTimeout < 'u'
				? function (n, h) {
						setTimeout(function () {
							var d = +new Date();
							n(d);
						}, h);
				  }
				: typeof requestAnimationFrame < 'u'
				? requestAnimationFrame
				: function (n) {
						n(null);
				  };
		}
		var a = t(),
			l = null,
			r = function (h) {
				if (h === null || this.isStop === !0) {
					i.onProcess && i.onProcess(1), i.onAnimationFinish && i.onAnimationFinish();
					return;
				}
				if ((l === null && (l = h), h - l < i.duration)) {
					var d = (h - l) / i.duration,
						u = ci[i.timing];
					(d = u(d)), i.onProcess && i.onProcess(d), a(r, e);
				} else i.onProcess && i.onProcess(1), i.onAnimationFinish && i.onAnimationFinish();
			};
		(r = r.bind(this)), a(r, e);
	}
	V.prototype.stop = function () {
		this.isStop = !0;
	};
	function j(i, e, t, a) {
		var l = this,
			r = e.series;
		(i === 'pie' || i === 'ring' || i === 'mount' || i === 'rose' || i === 'funnel') && (r = na(r, e));
		var n = e.categories;
		if (i === 'mount') {
			n = [];
			for (let c = 0; c < r.length; c++) r[c].show !== !1 && n.push(r[c].name);
			e.categories = n;
		}
		r = ke(r, e, t);
		var h = e.animation ? e.duration : 0;
		l.animationInstance && l.animationInstance.stop();
		var d = null;
		if (i == 'candle') {
			let c = F({}, e.extra.candle.average);
			c.show ? ((d = ta(c.day, c.name, c.color, r[0].data)), (d = ke(d, e, t)), (e.seriesMA = d)) : e.seriesMA ? (d = e.seriesMA = ke(e.seriesMA, e, t)) : (d = r);
		} else d = r;
		(e._series_ = r = $e(r)), (e.area = new Array(4));
		for (let c = 0; c < 4; c++) e.area[c] = e.padding[c] * e.pix;
		var u = Aa(d, e, t, e.chartData, a),
			s = u.area.wholeHeight,
			f = u.area.wholeWidth;
		switch (e.legend.position) {
			case 'top':
				e.area[0] += s;
				break;
			case 'bottom':
				e.area[2] += s;
				break;
			case 'left':
				e.area[3] += f;
				break;
			case 'right':
				e.area[1] += f;
				break;
		}
		let o = {},
			m = 0;
		if (e.type === 'line' || e.type === 'column' || e.type === 'mount' || e.type === 'area' || e.type === 'mix' || e.type === 'candle' || e.type === 'scatter' || e.type === 'bubble' || e.type === 'bar') {
			if (((o = Be(r, e, t, a)), (m = o.yAxisWidth), e.yAxis.showTitle)) {
				let x = 0;
				for (let v = 0; v < e.yAxis.data.length; v++) x = Math.max(x, e.yAxis.data[v].titleFontSize ? e.yAxis.data[v].titleFontSize * e.pix : t.fontSize);
				e.area[0] += x;
			}
			let c = 0,
				g = 0;
			for (let x = 0; x < m.length; x++) m[x].position == 'left' ? (g > 0 ? (e.area[3] += m[x].width + e.yAxis.padding * e.pix) : (e.area[3] += m[x].width), (g += 1)) : m[x].position == 'right' && (c > 0 ? (e.area[1] += m[x].width + e.yAxis.padding * e.pix) : (e.area[1] += m[x].width), (c += 1));
		} else t.yAxisWidth = m;
		if (((e.chartData.yAxisData = o), e.categories && e.categories.length && e.type !== 'radar' && e.type !== 'gauge' && e.type !== 'bar')) {
			e.chartData.xAxisData = we(e.categories, e);
			let c = Ye(e.categories, e, t, e.chartData.xAxisData.eachSpacing, a),
				g = c.xAxisHeight,
				x = c.angle;
			(t.xAxisHeight = g), (t._xAxisTextAngle_ = x), (e.area[2] += g), (e.chartData.categoriesData = c);
		} else if (e.type === 'line' || e.type === 'area' || e.type === 'scatter' || e.type === 'bubble' || e.type === 'bar') {
			(e.chartData.xAxisData = _a(r, e, t, a)), (n = e.chartData.xAxisData.rangesFormat);
			let c = Ye(n, e, t, e.chartData.xAxisData.eachSpacing, a),
				g = c.xAxisHeight,
				x = c.angle;
			(t.xAxisHeight = g), (t._xAxisTextAngle_ = x), (e.area[2] += g), (e.chartData.categoriesData = c);
		} else e.chartData.xAxisData = { xAxisPoints: [] };
		if (e.enableScroll && e.xAxis.scrollAlign == 'right' && e._scrollDistance_ === void 0) {
			let c = 0,
				g = e.chartData.xAxisData.xAxisPoints,
				x = e.chartData.xAxisData.startX,
				v = e.chartData.xAxisData.endX,
				b = e.chartData.xAxisData.eachSpacing * (g.length - 1);
			(c = v - x - b), (l.scrollOption.currentOffset = c), (l.scrollOption.startTouchX = c), (l.scrollOption.distance = 0), (l.scrollOption.lastMoveTime = 0), (e._scrollDistance_ = c);
		}
		switch (((i === 'pie' || i === 'ring' || i === 'rose') && (t._pieTextMaxLength_ = e.dataLabel === !1 ? 0 : Fa(d, t, a, e)), i)) {
			case 'word':
				this.animationInstance = new V({
					timing: e.timing,
					duration: h,
					onProcess: function (c) {
						a.clearRect(0, 0, e.width, e.height), e.rotate && Y(a, e), fi(r, e, t, a, c), q(e, a);
					},
					onAnimationFinish: function () {
						l.uevent.trigger('renderComplete');
					}
				});
				break;
			case 'map':
				a.clearRect(0, 0, e.width, e.height), oi(r, e, t, a);
				break;
			case 'funnel':
				this.animationInstance = new V({
					timing: e.timing,
					duration: h,
					onProcess: function (c) {
						a.clearRect(0, 0, e.width, e.height), e.rotate && Y(a, e), (e.chartData.funnelData = ui(r, e, t, a, c)), J(e.series, e, t, a, e.chartData), U(e, t, a, c), q(e, a);
					},
					onAnimationFinish: function () {
						l.uevent.trigger('renderComplete');
					}
				});
				break;
			case 'line':
				this.animationInstance = new V({
					timing: e.timing,
					duration: h,
					onProcess: function (g) {
						a.clearRect(0, 0, e.width, e.height), e.rotate && Y(a, e), fe(n, e, t, a), re(n, e, t, a);
						var x = Qa(r, e, t, a, g),
							v = x.xAxisPoints,
							y = x.calPoints,
							b = x.eachSpacing;
						(e.chartData.xAxisPoints = v), (e.chartData.calPoints = y), (e.chartData.eachSpacing = b), te(r, e, t, a), e.enableMarkLine !== !1 && g === 1 && ie(e, t, a), J(e.series, e, t, a, e.chartData), U(e, t, a, g), q(e, a);
					},
					onAnimationFinish: function () {
						l.uevent.trigger('renderComplete');
					}
				});
				break;
			case 'scatter':
				this.animationInstance = new V({
					timing: e.timing,
					duration: h,
					onProcess: function (g) {
						a.clearRect(0, 0, e.width, e.height), e.rotate && Y(a, e), fe(n, e, t, a), re(n, e, t, a);
						var x = Za(r, e, t, a, g),
							v = x.xAxisPoints,
							y = x.calPoints,
							b = x.eachSpacing;
						(e.chartData.xAxisPoints = v), (e.chartData.calPoints = y), (e.chartData.eachSpacing = b), te(r, e, t, a), e.enableMarkLine !== !1 && g === 1 && ie(e, t, a), J(e.series, e, t, a, e.chartData), U(e, t, a, g), q(e, a);
					},
					onAnimationFinish: function () {
						l.uevent.trigger('renderComplete');
					}
				});
				break;
			case 'bubble':
				this.animationInstance = new V({
					timing: e.timing,
					duration: h,
					onProcess: function (g) {
						a.clearRect(0, 0, e.width, e.height), e.rotate && Y(a, e), fe(n, e, t, a), re(n, e, t, a);
						var x = Ka(r, e, t, a, g),
							v = x.xAxisPoints,
							y = x.calPoints,
							b = x.eachSpacing;
						(e.chartData.xAxisPoints = v), (e.chartData.calPoints = y), (e.chartData.eachSpacing = b), te(r, e, t, a), e.enableMarkLine !== !1 && g === 1 && ie(e, t, a), J(e.series, e, t, a, e.chartData), U(e, t, a, g), q(e, a);
					},
					onAnimationFinish: function () {
						l.uevent.trigger('renderComplete');
					}
				});
				break;
			case 'mix':
				this.animationInstance = new V({
					timing: e.timing,
					duration: h,
					onProcess: function (g) {
						a.clearRect(0, 0, e.width, e.height), e.rotate && Y(a, e), fe(n, e, t, a), re(n, e, t, a);
						var x = ei(r, e, t, a, g),
							v = x.xAxisPoints,
							y = x.calPoints,
							b = x.eachSpacing;
						(e.chartData.xAxisPoints = v), (e.chartData.calPoints = y), (e.chartData.eachSpacing = b), te(r, e, t, a), e.enableMarkLine !== !1 && g === 1 && ie(e, t, a), J(e.series, e, t, a, e.chartData), U(e, t, a, g), q(e, a);
					},
					onAnimationFinish: function () {
						l.uevent.trigger('renderComplete');
					}
				});
				break;
			case 'column':
				this.animationInstance = new V({
					timing: e.timing,
					duration: h,
					onProcess: function (g) {
						a.clearRect(0, 0, e.width, e.height), e.rotate && Y(a, e), fe(n, e, t, a), re(n, e, t, a);
						var x = Ya(r, e, t, a, g),
							v = x.xAxisPoints,
							y = x.calPoints,
							b = x.eachSpacing;
						(e.chartData.xAxisPoints = v), (e.chartData.calPoints = y), (e.chartData.eachSpacing = b), te(r, e, t, a), e.enableMarkLine !== !1 && g === 1 && ie(e, t, a), J(e.series, e, t, a, e.chartData), U(e, t, a, g), q(e, a);
					},
					onAnimationFinish: function () {
						l.uevent.trigger('renderComplete');
					}
				});
				break;
			case 'mount':
				this.animationInstance = new V({
					timing: e.timing,
					duration: h,
					onProcess: function (g) {
						a.clearRect(0, 0, e.width, e.height), e.rotate && Y(a, e), fe(n, e, t, a), re(n, e, t, a);
						var x = qa(r, e, t, a, g),
							v = x.xAxisPoints,
							y = x.calPoints,
							b = x.eachSpacing;
						(e.chartData.xAxisPoints = v), (e.chartData.calPoints = y), (e.chartData.eachSpacing = b), te(r, e, t, a), e.enableMarkLine !== !1 && g === 1 && ie(e, t, a), J(e.series, e, t, a, e.chartData), U(e, t, a, g), q(e, a);
					},
					onAnimationFinish: function () {
						l.uevent.trigger('renderComplete');
					}
				});
				break;
			case 'bar':
				this.animationInstance = new V({
					timing: e.timing,
					duration: h,
					onProcess: function (g) {
						a.clearRect(0, 0, e.width, e.height), e.rotate && Y(a, e), re(n, e, t, a);
						var x = ja(r, e, t, a, g),
							v = x.yAxisPoints,
							y = x.calPoints,
							b = x.eachSpacing;
						(e.chartData.yAxisPoints = v), (e.chartData.xAxisPoints = e.chartData.xAxisData.xAxisPoints), (e.chartData.calPoints = y), (e.chartData.eachSpacing = b), te(r, e, t, a), e.enableMarkLine !== !1 && g === 1 && ie(e, t, a), J(e.series, e, t, a, e.chartData), U(e, t, a, g), q(e, a);
					},
					onAnimationFinish: function () {
						l.uevent.trigger('renderComplete');
					}
				});
				break;
			case 'area':
				this.animationInstance = new V({
					timing: e.timing,
					duration: h,
					onProcess: function (g) {
						a.clearRect(0, 0, e.width, e.height), e.rotate && Y(a, e), fe(n, e, t, a), re(n, e, t, a);
						var x = Ja(r, e, t, a, g),
							v = x.xAxisPoints,
							y = x.calPoints,
							b = x.eachSpacing;
						(e.chartData.xAxisPoints = v), (e.chartData.calPoints = y), (e.chartData.eachSpacing = b), te(r, e, t, a), e.enableMarkLine !== !1 && g === 1 && ie(e, t, a), J(e.series, e, t, a, e.chartData), U(e, t, a, g), q(e, a);
					},
					onAnimationFinish: function () {
						l.uevent.trigger('renderComplete');
					}
				});
				break;
			case 'ring':
				this.animationInstance = new V({
					timing: e.timing,
					duration: h,
					onProcess: function (g) {
						a.clearRect(0, 0, e.width, e.height), e.rotate && Y(a, e), (e.chartData.pieData = ea(r, e, t, a, g)), J(e.series, e, t, a, e.chartData), U(e, t, a, g), q(e, a);
					},
					onAnimationFinish: function () {
						l.uevent.trigger('renderComplete');
					}
				});
				break;
			case 'pie':
				this.animationInstance = new V({
					timing: e.timing,
					duration: h,
					onProcess: function (g) {
						a.clearRect(0, 0, e.width, e.height), e.rotate && Y(a, e), (e.chartData.pieData = ea(r, e, t, a, g)), J(e.series, e, t, a, e.chartData), U(e, t, a, g), q(e, a);
					},
					onAnimationFinish: function () {
						l.uevent.trigger('renderComplete');
					}
				});
				break;
			case 'rose':
				this.animationInstance = new V({
					timing: e.timing,
					duration: h,
					onProcess: function (g) {
						a.clearRect(0, 0, e.width, e.height), e.rotate && Y(a, e), (e.chartData.pieData = ai(r, e, t, a, g)), J(e.series, e, t, a, e.chartData), U(e, t, a, g), q(e, a);
					},
					onAnimationFinish: function () {
						l.uevent.trigger('renderComplete');
					}
				});
				break;
			case 'radar':
				this.animationInstance = new V({
					timing: e.timing,
					duration: h,
					onProcess: function (g) {
						a.clearRect(0, 0, e.width, e.height), e.rotate && Y(a, e), (e.chartData.radarData = ti(r, e, t, a, g)), J(e.series, e, t, a, e.chartData), U(e, t, a, g), q(e, a);
					},
					onAnimationFinish: function () {
						l.uevent.trigger('renderComplete');
					}
				});
				break;
			case 'arcbar':
				this.animationInstance = new V({
					timing: e.timing,
					duration: h,
					onProcess: function (g) {
						a.clearRect(0, 0, e.width, e.height), e.rotate && Y(a, e), (e.chartData.arcbarData = ii(r, e, t, a, g)), q(e, a);
					},
					onAnimationFinish: function () {
						l.uevent.trigger('renderComplete');
					}
				});
				break;
			case 'gauge':
				this.animationInstance = new V({
					timing: e.timing,
					duration: h,
					onProcess: function (g) {
						a.clearRect(0, 0, e.width, e.height), e.rotate && Y(a, e), (e.chartData.gaugeData = ri(n, r, e, t, a, g)), q(e, a);
					},
					onAnimationFinish: function () {
						l.uevent.trigger('renderComplete');
					}
				});
				break;
			case 'candle':
				this.animationInstance = new V({
					timing: e.timing,
					duration: h,
					onProcess: function (g) {
						a.clearRect(0, 0, e.width, e.height), e.rotate && Y(a, e), fe(n, e, t, a), re(n, e, t, a);
						var x = Ua(r, d, e, t, a, g),
							v = x.xAxisPoints,
							y = x.calPoints,
							b = x.eachSpacing;
						(e.chartData.xAxisPoints = v), (e.chartData.calPoints = y), (e.chartData.eachSpacing = b), te(r, e, t, a), e.enableMarkLine !== !1 && g === 1 && ie(e, t, a), J(d || e.series, e, t, a, e.chartData), U(e, t, a, g), q(e, a);
					},
					onAnimationFinish: function () {
						l.uevent.trigger('renderComplete');
					}
				});
				break;
		}
	}
	function Pe() {
		this.events = {};
	}
	(Pe.prototype.addEventListener = function (i, e) {
		(this.events[i] = this.events[i] || []), this.events[i].push(e);
	}),
		(Pe.prototype.delEventListener = function (i) {
			this.events[i] = [];
		}),
		(Pe.prototype.trigger = function () {
			for (var i = arguments.length, e = Array(i), t = 0; t < i; t++) e[t] = arguments[t];
			var a = e[0],
				l = e.slice(1);
			this.events[a] &&
				this.events[a].forEach(function (r) {
					try {
						r.apply(null, l);
					} catch {}
				});
		});
	var Z = function (e) {
		(e.pix = e.pixelRatio ? e.pixelRatio : 1),
			(e.fontSize = e.fontSize ? e.fontSize : 13),
			(e.fontColor = e.fontColor ? e.fontColor : Q.fontColor),
			(e.background == '' || e.background == 'none') && (e.background = '#FFFFFF'),
			(e.title = F({}, e.title)),
			(e.subtitle = F({}, e.subtitle)),
			(e.duration = e.duration ? e.duration : 1e3),
			(e.yAxis = F({}, { data: [], showTitle: !1, disabled: !1, disableGrid: !1, splitNumber: 5, gridType: 'solid', dashLength: 4 * e.pix, gridColor: '#cccccc', padding: 10, fontColor: '#666666' }, e.yAxis)),
			(e.xAxis = F({}, { rotateLabel: !1, rotateAngle: 45, disabled: !1, disableGrid: !1, splitNumber: 5, calibration: !1, gridType: 'solid', dashLength: 4, scrollAlign: 'left', boundaryGap: 'center', axisLine: !0, axisLineColor: '#cccccc' }, e.xAxis)),
			(e.xAxis.scrollPosition = e.xAxis.scrollAlign),
			(e.legend = F({}, { show: !0, position: 'bottom', float: 'center', backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(0,0,0,0)', borderWidth: 0, padding: 5, margin: 5, itemGap: 10, fontSize: e.fontSize, lineHeight: e.fontSize, fontColor: e.fontColor, formatter: {}, hiddenColor: '#CECECE' }, e.legend)),
			(e.extra = F({}, e.extra)),
			(e.rotate = !!e.rotate),
			(e.animation = !!e.animation),
			(e.rotate = !!e.rotate),
			(e.canvas2d = !!e.canvas2d);
		let t = F({}, Q);
		if (
			((t.color = e.color ? e.color : t.color),
			e.type == 'pie' && (t.pieChartLinePadding = e.dataLabel === !1 ? 0 : e.extra.pie.labelWidth * e.pix || t.pieChartLinePadding * e.pix),
			e.type == 'ring' && (t.pieChartLinePadding = e.dataLabel === !1 ? 0 : e.extra.ring.labelWidth * e.pix || t.pieChartLinePadding * e.pix),
			e.type == 'rose' && (t.pieChartLinePadding = e.dataLabel === !1 ? 0 : e.extra.rose.labelWidth * e.pix || t.pieChartLinePadding * e.pix),
			(t.pieChartTextPadding = e.dataLabel === !1 ? 0 : t.pieChartTextPadding * e.pix),
			(t.rotate = e.rotate),
			e.rotate)
		) {
			let a = e.width,
				l = e.height;
			(e.width = l), (e.height = a);
		}
		if (((e.padding = e.padding ? e.padding : t.padding), (t.yAxisWidth = Q.yAxisWidth * e.pix), (t.xAxisHeight = Q.xAxisHeight * e.pix), e.enableScroll && e.xAxis.scrollShow && (t.xAxisHeight += 6 * e.pix), (t.fontSize = e.fontSize * e.pix), (t.titleFontSize = Q.titleFontSize * e.pix), (t.subtitleFontSize = Q.subtitleFontSize * e.pix), (t.toolTipPadding = Q.toolTipPadding * e.pix), (t.toolTipLineHeight = Q.toolTipLineHeight * e.pix), !e.context))
			throw new Error('[uCharts] \u672A\u83B7\u53D6\u5230context\uFF01\u6CE8\u610F\uFF1Av2.0\u7248\u672C\u540E\uFF0C\u9700\u8981\u81EA\u884C\u83B7\u53D6canvas\u7684\u7ED8\u56FE\u4E0A\u4E0B\u6587\u5E76\u4F20\u5165opts.context\uFF01');
		(this.context = e.context),
			this.context.setTextAlign ||
				((this.context.setStrokeStyle = function (a) {
					return (this.strokeStyle = a);
				}),
				(this.context.setLineWidth = function (a) {
					return (this.lineWidth = a);
				}),
				(this.context.setLineCap = function (a) {
					return (this.lineCap = a);
				}),
				(this.context.setFontSize = function (a) {
					return (this.font = a + 'px sans-serif');
				}),
				(this.context.setFillStyle = function (a) {
					return (this.fillStyle = a);
				}),
				(this.context.setTextAlign = function (a) {
					return (this.textAlign = a);
				}),
				(this.context.draw = function () {})),
			this.context.setLineDash || (this.context.setLineDash = function (a) {}),
			(e.chartData = {}),
			(this.uevent = new Pe()),
			(this.scrollOption = { currentOffset: 0, startTouchX: 0, distance: 0, lastMoveTime: 0 }),
			(this.opts = e),
			(this.config = t),
			j.call(this, e.type, e, t, this.context);
	};
	(Z.prototype.updateData = function () {
		let i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		switch (((this.opts = F({}, this.opts, i)), (this.opts.updateData = !0), i.scrollPosition || 'current')) {
			case 'current':
				this.opts._scrollDistance_ = this.scrollOption.currentOffset;
				break;
			case 'left':
				(this.opts._scrollDistance_ = 0), (this.scrollOption = { currentOffset: 0, startTouchX: 0, distance: 0, lastMoveTime: 0 });
				break;
			case 'right':
				let t = Be(this.opts.series, this.opts, this.config, this.context),
					a = t.yAxisWidth;
				this.config.yAxisWidth = a;
				let l = 0,
					r = we(this.opts.categories, this.opts, this.config),
					n = r.xAxisPoints,
					h = r.startX,
					d = r.endX,
					s = r.eachSpacing * (n.length - 1);
				(l = d - h - s), (this.scrollOption = { currentOffset: l, startTouchX: l, distance: 0, lastMoveTime: 0 }), (this.opts._scrollDistance_ = l);
				break;
		}
		j.call(this, this.opts.type, this.opts, this.config, this.context);
	}),
		(Z.prototype.zoom = function () {
			var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.opts.xAxis.itemCount;
			if (this.opts.enableScroll !== !0) {
				console.log('[uCharts] \u8BF7\u542F\u7528\u6EDA\u52A8\u6761\u540E\u4F7F\u7528');
				return;
			}
			let e = Math.round(Math.abs(this.scrollOption.currentOffset) / this.opts.chartData.eachSpacing) + Math.round(this.opts.xAxis.itemCount / 2);
			(this.opts.animation = !1), (this.opts.xAxis.itemCount = i.itemCount);
			let t = Be(this.opts.series, this.opts, this.config, this.context),
				a = t.yAxisWidth;
			this.config.yAxisWidth = a;
			let l = 0,
				r = we(this.opts.categories, this.opts, this.config),
				n = r.xAxisPoints,
				h = r.startX,
				d = r.endX,
				u = r.eachSpacing,
				s = u * e,
				f = d - h,
				o = f - u * (n.length - 1);
			(l = f / 2 - s), l > 0 && (l = 0), l < o && (l = o), (this.scrollOption = { currentOffset: l, startTouchX: 0, distance: 0, lastMoveTime: 0 }), Fe(this, l, this.opts.chartData, this.config, this.opts), (this.opts._scrollDistance_ = l), j.call(this, this.opts.type, this.opts, this.config, this.context);
		}),
		(Z.prototype.dobuleZoom = function (i) {
			if (this.opts.enableScroll !== !0) {
				console.log('[uCharts] \u8BF7\u542F\u7528\u6EDA\u52A8\u6761\u540E\u4F7F\u7528');
				return;
			}
			const e = i.changedTouches;
			if (e.length < 2) return;
			for (var t = 0; t < e.length; t++) (e[t].x = e[t].x ? e[t].x : e[t].clientX), (e[t].y = e[t].y ? e[t].y : e[t].clientY);
			const a = [oe(e[0], this.opts, i), oe(e[1], this.opts, i)],
				l = Math.abs(a[0].x - a[1].x);
			if (!this.scrollOption.moveCount) {
				let x = { changedTouches: [{ x: e[0].x, y: this.opts.area[0] / this.opts.pix + 2 }] },
					v = { changedTouches: [{ x: e[1].x, y: this.opts.area[0] / this.opts.pix + 2 }] };
				this.opts.rotate && ((x = { changedTouches: [{ x: this.opts.height / this.opts.pix - this.opts.area[0] / this.opts.pix - 2, y: e[0].y }] }), (v = { changedTouches: [{ x: this.opts.height / this.opts.pix - this.opts.area[0] / this.opts.pix - 2, y: e[1].y }] }));
				const y = this.getCurrentDataIndex(x).index,
					b = this.getCurrentDataIndex(v).index,
					w = Math.abs(y - b);
				(this.scrollOption.moveCount = w), (this.scrollOption.moveCurrent1 = Math.min(y, b)), (this.scrollOption.moveCurrent2 = Math.max(y, b));
				return;
			}
			let r = l / this.scrollOption.moveCount,
				n = (this.opts.width - this.opts.area[1] - this.opts.area[3]) / r;
			(n = n <= 2 ? 2 : n), (n = n >= this.opts.categories.length ? this.opts.categories.length : n), (this.opts.animation = !1), (this.opts.xAxis.itemCount = n);
			let h = 0,
				d = we(this.opts.categories, this.opts, this.config),
				u = d.xAxisPoints,
				s = d.startX,
				f = d.endX,
				o = d.eachSpacing,
				m = o * this.scrollOption.moveCurrent1,
				g = f - s - o * (u.length - 1);
			(h = -m + Math.min(a[0].x, a[1].x) - this.opts.area[3] - o), h > 0 && (h = 0), h < g && (h = g), (this.scrollOption.currentOffset = h), (this.scrollOption.startTouchX = 0), (this.scrollOption.distance = 0), Fe(this, h, this.opts.chartData, this.config, this.opts), (this.opts._scrollDistance_ = h), j.call(this, this.opts.type, this.opts, this.config, this.context);
		}),
		(Z.prototype.stopAnimation = function () {
			this.animationInstance && this.animationInstance.stop();
		}),
		(Z.prototype.addEventListener = function (i, e) {
			this.uevent.addEventListener(i, e);
		}),
		(Z.prototype.delEventListener = function (i) {
			this.uevent.delEventListener(i);
		}),
		(Z.prototype.getCurrentDataIndex = function (i) {
			var e = null;
			if ((i.changedTouches ? (e = i.changedTouches[0]) : (e = i.mp.changedTouches[0]), e)) {
				let t = oe(e, this.opts, i);
				return this.opts.type === 'pie' || this.opts.type === 'ring'
					? Ta({ x: t.x, y: t.y }, this.opts.chartData.pieData, this.opts)
					: this.opts.type === 'rose'
					? wa({ x: t.x, y: t.y }, this.opts.chartData.pieData, this.opts)
					: this.opts.type === 'radar'
					? ma({ x: t.x, y: t.y }, this.opts.chartData.radarData, this.opts.categories.length)
					: this.opts.type === 'funnel'
					? xa({ x: t.x, y: t.y }, this.opts.chartData.funnelData)
					: this.opts.type === 'map'
					? ba({ x: t.x, y: t.y }, this.opts)
					: this.opts.type === 'word'
					? va({ x: t.x, y: t.y }, this.opts.chartData.wordCloudData)
					: this.opts.type === 'bar'
					? ga({ x: t.x, y: t.y }, this.opts.chartData.calPoints, this.opts, this.config, Math.abs(this.scrollOption.currentOffset))
					: ua({ x: t.x, y: t.y }, this.opts.chartData.calPoints, this.opts, this.config, Math.abs(this.scrollOption.currentOffset));
			}
			return -1;
		}),
		(Z.prototype.getLegendDataIndex = function (i) {
			var e = null;
			if ((i.changedTouches ? (e = i.changedTouches[0]) : (e = i.mp.changedTouches[0]), e)) {
				let t = oe(e, this.opts, i);
				return ca({ x: t.x, y: t.y }, this.opts.chartData.legendData);
			}
			return -1;
		}),
		(Z.prototype.touchLegend = function (i) {
			var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
				t = null;
			if ((i.changedTouches ? (t = i.changedTouches[0]) : (t = i.mp.changedTouches[0]), t)) {
				oe(t, this.opts, i);
				var a = this.getLegendDataIndex(i);
				a >= 0 && (this.opts.type == 'candle' ? (this.opts.seriesMA[a].show = !this.opts.seriesMA[a].show) : (this.opts.series[a].show = !this.opts.series[a].show), (this.opts.animation = !!e.animation), (this.opts._scrollDistance_ = this.scrollOption.currentOffset), j.call(this, this.opts.type, this.opts, this.config, this.context));
			}
		}),
		(Z.prototype.showToolTip = function (i) {
			var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
				t = null;
			i.changedTouches ? (t = i.changedTouches[0]) : (t = i.mp.changedTouches[0]), t || console.log('[uCharts] \u672A\u83B7\u53D6\u5230event\u5750\u6807\u4FE1\u606F');
			var a = oe(t, this.opts, i),
				l = this.scrollOption.currentOffset,
				r = F({}, this.opts, { _scrollDistance_: l, animation: !1 });
			if (this.opts.type === 'line' || this.opts.type === 'area' || this.opts.type === 'column' || this.opts.type === 'scatter' || this.opts.type === 'bubble') {
				var n = this.getCurrentDataIndex(i),
					h = e.index == null ? n.index : e.index;
				if (h > -1 || h.length > 0) {
					var d = be(this.opts.series, h, n.group);
					if (d.length !== 0) {
						var u = He(d, this.opts, h, n.group, this.opts.categories, e),
							s = u.textList,
							f = u.offset;
						(f.y = a.y), (r.tooltip = { textList: e.textList !== void 0 ? e.textList : s, offset: e.offset !== void 0 ? e.offset : f, option: e, index: h });
					}
				}
				j.call(this, r.type, r, this.config, this.context);
			}
			if (this.opts.type === 'mount') {
				var h = e.index == null ? this.getCurrentDataIndex(i).index : e.index;
				if (h > -1) {
					var r = F({}, this.opts, { animation: !1 }),
						d = F({}, r._series_[h]),
						s = [{ text: e.formatter ? e.formatter(d, void 0, h, r) : d.name + ': ' + d.data, color: d.color }],
						f = { x: r.chartData.calPoints[h].x, y: a.y };
					r.tooltip = { textList: e.textList ? e.textList : s, offset: e.offset !== void 0 ? e.offset : f, option: e, index: h };
				}
				j.call(this, r.type, r, this.config, this.context);
			}
			if (this.opts.type === 'bar') {
				var n = this.getCurrentDataIndex(i),
					h = e.index == null ? n.index : e.index;
				if (h > -1 || h.length > 0) {
					var d = be(this.opts.series, h, n.group);
					if (d.length !== 0) {
						var u = He(d, this.opts, h, n.group, this.opts.categories, e),
							s = u.textList,
							f = u.offset;
						(f.x = a.x), (r.tooltip = { textList: e.textList !== void 0 ? e.textList : s, offset: e.offset !== void 0 ? e.offset : f, option: e, index: h });
					}
				}
				j.call(this, r.type, r, this.config, this.context);
			}
			if (this.opts.type === 'mix') {
				var n = this.getCurrentDataIndex(i),
					h = e.index == null ? n.index : e.index;
				if (h > -1) {
					var l = this.scrollOption.currentOffset,
						r = F({}, this.opts, { _scrollDistance_: l, animation: !1 }),
						d = be(this.opts.series, h);
					if (d.length !== 0) {
						var o = sa(d, this.opts, h, this.opts.categories, e),
							s = o.textList,
							f = o.offset;
						(f.y = a.y), (r.tooltip = { textList: e.textList ? e.textList : s, offset: e.offset !== void 0 ? e.offset : f, option: e, index: h });
					}
				}
				j.call(this, r.type, r, this.config, this.context);
			}
			if (this.opts.type === 'candle') {
				var n = this.getCurrentDataIndex(i),
					h = e.index == null ? n.index : e.index;
				if (h > -1) {
					var l = this.scrollOption.currentOffset,
						r = F({}, this.opts, { _scrollDistance_: l, animation: !1 }),
						d = be(this.opts.series, h);
					if (d.length !== 0) {
						var u = fa(this.opts.series[0].data, d, this.opts, h, this.opts.categories, this.opts.extra.candle),
							s = u.textList,
							f = u.offset;
						(f.y = a.y), (r.tooltip = { textList: e.textList ? e.textList : s, offset: e.offset !== void 0 ? e.offset : f, option: e, index: h });
					}
				}
				j.call(this, r.type, r, this.config, this.context);
			}
			if (this.opts.type === 'pie' || this.opts.type === 'ring' || this.opts.type === 'rose' || this.opts.type === 'funnel') {
				var h = e.index == null ? this.getCurrentDataIndex(i) : e.index;
				if (h > -1) {
					var r = F({}, this.opts, { animation: !1 }),
						d = F({}, r._series_[h]),
						s = [{ text: e.formatter ? e.formatter(d, void 0, h, r) : d.name + ': ' + d.data, color: d.color }],
						f = { x: a.x, y: a.y };
					r.tooltip = { textList: e.textList ? e.textList : s, offset: e.offset !== void 0 ? e.offset : f, option: e, index: h };
				}
				j.call(this, r.type, r, this.config, this.context);
			}
			if (this.opts.type === 'map') {
				var h = e.index == null ? this.getCurrentDataIndex(i) : e.index;
				if (h > -1) {
					var r = F({}, this.opts, { animation: !1 }),
						d = F({}, this.opts.series[h]);
					d.name = d.properties.name;
					var s = [{ text: e.formatter ? e.formatter(d, void 0, h, this.opts) : d.name, color: d.color }],
						f = { x: a.x, y: a.y };
					r.tooltip = { textList: e.textList ? e.textList : s, offset: e.offset !== void 0 ? e.offset : f, option: e, index: h };
				}
				(r.updateData = !1), j.call(this, r.type, r, this.config, this.context);
			}
			if (this.opts.type === 'word') {
				var h = e.index == null ? this.getCurrentDataIndex(i) : e.index;
				if (h > -1) {
					var r = F({}, this.opts, { animation: !1 }),
						d = F({}, this.opts.series[h]),
						s = [{ text: e.formatter ? e.formatter(d, void 0, h, this.opts) : d.name, color: d.color }],
						f = { x: a.x, y: a.y };
					r.tooltip = { textList: e.textList ? e.textList : s, offset: e.offset !== void 0 ? e.offset : f, option: e, index: h };
				}
				(r.updateData = !1), j.call(this, r.type, r, this.config, this.context);
			}
			if (this.opts.type === 'radar') {
				var h = e.index == null ? this.getCurrentDataIndex(i) : e.index;
				if (h > -1) {
					var r = F({}, this.opts, { animation: !1 }),
						d = be(this.opts.series, h);
					if (d.length !== 0) {
						var s = d.map((y) => ({ text: e.formatter ? e.formatter(y, this.opts.categories[h], h, this.opts) : y.name + ': ' + y.data, color: y.color })),
							f = { x: a.x, y: a.y };
						r.tooltip = { textList: e.textList ? e.textList : s, offset: e.offset !== void 0 ? e.offset : f, option: e, index: h };
					}
				}
				j.call(this, r.type, r, this.config, this.context);
			}
		}),
		(Z.prototype.translate = function (i) {
			this.scrollOption = { currentOffset: i, startTouchX: i, distance: 0, lastMoveTime: 0 };
			let e = F({}, this.opts, { _scrollDistance_: i, animation: !1 });
			j.call(this, this.opts.type, e, this.config, this.context);
		}),
		(Z.prototype.scrollStart = function (i) {
			var e = null;
			i.changedTouches ? (e = i.changedTouches[0]) : (e = i.mp.changedTouches[0]);
			var t = oe(e, this.opts, i);
			e && this.opts.enableScroll === !0 && (this.scrollOption.startTouchX = t.x);
		}),
		(Z.prototype.scroll = function (i) {
			this.scrollOption.lastMoveTime === 0 && (this.scrollOption.lastMoveTime = Date.now());
			let e = this.opts.touchMoveLimit || 60,
				t = Date.now();
			if (!(t - this.scrollOption.lastMoveTime < Math.floor(1e3 / e)) && this.scrollOption.startTouchX != 0) {
				this.scrollOption.lastMoveTime = t;
				var l = null;
				if ((i.changedTouches ? (l = i.changedTouches[0]) : (l = i.mp.changedTouches[0]), l && this.opts.enableScroll === !0)) {
					var r = oe(l, this.opts, i),
						n;
					n = r.x - this.scrollOption.startTouchX;
					var h = this.scrollOption.currentOffset,
						d = Fe(this, h + n, this.opts.chartData, this.config, this.opts);
					this.scrollOption.distance = n = d - h;
					var u = F({}, this.opts, { _scrollDistance_: h + n, animation: !1 });
					return (this.opts = u), j.call(this, u.type, u, this.config, this.context), h + n;
				}
			}
		}),
		(Z.prototype.scrollEnd = function (i) {
			if (this.opts.enableScroll === !0) {
				var e = this.scrollOption,
					t = e.currentOffset,
					a = e.distance;
				(this.scrollOption.currentOffset = t + a), (this.scrollOption.distance = 0), (this.scrollOption.moveCount = 0);
			}
		});
	const H = ['#1890FF', '#91CB74', '#FAC858', '#EE6666', '#73C0DE', '#3CA272', '#FC8452', '#9A60B4', '#ea7ccc'],
		yi = (i, e) => {
			var t = new Date();
			t.setTime(i * 1e3);
			var a = t.getFullYear(),
				l = t.getMonth() + 1;
			l = l < 10 ? '0' + l : l;
			var r = t.getDate();
			r = r < 10 ? '0' + r : r;
			var n = t.getHours();
			n = n < 10 ? '0' + n : n;
			var h = t.getMinutes(),
				d = t.getSeconds();
			return (h = h < 10 ? '0' + h : h), (d = d < 10 ? '0' + d : d), e == 'full' ? a + '-' + l + '-' + r + ' ' + n + ':' + h + ':' + d : e == 'y-m-d' ? a + '-' + l + '-' + r : e == 'h:m' ? n + ':' + h : e == 'h:m:s' ? n + ':' + h + ':' + d : [a, l, r, n, h, d];
		},
		C = {
			type: ['pie', 'ring', 'rose', 'word', 'funnel', 'map', 'arcbar', 'line', 'column', 'mount', 'bar', 'area', 'radar', 'gauge', 'candle', 'mix', 'tline', 'tarea', 'scatter', 'bubble', 'demotype'],
			range: [
				'\u997C\u72B6\u56FE',
				'\u5706\u73AF\u56FE',
				'\u73AB\u7470\u56FE',
				'\u8BCD\u4E91\u56FE',
				'\u6F0F\u6597\u56FE',
				'\u5730\u56FE',
				'\u5706\u5F27\u8FDB\u5EA6\u6761',
				'\u6298\u7EBF\u56FE',
				'\u67F1\u72B6\u56FE',
				'\u5C71\u5CF0\u56FE',
				'\u6761\u72B6\u56FE',
				'\u533A\u57DF\u56FE',
				'\u96F7\u8FBE\u56FE',
				'\u4EEA\u8868\u76D8',
				'K\u7EBF\u56FE',
				'\u6DF7\u5408\u56FE',
				'\u65F6\u95F4\u8F74\u6298\u7EBF',
				'\u65F6\u95F4\u8F74\u533A\u57DF',
				'\u6563\u70B9\u56FE',
				'\u6C14\u6CE1\u56FE',
				'\u81EA\u5B9A\u4E49\u7C7B\u578B'
			],
			categories: ['line', 'column', 'mount', 'bar', 'area', 'radar', 'gauge', 'candle', 'mix', 'demotype'],
			instance: {},
			option: {},
			formatter: {
				yAxisDemo1: function (i, e, t) {
					return i + '\u5143';
				},
				yAxisDemo2: function (i, e, t) {
					return i.toFixed(2);
				},
				xAxisDemo1: function (i, e, t) {
					return i + '\u5E74';
				},
				xAxisDemo2: function (i, e, t) {
					return yi(i, 'h:m');
				},
				seriesDemo1: function (i, e, t, a) {
					return i + '\u5143';
				},
				tooltipDemo1: function (i, e, t, a) {
					return t == 0 ? '\u968F\u4FBF\u7528' + i.data + '\u5E74' : '\u5176\u4ED6\u6211\u6CA1\u6539' + i.data + '\u5929';
				},
				pieDemo: function (i, e, t, a) {
					if (e !== void 0) return t[e].name + '\uFF1A' + t[e].data + '\u5143';
				}
			},
			demotype: { type: 'line', color: H, padding: [15, 10, 0, 15], xAxis: { disableGrid: !0 }, yAxis: { gridType: 'dash', dashLength: 2 }, legend: {}, extra: { line: { type: 'curve', width: 2 } } },
			pie: { type: 'pie', color: H, padding: [5, 5, 5, 5], extra: { pie: { activeOpacity: 0.5, activeRadius: 10, offsetAngle: 0, labelWidth: 15, border: !0, borderWidth: 3, borderColor: '#FFFFFF' } } },
			ring: { type: 'ring', color: H, padding: [5, 5, 5, 5], rotate: !1, dataLabel: !0, legend: { show: !0, position: 'right', lineHeight: 25 }, title: { name: '\u6536\u76CA\u7387', fontSize: 15, color: '#666666' }, subtitle: { name: '70%', fontSize: 25, color: '#7cb5ec' }, extra: { ring: { ringWidth: 30, activeOpacity: 0.5, activeRadius: 10, offsetAngle: 0, labelWidth: 15, border: !0, borderWidth: 3, borderColor: '#FFFFFF' } } },
			rose: { type: 'rose', color: H, padding: [5, 5, 5, 5], legend: { show: !0, position: 'left', lineHeight: 25 }, extra: { rose: { type: 'area', minRadius: 50, activeOpacity: 0.5, activeRadius: 10, offsetAngle: 0, labelWidth: 15, border: !1, borderWidth: 2, borderColor: '#FFFFFF' } } },
			word: { type: 'word', color: H, extra: { word: { type: 'normal', autoColors: !1 } } },
			funnel: { type: 'funnel', color: H, padding: [15, 15, 0, 15], extra: { funnel: { activeOpacity: 0.3, activeWidth: 10, border: !0, borderWidth: 2, borderColor: '#FFFFFF', fillOpacity: 1, labelAlign: 'right' } } },
			map: { type: 'map', color: H, padding: [0, 0, 0, 0], dataLabel: !0, extra: { map: { border: !0, borderWidth: 1, borderColor: '#666666', fillOpacity: 0.6, activeBorderColor: '#F04864', activeFillColor: '#FACC14', activeFillOpacity: 1 } } },
			arcbar: { type: 'arcbar', color: H, title: { name: '\u767E\u5206\u6BD4', fontSize: 25, color: '#00FF00' }, subtitle: { name: '\u9ED8\u8BA4\u6807\u9898', fontSize: 15, color: '#666666' }, extra: { arcbar: { type: 'default', width: 12, backgroundColor: '#E9E9E9', startAngle: 0.75, endAngle: 0.25, gap: 2 } } },
			line: { type: 'line', color: H, padding: [15, 10, 0, 15], xAxis: { disableGrid: !0 }, yAxis: { gridType: 'dash', dashLength: 2 }, legend: {}, extra: { line: { type: 'straight', width: 2 } } },
			tline: { type: 'line', color: H, padding: [15, 10, 0, 15], xAxis: { disableGrid: !1, boundaryGap: 'justify' }, yAxis: { gridType: 'dash', dashLength: 2, data: [{ min: 0, max: 80 }] }, legend: {}, extra: { line: { type: 'curve', width: 2 } } },
			tarea: { type: 'area', color: H, padding: [15, 10, 0, 15], xAxis: { disableGrid: !0, boundaryGap: 'justify' }, yAxis: { gridType: 'dash', dashLength: 2, data: [{ min: 0, max: 80 }] }, legend: {}, extra: { area: { type: 'curve', opacity: 0.2, addLine: !0, width: 2, gradient: !0 } } },
			column: { type: 'column', color: H, padding: [15, 15, 0, 5], xAxis: { disableGrid: !0 }, yAxis: { data: [{ min: 0 }] }, legend: {}, extra: { column: { type: 'group', width: 30, activeBgColor: '#000000', activeBgOpacity: 0.08 } } },
			mount: { type: 'mount', color: H, padding: [15, 15, 0, 5], xAxis: { disableGrid: !0 }, yAxis: { data: [{ min: 0 }] }, legend: {}, extra: { mount: { type: 'mount', widthRatio: 1.5 } } },
			bar: { type: 'bar', color: H, padding: [15, 30, 0, 5], xAxis: { boundaryGap: 'justify', disableGrid: !1, min: 0, axisLine: !1 }, yAxis: {}, legend: {}, extra: { bar: { type: 'group', width: 30, meterBorde: 1, meterFillColor: '#FFFFFF', activeBgColor: '#000000', activeBgOpacity: 0.08 } } },
			area: { type: 'area', color: H, padding: [15, 15, 0, 15], xAxis: { disableGrid: !0 }, yAxis: { gridType: 'dash', dashLength: 2 }, legend: {}, extra: { area: { type: 'straight', opacity: 0.2, addLine: !0, width: 2, gradient: !1 } } },
			radar: { type: 'radar', color: H, padding: [5, 5, 5, 5], dataLabel: !1, legend: { show: !0, position: 'right', lineHeight: 25 }, extra: { radar: { gridType: 'radar', gridColor: '#CCCCCC', gridCount: 3, opacity: 0.2, max: 200 } } },
			gauge: {
				type: 'gauge',
				color: H,
				title: { name: '66Km/H', fontSize: 25, color: '#2fc25b', offsetY: 50 },
				subtitle: { name: '\u5B9E\u65F6\u901F\u5EA6', fontSize: 15, color: '#1890ff', offsetY: -50 },
				extra: { gauge: { type: 'default', width: 30, labelColor: '#666666', startAngle: 0.75, endAngle: 0.25, startNumber: 0, endNumber: 100, labelFormat: '', splitLine: { fixRadius: 0, splitNumber: 10, width: 30, color: '#FFFFFF', childNumber: 5, childWidth: 12 }, pointer: { width: 24, color: 'auto' } } }
			},
			candle: {
				type: 'candle',
				color: H,
				padding: [15, 15, 0, 15],
				enableScroll: !0,
				enableMarkLine: !0,
				dataLabel: !1,
				xAxis: { labelCount: 4, itemCount: 40, disableGrid: !0, gridColor: '#CCCCCC', gridType: 'solid', dashLength: 4, scrollShow: !0, scrollAlign: 'left', scrollColor: '#A6A6A6', scrollBackgroundColor: '#EFEBEF' },
				yAxis: {},
				legend: {},
				extra: {
					candle: { color: { upLine: '#f04864', upFill: '#f04864', downLine: '#2fc25b', downFill: '#2fc25b' }, average: { show: !0, name: ['MA5', 'MA10', 'MA30'], day: [5, 10, 20], color: ['#1890ff', '#2fc25b', '#facc14'] } },
					markLine: {
						type: 'dash',
						dashLength: 5,
						data: [
							{ value: 2150, lineColor: '#f04864', showLabel: !0 },
							{ value: 2350, lineColor: '#f04864', showLabel: !0 }
						]
					}
				}
			},
			mix: { type: 'mix', color: H, padding: [15, 15, 0, 15], xAxis: { disableGrid: !0 }, yAxis: { disabled: !1, disableGrid: !1, splitNumber: 5, gridType: 'dash', dashLength: 4, gridColor: '#CCCCCC', padding: 10, showTitle: !0, data: [] }, legend: {}, extra: { mix: { column: { width: 20 } } } },
			scatter: { type: 'scatter', color: H, padding: [15, 15, 0, 15], dataLabel: !1, xAxis: { disableGrid: !1, gridType: 'dash', splitNumber: 5, boundaryGap: 'justify', min: 0 }, yAxis: { disableGrid: !1, gridType: 'dash' }, legend: {}, extra: { scatter: {} } },
			bubble: { type: 'bubble', color: H, padding: [15, 15, 0, 15], xAxis: { disableGrid: !1, gridType: 'dash', splitNumber: 5, boundaryGap: 'justify', min: 0, max: 250 }, yAxis: { disableGrid: !1, gridType: 'dash', data: [{ min: 0, max: 150 }] }, legend: {}, extra: { bubble: { border: 2, opacity: 0.5 } } }
		},
		ir = '',
		ue = (i, e) => {
			const t = i.__vccOpts || i;
			for (const [a, l] of e) t[a] = l;
			return t;
		},
		mi = {
			name: 'loading1',
			data() {
				return {};
			}
		},
		Ce = (i) => (p.pushScopeId('data-v-b0cf34d6'), (i = i()), p.popScopeId(), i),
		xi = { class: 'container loading1' },
		vi = [Ce(() => p.createElementVNode('view', { class: 'shape shape1' }, null, -1)), Ce(() => p.createElementVNode('view', { class: 'shape shape2' }, null, -1)), Ce(() => p.createElementVNode('view', { class: 'shape shape3' }, null, -1)), Ce(() => p.createElementVNode('view', { class: 'shape shape4' }, null, -1))];
	function bi(i, e, t, a, l, r) {
		return p.openBlock(), p.createElementBlock('view', xi, vi);
	}
	const wi = ue(mi, [
			['render', bi],
			['__scopeId', 'data-v-b0cf34d6'],
			['__file', 'D:/work/design/admin/diygw-admin-lib/node_modules/@qiun/vue-ucharts/src/loading1.vue']
		]),
		hr = '',
		Ti = {
			name: 'loading2',
			data() {
				return {};
			}
		},
		pe = (i) => (p.pushScopeId('data-v-74d80ba4'), (i = i()), p.popScopeId(), i),
		Ai = { class: 'container loading2' },
		Si = [pe(() => p.createElementVNode('view', { class: 'shape shape1' }, null, -1)), pe(() => p.createElementVNode('view', { class: 'shape shape2' }, null, -1)), pe(() => p.createElementVNode('view', { class: 'shape shape3' }, null, -1)), pe(() => p.createElementVNode('view', { class: 'shape shape4' }, null, -1))];
	function _i(i, e, t, a, l, r) {
		return p.openBlock(), p.createElementBlock('view', Ai, Si);
	}
	const Pi = ue(Ti, [
			['render', _i],
			['__scopeId', 'data-v-74d80ba4'],
			['__file', 'D:/work/design/admin/diygw-admin-lib/node_modules/@qiun/vue-ucharts/src/loading2.vue']
		]),
		ur = '',
		Ci = {
			name: 'loading3',
			data() {
				return {};
			}
		},
		De = (i) => (p.pushScopeId('data-v-a0c04cc7'), (i = i()), p.popScopeId(), i),
		pi = { class: 'container loading3' },
		Di = [De(() => p.createElementVNode('view', { class: 'shape shape1' }, null, -1)), De(() => p.createElementVNode('view', { class: 'shape shape2' }, null, -1)), De(() => p.createElementVNode('view', { class: 'shape shape3' }, null, -1)), De(() => p.createElementVNode('view', { class: 'shape shape4' }, null, -1))];
	function Li(i, e, t, a, l, r) {
		return p.openBlock(), p.createElementBlock('view', pi, Di);
	}
	const Mi = ue(Ci, [
			['render', Li],
			['__scopeId', 'data-v-a0c04cc7'],
			['__file', 'D:/work/design/admin/diygw-admin-lib/node_modules/@qiun/vue-ucharts/src/loading3.vue']
		]),
		xr = '',
		Fi = {
			name: 'loading5',
			data() {
				return {};
			}
		},
		Le = (i) => (p.pushScopeId('data-v-c90ba057'), (i = i()), p.popScopeId(), i),
		ki = { class: 'container loading5' },
		Ii = [Le(() => p.createElementVNode('view', { class: 'shape shape1' }, null, -1)), Le(() => p.createElementVNode('view', { class: 'shape shape2' }, null, -1)), Le(() => p.createElementVNode('view', { class: 'shape shape3' }, null, -1)), Le(() => p.createElementVNode('view', { class: 'shape shape4' }, null, -1))];
	function Ei(i, e, t, a, l, r) {
		return p.openBlock(), p.createElementBlock('view', ki, Ii);
	}
	const Ri = ue(Fi, [
			['render', Ei],
			['__scopeId', 'data-v-c90ba057'],
			['__file', 'D:/work/design/admin/diygw-admin-lib/node_modules/@qiun/vue-ucharts/src/loading4.vue']
		]),
		Ar = '',
		Oi = {
			name: 'loading6',
			data() {
				return {};
			}
		},
		Me = (i) => (p.pushScopeId('data-v-6db802d3'), (i = i()), p.popScopeId(), i),
		Bi = { class: 'container loading6' },
		Wi = [Me(() => p.createElementVNode('view', { class: 'shape shape1' }, null, -1)), Me(() => p.createElementVNode('view', { class: 'shape shape2' }, null, -1)), Me(() => p.createElementVNode('view', { class: 'shape shape3' }, null, -1)), Me(() => p.createElementVNode('view', { class: 'shape shape4' }, null, -1))];
	function zi(i, e, t, a, l, r) {
		return p.openBlock(), p.createElementBlock('view', Bi, Wi);
	}
	const Ni = {
		components: {
			Loading1: wi,
			Loading2: Pi,
			Loading3: Mi,
			Loading4: Ri,
			Loading5: ue(Oi, [
				['render', zi],
				['__scopeId', 'data-v-6db802d3'],
				['__file', 'D:/work/design/admin/diygw-admin-lib/node_modules/@qiun/vue-ucharts/src/loading5.vue']
			])
		},
		name: 'qiun-loading',
		props: { loadingType: { type: Number, default: 2 } },
		data() {
			return {};
		}
	};
	function Gi(i, e, t, a, l, r) {
		const n = p.resolveComponent('Loading1'),
			h = p.resolveComponent('Loading2'),
			d = p.resolveComponent('Loading3'),
			u = p.resolveComponent('Loading4'),
			s = p.resolveComponent('Loading5');
		return (
			p.openBlock(),
			p.createElementBlock('view', null, [
				t.loadingType == 1 ? (p.openBlock(), p.createBlock(n, { key: 0 })) : p.createCommentVNode('v-if', !0),
				t.loadingType == 2 ? (p.openBlock(), p.createBlock(h, { key: 1 })) : p.createCommentVNode('v-if', !0),
				t.loadingType == 3 ? (p.openBlock(), p.createBlock(d, { key: 2 })) : p.createCommentVNode('v-if', !0),
				t.loadingType == 4 ? (p.openBlock(), p.createBlock(u, { key: 3 })) : p.createCommentVNode('v-if', !0),
				t.loadingType == 5 ? (p.openBlock(), p.createBlock(s, { key: 4 })) : p.createCommentVNode('v-if', !0)
			])
		);
	}
	const Xi = ue(Ni, [
			['render', Gi],
			['__file', 'D:/work/design/admin/diygw-admin-lib/node_modules/@qiun/vue-ucharts/src/qiun-loading.vue']
		]),
		Dr = '',
		Hi = {
			name: 'qiun-error',
			props: { errorMessage: { type: String, default: null } },
			data() {
				return {};
			}
		},
		$i = { class: 'chartsview' },
		Vi = p.createElementVNode('view', { class: 'charts-error' }, null, -1),
		Yi = { class: 'charts-font' };
	function qi(i, e, t, a, l, r) {
		return p.openBlock(), p.createElementBlock('view', $i, [Vi, p.createElementVNode('view', Yi, p.toDisplayString(t.errorMessage == null ? '\u8BF7\u70B9\u51FB\u91CD\u8BD5' : t.errorMessage), 1)]);
	}
	const ji = ue(Hi, [
			['render', qi],
			['__file', 'D:/work/design/admin/diygw-admin-lib/node_modules/@qiun/vue-ucharts/src/qiun-error.vue']
		]),
		Lr = '';
	function Te(i = {}, ...e) {
		for (let t in e) for (let a in e[t]) e[t].hasOwnProperty(a) && (i[a] = e[t][a] && typeof e[t][a] == 'object' ? Te(Array.isArray(e[t][a]) ? [] : {}, i[a], e[t][a]) : e[t][a]);
		return i;
	}
	function ia(i, e) {
		for (let t in i) i.hasOwnProperty(t) && i[t] !== null && typeof i[t] == 'object' ? ia(i[t], e) : t === 'format' && typeof i[t] == 'string' && (i.formatter = e[i[t]] ? e[i[t]] : void 0);
		return i;
	}
	function Ui(i, e) {
		let t = !1;
		return function () {
			clearTimeout(t),
				t && clearTimeout(t),
				(t = setTimeout(() => {
					(t = !1), i.apply(this, arguments);
				}, e));
		};
	}
	var ve = { top: 0, left: 0 };
	const Ji = {
			name: 'qiun-vue-ucharts',
			components: { qiunLoading: Xi, qiunError: ji },
			props: {
				type: { type: String, default: null },
				canvasId: { type: String, default: 'uchartsid' },
				canvas2d: { type: Boolean, default: !1 },
				background: { type: String, default: 'rgba(0,0,0,0)' },
				animation: { type: Boolean, default: !0 },
				chartData: {
					type: Object,
					default() {
						return { categories: [], series: [] };
					}
				},
				localdata: {
					type: Array,
					default() {
						return [];
					}
				},
				opts: {
					type: Object,
					default() {
						return {};
					}
				},
				loadingType: { type: Number, default: 2 },
				errorShow: { type: Boolean, default: !0 },
				errorReload: { type: Boolean, default: !0 },
				errorMessage: { type: String, default: null },
				inScrollView: { type: Boolean, default: !1 },
				reshow: { type: Boolean, default: !1 },
				reload: { type: Boolean, default: !1 },
				disableScroll: { type: Boolean, default: !1 },
				optsWatch: { type: Boolean, default: !0 },
				onzoom: { type: Boolean, default: !1 },
				ontap: { type: Boolean, default: !0 },
				ontouch: { type: Boolean, default: !1 },
				onmouse: { type: Boolean, default: !0 },
				onmovetip: { type: Boolean, default: !1 },
				tooltipShow: { type: Boolean, default: !0 },
				tooltipFormat: { type: String, default: void 0 },
				tooltipCustom: { type: Object, default: void 0 },
				pageScrollTop: { type: Number, default: 0 },
				tapLegend: { type: Boolean, default: !0 }
			},
			data() {
				return { cid: 'uchartsid', type2d: !0, cWidth: 375, cHeight: 250, showchart: !1, mixinDatacomErrorMessage: null, mixinDatacomLoading: !0, pixel: 1, drawData: {}, lastDrawTime: null };
			},
			created() {
				if (((this.cid = this.canvasId), this.canvasId == 'uchartsid' || this.canvasId == '')) {
					let e = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
						t = e.length,
						a = '';
					for (let l = 0; l < 32; l++) a += e.charAt(Math.floor(Math.random() * t));
					this.cid = a;
				}
				const i = window.devicePixelRadio || 1;
				this.pixel = i;
			},
			mounted() {
				this.$nextTick(() => {
					this.beforeInit();
				});
				const i = 500,
					e = this;
				window.onresize = Ui(function (t) {
					if (e.mixinDatacomLoading == !0) return;
					let a = e.mixinDatacomErrorMessage;
					(a !== null && a !== 'null' && a !== '') || e.resizeHandler();
				}, i);
			},
			beforeDestroy() {
				delete C.option[this.cid], delete C.instance[this.cid], (window.onresize = null);
			},
			watch: {
				chartDataProps: {
					handler(i, e) {
						typeof i == 'object' ? JSON.stringify(i) !== JSON.stringify(e) && (this._clearChart(), i.series && i.series.length > 0 ? this.beforeInit() : ((this.mixinDatacomLoading = !0), (this.showchart = !1), (this.mixinDatacomErrorMessage = null))) : ((this.mixinDatacomLoading = !1), this._clearChart(), (this.showchart = !1), (this.mixinDatacomErrorMessage = '\u53C2\u6570\u9519\u8BEF\uFF1AchartData\u6570\u636E\u7C7B\u578B\u9519\u8BEF'));
					},
					immediate: !1,
					deep: !0
				},
				localdata: {
					handler(i, e) {
						JSON.stringify(i) !== JSON.stringify(e) && (i.length > 0 ? this.beforeInit() : ((this.mixinDatacomLoading = !0), this._clearChart(), (this.showchart = !1), (this.mixinDatacomErrorMessage = null)));
					},
					immediate: !1,
					deep: !0
				},
				optsProps: {
					handler(i, e) {
						typeof i == 'object' ? JSON.stringify(i) !== JSON.stringify(e) && this.optsWatch == !0 && this.checkData(this.drawData) : ((this.mixinDatacomLoading = !1), this._clearChart(), (this.showchart = !1), (this.mixinDatacomErrorMessage = '\u53C2\u6570\u9519\u8BEF\uFF1Aopts\u6570\u636E\u7C7B\u578B\u9519\u8BEF'));
					},
					immediate: !1,
					deep: !0
				},
				reshow(i, e) {
					i === !0 &&
						this.mixinDatacomLoading === !1 &&
						setTimeout(() => {
							(this.mixinDatacomErrorMessage = null), this.checkData(this.drawData);
						}, 200);
				},
				reload(i, e) {
					i === !0 && ((this.showchart = !1), (this.mixinDatacomErrorMessage = null), this.reloading());
				},
				mixinDatacomErrorMessage(i, e) {
					i && (this.emitMsg({ name: 'error', params: { type: 'error', errorShow: this.errorShow, msg: i, id: this.cid } }), this.errorShow && console.log('[\u79CB\u4E91\u56FE\u8868\u7EC4\u4EF6]' + i));
				},
				errorMessage(i, e) {
					i && this.errorShow && i !== null && i !== 'null' && i !== '' ? ((this.showchart = !1), (this.mixinDatacomLoading = !1), (this.mixinDatacomErrorMessage = i)) : ((this.showchart = !1), (this.mixinDatacomErrorMessage = null), this.reloading());
				}
			},
			computed: {
				optsProps() {
					return JSON.parse(JSON.stringify(this.opts));
				},
				chartDataProps() {
					return JSON.parse(JSON.stringify(this.chartData));
				}
			},
			methods: {
				beforeInit() {
					(this.mixinDatacomErrorMessage = null), typeof this.chartData == 'object' && this.chartData != null && this.chartData.series !== void 0 && this.chartData.series.length > 0 ? ((this.drawData = Te({}, this.chartData)), (this.mixinDatacomLoading = !1), (this.showchart = !0), this.checkData(this.chartData)) : this.localdata.length > 0 ? ((this.mixinDatacomLoading = !1), (this.showchart = !0), this.localdataInit(this.localdata)) : (this.mixinDatacomLoading = !0);
				},
				localdataInit(i) {
					let e = !1,
						t = { categories: [], series: [] },
						a = [],
						l = [];
					if (((e = C.categories.includes(this.type)), e === !0)) {
						if (this.chartData && this.chartData.categories && this.chartData.categories.length > 0) a = this.chartData.categories;
						else {
							let n = {};
							i.map(function (h, d) {
								h.text != null && !n[h.text] && (a.push(h.text), (n[h.text] = !0));
							});
						}
						t.categories = a;
					}
					let r = {};
					if (
						(i.map(function (n, h) {
							n.group != null && !r[n.group] && (l.push({ name: n.group, data: [] }), (r[n.group] = !0));
						}),
						l.length == 0)
					)
						if (((l = [{ name: '\u9ED8\u8BA4\u5206\u7EC4', data: [] }]), e === !0))
							for (let n = 0; n < a.length; n++) {
								let h = 0;
								for (let d = 0; d < i.length; d++) i[d].text == a[n] && (h = i[d].value);
								l[0].data.push(h);
							}
						else for (let n = 0; n < i.length; n++) l[0].data.push({ name: i[n].text, value: i[n].value });
					else
						for (let n = 0; n < l.length; n++)
							if (a.length > 0)
								for (let h = 0; h < a.length; h++) {
									let d = 0;
									for (let u = 0; u < i.length; u++) l[n].name == i[u].group && i[u].text == a[h] && (d = i[u].value);
									l[n].data.push(d);
								}
							else for (let h = 0; h < i.length; h++) l[n].name == i[h].group && l[n].data.push(i[h].value);
					(t.series = l), (this.drawData = Te({}, t)), this.checkData(t);
				},
				reloading() {
					this.errorReload !== !1 && ((this.showchart = !1), (this.mixinDatacomErrorMessage = null), this.beforeInit());
				},
				checkData(i) {
					let e = this.cid;
					this.type && C.type.includes(this.type) ? ((C.option[e] = Te({}, C[this.type], this.opts)), (C.option[e].canvasId = e)) : ((this.mixinDatacomLoading = !1), (this.showchart = !1), (this.mixinDatacomErrorMessage = '\u53C2\u6570\u9519\u8BEF\uFF1Aprops\u53C2\u6570\u4E2Dtype\u7C7B\u578B\u4E0D\u6B63\u786E'));
					let t = Te({}, i);
					t.series !== void 0 &&
						t.series.length > 0 &&
						((this.mixinDatacomErrorMessage = null),
						(C.option[e].categories = t.categories),
						(C.option[e].series = t.series),
						this.$nextTick(() => {
							this.init();
						}));
				},
				resizeHandler() {
					let i = Date.now(),
						e = this.lastDrawTime ? this.lastDrawTime : i - 3e3;
					if (i - e < 1e3) return;
					let a = document.getElementById('ChartBoxId' + this.cid).getBoundingClientRect();
					(this.showchart = !0), a.width > 0 && a.height > 0 && (a.width !== this.cWidth || a.height !== this.cHeight) && this.checkData(this.drawData);
				},
				_clearChart() {
					let i = this.cid;
					if (C.option[i] && C.option[i].context) {
						const e = C.option[i].context;
						typeof e == 'object' && !C.option[i].update && (e.clearRect(0, 0, this.cWidth * this.pixel, this.cHeight * this.pixel), e.draw());
					}
				},
				init() {
					let i = this.cid,
						e = document.getElementById('ChartBoxId' + this.cid).getBoundingClientRect();
					e.width > 0 && e.height > 0
						? ((this.mixinDatacomLoading = !1),
						  (this.showchart = !0),
						  (this.lastDrawTime = Date.now()),
						  (this.cWidth = e.width),
						  (this.cHeight = e.height),
						  (C.option[i].background = this.background == 'rgba(0,0,0,0)' ? '#FFFFFF' : this.background),
						  (C.option[i].canvas2d = this.type2d),
						  (C.option[i].pixelRatio = this.pixel),
						  (C.option[i].animation = this.animation),
						  (C.option[i].width = e.width * this.pixel),
						  (C.option[i].height = e.height * this.pixel),
						  (C.option[i].onzoom = this.onzoom),
						  (C.option[i].ontap = this.ontap),
						  (C.option[i].ontouch = this.ontouch),
						  (C.option[i].onmouse = this.openmouse),
						  (C.option[i].onmovetip = this.onmovetip),
						  (C.option[i].tooltipShow = this.tooltipShow),
						  (C.option[i].tooltipFormat = this.tooltipFormat),
						  (C.option[i].tooltipCustom = this.tooltipCustom),
						  (C.option[i].inScrollView = this.inScrollView),
						  (C.option[i].lastDrawTime = this.lastDrawTime),
						  (C.option[i].tapLegend = this.tapLegend),
						  (C.option[i] = ia(C.option[i], C.formatter)),
						  (this.mixinDatacomErrorMessage = null),
						  (this.mixinDatacomLoading = !1),
						  (this.showchart = !0),
						  (C.option[i].context = document.getElementById(i).getContext('2d')),
						  C.instance[i] && C.option[i] && C.option[i].update === !0
								? this._updataUChart(i)
								: setTimeout(() => {
										C.option[i].context.restore(), C.option[i].context.save(), this._newChart(i);
								  }, 100))
						: ((this.mixinDatacomLoading = !1), (this.showchart = !1), this.reshow == !0 && (this.mixinDatacomErrorMessage = '\u5E03\u5C40\u9519\u8BEF\uFF1A\u672A\u83B7\u53D6\u5230\u7236\u5143\u7D20\u5BBD\u9AD8\u5C3A\u5BF8\uFF01canvas-id:' + i));
				},
				getImage() {
					const i = document.getElementById(this.cid);
					this.emitMsg({ name: 'getImage', params: { type: 'getImage', base64: i.toDataURL('image/png') } });
				},
				_newChart(i) {
					this.mixinDatacomLoading != !0 &&
						((this.showchart = !0),
						(C.instance[i] = new Z(C.option[i])),
						C.instance[i].addEventListener('renderComplete', () => {
							this.emitMsg({ name: 'complete', params: { type: 'complete', complete: !0, id: i, opts: C.instance[i].opts } }), C.instance[i].delEventListener('renderComplete');
						}),
						C.instance[i].addEventListener('scrollLeft', () => {
							this.emitMsg({ name: 'scrollLeft', params: { type: 'scrollLeft', scrollLeft: !0, id: i, opts: C.instance[i].opts } });
						}),
						C.instance[i].addEventListener('scrollRight', () => {
							this.emitMsg({ name: 'scrollRight', params: { type: 'scrollRight', scrollRight: !0, id: i, opts: C.instance[i].opts } });
						}));
				},
				_updataUChart(i) {
					C.instance[i].updateData(C.option[i]);
				},
				tooltipDefault(i, e, t, a) {
					if (e) {
						let l = i.data;
						return typeof i.data == 'object' && (l = i.data.value), e + ' ' + i.name + ':' + l;
					} else return i.properties && i.properties.name ? i.properties.name : i.name + ':' + i.data;
				},
				showTooltip(i, e) {
					let t = C.option[e].tooltipCustom;
					if (t && t !== void 0 && t !== null) {
						let a;
						t.x >= 0 && t.y >= 0 && (a = { x: t.x, y: t.y + 10 }), C.instance[e].showToolTip(i, { index: t.index, offset: a, textList: t.textList, formatter: (l, r, n, h) => (typeof C.option[e].tooltipFormat == 'string' && C.formatter[C.option[e].tooltipFormat] ? C.formatter[C.option[e].tooltipFormat](l, r, n, h) : this.tooltipDefault(l, r, n, h)) });
					} else C.instance[e].showToolTip(i, { formatter: (a, l, r, n) => (typeof C.option[e].tooltipFormat == 'string' && C.formatter[C.option[e].tooltipFormat] ? C.formatter[C.option[e].tooltipFormat](a, l, r, n) : this.tooltipDefault(a, l, r, n)) });
				},
				tap(i) {
					let e = this.cid,
						t = this.ontap,
						a = this.tooltipShow,
						l = this.tapLegend;
					if (t == !1) return;
					let r = null,
						n = null,
						h = document.getElementById('UC' + e).getBoundingClientRect(),
						d = {};
					i.detail.x ? (d = { x: i.detail.x - h.left, y: i.detail.y - h.top + ve.top }) : (d = { x: i.clientX - h.left, y: i.clientY - h.top + ve.top }),
						(i.changedTouches = []),
						i.changedTouches.unshift(d),
						(r = C.instance[e].getCurrentDataIndex(i)),
						(n = C.instance[e].getLegendDataIndex(i)),
						l === !0 && C.instance[e].touchLegend(i),
						a == !0 && this.showTooltip(i, e),
						this.emitMsg({ name: 'getIndex', params: { type: 'getIndex', event: d, currentIndex: r, legendIndex: n, id: e, opts: C.instance[e].opts } });
				},
				touchStart(i) {
					let e = this.cid;
					this.ontouch != !1 && (C.option[e].enableScroll === !0 && i.touches.length == 1 && C.instance[e].scrollStart(i), this.emitMsg({ name: 'getTouchStart', params: { type: 'touchStart', event: i.changedTouches[0], id: e, opts: C.instance[e].opts } }));
				},
				touchMove(i) {
					let e = this.cid,
						t = this.ontouch;
					if (t != !1) {
						if ((C.option[e].enableScroll === !0 && i.changedTouches.length == 1 && C.instance[e].scroll(i), C.option[e].ontap === !0 && C.option[e].enableScroll === !1 && this.onmovetip === !0)) {
							let a = document.getElementById('UC' + e).getBoundingClientRect(),
								l = { x: i.changedTouches[0].clientX - a.left, y: i.changedTouches[0].clientY - a.top + ve.top };
							i.changedTouches.unshift(l), C.option[e].tooltipShow === !0 && this.showTooltip(i, e);
						}
						t === !0 && C.option[e].enableScroll === !0 && this.onzoom === !0 && i.changedTouches.length == 2 && C.instance[e].dobuleZoom(i), this.emitMsg({ name: 'getTouchMove', params: { type: 'touchMove', event: i.changedTouches[0], id: e, opts: C.instance[e].opts } });
					}
				},
				touchEnd(i) {
					let e = this.cid;
					this.ontouch != !1 && (C.option[e].enableScroll === !0 && i.touches.length == 0 && C.instance[e].scrollEnd(i), this.emitMsg({ name: 'getTouchEnd', params: { type: 'touchEnd', event: i.changedTouches[0], id: e, opts: C.instance[e].opts } }), this.ontap === !0 && C.option[e].enableScroll === !1 && this.onmovetip === !0 && this.tap(i, !0));
				},
				mouseDown(i) {
					let e = this.cid;
					if (this.onmouse == !1) return;
					let a = document.getElementById('UC' + e).getBoundingClientRect(),
						l = {};
					(l = { x: i.clientX - a.left, y: i.clientY - a.top + ve.top }), (i.changedTouches = []), i.changedTouches.unshift(l), C.instance[e].scrollStart(i), (C.option[e].mousedown = !0), this.emitMsg({ name: 'getTouchStart', params: { type: 'mouseDown', event: l, id: e, opts: C.instance[e].opts } });
				},
				mouseMove(i) {
					let e = this.cid,
						t = this.onmouse,
						a = this.tooltipShow;
					if (t == !1) return;
					let l = document.getElementById('UC' + e).getBoundingClientRect(),
						r = {};
					(r = { x: i.clientX - l.left, y: i.clientY - l.top + ve.top }), (i.changedTouches = []), i.changedTouches.unshift(r), C.option[e].mousedown ? (C.instance[e].scroll(i), this.emitMsg({ name: 'getTouchMove', params: { type: 'mouseMove', event: r, id: e, opts: C.instance[e].opts } })) : C.instance[e] && a == !0 && this.showTooltip(i, e);
				},
				mouseUp(i) {
					let e = this.cid;
					if (this.onmouse == !1) return;
					let a = document.getElementById('UC' + e).getBoundingClientRect(),
						l = {};
					(l = { x: i.clientX - a.left, y: i.clientY - a.top + ve.top }), (i.changedTouches = []), i.changedTouches.unshift(l), C.instance[e].scrollEnd(i), (C.option[e].mousedown = !1), this.emitMsg({ name: 'getTouchEnd', params: { type: 'mouseUp', event: l, id: e, opts: C.instance[e].opts } });
				},
				emitMsg(i) {
					this.$emit(i.name, i.params);
				}
			}
		},
		Zi = ['id'],
		Ki = { key: 0 },
		Qi = ['id'],
		er = ['id', 'canvasId', 'width', 'height', 'disable-scroll'];
	function ar(i, e, t, a, l, r) {
		const n = p.resolveComponent('qiun-loading'),
			h = p.resolveComponent('qiun-error');
		return (
			p.openBlock(),
			p.createElementBlock(
				'div',
				{ class: 'chartsview', id: 'ChartBoxId' + l.cid },
				[
					l.mixinDatacomLoading ? (p.openBlock(), p.createElementBlock('div', Ki, [p.createCommentVNode(' \u81EA\u5B9A\u4E49\u52A0\u8F7D\u72B6\u6001\uFF0C\u8BF7\u6539\u8FD9\u91CC '), p.createVNode(n, { loadingType: t.loadingType }, null, 8, ['loadingType'])])) : p.createCommentVNode('v-if', !0),
					l.mixinDatacomErrorMessage && t.errorShow ? (p.openBlock(), p.createElementBlock('div', { key: 1, onTap: e[0] || (e[0] = (...d) => r.reloading && r.reloading(...d)) }, [p.createCommentVNode(' \u81EA\u5B9A\u4E49\u9519\u8BEF\u63D0\u793A\uFF0C\u8BF7\u6539\u8FD9\u91CC '), p.createVNode(h, { errorMessage: t.errorMessage }, null, 8, ['errorMessage'])], 32)) : p.createCommentVNode('v-if', !0),
					p.createElementVNode(
						'div',
						{
							onTap: e[1] || (e[1] = (...d) => r.tap && r.tap(...d)),
							onClick: e[2] || (e[2] = (...d) => r.tap && r.tap(...d)),
							onMousemove: e[3] || (e[3] = (...d) => r.mouseMove && r.mouseMove(...d)),
							onMousedown: e[4] || (e[4] = (...d) => r.mouseDown && r.mouseDown(...d)),
							onMouseup: e[5] || (e[5] = (...d) => r.mouseUp && r.mouseUp(...d)),
							onTouchstart: e[6] || (e[6] = (...d) => r.touchStart && r.touchStart(...d)),
							onTouchmove: e[7] || (e[7] = (...d) => r.touchMove && r.touchMove(...d)),
							onTouchend: e[8] || (e[8] = (...d) => r.touchEnd && r.touchEnd(...d)),
							id: 'UC' + l.cid
						},
						[p.withDirectives(p.createElementVNode('canvas', { id: l.cid, canvasId: l.cid, width: l.cWidth, height: l.cHeight, style: p.normalizeStyle({ width: l.cWidth + 'px', height: l.cHeight + 'px', background: t.background }), 'disable-scroll': t.disableScroll }, null, 12, er), [[p.vShow, l.showchart]])],
						40,
						Qi
					)
				],
				8,
				Zi
			)
		);
	}
	const ra = ue(Ji, [
		['render', ar],
		['__scopeId', 'data-v-3d92a4e9'],
		['__file', 'D:/work/design/admin/diygw-admin-lib/node_modules/@qiun/vue-ucharts/src/qiun-vue-ucharts.vue']
	]);
	return {
		install: (i) => {
			i.component(ra.name, ra);
		}
	};
});
