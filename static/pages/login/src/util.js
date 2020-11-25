export default class UrlUtil {
    static getParam(paramName) {
        const results = new RegExp('[?&]' + paramName + '=([^&#]*)').exec(window.location.search);

        if (results == null) {
            return null;
        }
        else {
            return decodeURIComponent(results[1]);
        }
    }
}