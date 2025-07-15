import React from 'react';

const InterviewPrep = ({ careerPath, interviewQuestions, showInterviewAnswer, setShowInterviewAnswer }) => {
  return (
    <div className="page active">
      <h1 className="section-title animate-on-scroll">Interview Prep</h1>
      <p className="section-subtitle animate-on-scroll">Prepare for your next interview.</p>
      <div className="widget animate-on-scroll">
        <div className="widget-header">
          <h3 className="widget-title">Practice Question for {careerPath}</h3>
          <div className="widget-actions"><i className="fas fa-ellipsis-h"></i></div>
        </div>
        <div className="interview-card">
          <div className="interview-question">{interviewQuestions[careerPath]?.question}</div>
          {showInterviewAnswer && (
            <div className="interview-answer">
              <p>{interviewQuestions[careerPath]?.answer}</p>
            </div>
          )}
          <div className="interview-actions">
            <button className="step-btn secondary" onClick={() => setShowInterviewAnswer(!showInterviewAnswer)}>
              <i className={`fas ${showInterviewAnswer ? 'fa-eye-slash' : 'fa-eye'}`}></i> {showInterviewAnswer ? 'Hide Answer' : 'Show Answer'}
            </button>
            <button className="step-btn primary">
              <i className="fas fa-thumbs-up"></i> Got It
            </button>
            <button className="step-btn secondary">
              <i className="fas fa-thumbs-down"></i> Need Practice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPrep;
