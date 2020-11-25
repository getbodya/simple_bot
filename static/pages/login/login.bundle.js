(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _loginForm = require('./src/login-form');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(_loginForm.LoginForm, null), document.querySelector('#authenticationFormApp'));

},{"./src/login-form":2,"react":"react","react-dom":"react-dom"}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LoginForm = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LoginForm = exports.LoginForm = function LoginForm() {
	var _useState = (0, _react.useState)({
		username: '',
		password: ''
	}),
	    _useState2 = _slicedToArray(_useState, 2),
	    form = _useState2[0],
	    setForm = _useState2[1];

	var handleSubmit = function handleSubmit() {
		console.log(form);
		console.log(_util2.default.getParam('state'));
		form.state = _util2.default.getParam('state');

		var xhr = new XMLHttpRequest();

		xhr.open('POST', '/api/login');
		xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
		xhr.send(JSON.stringify(form));
	};

	var handleInputChange = function handleInputChange(event) {
		setForm(_extends({}, form, _defineProperty({}, event.target.name, event.target.value)));
	};
	return _react2.default.createElement(
		'div',
		null,
		_react2.default.createElement(
			'ul',
			null,
			_react2.default.createElement(
				'li',
				null,
				_react2.default.createElement(
					'label',
					{ htmlFor: 'username' },
					'username'
				),
				_react2.default.createElement('input', {
					id: 'username',
					name: 'username',
					value: form.username,
					onChange: handleInputChange,
					type: 'text' })
			),
			_react2.default.createElement(
				'li',
				null,
				_react2.default.createElement(
					'label',
					{ htmlFor: 'password' },
					'password'
				),
				_react2.default.createElement('input', {
					id: 'password',
					name: 'password',
					value: form.password,
					onChange: handleInputChange,
					type: 'password' })
			),
			_react2.default.createElement(
				'li',
				null,
				_react2.default.createElement(
					'button',
					{ onClick: handleSubmit },
					'log in'
				)
			)
		)
	);
};

},{"./util":3,"react":"react"}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UrlUtil = function () {
    function UrlUtil() {
        _classCallCheck(this, UrlUtil);
    }

    _createClass(UrlUtil, null, [{
        key: 'getParam',
        value: function getParam(paramName) {
            var results = new RegExp('[?&]' + paramName + '=([^&#]*)').exec(window.location.search);

            if (results == null) {
                return null;
            } else {
                return decodeURIComponent(results[1]);
            }
        }
    }]);

    return UrlUtil;
}();

exports.default = UrlUtil;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzdGF0aWMvcGFnZXMvbG9naW4vYXBwLmpzIiwic3RhdGljL3BhZ2VzL2xvZ2luL3NyYy9sb2dpbi1mb3JtLmpzIiwic3RhdGljL3BhZ2VzL2xvZ2luL3NyYy91dGlsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFFQSxtQkFBUyxNQUFULENBQ0ksOEJBQUMsb0JBQUQsT0FESixFQUVJLFNBQVMsYUFBVCxDQUF1Qix3QkFBdkIsQ0FGSjs7Ozs7Ozs7Ozs7Ozs7QUNMQTs7OztBQUNBOzs7Ozs7OztBQUVPLElBQU0sZ0NBQVksU0FBWixTQUFZLEdBQU07QUFBQSxpQkFDTixxQkFBUztBQUNoQyxZQUFVLEVBRHNCO0FBRWhDLFlBQVU7QUFGc0IsRUFBVCxDQURNO0FBQUE7QUFBQSxLQUN2QixJQUR1QjtBQUFBLEtBQ2pCLE9BRGlCOztBQU05QixLQUFNLGVBQWUsU0FBZixZQUFlLEdBQU07QUFDMUIsVUFBUSxHQUFSLENBQVksSUFBWjtBQUNBLFVBQVEsR0FBUixDQUFZLGVBQVEsUUFBUixDQUFpQixPQUFqQixDQUFaO0FBQ0EsT0FBSyxLQUFMLEdBQWEsZUFBUSxRQUFSLENBQWlCLE9BQWpCLENBQWI7O0FBS00sTUFBTSxNQUFNLElBQUksY0FBSixFQUFaOztBQUVBLE1BQUksSUFBSixDQUFTLE1BQVQsRUFBaUIsWUFBakI7QUFDQSxNQUFJLGdCQUFKLENBQXFCLGNBQXJCLEVBQXFDLGdDQUFyQztBQUNBLE1BQUksSUFBSixDQUFTLEtBQUssU0FBTCxDQUFlLElBQWYsQ0FBVDtBQUVOLEVBZEQ7O0FBZ0JBLEtBQU0sb0JBQW9CLFNBQXBCLGlCQUFvQixDQUFDLEtBQUQsRUFBVztBQUNwQyx1QkFDSSxJQURKLHNCQUVFLE1BQU0sTUFBTixDQUFhLElBRmYsRUFFc0IsTUFBTSxNQUFOLENBQWEsS0FGbkM7QUFJQSxFQUxEO0FBTUEsUUFBTztBQUFBO0FBQUE7QUFDTjtBQUFBO0FBQUE7QUFDQztBQUFBO0FBQUE7QUFDQztBQUFBO0FBQUEsT0FBTyxTQUFRLFVBQWY7QUFBQTtBQUFBLEtBREQ7QUFFQztBQUNDLFNBQUcsVUFESjtBQUVDLFdBQUssVUFGTjtBQUdDLFlBQU8sS0FBSyxRQUhiO0FBSUMsZUFBVSxpQkFKWDtBQUtDLFdBQUssTUFMTjtBQUZELElBREQ7QUFVQztBQUFBO0FBQUE7QUFDQztBQUFBO0FBQUEsT0FBTyxTQUFRLFVBQWY7QUFBQTtBQUFBLEtBREQ7QUFFQztBQUNDLFNBQUcsVUFESjtBQUVDLFdBQUssVUFGTjtBQUdDLFlBQU8sS0FBSyxRQUhiO0FBSUMsZUFBVSxpQkFKWDtBQUtDLFdBQUssVUFMTjtBQUZELElBVkQ7QUFtQkM7QUFBQTtBQUFBO0FBQ0M7QUFBQTtBQUFBLE9BQVEsU0FBUyxZQUFqQjtBQUFBO0FBQUE7QUFERDtBQW5CRDtBQURNLEVBQVA7QUF5QkEsQ0FyRE07Ozs7Ozs7Ozs7Ozs7SUNIYyxPOzs7Ozs7O2lDQUNELFMsRUFBVztBQUN2QixnQkFBTSxVQUFVLElBQUksTUFBSixDQUFXLFNBQVMsU0FBVCxHQUFxQixXQUFoQyxFQUE2QyxJQUE3QyxDQUFrRCxPQUFPLFFBQVAsQ0FBZ0IsTUFBbEUsQ0FBaEI7O0FBRUEsZ0JBQUksV0FBVyxJQUFmLEVBQXFCO0FBQ2pCLHVCQUFPLElBQVA7QUFDSCxhQUZELE1BR0s7QUFDRCx1QkFBTyxtQkFBbUIsUUFBUSxDQUFSLENBQW5CLENBQVA7QUFDSDtBQUNKOzs7Ozs7a0JBVmdCLE8iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuXHJcbmltcG9ydCB7TG9naW5Gb3JtfSBmcm9tICcuL3NyYy9sb2dpbi1mb3JtJztcclxuXHJcblJlYWN0RE9NLnJlbmRlcihcclxuICAgIDxMb2dpbkZvcm0+PC9Mb2dpbkZvcm0+LFxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2F1dGhlbnRpY2F0aW9uRm9ybUFwcCcpXHJcbik7XHJcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgU3ludGhldGljRXZlbnQgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBVcmxVdGlsIGZyb20gJy4vdXRpbCc7XHJcblxyXG5leHBvcnQgY29uc3QgTG9naW5Gb3JtID0gKCkgPT4ge1xyXG5cdGNvbnN0IFtmb3JtLCBzZXRGb3JtXSA9IHVzZVN0YXRlKHtcclxuXHRcdHVzZXJuYW1lOiAnJyxcclxuXHRcdHBhc3N3b3JkOiAnJ1xyXG5cdH0pXHJcblxyXG5cdGNvbnN0IGhhbmRsZVN1Ym1pdCA9ICgpID0+IHtcclxuXHRcdGNvbnNvbGUubG9nKGZvcm0pXHJcblx0XHRjb25zb2xlLmxvZyhVcmxVdGlsLmdldFBhcmFtKCdzdGF0ZScpKVxyXG5cdFx0Zm9ybS5zdGF0ZSA9IFVybFV0aWwuZ2V0UGFyYW0oJ3N0YXRlJyk7XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXHJcblxyXG4gICAgICAgIHhoci5vcGVuKCdQT1NUJywgJy9hcGkvbG9naW4nKTtcclxuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD1VVEYtOCcpO1xyXG4gICAgICAgIHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGZvcm0pKTtcclxuXHJcblx0fVxyXG5cclxuXHRjb25zdCBoYW5kbGVJbnB1dENoYW5nZSA9IChldmVudCkgPT4ge1xyXG5cdFx0c2V0Rm9ybSh7XHJcblx0XHRcdC4uLmZvcm0sXHJcblx0XHRcdFtldmVudC50YXJnZXQubmFtZV06IGV2ZW50LnRhcmdldC52YWx1ZVxyXG5cdFx0fSlcclxuXHR9XHJcblx0cmV0dXJuIDxkaXY+XHJcblx0XHQ8dWw+XHJcblx0XHRcdDxsaT5cclxuXHRcdFx0XHQ8bGFiZWwgaHRtbEZvcj1cInVzZXJuYW1lXCI+dXNlcm5hbWU8L2xhYmVsPlxyXG5cdFx0XHRcdDxpbnB1dCBcclxuXHRcdFx0XHRcdGlkPVwidXNlcm5hbWVcIlxyXG5cdFx0XHRcdFx0bmFtZT1cInVzZXJuYW1lXCJcclxuXHRcdFx0XHRcdHZhbHVlPXtmb3JtLnVzZXJuYW1lfVxyXG5cdFx0XHRcdFx0b25DaGFuZ2U9e2hhbmRsZUlucHV0Q2hhbmdlfVxyXG5cdFx0XHRcdFx0dHlwZT1cInRleHRcIi8+XHJcblx0XHRcdDwvbGk+XHJcblx0XHRcdDxsaT5cclxuXHRcdFx0XHQ8bGFiZWwgaHRtbEZvcj1cInBhc3N3b3JkXCI+cGFzc3dvcmQ8L2xhYmVsPlxyXG5cdFx0XHRcdDxpbnB1dCBcclxuXHRcdFx0XHRcdGlkPVwicGFzc3dvcmRcIlxyXG5cdFx0XHRcdFx0bmFtZT1cInBhc3N3b3JkXCJcclxuXHRcdFx0XHRcdHZhbHVlPXtmb3JtLnBhc3N3b3JkfVxyXG5cdFx0XHRcdFx0b25DaGFuZ2U9e2hhbmRsZUlucHV0Q2hhbmdlfVxyXG5cdFx0XHRcdFx0dHlwZT1cInBhc3N3b3JkXCIvPlxyXG5cdFx0XHQ8L2xpPlxyXG5cdFx0XHQ8bGk+XHJcblx0XHRcdFx0PGJ1dHRvbiBvbkNsaWNrPXtoYW5kbGVTdWJtaXR9PmxvZyBpbjwvYnV0dG9uPlxyXG5cdFx0XHQ8L2xpPlxyXG5cdFx0PC91bD5cclxuXHQ8L2Rpdj5cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFVybFV0aWwge1xyXG4gICAgc3RhdGljIGdldFBhcmFtKHBhcmFtTmFtZSkge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSBuZXcgUmVnRXhwKCdbPyZdJyArIHBhcmFtTmFtZSArICc9KFteJiNdKiknKS5leGVjKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xyXG5cclxuICAgICAgICBpZiAocmVzdWx0cyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChyZXN1bHRzWzFdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=
