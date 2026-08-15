const API_URL =
  "https://script.google.com/macros/s/AKfycbyRZjpodVVkT3F3zClEcShpmKvu2ARX4INXqb6vI2XGqRR3xsqTsUJH0_DND-mKRXrkaA/exec";

function apiCall(params) {
  return new Promise(function(resolve, reject) {
    const callbackName = "cb_" + Date.now() + "_" + Math.floor(Math.random() * 100000);

    window[callbackName] = function(data) {
      try {
        delete window[callbackName];
      } catch (e) {}

      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }

      resolve(data);
    };

    const query = new URLSearchParams(params || {});
    query.set("callback", callbackName);

    const script = document.createElement("script");
    script.src = API_URL + "?" + query.toString();

    script.onerror = function() {
      try {
        delete window[callbackName];
      } catch (e) {}

      reject(new Error("Unable to connect to backend"));
    };

    document.body.appendChild(script);
  });
}
