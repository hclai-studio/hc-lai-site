# H.C. Lai 个人品牌网站 · 项目存档 (第一卷)

> **项目**：hclai.studio — 赖兴菁（H.C. Lai）个人品牌网站
> **存档性质**：从首次构思到 Work 目录页上线的完整对话沉淀（无损）
> **个人网站域名注册时间**：2026-05-12
> **对话截止**：2026-05-17
> **当前状态**：v1.5 — Hero / About / Work 目录 / Contact 四大区块全部上线并经桌面 + 移动端验证
> **参与角色**：主理人（赖兴菁）· 策略顾问 Claude（chat）· 工程实现 Claude Code

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

| 角色 | 字体 | 用于 |
|---|---|---|
| Display serif（英文） | **Instrument Serif** | wordmark、英文大标题、section 标题、英文作品标题 |
| Body sans（英文/UI） | **Geist** | 英文正文、annotation 的 declarative 部分 |
| Mono accent | **Geist Mono** | section 编号标签、年份、导航、坐标式细节 |
| 中文正文 | **Noto Serif SC** | 中文段落正文（衬线，editorial 感） |
| 中文标题/副标题 | **Noto Sans SC** | 作品中文副标题（无衬线） |

**字体加载方式（重要，见附录 B）**：最终统一用 **Google Fonts CDN 的 `<link>` 标签**加载，**不用** `next/font/google`，**不用** `localFont`。

**绝对不用的字体**：Inter、Arial、Roboto、系统默认 sans、**微软雅黑**。

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
| **Styling** | Tailwind CSS + CSS variables（双轨 token：CSS vars 在 globals.css，Tailwind colors 在 tailwind.config.ts，命名与 brief 一致） |
| **字体加载** | Google Fonts CDN `<link>` 标签（见附录 B） |
| **部署** | Vercel（连接 GitHub，push 到 main 自动部署） |
| **代码仓库** | GitHub：`https://github.com/s1mple4869/hc-lai-site`（公开） |
| **Git 认证** | **SSH key**（已配置，不再用 PAT；以后 `git push` 直接推） |
| **域名** | `hclai.studio`（Namecheap 注册，$12.98/yr，DNS 指向 Vercel） |
| **邮箱** | `hello@hclai.studio` → 转发到 QQ 邮箱（Namecheap 自带转发功能） |
| **响应式断点** | 768px |

**当前文件结构**：

```
app/
├── fonts/
│   ├── GeistVF.woff
│   ├── GeistMonoVF.woff
│   ├── InstrumentSerif-Regular.woff2   # 本地备用（当前主用 CDN）
│   └── InstrumentSerif-Italic.woff2
├── components/
│   ├── Hero.tsx          # client component（鼠标视差）
│   └── About.tsx         # server component
│   └── (Work / Contact 区块)
├── globals.css           # CSS tokens + keyframes + .nav-link
├── layout.tsx            # 字体加载（CDN link）
└── page.tsx              # <Hero /> + <About /> + Work + Contact
tailwind.config.ts        # 双轨 token
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

**当前现状（v1.5）**：Hero / About / Work 目录 / Contact 四大区块全部上线，桌面 + 移动端均验证通过。Work 详情页（MDX 系统 + 三篇内容）尚未开始，约定换新对话继续。

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

### 5.5 三个作品详情页（待做 · 内容已在 Notion 完整成形）

> 内容形态完全不用改——主理人 Notion 里早已是"作品 + 思考"模式（每篇都有"为什么做""方法论验证""反思与边界"）。详情页只需把 Notion 内容**搬到网站**，参考 Anthropic Research 文章页风格（单栏窄宽度约 720px、章节 H2/H3、图片居中带 caption、中英杂糅保留）。

**01 · AI Workflow & Enablement Portfolio**（纯文字，最复杂）
- Notion 主页下挂 8 个子页面：项目概述 / 输出模板 / 示例 / 治理 / 启用工具包 / 小案例 1（内部备忘录到行动跟踪）/ 小案例 2（需求收集到检查清单与风险摘要）/ Portfolio Map（架构图）。
- **建议实现**：单页长文滚动呈现；若某节过长再按需拆独立子页。**因复杂度最高，建议留到最后做。**

**02 · Nanobanana 半自动建筑工作流**（文字 + 2-4 张图，一页展示，**建议第一篇做，作模板**）
- 7 节：① 项目概述 ② 为什么做这个（在建筑 AI 出图中每轮重复组织白模/参考图/prompt 的痛点）③ 工作流设计（Stage1 白模锁几何 → Stage2 反馈推送 → Round/State 管理）④ 我做了什么（需求拆解与边界定义 / 两阶段生成策略 / 结构化 keep-fix-avoid feedback / 本地 Streamlit 工作台 MVP / 方法论验证与边界记录）⑤ MVP 展示 ⑥ 方法论验证 case_04a（保守版）vs case_04b（推进版）⑦ 反思与边界（定位为 AI workflow prototype，不替代开放式视觉判断）。

**03 · AI 求职决策助手**（文字 + 截图，一页展示）
- 7 节：① 项目概述（108 个岗位，单岗位决策时间从 5 分钟降到 30 秒）② 为什么做（三个痛点：信息异构 / 重复决策成本 / 转行简历被秒拒）③ 工作流设计 ④ 技术路径选择（路径 1 BOSS CLI 自动化 / 路径 2 浏览器浮窗注入 / 路径 3 命令行半自动——最终采用，takeaway："不是选最先进的，是选最匹配真实约束的，用最轻的人机分工绕过瓶颈"）⑤ MVP 展示 ⑥ 方法论验证 ⑦ 反思与边界。

**图片**：主理人有全部原图文件，待单独处理上传（详情页先用 placeholder 占位）。

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

## 7. 待办 / 下一步

**立即下一步（约定换新对话进行）**：
- [ ] **任务 2**：搭建 MDX 路由系统（`works/[slug]` 动态路由 + MDX 文件 + 自定义渲染组件）。
- [ ] **任务 3**：作品详情页，**先做 Nanobanana 作模板**（参考 Anthropic 文章页），磨好后 01、03 即"填内容"。

**后续（不急，慢慢养）**：
- [ ] 作品详情页图片处理与上传（主理人有原图）。
- [ ] **Monogram 重设计**（当前 `HCL` 圆圈为占位）。备选方向：建筑制图符号系（北箭头 ◬ / 剖切符号 / 轴线编号）/ 字母变形系（H·C·L 错位、HCL 叠合）/ 几何抽象系（L 形 / 半圆）/ 图章戳记系。
- [ ] **SEO + Open Graph**（让链接分享时自动有预览卡片）。
- [ ] 可选：思考随笔 / blog section、暗色模式、PWA / 移动端深度优化。

**风险提醒（策略顾问补充）**：
- ⚠️ **IP 注意**：若作品详情页里的建筑渲染图来自公司项目文件，可能涉及职务作品（work-for-hire），公司或拥有底层模型与衍生图的著作权。portfolio 展示前建议确认图片选取与署名的合规性。

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

/* 字体（CSS 变量命名） */
--serif:        'Instrument Serif', serif;       /* 英文衬线 */
--serif-cn:     'Noto Serif SC', serif;          /* 中文衬线（正文） */
--sans:         'Geist', system-ui, sans-serif;  /* 英文无衬线 */
--sans-cn:      'Noto Sans SC', sans-serif;      /* 中文无衬线（标题） */
--mono:         'Geist Mono', Menlo, monospace;  /* 等宽 */

/* 缓动 */
--ease-out:     cubic-bezier(0.16, 1, 0.3, 1);
```

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

## 附录 C · 关键文件清单（产出的 brief / mockup）

| 文件 | 用途 |
|---|---|
| `hc-lai-hero-v0.html` | 阶段 0 的 hero 设计 mockup（90 分初稿） |
| `hc-lai-project-brief.md` | 开工 brief（设计语言 + 技术规格 + Day 1 步骤） |
| `hc-lai-day2-brief.md` | Day 2 brief（about 文案 + Contact + 域名） |
| `work-section-preview.html` | Work 目录视觉预览（视觉对齐基准） |
| `work-title-comparison.html` | 作品标题字体 A/B/C 对比（最终选 C） |
| `hc-lai-day3-brief.md` | Day 3 brief（Work 目录 + MDX 路由 + Nanobanana 详情页） |
| `hc-lai-project-archive.md` | 本存档文件 |

---

*存档结束 · hclai.studio — Designer of spaces and systems.*
