import React from 'react';

const Settings = ({ 
  userName, 
  userEmail, 
  careerPath, 
  theme, 
  toggleTheme, 
  resetDashboard 
}) => {
  return (
    <div className="page active">
      <h1 className="section-title animate-on-scroll">Settings</h1>
      <p className="section-subtitle animate-on-scroll">Manage your account and preferences.</p>
      
      <div className="widget-grid">
        <div className="widget animate-on-scroll">
          <div className="widget-header">
            <h3 className="widget-title">Profile Settings</h3>
            <div className="widget-actions"><i className="fas fa-ellipsis-h"></i></div>
          </div>
          <form className="settings-form" onSubmit={(e) => {
            e.preventDefault();
            alert('Profile updated! (This is a demo)');
          }}>
            <div className="form-group">
              <label htmlFor="settingsNameInput">Full Name</label>
              <input type="text" id="settingsNameInput" maxLength="50" defaultValue={userName} />
            </div>
            <div className="form-group">
              <label htmlFor="settingsEmailInput">Email Address</label>
              <input type="email" id="settingsEmailInput" defaultValue={userEmail} />
            </div>
            <div className="form-group">
              <label htmlFor="settingsPhoneInput">Phone Number</label>
              <input type="tel" id="settingsPhoneInput" placeholder="+1 (555) 123-4567" />
            </div>
            <div className="form-group">
              <label htmlFor="settingsBioInput">Bio</label>
              <textarea 
                id="settingsBioInput" 
                rows="3" 
                placeholder="Tell us about yourself..." 
                defaultValue={`Aspiring ${careerPath} passionate about technology and continuous learning.`}
              ></textarea>
            </div>
            <button type="submit" className="step-btn primary">Update Profile</button>
          </form>
        </div>

        <div className="widget animate-on-scroll">
          <div className="widget-header">
            <h3 className="widget-title">Account Security</h3>
            <div className="widget-actions"><i className="fas fa-ellipsis-h"></i></div>
          </div>
          <form className="settings-form" onSubmit={(e) => {
            e.preventDefault();
            alert('Password changed successfully! (This is a demo)');
          }}>
            <div className="form-group">
              <label htmlFor="currentPasswordInput">Current Password</label>
              <input type="password" id="currentPasswordInput" placeholder="Enter current password" />
            </div>
            <div className="form-group">
              <label htmlFor="newPasswordInput">New Password</label>
              <input type="password" id="newPasswordInput" placeholder="Enter new password" />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPasswordInput">Confirm New Password</label>
              <input type="password" id="confirmPasswordInput" placeholder="Confirm new password" />
            </div>
            <button type="submit" className="step-btn secondary">Change Password</button>
          </form>
          
          <div className="security-options">
            <h4>Two-Factor Authentication</h4>
            <div className="toggle-option">
              <label className="toggle-label">
                <input type="checkbox" />
                <span className="toggle-slider"></span>
                Enable 2FA for enhanced security
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="widget-grid">
        <div className="widget animate-on-scroll">
          <div className="widget-header">
            <h3 className="widget-title">Preferences</h3>
            <div className="widget-actions"><i className="fas fa-ellipsis-h"></i></div>
          </div>
          <div className="preferences-list">
            <div className="preference-item">
              <div className="preference-info">
                <h4>Theme</h4>
                <p>Choose your preferred theme</p>
              </div>
              <button className="step-btn secondary" onClick={toggleTheme}>
                <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
                {theme === 'light' ? 'Dark' : 'Light'} Mode
              </button>
            </div>
            
            <div className="preference-item">
              <div className="preference-info">
                <h4>Email Notifications</h4>
                <p>Receive updates about your progress</p>
              </div>
              <label className="toggle-label">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>
            
            <div className="preference-item">
              <div className="preference-info">
                <h4>Weekly Digest</h4>
                <p>Get weekly summary of your learning</p>
              </div>
              <label className="toggle-label">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>
            
            <div className="preference-item">
              <div className="preference-info">
                <h4>Push Notifications</h4>
                <p>Receive reminders and updates</p>
              </div>
              <label className="toggle-label">
                <input type="checkbox" />
                <span className="toggle-slider"></span>
              </label>
            </div>
            
            <div className="preference-item">
              <div className="preference-info">
                <h4>Privacy Mode</h4>
                <p>Hide your profile from public view</p>
              </div>
              <label className="toggle-label">
                <input type="checkbox" />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="widget animate-on-scroll">
          <div className="widget-header">
            <h3 className="widget-title">Learning Preferences</h3>
            <div className="widget-actions"><i className="fas fa-ellipsis-h"></i></div>
          </div>
          <form className="settings-form">
            <div className="form-group">
              <label htmlFor="learningGoalInput">Daily Learning Goal (hours)</label>
              <select id="learningGoalInput" defaultValue="2">
                <option value="1">1 hour</option>
                <option value="2">2 hours</option>
                <option value="3">3 hours</option>
                <option value="4">4+ hours</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="difficultyLevel">Preferred Difficulty Level</label>
              <select id="difficultyLevel" defaultValue="intermediate">
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="reminderTime">Daily Reminder Time</label>
              <input type="time" id="reminderTime" defaultValue="09:00" />
            </div>
            
            <button type="submit" className="step-btn primary">Save Preferences</button>
          </form>
        </div>
      </div>

      <div className="widget animate-on-scroll">
        <div className="widget-header">
          <h3 className="widget-title">Data & Privacy</h3>
          <div className="widget-actions"><i className="fas fa-ellipsis-h"></i></div>
        </div>
        <div className="data-actions">
          <button className="step-btn secondary" onClick={() => alert('Exporting data... (This is a demo)')}>
            <i className="fas fa-download"></i> Export My Data
          </button>
          <button className="step-btn secondary" onClick={resetDashboard}>
            <i className="fas fa-refresh"></i> Reset Progress
          </button>
          <button className="step-btn danger" onClick={() => {
            if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
              alert('Account deletion initiated... (This is a demo)');
            }
          }}>
            <i className="fas fa-trash"></i> Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
