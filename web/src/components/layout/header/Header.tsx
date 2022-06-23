import * as React from "react";
import { useSearchParams } from "react-router-dom";
import { Avatar } from "@progress/kendo-react-layout";
import {
  AppBar,
  AppBarSection,
  AppBarSpacer,
} from "@progress/kendo-react-layout";
import { useContext } from "react";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

import GraphsContext from "../../../context";

const Header = () => {
  const [searchParams] = useSearchParams();
  const jwtToken: any = Cookies.get("jwt_token");
  const { loginUser, dropdownList, ChangeUserName } = useContext(GraphsContext);
  const decodedToken: any = jwt_decode(jwtToken);

  ChangeUserName(decodedToken.user_name);

  return (
    <React.Fragment>
      <div>
        <AppBar
          style={{
            background: "#fff",
            color: "#000",
            padding: "10px 5%",
            height: "60px",
          }}
        >
          <AppBarSection>
            <img
              src="https://res.cloudinary.com/dptwgnj8t/image/upload/v1655205998/effigo-logo_zinm5a.jpg"
              alt="logo"
              style={{ height: "2rem", width: "100%" }}
            />
          </AppBarSection>

          <AppBarSpacer style={{ width: 8 }} />

          <AppBarSpacer style={{ width: 32 }} />

          <AppBarSpacer />

          <AppBarSection className="social-section">
            <Avatar
              type="icon"
              size="medium"
              style={{ background: "#000", color: "#fff" }}
            >
              <span className="k-icon k-i-user"></span>
            </Avatar>
            <h6>&nbsp;&nbsp;{loginUser}!</h6>
          </AppBarSection>
        </AppBar>
      </div>
    </React.Fragment>
  );
};
export default Header;
