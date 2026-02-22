import { useMemo, useState } from 'react'
import './App.css'

export default function App() {
  const [role, setRole] = useState('资深产品经理')
  const [task, setTask] = useState('梳理一个新功能 PRD')
  const [constraints, setConstraints] = useState('输出中文；结构化；给出风险清单')
  const [output, setOutput] = useState('标题 + 要点列表 + 下一步建议')

  const result = useMemo(() => `你是${role}。\n任务：${task}。\n约束：${constraints}。\n请按以下格式输出：${output}。`, [role, task, constraints, output])

  return (
    <main className="container">
      <h1>Prompt Template Generator</h1>
      <input value={role} onChange={e => setRole(e.target.value)} />
      <input value={task} onChange={e => setTask(e.target.value)} />
      <input value={constraints} onChange={e => setConstraints(e.target.value)} />
      <input value={output} onChange={e => setOutput(e.target.value)} />
      <pre>{result}</pre>
    </main>
  )
}
