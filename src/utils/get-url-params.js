export default function getUrlParams(urlSearch) {
  const paramsArr = urlSearch.substring(1).split("&");
  const urlParams = paramsArr.reduce((prev, curr) => {
    const [key, value] = curr.split("=");
    prev[key] = value;
    return prev;
  }, {});
  return urlParams;
}
