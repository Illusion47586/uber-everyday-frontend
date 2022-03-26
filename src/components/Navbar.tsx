import {
  ArrowRight,
  DotsThreeOutlineVertical,
  SignIn,
  SignOut,
  X,
} from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useWindowSize } from "react-use";
import { AuthContext, AuthContextInterface } from "../context/AuthContext";

import {
  motion,
  AnimatePresence,
  useViewportScroll,
  AnimateSharedLayout,
} from "framer-motion";

import styles from "../styles/components/navbar.module.scss";
import { Button, ButtonHierarchy, ButtonSize } from "./Button";
import { baseMotionSettings } from "../utils/defaultAnimation";

type Props = {
  to: string;
  title: string;
  onClick?: () => void;
};

const NavItem = (props: Props) => {
  return (
    <NavLink
      to={props.to}
      className={({ isActive }) =>
        isActive ? styles["navLink--active"] : styles.navLink
      }
      onClick={props.onClick}
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
  { to: "/newride", title: "Book New Schedule" },
];

const Navbar = (props: NavProps) => {
  const context = useContext<AuthContextInterface | null>(AuthContext);
  const [links, setLinks] = useState(NormalLinks);
  const [reduce, setReduce] = useState(false);
  const [open, setOpen] = useState(false);
  const { width } = useWindowSize();

  useEffect(() => {
    closeMenu();
    setReduce(width <= 780);
  }, [width]);

  useEffect(() => {
    if (context?.isAuthorized) {
      setLinks(AuthLinks);
    } else {
      setLinks(NormalLinks);
    }
  }, [context?.isAuthorized]);

  const openMenu = () => {
    setOpen(true);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  const reducedToggleHandler = () => {
    if (open) closeMenu();
    else openMenu();
  };

  return (
    <AnimatePresence>
      <motion.nav id={styles.nav} {...baseMotionSettings}>
        <motion.div id={styles.logo}>Uber Everyday</motion.div>
        <AnimatePresence>
          {reduce && (
            <motion.div
              className={styles.reduceButton}
              onClick={reducedToggleHandler}
            >
              {open ? <X size={25} /> : <DotsThreeOutlineVertical size={25} />}
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {(open || !reduce) && (
            <motion.div id={styles.navItems} {...baseMotionSettings}>
              <motion.ul {...baseMotionSettings}>
                {links.map(({ to, title }) => (
                  <motion.li>
                    <NavItem to={to} title={title} onClick={closeMenu} />
                  </motion.li>
                ))}
              </motion.ul>

              <motion.ul {...baseMotionSettings}>
                {context?.isAuthorized ? (
                  <motion.li>
                    <Button
                      size={ButtonSize.small}
                      text="Sign out"
                      onClick={() => {
                        context?.logout();
                        closeMenu();
                      }}
                      hierarchy={ButtonHierarchy.secondary}
                      icon={SignOut}
                      iconWt="bold"
                    />
                  </motion.li>
                ) : (
                  <>
                    <motion.li>
                      <Button
                        size={ButtonSize.small}
                        text="Login"
                        onClick={() => {
                          context?.login();
                          closeMenu();
                        }}
                        icon={SignIn}
                        iconWt="bold"
                      />
                    </motion.li>
                    <motion.li>
                      <Button
                        size={ButtonSize.small}
                        text="Signup"
                        onClick={context?.login}
                        hierarchy={ButtonHierarchy.secondary}
                        icon={ArrowRight}
                        iconWt="bold"
                      />
                    </motion.li>
                  </>
                )}
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </AnimatePresence>
  );
};

export default Navbar;
