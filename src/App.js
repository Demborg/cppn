import React from 'react';
import './App.css';
import '@tensorflow/tfjs'
import { sequential, layers, tensor2d, initializers} from '@tensorflow/tfjs';

const tflink = "https://www.tensorflow.org/js"
const cppnlink = "https://en.wikipedia.org/wiki/Compositional_pattern-producing_network"
const channels = 4

class CPPNCanvas extends React.Component {
  createModel(input_size) {
    const model = sequential();
    model.add(layers.dense({inputShape: [input_size], units: 8, activation: 'tanh', kernelInitializer: initializers.randomNormal({stddev: 1})}));
    model.add(layers.dense({units: 8, activation: 'tanh', kernelInitializer: initializers.randomNormal({stddev: 1})}));
    model.add(layers.dense({units: 8, activation: 'tanh', kernelInitializer: initializers.randomNormal({stddev: 1})}));
    model.add(layers.dense({units: 8, activation: 'tanh', kernelInitializer: initializers.randomNormal({stddev: 1})}));
    model.add(layers.dense({units: 8, activation: 'tanh', kernelInitializer: initializers.randomNormal({stddev: 1})}));
    model.add(layers.dense({units: channels, activation: 'sigmoid', kernelInitializer: initializers.randomNormal({stddev: 1})}));
    return model
  }

  createInput(width, height, latent) {
    var a = []
    for (var y = 0; y < height; y++) {
      const v = 10 * ((2*y/height)-1)
      for (var x = 0; x < width; x++) {
        const u = 10 * ((2*x/width)-1)
        a.push([u, v, Math.sqrt(u*u + v*v), ...latent])
      }
    }
    return tensor2d(a)
  }

  componentDidMount() {
    const {width, height} = this.props
    const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d")
    var imageData = ctx.createImageData(width, height)

    const latent = Array.from({length: 2}, () => (2*Math.random()) -1);
    const input = this.createInput(width, height, latent)
    console.log("data dim: " + input.shape[1])
    
    console.log('creating model')
    const model = this.createModel(input.shape[1])

    const res = model.predict(input)
    const res_array = res.arraySync()

    console.log("min: " + res.min().arraySync() + " max:" + res.max().arraySync())

    for (var i = 0; i < res_array.length; i++) {
      for (var c = 0; c < channels; c++) {
        imageData.data[channels * i + c] = Math.round(255 * res_array[i][c])
      }
    }
  
    ctx.putImageData(imageData, 0, 0);
  }

  render() {
    return (
      <div>
        <canvas 
        ref="canvas" 
        width={this.props.width} 
        height={this.props.height} />
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
      <CPPNCanvas width={256} height={256}/>
    </div>
  )  
}

export default App;
