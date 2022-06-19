import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Avatar } from "@progress/kendo-react-layout";
import { AppBar, AppBarSection, AppBarSpacer } from '@progress/kendo-react-layout';

const Header = () => {
    return (
      <React.Fragment>
        <div>
        <AppBar style={{background:'#fff',color:'#000',padding:'10px 3%'}}>
          <AppBarSection>
            <img src='https://res.cloudinary.com/dptwgnj8t/image/upload/v1655205998/effigo-logo_zinm5a.jpg' alt='logo' style={{height:"2rem",width:'100%'}}/>
          </AppBarSection>

          <AppBarSpacer style={{ width: 8 }} />


          <AppBarSpacer style={{ width: 32 }} />


          <AppBarSpacer />

          <AppBarSection className="social-section">
          <Avatar type="icon" size="medium" style={{background:'#000',color:'#fff'}}>
          <span className="k-icon k-i-user"></span>
        </Avatar>
        <h6>&nbsp;User!</h6>
          </AppBarSection>
        </AppBar>
    
            </div>
      </React.Fragment>
    );
};
export default Header