export default function getQueryString(name) {
  const urlString = window.location.href;
  const url = new URL(urlString);
  const param = url.searchParams.get(name);
  return param;
}

