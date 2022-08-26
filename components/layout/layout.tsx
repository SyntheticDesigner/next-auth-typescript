import { Fragment } from "react";
import MainNavigation from "./main-navigation";


interface Props {
  children: React.ReactNode;
}

function Layout(props: Props) {
  return (
    <Fragment>
      <MainNavigation />
      <main>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
