import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useAuth } from '../../contexts/AuthContext';

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

const API_URL = import.meta.env.VITE_API_URL;

const Roadmap = ({ completedSteps, setCompletedSteps }) => {
  const { token } = useAuth();
  const [form, setForm] = useState({
    duration: 12,
    dreamGoal: '',
    knowledgeLevel: '',
    knowledgeDetails: '',
    dailyTime: 2,
    // Removed topics
  });
  const [roadmapSteps, setRoadmapSteps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState({});
  const [debug, setDebug] = useState(null);
  const [renderError, setRenderError] = useState(null);
  const [showForm, setShowForm] = useState(true);

  // Load roadmap from backend on mount
  useEffect(() => {
    const fetchRoadmap = async () => {
      if (!token) return;
      try {
        const res = await fetch(`${API_URL}/api/roadmap`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.roadmap && Array.isArray(data.roadmap.steps) && data.roadmap.steps.length > 0) {
          setRoadmapSteps(data.roadmap.steps);
          setForm(f => ({
            ...f,
            dreamGoal: data.roadmap.dreamGoal || '',
            duration: data.roadmap.duration || 12,
            knowledgeLevel: data.roadmap.knowledgeLevel || '',
            knowledgeDetails: data.roadmap.knowledgeDetails || '',
            dailyTime: data.roadmap.dailyTime || 2
          }));
          setShowForm(false);
        } else {
          setShowForm(true); // <-- Always show form if no steps
          setRoadmapSteps([]);
        }
      } catch (err) {
        setShowForm(true); // <-- Show form on error
        setRoadmapSteps([]);
      }
    };
    fetchRoadmap();
  }, [token]);

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
      form.dailyTime > 0
      // Removed topics validation
    );
  };

  const handleStepComplete = (skillName) => {
    setCompletedSteps(prev => new Set([...prev, skillName]));
  };

  const handleGenerate = async () => {
    setError('');
    setDebug(null);
    setRenderError(null);
    const key = import.meta.env.VITE_GEMINI_API_KEY;
    if (!key) {
      setError('Gemini API key is missing. Please set VITE_GEMINI_API_KEY in your .env file.');
      return;
    }
    setLoading(true);
    setRoadmapSteps([]);
    setCompletedSteps(new Set());
    setShowForm(false);
    const promptText = `Create a personalized week-by-week learning roadmap based on the following user input:\n\n- Dream Goal: ${form.dreamGoal}\n- Duration: ${form.duration} weeks\n- Daily Learning Time: ${form.dailyTime} hours/day\n\n### Instructions:\nFor each week, include:\n1. **Main Focus Topics**: List 3-4 core concepts or skills (as an array of strings) for that week.\n2. **Recommended Resources**: Provide 2-3 learning resources as an array of objects, each with a 'name' (what to learn from this resource) and a 'url' (the link).\n3. **Weekly Task**: A small hands-on task or milestone that reinforces the learning.\n4. Keep content structured and formatted for use in JSON, like this:\n\n{\n  \"weeks\": [\n    {\n      \"week\": 1,\n      \"mainFocusTopics\": [\"Introduction to React\", \"JSX Basics\", \"Component Structure\"],\n      \"resources\": [\n        { \"name\": \"React Official Hello World Guide\", \"url\": \"https://reactjs.org/docs/hello-world.html\" },\n        { \"name\": \"React JS Crash Course (YouTube)\", \"url\": \"https://www.youtube.com/watch?v=dGcsHMXbSOA\" }\n      ],\n      \"weeklyTask\": \"Create a simple React webpage that displays your name and changes color on button click.\"\n    }\n  ]\n}\n\nEnsure clarity, progression, and real-world skills. Make it beginner-friendly but scalable to goal.\nRespond ONLY in JSON format.`;
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
            Array.isArray(week.mainFocusTopics) && week.mainFocusTopics.length > 0 ? week.mainFocusTopics.join(', ') : '',
            usedNames,
            `Week ${week.week || idx + 1}`
          ),
          mainFocusTopics: Array.isArray(week.mainFocusTopics) ? week.mainFocusTopics : [],
          description: typeof week.weeklyTask === 'string' ? week.weeklyTask : '',
          duration: '1 week',
          resources: Array.isArray(week.resources) ? week.resources : [],
        }));
        setRoadmapSteps(steps);
        // Save to backend
        if (token) {
          await fetch(`${API_URL}/api/roadmap`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              steps,
              dreamGoal: form.dreamGoal,
              duration: form.duration,
              knowledgeLevel: form.knowledgeLevel,
              knowledgeDetails: form.knowledgeDetails,
              dailyTime: form.dailyTime
            })
          });
        }
      } else {
        setError('Could not parse roadmap from Gemini response.');
      }
    } catch (err) {
      setError('Error generating roadmap.');
    } finally {
      setLoading(false);
    }
  };

  // PDF Export Handler (programmatic, not screenshot)
  const handleExportPDF = () => {
    if (!roadmapSteps.length) return;

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4'
    });

    let y = 40;

    // Title
    doc.setFontSize(22);
    doc.setTextColor('#7c4dff');
    doc.text('SkillBridge Roadmap Journey', 40, y);
    y += 30;

    // User Info
    doc.setFontSize(14);
    doc.setTextColor('#222');
    doc.text(`Goal: ${form.dreamGoal || 'Not set'}`, 40, y);
    y += 20;
    doc.text(`Duration: ${form.duration} weeks`, 40, y);
    y += 20;
    doc.text(`Knowledge Level: ${form.knowledgeLevel ? knowledgeLevels.find(l => l.value === form.knowledgeLevel)?.label : 'Not set'}`, 40, y);
    y += 20;
    doc.text(`Daily Time: ${form.dailyTime} hours/day`, 40, y);
    y += 30;

    // For each week
    roadmapSteps.forEach((step, idx) => {
      doc.setFontSize(16);
      doc.setTextColor('#7c4dff');
      doc.text(`Week ${idx + 1}: ${step.name}`, 40, y);
      y += 22;

      // Topics
      if (step.mainFocusTopics && step.mainFocusTopics.length) {
        doc.setFontSize(12);
        doc.setTextColor('#222');
        doc.text('Learning Topics:', 50, y);
        y += 16;
        step.mainFocusTopics.forEach(topic => {
          doc.text(`- ${topic}`, 60, y);
          y += 14;
        });
      }

      // Weekly Task
      if (step.description) {
        y += 6;
        doc.setFont(undefined, 'bold');
        doc.text('Weekly Task:', 50, y);
        doc.setFont(undefined, 'normal');
        y += 14;
        doc.text(step.description, 60, y);
        y += 18;
      }

      // Resources
      if (step.resources && step.resources.length) {
        y += 6;
        doc.setFont(undefined, 'bold');
        doc.text('Resources:', 50, y);
        doc.setFont(undefined, 'normal');
        y += 14;
        step.resources.forEach(res => {
          if (typeof res === 'object' && res.name && res.url) {
            doc.textWithLink(`- ${res.name}`, 60, y, { url: res.url });
          } else if (typeof res === 'string') {
            doc.text(`- ${res}`, 60, y);
          }
          y += 14;
        });
      }

      y += 18;
      // Add new page if near bottom
      if (y > 750 && idx < roadmapSteps.length - 1) {
        doc.addPage();
        y = 40;
      }
    });

    doc.save('roadmap-journey.pdf');
  };

  let stepsRender = null;
  try {
    if (roadmapSteps.length > 0) {
      stepsRender = (
        <div className="roadmap-steps" style={{ marginTop: 32 }}>
          {roadmapSteps.map((skill, index) => (
            <div key={skill.name + index} className="roadmap-step" style={{ marginBottom: 32, border: '1px solid var(--border-color)', borderRadius: 12, padding: '24px 20px', background: 'var(--card-bg)', boxShadow: '0 2px 8px 0 rgba(124,77,255,0.04)' }}>
              <div className="step-indicator" style={{ float: 'left', marginRight: 24 }}>
                <div className={`step-dot ${completedSteps.has(skill.name) ? 'completed' : index === 0 ? 'current' : ''}`}
                  style={{ width: 32, height: 32, borderRadius: '50%', background: completedSteps.has(skill.name) ? 'var(--secondary)' : index === 0 ? 'var(--primary)' : 'var(--light-gray)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 18 }}>
                  {completedSteps.has(skill.name) ? <i className="fas fa-check"></i> : index + 1}
                </div>
                {index < roadmapSteps.length - 1 && <div className={`step-connector ${completedSteps.has(skill.name) ? 'completed' : ''}`} style={{ width: 4, height: 32, background: completedSteps.has(skill.name) ? 'var(--secondary)' : 'var(--light-gray)', margin: '0 auto' }}></div>}
              </div>
              <div className="step-content" style={{ overflow: 'hidden' }}>
                <h4 className="step-title" style={{ marginBottom: 12, fontSize: 20 }}>{skill.name} <span style={{fontSize: '0.9rem', color: 'var(--text-secondary)', marginLeft: 8}}> - {skill.duration}</span></h4>
                {skill.mainFocusTopics && skill.mainFocusTopics.length > 0 && (
                  <div style={{ marginBottom: 18 }}>
                    <b style={{ fontSize: 15, color: 'var(--text-primary)' }}>Learning Topics:</b>
                    <ul style={{ margin: '8px 0 0 22px', padding: 0, fontSize: 15, lineHeight: 1.7, color: 'var(--text-primary)' }}>
                      {skill.mainFocusTopics.map((topic, i) => (
                        <li key={i} style={{ marginBottom: 4 }}>{topic}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <p className="step-description" style={{ marginBottom: 18, fontSize: 15, background: 'var(--light-gray)', padding: '10px 16px', borderRadius: 8, fontWeight: 500, color: 'var(--text-primary)' }}><b>Weekly Task -</b> {skill.description}</p>
                {skill.resources && skill.resources.length > 0 && (
                  <div style={{ marginBottom: 18 }}>
                    <b style={{ fontSize: 15, color: 'var(--text-primary)' }}>Resources:</b>
                    <ul style={{ margin: '10px 0 0 0', padding: 0, listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {skill.resources.map((res, i) => (
                        typeof res === 'object' && res !== null && res.name && res.url ? (
                          <li key={i} style={{margin: 0}}>
                            <a 
                              href={res.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              style={{
                                display: 'inline-block',
                                padding: '7px 16px',
                                background: 'var(--light-gray)',
                                color: 'var(--primary)',
                                borderRadius: '20px',
                                fontWeight: 500,
                                textDecoration: 'none',
                                border: '1px solid var(--border-color)',
                                transition: 'background 0.2s, color 0.2s',
                                fontSize: 14,
                              }}
                              onMouseOver={e => { e.target.style.background = 'var(--primary-light)'; e.target.style.color = '#fff'; }}
                              onMouseOut={e => { e.target.style.background = 'var(--light-gray)'; e.target.style.color = 'var(--primary)'; }}
                            >
                              {res.name}
                            </a>
                          </li>
                        ) : (
                          <li key={i}>{typeof res === 'string' ? res : ''}</li>
                        )
                      ))}
                    </ul>
                  </div>
                )}
                <div className="step-actions" style={{ marginTop: 18, display: 'flex', gap: 12 }}>
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


  const roadmapInfo = (
    <div
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--border-color)',
        borderRadius: 12,
        padding: '20px 24px',
        marginBottom: 24,
        boxShadow: '0 2px 8px 0 rgba(124,77,255,0.04)',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        maxWidth: 600,
        margin: '0 auto 24px auto'
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 18, color: 'var(--primary)' }}>
        <i className="fas fa-bullseye" style={{ marginRight: 8 }}></i>
        Goal: <span style={{ color: 'var(--text-primary)' }}>{form.dreamGoal || 'Not set'}</span>
      </div>
      <div style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
        <b>Duration:</b> {form.duration} weeks &nbsp; | &nbsp;
        <b>Knowledge Level:</b> {form.knowledgeLevel ? knowledgeLevels.find(l => l.value === form.knowledgeLevel)?.label : 'Not set'} &nbsp; | &nbsp;
        <b>Daily Time:</b> {form.dailyTime} hours/day
      </div>
    </div>
  );

  return (
    <div className="page active">
      <h1 className="section-title animate-on-scroll">My Roadmap</h1>
      <p className="section-subtitle animate-on-scroll">Your complete AI-powered career roadmap.</p>

      {/* Buttons outside the card */}
      {!showForm && roadmapSteps.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, maxWidth: 600, margin: '0 auto 16px auto' }}>
          <button
            className="step-btn secondary"
            onClick={handleExportPDF}
          >
            <i className="fas fa-download"></i> Save Roadmap
          </button>
          <button
            className="step-btn primary"
            onClick={() => { setShowForm(true); }}
          >
            <i className="fas fa-sync-alt"></i> Regenerate Roadmap
          </button>
        </div>
      )}

      {/* Interactive Info Card */}
      {!showForm && roadmapSteps.length > 0 && roadmapInfo}

      <div className="widget animate-on-scroll" style={{ maxWidth: 600, margin: '0 auto', position: 'relative' }}>
        <div className="widget-header">
          <h3 className="widget-title">Interactive Roadmap Generator</h3>
        </div>
        {showForm ? (
          <form className="roadmap-form" style={{ display: 'flex', flexDirection: 'column', gap: 18 }} onSubmit={e => { e.preventDefault(); handleGenerate(); }}>
            <label>
              Duration (weeks):
              <input type="range" min={4} max={52} step={1} name="duration" value={form.duration} onChange={e => handleSlider('duration', Number(e.target.value))} />
              <span style={{ marginLeft: 8 }}>{form.duration} weeks</span>
            </label>
            <label>
              Dream Goal:
              <textarea name="dreamGoal" rows={2} placeholder="e.g., Become a React developer at a top company, launch my own SaaS, etc." value={form.dreamGoal} onChange={handleInput} />
              {touched.dreamGoal && form.dreamGoal.trim().length <= 10 && <span style={{ color: 'red' }}>Please provide more detail.</span>}
            </label>
            <label>
              Current Knowledge Level:
              <select name="knowledgeLevel" value={form.knowledgeLevel} onChange={handleInput}>
                <option value="">Select level</option>
                {knowledgeLevels.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
              </select>
              <textarea name="knowledgeDetails" rows={2} placeholder="Briefly describe your background, e.g., 'I know HTML/CSS, some JS'" value={form.knowledgeDetails} onChange={handleInput} />
              {touched.knowledgeDetails && form.knowledgeDetails.trim().length <= 5 && <span style={{ color: 'red' }}>Please provide more detail.</span>}
            </label>
            <label>
              Daily Available Time:
              <input type="range" min={1} max={8} step={1} name="dailyTime" value={form.dailyTime} onChange={e => handleSlider('dailyTime', Number(e.target.value))} />
              <span style={{ marginLeft: 8 }}>{form.dailyTime} hours/day</span>
            </label>
            <button className="step-btn primary" type="submit" disabled={!isValid() || loading}>
              {loading ? 'Generating...' : 'Generate Roadmap'}
            </button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
          </form>
        ) : (
          <>
            {stepsRender}
            {loading && <div style={{ marginTop: 16 }}>Loading...</div>}
            {renderError && <div style={{ color: 'red', marginTop: 16 }}>A rendering error occurred: {renderError}</div>}
          </>
        )}
      </div>
    </div>
  );
};

export default Roadmap;
