import { SeoHead } from "@/app/seohead";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import "./globals.css";
import "@/styles/fonts.css";
import "@/styles/clamps.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <SeoHead
        title={"グリーンサクセサリー"}
        titleTemplate={"マイプランター"}
        description={"このページでは、サイト管理者が育てている多肉植物の一覧を確認することができます。"}
        ogType={"website"}
        imgURL={"/assets/og-image.png"}
        siteURL={"https://taniku.blog/planter/"}
      />
      <body className={""}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
