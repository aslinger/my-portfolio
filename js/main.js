import React from 'react';
import ReactDOM from 'react-dom';
import ExampleWork from './example-work';
import ExampleWorkModal from './example-work-modal';

console.log('Loaded react-dom');

console.log('Loaded webpack');

const myWork = [
  {
    'title':"Work Example",
    'href': "http://www.example.com",
    'desc': "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    'image':{
      'desc':"example screenshot of a project involving code",
      'src':"images/example1.png",
      'comment':""
    }
  },
  {
    'title':"Work Example 2",
    'href': "http://www.example.com",
    'desc': "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    'image':{
      'desc':"example screenshot of a project involving chemistry",
      'src':"images/example2.png",
      'comment': `“Chemistry” by Surian Soosay is licensed under CC BY 2.0
                    https://www.flickr.com/photos/ssoosay/4097410999`
    }
  },
  {
    'title':"Work Example 3",
    'href': "http://www.example.com",
    'desc': "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    'image':{
      'desc':"example screenshot of a project involving cats",
      'src':"images/example3.png",
      'comment':  `“Bengal cat” by roberto shabs is licensed under CC BY 2.0
                     https://www.flickr.com/photos/37287295@N00/2540855181`
    }
  }
];

ReactDOM.render(<ExampleWork work={myWork} />, document.getElementById('example-work'));
ReactDOM.render(<ExampleWorkModal example={myWork[0]} />, document.getElementById('example-work-modal'));
