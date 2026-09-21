/**
 * 端到端冒烟测试：用真实浏览器跑一遍主要页面与交互。
 *
 * 前置：
 *   pnpm add -D playwright      # 安装 playwright
 *   pnpm build && pnpm preview  # 另开一个终端启动预览服务（默认 4173 端口）
 *
 * 运行：
 *   node tests/smoke-test.cjs
 *   EDGE_PATH="C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" node tests/smoke-test.cjs
 *
 * 说明：优先使用系统已安装的 Edge，避免额外下载 Chromium。
 */
const path = require('path')

let chromium
try {
  ({ chromium } = require('playwright'))
} catch {
  console.error('未找到 playwright，请先执行：pnpm add -D playwright')
  process.exit(2)
}

const BASE = process.env.BASE_URL || 'http://localhost:4173'
const EDGE =
  process.env.EDGE_PATH ||
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'

const results = []
let failed = 0
function check(name, ok, extra) {
  results.push((ok ? 'PASS  ' : 'FAIL  ') + name + (extra ? '   [' + extra + ']' : ''))
  if (!ok) failed++
}

;(async () => {
  const launchOptions = { headless: true }
  if (require('fs').existsSync(EDGE)) launchOptions.executablePath = EDGE

  const browser = await chromium.launch(launchOptions)
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await ctx.newPage()

  const errors = []
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()) })
  page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message))

  // 首页
  await page.goto(BASE + '/', { waitUntil: 'networkidle' })
  check('首页渲染 Hero 标题', (await page.locator('.hero__title').innerText()).length > 0)
  check('首页展示 3 篇最新文章', (await page.locator('.card').count()) === 3)
  check('首页统计数值渲染', (await page.locator('.hero__stat-value').count()) === 3)

  // 列表页：筛选 / 搜索 / 分页
  await page.goto(BASE + '/articles', { waitUntil: 'networkidle' })
  check('列表页每页 6 篇', (await page.locator('.card').count()) === 6)
  check('标签筛选渲染', (await page.locator('.tagfilter__item').count()) > 1)
  check('分页组件渲染', (await page.locator('.pagination').count()) === 1)

  await page.locator('.tagfilter__item', { hasText: 'Java' }).first().click()
  await page.waitForTimeout(300)
  check('标签筛选生效并写入 URL', page.url().includes('tag=Java'))

  await page.locator('.tagfilter__item', { hasText: '全部' }).first().click()
  await page.waitForTimeout(300)
  await page.locator('.search').fill('Git')
  await page.waitForTimeout(350)
  check('关键词搜索生效', (await page.locator('.card').count()) >= 1)

  // 详情页
  await page.goto(BASE + '/article/1', { waitUntil: 'networkidle' })
  check('详情页标题渲染', (await page.locator('.post__title').innerText()).length > 0)
  check('代码块渲染', (await page.locator('.post__code').count()) >= 1)

  // 404 / 关于
  await page.goto(BASE + '/no-such-page', { waitUntil: 'networkidle' })
  check('404 兜底页面渲染', (await page.locator('.nf__code').count()) === 1)
  await page.goto(BASE + '/about', { waitUntil: 'networkidle' })
  check('关于页渲染', (await page.locator('.skills__group').count()) === 4)

  // 响应式与横向溢出
  for (const w of [375, 768, 1440]) {
    await page.setViewportSize({ width: w, height: 800 })
    await page.goto(BASE + '/articles', { waitUntil: 'networkidle' })
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    )
    check('无横向溢出 @' + w + 'px', overflow <= 1, 'overflow=' + overflow + 'px')
  }

  check('无控制台报错', errors.length === 0, errors.slice(0, 2).join(' | '))

  await browser.close()
  console.log(results.join('\n'))
  console.log('\nTOTAL: ' + results.length + ' checks, ' + failed + ' failed')
  process.exit(failed ? 1 : 0)
})().catch((e) => {
  console.log('FATAL: ' + e.message)
  process.exit(2)
})
