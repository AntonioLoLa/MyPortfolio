import { setRequestLocale } from 'next-intl/server';
import Masthead from '@/components/layout/Masthead';
import InViewObserver from '@/components/ui/InViewObserver';
import Band from '@/components/ui/Band';
import Cover from '@/components/sections/Cover';
import Contents from '@/components/sections/Contents';
import Resolver from '@/components/sections/Resolver';
import F1 from '@/components/sections/F1';
import Practice from '@/components/sections/Practice';
import Workshop from '@/components/sections/Workshop';
import Trajectory from '@/components/sections/Trajectory';
import Contact from '@/components/sections/Contact';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Masthead />
      <main id="main">
        {/* One band per block, alternating base and light paper. */}
        <Band className="!pt-0">
          <Cover />
          <Contents />
        </Band>
        <Band tone="light">
          <Resolver />
        </Band>
        <Band>
          <F1 />
        </Band>
        <Band tone="light">
          <Practice />
        </Band>
        <Band>
          <Workshop />
        </Band>
        <Band tone="light">
          <Trajectory />
        </Band>
      </main>
      <Band className="!pb-0">
        <Contact />
      </Band>
      <InViewObserver />
    </>
  );
}
