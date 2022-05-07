export default function updateUrlParams(params) {
  const queryParams = new URLSearchParams(window.location.search);
  Object.entries(params).forEach(([key, value]) => {
    queryParams.set(key, value);
  });
  history.pushState(null, null, "?" + queryParams.toString());
  window.dispatchEvent(new Event("popstate"));
}
