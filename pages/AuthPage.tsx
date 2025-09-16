
import React, { useState } from 'react';

interface AuthPageProps {
  onLogin: (email: string, pass: string) => Promise<void>;
  onSignUp: (email: string, pass: string) => Promise<void>;
  authError: string | null;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin, onSignUp, authError }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (isLogin) {
      await onLogin(email, password);
    } else {
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      await onSignUp(email, password);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-surface p-10 rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-text-primary">
            {isLogin ? 'Sign in to your account' : 'Create a new account'}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 bg-gray-700 text-text-primary placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm rounded-t-md"
                placeholder="Email address"
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isLogin ? "current-password" : "new-password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 bg-gray-700 text-text-primary placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm ${isLogin ? 'rounded-b-md' : ''}`}
                placeholder="Password"
              />
            </div>
            {!isLogin && (
              <div>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 bg-gray-700 text-text-primary placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm rounded-b-md"
                  placeholder="Confirm Password"
                />
              </div>
            )}
          </div>

          {(error || authError) && <p className="text-red-500 text-sm text-center">{error || authError}</p>}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              {isLogin ? 'Sign in' : 'Sign up'}
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-gray-400">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button onClick={() => setIsLogin(!isLogin)} className="font-medium text-primary hover:text-secondary ml-2">
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
