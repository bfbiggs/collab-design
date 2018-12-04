import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../collab-ui/Footer';
import FooterSection from '../../collab-ui/Footer/FooterSection';

import { List, ListItem, SocialList} from '@collab-ui/react';

const AppFooter = () => {
  return (
    <Footer>
      <FooterSection>
        <div>
          <div className="docs-footer__main-title">
            Didn’t find what you need? Have feedback for us? Let us know!
          </div>
          <div className="docs-footer--centered">
            {/* <Button color="blue"> */}
              <Link className="cui-button cui-button--blue" to="/feedback">
              Send feedback
              </Link>
            {/* </Button> */}
          </div>
        </div>
      </FooterSection>

      {/* Footer Mid */}
      {/* <FooterSection>
        <div className="docs-footer__list-container">
          <div>
            <h5 className="docs-footer__list-item-title">Connect</h5>
            <List>
              <ListItem label="24/7 Support" />
              <ListItem label="Developer Events" />
              <ListItem label="Contact Sales" />
            </List>
          </div>
          <div>
            <h5 className="docs-footer__list-item-title">Handy Links</h5>
            <List>
              <ListItem label="Cisco Webex Ambassadors" />
              <ListItem label="Cisco Webex Control Hub" />
              <ListItem label="Cisco Webex Innovation Fund" />
            </List>
          </div>
          <div>
            <h5 className="docs-footer__list-item-title">Resources</h5>
            <List>
              <ListItem label="Open Source Bot Starter Kits" />
              <ListItem label="Download Cisco Webex Teams" />
              <ListItem label="Devnet Learning Labs" />
            </List>
          </div>
          <div>
            <List>
              <ListItem label="Terms Of Service" />
              <ListItem label="Privacy Policy" />
              <ListItem label="Cookie Policy" />
              <ListItem label="Trademarks" />
            </List>
          </div>
        </div>
      </FooterSection> */}

      {/* Footer Bottom */}
      <FooterSection isBottom={true}>
        <div className="docs-footer__bottom--left">
          © 2018 Cisco and /or its affiliate
        </div>
        <div className="docs-footer__bottom-list">
          <List tabType="horizontal" className="docs-footer--flex-item">
            <ListItem style={{ width: '140px', flex: '0 0 auto' }}>
              Support & Feedback
            </ListItem>
            <ListItem style={{ width: '100px', flex: '0 0 auto' }}>
              Developers
            </ListItem>
            <ListItem style={{ width: '100px', flex: '0 0 auto' }}>
              Submit App
            </ListItem>
            <ListItem style={{ width: '70px', flex: '0 0 auto' }}>
              Terms
            </ListItem>
            <ListItem style={{ width: '70px', flex: '0 0 auto' }}>
              Privacy
            </ListItem>
          </List>

          <SocialList className="docs-footer--flex-item">
            <List tabType="horizontal" className="social-list">
              <ListItem>
                <i className="icon icon-facebook-circle_24" />
              </ListItem>
              <ListItem>
                <i className="icon icon-twitter-circle_24" />
              </ListItem>
              <ListItem>
                <i className="icon icon-linkedin-circle_24" />
              </ListItem>
            </List>
          </SocialList>
        </div>
      </FooterSection>
    </Footer>
  );
};

AppFooter.displayName = 'AppFooter';

export default AppFooter;
