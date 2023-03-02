export function conversionTimeFormat(value: Date) {
  let date = new Date(value);
  let year = date.getFullYear();
  let month =
    date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
  let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  return (
    year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
  );
}
