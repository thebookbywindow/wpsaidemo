const pageUrl = 'https://www.wps.com/feature/wps-ai-your-office-copilot/'
const res = await fetch(pageUrl, {
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0' },
})
const html = await res.text()
const urls = [...new Set([...html.matchAll(/https:\/\/ds\.cache\.wpscdn\.com\/wps_ai_website\/[^"'\\\s>]+\.(?:jpg|jpeg|png|webp)/gi)].map((m) => m[0]))]
console.log(urls.join('\n'))
