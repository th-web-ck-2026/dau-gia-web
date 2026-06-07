"use client";

import * as S from "./index.styles";
import useNavigationUtils from "./index.utils";

export const Navigation = () => {
  const { menuItems, getActiveKey, pathname } = useNavigationUtils();

  return (
    <S.NavigationMenuWrapper>
      <S.StyledMenu
        mode="horizontal"
        selectedKeys={[getActiveKey(pathname)]}
        items={menuItems}
        disabledOverflow
      />
    </S.NavigationMenuWrapper>
  );
};

export default Navigation;
