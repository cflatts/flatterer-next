import "../styles/globals.css";
import type { AppProps } from "next/app";

// export async function getServerSideProps(context: any) {
//     console.log("CONTEXT", context);
// };

function MyApp({ Component, pageProps }: AppProps) {
    console.log("MAIN");
    return <Component {...pageProps} />
}

export default MyApp;
