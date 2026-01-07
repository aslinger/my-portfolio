import React from 'react';
import ExampleWorkModal from './example-work-modal';

class ExampleWork extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      'modalOpen': false,
      'selectedWork': this.props.work[0]
    };
    this.openModel = this.openModel.bind(this);
    this.closeModel = this.closeModel.bind(this);
  }
  openModel(evt, example){
    this.setState({
      'modalOpen':true,
      'selectedWork': example
    });
  }
  closeModel(evt){
    this.setState({
      'modalOpen':false
    });
  }
  render(){
    return (
      <span>
        <section className="section section--alignCentered section--description">

          {this.props.work.map((example, idx) => {
            return (
              <ExampleWorkBubble key={idx} example={example} openModel={this.openModel} closeModel={this.closeModel} />
            );
          })
        }

        </section>
        <ExampleWorkModal example={this.state.selectedWork} open={this.state.modalOpen} closeModel={this.closeModel}/>
      </span>
    )
  }
}

class ExampleWorkBubble extends React.Component{
  render(){
    let example = this.props.example;
    return (
      <div className="section__exampleWrapper"
            onClick={evt => this.props.openModel(evt,example)}>
        <div className="section__example">
          <img alt={ example.image.desc }
               className="section__exampleImage"
               src={ example.image.src }/>
          <dl className="color--cloud">
            <dt className="section__exampleTitle section__text--centered">
              { example.title }
            </dt>
            <dd></dd>
          </dl>
        </div>
      </div>
    );
  }
}
export default ExampleWork;
export {ExampleWorkBubble};
