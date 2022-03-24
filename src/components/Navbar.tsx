import { ArrowRight, SignIn, SignOut } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext, AuthContextInterface } from "../context/AuthContext";

import styles from "../styles/components/navbar.module.scss";
import { Button, ButtonHierarchy, ButtonSize } from "./Button";

type Props = {
  to: string;
  title: string;
};

const NavItem = (props: Props) => {
  return (
    <NavLink
      to={props.to}
      className={({ isActive }) =>
        isActive ? styles["navLink--active"] : styles.navLink
      }
    >
      {props.title}
    </NavLink>
  );
};

type NavProps = {};

const NormalLinks = [
  { to: "/", title: "Home" },
  { to: "/", title: "Features" },
  { to: "/", title: "Pricing" },
  { to: "/", title: "Billing" },
];

const AuthLinks = [
  { to: "/booked", title: "Current Schedules" },
  { to: "/new", title: "Book New Schedule" },
];

const Navbar = (props: NavProps) => {
  const context = useContext<AuthContextInterface | null>(AuthContext);
  const [links, setLinks] = useState(NormalLinks);

  useEffect(() => {
    if (context?.isAuthorized) {
      setLinks(AuthLinks);
    } else {
      setLinks(NormalLinks);
    }
  }, [context?.isAuthorized]);

  return (
    <nav id={styles.nav}>
      <div id={styles.logo}>Uber Everyday</div>
      <div id={styles.navItems}>
        <ul>
          {links.map(({ to, title }) => (
            <li>
              <NavItem to={to} title={title} />
            </li>
          ))}
        </ul>

        <ul>
          {context?.isAuthorized ? (
            <li>
              <Button
                size={ButtonSize.small}
                text="Sign out"
                onClick={() => { }}
                hierarchy={ButtonHierarchy.secondary}
                icon={SignOut}
                iconWt="bold"
              />
            </li>
          ) : (
            <>
              <li>
                <Button
                  size={ButtonSize.small}
                  text="Login"
                  onClick={() => { }}
                  icon={SignIn}
                  iconWt="bold"
                />
              </li>
              <li>
                <Button
                  size={ButtonSize.small}
                  text="Signup"
                  onClick={() => { }}
                  hierarchy={ButtonHierarchy.secondary}
                  icon={ArrowRight}
                  iconWt="bold"
                />
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
