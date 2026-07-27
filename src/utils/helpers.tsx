/** "Tadeu Melembe" -> "TM", "Itan" -> "I", missing name -> "". */
export const getInitials = (name?: string | null) => {
    const words = name?.trim().split(/\s+/).filter(Boolean) ?? []

    if (!words.length) return ''

    const [first, ...rest] = words

    return (first[0] + (rest.length ? rest[rest.length - 1][0] : '')).toUpperCase()
}

export const getBlobFromUri = async (uri:string) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  
    return blob;
  };
  