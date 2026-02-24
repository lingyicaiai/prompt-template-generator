import { useMemo, useState } from 'react'
import './App.css'

const scenarioMap = {
  写作: '你是资深写作教练，擅长结构化表达与风格控制。',
  客服: '你是客服质检专家，强调响应效率与用户满意度。',
  编程: '你是高级软件工程师，输出可执行方案与代码说明。',
  营销: '你是增长营销顾问，关注转化与复购。',
}

export default function App() {
  const [scenario, setScenario] = useState('写作')
  const [goal, setGoal] = useState('写一篇 800 字的新品发布文章')
  const [tone, setTone] = useState('专业但亲和')
  const [constraints, setConstraints] = useState('使用中文；列出3个要点；结尾加行动建议')
  const [copied, setCopied] = useState(false)

  const prompt = useMemo(() => {
    return [
      '# Role', scenarioMap[scenario], '',
      '# Task', `请完成：${goal}。`, '',
      '# Style', `语气：${tone}。`, '',
      '# Constraints', constraints, '',
      '# Variables',
      '- {{target_audience}}: 目标读者',
      '- {{key_message}}: 核心信息',
      '- {{output_format}}: 输出格式（段落/列表/表格）', '',
      '# Output Template', '1) 背景理解', '2) 主体内容', '3) 可执行下一步',
    ].join('\n')
  }, [scenario, goal, tone, constraints])

  const onCopy = async () => {
    await navigator.clipboard.writeText(prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <main className="container stack">
      <header className="header"><h1>Prompt Template Generator</h1><p>选择场景并输入目标、语气、约束，生成结构化 Prompt。</p></header>
      <section className="card stack">
        <div className="grid grid-2">
          <label>场景
            <select value={scenario} onChange={(e) => setScenario(e.target.value)}>{Object.keys(scenarioMap).map((s) => <option key={s} value={s}>{s}</option>)}</select>
          </label>
          <label>语气<input value={tone} onChange={(e) => setTone(e.target.value)} /></label>
        </div>
        <label>目标<input value={goal} onChange={(e) => setGoal(e.target.value)} /></label>
        <label>约束<textarea rows={4} value={constraints} onChange={(e) => setConstraints(e.target.value)} /></label>
      </section>
      <section className="card stack">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="badge">结构化 Prompt</span>
          <button onClick={onCopy} className="secondary">{copied ? '已复制' : '复制'}</button>
        </div>
        <pre>{prompt}</pre>
      </section>
    </main>
  )
}
