import { useTheme } from "styled-components";
import { NavLink } from "react-router-dom";
import Typography from "@/components/design-system/typography/typography";
import { TypographyCustomization } from "@/components/design-system/typography";
import ArrowDropDownLineIcon from "remixicon-react/ArrowDropDownLineIcon";
import {
  NavBottomPart,
  NavContainer,
  NavUpperPartContainer,
  NavUpperPartItem,
  UserAvatar,
  UserContainer,
} from "./nav.styles";

const navUpperPartTypographyCustomization: Partial<TypographyCustomization> = {
  color: "gray.400",
  size: "xs",
};

const getNavBottomPartTypographyCustomization = (
  isActive = false
): Partial<TypographyCustomization> => {
  if (isActive) {
    return {
      color: "brand.light",
      size: "base",
      weight: "bold",
    };
  }

  return {
    color: "gray.100",
    size: "base",
    weight: "bold",
  };
};

function Nav(props: React.HTMLAttributes<HTMLElement>) {
  return (
    <NavContainer {...props}>
      <div>
        <NavUpperPart />
        <NavBottomPart>
          <NavLink to="/">
            {({ isActive }) => (
              <Typography
                {...getNavBottomPartTypographyCustomization(isActive)}
              >
                Store
              </Typography>
            )}
          </NavLink>
          <NavLink to="/admin/dashboard">
            {({ isActive }) => (
              <Typography
                {...getNavBottomPartTypographyCustomization(isActive)}
              >
                Admin dashboard
              </Typography>
            )}
          </NavLink>
          <Typography {...getNavBottomPartTypographyCustomization()}>
            Library
          </Typography>
        </NavBottomPart>
      </div>

      <User />
    </NavContainer>
  );
}

export function NavUpperPart(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <NavUpperPartContainer {...props}>
      <NavUpperPartItem>
        <Typography {...navUpperPartTypographyCustomization}>
          App name
        </Typography>
      </NavUpperPartItem>
      <NavUpperPartItem>
        <Typography {...navUpperPartTypographyCustomization}>
          Settings
        </Typography>
      </NavUpperPartItem>
    </NavUpperPartContainer>
  );
}

export function User() {
  const theme = useTheme();

  return (
    <UserContainer>
      <UserAvatar src="https://pbs.twimg.com/profile_images/1661517203387355136/xKMtp1IC_400x400.jpg" />
      <Typography>UserName</Typography>
      <ArrowDropDownLineIcon color={theme.colors.blue["500"]} />
    </UserContainer>
  );
}

export default Nav;
