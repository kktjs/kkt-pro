import { useRef } from 'react';
import styled from 'styled-components';
import MarkdownPreview, { MarkdownPreviewProps, MarkdownPreviewRef } from '@uiw/react-markdown-preview';
import BackToUp from '@uiw/react-back-to-top';
import { getMetaId, getURLParameters } from 'markdown-react-code-preview-loader';
import CodeLayout from 'react-code-preview-layout';
import { useMdData, MdDataHandle } from './useMdData';
import { useHyperlink } from './useHyperlink';
import './nodes/toc.less';

const Preview = CodeLayout.Preview;
const Code = CodeLayout.Code;
const Toolbar = CodeLayout.Toolbar;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Markdown = styled<
  React.ForwardRefExoticComponent<MarkdownPreviewProps & { loading?: string } & React.RefAttributes<MarkdownPreviewRef>>
>(MarkdownPreview)`
  padding: 20px 30px 40px 30px;
  max-width: 1336px;
  &::after,
  &::before {
    content: none;
  }
`;

const PreviewDocument = ({ path }: { path: MdDataHandle }) => {
  const $dom = useRef<HTMLDivElement>(null);
  const { mdData } = useMdData(path);
  useHyperlink($dom.current);
  return (
    <Wrapper ref={$dom}>
      <Markdown
        disableCopy={true}
        source={mdData.source}
        components={{
          div: ({ node, ...props }) => {
            const { 'data-meta': meta, 'data-md': metaData, ...rest } = props as any;
            const line = node.position?.start.line;
            const metaId = getMetaId(metaData) || String(line);
            const Child = mdData.components[metaId];
            if (meta !== 'preview' || !metaId || typeof Child !== 'function') return <div {...props} />;
            const code = mdData.data[metaId].value || '';
            const param = getURLParameters(meta);
            return (
              <CodeLayout disableCheckered style={{ marginBottom: 18 }}>
                <Preview>
                  <Child />
                </Preview>
                <Toolbar text={code}>{param.title || '示例'}</Toolbar>
                <Code style={{ padding: 0 }}>
                  <pre {...rest} />
                </Code>
              </CodeLayout>
            );
          },
        }}
      />
      <BackToUp element={$dom.current} style={{ float: 'right' }}>
        Top
      </BackToUp>
    </Wrapper>
  );
};
export default PreviewDocument;
