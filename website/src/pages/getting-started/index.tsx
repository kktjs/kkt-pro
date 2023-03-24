import Preview from '@/components/Preview';

const Page = () => <Preview path={() => import('create-kktp/README.md')} />;

export default Page;
