import Head from "next/head";
import Link from "next/link";
import siteMetadata from "/data/siteMetadata";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { parseCookies } from 'nookies'; // 引入nookies来帮助解析cookies
import cookie from 'cookie';

export default function about() {
  const { t } = useTranslation(["common", "pages"]);
  return (
    <>
      <Head>
        <title>{t("common.header.about", { ns: 'common' })} - {siteMetadata.title}</title>
      </Head>

      <div className="layout about flex flex-col gap-6">
        <section>
        <h1 className="">{t("common.header.about", { ns: 'common' })}</h1>
        <p className="mb-3 mt-3 sm:mt-6">
          还有很多事情要做的设计师...
          <br />
          了解我的工作经历，请访问<Link href="/me" target="_blank" title="李瑞东简历">个人简历</Link>。联系我：<span className="select-all whitespace-nowrap">lrdbuff@gmail.com</span>
        </p>
        </section>
        <section>
          <h2 className="text-[22px] font-semibold">关于本站</h2>
          <p className="mt-2 sm:mt-3">
          LRD.IM 是我的个人网站，记录我的设计作品、博客等，是我设计师生涯中很重要的<span className="whitespace-nowrap">一部分。</span>自&thinsp;2017&thinsp;年&thinsp;12&thinsp;月&thinsp;31&thinsp;日建站至今，已经经历了&thinsp;3&thinsp;次 “大型” 改版重构，现在你所看到的网站是使用 <Link href="https://nextjs.org/" target="_blank" rel="noopener noreferrer" title="Next.js">Next.js</Link> 和 <Link href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" title="Tailwind CSS">Tailwind CSS</Link> 搭建<span className="whitespace-nowrap">而成。</span>
          </p>
          
        </section>
        <section>
          <h2 className="text-[22px] font-semibold">其他</h2>
          <p className="mt-2 mb-3">
          本站永久开源，可在 <Link href="https://github.com/Pudge1996/NEXT.LRD.IM" target="_blank" rel="noopener noreferrer" title="Github">Github</Link> 中查看本站代码。同时也可以在 <Link href="/updates" title="Github">What's New</Link> 中查看站点的改版<span className="whitespace-nowrap">记录。</span>
          </p>
        </section>
      </div>
    </>
  );
}

// export async function getServerSideProps({ locale }) {
//   return {
//     props: {
//       // 这里使用 locale 确保加载正确的语言资源
//       ...(await serverSideTranslations(locale, ['common', 'pages'])),
//     },
//   };
// }

// export const getServerSideProps = async (context) => {
//   let { locale } = context;
//   const cookies = parseCookies(context);
//   let userLocale = cookies['NEXT_LOCALE'];

//   if (!userLocale) {
//     const acceptLanguage = context.req.headers["accept-language"];
//     userLocale = acceptLanguage ? acceptLanguage.split(',')[0].split('-')[0] : locale;
//   }

//   return {
//     props: {
//       ...(await serverSideTranslations(userLocale, ['common', 'pages'])),
//     },
//   };
// };

export async function getServerSideProps(context) {
  const { req } = context;
  const cookies = cookie.parse(req ? req.headers.cookie || "" : document.cookie);

  // 尝试从Cookies中获取语言设置，如果没有则使用默认语言
  const locale = cookies['NEXT_LOCALE'] || context.locale || "zh-Hans";

  // 使用serverSideTranslations加载当前语言的翻译资源
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'pages'])),
    },
  };
}