import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './style.css';
import { createRoot } from 'react-dom/client';

let loadContainer;

export function init({ container, props = {} } = {}) {
  loadContainer = container;
  const root = createRoot(container);
  root.render(<App {...props} />);
}

export function clean() {
  if (loadContainer) {
    ReactDOM.unmountComponentAtNode(loadContainer);
  }
}

if (process.env.NODE_ENV === "development") {
  init({ container: document.getElementById("root") });
} else {
  const rootContainer = document.getElementById('root');
  const root = createRoot(rootContainer);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
