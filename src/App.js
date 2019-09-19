import React from 'react';
import './App.css';
import '@tensorflow/tfjs'
import { sequential, layers, tensor2d, initializers} from '@tensorflow/tfjs';

const tflink = "https://www.tensorflow.org/js"
const cppnlink = "https://en.wikipedia.org/wiki/Compositional_pattern-producing_network"
const channels = 4

class TitleCard extends React.Component {
  render () {
    const {artist, year, name, material} = this.props
    return (
      <div className="card">
        <span className="artist">{artist}</span> <br/>
        <span className="name">{name}</span> <span className="year">{year}</span> <br/>
        <span className="material">{material}</span>

      </div>
    )
  }
}

class CPPNCanvas extends React.Component {
  constructor(props) {
    super(props)
    this.state = { model : null}
  }

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

  createInput(width, height, latent, scale) {
    var a = []
    for (var y = 0; y < height; y++) {
      const v = scale * ((2*y/height)-1)
      for (var x = 0; x < width; x++) {
        const u = scale * ((2*x/width)-1)
        a.push([u, v, Math.sqrt(u*u + v*v), ...latent.map(a => scale*a)])
      }
    }
    return tensor2d(a)
  }

  componentDidMount() {
    const {num_layers, hidden, width, height, scale} = this.props

    
    console.log('creating model')
    const model = this.createModel(2+3, num_layers, hidden)
    this.setState({model: model})
    const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d")
    var imageData = ctx.createImageData(width, height)
    const input = this.createInput(width, height, [1, -1], scale)

    const res = model.predict(input)
    const res_array = res.arraySync()

    for (var i = 0; i < res_array.length; i++) {
      for (var c = 0; c < channels; c++) {
        imageData.data[channels * i + c] = Math.round(255 * res_array[i][c])
      }
      imageData.data[channels * i + 3] = 255
    }
  
    ctx.putImageData(imageData, 0, 0);
  }

  render() {
    return (
      <div>
        <canvas 
        ref="canvas"
        width={this.props.width} 
        height={this.props.height}
        />
        <br/>
        <TitleCard artist="Axel Demborg" year="2019" material="Digital render, programming, mixed languages" name="Art of a Machine"/>
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
      <CPPNCanvas width={256} height={256} scale={8}/>
    </div>
  )  
}

export default App;
