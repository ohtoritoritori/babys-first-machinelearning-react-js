import React, {Component} from 'react';
import './App.css';
import * as ml5 from 'ml5';
import bubbleGum from './assets/Bubblegum.ttf';

export default class App extends Component {

  state = {
    buttonText: 'Click',
    imageUrl: '',
    ready: false,
    predictionLabel: '',
    predictionConfidence: '',
    predicted: false
  }

  loadImage = (event) => {
    const image = event.target.files[0];
    this.setState({
      imageUrl: window.URL.createObjectURL(image),
    })
    console.log(this.state.image)
  }

  classifyImage = async () => {
    const classifier = await ml5.imageClassifier('MobileNet')
    this.setState({ ready: true })
    const image = document.getElementById("image")
    classifier.predict(image, 1, (err, results) => {
      this.setState({
        predictionLabel: results[0].label,
        predictionConfidence: results[0].confidence,
        predicted: true
      })
    })
  }
  render() {
    return (
      <div style={{justifyContent: 'center', alignItems: 'center', alignContent: 'center', position: 'absolute'}}>
        <h1 style={{textAlign: 'center', fontFamily: "bubbleGum", fontSize: 60}}>Hello,</h1>
        <h1 style={{textAlign: 'center', fontFamily: "bubbleGum", fontSize: 40}}>Please choose a photo for me to classify.</h1>
        <div style={{justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
          <input style={{position: 'absolute', justifyContent: 'center'}} type="file" accept="image/*" onChange={this.loadImage}/>
        </div>
        {this.state.imageUrl && 
          <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
            <img id="image" src={this.state.imageUrl} alt="to be classified" height={500} />
            <button title={this.state.buttonText} style={{width: 100, height: 30}} onClick={this.classifyImage}></button>
          </div>
        }
        {
          this.state.predicted &&
            <p style={{textAlign: 'center', fontFamily: "bubbleGum", fontSize: 20}}>The app is {this.state.predictionConfidence * 100}% sure that this is {this.state.predictionLabel.split(",")[0]}</p>
        }
      </div>
    )
  }
}