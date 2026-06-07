"use client";

import { CheckCircleFilled, DownOutlined } from "@ant-design/icons";

import { BaseAvatar, BaseDivider, BaseDropdown } from "@/components/common";
import { UserRoleType } from "@/constants";
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

  const displayName =
    user?.userRoles === UserRoleType.CA_NHAN
      ? user?.fullname
      : user?.toChucProfile?.tenToChuc || user?.fullname;

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
                  {getFirstLetterOfLastName(displayName)}
                </BaseAvatar>
              )}
              <div className="info">
                <span className="name">
                  {displayName}
                  {user?.isVerified && (
                    <CheckCircleFilled
                      style={{
                        color: "#22c55e",
                        marginLeft: 4,
                        fontSize: "14px",
                        flexShrink: 0,
                      }}
                    />
                  )}
                </span>
                <span className="email">{user?.email}</span>
              </div>
            </div>
            <BaseDivider size="small"></BaseDivider>
            {menu}
          </S.DropdownWrapper>
        )}
      >
        <S.UserTrigger>
          {user?.avatar ? (
            <BaseAvatar src={user?.avatar} size={36}></BaseAvatar>
          ) : (
            <BaseAvatar size={36}>
              {getFirstLetterOfLastName(displayName)}
            </BaseAvatar>
          )}
          <DownOutlined style={{ fontSize: "10px" }} />
        </S.UserTrigger>
      </BaseDropdown>
    </S.ProfileWrapper>
  );
};

export default Profile;
