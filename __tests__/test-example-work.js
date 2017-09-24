import React from 'react';
import { shallow } from 'enzyme';
import ExampleWork, {ExampleWorkBubble} from '../js/example-work';

const myWork = [
  {
    'title':"Work Example",
    'image':{
      'desc':"example screenshot of a project involving code",
      'src':"images/example1.png",
      'commment':""
    }
  },
  {
    'title':"Work Example 2",
    'image':{
      'desc':"example screenshot of a project involving chemistry",
      'src':"images/example2.png",
      'commment': `“Chemistry” by Surian Soosay is licensed under CC BY 2.0
                    https://www.flickr.com/photos/ssoosay/4097410999`
    }
  }];

describe("ExampleWork Component", () =>{
  let component = shallow(<ExampleWork work={myWork} />);
  it("Should be a 'section' element", () => {
    expect(component.type()).toEqual('section');
  });
  it("Should contain as many children as there are work examples", () => {
    expect(component.find("ExampleWorkBubble").length).toEqual(myWork.length);
  });
});

describe("ExampleWorkBubble Component", () =>{
  let component = shallow(<ExampleWorkBubble example={myWork[1]} />);
  let images = component.find("img");

  it("Should contain a single img element", () => {
    expect(images.length).toEqual(1);
  });
  it("Should have the img src set correctly", () => {
    expect(images.node.props.src).toEqual(myWork[1].image.src);
  });
});
