import "/styles/globals.css";
import React from "react";
import Layout from "/components/layout";
import Head from "next/head";
import siteMetadata from "/data/siteMetadata";
import { ThemeProvider } from "next-themes";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { Analytics } from '@vercel/analytics/react';
import useLanguageSetting from '/utils/useLanguageSetting';
import { appWithTranslation } from 'next-i18next'
import nextI18nConfig from '../next-i18next.config'


function MyApp({ Component, pageProps, t }) {
  const locale =
  typeof window !== "undefined"
  ? window.localStorage.getItem("i18nextLng")
  : "zh-Hans";
  
  // useLanguageSetting(locale);
  // const { t } = useTranslation('common','components', 'pages');
  return (
    <React.Suspense fallback="loading">
      <Head>
        <meta name="author" content={siteMetadata.author} />
        <meta name="description" content={siteMetadata.description} />

        {/* For Soical Meida (openGraph) */}
        <meta property="og:image" content="网站宽屏图（16:9）" />
        <meta property="og:image:alt" content="网站宽屏图的描述" />
        <meta name="og:type" content="summary" />
        <meta name="twitter:site" content="@Pudge_1996" />
        <meta name="twitter:creator" content="@Pudge_1996" />
      </Head>
      <GoogleAnalytics trackPageViews={{ ignoreHashChange: true }} />
      <ThemeProvider attribute="class" storageKey="theme">
        <Layout>
          <Component {...pageProps}/>
          <Analytics />
        </Layout>
      </ThemeProvider>
    </React.Suspense>
  );
}

export default appWithTranslation(MyApp, nextI18nConfig)
