import Link from 'next/link';
import { Metadata } from 'next';


export const metadata: Metadata = { title: 'About | Next App' };


export default function AboutLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>
    <h1>About us</h1>
    <ul>
      <li><Link href='/about/contacts'>Contact</Link></li>
      <li><Link href='/about/team'>Team</Link></li>
    </ul>
    {children}
  </div>;
}
