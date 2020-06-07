import React from 'react'
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'
import { ExitToAppRounded } from '@material-ui/icons';
import classes from './NavigationItems.module.css'

configure({ adapter: new Adapter() });

describe('<NavigationItems>', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />)
    })

    test('should render 2 Nav Items if not Authenticated', () => {
       expect(wrapper.find(NavigationItem)).toHaveLength(2)
  })
    test('should render 3 Nav Items if  Authenticated', () => {
        wrapper.setProps({ isAuth: true });
      expect(wrapper.find(NavigationItem)).toHaveLength(3);
    })
    test('should render Logout link if Authenticated', () => {
        wrapper.setProps({ isAuth: true });
      expect(wrapper.contains(<NavigationItem link="/logout"><div className={classes.svgDiv}><ExitToAppRounded fontSize="inherit" /></div><span>Logout</span></NavigationItem>)).toEqual(true);
    })
})


