import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

/**
 * @category controls
 * @component GirdTab
 * @variations collab-ui-design
 */

class GirdTab extends React.Component {

  state = {
    isFixed:false,
    checkTime:0,
    fixedTop:64,
    fixedScrollTop:64
  };

  componentDidMount() {
    let { container } = this.props;
    this.onScrollProxy = e => {
      this.handleScroll(e);
    };
    container.addEventListener('scroll',this.onScrollProxy);
  }

  componentWillUnmount() {
    if(this.onScrollProxy){
      this.props.container.removeEventListener('scroll',this.onScrollProxy); 
    }
  }

  checkDom = () => {
    let { isFixed, checkTime, fixedTop} = this.state,
      offsetHeight = this.getDomPosition(this.refs.gird_tabs).y;
    if(checkTime<2 && !isFixed){
      this.setState({
        checkTime:checkTime+1,
        fixedScrollTop:offsetHeight-fixedTop
      });
    }
  };

  getDomPosition = (pObj) => {
    let _left = pObj.offsetLeft || 0,
      _top = pObj.offsetTop || 0;
    while (pObj = pObj.offsetParent) {
      _left += eval(pObj.offsetLeft);
      _top += pObj.offsetTop;
    }
    return { x: _left, y: _top };
  };

  handleScroll = () => {
    this.checkDom();
    let { container } = this.props,
      {isFixed, fixedScrollTop} = this.state,
      scrollTop = container.pageYOffset || container.scrollTop || 0;
      if(scrollTop>fixedScrollTop){
        if(!isFixed){
          this.setState({ isFixed : true});
        }
      }else if(isFixed){
        this.setState({ isFixed : false});
      }
  };

  render(){
    const { 
      component, 
      matchUrl, 
      hasCodeExamples
    } = this.props;
    let className = 'cui-button-group cui-button-group--blue' + ( this.state.isFixed ? ' gird-tabs-fixed':'' );
    return (
      <div ref='gird_tabs' className={ className }>
        {
          component.style &&
            <NavLink 
              className="cui-button cui-button--36" 
              activeClassName='active' 
              to={`${matchUrl}/style`}
            >
              Style
            </NavLink>
        }
        {
          component.usage &&
            <NavLink 
              className="cui-button cui-button--36" 
              activeClassName='active' 
              to={`${matchUrl}/usage`}
            >
              Usage
            </NavLink>
        }
        {
          hasCodeExamples &&
            <NavLink
              className="cui-button cui-button--36"
              activeClassName='active'
              to={`${matchUrl}/code`}
            >
              Code
            </NavLink>
        }
      </div>
    );
  }
}

GirdTab.propTypes = {
  component: PropTypes.object.isRequired,
  matchUrl: PropTypes.string.isRequired,
  hasCodeExamples: PropTypes.bool.isRequired,
  container:PropTypes.object
};

GirdTab.defaultProps = {
  component: {},
  matchUrl: '',
  hasCodeExamples:false,
  container:window
};

export default GirdTab;
