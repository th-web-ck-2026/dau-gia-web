"use client";

import { DownOutlined } from "@ant-design/icons";

import { BaseAvatar, BaseDivider, BaseDropdown } from "@/components/common";
import { Link } from "@/i18n/routing";
import { getFirstLetterOfLastName } from "@/utils/common";

import * as S from "./index.styles";
import useProfileUtils from "./index.utils";

export const Profile = () => {
  const { user, isAuthenticated, userMenuItems, handleUserMenuClick, t } =
    useProfileUtils();

  if (!isAuthenticated) {
    return (
      <S.ButtonsWrapper>
        <Link href="/auth/login">
          <S.Button type="primary">{t("login")}</S.Button>
        </Link>
        <Link href="/auth/register">
          <S.Button variant="outlined">{t("register")}</S.Button>
        </Link>
      </S.ButtonsWrapper>
    );
  }

  return (
    <S.ProfileWrapper>
      <BaseDropdown
        menu={{
          items: userMenuItems,
          onClick: handleUserMenuClick,
        }}
        trigger={["hover"]}
        placement="bottomRight"
        dropdownRender={(menu) => (
          <S.DropdownWrapper>
            <div className="drop-top">
              {user?.avatar ? (
                <BaseAvatar src={user?.avatar} size={42}></BaseAvatar>
              ) : (
                <BaseAvatar size={42}>
                  {getFirstLetterOfLastName(user?.fullname)}
                </BaseAvatar>
              )}
              <div className="info">
                <span className="name">{user?.fullname}</span>
                <span className="email">{user?.email}</span>
              </div>
            </div>
            <BaseDivider size="small"></BaseDivider>
            {menu}
          </S.DropdownWrapper>
        )}
      >
        <S.UserTrigger>
          <span>{user?.fullname}</span>
          <DownOutlined style={{ fontSize: "10px" }} />
        </S.UserTrigger>
      </BaseDropdown>
    </S.ProfileWrapper>
  );
};

export default Profile;
