import React from 'react';
import NavBar from "./NavBar";
import Head from 'next/head'


const Layout = ({children}) => {
    return (
        <div>
            <Head>
                <title>Airbnb - The Walking Dead</title>
                <meta name='keywords' content='the walking dead, airbnb' />
                <meta name='description' content='find a home for you' />
            </Head>
            <NavBar />
            <main>{children}</main>
        </div>
    );
};

export default Layout;
