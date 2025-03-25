import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaUser, FaLock, FaSpinner, FaLockOpen } from 'react-icons/fa';
import ReCAPTCHA from 'react-google-recaptcha';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import SecurityNotice from './SecurityNotice';
import '../styles/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [captchaValue, setCaptchaValue] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(0);

  useEffect(() => {
    let timer;
    if (lockTimer > 0) {
      timer = setInterval(() => {
        setLockTimer(prev => prev - 1);
      }, 1000);
    } else if (locked) {
      setLocked(false);
    }
    return () => clearInterval(timer);
  }, [lockTimer, locked]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (locked) {
      setError(`Account is locked. Please try again in ${lockTimer} seconds.`);
      return;
    }

    if (!captchaValue) {
      setError('Please complete the CAPTCHA verification');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate failed login
      if (attempts >= 2) {
        setLocked(true);
        setLockTimer(30);
        setError('Too many failed attempts. Account locked for 30 seconds.');
      } else {
        setAttempts(prev => prev + 1);
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  return (
    <div className="login-container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="login-card"
      >
        <div className="login-header">
          {locked ? (
            <FaLockOpen className="icon" />
          ) : (
            <FaShieldAlt className="icon" />
          )}
          <h1>Secure Login</h1>
          <p>Enter your credentials to access your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-group">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                disabled={locked}
              />
              <FaUser className="icon" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-group">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                disabled={locked}
              />
              <FaLock className="icon" />
            </div>
            <PasswordStrengthMeter password={formData.password} />
          </div>

          <div className="remember-forgot">
            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                disabled={locked}
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>

          <div className="flex justify-center">
            <ReCAPTCHA
              sitekey="YOUR_RECAPTCHA_SITE_KEY"
              onChange={handleCaptchaChange}
              disabled={locked}
            />
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || locked}
            className="submit-button"
          >
            {loading ? (
              <FaSpinner className="spinner" />
            ) : locked ? (
              `Locked (${lockTimer}s)`
            ) : (
              'Sign in'
            )}
          </button>
        </form>

        <div className="signup-link">
          <p>
            Don't have an account?{' '}
            <a href="#">Sign up</a>
          </p>
        </div>

        <SecurityNotice />
      </motion.div>
    </div>
  );
};

export default Login; 