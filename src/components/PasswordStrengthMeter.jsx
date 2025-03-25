import React from 'react';

const PasswordStrengthMeter = ({ password }) => {
  const calculateStrength = (password) => {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    if (password.match(/[$@#&!]+/)) strength++;

    return strength;
  };

  const getStrengthText = (strength) => {
    switch (strength) {
      case 0:
        return { text: 'Very Weak', color: 'strength-very-weak' };
      case 1:
        return { text: 'Weak', color: 'strength-weak' };
      case 2:
        return { text: 'Fair', color: 'strength-fair' };
      case 3:
        return { text: 'Good', color: 'strength-good' };
      case 4:
      case 5:
        return { text: 'Strong', color: 'strength-strong' };
      default:
        return { text: '', color: '' };
    }
  };

  const strength = calculateStrength(password);
  const { text, color } = getStrengthText(strength);

  return (
    <div className="password-strength">
      <div className="strength-text">
        Password Strength: <span className={color.replace('strength-', 'text-')}>{text}</span>
      </div>
      <div className="strength-bar">
        <div className={`strength-bar-fill ${color}`}></div>
      </div>
      <ul className="strength-requirements">
        <li className={password.length >= 8 ? 'valid' : ''}>
          At least 8 characters
        </li>
        <li className={password.match(/[a-z]+/) ? 'valid' : ''}>
          One lowercase letter
        </li>
        <li className={password.match(/[A-Z]+/) ? 'valid' : ''}>
          One uppercase letter
        </li>
        <li className={password.match(/[0-9]+/) ? 'valid' : ''}>
          One number
        </li>
        <li className={password.match(/[$@#&!]+/) ? 'valid' : ''}>
          One special character
        </li>
      </ul>
    </div>
  );
};

export default PasswordStrengthMeter; 