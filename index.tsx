"use client"; // Add this directive at the top

import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

// Declare the custom element in the JSX namespace
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'gecko-coin-heatmap-widget': any;
        }
    }
}

export default function Home() {
    const [activeTab, setActiveTab] = useState('trading');
    const [showFloatingPanel, setShowFloatingPanel] = useState(true);
    const tradingViewRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (activeTab === 'trading') {
            const script = document.createElement('script');
            script.src = 'https://s3.tradingview.com/tv.js';
            script.async = true;
            script.onload = () => {
                new (window as any).TradingView.widget({
                    container_id: 'tradingview_chart',
                    width: '100%',
                    height: 500,
                    symbol: 'BINANCE:BTCUSDT',
                    interval: 'D',
                    timezone: 'Etc/UTC',
                    theme: 'dark',
                    style: '1',
                    locale: 'en',
                    toolbar_bg: '#f1f3f6',
                    enable_publishing: false,
                    allow_symbol_change: true,
                    studies: ['MASimple@tv-basicstudies', 'RSI@tv-basicstudies', 'MACD@tv-basicstudies'],
                });
            };
            tradingViewRef.current?.appendChild(script);
        }
    }, [activeTab]);

    return (
        <div>
            <Head>
                <title>Trading WebApp</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className="header">
                <div className="logo"style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="/white-bull-research-logo.png" alt="White Bull Research" width="80" height="80" />
                     <span style={{ marginLeft: '10px' }}>WHITE BULL RESEARCH</span>
                </div>
                <nav className="nav">
                    <button className={`tab ${activeTab === 'trading' ? 'active' : ''}`} onClick={() => setActiveTab('trading')}>
                        Trading
                    </button>
                    <button className={`tab ${activeTab === 'calendar' ? 'active' : ''}`} onClick={() => setActiveTab('calendar')}>
                        Calendar
                    </button>
                    <button className={`tab ${activeTab === 'tv' ? 'active' : ''}`} onClick={() => setActiveTab('tv')}>
                        TV
                    </button>
                    <button className={`tab ${activeTab === 'radio' ? 'active' : ''}`} onClick={() => setActiveTab('radio')}>
                        Radio
                    </button>
                    <button className={`tab ${activeTab === 'games' ? 'active' : ''}`} onClick={() => setActiveTab('games')}>
                        Games
                    </button>
                    <button className={`tab ${activeTab === 'ecommerce' ? 'active' : ''}`} onClick={() => setActiveTab('ecommerce')}>
                        STORE
                    </button>
                </nav>
            </header>
            
            {activeTab === 'trading' && showFloatingPanel && (
                <div className="floating-panel">
                    <button className="close-button" onClick={() => setShowFloatingPanel(false)}>X</button>
                    <iframe
                        width="100%"
                        height="350px"
                        scrolling="yes"
                        allowTransparency
                        frameBorder="0"
                        src="https://cryptopanic.com/widgets/news/?bg_color=DB1D1D&amp;font_family=sans&amp;header_bg_color=30343B&amp;header_text_color=FFFFFF&amp;link_color=F8FDFF&amp;news_feed=recent&amp;text_color=EDE5E5&amp;title=Salidas%20del%20Horno"
                    ></iframe>
                    <script src="https://widgets.coingecko.com/gecko-coin-heatmap-widget.js"></script>
                    <gecko-coin-heatmap-widget locale="en" outlined="true" top="100"></gecko-coin-heatmap-widget>
                </div>
            )}

            <main className="content">
                {activeTab === 'trading' && (
                    <div className="tab-content active">
                        <div className="panel">
                            <div
                                ref={tradingViewRef}
                                id="tradingview_chart"
                                style={{ width: '100%', height: '500px', margin: '20px 0', border: '1px solid #ccc' }}
                            ></div>
                        </div>
                    </div>
                )}
                {activeTab === 'calendar' && (
                    <div className="tab-content active">
                        <div className="panel">
                            <iframe
                                src="https://sslecal2.investing.com?columns=exc_flags,exc_currency,exc_importance,exc_actual,exc_forecast,exc_previous&features=datepicker,timezone&countries=25,32,6,37,72,22,17,39,14,10,35,43,56,36,110,11,26,12,4,5&calType=week&timeZone=8&lang=1"
                                width="100%"
                                height="600"
                                style={{ border: 'none' }}
                                frameBorder="0"
                                allowTransparency
                                marginWidth="0"
                                marginHeight="0"
                            ></iframe>
                        </div>
                    </div>
                )}
                {activeTab === 'tv' && (
                    <div className="tab-content active">
                        <div className="panel">
                            <h3>Bloomberg TV</h3>
                            <iframe
                                width="100%"
                                height="315"
                                src="https://www.youtube.com/embed/iEpJwprxDdk"
                                frameBorder="0"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="panel">
                            <h3>DW Noticias</h3>
                            <iframe
                                width="100%"
                                height="315"
                                src="https://www.youtube.com/embed/Io5mt83nCcU"
                                frameBorder="0"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="panel">
                            <h3>CARACOL Noticias</h3>
                            <iframe
                                width="100%"
                                height="315"
                                src="https://www.youtube.com/embed/Pc05XrvM1Ag"
                                frameBorder="0"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                )}
                {activeTab === 'radio' && (
                    <div className="tab-content active">
                        <div className="panel">
                            <iframe
                                src="https://www.wradio.com.co/escucha/#!!"
                                width="100%"
                                height="100"
                                style={{ border: 'none' }}
                            ></iframe>
                        </div>
                    </div>
                )}
                {activeTab === 'games' && (
                    <div className="tab-content active">
                        <div className="panel">
                            <h3>Play Snake</h3>
                            <iframe
                                src="https://playsnake.org/"
                                width="100%"
                                height="600"
                                style={{ border: 'none' }}
                            ></iframe>
                        </div>
                        <div className="panel">
                            <h3>Play Tetris</h3>
                            <iframe
                                src="https://www.freetetris.org/game.php"
                                width="100%"
                                height="600"
                                style={{ border: 'none' }}
                            ></iframe>
                        </div>
                    </div>
                )}
                {activeTab === 'ecommerce' && (
                    <div className="tab-content active">
                        <div className="panel">
                            <iframe
                                src="ecommerce"
                                width="100%"
                                height="600"
                                style={{ border: 'none' }}
                                frameBorder="0"
                                allowTransparency
                                marginWidth="0"
                                marginHeight="0"
                            ></iframe>
                        </div>
                    </div>
                )}
            </main> 

            <footer>
                <p>
                    &copy; 2025-2026 Viktorovish Amushkenko. All Rights Reserved. |{' '}
                    <a href="https://directo.intereconomia.com/#!!/directo/" target="_blank" rel="noopener noreferrer">
                        Legal
                    </a> |{' '}
                    <a href="https://www.wradio.com.co/escucha/#!!" target="_blank" rel="noopener noreferrer">
                        About us
                    </a>
                </p>
                <iframe 
                        src="https://onlineradiobox.com/es/intereconomia/?lang=en" 
                        width="100%" 
                        height="89" 
                        style={{ border: 'none' }} 
                        title="Radio"
                    ></iframe>
            </footer>
        </div>
    );
}

