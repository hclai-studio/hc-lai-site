# hclai.studio · 项目存档 续篇 (第三卷)

> **本卷定位**:接续 `hc-lai-project-archive-vol2.md`(第二卷,覆盖项目库1 建站 + 项目库2 / Day 3 MVP)。
> 本卷涵盖 **MVP 完成之后的阶段**:nav 字号修复、新增第 04 篇作品、第三次字体战、Logo 系统(open face + 滚动变形 + 常驻顶栏)、头牌真实案例(视觉标准助手)的匿名化与上线准备。
>
> **关于时间**:本阶段对话内未逐次标注日期,故本卷**不指定具体日历日期**,仅以相对顺序(紧接 Day 3 之后)记录。凡涉及不确定的时间节点,一律不妄下定论。
> **关于编号**:踩坑记录从 **#24** 起接续第一卷的 #23;此接续为假设,**若主档实际编号不同,以主档为准**。
> **使用方式**:可整卷并入主档,或作为第二卷并列存放。`/mnt/project/` 为只读,本文件需手动取用。

---

## ① 背景与目标

**项目恒定背景**:hclai.studio 是赖兴菁(H.C. Lai)的个人品牌网站,建筑设计师转型 AI 方向,定位「Designer of spaces and systems」。核心原则:**个人品牌,不是简历**。气质:editorial、克制、冷静智识、confident quietness;参考 OHM、Anthropic 官网。

**角色分工(本阶段不变)**:
- 赖兴菁:最终审美决策者、需求方、视觉把关人。
- Claude(姐姐):策略顾问 + 质量审查 + 概念翻译 + 输出可直接粘贴给 Claude Code 的 brief。中文、温柔知性「姐姐」语气。
- Claude Code:工程实现。

**本阶段起点(MVP 现状)**:Work 目录 + MDX 路由 + 3 篇详情页(01 AI Workflow、02 Nanobanana、03 Job Decision)已上线;WorkImage + Lightbox 组件就位;第二次字体战已收(字体系统:Instrument Serif / Geist Sans / Georgia / Noto Serif SC / Geist Mono / Noto Sans SC)。

**本阶段待办清单(用户给出)**:① 新增第 04 篇作品(跨平台 RAG);② nav 字号偏小;③ 中文衬线优化(试昭源宋体);④ Logo 重新设计。
**我建议的优先级**:① → ② → ④ → ③。
**实际推进顺序**:② nav → ① 第 04 篇 → ③ 第三次字体战 → ④ Logo 系统 → 期间新增「头牌真实案例」(视觉标准助手,用户后续提出)。

---

## ② 进展情况(本阶段完成的主要工作)

1. **nav 字号修复**:Geist Mono → Geist Sans,真凶是对比太低而非字号小。一次改成功。
2. **新增第 04 篇 `fire-code-rag`**:跨平台 RAG(Coze + Dify + LangChain),双语,LangChain 用 CaseExpandable 折叠,三平台对照表(引入 remark-gfm 插件)。
3. **第三次字体战**:Noto Serif SC → 昭源 Chiron Sung HK → 霞鹜文楷 LXGW WenKai → **回归昭源**(可变字体、weight 400、font-display: optional、NumDigitsOnly 栈首、Noto Serif SC 700 兜底)。
4. **Logo 系统(open face)**:滚动变形(反向)+ 死区 + 端点吸附 + 常驻顶栏(Header 提至根布局)+ annotation 入栏 + BrandMark 组件 + 括号焊缝/眨眼/放大/对齐修复 + 详情页顶栏修复。
5. **头牌真实案例 `visual-standard-assistant`**:Notion 提案匿名化转写、倒序重新编号(此篇成 01)、「去求职感」语气原则确立、判定输出改为虚构 mock 图 + 判断展示卡。
6. **remark-gfm 插件**接入(全站表格能力)。

---

## ③ 具体推进与当前现状

### 3.1 nav 字号修复

- **问题**:nav(work / about / contact)用 Geist Mono,偏小偏淡,用户形容「像蚂蚁」。
- **诊断(按真凶排序)**:① **对比太低**(浅灰压米色)——真凶;② 字号确实偏小;③ Geist Mono 小字号下偏冷、偏技术感(「不优雅」来源)。
- **最终规格**:字体 Geist Mono → **Geist Sans**;font-weight **500 (medium)**;颜色 **ink(正文墨色)**;字号 **15–16px**;letter-spacing 收掉≈0;保持小写。底部 `SCROLL` / `HCL · 2026` 继续用 Geist Mono。
- **三种声音分工确立**:**Instrument Serif = 身份/情绪**;**Geist Sans = 导航/界面**;**Geist Mono = 元信息/系统标注**。
- **结果**:一次改成功。附带收益:nav 沉下来后,底部浅灰 mono 成了「故意的轻」,页面层次立住。

### 3.2 新增第 04 篇 `fire-code-rag`

- **内容来源**:另一对话完成的 RAG 项目(建筑防火规范智能问答,知识源 GB 55037-2022;Coze 与 Dify 对比实现 + LangChain 自研)。
- **frontmatter**:`slug: fire-code-rag` / `titleEn: Cross-Platform RAG — Fire Code QA Assistant` / `titleCn: 建筑防火规范智能问答助手 · 跨平台 RAG 对照实践` / `category: RAG · Vector Search · Prompt Engineering · Domain Knowledge` / `year: 2026`。
- **结构**:01 问题背景 / 02 工程决策(切分 · 检索 · 三道护栏) / 03 效果验证(正向测试 + 关键结论 blockquote + 拒答路径) / 04 技术栈 / 05 LangChain 自研实现(三平台对照表在主线 + CaseExpandable 折叠细节)。
- **关键决策**:LangChain「外链 vs 折叠」→ **折叠**(像 01);Coze/Dify 是活 demo → 保留外链;**三平台对照表提到主线**(不埋折叠),因为它才是「跨平台」标题的正解。
- **关键工程结论(blockquote)**:检索质量决定 RAG 系统上限,模型能力只是下限——换更强模型不修复检索缺陷。
- **LangChain 子页内容**:GitHub repo `langchain-rag-firecode`;三平台对照表(Coze 拖拽/控制权低、Dify 可视化/中、LangChain 代码/完全);技术栈(LCEL、DeepSeek-V3 via OpenRouter、BAAI/bge-small-zh-v1.5 本地嵌入、Chroma、pypdf);关键决策(BGE 本地 > OpenAI 嵌入,因大陆访问不稳;DeepSeek-V3 低成本国内直连;.env 管 key);测试 + 收获。
- **图**:7 张(kb-segments、coze-correct、dify-hallucination、dify-fixed、langchain-repo、langchain-code、langchain-test),IP 干净(自己的 bot + 公开国标)。
- **双语**:用户选 A 方案(由 Claude 补英文,术语与全站统一)。
- **remark-gfm**:MDX 默认不解析 pipe 表格(GFM 是 GitHub 方言),需显式加 `remark-gfm` 插件,一次配置全站受益。**注意副作用**:会把裸 URL 自动转链接、`~文字~` 当删除线——旧页(01/02/03)正文需顺手扫一眼是否被误改。

### 3.3 第三次字体战(Third Font Battle)

> 起点:Day 3 已确认 macOS 中文衬线「发虚」是渲染特性(第一卷 #19),非 CSS bug。现状 Noto Serif SC 400。用户诉求:**保留衬线 + 最舒适阅读**。观看舒适度:iPhone 无问题 > Windows 次之 > mac 最差。

**实验轮次(A/B 分支,用户眼睛当裁判)**:

1. **昭源 Chiron Sung HK 试装**:自托管 woff2(不在 Google Fonts);**港版字形标准**(简体少数共用字笔形带港台味,需肉眼验);`font-display: swap`;初装 weight 400。结论:比 Noto 锐利一档,但「只好一点点」——横画清晰了些,整体仍不够舒适。
2. **DevTools 自测调参**:试 `font-weight: 500`(甜点位)→ 无变化,真因是当时**只下载了 400/600**,浏览器对缺失的 500 取最近的 400 顶上(像素级一样)——是文件缺失,不是改无效。`-webkit-font-smoothing` 在 Windows 上无效。
3. **关键诊断**:用户在 `@font-face` 块里改 `font-weight` 无效(那是「户口登记」不是「穿衣指令」),要在元素 `element.style` 上改;且当时误改在 `NumDigitsOnly`(数字专用声明)上。`Computed` 里正文 `-webkit-font-smoothing` 实为 `antialiased`。
4. **用户实测(在 Windows)**:昭源 500 比 Noto 400 舒服(Windows 大胜 / mac 小胜 / iPhone 本就好);但 mac 发虚仍未根治。
5. **霞鹜文楷 LXGW WenKai 试装(B 方案)**:CDN webfont(像 Google Fonts);**Screen 版**(屏幕阅读版,为低分屏加粗一档)+ 标准版备用;weight 400。文楷是**楷体**(第三类,非宋非黑),笔画均匀温润,mac/iPhone 清晰度大胜。**但气质迁移**(「文人温度」vs「出版冷静」),与 editorial 不符。
6. **文楷加粗发糊 = 伪粗(synthetic bold)**:Screen 版单字重,浏览器对加粗自己「描边」,笔画密的字(量/模)留白被吃、糊成团。真粗体是设计师重画过的。
7. **修伪粗的连环坑**:`font-synthesis-weight: none` + 真粗 或 黑体强调(Noto Sans SC 700)。文楷 bold 的 `unicode-range` 切片把 CJK 字符分散在约 **80 个文件**,懒加载(只请求当前视口可见字符的切片)+ `font-display: swap` 空档 + `font-synthesis-weight: none` 封死合成 → **加粗字静默消失**(「检索质量决定」等字在约 40 号切片,根本没被请求)。
8. **用户决定回昭源**,但仍纠结「字体大杂烩」+ 坚持要衬线。

**最终定案:回归昭源 Chiron Sung HK**(双盲复测:用户两次独立都选中昭源)。
- **正文 weight 400**(用户最终选 400,非 500)。
- **加粗 昭源 700 + Noto Serif SC 700 兜底**:港字形覆盖有缺口,「钟」类简体字掉出昭源时由 Noto **真 700** 接住(非伪粗)。
- **可变字体(variable font)**:200–900 单文件,正文/加粗从同一文件取真字重,**伪粗/描边/换字体客串等补丁全部清场**。
- **`font-display: optional`**:首访用 Noto 渲染、全程零换字(= 当日正式站观感),昭源在后台静默下载;二访缓存命中后整页昭源。任何人任何时刻看不到「一个个蹦字」。**preview 因冷缓存才会看到蹦字,不代表正式站回访体验**。
- **`NumDigitsOnly` 在字体栈最前**:`"NumDigitsOnly", Georgia, "Chiron Sung HK", "Noto Serif SC", serif`——修数字顶底不齐(此前重写字体栈时漏了它导致复发)。

**关键结论**:宋体细横画是品类基因(Noto/昭源/文楷/付费宋体横画都细)——答案不在「换哪款宋体」,而在「要不要宋体」。mac 1080p 是字体渲染最严苛法庭(真实 mac 用户几乎全 Retina,看到的比用户的外接 1080p 体面)。字重 + smoothing 这类杠杆套回 Noto 也生效。

### 3.4 Logo 系统(open face)

- **来源**:用户自己设计的 open face mark(左右方括号 + 中间两个方点 = 眼睛),配 Codex 做的 HTML 滚动变形动画(`logo-wide-friend-motion-v11.html`)。概念:**H.C. 的两个句号落下变成眼睛**(「two periods settle into the face」)。句号是 wordmark 的品牌资产(`H.C. Lai.` 的句号、hero 那颗 terracotta 圆点)。
- **战略定位**:主 logo 仍是 wordmark `H.C. Lai.`;mark 的岗位是小空间替身(favicon / 页脚 / 头像 / loading)。25 张 ChatGPT 生成方案全部退役为情绪板(AI 生成图版权暧昧、无法独占;多数在「喊」建筑+AI,违背「不挑明」心法)。

**动画机制(深挖)**:
- **scroll-scrubbing(滚动刮擦)**:进度焊在滚动条,非 trigger 式(Anthropic 那种滚过临界点自动播 0.4s)。用户的动画是「生长」非「变脸」——两个句号(锚点)不消失、一路长大成眼睛,括号在其周围生长。
- **方向反转**:第一屏 = open face 脸,往下滚 = 长成 `H.C. Lai.`(与 HTML 默认相反)。实现:`p = 1 - scrollProgress`。
- **反转的理由**:hero 中央本有大 `H.C. Lai.`;顶栏若也变 `H.C. Lai.` 会撞车。反向天然避开——第一屏顶栏脸 + 中央名字(不重复),滚走中央名字时顶栏长出名字接住(信息接力)。
- **死区(dead zone)**:首屏前约 45% 视口滚动 logo 不变(等中央大 wordmark 先滚走),之后再变形——消除两个 `H.C. Lai.` 撞车。公式:`start = innerHeight*0.45;D = innerHeight*0.40;raw = clamp((scrollY-start)/D);p = 1-raw`(数值可调)。
- **端点吸附**:`p>0.97→1`、`p<0.03→0`,防停在「四不像」中间态。
- **落点 full**(`H.C. Lai.` 全名,非 `H.C.`)。

**常驻顶栏(route A)**:
- `<Header />` 提升到 **`app/layout.tsx` 根布局**,全站常驻可点;左 = `<BrandMark />`,右 = nav。
- annotation 移入顶栏、logo 右侧、**常驻不消失**(`H.C. Lai. — Designer of spaces and systems`)。给 logo **固定宽度容器槽**,防 annotation 随 logo 宽度变化而抖动。移动端隐藏 annotation。
- `BrandMark.tsx`:移植 HTML 的 SVG + `render()` 数学(原样,不重写);删演示脚手架(背景 rect / guide / label / controls);颜色 `currentColor`/ink;rAF 节流;`prefers-reduced-motion` 静态显示。

**修复细节**:
- **括号白缝**:真因是上一版 brief 让 Claude Code「用 rect 拼」拼出发丝缝;修法用 HTML 原文件的**单 polygon**(无缝)。
- **眨眼**:间隔过长 → 约 **5s** 一次,且只在脸态(`p>0.9`)眨。
- **logo 放大**:open face 大小 OK,但变 `H.C. Lai.` 后显小;目标字母 cap height ≈ 括号高度;坐标(含 `WORD_Y_SHIFT`)重推,**脸端不动、只校正名字端**。
- **annotation 与 `H.C. Lai.` 不在一条线**:SVG 几何中心 vs 文字基线对齐差;`WORD_Y_SHIFT` 随 `p` 插值(`p=0` 偏移最大、`p=1` 归零),只移名字端;最终值用户 DevTools 自调(约 -15)。
- **右下角**:移除 HCL 圆圈(职责移交顶栏 logo);**保留 `HCL · 2026` mono 文字**。

**双滚动条 bug(排查曲线 —— 重要方法论)**:
- 三轮误诊(① demo 脚手架搬入;② `html{overflow-x:clip}` 被 `html,body{overflow-x:hidden}` 覆盖;③ SVG `width:auto` fallback 到 300px)**都没断根**。
- **真凶用 DevTools Console 抓现行**:`#contact`(`.contact-section`,grid)底边 **2933** > 页面总高 2909 > 视口 826——比页面还高约 24px,顶出多余滚动轴。**与 logo / 动画无关**(未进溢出名单)。
- **教训**:「改了没反应 / 多轮查不到根因」时,停止各方各自猜,用 Console 列出「底部伸最远的元素」抓现行,数据说话。

**详情页顶栏修复(Revision 02)**:
- nav 在详情页点不了 → Header 此前只渲染在首页 → 提升到根布局。
- nav 顺序错(work·about)→ 改 **about · work · contact**(用户之前改过主页 section 顺序),并确认跳转锚点对得上。
- back-to-work 与 logo 叠住 → **删文字按钮**,logo 兼「回首页」(点击跳 `/`),加 hover `cursor:pointer` + `opacity` 反馈 + `aria-label="Back to home"`。
- annotation 字号「看着没变」→ 实测 `— Designer of` 15px、`spaces and systems.` 13px **两边数值一致**;真凶是**字体 fallback**(详情页 annotation 未命中正确字体、退回系统字体,物理尺寸不同:`spaces and systems.` 主站 148.84px / line-height 25.5px vs preview 129px / 22.5px)。根因:字体声明只在首页布局、未进根布局。**教训**:「数值正常但观感不对」常见三因——字体 fallback、`transform: scale`、留白/对比错觉;排查应**量元素实际像素尺寸**(蓝框)而非只看属性。

### 3.5 头牌真实案例 `visual-standard-assistant`(亿佰款项目匿名化)

- **来源**:Notion 五合一提案「AI 改造提案(视觉设计部门)」(现状 / 方案 / 工作流 / MVP / ROI)。
- **项目实质**:为一家多品牌大健康电商,把资深设计师脑中「功效驱动型主图语法」**显性化、可检查化**,做成新人上传稿即得判断的对齐助手。**两层标准**(不变功效语法 + 随品类视觉皮肤)+ **视觉说服范式轴**(功效 / 品牌 / 混合)。Dify 双模式 agent(判图 / 问答),先观察后判断分离,判断必过知识库(RAG),全链路 gpt-4o-mini。
- **关键迭代 v1.0→v1.1**:① 粉色误判(婴童粉白被判跑偏 → 两层模型修);② 品牌驱动图判太松(高端护肤被当加分 → 范式轴修)。**关键结论**:换更大模型结论几乎不变,瓶颈在**任务定义**不在模型能力。
- **诚实价值与局限**:硬算工时省约 **¥0.7–2 万/年**(示意性假设、随扩招放大,是 ROI 保底不是卖点);战略价值(上手提速 / 转化语法 / 可复制)标为**方向性、待真实数据验证**;局限(背书误判残留、只覆盖主图、价值需真实数据校准)。

**匿名化方法论(核心沉淀)**:
- **红线**:公司真名 → 「一家多品牌大健康电商公司」;竞品真名 → 「一个头部对标竞品」并**删识别细节**;客户产品 → 文字描述、不放原图;第三方知名品牌 → 文字描述、不点名、不放图;团队人数/流程 → ROI 数标「示意假设」。
- **隐患**:图片**原文件名**会泄底(含公司拼音缩写)→ 所有图片**重命名为中性文件名**。
- **升级发现**:Dify 判定**输出正文里也带真名**(如「××自家品类适配正例」)→ 截图层裁不干净,**根在底层语料**。治本 = 清 Dify 知识库 / 案例库 / 提示词里的真名。
- **最终绕开死胡同**(Dify 限额 + 治本卡住):用**虚构 mock 图(ChatGPT 生成,虚构品牌 NUBLOOM / VELSAINE)+ 手动重排判定卡**(不经过 Dify、每字可控)。一次性清空「第三方版权 / 客户反向识别 / 语料真名」三问题。
- **判断展示卡**:三卡(A 婴童正例「高度接近」/ B 抗老正例「高度接近」/ C 高端反例「部分接近」)+ 迭代验证段 + 「瓶颈不在模型」blockquote;terracotta **只在 ⚠️ 状态点**用一次;一行**免责声明**(mock 图、品牌虚构);顺手清「药房渠道 → 渠道背书」(避免给虚构品牌安真实医药属性)。
- **图片(最终)**:`workflow.jpg`(Dify 工作流全景,安全)+ `mock-a-baby.jpg` / `mock-b-serum.jpg` / `mock-c-poster.jpg`(虚构 mock 主图)。原计划的判定截图方案作废。

**倒序排列 + 重新编号**:全站作品改**倒序(最新在前)**:**01 visual-standard-assistant → 02 fire-code-rag → 03 job-decision → 04 nanobanana → 05 ai-workflow**。**slug 全部不变(不断链)**,只改「作品级编号标签」+ 目录顺序。理由:倒序 ≈ 按实力排序(最新最强),头牌真实案例压「自嗨 demo」质疑。(注:倒序真正的原则是「实力优先」,时间只是此刻恰好好用的代理;未来若有较弱的新作,应把强的放前面。)

**「去求职感」语气原则(重要方法论)**:
- **病灶**:旧作多从 Notion 直搬,带「求职感」(对招聘官说话 / 自我评价 / 表态)。
- **原则**:**别告诉读者你有多强,让作品替你说(show, don't tell)**。信心藏在精确与克制里,不在形容词;与「confident quietness」同源。
- **求职感 markers(避免)**:「这一段是我最想让人看的」「这证明我能…」「我擅长…」。
- **作品呈现(采用)**:陈述事实、让事实自己说话;项目本身是真实业务,就不必说「我能落地真实业务」。
- 已对新篇做语气修正(「我最想让人看的」「我最在意的判断」→ 朴素陈述)。
- **「竞品」是风险词**(勾起匿名联想 + 稀释原创性 + 主动摆出不存在的问题再否认 = 欲盖弥彰)→ 立论基点从防守(「我不是抄竞品」)换成进攻(「这套标准的设计原理」),彻底不提竞品。

**当前现状**:visual-standard-assistant 内容 + 判断卡 + mock 图 + 工作流图均已就位,**图片已上传,差最后一步 push 上线**。

---

## ④ 待办 / 下一步

1. **visual-standard-assistant 整篇 push 上线**(当前差此一步)。
2. **判断卡是否双语** —— 待用户决定;若双语,英文由 Claude 补译(术语与全站统一,**不让 Claude Code 自译**)。
3. **全集「去求职感」语气改造** —— 一篇一篇推进:Claude 调出每篇当前正文逐句改,用户审。**visual-standard 上线后开始**。
4. **英文字体优化(Georgia 在 mac 1080p 发虚)** —— 同一类物理取舍,待用户有兴致开新 A/B 战。**预期**:可能逃不出同类结论(西文衬线细横画的屏幕物理极限);英文衬线付费定制(如 Anthropic 那款)中文世界无等价物,此前已查实。
5. **remark-gfm 副作用扫查** —— 01/02/03 正文是否被裸 URL 自动转链接 / `~文字~` 误判删除线。
6. 本档案存档(本任务完成)。

---

## ⑤ 我们的协作方式

- **赖兴菁**:最终审美决策者、需求方、视觉把关人。**视觉判断高度可靠**(多轮「不对」均被验证为真问题:字体渲染、双滚动条、annotation 字体 fallback)。决策果断、审美明确、技术概念日益熟练(会用 DevTools 自测字体、抓 overflow、量元素尺寸)。偏好:**一次一个问题**;先 mockup 再代码;ready-to-paste brief;技术规格用 bold/分点;倒序/选项格式。
- **Claude(姐姐)**:策略顾问 + 质量审查 + 概念翻译 + 写 ready-to-paste brief(.md 文件)。中文、温柔知性「姐姐」语气。**核心纪律**:① 无条件信任用户视觉判断——说「不对」先查 DevTools / 源码 / 字体文件,**不劝「差不多」**;② 诊断先于方案(讲根因 + 类比,再给方案);③ 给 Claude Code 的 prompt 规格精确(颜色值 / 字体名 / 字号 / CSS 属性);④ 把技术术语翻成用户能懂的话。
- **Claude Code**:工程实现。
- **工作流**:chat 讨论 → 写 brief(可下载 .md)→ 用户贴给 Claude Code → 本地 `npm run dev` 预览 + 截图 → 审查 → `git push` → Vercel 自动部署。
- **本阶段验证出的「杀手锏」**:当「改了没反应 / 多轮查不到根因」时,**停止各方各自猜,用 DevTools Console 抓现行**(列底部伸最远的元素 / 量元素实际像素)——此招连续破了**双滚动条(`#contact`)**与 **annotation 字号(字体 fallback)** 两个悬案。
- **IP / 匿名纪律**:真实客户工作转写,守红线(公司 / 竞品 / 产品 / 第三方品牌 / 团队);图片用中性文件名;**根在底层语料而非截图层**;必要时用虚构 mock 绕开死胡同。

---

## 附录 A · 字体系统最终配置(第三次字体战终态)

- **中文正文**:`"NumDigitsOnly", Georgia, "Chiron Sung HK", "Noto Serif SC", serif`;**weight 400**;昭源 **variable font** 自托管(`public/fonts/chiron-sung-hk/`);**`font-display: optional`**。
- **中文加粗**:`.prose-works strong` 同栈;**昭源 700 + Noto Serif SC 700 兜底**(真粗,非伪粗)。
- **数字**:`NumDigitsOnly` @font-face(数字专用,栈首),修顶底对齐。
- **nav**:Geist Sans,weight 500,ink,15–16px,letter-spacing≈0,小写。
- **三声部**:Instrument Serif(身份/情绪)/ Geist Sans(导航/界面)/ Geist Mono(元信息/系统标注)。
- **英文正文**:Georgia(**待优化**:mac 1080p 发虚,同类物理问题)。
- **已退役**:霞鹜文楷(气质迁移);昭源静态多字重方案(改用可变字体);各类伪粗/描边补丁。

## 附录 B · BrandMark / Header 关键参数

- 进度:`start = innerHeight*0.45`(死区)、`D = innerHeight*0.40`(变形距离)、`p = 1 - clamp((scrollY-start)/D)`;端点吸附 `p>0.97→1` / `p<0.03→0`(数值均可 DevTools 调)。
- `WORD_Y_SHIFT`(名字端竖直校正,约 -15)随 `p` 插值:`p=0` 偏移最大、`p=1` 归零(脸端不动)。
- 括号:**单 polygon**(勿拆 rect,否则白缝)。
- 眨眼:约 5s 一次,仅脸态(`p>0.9`)。
- `<Header />` 在 `app/layout.tsx` 根布局(全站常驻);左 BrandMark + annotation(固定宽度槽防抖)、右 nav(about · work · contact)。
- logo 点击 → `/`(回首页),hover 有 cursor + opacity 反馈 + `aria-label`。
- `prefers-reduced-motion` 静态;scroll 监听 rAF 节流;变形只读 `window.scrollY`(无额外撑高 / 嵌套滚动容器)。

## 附录 C · 匿名化检查清单(可复用于其它真实案例)

1. 真名替换:公司 / 竞品 / 客户产品 / 第三方品牌 / 团队人数流程 → 中性词,全局统一。
2. 图片**中性文件名**(原名可能含公司缩写,泄底)。
3. **底层语料**(Dify 知识库 / 案例库 / 提示词 / few-shot)清真名——截图层裁不干净,根在源头。
4. 治本卡住时,用**虚构 mock + 手动重排**绕开(每字可控)。
5. 保留一行**免责声明**(mock 图、品牌虚构)。
6. 避免**风险词**:「竞品」(勾联想 + 稀释原创)、「药房」(给虚构品牌安真实属性)。
7. **去求职感**:show, don't tell;立论从防守换进攻。

## 附录 D · 第三阶段踩坑记录(接续第一卷,#24 起;编号为假设,以主档为准)

- **#24 改字重无变化** = 该字重文件未下载,浏览器取最近字重顶上(非改无效)。
- **#25 `@font-face` 改 font-weight 不影响渲染**(户口登记 vs 穿衣指令),要在元素 / `element.style` 改。
- **#26 `-webkit-font-smoothing` 是 macOS 专属**;Windows 无效;高分屏 mac 亦基本忽略;mac 1080p 上 `antialiased` 削细笔画。
- **#27 伪粗(synthetic bold)**:单字重 webfont + 加粗时浏览器自行描边,笔画密的字(量/模)最先糊。
- **#28 切片字体连环坑**:`unicode-range` 切片 + `font-display: swap` 空档 + `font-synthesis-weight: none` 三者叠加 → 加粗字静默消失(对应切片未被请求)。
- **#29 `font-display: optional`**:首访 fallback 零闪字 + 缓存后命中目标字体;适合「自托管大字体但不想首访闪烁」。preview 冷缓存是最坏情况,不代表正式站回访。
- **#30 换字体后 NumDigitsOnly 必回字体栈最前**,否则数字顶底不齐复发。
- **#31 SVG 括号勿拆 rect**(发丝白缝),用单 polygon。
- **#32 滚动变形勿借「撑高 spacer / 100vh sticky 舞台」驱动**(会致多余滚动高度 / 双滚动条);只读 `window.scrollY`。
- **#33 双滚动条 / 莫名超高排查**:用 Console 列「底部伸最远的元素」抓现行(本次真凶 `#contact` grid),勿各自猜。
- **#34 「数值正常但观感不对」三因**:字体 fallback、`transform: scale`、留白/对比错觉;量元素实际像素(蓝框)而非看属性。
- **#35 字体声明须在根布局**:否则非首页路由会静默 fallback(本次 annotation 在详情页退回系统字体)。
- **#36 图片原文件名泄密**:含公司缩写等;真实案例一律重命名中性名。
- **#37 匿名根在底层语料**:Dify 输出正文带真名时,截图层裁不净,须清知识库/案例库/提示词,或用虚构 mock 绕开。

---

*本卷完。建议与第一卷 `hc-lai-project-archive.md` 一并维护;`/mnt/project/` 只读,更新后的档案需手动取用替换。*
