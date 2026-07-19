const url = 'https://www.wps.com/feature/wps-ai-your-office-copilot/'
const res = await fetch(url, {
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0' },
})
const html = await res.text()
for (const m of html.matchAll(/https:\/\/[^"'\\\s>]+\.(?:jpg|jpeg|png|webp|svg)/gi)) {
  const u = m[0]
  if (/copilot|banner|hero|office|ai-/i.test(u)) console.log(u)
}
