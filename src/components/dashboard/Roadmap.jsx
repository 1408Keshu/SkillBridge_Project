import React, { useState } from 'react';

const knowledgeLevels = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

function getUniqueStepName(base, usedNames, fallback) {
  let name = base || fallback;
  let i = 2;
  while (usedNames.has(name)) {
    name = `${base || fallback} (${i++})`;
  }
  usedNames.add(name);
  return name;
}

const Roadmap = () => {
  const [form, setForm] = useState({
    duration: 12,
    dreamGoal: '',
    knowledgeLevel: '',
    knowledgeDetails: '',
    dailyTime: 2,
    topics: '',
  });
  const [roadmapSteps, setRoadmapSteps] = useState([]);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState({});
  const [debug, setDebug] = useState(null);
  const [renderError, setRenderError] = useState(null);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setTouched(t => ({ ...t, [name]: true }));
  };

  const handleSlider = (name, value) => {
    setForm(f => ({ ...f, [name]: value }));
    setTouched(t => ({ ...t, [name]: true }));
  };

  const isValid = () => {
    return (
      form.duration >= 4 &&
      form.dreamGoal.trim().length > 10 &&
      form.knowledgeLevel &&
      form.knowledgeDetails.trim().length > 5 &&
      form.dailyTime > 0 &&
      form.topics.trim().length > 2
    );
  };

  const handleStepComplete = (skillName) => {
    setCompletedSteps(prev => new Set([...prev, skillName]));
  };

  const handleGenerate = async () => {
    setError('');
    setDebug(null);
    setRenderError(null);
    const key = prompt('Enter your Gemini API key:');
    if (!key) return;
    setLoading(true);
    setRoadmapSteps([]);
    setCompletedSteps(new Set());
    const promptText = `Create a personalized week-by-week learning roadmap based on the following user input:\n\n- Dream Goal: ${form.dreamGoal}\n- Duration: ${form.duration} weeks\n- Daily Learning Time: ${form.dailyTime} hours/day\n- Topics of Interest: ${form.topics}\n\n### Instructions:\nFor each week, include:\n1. **Main Focus**: The core concept or skill for that week.\n2. **Recommended Resources**: Provide 2-3 learning resources (video links, reading materials, or project links) that match the user’s preferred style.\n3. **Project Task**: A small hands-on task or milestone that reinforces the learning.\n4. Keep content structured and formatted for use in JSON, like this:\n\n{\n  "weeks": [\n    {\n      "week": 1,\n      "mainFocus": "Introduction to React and JSX",\n      "resources": [\n        "https://reactjs.org/docs/hello-world.html",\n        "https://www.youtube.com/watch?v=dGcsHMXbSOA"\n      ],\n      "projectTask": "Create a simple React webpage that displays your name and changes color on button click."\n    }\n  ]\n}\n\nEnsure clarity, progression, and real-world skills. Make it beginner-friendly but scalable to goal.\nRespond ONLY in JSON format.`;
    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + key, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: promptText }] }] }),
      });
      const data = await response.json();
      setDebug(data);
      if (data.error) {
        setError('Gemini API error: ' + (data.error.message || JSON.stringify(data.error)));
        setLoading(false);
        return;
      }
      let roadmapText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      if (!roadmapText) {
        setError('No roadmap generated. (Empty response from Gemini)');
        setLoading(false);
        return;
      }
      let parsed = null;
      try {
        parsed = JSON.parse(roadmapText);
      } catch {
        const match = roadmapText.match(/\{[\s\S]*\}/);
        if (match) {
          try { parsed = JSON.parse(match[0]); } catch {}
        }
      }
      // Transform Gemini weeks to roadmapSteps with unique, safe names
      if (parsed && parsed.weeks && Array.isArray(parsed.weeks)) {
        const usedNames = new Set();
        const steps = parsed.weeks.map((week, idx) => ({
          name: getUniqueStepName(
            typeof week.mainFocus === 'string' && week.mainFocus.trim() ? week.mainFocus.trim() : '',
            usedNames,
            `Week ${week.week || idx + 1}`
          ),
          description: typeof week.projectTask === 'string' ? week.projectTask : '',
          duration: '1 week',
          resources: Array.isArray(week.resources) ? week.resources : [],
        }));
        setRoadmapSteps(steps);
      } else {
        setError('Could not parse roadmap from Gemini response.');
      }
    } catch (err) {
      setError('Failed to generate roadmap. Please check your API key and try again.');
    }
    setLoading(false);
  };

  let stepsRender = null;
  try {
    if (roadmapSteps.length > 0) {
      stepsRender = (
        <div className="roadmap-steps" style={{ marginTop: 32 }}>
          {roadmapSteps.map((skill, index) => (
            <div key={skill.name + index} className="roadmap-step" style={{ marginBottom: 24, border: '1px solid #eee', borderRadius: 8, padding: 16 }}>
              <div className="step-indicator" style={{ float: 'left', marginRight: 16 }}>
                <div className={`step-dot ${completedSteps.has(skill.name) ? 'completed' : index === 0 ? 'current' : ''}`}
                  style={{ width: 32, height: 32, borderRadius: '50%', background: completedSteps.has(skill.name) ? '#35dca9' : index === 0 ? '#7c4dff' : '#eee', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 18 }}>
                  {completedSteps.has(skill.name) ? <i className="fas fa-check"></i> : index + 1}
                </div>
                {index < roadmapSteps.length - 1 && <div className={`step-connector ${completedSteps.has(skill.name) ? 'completed' : ''}`} style={{ width: 4, height: 32, background: completedSteps.has(skill.name) ? '#35dca9' : '#eee', margin: '0 auto' }}></div>}
              </div>
              <div className="step-content" style={{ overflow: 'hidden' }}>
                <h4 className="step-title" style={{ marginBottom: 4 }}>{skill.name} <span style={{fontSize: '0.8rem', color: 'var(--text-secondary)'}}> - {skill.duration}</span></h4>
                <p className="step-description" style={{ marginBottom: 8 }}>{skill.description}</p>
                {skill.resources && skill.resources.length > 0 && (
                  <div style={{ marginBottom: 8 }}>
                    <b>Resources:</b>
                    <ul style={{ margin: '4px 0 0 18px' }}>
                      {skill.resources.map((res, i) => (
                        <li key={i}><a href={res} target="_blank" rel="noopener noreferrer">{res}</a></li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="step-actions" style={{ marginTop: 8 }}>
                  {completedSteps.has(skill.name) ? (
                    <button className="step-btn completed" disabled>
                      <i className="fas fa-check-circle"></i> Completed
                    </button>
                  ) : index === 0 || completedSteps.has(roadmapSteps[index - 1]?.name) ? (
                    <>
                      <button className="step-btn primary">
                        <i className="fas fa-play"></i> Start Learning
                      </button>
                      <button className="step-btn secondary" onClick={() => handleStepComplete(skill.name)}>
                        <i className="fas fa-check"></i> Mark Complete
                      </button>
                    </>
                  ) : (
                    <button className="step-btn secondary" disabled>
                      <i className="fas fa-lock"></i> Complete previous step first
                    </button>
                  )}
                </div>
              </div>
              <div style={{ clear: 'both' }}></div>
            </div>
          ))}
        </div>
      );
    }
  } catch (err) {
    stepsRender = <div style={{ color: 'red', marginTop: 24 }}>An error occurred while rendering the roadmap steps: {err.message}</div>;
  }

  return (
    <div className="page active">
      <h1 className="section-title animate-on-scroll">My Roadmap</h1>
      <p className="section-subtitle animate-on-scroll">Your complete AI-powered career roadmap.</p>
      <div className="widget animate-on-scroll" style={{ maxWidth: 600, margin: '0 auto' }}>
        <div className="widget-header">
          <h3 className="widget-title">Interactive Roadmap Generator</h3>
        </div>
        <form className="roadmap-form" style={{ display: 'flex', flexDirection: 'column', gap: 18 }} onSubmit={e => { e.preventDefault(); handleGenerate(); }}>
          <label>
            Duration (weeks):
            <input type="range" min={4} max={52} step={1} name="duration" value={form.duration} onChange={e => handleSlider('duration', Number(e.target.value))} />
            <span style={{ marginLeft: 8 }}>{form.duration} weeks</span>
            <div className="helper-text">How long do you want your roadmap to be? (4-52 weeks)</div>
          </label>
          <label>
            Dream Goal:
            <textarea name="dreamGoal" rows={2} placeholder="e.g., Become a React developer at a top company, launch my own SaaS, etc." value={form.dreamGoal} onChange={handleInput} />
            <div className="helper-text">Describe your ultimate goal in detail (at least 10 characters).</div>
            {touched.dreamGoal && form.dreamGoal.trim().length <= 10 && <span style={{ color: 'red' }}>Please provide more detail.</span>}
          </label>
          <label>
            Current Knowledge Level:
            <select name="knowledgeLevel" value={form.knowledgeLevel} onChange={handleInput}>
              <option value="">Select level</option>
              {knowledgeLevels.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
            </select>
            <textarea name="knowledgeDetails" rows={2} placeholder="Briefly describe your background, e.g., 'I know HTML/CSS, some JS'" value={form.knowledgeDetails} onChange={handleInput} />
            <div className="helper-text">Select your level and describe your current skills (at least 5 characters).</div>
            {touched.knowledgeDetails && form.knowledgeDetails.trim().length <= 5 && <span style={{ color: 'red' }}>Please provide more detail.</span>}
          </label>
          <label>
            Daily Available Time:
            <input type="range" min={1} max={8} step={1} name="dailyTime" value={form.dailyTime} onChange={e => handleSlider('dailyTime', Number(e.target.value))} />
            <span style={{ marginLeft: 8 }}>{form.dailyTime} hours/day</span>
            <div className="helper-text">How much time can you dedicate each day? (1-8 hours)</div>
          </label>
          <label>
            Topics of Interest:
            <textarea name="topics" rows={2} placeholder="e.g., React, Node.js, UI/UX, Data Science, etc." value={form.topics} onChange={handleInput} />
            <div className="helper-text">List any specific topics or technologies you want to focus on.</div>
          </label>
          <button className="step-btn primary" type="submit" disabled={!isValid() || loading}>
            {loading ? 'Generating...' : 'Generate Roadmap'}
          </button>
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
        {loading && <div style={{ marginTop: 16 }}>Loading...</div>}
        {/* Interactive Roadmap Steps */}
        {stepsRender}
        {renderError && <div style={{ color: 'red', marginTop: 16 }}>A rendering error occurred: {renderError}</div>}
        {debug && (
          <details style={{marginTop: 16, color: '#888'}}>
            <summary>Show Gemini API raw response (debug)</summary>
            <pre style={{fontSize: 12}}>{JSON.stringify(debug, null, 2)}</pre>
          </details>
        )}
      </div>
    </div>
  );
};

export default Roadmap;
