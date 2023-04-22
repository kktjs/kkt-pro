import Preview from '@/components/Preview';

const Page = () => <Preview path={() => import('@kkt/request/README.md')} />;

export default Page;
