/** ISO date -> "2min ago" / "3h ago" / "5days ago", buckets no finer than a minute. */
export const formatRelativeTime = (isoDate: string) => {
    const diffMs = Date.now() - new Date(isoDate).getTime()
    const minutes = Math.floor(diffMs / 60000)

    if (minutes < 1) return 'just now'
    if (minutes < 60) return `${minutes}min ago`

    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`

    const days = Math.floor(hours / 24)
    return `${days}day${days > 1 ? 's' : ''} ago`
}

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
  