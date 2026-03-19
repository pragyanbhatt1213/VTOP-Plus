'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Code2, Users } from 'lucide-react';

export default function SecurityDetailsSection() {
  const [expanded, setExpanded] = useState(false);
  const [showTechnical, setShowTechnical] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-12"
    >
      {/* Toggle Button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-6 py-4 rounded-xl
                   bg-gradient-to-r from-accent-cyan/5 to-accent-teal/5
                   border border-accent-cyan/20
                   hover:border-accent-cyan/40 transition-all duration-300
                   group"
      >
        <span className="text-sm font-semibold text-accent-cyan flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent-teal group-hover:bg-accent-cyan transition-colors" />
          Learn More About Our Security
        </span>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={18} className="text-accent-cyan" />
        </motion.div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-4">
              {/* Mode Selector */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowTechnical(false)}
                  className={`flex-1 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300
                    ${!showTechnical
                      ? 'bg-accent-cyan/20 border border-accent-cyan/40 text-accent-cyan'
                      : 'bg-accent-cyan/5 border border-accent-cyan/10 text-txt-secondary hover:text-txt-primary'
                    }`}
                >
                  <Users size={14} className="inline mr-1" />
                  For Everyone
                </button>
                <button
                  onClick={() => setShowTechnical(true)}
                  className={`flex-1 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300
                    ${showTechnical
                      ? 'bg-accent-cyan/20 border border-accent-cyan/40 text-accent-cyan'
                      : 'bg-accent-cyan/5 border border-accent-cyan/10 text-txt-secondary hover:text-txt-primary'
                    }`}
                >
                  <Code2 size={14} className="inline mr-1" />
                  For Developers
                </button>
              </div>

              {/* Non-Technical Content */}
              <AnimatePresence mode="wait">
                {!showTechnical && (
                  <motion.div
                    key="simple"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="glass-card p-6 space-y-6"
                  >
                    <h3 className="text-lg font-bold text-txt-primary">How We Keep Your Credentials Safe</h3>

                    <div className="space-y-4">
                      <DetailItem
                        title="Stored Only on Your Device"
                        description="We never send, see, or store your password on any of our servers. Your login details never leave your phone."
                      />
                      <DetailItem
                        title="Bank-Level Device Security"
                        description="When you use the 'Remember Me' feature, your credentials are locked inside your phone's built-in secure vault. This is the exact same highly secure technology your phone uses to protect your fingerprints, Face ID, and mobile payment data."
                      />
                      <DetailItem
                        title="Heavily Encrypted"
                        description="Before being saved to your phone's vault, your data is scrambled (encrypted). This means no other apps, hackers, or even we can read it."
                      />
                      <DetailItem
                        title="Complete Erasure"
                        description="The moment you tap 'Log Out' in the app, your login details are completely and permanently erased from your device."
                      />
                    </div>

                    <div className="pt-4 border-t border-accent-cyan/10">
                      <p className="text-xs text-txt-secondary leading-relaxed">
                        <span className="text-accent-cyan font-semibold">In short:</span> Your password stays with you, protected by the strongest security features Apple and Android have to offer.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Technical Content */}
              <AnimatePresence mode="wait">
                {showTechnical && (
                  <motion.div
                    key="technical"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="glass-card p-6 space-y-6"
                  >
                    <h3 className="text-lg font-bold text-txt-primary">Technical Deep-Dive</h3>

                    <div className="space-y-5">
                      {/* Section 1 */}
                      <div>
                        <h4 className="text-sm font-semibold text-accent-cyan mb-3">1. The Technology Stack</h4>
                        <p className="text-xs text-txt-secondary leading-relaxed mb-3">
                          We use the industry-standard <code className="bg-accent-cyan/10 px-2 py-1 rounded text-accent-cyan font-mono">flutter_secure_storage</code> package. This acts as a direct bridge to native security APIs of your device's OS:
                        </p>
                        <ul className="space-y-2 text-xs text-txt-secondary">
                          <li className="flex gap-2">
                            <span className="text-accent-teal flex-shrink-0 mt-0.5">•</span>
                            <span><span className="font-semibold">Android:</span> EncryptedSharedPreferences with AES-256 encryption and hardware-backed Android KeyStore</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-accent-teal flex-shrink-0 mt-0.5">•</span>
                            <span><span className="font-semibold">iOS:</span> Native Apple Keychain Services</span>
                          </li>
                        </ul>
                      </div>

                      {/* Section 2 */}
                      <div className="border-t border-accent-cyan/10 pt-5">
                        <h4 className="text-sm font-semibold text-accent-cyan mb-3">2. Implementation in Our Code</h4>
                        <CodeBlock title="Initializing Secure Storage">
                          {`import 'package:flutter_secure_storage/flutter_secure_storage.dart';

final FlutterSecureStorage _secureStorage = const FlutterSecureStorage();`}
                        </CodeBlock>

                        <CodeBlock title="Saving Credentials (Remember Me)">
                          {`await _secureStorage.write(key: '_username_key', value: username);
await _secureStorage.write(key: '_password_key', value: password);`}
                        </CodeBlock>

                        <CodeBlock title="Retrieving Credentials (Auto-Login)">
                          {`final storedUsername = await _secureStorage.read(key: '_username_key');
final storedPassword = await _secureStorage.read(key: '_password_key');`}
                        </CodeBlock>

                        <CodeBlock title="Wiping Credentials (Logout)">
                          {`await _secureStorage.delete(key: '_username_key');
await _secureStorage.delete(key: '_password_key');`}
                        </CodeBlock>
                      </div>

                      {/* Section 3 */}
                      <div className="border-t border-accent-cyan/10 pt-5">
                        <h4 className="text-sm font-semibold text-accent-cyan mb-3">3. No Middleman Servers</h4>
                        <p className="text-xs text-txt-secondary leading-relaxed mb-3">
                          Login requests go directly from your phone to the official college VTOP portal via secure HTTPS:
                        </p>
                        <ul className="space-y-2 text-xs text-txt-secondary">
                          <li className="flex gap-2">
                            <span className="text-accent-teal flex-shrink-0 mt-0.5">•</span>
                            <span><span className="font-semibold">No proxy servers:</span> We do not route credentials through our servers</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-accent-teal flex-shrink-0 mt-0.5">•</span>
                            <span><span className="font-semibold">No telemetry:</span> Not logged in analytics or crash-reporting</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-accent-teal flex-shrink-0 mt-0.5">•</span>
                            <span><span className="font-semibold">Two places only:</span> Your phone's vault and college servers</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function DetailItem({ title, description }) {
  return (
    <div className="flex gap-3">
      <div className="w-1 h-auto bg-gradient-to-b from-accent-cyan to-accent-teal rounded-full flex-shrink-0 mt-1" />
      <div>
        <p className="text-sm font-semibold text-txt-primary mb-1">{title}</p>
        <p className="text-xs text-txt-secondary leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function CodeBlock({ title, children }) {
  return (
    <div className="mb-3">
      <p className="text-xs font-mono text-accent-teal mb-2"># {title}</p>
      <pre className="bg-accent-cyan/5 border border-accent-cyan/15 rounded-lg p-3 text-xs font-mono text-txt-primary overflow-x-auto">
        <code>{children}</code>
      </pre>
    </div>
  );
}
