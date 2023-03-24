import Preview from '@/components/Preview';

const Page = () => <Preview path={() => import('@kkt/plugin-pro-config/README.md')} />;

export default Page;
