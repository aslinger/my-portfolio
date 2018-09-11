import React from "react";
import ReactDOM from "react-dom";
import ExampleWork from "./example-work";
import ExampleWorkModal from "./example-work-modal";

const myWork = [
  {
    title: "Email Pollster",
    href: "https://fast-ocean-28612.herokuapp.com/",
    desc:
      "The basis of this project is from Stephen Grider's Emaily full stack React/Node course. Since completing the class, I have added a variety of improvements in just one week. Some of them are: allowing custom responses, recipient response details, improved survey list UI (with charts), and survey deletion (including confirmation prompt).",
    image: {
      desc: "",
      src: "images/pollster.PNG",
      comment: ""
    }
  },
  {
    title: "Portfolio",
    href: "https://github.com/aslinger/my-portfolio",
    desc:
      "This is a serverless React single-page app hosted on AWS. When commits are pushed to GitHub, CodeBuild deploys the new website to S3 and emails me when the website is updated.",
    image: {
      desc: "",
      src: "",
      comment: ""
    }
  }
];

ReactDOM.render(
  <ExampleWork work={myWork} />,
  document.getElementById("example-work")
);
ReactDOM.render(
  <ExampleWorkModal example={myWork[0]} />,
  document.getElementById("example-work-modal")
);
