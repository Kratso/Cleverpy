import React from 'react';
import logo from './resources/logo.svg';
import './App.css';
import { PostsFeed } from '../features/post-feed/PostFeed';

function App() {
  return (
    <div className="App">
      <section>
        <PostsFeed />
      </section>
    </div>
  );
}

export default App;
