
import React from 'react';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default Layout;