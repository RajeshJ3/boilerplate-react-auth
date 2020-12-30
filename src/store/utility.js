function get_domain() {
  if (window.location.hostname === "localhost") {
    return "http://0.0.0.0:8000";
  } else if (window.location.hostname === "192.168.43.207") {
      return "http://192.168.43.207:8000";
  } else {
    return "https://api.99coupons.ml";
  }
}

export const DOMAIN = get_domain();
export const SITE_URL = "https://www.99coupons.ml";
