# H.C. Lai 项目档案 · Vol.4 
# 发布冲刺：去求职感定稿 + 折叠体验修复 + 图片/图注升级 + og 名片 + 字体自托管与子集化 + 性能收官

> 归档日期：2026-07-04（本场对话跨越数日）
> 状态里程碑：**发射资格达成**——代码侧收工，全站走查通过，待发布朋友圈。
> 前情：Vol.1（建站至三篇详情页时代）、vol2（首次构思到 MVP 完成的完整项目沉淀）、Vol.3（visual-standard-assistant 上线等）。

---

## ① 背景与目标

本场对话的起点：站点内容已齐（五篇案例详情页上线），进入**发布前最后打磨**。作者提出三项任务：

1. **语气修订（去求职感）**——四篇案例通稿，删除自我评价/求职腔，主任务，完成即"可以发出"；
2. 图片圆角（Anthropic 式）——锦上添花；
3. 截图重做成卡片/图表——锦上添花（大工程，明确留给未来独立对话）。

实际推进中，任务 1、2 完成之余，因走查与真机测试接连暴露新问题，战线自然延伸出：折叠组件体验重构、图注系统升级、分享卡片（og）修复、**字体加载架构的整场战役**、图片性能收官。最终全部收干净。

**编辑总纲（贯穿所有文案改动）**：
- 删除：自我评价（"我擅长/完整掌握"）、对读者宣告（"要证明/proves"）、防御性"不是X而是Y"、诉苦腔、results-pending 式观望、自证清白句式、过期时间锚点（五一假期）、求职身份标签（建筑专业/转行/HR划走）、简历腔（My Contributions/I designed）、新手自曝（解释 .env 常识）；
- 保留并擦亮："我考虑到了"类的金子——边界与局限说明、Failure Postmortem、深思熟虑的取舍、诚实的"它不解决什么"、方法论严谨性；
- 保留实质性的"不是X而是Y"（划分方法论/价值边界的），只砍防御性稻草人。

---

## ② 进展情况（战役总览）

| # | 战役 | 结果 | 交付 brief |
|---|---|---|---|
| 1 | 语气修订 ×4 篇（05→03→04→02，worst-first） | ✅ 全部上线 | ai-workflow / job-decision-v2 / nanobanana / fire-code-rag（两轮）共 5 份 |
| 2 | CaseExpandable 折叠体验（三轮拉锯） | ✅ fire-code-rag 全内联；ai-workflow 四卡底部大按钮就地展开 | case-expandable-title-toggle（被替代）、case-expandable-final |
| 3 | 图片三件套：破格 880px + 圆角 12px + 图注新规格 | ✅ | workimage-breakout-brief |
| 4 | 图注体检两轮：mono 栈补中文 + 12 条图注标签→描述句 | ✅ | caption-upgrade-brief、caption-round2-brief |
| 5 | og 名片：metadata + og 大图 + favicon | ✅ 微信卡片实测通过 | og-card-brief |
| 6 | 字体战役：自托管搬家 → 子集化两刀 → serif-cn 归一 → font-sans 勘误 → 真粗体 bug 修复 | ✅ 全站零切片、一次换装 | font-selfhost、font-subset、font-subset-round2 + 两段行内指令 |
| 7 | 性能收官三件套：next/image 迁移 + 003 空白修复 + preload 微调 | ✅ 详情页 6.8MB→≤2MB | launch-readiness-brief |

---

## ③ 具体推进与当前现状

### 战役 1 · 语气修订（去求职感）

顺序按"病最重先治"：05 ai-workflow → 03 job-decision → 04 nanobanana → 02 fire-code-rag。（01 visual-standard-assistant 在本场之前已完成。）

**05 ai-workflow**：§01 砍"作品集要证明"+防御性"不是…而是"；§04 证明→呈现；§05 砍"作为创作者需要写清楚"；§06 砍"不只是让一个人用得起来"；§07 一句话定位去"我擅长"；四张卡 whyItMatters 去"测试"腔、whatItProves 砍防御尾巴（删 2 条冗余 bullet）。**组件级改动：CaseExpandable 显示标签 "What it proves" → "Findings"**（prop 名 whatItProves 保留）。

**03 job-decision**：titleCn 改为「半自动化 JD 决策工作流」（titleEn 不变）；清洗 建筑专业/转行/HR划走/被秒拒/疲惫吞没/五一假期；§02 诉苦→"反馈周期长、信号稀疏"；§04 path3 →"当前主流程，已处理 108 个岗位"；§06/§07 回复率改"取决于市场，超出本工作流范围"（去时间锚点）；§07 自证句"不是技术做不到自动投递，是："→"原因有三："；"准备面试"→"打磨作品"。保留 §04 Failure Postmortem、§07 半自动三条理由。

**04 nanobanana**：§04 标题「我做了什么 My Contributions」→**「设计与验证 Design & Validation」**；5 条 EN bullet 去 "I designed/built"；§01 砍"不是成熟生产工具，而是"；§02 "我希望验证"→"这个原型要验证的是"；§05 "我将…制作成了"→"被整理成"；§07 "我更愿意定义为"→"它更适合被理解为"。保留 §06 case_04a/04b 验证、§07 "并不一定比直接对话更高效"。

**02 fire-code-rag（两轮）**：R1——§05 whyItMatters 去"验证我不只是会配置…能自己写出来"；whatItProves/Takeaways 能力宣称→findings（Claude Code 落地为意译版本，作者验收接受）。R2（X1–X4）——X1 §05 首段重写为"Coze 和 Dify 给出的是 RAG 的产品形态…LangChain 版本换一条路，完全用代码实现同一套管线"；X2 .env 条改"密钥与配置分离——API key 走 .env + .gitignore，不进版本库"；X3 加路标段（**后又撤销**，见战役 2）；X4 §03 In-Scope Test 重标 "Dify · 经济索引(关键词)/高质量索引(语义)" + Coze·Hybrid，"犯错→修正"重构为受控对比。

### 战役 2 · CaseExpandable 三轮拉锯（"开关和电灯分家"）

- **病灶**：折叠卡的展开触发器与展开内容空间分离——按了开关，"灯"在老远的地方亮，用户以为没反应。作者一眼诊断，且指出 ai-workflow 四卡同病。
- **弯路 R1**（已撤销）：把开关整合进标题行 + 卡片上方加路标句——开关与内容依然分家，路标反而添乱。
- **终案 R2（现行架构）**：
  - **fire-code-rag 卡**：新增 `alwaysOpen` prop，**全内联零折叠零按钮**——最硬的技术底牌（GitHub·代码·决策·测试）大方摊开，作全篇压轴；
  - **ai-workflow 四卡**（默认档）：标题行回归纯标题；**底部一个明显的大按钮**（chevron + READ FULL CASE），点击后内容**在按钮正下方就地展开**；默认折叠；Scenario/Why/Findings 常显；
  - `expandHint` prop（R1 中间产物"内含 GitHub·代码·测试"）**整体移除**；X3 路标句从 MDX 删除。
- 顺手战果：Claude Code 在此役顺带修了一个 bug（作者原话确认）。

### 战役 3 · 图片三件套（`components/mdx/WorkImage.tsx`）

- **破格（breakout）**：正文列不动，figure 最大 **880px** 居中对称探出。公式：`width: min(880px, calc(100vw - 3rem)); margin-inline: calc((100% - min(880px, calc(100vw - 3rem))) / 2)`；替换原 `max-w-[900px] mx-auto`；父容器不得 overflow 裁剪；真图与 placeholder 同规则。
- **圆角**：inline 图与 placeholder `rounded-xl`（12px）；Lightbox 全屏不加。
- **图注规格**：`font-mono text-ink-muted text-[13px] tracking-[0.05em] leading-[1.6] text-left mt-4`（自 11px/0.08em/居中/mt-3 升级）。13px 的裁量依据：等宽字体视觉分量大，13px mono ≈ Anthropic 14px 斜体；不用斜体（中文无真斜体）。
- 设计源头：Anthropic 文章页"窄文宽图"两种宽度的节奏；其脚注实测反推 ≈14px/1.25 行高/斜体/与图同宽——取神（同宽左对齐）不取形（斜体）。

### 战役 4 · 图注体检两轮

**根因 A（渲染）**：mono 栈无中文成员——Geist Mono 不含汉字（DevTools 实测仅 93 个拉丁字形），中文长期落到系统替补，13px 下笔画挤压。修复：mono 栈插入 `'Noto Sans SC'`（`'Geist Mono','Noto Sans SC',ui-monospace,monospace`）。表格表头等全站 mono 中文一并受益。
**根因 B（体裁）**：标签式短图注（无谓语）左对齐后像"贴歪的名牌"。裁决：**不搞两套对齐**，从内容下手，全部升级为描述句（"——"引出角色/机制从句）。

**12 条最终图注文案（终版，均已上线）**：

nanobanana ×5：
1. `Nanobanana 建筑生图工作台——两阶段生成流程的本地操作界面。 / The Nanobanana workbench — the local interface for the two-stage generation workflow.`
2. `Round 2 锚点图——case_04a 与 case_04b 两版结果共同的出发底图，锁定几何与构图基准。 / Round 2 anchor — the shared base image both case_04a and case_04b were generated from, locking the geometric and compositional baseline.`
3. `case_04a · 保守版结果——从 Round 2 锚点图出发，修改幅度取保守档。 / case_04a · the conservative pass — generated from the Round 2 anchor with a minimal change budget.`
4. `case_04b · 推进版结果——同一张锚点图出发，允许更激进的修改幅度。 / case_04b · the aggressive pass — from the same anchor, with a wider change budget.`
5. mvp-demo 补英文：`界面支持当前项目状态、最新输出图、前后轮对比、历史轮次回看与本地路径提示。 / The interface tracks current project state, the latest output, before/after comparison, round history, and local file-path hints.`

visual-standard-assistant ×3（A→B→C 构成论证线：品类适配正例 → 跨品类正例 → 范式反例；事实取自线上判定卡）：
6. `案例 A · 婴童护理 mock 主图（虚构品牌 NUBLOOM，AI 生成）——判图模式的测试样张：整图送入工作流，输出综合判定与逐项修改建议。 / Case A · an AI-generated mock baby-care hero image (fictional brand NUBLOOM) — test input for judge-image mode: the full composition goes in, an overall verdict and item-level fixes come out.`
7. `案例 B · 抗老精华 mock 主图（虚构品牌 VELSAINE，AI 生成）——功效型正例：换一个品类验证同一套语法，判定为「高度接近」。 / Case B · an AI-generated mock anti-aging serum hero (fictional brand VELSAINE) — an efficacy-driven positive: the same grammar tested on a different category, judged "highly aligned."`
8. `案例 C · 高端海报型 mock 主图（虚构品牌 VELSAINE，AI 生成）——品牌驱动反例：靠品牌氛围而非功效说服，被范式判别轴识别为「部分接近」。 / Case C · an AI-generated mock premium poster-style hero (fictional brand VELSAINE) — a brand-driven negative: persuading with brand mood rather than efficacy, caught by the paradigm axis and judged "partially aligned."`

fire-code-rag ×4（事实经作者/截图核验：LCEL 链 = retriever|format_docs → prompt → llm → StrOutputParser；仓库 step2→step5 分步脚本）：
9. `Coze 版正向测试的实际回答——目标条文第 1.0.2 条被逐字召回，未出现改写或杜撰。 / The Coze build on the in-scope test — target Clause 1.0.2 recalled verbatim, with no paraphrase or fabrication.`
10. `LangChain 版的 GitHub 仓库首页——从零手写的完整 RAG 管线，按 step 脚本分步组织。 / The GitHub repo for the LangChain build — the complete hand-written RAG pipeline, organized as step-by-step scripts.`
11. `step5_rag.py 的核心 LCEL 链路——检索、Prompt 组装与生成显式串成一条链，每一步取舍可见。 / The core LCEL chain in step5_rag.py — retrieval, prompt assembly, and generation wired explicitly into one chain, every decision visible.`
12. `测试 1 + 测试 2 的命令行原始输出——正向召回与超纲拒答，两组行为一屏对照。 / Raw command-line output of Tests 1 and 2 — in-scope recall and out-of-scope refusal, side by side.`

（job-decision 的两条图注原本即描述句，未动。）

### 战役 5 · og 名片（分享卡片 + favicon）

- 病灶：无任何 og 元信息，微信卡片仅标题、无描述、配图为 Vercel 默认 favicon（三角形）。
- 落地：`app/layout.tsx` metadata（metadataBase=hclai.studio、title 模板 `%s — H.C. Lai`、openGraph、twitter）；`app/opengraph-image.tsx`（satori/ImageResponse，1200×630，cream #F2EFE9 底、"H.C. Lai" Instrument Serif 150px ink、副行 38px ink-muted、左对齐左边距 110px、不用 terracotta）；`app/icon.tsx`（512×512，cream 底 + "H." 300px）。
- 定稿文案：title `H.C. Lai — Designer of spaces and systems.`；description `五个 AI 项目的完整记录：从视觉标准判定到手写 RAG 管线。`
- 微信实测：新卡片通过（注意微信有卡片缓存，测试时可临时加 `?v=2`）。

### 战役 6 · 字体战役（本场最大工程）

**阶段 0 · font-display 陷阱**：`chiron-sung.css` 109 条 @font-face 用 `optional`（6/11 提交，本意零闪动）——100ms 窗口内加载不完即本次渲染永久放弃，而 11MB/109 片不可能赶上 → **真实访客首访 100% 看不到昭源**。裁决：全部改 `swap`（Noto 与昭源同为宋体近亲，FOUT 代价天然小；中间档 fallback 两头不讨好，弃）。

**阶段 1 · 自托管搬家**（font-selfhost-brief）：
- 盘点：Google CDN 侧为 Instrument Serif（2 style）+ Noto Serif SC（2 weight）+ Noto Sans SC（2 weight）共 206 个 woff2；昭源本就同源（npm 包构建拷贝）；Geist/Geist Mono 本就 next/font/local。
- 迁移：206 文件落 `public/fonts/`（instrument-serif 4 文件 52KB / noto-serif-sc 101 文件 5.9MB / noto-sans-sc 101 文件 4.5MB）；新建 `app/fonts/google-fonts-local.css` 408 条 @font-face（unicode-range 切片结构完整保留）；layout 移除 Google link/preconnect；preload Instrument latin regular+italic；`/fonts/:path*` 加 `Cache-Control: public, max-age=31536000, immutable`；repo +10.4MB。
- 验证：45 条字体请求全同源，零外域。
- 附带更正：姐姐曾猜昭源住 jsDelivr——猜错，它一直同源。

**阶段 2 · 子集化第一刀（昭源）**（font-subset-brief）：
- `scripts/subset-fonts.mjs`（subset-font/harfbuzz）：扫描 content+app 23 文件 → 1039 唯一字符（含 ASCII+中文标点安全底座）→ 产出 `chiron-sung-hk-subset.woff2` **241.9KB**，取代 109 片。
- 源文件波折：官方 npm 包/GitHub Release 均无完整 VF；从第三方 `@fontpkg/chiron-sung-hk-vf` 取得 82MB TTF；因 harfbuzz-wasm 内存放不下，先用 Python fontTools 预固定 wght=400 得 28MB 静态源（一次性，产物落盘；日常裁剪不需 Python）。源文件 gitignore，仅子集产物进仓库。OFL-1.1 允许裁剪分发。
- 旧管线清理：chiron-sung.css、copy 脚本、npm 依赖、public 生成目录全部移除。
- npm 仪式确立：**内容更新后跑 `npm run subset:fonts` 再 push**；漏跑不开天窗（新字由 Noto 顶班混搭）。

**阶段 3 · 子集化第二刀（Noto 两职）**（font-subset-round2-brief）：
- Noto Sans SC（400/700 实际用档）与 Noto Serif SC 700 各裁单文件；**Noto Serif SC 400 切片留任**作最深兜底。
- 首页实测：请求 18→13 条；体积 1.22→1.36MB——**体积微涨属预期**：切片按页发货天然小，子集按全站发货但跨页零重复、缓存一锁全站再无切片风暴。

**阶段 4 · 考古发现：双宋体并行**：`font-serif-cn`（Tailwind 类）系昭源入住前的旧线，直通 Noto Serif SC——About 段落、Work 列表中文简介、JudgmentCard 一直穿 Noto 上班（非兜底，是主用）。裁决选项 2：映射改 `['Chiron Sung HK','Noto Serif SC','serif']`，全站中文衬线归一于昭源。作者验收 About/粗体/判定卡通过。

**阶段 5 · 真粗体 bug（Claude Code 像素级实测抓获）**：`.prose-works strong` 虽设 `font-synthesis-weight: none`，但浏览器按 family 顺序点将**不因字重缺档跳下家**——昭源（仅 400）站首位，粗体一直以 400 字形上台，"变粗"从未发生（伪粗体又早被禁）。修法：**粗体语境把昭源移出 family 列表**，让 Noto Serif SC 700 正面接管；同步打在 `.prose-works strong` 与 `.font-serif-cn.font-bold/.font-semibold`，纯 400/纯 700/混合栈三行像素对比验证。

**阶段 6 · font-sans 勘误**：Tailwind `font-sans` 的中文兜底误填 Noto **Serif** SC（衬线混入无衬线栈）——判定徽章"✅ 高度接近"因此穿衬线并拉 4 片切片。改为 Noto **Sans** SC；全站排查确认仅徽章一处中文走 font-sans。改后 visual-standard-assistant 页字体请求 **6 条、切片归零**（Instrument ×2 + 昭源子集 + Sans 400/700 子集 + Serif 700 子集）。

**字体最终架构（现行）**：
- 英文：Instrument Serif（自托管 4 文件，preload regular+italic）；Geist / Geist Mono（next/font/local）
- 中文正文衬线：昭源子集（241.9KB，wght 固定 400，family 'Chiron Sung HK'）→ Noto Serif SC 400 切片（深兜底，几乎不触发）
- 中文真粗体：Noto Serif SC 700 子集；粗体规则将昭源移出栈
- 中文无衬线：Noto Sans SC 400/700 子集（标题/图注/表头/徽章）
- mono：Geist Mono → Noto Sans SC 兜底中文
- 全部 `font-display: swap`；`/fonts/*` immutable 缓存；preload 终版 = Instrument ×2 + 昭源子集 + Sans 400 子集（700 系不 preload，swap 自然到场）

### 战役 7 · 性能收官三件套（launch-readiness-brief）

- **A · next/image 迁移**：WorkImage `<img>` → `<Image>`（sizes="(max-width:920px) 100vw, 880px"，quality 80，懒加载，圆角/hover/Lightbox 保留；Lightbox 走 1760 档优化图；原图保留仓库）。战果：详情页 6.8MB → ≤2MB；mock-a/b/c 由各 ~1.8MB PNG 压至 ≤300KB 档；移动端 srcset 再省一半以上。
- **B · 003-Contact 弱网空白**：查因为入场动画类"初始隐藏等 JS"模式；修复原则**内容默认可见、动画是增强**（JS 就绪后才接管动画；尊重 prefers-reduced-motion）；同模式全站一并修。
- **C · preload 微调**：见字体终版清单。

### 最终性能画像（5G 流量、不挂梯实测）

| 指标 | 战前 | 战后 |
|---|---|---|
| 黑屏/白屏 | 5–15s | 消除，<10s 整页可读 |
| 字体换装 | 逐字连续剧 1–2min | 一次换装 5–10s |
| 003 区块 | 长时间空白 | 与 001/002 同批可见 |
| 详情页总重 | 6.8MB | ≤2MB |
| 首页字体请求 | 切片风暴 | 个位数、零切片 |
| WiFi（手机+电脑） | 有变脸 | **零感知** |

**已明确的天花板**：剩余弱网延迟为境内↔Vercel 国际路由本身（约 20–30KB/s 实测车速），字体/图片侧已打满。终极解（ICP 备案 + 国内 CDN）定性为独立未来项目，个人作品站可不做。作者判断"已经很满意"——专业判断，非将就。

---

## ④ 待办 / 下一步

1. **发朋友圈**（唯一剩余动作，等作者挑时辰）：推荐方案 = 首屏 + 内页截图数张（如 A/B/C 判定段、破格大图页）+ 文字写明 `hclai.studio` + 文案「我的个人网站已上线🥂」；og 卡片已修好，兜住转发/私发场景。
2. **新对话 · 截图重做卡片工程**（发布后启动）：开场先做全站图片分诊，带上分类刀——**证据型**（CLI 原始输出、Coze 实际回答、GitHub 首页：重画=毁证据感，保留截图本色）vs **信息困在截图型**（Dify 工作流全景、CSV 表格：值得重做成图示/卡片/真表格）。
3. **上线后迭代小本本**（无阻塞项）：
   - Georgia 客串的 3 个字形（图注中个别符号落到栈尾 Georgia）——完美主义模式再查；
   - （可选）ICP 备案 + 国内 CDN——另立项目级；
   - （可选）next/image blur placeholder 等锦上添花。
4. **维护仪式（长期）**：新增/修改中文内容 → `npm run subset:fonts` → push。漏跑不塌（Noto 顶班混搭），跑一次归队。
5. **知识库维护**：本档存入项目知识库；协作指令按 §⑥ 更新稿替换。

---

## ⑤ 我们的协作方式（本场验证 + 新增沉淀)

**既有原则（本场反复验证有效）**：
- 无条件信任作者的视觉/体验直觉——"这感觉不对"本场再次全胜（折叠分家、图注压扁、双宋体违和感等均由作者先察觉）；
- 诊断先于方案，根因用类比讲透；
- brief ready-to-paste、规格钉死（色值/字号/公式/文件路径）；一份 brief 一个战役；
- 一次只拍一个板；事实核对先于发车（图注机制描述逐条请作者确认，或直接读线上原文取证）;
- 节奏 > 速度；大工程独立开新对话。

**本场新增沉淀**：
- **先取证后动刀**升级为硬流程：DevTools Rendered Fonts / Network 称重 / Slow 3G 复现 / 像素级三行对比——凡"感觉慢/怪"，先拿数字定罪再写 brief;
- **验收看数字**：每份 brief 自带可量化验收指标（请求条数、transferred 总量、单文件体积上限），Claude Code 报告须含前后对照;
- **Claude Code 的"诚实报告"范式**：主动上报"体积反而涨了""比你预想更深一层的坑""我没擅自动的设计决策"——此协作质量应在 brief 中继续鼓励（明示"发现 X 不要自行改，列出待作者定夺"）;
- **终点线纪律**："发射资格 = 收官 brief 落地 + 走查通过"，此后一切新瑕疵归入"上线后迭代"，不再阻塞发布——对抗完美主义的"最后一点点"无限再生。

---

## ⑥ 协作指令更新稿（ready-to-paste，替换旧条目）

**技术栈段替换为**：
```
Next.js 14 (App Router) + TypeScript + Tailwind + CSS variables 双轨 token；
字体全部自托管于 public/fonts/（无任何第三方字体 CDN），中文字体子集化：
昭源宋体/Noto 均为按全站字符裁剪的单文件子集，font-display: swap，
Noto Serif SC 400 保留 unicode-range 切片作深兜底；
维护仪式：新增/修改中文内容后跑 npm run subset:fonts 再 push；
图片经 next/image 优化管线（WebP/响应式/懒加载）；
GitHub (s1mple4869/hc-lai-site，SSH) → Vercel 自动部署；域名 hclai.studio。
```
（旧条"字体用 Google Fonts CDN link 标签加载（不用 next/font/google，不用 localFont）"**整条作废**——Geist 系本就走 next/font/local，禁令与现实不符且已无必要。）

**当前进度段替换为**：
```
当前进度：发布就绪（发射资格达成）。五篇案例详情页全部上线并完成去求职感定稿；
折叠组件、图片破格/圆角/图注、og 分享卡与 favicon、字体自托管+子集化、
next/image 性能收官均已完成。待办：发布朋友圈；下一工程（新对话）：截图重做成卡片。
```

**设计 token 段补充一行**：
```
中文字体职分：昭源宋体（正文衬线，仅 400）/ Noto Serif SC 700（中文真粗体，
粗体语境将昭源移出栈）/ Noto Sans SC（中文标题、图注、表头、UI 徽章）/
mono 栈中文兜底为 Noto Sans SC。图注规格：mono 13px / 0.05em / 1.6 / 左对齐 / 与图同宽。
```

---

## ⑦ 可复用诊断框架 & 经验教训

1. **开关和电灯要在同一个房间**——触发器与结果必须同一视觉区域；点了"像没反应"= 分家了。（本场三轮拉锯的总病根，已入原则库。）
2. **体裁与排版打架时，从内容下手**——短标签左对齐像贴歪的名牌；不要为它另立对齐规则（系统感碎裂），把标签升级成描述句。
3. **字体栈的每个语种都要点名**——拉丁字体不含 CJK；凡混排栈（mono/sans/serif）必须显式安排中文座位，否则系统替补裸奔（小字号下笔画糊）。
4. **`font-display: optional` 是"回头客专享"陷阱**——首访几乎必然回退且本次渲染永不再换；对外分享场景 = 100% 首访，慎用。
5. **可变字体的 DevTools 假象**——Rendered Fonts 显示的是文件内部注册名（常为轴原点如 Thin/ExtraLight），非实际渲染字重；以 computed font-weight 与肉眼笔画为准。
6. **浏览器按 family 顺序点将，不因字重缺档跳下家**——首位家族缺 700 时会用其 400 照演；真粗体需在粗体语境把缺档家族移出栈。伪粗体禁令 + 缺档首位 = "粗体从未发生"的隐形 bug；肉眼在小字号下会被"沾光变重"错觉骗过，需像素级三行对比定罪。
7. **切片 vs 子集的账**——切片按页发货单页最省但跨页反复风暴；子集首页略贵但全站一次买齐、缓存永锁。优化目标是"每页都稳"不是"单页最省"。
8. **加载条 ≠ 读者体验**——先问"几秒可读"，再问"几秒加载完"；懒加载会拉长进度条但改善体验。
9. **Rendered Fonts 取证要选对证人**——右键的元素只汇报自身用到的字体；查中文字体必须右键中文正文（英文元素只有拉丁演员）。
10. **内容默认可见，动画是增强**——禁止初始 opacity-0 等 JS 救场；弱网下 JS 迟到即区块空白。
11. **"证据 vs 图示"分类刀**（下一工程的第一刀）——原始输出类截图重画=毁证据感；信息被困的截图才值得重做。
12. **微信分享卡有缓存**——og 改动后测试加 `?v=N` 强刷。
13. **境内可达性三件套**——同源发货（自托管）+ 轻装上阵（子集化）+ 插队到场（preload）；此后的慢是路由天花板，属基建不属前端。

---

## 附 · 本场交付 brief 清单（均已执行）

1. ai-workflow-tone-revision-brief.md
2. job-decision-tone-revision-brief-v2.md（v1 作废）
3. nanobanana-tone-revision-brief.md
4. fire-code-rag-tone-revision-brief.md
5. fire-code-rag-fix-round2-brief.md
6. case-expandable-title-toggle-brief.md（方案被终案替代）
7. case-expandable-final-brief.md
8. workimage-breakout-brief.md
9. caption-upgrade-brief.md
10. caption-round2-brief.md
11. og-card-brief.md
12. font-selfhost-brief.md
13. font-subset-brief.md
14. font-subset-round2-brief.md
15. launch-readiness-brief.md
（另有两段行内指令：font-serif-cn 接入昭源；font-sans 中文兜底 Serif→Sans。）

**已撤销决策记录**（防止未来重新引入）：
- CaseExpandable 标题行开关（R1 方案）——因开关与内容分家撤销；
- `expandHint` prop 及"内含 GitHub·代码·测试"提示——随全内联方案失去挂载点，整体移除；
- fire-code-rag §05 路标段（中英两段）——已从 MDX 删除；
- `font-display: optional`、Google Fonts CDN link、109 片昭源切片管线——全部退役。
