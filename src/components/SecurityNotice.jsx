import React from 'react';
import { FaShieldAlt, FaLock, FaUserSecret } from 'react-icons/fa';

const SecurityNotice = () => {
  return (
    <div className="security-notice">
      <h3>
        <FaShieldAlt className="icon" />
        Security Information
      </h3>
      <div className="space-y-3">
        <div className="flex items-start">
          <FaLock className="icon" />
          <p>
            Your connection to this site is secure and encrypted. We use industry-standard SSL/TLS encryption to protect your data.
          </p>
        </div>
        <div className="flex items-start">
          <FaUserSecret className="icon" />
          <p>
            We never store your password in plain text. All sensitive data is encrypted and protected using advanced security measures.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecurityNotice; 