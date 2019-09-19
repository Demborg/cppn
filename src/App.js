import React from 'react';
import './App.css';

const tflink = "https://www.tensorflow.org/js"
const cppnlink = "https://en.wikipedia.org/wiki/Compositional_pattern-producing_network"

class CPPNCanvas extends React.Component {
  componentDidMount() {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d")
    var imageData = ctx.createImageData(100, 100)

    for (var i = 0; i < imageData.data.length; i++) {
      imageData.data[i] = Math.round(255 * Math.random());
    }
  
    ctx.putImageData(imageData, 0, 0);
  }

  render() {
    return (
      <div>
        <canvas ref="canvas" width={100} height={100} />
      </div>
    );
  }
}

function App() {
  return (
    <div>
      <h1>CPPN.js</h1>
      <p>
        Playing with <a href={cppnlink}> CPPNs </a> and <a href={tflink}>tf.js</a> during hackathon
      </p>
      <CPPNCanvas/>
    </div>
  )  
}

export default App;
