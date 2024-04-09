export default function extractYoutubeVideoId(item) {
  return String(item).includes('http')
    ? new URLSearchParams(item.split('?')[1]).get('v')
    : item
}
