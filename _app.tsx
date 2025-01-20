import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';

function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <header className="header">
                <div className="logo">WhiteBullResearch©</div>
                <nav className="nav">
                    <a href="/" className="tab">Home</a>
                    <a 
                        href="https://www.investing.com/economic-calendar/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="tab"
                    >
                        Investing
                    </a>
                    <a 
                        href="https://www.wradio.com.co/escucha/#!!" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="tab"
                    >
                        Radio
                    </a>
                </nav>
            </header>
            <main className="content">
                <Component {...pageProps} />
            </main>
            <footer>
                <p>&copy; 2025-2026 Viktorovish Amushkenko©. All Rights Reserved.</p>
                <p>
                    <a 
                        href="https://www.investing.com/economic-calendar/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        Investing Calendar
                    </a> | 
                    <iframe 
                        src="https://onlineradiobox.com/es/intereconomia/?lang=en" 
                        width="100%" 
                        height="89" 
                        style={{ border: 'none' }} 
                        title="Radio"
                    ></iframe>
                </p>
            </footer>
        </>
    );
}

export default App;
