import React from 'react';
import { shallow } from 'enzyme';
import ExampleWorkModal from '../js/example-work-modal';

const myExample =
  {
    'title':"Work Example",
    'href': "www.example.com",
    'desc': "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    'image':{
      'desc':"example screenshot of a project involving code",
      'src':"images/example1.png",
      'commment':""
    }
  };

describe("ExampleWorkModal Component", () =>{
  let component = shallow(<ExampleWorkModal example={myExample} open={false}/>);
  let openComponent = shallow(<ExampleWorkModal example={myExample} open={true}/>);
  let anchors = component.find("a");

  it("Should only be one anchor tag", () => {
    expect(anchors.length).toEqual(1);
  });
  it("Should link to our project", () => {
    expect(anchors.node.props.href).toEqual(myExample.href);
  });
  it("Should have the modal set correctly", () => {
    expect(component.find(".background--skyBlue").hasClass('modal--closed')).toEqual(true);
    expect(openComponent.find(".background--skyBlue").hasClass('modal--closed')).toEqual(false);
  });
});
