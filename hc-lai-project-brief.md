# H.C. Lai · 个人品牌网站 项目 Brief

> Day 0 设计交付物 · 给 Day 1 的 Claude Code 用

---

## 0. 一句话项目说明

做一个传达**个人品牌感**的网页——**不是网页版简历**——把 "H.C. Lai" 打造成一个独立、可记忆的设计身份。

---

## 1. 项目背景

- 主理人：H.C. Lai · 24 岁建筑设计师，正在向 AI 行业转型
- 受众：未来雇主（AI 行业）+ 设计同行 + 个人品牌长期资产
- 阶段：**MVP**（hero + about + 简单 contact，几天上线）
- 后续：作品 section（可能嵌入 Notion）、思考随笔（可选）

---

## 2. Brand DNA

| 项 | 决策 |
|---|---|
| **Wordmark** | H.C. Lai. （注意句号是一部分） |
| **Positioning（左上角 annotation）** | — Designer of spaces and systems. |
| **气质关键词** | 冷静的智识、editorial elegance、克制的高级感 |
| **不要的气质** | "建筑事务所网站"那种项目堆砌、SaaS花哨、网页版简历 |
| **视觉参考** | OHM (godly.website) · Compound Planning · Custo · Anthropic Claude 官网 |

**核心策略**：用建筑训练出来的克制审美 + AI 时代的语言。**不把"建筑设计师"作为大标签挂出来**——positioning 抽象到 "Designer of spaces and systems"，"空间"暗指建筑、"系统"暗指数字/AI，谁都不挑明。

---

## 3. 设计语言

### 3.1 配色

```css
--cream:        #F2EFE9;  /* 主背景，暖灰白 */
--cream-warm:   #EEEAE0;  /* 次级背景，备用 */
--ink:          #1C1B17;  /* 主文字，带温度的深色 */
--ink-muted:    #6B6862;  /* 次要文字、annotation 灰色部分 */
--terracotta:   #B85C38;  /* 唯一彩色 accent */
--line:         rgba(28, 27, 23, 0.12);  /* 分割线 */
```

**配色策略**：单色为主（cream + ink），terracotta 只作为 **唯一彩色 accent**，仅用在极少数关键细节（wordmark 的句号、hover 下划线、link active）。**不要把 terracotta 用成大色块。**

**重要**：**没有 grain / 噪点 / 纸张纹理**——干净的纯色背景，跟 Claude 官网那种舒服的纯色一个家族。

### 3.2 字体

| 角色 | 字体 | 用于 |
|---|---|---|
| Display serif | **Instrument Serif** | 大 wordmark、section 标题 |
| Body sans | **Geist** | 正文、annotation 的 declarative 部分 |
| Mono accent | **Geist Mono** | 导航、标签、年份、坐标式细节 |

全部从 Google Fonts 加载，Next.js 项目用 `next/font/google`。

**绝对不要用的字体**：Inter、Arial、Roboto、系统默认 sans、**微软雅黑**。

### 3.3 字体混搭逻辑（关键）

Annotation `— Designer of spaces and systems.` 内部混搭：

- "— Designer of" → **Instrument Serif Italic**, 灰色（ink-muted）— attribution 感，像书的序言
- "spaces and systems." → **Geist Medium**, 深色（ink）— declarative 感，像现代标签

这个混搭就是整页设计的灵魂——衬线斜体承载"我从哪儿来"，无衬线粗体承载"我现在做什么"。**一句话讲完整个转行叙事，但不需要解释。**

### 3.4 字号 / 间距

| 元素 | 规格 |
|---|---|
| Main wordmark | `clamp(96px, 22vw, 380px)`, letter-spacing `-0.04em`, line-height `0.86` |
| Section h2 | `clamp(44px, 5.6vw, 84px)`, letter-spacing `-0.025em` |
| Body | `16px` / line-height `1.65` |
| Annotation | `15px` (主), `17px` (italic serif 部分稍大) |
| Mono labels / nav | `10-11px`, letter-spacing `0.08-0.18em`, lowercase / uppercase 看场合 |
| Page padding | desktop `32-48px` / mobile `24px` |

---

## 4. Motion / 动效

### 4.1 进场动画（页面加载）

Staggered fade-up，所有元素从 `translateY(20-40px) + opacity:0` → `translateY(0) + opacity:1`：

| 元素 | 延迟 | 时长 |
|---|---|---|
| Annotation | 300ms | 1.2s |
| Nav | 500ms | 1.2s |
| **Wordmark** | 700ms | 1.6s（位移更大 40px） |
| Footer mark | 1200ms | 1.2s |
| Scroll cue | 1500ms | 1.2s (然后开始呼吸式浮动) |

Easing: `cubic-bezier(0.16, 1, 0.3, 1)`

### 4.2 持续交互

- **鼠标视差**：鼠标在页面上动 → wordmark 极轻微漂移（max 8px x / 4px y, transition `0.9s ease-out`）。**只在进场完成后（2400ms 后）激活。**
- **Nav hover**：terracotta 下划线从 width 0 滑出到 100%
- **Scroll cue**：2.4s 周期的上下 5px 浮动

---

## 5. Hero 结构（v0 已完成）

```
┌────────────────────────────────────────────────────────┐
│ — Designer of spaces and systems.    work · about · contact │
│                                                        │
│                                                        │
│                                                        │
│  H.C. Lai.                                             │
│                                       HCL · 2026  [HCL]│
│                       scroll ↓                         │
└────────────────────────────────────────────────────────┘
```

- 全屏 100vh，min-height 700px
- Annotation 左上角，max-width 360px
- Nav 右上角，lowercase Geist Mono
- **Wordmark** 占据屏幕下方一大块，左对齐，padding-bottom 6vh
- Footer-mark 右下角（HCL · 2026 + 圆圈 monogram）
- Scroll cue 底部居中

参考实现：见附件 `hc-lai-hero-v0.html`。

---

## 6. 完整网站结构

| Section | 状态 | 说明 |
|---|---|---|
| Hero | ✅ v0 完成 | 直接搬用 |
| About | 🟡 框架完成 | 占位文字，待 H.C. Lai 真实文案 |
| Works | 🔴 待做 | 候选方案：嵌入 Notion / 自己排版 / 大图作品集 |
| Contact | 🔴 待做 | 邮箱 + 1-2 个 social link 即可 |
| Monogram | 🔴 待做 | 当前 HCL 占位，主理人想自己设计 |

---

## 7. 技术规格

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS + CSS variables for design tokens
- **Fonts**: `next/font/google` 加载 Instrument Serif / Geist / Geist Mono
- **Deploy**: Vercel
- **Domain**: 待定
- **Lighthouse 目标**: 95+
- **响应式**: desktop / tablet / mobile（断点 768px）

---

## 8. Day 1 操作步骤

### Step 1：本地建项目文件夹

在电脑上建一个空文件夹，比如 `~/Projects/hc-lai-site`。

### Step 2：把这两个文件放进去

- `hc-lai-project-brief.md`（这份 brief）
- `hc-lai-hero-v0.html`（v0 hero 参考实现）

### Step 3：在该文件夹打开 Claude Code，然后说

> 我要做一个个人品牌网站。请先看一下 `hc-lai-project-brief.md` 这份项目 brief 和 `hc-lai-hero-v0.html` 这个 hero 参考实现。
>
> 接下来请：
> 1. 用 Next.js 14 + Tailwind CSS 初始化项目（App Router、TypeScript、ESLint）
> 2. 把 `hc-lai-hero-v0.html` 里的 hero 重构成 React 组件 `<Hero />`，放在首页
> 3. Google Fonts 用 `next/font/google` 加载 Instrument Serif、Geist、Geist Mono
> 4. CSS 设计 token 用 Tailwind config + CSS variables 双轨实现，保持 brief 里的 token 命名
> 5. About section 框架先做出来（grid 布局，占位文字），其他 section 后面再加
>
> 全程保持 brief 里的设计语言。

### Step 4：跑起来看

Claude Code 会引导你跑 `npm run dev`，然后浏览器打开 `http://localhost:3000` 看效果。

### Step 5：迭代

跟 Claude Code 继续聊，比如：
- "wordmark 再大一点"
- "加一个 works section，先做框架"
- "把 about 区的 grid 改成 1 列在移动端"

跟我们在 chat 里的体验一样。

### Step 6：部署

设计感觉对了，跟 Claude Code 说：
> "我要部署到 Vercel，请教我怎么做。"

它会一步步带你。

---

## 9. 后续讨论清单（不急、慢慢来）

- [ ] **HCL monogram 设计**——参考方向：建筑制图符号系（北箭头 ◬、剖切符号）/ 字母变形系（H·C·L 错位）/ 几何抽象系（L 形、半圆）/ 图章戳记系
- [ ] **About 文案**——三五句话，第一句是钩子，不写履历写气质
- [ ] **Works 形式**——Notion 嵌入用 [Super.so](https://super.so) 或 Notion API 拉数据；自己排版做大图 grid
- [ ] **是否加 thoughts/blog 区**——可选
- [ ] **域名**——hclai.com / hc-lai.com / lai.studio / 等等
- [ ] **暗色模式**——可选，但 cream 这套配色已经很耐看，未必需要

---

## 附：v0 的核心设计决策回顾

> （这部分给 Claude Code 看，让它理解我们为什么这么做）

1. **大 wordmark 用衬线（Instrument Serif）而非无衬线**：跟 OHM 不一样，刻意选择更优雅、更书卷气、更"建筑研究院图册"感的衬线。这是 H.C. Lai 的差异化。

2. **句号是 terracotta**：唯一的彩色亮点，签名式 flourish。**不要把这个颜色用到其他地方。**

3. **Annotation 双字体混搭**：editorial 高级动作，承载"过去 + 现在"的转行叙事。**不要简化成单一字体。**

4. **没有 grain**：Claude 官网那种舒服的纯色背景。**不要加噪点。**

5. **滚动叙事**：未来可以做 wordmark 滚动后变小固定到 header 的效果（OHM 的招牌动效），但 v0 没做，可以后续 v1 加。
