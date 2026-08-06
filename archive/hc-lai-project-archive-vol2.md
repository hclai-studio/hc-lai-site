# H.C. Lai 个人品牌网站 · 项目存档 续篇 (第二卷)

> **项目**：hclai.studio — 赖兴菁（H.C. Lai）个人品牌网站
> **存档性质**：从首次构思到 MVP 完成的完整项目沉淀（结构化无损——保留所有规格 / 决策 / 踩坑 / 结论，去除对话噪声）
> **对话截止**：2026-05-29（MVP 完成日）
> **当前状态**：**v2.0 — MVP 完成**。Hero / About / Work 目录 / Contact + **三篇 case study 详情页（01 / 02 / 03）+ 7 张真图 + Lightbox** 全部上线，桌面 + 移动端验证通过。hclai.studio 已可正式发给招聘官 / 写进简历。
> **参与角色**：主理人（赖兴菁）· 策略顾问 Claude（chat，"姐姐"）· 工程实现 Claude Code

> **本档案的两个阶段**：
> - **阶段 A（截至 2026-05-17）**：设计探索 → 上线 → 基础设施 → About 精修 → Work 目录 → 第一次字体战。即原 v1.5。
> - **阶段 B（Day 3，截至 2026-05-29）**：MDX 路由系统 → 三篇详情页 → **第二次字体战（"发虚" + 数字对齐）** → CaseExpandable / Lightbox 组件 → 版权处理 → 真图上传 → 分支部署。即 MVP 完成。
> - 三篇 case study 的**完整 MDX 源稿见附录 D**；新组件代码见附录 E。

---

## 1. 背景与目标

- **主理人**：赖兴菁，英文署名 **H.C. Lai**，24 岁，建筑设计师，正在向 AI 行业转型。
- **网站性质**：**个人品牌网站，不是网页版简历**。这是项目最早、最关键的定调——主理人明确区分了"品牌感"与"履历感"，整个项目所有决策都围绕"品牌"展开。
- **核心信号**：要传达"我有建筑训练出来的设计审美和系统思维，并且我懂 AI 时代的语言"。
- **阶段目标**：先做一个精致的 **MVP**（首屏 + 简短 about + 联系方式），几天内上线；后续逐步加作品、思考随笔等。
- **实现方式**：用 **Claude Code** 做工程落地，**Claude（chat）** 做策略顾问、质量审查、以及输出可直接粘贴给 Claude Code 的 brief / 指令。
- **主轴**：混合型，偏图片/视觉展示而非文字，偏动效交互而非静态页面。后来逐步确认为 **editorial（编辑出版物）气质**。

---

## 2. 品牌定位与设计语言

### 2.1 品牌核心

| 项 | 决策 |
|---|---|
| **Wordmark（招牌）** | `H.C. Lai.`（注意：句号是品牌的一部分） |
| **Positioning（hero 左上角 annotation）** | `— Designer of spaces and systems.` |
| **气质关键词** | 冷静的智识、editorial elegance、克制的高级感、**confident quietness**（不靠喊话证明自己） |
| **明确不要的气质** | 建筑事务所（BIG/OMA）那种"项目堆砌"、SaaS 花哨、网页版简历、"微软雅黑感" / "机关单位 PPT 感" |

**关于 positioning 的取舍**：主理人明确**不想把"建筑设计师"作为大标签挂出来**，因为正在转行，past-tense 标签会把人钉在过去。最终选择抽象表达 `Designer of spaces and systems`——"空间"暗指建筑、"系统"暗指数字/AI，谁都不挑明。核心心法：**不否认来路，但不让来路定义你；不解释转行，让意象自己暗示。**

### 2.2 配色系统

```css
--cream:        #F2EFE9;   /* 主背景，暖灰白（非纯白） */
--cream-warm:   #EEEAE0;   /* 次级背景，备用 */
--ink:          #1C1B17;   /* 主文字，带温度的深色（非纯黑） */
--ink-muted:    #6B6862;   /* 次要文字 / annotation 灰色部分 */
--terracotta:   #B85C38;   /* 唯一彩色 accent，偏陶土红 */
--line:         rgba(28, 27, 23, 0.12);   /* 分割线 */
```

**配色原则**：
- 单色为主（cream + ink），terracotta 作为**唯一彩色 accent**。
- **terracotta 全站只允许出现在 5 处**：① hero 的 `H.C. Lai.` 句号；② nav hover 下划线；③ Contact 的 `Let's talk.` 句号；④ Work 列表箭头 hover；⑤ inline code 背景。**不得扩展到其他地方。**
- **整体偏灰、低彩度**——主理人明确不要纯度/彩度高的颜色，要"不炸眼"。这是参照 Claude 官网的舒服纯色质感。
- **没有 grain / 噪点 / 纸张纹理**——v0 曾加过，主理人觉得"脏"，已彻底移除。Claude 官网是纯色背景。

### 2.3 字体系统

> **重要**：下表是 **brief 原始设计 + Day 3 两次字体战之后的最终实况**。字体系统在 Day 3 经历了大幅演化（正文英文从「Geist sans」改为「Georgia 衬线」、H2 改为「Geist Sans Bold」、数字单独走「Geist Mono」做对齐）。完整演化路径见踩坑记录 #17–#19，加载与对齐技术细节见附录 B。

| 角色 | 字体 | 用于 |
|---|---|---|
| Display serif（英文 H1 / 装饰） | **Instrument Serif** | wordmark、英文大标题、详情页 H1、英文作品标题 |
| **结构 sans（H2）** | **Geist Sans Bold** | 详情页章节标题 H2（如 `01 \| 项目概述`），撑住结构层 |
| **正文英文** | **Georgia** | 详情页正文英文（系统衬线，屏幕渲染锐利、免费；**Day 3 取代了 brief 原定的 Geist sans**） |
| 正文中文 | **Noto Serif SC**（含 600 字重） | 详情页 / about 中文段落正文（衬线，editorial 感） |
| **数字 / 数字标点** | **Geist Mono**（`size-adjust: 95%`） | 正文里所有数字字符（0-9 及 `- / , . %`），用等宽字体解决「108」顶端不齐问题 |
| Mono accent | **Geist Mono** | section 编号标签、年份、导航、caption、坐标式细节 |
| 中文标题 / 副标题 | **Noto Sans SC** | Work 列表作品中文副标题（无衬线） |

**字体加载方式（重要，见附录 B）**：最终统一用 **Google Fonts CDN 的 `<link>` 标签**加载，**不用** `next/font/google`，**不用** `localFont`。Noto Serif SC 的 CDN 加载范围在 Day 3 从 `400;500` 扩到 `400;500;600;700`（解决 synthetic bold 糊边）。

**绝对不用的字体**：Inter、Arial、Roboto、系统默认 sans、**微软雅黑**。

**关于"Anthropic 那种力量感"的真相（Day 3 核心认知）**：主理人反复想追 Anthropic 文章页正文那种「清晰有力、不发虚」的感觉。最终查明三件事：① Anthropic 用的 `anthropicSerif` 是**英文定制付费字体**，开源中文衬线圈没有等价物，复刻天花板在 80%+；② 主理人真正偏爱的「图一英文衬线」其实是 **Geist 加载失败 fallback 到系统 Times 的美丽意外**，并非 brief 设计——这条线索最终把英文正文导向了 Georgia；③ mac 端「发虚」是 **macOS subpixel 渲染对中文开源衬线细笔画的物理特征，不是 CSS bug**，iPhone 端完全正常（见 #19）。

**字体混搭逻辑（editorial dual typography）**：
- hero annotation `— Designer of spaces and systems.`：`— Designer of` 用 **Instrument Serif Italic**（灰色，attribution 感，像书的序言）+ `spaces and systems.` 用 **Geist medium**（深色，declarative 感，像现代标签）。
- about 大标题 `Trained in architecture. Curious about everything else.`：正体 + italic 混搭（`architecture` 和 `everything else` 为 italic）。
- **编辑学规则**：罗马正体 = 一般文本；斜体 italic = 作品名 / 强调。Work 作品标题考虑过用 italic，但最终用**正体 Regular**（italic 装饰感太强）。

**中文标题方向（经 A/B/C 测试）**：最终选 **Variant C — 英文 Instrument Serif 为主 + 中文 Noto Sans SC 为辅**。
- Variant A（中文 Noto Sans SC bold 主标题）被否：有"微软雅黑感"，因 Noto Sans SC 视觉个性被刻意磨平。
- Variant B（中文 serif 主 + 英文 italic 副）也成立，但主理人选了 C。
- **选 C 的理由（主理人原话精神）**：「我不迁就别人」「更符合我的审美，更 anthropic 感」。这是审美选择，不是求职策略选择。英文主轴也跟 hero 的 `H.C. Lai.` 形成品牌闭环。

### 2.4 动效

**进场动画（页面加载）**——staggered fade-up，所有元素从 `translateY + opacity:0` 渐入：
- annotation（delay 300ms）→ nav（500ms）→ wordmark（700ms，位移更大 40px）→ footer mark（1200ms）→ scroll cue（1500ms，之后转呼吸式浮动）。
- duration 1.2–1.6s，easing `cubic-bezier(0.16, 1, 0.3, 1)`。

**持续交互**：
- **鼠标视差**：鼠标移动时 hero wordmark 极轻微漂移（max 8px x / 4px y，transition 0.9s ease-out），仅在进场动画完成后（约 2400ms）激活。
- **nav hover**：terracotta 下划线从 width 0 滑出到 100%。
- **scroll cue**：周期性上下浮动。
- **Work item hover**：整行 `transform: translateX(12px)` 右移 + 箭头变 terracotta 并 translateX(8px)。**注意：必须用 transform，不能用 padding（见踩坑记录 #15）。**

### 2.5 视觉参考（对标网站）

| 网站 | 学什么 |
|---|---|
| **OHM**（godly.website） | 巨大 wordmark + 句号 + 编辑感 annotation + 滚动叙事；"少即是多"的高级感 |
| **Compound Planning** | 衬线大标题的克制优雅 |
| **Custo** | 大 wordmark + 极少图的节奏感 |
| **Bryn Taylor** | 暖色基调 + 柔和点缀 + editorial 列表 |
| **First+Foremost** | "敢于只用一个 accent color"这件事本身 |
| **Anthropic / Claude 官网** | 整体舒服的纯色、字体对比制造层次、Research 文章页的单栏 editorial 排版（作品详情页参考） |

---

## 3. 技术栈与基础设施

| 项 | 内容 |
|---|---|
| **Framework** | Next.js 14（App Router）+ TypeScript + ESLint |
| **内容系统** | `@next/mdx` —— 详情页用 MDX 写，`app/works/[slug]/page.tsx` 动态路由 + SSG 预渲染（Day 3 新增） |
| **图像处理** | `sharp` —— 真图批量压缩（quality ~85，目标 ≤500KB）；WorkImage 用原生 `<img>`（Day 3 新增） |
| **Styling** | Tailwind CSS + CSS variables（双轨 token：CSS vars 在 globals.css，Tailwind colors 在 tailwind.config.ts，命名与 brief 一致） |
| **字体加载** | Google Fonts CDN `<link>` 标签（见附录 B） |
| **部署** | Vercel（连接 GitHub，push 到 main 自动部署；feature 分支自动生成 preview URL） |
| **代码仓库** | GitHub：`https://github.com/s1mple4869/hc-lai-site`（公开） |
| **Git 认证** | **SSH key**（已配置，不再用 PAT；以后 `git push` 直接推） |
| **域名** | `hclai.studio`（Namecheap 注册，$12.98/yr，DNS 指向 Vercel） |
| **邮箱** | `hello@hclai.studio` → 转发到 QQ 邮箱（Namecheap 自带转发功能） |
| **响应式断点** | 768px |
| **本地图片源** | `hc-lai-site/网站用图/`（源头，上传后托管在 Vercel，与本机开关机无关——见 #22） |

**当前文件结构（MVP 后）**：

```
app/
├── fonts/                          # 本地备用（当前主用 CDN）
│   ├── GeistVF.woff / GeistMonoVF.woff
│   └── InstrumentSerif-Regular/Italic.woff2
├── components/
│   ├── Hero.tsx                    # client component（鼠标视差）
│   ├── About.tsx                   # server component
│   ├── Work.tsx                    # Work 目录（4 行待扩，当前 3 行）
│   ├── Contact.tsx
│   └── mdx/                        # Day 3 新增：详情页 MDX 组件
│       ├── MDXComponents.tsx       # 组件注册表
│       ├── ProjectHeader.tsx       # 详情页 H1 + category + year
│       ├── WorkImage.tsx           # 图片 + caption + Lightbox（'use client'，见附录 E）
│       └── CaseExpandable.tsx      # 折叠 case 卡（原生 details/summary，SSR 直出，见附录 E）
├── works/
│   └── [slug]/page.tsx             # Day 3 新增：动态路由，SSG 预渲染
├── globals.css                     # CSS tokens + keyframes + .nav-link + .prose-works + 数字 @font-face
├── layout.tsx                      # 字体加载（CDN link）
└── page.tsx                        # <Hero /> + <About /> + <Work /> + <Contact />
content/works/                      # Day 3 新增：三篇 case study MDX 源稿（见附录 D）
├── nanobanana.mdx                  # 02
├── job-decision.mdx                # 03
└── ai-workflow.mdx                 # 01
public/works/                       # Day 3 新增：真图（sharp 压缩后）
├── nanobanana/   (workflow-ui / mvp-demo / round2-anchor / case-04a / case-04b .png)
└── job-decision/ (decision-card / csv-log .png)
tailwind.config.ts                  # 双轨 token
```

**域名购买注意（Namecheap 销售套路过滤）**：
- ✅ 要：Domain Privacy（WhoisGuard，免费）、Auto-renew
- ❌ 不要：PremiumDNS、SSL（Vercel 自带）、VPN/Email/Hosting
- 注册年限 1 年即可；付款后**必须验证邮箱**（否则 15 天内域名冻结）。
- `hclai.com` 已于 2004 年被注册占用，故选 `.studio`（主理人否决 `.design`，理由："design 又把自己跟设计捆绑了"，`.studio` 更广义）。

---

## 4. 建站进展时间线

> 整个项目在同一个对话线程内推进，跨越数日，截止 2026-05-17。以下按逻辑阶段划分。

### 阶段 0 — 设计探索与方向锁定（在 chat 内用 HTML artifact）

1. 讨论网站定位（给谁看、主轴、对标策略、Claude Code vs Claude Design 的区别）。
2. 主理人发来 5 个对标网站截图，确认 **OHM 是核心模板**，喜欢 Claude 气质。
3. 讨论 hero 三种开场（纯名字 / 名字+小字 / 名字+物件），确定走"名字为主 + 一行 annotation"。
4. 反复打磨 positioning，最终定为 `Designer of spaces and systems`。
5. 确定字体方向（Instrument Serif，类宋体的优雅衬线）。
6. **产出 v0 hero mockup（`hc-lai-hero-v0.html`）**，主理人给 90 分。
7. 根据反馈去掉 grain 噪点。
8. **产出开工 brief（`hc-lai-project-brief.md`）**。

### 阶段 1 — 项目搭建 + 上线 + 基础设施

1. 进 Claude Code，用 Next.js + Tailwind 初始化项目，hero 重构为 React 组件，`npm run build` 通过、localhost 返回 200。
2. 解决"在公司怎么看家里 localhost"的困惑 → 明确应走部署路线。
3. 推代码到 GitHub（首次用 PAT，发生 token 泄露提醒 → 后续撤销）。
4. 部署到 Vercel，网站首次上线（`hc-lai-site.vercel.app`）。
5. **产出 Day 2 brief（`hc-lai-day2-brief.md`）**：about 文案更新 + Contact section + 自定义域名。
6. 一天内完成：域名 `hclai.studio` DNS 配置上线、`hello@hclai.studio` 邮件转发到 QQ、About 真实文案、Contact section、Noto Serif SC 中文衬线加载、**配置 GitHub SSH key（以后免 PAT）**。

### 阶段 2 — About 文案与中文排版精修

1. 修复中文字体 fallback（中文从系统字体切到 Noto Serif SC）。
2. 反复打磨 about 中文文案"味道"——从四段密集中文精炼到三句话。
3. 加 `— A note about myself.` 的 editorial 注脚，找回"序言感"。
4. 调整右侧文字垂直居中对齐、字号 17px、行距 1.75、段落间距 32px。
5. 期间解决了"Claude Code 突然说英文""npm run dev 怎么跑""代码改了网页没变（缺 git push）"等流程困惑。

### 阶段 3 — Work 目录页（重点阶段）

1. 主理人发来 Notion 作品集截图（3 个作品），确认策略：**不嵌入 Notion，自己做图文页**。
2. 确认顺序为 `Hero → About → Work → Contact`。
3. **产出 Work section 预览（`work-section-preview.html`）** 和 **字体方向 A/B/C 对比（`work-title-comparison.html`）**。
4. 主理人选定 Variant C（英文为主）。
5. **产出 Day 3 brief（`hc-lai-day3-brief.md`）**：Work 目录 + MDX 路由系统 + Nanobanana 详情页。
6. Claude Code 完成任务 1（Work 目录）。
7. **经历一场漫长的"字体粗细之战"**（详见踩坑记录 #14），最终定位到两个根因（字体没加载 + antialiased）并彻底修复。
8. 修复 hover 跳行问题。
9. 年份从 2025 改为 2026；中文引号改用「」。
10. **git push，Vercel 线上字体验证完全正确，任务 1 圆满完成。**

**阶段 A 末现状（v1.5，2026-05-17）**：Hero / About / Work 目录 / Contact 四大区块全部上线，桌面 + 移动端均验证通过。Work 详情页（MDX 系统 + 三篇内容）尚未开始，换新对话继续 → 即下方阶段 4。

### 阶段 4 — Day 3：MVP 完成（MDX 路由 + 三篇详情页 + 真图，2026-05-29）

> 角色微调：本阶段主理人明确把姐姐定位为**第三方监督 + 教练**——Claude Code 写代码，姐姐审查方案、教主理人怎么对 Claude Code 下指令、把技术术语翻译成人话。姐姐不直接写实现代码。

1. **任务 2 — MDX 路由系统**：装 `@next/mdx`，建 `app/works/[slug]/page.tsx` 动态路由 + `content/works/*.mdx`，SSG 预渲染。组件目录 `components/mdx/`（MDXComponents / ProjectHeader / WorkImage / CaseExpandable）。
2. **★ 第二次字体战（"发虚"，10+ 轮）** —— 详见踩坑记录 #17。从「想要 Anthropic 那种力量感」出发，经历 antialiased 反转、全 sans 弯路、Geist-fallback-Times 美丽意外的识破，最终定为「Instrument Serif H1 + Geist Sans Bold H2 + Georgia 英文正文 + Noto Serif SC 中文正文」。
3. **iPhone 关键发现** —— 主理人发现 mac 端「发虚」在 iPhone 上完全不存在，锁定根因为 macOS subpixel 渲染特征而非 CSS bug（#19）。字体优化就此 close，列为可选 v2 迭代。
4. **02 Nanobanana 详情页定稿** —— 7 节内容 + 5 张图（placeholder 先行），7 处文案错字修复，代码块去 jsx 标签。
5. **03 Job Decision 详情页** —— 姐姐整理完整 MDX（附录 D），文案 sanity（中文先英文后 / 全角标点 / 错字修复）。
6. **★ 数字对齐之战** —— 详见 #18。主理人发现「108」的 1/0/8 顶端不齐，最终用 `@font-face` + `unicode-range` + `size-adjust: 95%` 把数字字符单独映射到 Geist Mono 解决。
7. **加粗节制原则确立** —— 正文只在关键数字 + 结构性 label 加粗，全文加粗 < 8–12 处（#20）。
8. **CaseExpandable 组件** —— 原生 `<details>/<summary>`、SSR 直出、无 `'use client'`（附录 E）。
9. **01 AI Workflow 详情页** —— 8 个 Notion 子页压成单页长文，7 个 H2，4 个场景用 CaseExpandable 折叠（附录 D）。
10. **版权处理** —— 主理人主动提出 02 效果图用了公司 SU 白模的 IP 风险。姐姐分析职务作品 work-for-hire 链条（#21）。**主理人用知末网干净白模半小时重跑了 A/B test**，IP 干净。
11. **真图上传 + sharp 压缩** —— 7 张图从「网站用图」移到 `public/works/`，`.jpg→.png`，去掉 placeholder prop（#22）。
12. **WorkImage 升级 Lightbox** —— 主理人发现手机端图字太小、且无法点开。加全屏 Lightbox（点击放大 / pinch-zoom / ESC 关闭 / 锁定 body scroll，附录 E）。
13. **分支部署流程跑通** —— `feature/xxx` → Vercel preview URL → 验收 → merge main。03、01、真图各走一个分支（PR #3 = 真图 + Lightbox）。

**MVP 完成现状（v2.0，2026-05-29）**：三篇 case study（01/02/03）+ 7 张真图 + Lightbox 全部上线 hclai.studio，桌面 + 移动端验证通过。**网站可正式发给招聘官、写进简历。**

---

## 5. 内容定稿

### 5.1 Hero

- Wordmark：`H.C. Lai.`（terracotta 句号）
- 左上 annotation：`— Designer of spaces and systems.`
- 右上 nav：`work · about · contact`（lowercase Geist Mono）
- 右下角小标：`HCL · 2026` + 圆圈 monogram `HCL`（占位，待重设计）
- 底部居中：`SCROLL ↓`

### 5.2 About（section 编号 `001 — ABOUT`）

**左侧大标题（英文，Instrument Serif，含 italic）**：
```
Trained in architecture.
Curious about everything else.
```
（`architecture` 与 `everything else` 为 italic）

**右侧（中文，垂直居中，带 editorial 注脚）**：
```
— A note about myself.

我是赖兴菁（H.C. Lai）。

关注空间、系统与人的关系。

在寻找更自然的人机协作方式。
```
- `— A note about myself.` 用 Instrument Serif Italic，ink-muted。
- `H.C. Lai` 几个字符用 Instrument Serif；其余中文用 Noto Serif SC。
- **定稿说明**：第二句最终用「关注」（保留原版），非备选的「研究」。这是从原本更长的四段文案精炼而来——砍掉了"从建筑到 AI，我一直在做同一件事…"和"最近在尝试半自动化工作流"等句，核心心法是 **editorial 的精髓是「字少、意丰」，不解释转行**。三句话结构 = 身份 / 视角 / 方向（过去-现在-未来）。

### 5.3 Work 目录（section 编号 `002 — WORK`）

三个作品，editorial 列表（编号 + 英文标题 + 中文副标题 + 描述 + meta tags + 箭头）：

**01 — AI Workflow & Enablement Portfolio**
- 中文副标题：AI 工作流与运营支持原型
- 描述：一个工作流组合，展示如何将零散的项目输入转化为结构化、可追溯且可重复使用的输出。
- meta：AI Workflow · Structured · 2026
- 链接：`/works/ai-workflow`（待做）

**02 — Semi-agentic Architectural Image Iteration**
- 中文副标题：Nanobanana 半自动建筑工作流
- 描述：围绕建筑效果图多轮生成场景搭建的半自动工作流原型，用于串联白模输入、prompt 装配、图像生成与 round/state 状态管理。
- meta：AIGC · Architecture · 2026
- 链接：`/works/nanobanana`（**第一篇要做的详情页**）

**03 — Semi-automated Job Decision Workflow**
- 中文副标题：AI 求职决策助手
- 描述：基于真实 job search 痛点搭建的半自动决策工作流，用 Claude API 解析 JD、把岗位信息差异化呈现为结构化的「投递决策卡」。
- meta：AI Workflow · Ops Tooling · 2026
- 链接：`/works/job-decision`（待做）

### 5.4 Contact（section 编号 `003 — CONTACT`）

- 左侧大标题：`Let's talk.`（terracotta 句号，Instrument Serif）
- 右侧：
  ```
  — Email is the best way to reach me.

  hello@hclai.studio

  Cold emails welcome. Replies guaranteed if I can.
  ```
- 决策说明：**只留邮箱，不放微信**——邮箱是唯一筛选机制，能写邮件来的人本身就认真；公开微信易被陌生人骚扰。

### 5.5 三个作品详情页（✅ 全部上线 · 完整 MDX 见附录 D）

> 内容形态完全没改——主理人 Notion 里早已是"作品 + 思考"模式（每篇都有"为什么做""方法论验证""反思与边界"）。详情页参考 Anthropic Research 文章页风格：单栏窄宽度、章节 H2、图片居中带 caption、中英杂糅保留（中文先 → 英文后）。三篇共用同一套 MDX 模板与 `.prose-works` 字体规则。

**01 · AI Workflow & Enablement Portfolio**（纯文字，无图，最复杂）
- slug `ai-workflow`；category `AI Workflow · Structured Output · Project Communication`。
- 8 个 Notion 子页 → **7 个 H2**：① 项目概述 ② 为什么做（5 种反复出现的问题）③ 工作流怎么设计（输出 schema A–E + 治理原则 + 字段规范细则）④ 场景验证（**4 个 case 用 `<CaseExpandable>` 折叠**）⑤ 治理与边界（5 种 failure modes + 敏感数据最小化）⑥ 可教学可复用（5 步上手 + 一句话教学脚本）⑦ 反思与下一步。
- 4 个折叠 case：Client Change（甲方变更）/ Leadership Request（领导汇报）/ Mini Case 01 Internal Notes（内部备忘录）/ Mini Case 02 Requirement Intake（需求收集）。默认显示 Scenario + Why it matters + What it proves，点击展开看完整 Input / Output（A–E 五块）。
- 加粗节制：全文 < 8 处，只在概念定位句；P0/P1/Source Quote 作 inline label 不加粗。

**02 · Nanobanana 半自动建筑工作流**（文字 + 5 图，第一篇做的模板）
- slug `nanobanana`；中文副标题「Nanobanana 半自动建筑工作流」。
- 7 节：① 项目概述 ② 为什么做（建筑 AI 出图每轮重复组织白模 / 参考图 / prompt 的痛点）③ 工作流设计（Stage1 白模锁几何 → Stage2 反馈推送 → Round/State 管理）④ 我做了什么（需求拆解 / 两阶段策略 / 结构化 keep-fix-avoid feedback / Streamlit 工作台 MVP / 方法论验证）⑤ MVP 展示 ⑥ 方法论验证 case_04a 保守版 vs case_04b 推进版 ⑦ 反思与边界。
- **5 张图 caption**：`workflow-ui`「Nanobanana 建筑生图工作台」/ `mvp-demo`「界面支持当前项目状态、最新输出预览、前后短对比、历史轮次回看与本地路径提示」/ `round2-anchor`「Round 2 Anchor」/ `case-04a`「case_04a 保守版结果」/ `case-04b`「case_04b 推进版结果」。
- **IP 处理**：原效果图用公司项目 SU 白模跑的，已换知末网干净白模重跑 A/B test（见 #21）。

**03 · AI 求职决策助手**（文字 + 2 截图）
- slug `job-decision`；中文副标题「AI 求职决策助手 · 半自动化 JD 匹配工作流」。
- 7 节：① 项目概述（**108 个岗位**，单岗位决策 5 分钟 → 30 秒）② 为什么做（同名异向 / 重复决策成本 / 转行简历被秒拒）③ 工作流设计（五维度判断 → 版本匹配 → 决策卡 10 字段 → 本地双轨留存）④ 技术路径选择（路径 1 BOSS CLI 自动化触发风控 STOP / 路径 2 油猴浮窗注入遇反 DevTools / 路径 3 命令行半自动 = 当前主流程；takeaway「不是选最先进的，是选最匹配真实约束的」）⑤ MVP 展示 ⑥ 方法论验证 ⑦ 反思与边界（半自动是对人类判断权的有意保留）。
- **2 张图**：`decision-card`（CLI 决策卡）/ `csv-log`（CSV 台账节选 20 行）。均为主理人自己工具的输出，IP 干净。

### 5.6 详情页新组件（代码 / spec 见附录 E）

- **`CaseExpandable`** —— 折叠 case 卡。**无 `'use client'`**，用原生 `<details>/<summary>`，SSR 直出、无 JS 也能展开。Tailwind `group-open:hidden` / `group-open:inline` 切换「↓ READ FULL CASE / ↑ COLLAPSE」标签。Props：`title` / `scenario` / `whyItMatters` / `whatItProves[]` / `defaultOpen` / `children`。
- **`WorkImage`（含 Lightbox）** —— `'use client'` + `useState`。默认渲染 figure + img + caption；点击图片全屏覆盖 `bg-black/85 backdrop-blur`，移动端原生 pinch-zoom，ESC / 点空白 / × 按钮关闭，打开时锁定 body scroll，`placeholder` 模式不可点击。
- **`ProjectHeader`** —— 详情页 H1 + category tag（mono uppercase）+ year。

---

## 6. 设计决策与踩坑记录

> 这是本存档最有价值的部分——记录所有走过的弯路，避免未来重复踩坑。

1. **grain 噪点**：v0 加了纸张噪点 texture，主理人觉得"脏"。→ 彻底移除，改纯色背景（对标 Claude 官网）。

2. **annotation 双字体**：曾被质疑是否"刻意"，确认为 editorial dual typography 的高级手法。→ 保留（italic serif 灰色 + sans 深色）。

3. **中文字体 fallback**：Instrument Serif 是纯英文字体，**中文会 fallback 到系统字体（Mac 苹方 / Win 微软雅黑）**，且不稳定跨平台。→ 加载 Noto Serif SC（中文正文衬线）+ Noto Sans SC（中文标题无衬线）。

4. **"placeholder 味道"的错觉**：主理人怀念早期 placeholder 文案的"艺术字感"。诊断后发现：那种气质来自 **"英文为主 + 中文为辅"的版式语言 + 教学批注口吻的文体**，**不是字体**。中文连续段落不可能像英文那样飘逸（汉字方块、笔画密、视觉重量大）。→ 解决方式是精炼文案 + 加 editorial 注脚 + 调字号行距，而非换字体。

5. **中文段落视觉密度**：同上。→ 行距加到 1.75、段落间距 32px、字号 17px。

6. **右侧文字垂直对齐**：右侧短文字顶端对齐导致"飘在上面"，与左侧大标题视觉重心不对齐。→ `align-items: center` + padding 微调。

7. **Claude Code 突然说英文**：不是 bug，是它的"工程师母语模式"（代码/技术语境默认英文）。→ 可在指令末尾要求中文，或建 `CLAUDE.md` 写沟通偏好。**结论：技术执行时让它说英文反而更精准，大决策时要求中文。**

8. **localhost vs 部署**：**代码改了 ≠ 线上更新**，中间差一个 `git push`。localhost 只有本机能看（`npm run dev` 起本地服务器）。

9. **PAT（GitHub token）泄露**：token 出现在对话里**必须立即撤销**（从任何浏览器即可，不用等回家）。→ 最终配 SSH key 一劳永逸。

10. **deployment_not_found**：代码推到 GitHub ≠ 网站可访问（GitHub 只存代码，没人运行它）。→ 需 Vercel 部署。

11. **中文标题字体方向 A/B/C**：Variant A（中文 sans）有"微软雅黑感"（Noto Sans SC 视觉个性被磨平，类似微软雅黑的"实用至上"路线）。→ 选 Variant C（英文为主）。

12. **「」引号**：JS 字符串里中文直角引号 `"..."` 触发 syntax error。→ 改用「」东亚书名号，**反而更符合中文排版规范**（正经中文出版物从不用 ASCII 双引号）。

13. **年份 2025 vs 2026**：作品是 2026 年 3 月后做的。→ 改为 2026（关乎新鲜度感知 + 真实性，避免被 GitHub commit 历史反查出时间不符）。

14. **★ 字体粗细之战（最关键、最漫长的踩坑）**：
    - **现象**：Work section 英文标题比 HTML 预览版"细"、"像被垂直拉长"。
    - **错误尝试 1**：以为是字号问题，从 38px 加到 44px。❌ 字大了但还是不对（实际预览版本就是 38px）。
    - **错误尝试 2**：以为要改 italic。❌ italic 弯钩装饰感太强，字体"变了"。
    - **错误尝试 3**：怀疑 localFont 与 CDN 字体文件版本不一致。（部分成立，但非主因。）
    - **DevTools 定位根因 1**：Work 标题的 `font-family` 实际是 `var(--font-geist)`——**根本没用上 Instrument Serif！** 它 fallback 到了 Noto Serif SC 里的英文字形（中文衬线字体含基础英文字形），所以"看着像衬线但很细"。→ 修复：显式指定 `font-family: 'Instrument Serif' !important`。
    - **DevTools 定位根因 2（最终）**：`-webkit-font-smoothing: antialiased` 让笔画显得更细。HTML 参考版没设这个，用 macOS 默认 subpixel 渲染，笔画更实、更有重量。→ 修复：给 Work 标题单独把 font-smoothing 覆盖回 `auto`（不动全局 Hero/About）。
    - **核心教训**：**当主理人说"不对"，第一反应应是查源码 / DevTools / 字体文件，而不是靠经验推理，更不能劝"差不多了"。主理人的眼睛比任何推理都可靠。** 整页字体根基差点带着一个 fallback bug 上线，是靠主理人坚持 10+ 个回合的"还是不对"才被揪出来的。

15. **hover 跳行**：hover 时 `padding-left: 12px` 改变内容区宽度，导致长描述（03）换行"跳一下"。→ 改用 `transform: translateX(12px)`（transform 不触发 layout reflow）。

16. **字体加载方式定案**：`next/font/google` 在该 Mac 的 dev/build 网络下可能拿不到字体（fonts.gstatic.com 连接被 reset）；`localFont` 的本地 `.woff2` 文件版本与 CDN 不一致。→ **最终统一用 layout `<head>` 里的 Google Fonts CDN `<link>` 标签**，dev 与 production 全平台一致（见附录 B）。

---

> 以下 #17–#23 为 **Day 3（MVP 阶段）** 的踩坑与决策。

17. **★★ 第二次字体战（"发虚"，最漫长，10+ 轮）**：
    - **现象**：详情页中文正文"发虚 / 费眼睛"，主理人想要 Anthropic 文章页那种"清晰有力、字实"的感觉。
    - **错误尝试 1**：以为 brief 跟 Anthropic 一致，但 **brief 本身矛盾**——指定 Instrument Serif 衬线标题，却参考 Anthropic 的无衬线粗体正文。
    - **错误尝试 2（姐姐反向误判）**：建议加 `-webkit-font-smoothing: antialiased`。❌ **在 macOS 上 antialiased 反而让字变细更虚**（极反直觉，很多前端老兵也搞错）；`subpixel-antialiased` / `auto` 才更实。→ 关掉 antialiased，略好仍虚。
    - **错误尝试 3**：改全 sans（Noto Sans SC）。✓ 解决发虚，但主理人："跟我主页 editorial 语言不统一了。" → 姐姐承认把人往不属于她的方向带偏。
    - **错误尝试 4**：回归 brief 原始（中文 Noto Serif SC 衬线 + 英文 Geist）→ 中文仍轻飘。升 weight 600 → **synthetic bold 糊边**（CDN 没加载 600 字重，浏览器算法合成加粗）。
    - **修复 synthetic bold**：CDN 加载范围 `Noto Serif SC:wght@400;500` → `400;500;600;700`，拿到真正的 600 字重，边缘锐利。
    - **错误尝试 5**：引入英文衬线 Source Serif 4（中英都衬线）→ 主理人："x-height 太高，字变扁了。"
    - **★ 关键洞察**：主理人真正喜欢的"图一英文衬线"其实是 **Geist 加载失败、fallback 到系统 Times 的美丽意外**——不是 brief 设计的任何字体。
    - **最终方案**：英文正文 fallback 到 **Georgia**（系统衬线，Matthew Carter 为屏幕设计，免费，渲染锐利），中文 Noto Serif SC，H2 用 **Geist Sans Bold**。三个字体角色清晰分工：H1 Instrument Serif 撑装饰、H2 sans bold 撑结构、正文中英衬线撑阅读。
    - **核心教训**：① 字体类型（serif vs sans）是**设计语言层面**的决定，定了别轻易换；② "发虚"先调 weight / size / line-height / smoothing，**不换字体**；③ 锚定原始 brief 比追逐外部标杆更重要，姐姐前 9 轮反复在错方向上燃烧，根因是没先回到"主理人自己的主页"这把标尺。

18. **★★ 数字对齐之战（"108"顶端不齐）**：
    - **现象**：正文里数字「108」的 1 / 0 / 8 顶端不在一条线，「30–50」「5 分钟」等也高低错落。
    - **根因**：Georgia 默认是 **oldstyle figures**（旧式数字，有升降部 overshoot），不是 lining figures（等高数字）。
    - **错误尝试 1**：`font-variant-numeric: lining-nums tabular-nums`。❌ 系统 Georgia **不带 lnum / tnum OpenType table**，不生效（这是事前预估 30% 会落空的情况，落空了）。
    - **错误尝试 2**：只给 `.prose-works li strong` 套 Geist Mono + `font-size: 0.95em`。❌ 只覆盖了 list 里**加粗的**数字；非加粗数字（30–50）仍是 Georgia 不齐；且 `<strong>` 里混的中文「秒 / 岗位」也被 Geist Mono 字号补偿带歪。
    - **★ 最终方案（一招打掉三个 bug）**：用 `@font-face` 的 `unicode-range` 把**数字字符**单独映射到 Geist Mono，挂在整个 `.prose-works` 容器上：
      ```css
      @font-face {
        font-family: 'NumDigitsOnly';
        src: local('Geist Mono'), local('GeistMono');
        unicode-range: U+0030-0039, U+002D, U+002F, U+002C, U+002E, U+0025;  /* 0-9 - / , . % */
        font-feature-settings: "tnum" 1, "lnum" 1;
        size-adjust: 95%;   /* 关键：只缩当前 face 渲染的字符，不影响 fallback 字符 */
      }
      .prose-works { font-family: 'NumDigitsOnly', Georgia, 'Noto Serif SC', serif; }
      ```
    - **为什么成立**：数字字符匹配 `NumDigitsOnly` → 走 Geist Mono 等高等宽 + 自动缩 95%；中文不在 unicode-range 内 → fallback 到 Noto Serif SC 正常字号；英文 → fallback 到 Georgia 正常字号。
    - **核心技术点**：`size-adjust` 放在 `@font-face` 层（而非 `font-size`），才能做到"只补偿数字字号、不影响中英文字符"。

19. **★ macOS 渲染真相 / iPhone 是基准（字体战的收束认知）**：mac 端中文衬线"发虚"是 **macOS subpixel antialiasing 对开源中文衬线细笔画的过度磨平**，是物理特征不是 CSS bug。**iPhone（iOS Safari + retina 高密度屏）上完全不发虚、很舒服**。真实访客多用手机，看到的视觉大概率比主理人 mac 上更好。→ 字体优化 close，列为可选 v2（备选：昭源宋体 Chiron Sung HK，OFL 免费可商用，比 Noto Serif SC 锐利一档，GitHub `chiron-fonts`）。**协议沉淀：主理人说"不对"先信，先查 DevTools Computed font-family / Network 字体请求，再动 CSS。**

20. **加粗节制原则**：Claude Code 初版正文加粗过多（01 篇曾 40+ 处），"奇怪、不统一"。→ 原则确立：**正文只在「关键数字 + 结果」和「结构性 label」加粗**，全文 < 8–12 处。inline label（P0 / Source Quote 等）不额外加粗。03 是节制范本，01 据此从 40+ 压到与 03 同频。

21. **★ 版权 / 职务作品 work-for-hire（主理人主动提出）**：02 原效果图用了公司项目的 SU 白模跑的。**真正风险不在 AI 生成图本身，而在两处**：① 底层 SU 白模——中国《著作权法》下，在职期间利用公司资源为公司项目做的建筑 / 工程设计图属**特殊职务作品，著作权通常归公司**，个人多只保留署名权；AI 生成图是**衍生作品**，版权链往上追溯仍连着公司白模。② 项目是否已公开 / 保密义务——公开个人网站 + 求职用途 ≠ 私密 Notion，风险等级不同。**关键洞察：重新跑图但白模仍是公司的，版权问题依旧——必须连白模一起换。** → 主理人用知末网下载的干净白模半小时重跑 case_04a/b 的 A/B test。（提醒：第三方模型若有商用限制留心，可图注标注"白模为第三方素材，仅作工作流演示输入"。case 价值在 workflow 本身，不在那张具体效果图，换白模零损失。）

22. **真图托管机制（关机会不会消失）**：本地 `网站用图/` 文件夹只是**源头**；图片经 `git commit → push → Vercel 部署` 后被复制托管到 Vercel 服务器 + CDN。**关机 / 删本地 / 断网都不影响线上**。另：图片必须放 `public/` 下才可对外访问（主理人误放在 `hc-lai-site/网站用图/`，Next.js 访问不到，由 Claude Code 移到 `public/works/`）。真图全 `.png` 而 MDX 写的 `.jpg` → 让 Claude Code 改扩展名 + 去掉 `placeholder` prop + sharp 压缩（quality 85，1MB+ 的几张压到 ≤500KB）。

23. **Lightbox（手机端图字太小）**：真图上线后主理人发现手机端 csv-log / 工作台界面截图字太小看不清细节，且无法点开放大。→ WorkImage 升级 `'use client'` + Lightbox：点击全屏 `bg-black/85 backdrop-blur`、移动端原生 pinch-zoom、ESC / 点空白 / × 关闭、锁定 body scroll、`placeholder` 不可点击。**判断标准**：这不是"无限优化"，是访客体验硬伤——portfolio 相当比例访客用手机随手刷，看不清就划走，不会回家用电脑看（与字体那种边际收益递减的细节性质不同）。

---

## 7. 待办 / 下一步（MVP 完成后的 handoff 清单）

> ✅ **已完成**：MDX 路由系统、三篇 case study（01/02/03）、7 张真图、Lightbox、第二次字体战、数字对齐、版权处理、分支部署流程。MVP 完整上线。

**待优化（按优先级，主理人自排）**：

- [ ] **① 新增第 4 个 work：跨平台 RAG 实践 — 建筑防火规范智能问答助手（COZE + DIFY + LANGCHAIN）**。内容已在**另一个对话**中完成，需补进 Work 栏。做法同 03 复用模板：Work.tsx 列表加第 04 行，新建 `content/works/[slug].mdx`。⚠️ Work 列表从 3 → 4，顺便检查首页 grid 间距与编号。**内容价值最高、执行成本最低（写作已完成），建议优先。**
- [ ] **② 顶部 nav 字体偏小**。当前 nav「work / about / contact」用 Geist Mono，字号偏小。待调字号 / 字距，在不破坏 editorial 克制感的前提下提升可读性。
- [ ] **③ 字体优化（可选，锦上添花）**。mac 端中文衬线发虚（已确认是 macOS 渲染特征，iPhone 端正常）。想动的话：正文中文试换 **昭源宋体 Chiron Sung HK**（OFL 免费可商用，比 Noto Serif SC 锐利一档，GitHub `chiron-fonts`）；或思源宋体 Heavy（同字体榨更高字重）。fork 一个分支一小时能看出效果。**非必要，不影响当前 MVP 质量。**
- [ ] **④ HCL Logo / Monogram 重新设计**。当前是文字 logo（圆圈 `HCL` 占位）。需开放式讨论后再执行。备选方向：建筑制图符号系（北箭头 ◬ / 剖切符号 / 轴线编号）/ 字母变形系（H·C·L 错位、HCL 叠合）/ 几何抽象系（L 形 / 半圆）/ 图章戳记系。

**更后续（慢慢养）**：
- [ ] **SEO + Open Graph**（链接分享时自动有预览卡片）。
- [ ] 02 / 03 的备用素材 `su.jpg`（白模）、`操作界面截图2.png` 暂未用，01/03 后续如想加图可取用。
- [ ] 可选：思考随笔 / blog section、暗色模式、PWA / 移动端深度优化。

**给新对话的一句话上手**：
> "我的 portfolio hclai.studio 已完成 MVP（三篇 case + 真图 + Lightbox），现在要做 [①/②/③/④ 之一]。技术栈 Next.js 14 + MDX + Tailwind + CSS variables，字体系统是 Instrument Serif（H1）+ Geist Sans Bold（H2）+ Georgia + Noto Serif SC（正文）+ Geist Mono（数字）。设计语言 editorial studio 范，克制。先看项目知识库里的 archive。"

---

## 8. 协作方式

**角色分工**：
- **主理人（赖兴菁）**：最终审美决策者、需求方、视觉质量把关人。
- **Claude（chat，"姐姐"）**：策略顾问 + 质量审查 + 概念解释 + 输出 ready-to-paste 给 Claude Code 的 brief / 指令。**不是主要建造者。**
- **Claude Code**：工程实现（写代码、跑命令、改文件、部署）。

**工作流**：
```
chat 讨论设计方向 → 姐姐写 brief / 指令 → 主理人粘贴给 Claude Code
→ Claude Code 落地 → 主理人本地 npm run dev 预览 → 截图发姐姐审查
→ 确认 OK → git push → Vercel 自动部署 → 线上验证
```

**核心原则**：
1. **无条件信任主理人的视觉判断**。主理人有强烈且可靠的视觉直觉，多次"说不出原因但就是觉得不对"的判断后被证明完全正确（字体粗细之战是典型）。当主理人说"不对"，立即相信，**先查 DevTools / 源码 / 字体文件，不要劝"差不多了"、不要靠经验推理**。
2. **诊断先于方案**。先把根因讲清楚（往往用类比，如"装修房子"解释建站流程），再给解决方案。
3. **给 Claude Code 的 prompt 必须 ready-to-paste**，规格尽量精确（颜色值、字体名、字号、CSS 属性），避免歧义导致返工。
4. **截图迭代**。视觉问题靠主理人截图，比纯文字描述高效十倍；姐姐负责把 Claude Code 的技术术语"翻译"成主理人能懂的话。
5. **语气**：温柔知性、姐姐框架（warm、mentorship-inflected）；中文交流。
6. **节奏 > 速度**。慢慢养网站才有品牌感，不追求一晚做完；每个大功能可独立成一次工作 / 一次新对话。

**git 工作流**：feature branch → Vercel preview deployment → merge to main（auto-deploy）。

---

## 附录 A · 设计 Token 速查表

```css
/* 颜色 */
--cream:        #F2EFE9;
--cream-warm:   #EEEAE0;
--ink:          #1C1B17;
--ink-muted:    #6B6862;
--terracotta:   #B85C38;
--line:         rgba(28, 27, 23, 0.12);

/* 字体（CSS 变量命名 · 主要用于首页 Hero/About/Work/Contact） */
--serif:        'Instrument Serif', serif;       /* 英文衬线 */
--serif-cn:     'Noto Serif SC', serif;          /* 中文衬线（正文） */
--sans:         'Geist', system-ui, sans-serif;  /* 英文无衬线 */
--sans-cn:      'Noto Sans SC', sans-serif;      /* 中文无衬线（标题） */
--mono:         'Geist Mono', Menlo, monospace;  /* 等宽 */

/* 缓动 */
--ease-out:     cubic-bezier(0.16, 1, 0.3, 1);
```

**详情页正文字体实况（`.prose-works`，Day 3 字体战后）**：
```css
/* 数字字符单独走 Geist Mono（解决 oldstyle figures 顶端不齐） */
@font-face {
  font-family: 'NumDigitsOnly';
  src: local('Geist Mono'), local('GeistMono');
  unicode-range: U+0030-0039, U+002D, U+002F, U+002C, U+002E, U+0025;
  font-feature-settings: "tnum" 1, "lnum" 1;
  size-adjust: 95%;
}
.prose-works { font-family: 'NumDigitsOnly', Georgia, 'Noto Serif SC', serif; }
/* 英文正文 = Georgia；中文正文 = Noto Serif SC；数字 = Geist Mono 95% */
/* H2 章节标题 = Geist Sans Bold；H1 = Instrument Serif */

**关键字号**：
- Hero wordmark：`clamp(96px, 22vw, 380px)`，letter-spacing -0.04em，line-height 0.86
- Section 大标题：`clamp(44px, 5.6vw, 84px)`，letter-spacing -0.025em
- Work 英文标题：`clamp(28px, 3.4vw, 38px)`，line-height 1.1，letter-spacing -0.015em（**Regular，非 italic；font-smoothing: auto**）
- Work 中文副标题：Noto Sans SC，16px，ink-muted
- Work 描述：Noto Serif SC，15px，ink-muted，line-height 1.65
- 正文（中文）：17px，line-height 1.75–1.85
- mono 标签 / 编号：10–12px，letter-spacing 0.08–0.18em

**terracotta 仅 5 处**：hero 句号 / nav hover 下划线 / Let's talk 句号 / Work 箭头 hover / inline code 背景。

---

## 附录 B · 字体加载最终方案（重要）

**不要用** `next/font/google`（该 Mac dev/build 网络可能拿不到 fonts.gstatic.com）。
**不要用** `localFont`（本地 `.woff2` 文件版本与 CDN 不一致，渲染有差异）。
**统一用** layout `<head>` 里的 Google Fonts CDN `<link>` 标签：

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
<link
  href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Noto+Serif+SC:wght@400;500&family=Noto+Sans+SC:wght@400;500;600&family=Geist:wght@300;400;500;600&family=Geist+Mono:wght@400;500&display=swap"
  rel="stylesheet"
/>
```

**验证方法**：DevTools → Inspect 标题 → Computed → `font-family` 第一位应为 `"Instrument Serif"`（不是 Geist）；Network → Font 过滤 → 字体请求状态 200。

**font-smoothing 注意**：全局 body 上的 `-webkit-font-smoothing: antialiased` 会让衬线笔画显得偏细。Work 标题处单独覆盖回 `auto`（macOS subpixel 渲染，笔画更实）。

---

**Day 3 字体战后的最终字体系统（详情页 `.prose-works`）**：

| 层级 | 字体 | 说明 |
|---|---|---|
| H1 大标题 / 装饰 | Instrument Serif | 撑住"装饰 / 识别"层 |
| H2 章节标题 | **Geist Sans Bold** | 撑住"结构"层（Day 3 新角色） |
| 正文英文 | **Georgia** | 系统衬线，屏幕渲染锐利、免费（取代 brief 原定 Geist sans） |
| 正文中文 | Noto Serif SC（400/500/600/700） | CDN 加载范围从 `400;500` 扩到 `400;500;600;700`，解决 synthetic bold 糊边 |
| 数字字符 | Geist Mono（`size-adjust: 95%`） | 见下方 @font-face |

**数字对齐 @font-face（核心方案）**——把数字字符单独映射到 Geist Mono，解决 Georgia oldstyle figures 顶端不齐：
```css
@font-face {
  font-family: 'NumDigitsOnly';
  src: local('Geist Mono'), local('GeistMono');
  unicode-range: U+0030-0039, U+002D, U+002F, U+002C, U+002E, U+0025;  /* 0-9 - / , . % */
  font-feature-settings: "tnum" 1, "lnum" 1;
  size-adjust: 95%;     /* 关键：只缩当前 face 字符，中英文 fallback 字符不受影响 */
}
.prose-works {
  font-family: 'NumDigitsOnly', Georgia, 'Noto Serif SC', serif;
}
```
> 失败的前置方案：`font-variant-numeric: lining-nums tabular-nums` —— 系统 Georgia 不带 lnum/tnum OpenType table，不生效。`@font-face` + `unicode-range` 是可靠解法。`size-adjust` 必须放 @font-face 层（而非 font-size），才能只补偿数字字号。

**★ macOS / iPhone 渲染真相**：mac 端中文衬线"发虚"是 macOS subpixel antialiasing 对开源中文衬线细笔画的过度磨平，**是物理特征不是 CSS bug**。**iPhone（iOS Safari + retina）上完全正常**，是真实访客的主要体验、也是验收基准。继续在 mac 端磨 antialiased/字重/行距边际收益趋零。**协议：主理人说"不对"先信，先查 DevTools Computed `font-family` + Network 字体请求（看是否 fallback、状态是否 200），再动 CSS——不靠经验推理下结论。**

**可选 v2 字体**：昭源宋体 Chiron Sung HK（OFL 免费可商用，比 Noto Serif SC 锐利一档，GitHub `chiron-fonts/chiron-sung-hk`）；或思源宋体 Heavy。**慎用字加 zi.cn / 方正 / 汉仪等**——portfolio 算商用，需购买授权，字库维权主动。免费可商用只认 OFL / GPL / Apache 2.0。

---

## 附录 C · 关键文件清单（产出的 brief / mockup）

| 文件 | 用途 |
|---|---|
| `hc-lai-hero-v0.html` | 阶段 0 的 hero 设计 mockup（90 分初稿） |
| `hc-lai-project-brief.md` | 开工 brief（设计语言 + 技术规格 + Day 1 步骤） |
| `hc-lai-day2-brief.md` | Day 2 brief（about 文案 + Contact + 域名） |
| `work-section-preview.html` | Work 目录视觉预览（视觉对齐基准） |
| `work-title-comparison.html` | 作品标题字体 A/B/C 对比（最终选 C） |
| `hc-lai-day3-brief.md` | Day 3 brief（Work 目录 + MDX 路由 + Nanobanana 详情页） |
| `content/works/nanobanana.mdx` | 02 详情页源稿 |
| `content/works/job-decision.mdx` | 03 详情页源稿（完整见附录 D） |
| `content/works/ai-workflow.mdx` | 01 详情页源稿（完整见附录 D） |
| `components/mdx/CaseExpandable.tsx` | 折叠 case 卡组件（见附录 E） |
| `components/mdx/WorkImage.tsx` | 图片 + Lightbox 组件（见附录 E） |
| `public/works/nanobanana/*.png` | 02 五张真图（sharp 压缩） |
| `public/works/job-decision/*.png` | 03 两张真图（sharp 压缩） |
| `hc-lai-project-archive.md` | 本存档文件 |

---
## 附录 D · 三篇 case study 完整 MDX 源稿

> 本附录无损保留三篇详情页的 MDX 源稿，供未来检索、复用、或重建。03 与 01 是 Day 3 由姐姐整理的逐字稿（可直接粘贴给 Claude Code）；02 的正文成型于 Day 3 之前的对话，此处保留其 frontmatter、章节结构与图注（完整七节正文以线上 `content/works/nanobanana.mdx` 为准）。三篇共用同一 MDX 模板与 `.prose-works` 规则。

### D.1 共用约定

- 章节标题格式：`## 0X | 中文 English`
- 中英顺序：每段**中文先 → 英文后**
- 标点：中文段用全角逗号句号
- 代码块：去掉 Notion 误标的 `jsx` 语言标签，用纯 ` ``` `（避免 JSX 高亮干扰 ASCII 流程图）
- 加粗：节制，只在关键数字 / 结果 + 结构性 label
- 图片：`<WorkImage src="..." caption="中文。 / English." />`，`placeholder` 模式渲染灰块

### D.2 — 02 `nanobanana.mdx`（frontmatter + 结构 + 图注）

```mdx
---
slug: nanobanana
titleEn: Semi-agentic Architectural Image Iteration
titleCn: Nanobanana 半自动建筑工作流
category: AIGC · Architecture · Workflow Design
year: 2026
---
```

**七节结构**：01 项目概述 / 02 为什么做这个（建筑 AI 出图中每轮重复组织白模、参考图、prompt 的痛点）/ 03 工作流设计（Stage1 白模锁几何 → Stage2 反馈推送 → Round/State 管理）/ 04 我做了什么（需求拆解与边界定义 · 两阶段生成策略 · 结构化 keep-fix-avoid feedback · 本地 Streamlit 工作台 MVP · 方法论验证与边界记录）/ 05 工作台 MVP 展示 / 06 方法论验证 case_04a 保守版 vs case_04b 推进版 / 07 反思与边界（定位为 AI workflow prototype，不替代开放式视觉判断）。

**5 处 WorkImage caption**：
- `workflow-ui.png`：「Nanobanana 建筑生图工作台」
- `mvp-demo.png`：「界面支持当前项目状态、最新输出预览、前后短对比、历史轮次回看与本地路径提示。」
- `round2-anchor.png`：「Round 2 Anchor」
- `case-04a.png`：「case_04a 保守版结果」
- `case-04b.png`：「case_04b 推进版结果」

**Day 3 文案修复（7 处错字）**：高甲库→高语境、高画幅度→高画幅高自由度；接守→保守；冒着分散在→散落在；"我让每一轮…并让每一轮"→"目标是让每一轮修改更可追踪、更可回溯"；"不是一定生成出更高级渲染对话更高级"→"不是为了生成比开放式对话更高级的渲染"；当多次需要可以结构化表达时→当多轮修改需求可以被结构化表达时；记录及理→记录与梳理。

**IP**：原效果图用公司项目 SU 白模，已换知末网干净白模半小时重跑 A/B（见 #21）。

### D.3 — 03 `job-decision.mdx`（完整源稿）

````mdx
---
slug: job-decision
titleEn: Semi-automated Job Decision Workflow
titleCn: AI 求职决策助手 · 半自动化 JD 匹配工作流
category: AI Workflow · Ops Tooling · Human-in-the-loop · Workflow Design
year: 2026
---

## 01 | 项目概述 Project Summary

一个围绕「建筑设计师转 AI 行业求职」真实痛点搭建的半自动化决策工作流。通过 Claude API 实时解析岗位 JD，匹配三版差异化简历与招呼语版本，输出结构化「投递决策卡」。

A semi-automated decision workflow built around a real pain point — transitioning from architectural design into the AI industry. It uses the Claude API to parse job descriptions in real time, match against three differentiated resume and outreach versions, and output a structured "application decision card."

工作流核心定位：**不替代人做判断，而是把"识别同名异向、版本匹配、风险归类"这类结构化但重复的判断成本降到趋近于零**，让使用者把精力留在真正需要权衡的取舍上。

The core positioning is **not to replace human judgment, but to drive the cost of structured-yet-repetitive decisions toward zero** — letting the user keep focus on the trade-offs that actually require thinking.

两天内累计判断 **108 个岗位**，平均决策时间从 5 分钟 / 个降至 30 秒 / 个。

Across two days, **108 positions** were processed; per-decision time dropped from roughly 5 minutes to 30 seconds.

## 02 | 为什么做这个 Why I Built This

转行求职过程中遇到三个交叠的真问题。

Three overlapping pain points encountered during this career-transition job search.

### 同名异向 / Same Title, Different Reality

同样叫"AI 产品运营"的岗位，实际工作内容差异极大——有的偏投流，有的偏内容，有的偏 prompt 工程。光看 title 无法判断方向。

Jobs called "AI Product Operations" can mean ad performance, content ops, or prompt engineering. Title alone cannot tell.

### 重复决策成本高 / High Repetitive Decision Cost

每个岗位都要经历"读 JD → 判断方向 → 选简历版本 → 写招呼语 → 决定投不投"。一晚最多深度判断 10 个岗位，效率瓶颈在判断而非投递。

Each posting required reading JD → deciding direction → picking resume version → writing greeting → final go/no-go. Throughput was capped at the decision step, not the application step.

### 转行简历容易被秒拒 / Transition Resumes Get Filtered Fast

建筑专业 + AI 方向求职，HR 看到第一眼时往往直接划走。投出去无回复是常态。

Coming from architecture into AI, recruiters often dismiss the resume at first glance. Silent rejections are the norm.

第三点工具解决不了。**所以这个工具的目标不是"提高回复率"，是在"看不到回报的求职阶段，依然能按结构化节奏继续投递，不被疲惫吞没"**。

The third pain point is not solvable by tooling. **So the goal of this workflow is not to "increase reply rate" — it is to keep moving at a structured pace during a phase where feedback is delayed, so that fatigue does not become the bottleneck.**

## 03 | 工作流怎么设计 Workflow Design

```
JD 文本输入(截图 OCR / 复制粘贴)
        ↓
Claude API 实时解析(嵌入个人背景 + 判断模板)
        ↓
五维度判断
  · 岗位偏向(应用层 / support / workflow / ops vs 工程 / 算法)
  · 核心要求(文档 / 协同 / 用户支持 / 工程实现)
  · 个人匹配点
  · 风险点(工程深度 / 英文要求 / title 名实不符)
  · 综合结论(主投 / 可冲 / 暂不主攻)
        ↓
版本匹配
  · 简历 A / B / C(产品运营 / 平台支持 / 应用运营)
  · 招呼语 A / B / C(与简历同向)
        ↓
结构化决策卡输出(10 字段)
        ↓
本地双轨留存
  · Markdown:每岗一份,便于回看
  · CSV 台账:用于后续回复率统计
```

### 设计原则 / Design Principles

**Workflow Design** —— 把重复人工判断转成可复用的结构化输出，每张决策卡 10 个字段固定，便于横向比对。

Convert repetitive judgment into reusable structured output, with 10 fixed fields per card to allow horizontal comparison.

**Human-in-the-loop** —— 工具只判断不投递，"立即沟通 / 投递 / 拒绝"由使用者手动完成。这一点是有意为之，07 节展开。

Tool decides, human applies. "Initiate chat / submit / decline" remain manual actions — a deliberate boundary, expanded in section 07.

**降级容错 / Graceful Degradation** —— 如果 JD 提取失败或方向无法识别，决策卡会显式输出"信息不足"或"无可用简历版本"，不强行做判断。

When JD extraction fails or direction cannot be inferred, the card explicitly outputs "insufficient information" rather than forcing a decision.

## 04 | 技术路径选择 Path Selection

在到达当前命令行半自动版本之前，先后实践 / 评估过三条技术路径，每条因为不同原因调整方向。完整记录构成了项目的 **Failure Postmortem 档案**——这是 ops 工作里"决策可追溯"的核心实践。

Before arriving at the current CLI semi-automatic version, three technical paths were explored and adjusted. The full record forms the project's **Failure Postmortem archive** — a core practice of "traceable decision-making" in ops work.

### 路径 1 | BOSS CLI 接口自动化 / API Automation

尝试通过开源 boss-cli 工具搭建"搜索 → 详情 → 筛选 → 招呼"全自动链路，包裹一层 safe wrapper 严格阻止越权操作(cookie 读取 / 自动登录 / 自动投递)。

Attempted full automation via open-source boss-cli, wrapped in a safe layer that strictly blocked over-privileged actions (no cookie reads, no auto-login, no auto-apply).

**结果**：单次只读 search 跑通过；详情接口受 session 时效限制；批量 search 触发平台风控信号("风控" marker)。Wrapper 按既定规则立即 STOP，避免了账号风险。

Outcome: single-shot read-only search worked; detail endpoint hit session-expiry constraints; batch search triggered the platform's risk-control marker. The wrapper executed an immediate STOP per design, protecting the account.

**结论**：BOSS 平台对高频自动化不友好，**接口路径不适合作为主流程**。但 wrapper 的 STOP 机制和 diagnostics 设计被证明是有效的安全边界——这部分思路被保留下来，体现在后续工具的"只读不投"原则里。

Conclusion: BOSS is not friendly to high-frequency automation; **the API path cannot be the main pipeline**. But the wrapper's STOP and diagnostics design proved an effective safety boundary — this thinking carries into the "read-only, no actions" principle in later tools.

### 路径 2 | 油猴脚本浏览器浮窗注入 / Browser Overlay Injection

打算在 Boss 直聘网页右侧实时注入决策卡浮窗。脚本完整生成(含 Tampermonkey + OpenRouter API + Shadow DOM 隔离 + GM_setValue 安全存储)。

Planned a real-time decision card overlay injected into Boss's web pages. Full script generated (Tampermonkey + OpenRouter API + Shadow DOM isolation + GM_setValue secure storage).

**结果**：发现 Boss 直聘有强反 DevTools 检测(打开开发者工具直接踢出页面)，且新版"列表 + 预览面板"双栏布局让 SPA 路由检测失效，调试成本远高于预期收益。

Outcome: discovered strong anti-DevTools detection on Boss (opening DevTools immediately ejected the page) and a new dual-pane "list + preview" layout that defeated SPA route detection. Debugging cost far exceeded expected value.

**结论**：浮窗思路本身是对的，**但选错了战场**。浮窗版的代码与架构被保留作为后续 LinkedIn / 猎聘适配的基础——这两个平台反爬强度低得多。

Conclusion: the overlay idea is right; the **battlefield was wrong**. The overlay code and architecture are preserved as a base for future LinkedIn / Liepin adaptations, where anti-scraping is far lighter.

### 路径 3 | 命令行半自动 / CLI Semi-automatic(当前主流程 Current Main Pipeline)

回归最朴素方案：终端输入 JD → 调 Claude → 输出决策卡 → 人工决定投不投。

Returned to the simplest design: paste JD into terminal → call Claude → render decision card → human decides whether to apply.

**结果**：30 秒 / 岗位，零风控风险，可叠加台账留存与跨日复盘。**这是目前在用的版本，承担了 108 个岗位的真实判断。**

Outcome: 30 seconds per posting, zero risk-control exposure, with persistent logs for cross-day review. **This is the version in production, having processed 108 actual postings so far.**

**心得**：方案选型不是"哪个最先进"，是"哪个跟现实约束最匹配"。BOSS 平台高强度反爬就是约束，与其硬刚不如用最轻量的人机分工绕开它。

Takeaway: path selection is not about "which is most advanced" — it is about "which best matches the real constraints." Heavy anti-scraping is the constraint; rather than fighting it, use the lightest human-machine division to bypass it.

## 05 | 工作台 MVP 展示 MVP Demo

<WorkImage
  src="/works/job-decision/decision-card.jpg"
  caption="jd 命令行工具完整链路展示——从 JD 输入、AI 解析、决策卡输出到本地双轨留存。 / jd CLI tool full pipeline: from JD input through AI parsing to decision card output and local dual-track logging."
  placeholder
/>

<WorkImage
  src="/works/job-decision/csv-log.jpg"
  caption="决策卡 CSV 台账(节选 20 行)——每条记录包含日期、公司、岗位、方向判断、核心要求、风险点、推荐简历版本、推荐招呼语版本、结论与投递理由。 / CSV decision log (excerpt of 20 records) — each entry captures date, company, role, direction analysis, key requirements, risk flags, recommended resume version, recommended outreach version, conclusion, and application reasoning."
  placeholder
/>

## 06 | 方法论验证 Validation

### 当前数据 / Current Data(验证中 Validating)

- 累计判断岗位数：**108**
- 实际投递数：约 30–50 个(按"主投"和"可冲"档投递)
- 平均决策耗时：**30 秒 / 岗位**(手动判断对照组：约 5 分钟)
- 回复率：**统计中**(投递时间集中在五一假期，等待工作日反馈)

**Effectiveness validation is incomplete by design** — postings were sent during the May holiday and recruiter responses are expected after the holiday. The data section will be updated with reply rates and interview conversion in subsequent revisions.

### 初步观察 / Initial Observations

决策卡的"方向判断"在多次实测中**有效识别了 title 与实际方向的偏差**(例：title 标注"AI 产品经理(建筑专业)"，决策卡识别为"偏技术实验向，含 ComfyUI / 模型训练要求")。

The "direction" field reliably caught title-vs-reality gaps in repeated tests.

简历版本推荐与个人事后判断的一致性较高，目前未发现明显错配。

Resume version recommendations have shown high consistency with retrospective judgment; no significant mismatch observed yet.

部分极端案例(要求 5 年经验 / 要求 985 名校 / 要求纯算法背景)会被决策卡明确标为"暂不主攻"，与人工判断一致——**说明判断模板对"硬门槛"识别可靠**。

Edge cases (5+ years required / Tier-1 universities only / pure algorithm background) are reliably flagged as "do not pursue" — confirming the template's reliability on hard filters.

## 07 | 反思与边界 Reflection & Boundary

这个工具能做什么、不能做什么，作为创作者需要写清楚。

What this tool can and cannot do — written plainly by its user.

### 它解决的事 / What It Does

把"识别同名异向、匹配简历版本、归类风险信号"这类**结构化但重复**的决策成本降到趋近于零；把使用者的精力从"读 100 份 JD"释放出来，转向"沉淀作品集 / 准备面试 / 学习行业知识"。

Drives the cost of structured-yet-repetitive decisions (catching title mismatches, matching resume versions, classifying risk signals) toward zero — and frees the user's energy from "read 100 JDs" to "build portfolio / prepare interviews / study the industry."

### 它没有解决的事 / What It Does Not Solve

- 转行简历被 HR 第一眼劝退的根本困境(这是平台展示机制 + 招聘市场结构问题，不是工具能解决的)
- 回复率本身(截至作品集发布日，108 个岗位的反馈仍在累积中)
- 面试转化率与 offer 质量(更长的反馈周期)

The structural reality that transition resumes get filtered fast (this is a platform display + hiring market issue, not a tooling issue), reply rate itself (data still accumulating), interview conversion and offer quality (longer feedback loop).

### 关于"半自动"的取舍 / On the "Semi-automated" Trade-off

工具刻意保留了"由使用者手动点击立即沟通 / 投递"这一步。

The tool deliberately keeps "click to chat / submit application" as a manual step performed by the user.

不是技术做不到自动投递，是：

- 自动投递触发平台风控(路径 1 已验证)
- 自动投递让使用者失去对每个岗位的最后一次审视机会
- 求职是高风险决策，**保留人类最终决策权比追求"全自动"更重要**

Not because automation is technically impossible, but because: auto-apply triggers platform risk-control (verified in Path 1); auto-apply removes the user's last review checkpoint per posting; job hunting is a high-stakes decision — **preserving the human's final say matters more than chasing "fully automated."**

这是工具的边界，也是它在 ops / 平台支持 / 客户成功这类岗位场景下应有的姿态——**半自动不是"功能不完整"，是对人类判断权的有意保留**。

This is the tool's boundary — and the posture it should maintain in ops / platform support / customer success contexts: **"Semi-automated" is not "incomplete automation" — it is a deliberate preservation of human judgment.**
````


### D.4 — 01 `ai-workflow.mdx`（完整源稿）

> 姐姐的关键取舍：① 8 子页 → 7 H2（重新组织阅读流，非机械翻译）；② 4 个 case 全用 `<CaseExpandable>` 折叠，默认显示 Scenario / Why it matters / What it proves，点开看完整 Input/Output；③ Output Template 的 A–E 合并进 03 节讲，不单独成节；④ 加粗 < 8 处；⑤ 无图（Notion 原页本身无图）。

````mdx
---
slug: ai-workflow
titleEn: AI Workflow & Enablement Portfolio
titleCn: AI 工作流与运营支持原型
category: AI Workflow · Structured Output · Project Communication
year: 2026
---

## 01 | 项目概述 Project Summary

一个轻量级 AI 工作流原型，用来把混乱的项目输入(甲方反馈、会议纪要、碎片化需求)转化为结构化、可追踪、可复用的输出——服务于项目推进与汇报沟通。

A lightweight AI workflow prototype that converts messy project inputs — client feedback, meeting notes, fragmented requests — into structured, traceable outputs for project execution and leadership communication.

**这不是几个互不相关的小助手拼在一起，而是一个以 workflow 为核心的项目系统**：一个主原型 + 多个基于不同输入场景的验证分支。整套作品集要证明的不是"会用 AI"，而是**设计结构化 workflow、处理不确定性、并把方法沉淀成可教学可复用的东西**。

**This is not a collection of unrelated AI assistants — it is a single workflow-oriented project system**: one main prototype plus scenario-based validations. What it aims to prove is not "AI usage," but the ability to design structured workflows, surface uncertainty explicitly, and turn methods into something teachable and reusable.

## 02 | 为什么做这个 Why I Built This

在设计与项目场景里，**关键信息经常分散在聊天、反馈和零碎记录中**。这会带来五个反复出现的问题：

In design and project environments, important information is often scattered across conversations, feedback, and informal notes — creating five recurring problems:

- **任务遗漏** —— Key tasks easily missed
- **风险暴露滞后** —— Risks surface too late
- **未知信息被掩盖** —— Unknowns hidden instead of made explicit
- **输出不一致难复用** —— Outputs inconsistent and hard to reuse
- **汇报内容反复重写** —— Leadership communication rebuilt from scratch every time

这些不是"使用 AI 工具就能解决"的问题，而是**需要设计一套结构化的工作流，才能让 AI 的输出真正落到执行层和汇报层**。

These are not problems that "using an AI tool" can fix. They require **designing a structured workflow** to make AI output actually land at the execution and communication layers.

## 03 | 工作流怎么设计 Workflow Design

整套 workflow 围绕一个**固定输出 schema**展开，每个模块承担明确的功能：

The entire workflow is built around a **fixed output schema**, with each section serving a specific purpose:

### 输出结构 A–E / Output Structure A–E

- **A. Executive Summary** —— 30 秒可读完的汇报摘要，服务领导决策
- **B. Task Table** —— 可追踪任务表，含 Owner / Due / Priority / Dependency / Source Quote
- **C. Risks & Mitigations** —— 前置暴露的风险与对策
- **D. Open Questions** —— 显性化的未确认问题
- **E. Assumptions & Source** —— 假设与原句引用，用于追溯与边界控制

每个模块的设计目的：Executive Summary 让领导快速读懂、Task Table 落到执行、Risks 提前暴露、Open Questions 显性管理未知、Assumptions & Source 通过原句引用降低幻觉风险。

Each module serves a specific role: Executive Summary for fast leadership readability, Task Table for execution tracking, Risks for early surfacing, Open Questions for explicit unknown management, Assumptions & Source for traceability and hallucination reduction.

### 治理原则 / Governance Principles

为了让 AI 输出**可靠、可追溯、可审阅**，这套 workflow 定了几条硬规则：

To make AI output **reliable, traceable, and reviewable**, the workflow enforces several hard rules:

- **不编造缺失信息** —— No fabrication of missing facts, dates, owners, or decisions
- **未知信息显性化** —— Unknowns go into Open Questions / Assumptions, never hidden in Notes
- **原句溯源** —— Important interpretations link back to source quotes
- **字段规范** —— Due field is date-only or blank; Priority uses only P0–P3; no relative time
- **已知与未知分离** —— Known execution data and unresolved questions stay separate
- **对外使用前必须人工审核** —— Human review required before any external-facing communication

### 字段规范细则 / Field Discipline

- **Priority** —— 仅使用 P0 / P1 / P2 / P3
- **Due** —— 仅使用具体日期或留空，**不使用"下周""明天"等相对时间**
- **Owner** —— 负责人或 TBD，不留空
- **Notes** —— 仅放执行备注，不作为未知信息的兜底
- **任务用动作动词** —— "Define three direction strategies"(优), "Think about options"(劣)
- **输出语言明确控制** —— 标题双语 / 主体中文 / 数据库字段名英文

## 04 | 场景验证 Scenarios

这套 workflow 在 **4 个真实场景**下做了验证。每个 case 都包含真实的 messy input + 完整的 A-E 结构化输出，用来证明同一套 workflow 在**不同类型的混乱输入下都能成立**。

The workflow was validated across **4 real scenarios**. Each case captures real messy input + the full A-E structured output, demonstrating that the same workflow holds across **different types of messy input**.

<CaseExpandable
  title="Case 01 | Client Change · 甲方变更"
  scenario="把一份模糊的甲方设计变更要求，转译为可汇报的执行更新和可追踪任务清单。"
  whyItMatters="测试这套 workflow 能否把外部、非结构化的甲方反馈，转成有行动、有风险、有原句溯源的结构化输出。"
  whatItProves={[
    "可以把 messy 项目输入转译为可执行的 actions / risks / open questions",
    "Source Quote 机制有效降低 AI 编造风险，提升可追溯性",
    "Due 字段保持空白(而非编造日期)显著提升输出可信度",
    "Round 1 / Round 2 prompt 迭代，字段规范性和语言一致性显著提升"
  ]}
>

### Input

> 甲方觉得入口不够有仪式感，希望更有到达感，但预算很紧，最好不要增加复杂材料。工期也比较赶，下周要出一版可汇报的方向。还希望夜景有亮点，但不想很商业化。

### Output

**A. Executive Summary**

- **Context**：需要在预算受限、工期紧张的前提下，快速形成一版可汇报的入口优化方向。
- **What changed / New input**：甲方希望入口更有仪式感和到达感，同时要求夜景有亮点，但不希望整体表达过于商业化，也不希望增加复杂材料。
- **Key decisions needed**：是否以低成本材料与界面层次优化为主、夜景表达策略、是否需要呈现 2-3 个方向供比较。
- **This week's focus**：明确汇报时间、形式与受众；输出 2-3 个低成本入口概念方向；同步整理风险点与待确认问题。

**B. Task Table**

- 梳理入口"仪式感 / 到达感"可用设计手段清单(P0，优先不增加复杂材料)
- 输出入口概念方向 V1 用于汇报(P0)
- 形成夜景亮点策略稿(P1，强调非商业化表达)
- 预算约束下的材料与做法建议(P1，避免复杂材料的替代方案)
- 汇报材料结构与要点(P2，1 页结论 + 2-3 页论证)

**C. Risks & Mitigations**

- **R1 预算约束导致方案表现力不足** → 影响：难以满足"更有仪式感"的预期 → 动作：从界面层次、导视强化、灯光秩序入手，不增加复杂结构
- **R2 工期紧、深化时间不足** → 影响：方案停留在概念层 → 动作：本轮先聚焦方向性表达，做可读性强的一页式汇报
- **R3 夜景"有亮点"与"不要太商业化"表达冲突** → 影响：过度亮化风险 → 动作：克制的线性光、重点洗墙、导视照明，强调气质与秩序感
- **R4 材料策略不清晰影响落地** → 影响：复杂材料隐性引入，造价施工风险 → 动作：汇报时标注"优先常规材料和低复杂度节点"原则

**D. Open Questions**

- 下周汇报的具体时间、形式和受众是谁？(影响输出深度与表达方式)
- 本轮汇报是否需要提供多个方向，还是只需一个推荐方向？(决定工作量分配)
- 预算限制的边界是什么？(哪些材料和做法可接受，哪些需避免)
- 夜景亮点是否允许少量灯光投入？(决定是"纯氛围优化"还是"可识别亮点强化")

**E. Assumptions & Source**

Assumptions: 本轮目标是"可汇报的概念方向"，不是工程级深化；甲方更在意整体气质而非昂贵实体构件；允许策略性表达代替具体节点做法。

Quotes:
- "入口不够有仪式感，希望更有到达感。"
- "预算很紧，最好不要增加复杂材料。"
- "工期也比较赶，下周要出一版可汇报的方向。"
- "希望夜景有亮点，但不想很商业化。"

</CaseExpandable>

<CaseExpandable
  title="Case 02 | Leadership Request · 领导汇报"
  scenario="把领导的一句『下周汇报需要 3 个方向』的模糊要求，转译为可对比的方案对比框架和任务拆解。"
  whyItMatters="测试同一套 workflow 在不同输入类型(领导请求 vs 甲方变更)下的复用性，以及『外企风格』语言约束下的输出表现。"
  whatItProves={[
    "同一套 schema 可以稳定承接不同语境的输入类型",
    "任务措辞更 action-oriented，Owner 分配更精准(默认 Me)",
    "语言风格可通过 prompt 约束控制(短句、结论先行、可执行)",
    "缺失评估口径会显性化为 Open Questions，而不是被 AI 编造"
  ]}
>

### Input

> 领导要求：下周汇报需要 3 个方向，每个方向要有亮点和风险点。重点关注造价、施工难度、工期。希望文本更像外企风格：短、清晰、可执行。

### Output

**A. Executive Summary**

- **Context**：领导明确下周汇报要求 3 个可对比的方案方向，并按造价、施工难度、工期进行评估。
- **What changed**：每个方向需同时给出亮点和风险点；文本表达需更外企风格(短、清晰、可执行)。
- **Key decisions needed**：3 个方向的定位边界与取舍逻辑、每个方向的亮点是否允许带来施工复杂度。
- **This week's focus**：明确 3 个方向的定义与差异；为每个方向补齐亮点与风险点；形成一页式对比汇报文本结构。

**B. Task Table**

- 定义 3 个方向的命名、核心策略与差异点(P0，Me)
- 为每个方向输出亮点清单(P0，Me)
- 为每个方向输出风险点清单，按造价 / 施工难度 / 工期分类(P0，Me)
- 为每个方向给出风险对策(P1，Me)
- 形成汇报文本骨架(P1，Me，外企风格)
- 明确下周汇报具体日期与评审权重(P0，TBD)

**C. Risks & Mitigations**

- **R1 方向定义标准缺失** → 影响：方向不可比、评审难收敛 → 动作：先设统一评估维度，再锁定 3 个方向的差异点
- **R2 "亮点"导致施工复杂度上升** → 影响：工期不可控、方向被否决 → 动作：每个方向给"亮点 + 可施工实现路径 + 降配选项"
- **R3 文本风格要求清晰但输入信息不足** → 影响：汇报变空泛 → 动作：不确定信息转为待确认问题，用假设前提明确边界

**D. Open Questions**

- 下周汇报的具体日期是哪一天？(倒排产出节奏，避免使用相对时间)
- 造价、施工难度、工期三者的优先级 / 权重是什么？(决定 3 个方向的取舍逻辑)
- 是否有明确的造价红线、关键工期节点、不可接受的施工工艺？(风险点能否量化)
- 每个方向需要到什么深度(概念策略 / 示意级 / 可落地做法)？(控制工作量)

**E. Assumptions & Source**

Assumptions: "下周"存在一次汇报节点但无具体日期，Due 留空；未提供方案内容细节，本输出聚焦汇报交付物结构与工作拆解。

Quotes:
- "下周汇报需要 3 个方向"
- "每个方向要有亮点和风险点"
- "重点关注造价、施工难度、工期。"
- "希望文本更像外企风格：短、清晰、可执行。"

</CaseExpandable>

<CaseExpandable
  title="Mini Case 01 | Internal Notes · 内部备忘录到行动跟踪"
  scenario="把团队内部一段口语化的会议同步，转译为清晰的行动追踪、阻塞项暴露与待确认问题。"
  whyItMatters="测试 workflow 在『对话型输入』(而非结构化请求)下的承接能力——很多团队真正的问题不是『有没有开会』，而是『会后到底谁做什么』。"
  whatItProves={[
    "可以处理 messy 内部协作输入，不只面向外部 / 结构化请求",
    "可以把对话式记录转成 action-oriented 跟进输出，而不只是 summary",
    "更清晰地分离 agreed actions / current blockers / unresolved questions",
    "支持内部团队协调，不只面向外部沟通"
  ]}
>

### Input

> 今天内部碰了一下入口方案的推进。A 说下周汇报最好还是保留 3 个方向，但不要做得太满，先拉开差异。B 觉得现在最大问题是造价边界还不清楚，如果不先确认，后面很容易返工。C 提醒夜景部分不要展开太多，先把白天逻辑讲清楚，不然汇报会显得散。还有一个问题是汇报时间好像改到周四了，但还没最终确认。最后大家都同意，先把三版方向的关键词和风险点列出来，再决定是否需要主推一个方向。

### Output

**A. Executive Summary**

- **Context**：内部对入口方案推进进行同步，目标是为汇报准备清晰、可对比的方案表达。
- **What changed**：共识为保留 3 个方向但先做"差异拉开"；最大不确定是造价边界；夜景先收敛、优先讲清白天逻辑；汇报时间疑似调整到周四但未确认。
- **Key decisions needed**：是否在列出三版关键词与风险点后主推一个方向；未明确造价边界前，三版方向的展开深度。
- **This week's focus**：确认造价边界；输出三版方向关键词 + 风险点；收敛汇报叙事并确认汇报时间。

**B. Action Tracker**

- 整理三版方向的关键词清单，每版 5-8 个词确保差异清晰(P0，Team)
- 为三版方向分别列出主要风险点，覆盖造价 / 施工 / 工期(P0，Team)
- 向相关方确认造价边界 / 红线(P0，Lead)
- 汇报内容收敛：白天逻辑作为主线，夜景仅保留原则性表述(P1，Me)
- 确认最终汇报时间是否改到周四并同步给团队(P0，TBD)
- 在关键词 + 风险点完成后，组织快速决策是否主推一个方向(P1，Lead)

**C. Blockers & Risks**

- **B1 造价边界未确认** → 影响：三版方向容易越界、返工成本高 → 动作：优先确认造价红线与口径
- **B2 汇报时间未最终确认** → 影响：倒排计划不稳、交付节奏被动 → 动作：当天内锁定最终时间并同步
- **R1 三版方向"做得太满"导致差异不清** → 影响：评审不聚焦、周期拉长 → 动作：每版先用"关键词 + 1 句话策略 + 3 个亮点 + 3 个风险"轻量化表达
- **R2 夜景展开过多导致汇报叙事发散** → 影响：主线不清、被质疑重点不聚焦 → 动作：夜景只保留与白天逻辑一致的原则与控制项

**D. Open Questions**

- 汇报是否最终改到周四？具体日期与时间？(锁定倒排计划)
- 造价边界的数值范围与计价口径是什么？(避免方向越界与返工)
- 三版方向在本轮需要到什么深度(仅策略对比 vs 示意级内容)？(控制执行尺度)
- 列出关键词与风险点后，是否必须主推一个方向？(决定后续资源投入)

**E. Assumptions & Source**

Assumptions: 未提供具体日期与责任人，Due 留空，Owner 采用 Me / Team / Lead / TBD 内部常用分配；当前阶段以"可对比的轻量化表达"优先，不进入深化。

Quotes:
- "下周汇报最好还是保留 3 个方向，但不要做得太满，先拉开差异。"
- "现在最大问题是造价边界还不清楚，如果不先确认，后面很容易返工。"
- "夜景部分不要展开太多，先把白天逻辑讲清楚。"
- "汇报时间好像改到周四了，但还没最终确认。"

</CaseExpandable>

<CaseExpandable
  title="Mini Case 02 | Requirement Intake · 需求收集到检查清单"
  scenario="把一份模糊的需求说明 / brief，转译为结构化检查清单、风险摘要、缺失信息与建议下一步。"
  whyItMatters="测试 workflow 在『文档型输入』(brief / 需求说明 / 半成型文档)下的承接能力——很多流程问题不是从聊天开始的，而是从模糊文档开始的。"
  whatItProves={[
    "可以处理文档型需求输入，不只面向对话型输入",
    "可以把 brief 转成 readiness checklist，而不只是 summary",
    "有助于在执行开始前显性暴露 gaps 与 missing inputs",
    "支持 requirement intake 与 readiness check，不只面向汇报追踪"
  ]}
>

### Input

> 本轮汇报材料需要在下周评审前完成，输出以一页总结 + 两页支撑说明为主。重点是让领导快速理解三个方向的差异，不需要现在就展开到工程深度。内容必须体现造价、施工难度和工期影响，但目前预算红线还没有完全确认。夜景部分只作为辅助，不作为主线。汇报风格要求简洁，避免大段描述，最好能直接转成行动项和待确认问题。

### Output

**A. Summary**

- **目标**：评审前完成一套"可快速决策"的汇报材料，让领导一眼看懂三个方向的差异与取舍。
- **交付物形态**：1 页总结 + 2 页支撑说明(总计 3 页)。
- **内容范围**：不展开到工程深度；必须覆盖造价、施工难度、工期影响；夜景仅作辅助。
- **关键约束**：预算红线尚未完全确认；表达风格简洁，可直接转成行动项与待确认问题。

**B. Checklist**

- 交付页数与结构明确(1 页总结 + 2 页支撑)— Clear，P0
- 评审时间的具体日期与截止时间 — Missing，P0
- 1 页总结页的信息架构(结论先行) — Partial，P0
- 三个方向的定义与命名(每个方向一句话定位) — Missing，P0
- 三方向差异的对比维度与口径 — Partial，P0
- 造价信息输入(预算红线、上限、计价范围 / 假设) — Partial，P0
- 施工难度的判断依据 — Missing，P1
- 工期影响的判断依据 — Missing，P1
- "不展开到工程深度"的边界定义 — Partial，P1
- 夜景内容范围(放在哪一页、占比、表达程度) — Partial，P2
- 两页支撑说明的内容清单 — Missing，P1
- 语言风格检查(短句、要点化) — Clear，P2
- 行动项与待确认问题的输出区块 — Partial，P1

**C. Risks & Gaps**

- **预算红线未确认 + 仍要求体现造价影响** → 影响：造价口径不一致 → 动作：先锁定暂定造价假设区间(标注为假设)，同时推动尽快确认红线
- **缺少三方向内容输入** → 影响：材料只能写成框架 → 动作：先补齐三方向的一句话定位 + 3-5 条关键词
- **施工难度、工期影响缺少判断依据** → 影响：变主观描述，难支持决策 → 动作：为每个方向列 1-3 个关键工序 / 关键路径假设
- **评审时间只有"下周评审前"** → 影响：无法倒排计划 → 动作：立即确认具体日期与提交截止时间

**D. Open Questions**

- 评审的具体日期与材料提交截止时间是哪一天？
- 三个方向的内容输入在哪里？如果没有，谁来给出第一版方向定义？
- 造价表达口径是什么(定量区间 / 相对等级 / 上限对比)？
- 施工难度与工期影响是否需要量化？采用什么统一标准？
- 领导是否期待本轮给出推荐主推方向，还是仅对比不推荐？

**E. Recommended Next Steps**

- 确认评审具体日期与提交截止时间，据此倒排 3 页材料的内部冻结节点
- 组织产出三方向"命名 + 一句话定位 + 关键词"，作为所有页面填充的唯一输入源
- 定义统一对比口径：造价 / 施工难度 / 工期各用同一套等级或区间表达
- 输出 1 页总结页版式 + 2 页支撑页固定模块

</CaseExpandable>

### 4 个 case 共享的底层逻辑 / Unified Logic

虽然 4 个场景输入类型完全不同——客户变更 / 领导请求 / 内部会议 / 需求文档——但底层逻辑是一致的：

Although the 4 scenarios differ entirely in input type — client change / leadership request / internal meeting / requirement document — they share the same underlying logic:

- **把混乱输入转成结构化输出** —— Turn messy input into structured output
- **区分已知与未知** —— Separate knowns from unknowns
- **前置暴露风险** —— Surface risks early
- **支持后续行动** —— Support downstream action
- **提升可追踪性和复用性** —— Improve traceability and reuse

输入类型决定 schema 走向——**对话型输入更易导向 actions，文档型输入更易导向 checklists 和 gaps**。这就是为什么 schema 在不同场景下有差异化扩展，**而不是强行用一张表打天下**。

Input type drives schema direction — **conversation inputs lean toward actions, document inputs lean toward checklists and gaps**. That's why the schema has scenario-specific extensions rather than forcing one rigid table across all cases.

## 05 | 治理与边界 Governance & Boundary

这套 workflow **能做什么、不能做什么**，作为创作者需要写清楚。

What this workflow can and cannot do — written plainly by its creator.

### 它不是什么 / What It Is Not

- **不是决策替代品** —— 它帮助结构化思考、暴露任务和风险，但**不替代设计判断、领导拍板、甲方确认**
- **不是工程验证器** —— 可用于概念阶段规划与沟通，**不能用来证明技术可行性、规范符合性、可施工性、造价确定性**
- **不是 prompt 一次性输出** —— 是一套带有结构、治理、迭代、追溯的系统，不是"扔个 prompt 给 AI"

This workflow is not a decision-maker, not an engineering validator, and not a one-shot prompt. It is a system with structure, governance, iteration, and traceability.

### 5 种常见失败模式 / 5 Common Failure Modes

每一种失败都对应明确的修正方式——这些修正不是"再试试 prompt"，而是**在 prompt 和 review 中把规则写死**：

Each failure mode has a defined fix — and the fix is not "try a different prompt," but **encoding the rule into the prompt and review process**:

- **语言混用** —— Mixed languages → 显式定义输出语言规则
- **字段漂移** —— Schema drift(优先级格式 / 相对时间)→ 锁定允许的 schema 值
- **任务太空** —— Tasks too abstract(主题而非行动)→ 要求 action-oriented 措辞
- **未知信息被编造** —— Unknowns fabricated(日期 / 责任人 / 决策)→ 要求 missing info 进 Open Questions / Assumptions
- **原句引用过度改写** —— Quotes too loose(被改写过度)→ 要求保留原始措辞

### 敏感数据最小化 / Sensitive Data Minimization

在使用 AI 处理项目资料前，**敏感或保密信息应尽量减少或脱敏**：身份信息、保密客户资料、内部预算细节、未公开决策内容。

Before using AI on project materials, sensitive or confidential information should be minimized or redacted: personal identifiers, confidential client information, internal budget details, non-public project decisions.

## 06 | 可教学可复用 Enablement

这套 workflow 的设计目标**不只是让一个人用得起来，还要能教、能复用、能在相似场景中扩展**。

The workflow is designed not only to work for one user, but **to be teachable, reusable, and scalable across similar project scenarios**.

### 谁适合用 / Who This Is For

经常处理碎片化项目信息的人：项目协调 / PMO / 运营、负责汇报的设计人员、处理甲方变更的团队成员、需要把混乱输入转成结构化行动的人。

Project coordinators, PMO / operations roles, designers preparing leadership updates, team members handling client changes — anyone translating messy inputs into structured actions.

### 5 步上手 / Quick Start

1. **Prepare raw input** —— 选一个 messy 输入源(甲方反馈 / 会议纪要 / 领导请求 / 内部聊天)
2. **Use the standard prompt** —— 把输入粘贴进固定 prompt 模板
3. **Generate structured output** —— 让 AI 输出 A-E 五大块
4. **Review before reuse** —— 检查信息完整性、结构合规性、原句引用、任务可执行性、语气适配性
5. **Add tasks into shared database** —— 把相关任务移入 Notion 任务数据库，含 Priority / Owner / Due / Dependency / Status / Project / Source Quote

### 一句话教学脚本 / One-line Teaching Script

> 我们不是让 AI 替代判断，而是让它先把混乱输入变成一个结构化初稿，帮助我们更快暴露任务、风险和缺失信息；真正用之前仍然要人工审核。
>
> We use AI here not to replace judgment, but to turn messy inputs into a structured first draft. The workflow helps surface tasks, risks, and missing information faster. We still review everything before real communication.

### 当前已具备 / Currently in Place

固定输出 schema、可复用 prompt 结构、Notion 任务数据库、4 个场景验证案例、多轮 prompt 迭代记录。

Fixed output schema, reusable prompt structure, Notion task database, 4 scenario validations, multi-round prompt iteration records.

## 07 | 反思与下一步 Reflection & Next

### 当前状态 / Current Status

**原型完成 + 初步验证**。已完成结构设计、模板设计、Notion 数据库、4 个场景案例、两轮 prompt 迭代验证。第一轮暴露语言混用与字段漂移，第二轮通过加强 prompt 约束后，输出在语言一致性、结构稳定性、字段规范性上都有显著提升。

**Prototype complete + early validation.** Structure design, template definition, Notion database, 4 scenario cases, and two rounds of prompt iteration are all done. Round 1 exposed language inconsistency and schema drift; Round 2 significantly improved language consistency, schema compliance, and field discipline after tightening prompt rules.

### 已知 gap / Known Gaps

- 任务粒度仍可更 action-oriented
- 负责人分配规则仍偏保守(更多 TBD 而非具体角色)
- AI 输出与 Notion 数据库字段的对齐还不够完整
- 场景测试覆盖可继续扩展(更多输入类型、更多领域)

### 下一迭代方向 / Next Iteration

- 更清晰地定义"核心 schema + 扩展 schema"模型，让不同场景的字段差异有更明确的标准
- 进一步对齐 Notion 数据库，实现 AI 输出直接落库
- 加强任务与原句映射，提升 traceability
- 建立更明确的 review checklist，降低复用前的人工检查成本
- 视情况做多模型对比测试

### 一句话定位 / One-line Positioning

**这是一套 workflow 系统在多个场景下的验证，不是多个互不相关的小工具。我擅长把混乱的项目输入，转化为结构化、可追踪、可复用的 AI 工作流输出。**

**This is one workflow system validated across multiple scenarios, not several unrelated tools. I design AI-assisted project workflows that turn messy inputs into structured, traceable, and reusable outputs.**
````


## 附录 E · 详情页新组件（spec / 代码）

> Day 3 为详情页新建的两个组件。CaseExpandable 给 01 的 4 个场景折叠用；WorkImage+Lightbox 给所有真图点击放大用。

### E.1 `CaseExpandable` — 折叠 case 卡

**给 Claude Code 的实现 spec**：

```
Props:
- title (string): case 标题
- scenario (string): 一句话场景描述
- whyItMatters (string): 为什么这个 case 重要
- whatItProves (string[]): 这个 case 证明了什么，数组
- defaultOpen (boolean, default false): 是否默认展开
- children: 折叠展开后的完整内容(MDX 嵌套)

视觉规范:
- 容器: my-8 border-t border-line pt-6 pb-2
- 标题(title): font-mono text-[11px] tracking-[0.18em]
  uppercase text-ink-muted mb-3
  (跟 H1 category tag 同款 mono uppercase，视觉上独立于章节)
- Scenario: 正文字号、italic、mb-2
- Why it matters: 正文字号、regular、mb-2
- What it proves: 作为 ul，跟正文 list 同款样式
- 展开按钮: font-mono text-[11px] tracking-[0.08em] uppercase，
  显示 "↓ READ FULL CASE" / "↑ COLLAPSE"，
  text-ink-muted，hover: text-terracotta
- 折叠区域: 用 native <details>/<summary> 实现(SSR 友好 + 无障碍)
- 展开内容容器: mt-6 border-l border-line pl-6
  (左侧细线 + 缩进，区分"展开的详细内容")
- 内容里的 H4 / 段落 / list 自动应用 .prose-works 规则
```

**Claude Code 实现要点（确认）**：
- **无 `'use client'`** —— 用原生 `<details>/<summary>`，SSR 直出，无 JS 也能展开 / 收起。
- 标签切换用 Tailwind `group-open:hidden` / `group-open:inline`，CSS 驱动，不需要 React state。
- 样式继承 —— `<p>` / `<ul>` / `<li>` 自动继承 `.prose-works` 字体 / 间距规则，不重复声明。
- `defaultOpen={true}` 时渲染 `<details open>`。
- 需在 `globals.css` 加 webkit `details marker` reset；在 `MDXComponents.tsx` 注册。

**MDX 用法**：
```mdx
<CaseExpandable
  title="Case 01 | 标题"
  scenario="一句话场景描述。"
  whyItMatters="为什么这个 case 重要。"
  whatItProves={["证明了 A", "证明了 B", "证明了 C"]}
>

## 展开后的完整内容

正文段落...

</CaseExpandable>
```

### E.2 `WorkImage` + Lightbox — 图片点击放大

**需求**：桌面 + 移动端点击图片打开全屏 lightbox；移动端依赖浏览器原生 pinch-zoom；桌面 cursor `zoom-in` / 打开后 `zoom-out`；关闭方式点空白 / × 按钮 / ESC；全屏层 `bg-black/85 backdrop-blur-sm`；大图 `object-contain max-w-[95vw] max-h-[90vh]`；打开时锁定 body scroll；`placeholder` 模式不可点击（灰块无放大）。

**代码结构（参考实现）**：
```jsx
'use client';
import { useState, useEffect } from 'react';

export function WorkImage({ src, caption, placeholder = true }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';

    const handleEsc = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [open]);

  if (placeholder) {
    return (
      <figure className="my-10 max-w-[900px] mx-auto">
        {/* 现有 placeholder 视觉，不可点击 */}
      </figure>
    );
  }

  return (
    <>
      <figure className="my-10 max-w-[900px] mx-auto">
        <img
          src={src}
          alt={caption}
          onClick={() => setOpen(true)}
          className="w-full cursor-zoom-in transition-opacity hover:opacity-90"
        />
        <figcaption className="font-mono text-ink-muted text-[11px] tracking-[0.08em] text-center mt-3">
          {caption}
        </figcaption>
      </figure>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm
                     flex items-center justify-center p-4 cursor-zoom-out
                     animate-in fade-in duration-200"
          onClick={() => setOpen(false)}
        >
          <button
            className="absolute top-6 right-6 text-white/80 hover:text-white text-2xl leading-none"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
          <img
            src={src}
            alt={caption}
            className="max-w-[95vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
```

**实现注意**：① `'use client'` 必须加（用了 useState）；② lightbox 内的 `<img>` 要 `e.stopPropagation()`，防止点图本身触发关闭；③ 移动端 pinch-zoom 是浏览器原生行为，关键是用 `<img>` 标签（若用 next/image 要禁用 fill 优化）；④ 锁定 body scroll 避免背景滚动。

---

*存档结束 · hclai.studio — Designer of spaces and systems.*
*MVP 完成于 2026-05-29 · 三篇 case study · 7 张真图 · Lightbox · 活在网络上。*
