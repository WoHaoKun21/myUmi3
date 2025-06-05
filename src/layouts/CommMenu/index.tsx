/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState, useEffect } from 'react';
import { NavLink, history } from 'umi';
import { HomeOutlined } from '@ant-design/icons';
import type { CSSProperties } from 'react';
import { Menu } from 'antd';
import type { MenuMode } from '@ant-design/pro-layout/lib/components/SiderMenu/BaseMenu';
import type { MenuTheme } from 'antd/lib/menu/MenuContext';
import routes from '../../../config/routes';
import styles from '../index.less';

interface ICommMenuProps {
  style?: CSSProperties;
  mode?: MenuMode;
  theme?: MenuTheme;
  active?: any;
  showIcon: boolean;
}

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
// 菜单组件
const CommMenu: React.FC<ICommMenuProps> = (props) => {
  const [selectKeys, setSelectKeys] = useState([history.location.pathname]); // 选中Menu.Item
  const { style, mode, theme, active } = props;
  const [tabSw, setTabSw] = useState<boolean>(true);
  const [openKeys, setOpenKeys] = useState<any[]>([]);

  // 生成Menu菜单
  const renderMenu = (data: any[]) =>
    data.map((item) => {
      const img = item.icon ? (
        item.icon.indexOf('/') !== -1 ? (
          <img
            src={`${item.icon}${active}.png`}
            className={styles.icon_style}
          />
        ) : (
          <HomeOutlined style={{ color: '#959FB1', fontSize: 20 }} />
        )
      ) : null;

      if (item?.routes) {
        return (
          <SubMenu icon={img} key={item.path} title={item.name}>
            {renderMenu(item?.routes)}
          </SubMenu>
        );
      }

      return (
        !item.hideInMenu && (
          <MenuItem icon={img} key={item?.path} title={item?.name}>
            <NavLink to={item?.path} title={item.name}>
              {item.name}
            </NavLink>
          </MenuItem>
        )
      );
    });

  // 本地路由和接口路由合并：本地二级路由-routes；接口二级路由-children
  const handleRoutes = (interRoutes: any[], routes?: any[]) => {
    if (routes) {
      return interRoutes?.map((i) => {
        const obj = routes.find((j) => j.path === i.path) || {}; // 得到本地相匹配的路由对象
        const newObj = {
          ...i,
          ...obj,
          name: i.name,
        }; // 两个路由对象合并后得数据
        if (i?.children && obj?.routes) {
          // 如果两得路由对象都有子路由
          newObj.routes = handleRoutes(i.children, obj.routes);
        } else {
          // 其中一个没有子路由，删除本地的子路由数组，听从在线返回的路由的
          delete newObj.routes;
        }
        delete newObj.children; // 将多余的数据数组删除
        return newObj;
      });
    } else {
      return interRoutes;
    }
  };

  useEffect(() => {
    const LsIcon =
      window.localStorage.getItem('showTabBox') == 'true'
        ? true
        : window.localStorage.getItem('showTabBox') == 'false'
        ? false
        : true;
    setTabSw(LsIcon);
  }, []);

  return (
    <div
      id="nav_box"
      className={styles.nav_link}
      style={{ width: !tabSw ? 0 : '' }}
    >
      <Menu
        theme={theme}
        mode={mode as any}
        style={{ ...style }}
        selectedKeys={selectKeys}
        openKeys={openKeys}
        onClick={(o: any) => setSelectKeys([o.key])}
        onOpenChange={(o: any) => setOpenKeys([o[1]])}
      >
        {renderMenu(handleRoutes(routes[0].routes!))}
      </Menu>
    </div>
  );
};

CommMenu.defaultProps = {
  mode: 'inline',
  theme: 'light',
  active: '',
};

export default React.memo(CommMenu);
