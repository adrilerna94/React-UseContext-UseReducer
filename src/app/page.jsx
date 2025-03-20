import { Typography } from '@/components/ui';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="p-8 flex flex-col gap-10">
      <Typography variant="h1" color="amber" className="font-bold text-center">
        Mission: USE CONTEXT
      </Typography>
      <Link href='/webSettings'>WebSettings</Link>
    </main>
  );
}




// import { ThemeProvider } from '../context/ThemeContext';
// import { Typography } from '@/components/ui';
// import Link from 'next/link';
// import '../styles/globals.css';

// export default function Home({ Component, pageProps }) {
//   return (
//     <main className="p-8 flex flex-col gap-10">
//       <Typography variant="h1" color="amber" className="font-bold text-center">
//         Mission: USE CONTEXT
//       </Typography>
//       <Link href='/webSettings'>WebSettings</Link>
//       <ThemeProvider>
//         <Component {...pageProps}/>
//       </ThemeProvider>
//     </main>
//   );
// }
