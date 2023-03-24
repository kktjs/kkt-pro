import { useLocation } from '@kkt/pro';
import { MenusConfigObject, menusConfig } from '@/menus';
import { Divider, MenuLabel, Wrapper, MenuWrapper } from './style';

export interface MenuData {
  divider?: boolean;
  path?: string;
  size?: string | 'small';
  name: string;
}

const getRouters = (data: MenusConfigObject[] = [], path: string = '') => {
  const result: React.ReactNode[] = [];
  data.forEach((item, idx) => {
    if (item.path) {
      result.push(
        <MenuLabel key={idx + (item.path || '')} to={item.path} title={item.title}>
          {item.title}
        </MenuLabel>,
      );
    } else {
      result.push(<Divider key={idx + (item.path || '')}>{item.title}</Divider>);
    }
  });
  return result;
};

const Menu = () => {
  const { pathname } = useLocation();
  const result = getRouters(menusConfig, pathname);
  return (
    <Wrapper>
      <MenuWrapper>{result}</MenuWrapper>
    </Wrapper>
  );
};

export default Menu;
