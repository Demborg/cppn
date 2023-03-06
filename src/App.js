import React from 'react';
import './App.css';
import '@tensorflow/tfjs'
import { sequential, layers, tensor2d, initializers } from '@tensorflow/tfjs';

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
    this.state = {
      model : null,
      latent: [-1, -1]
    }
  }

  createModel(input_size, num_layers=2, units_per_layer=8) {
    console.time('createModel')
    let seed = window.location.pathname.slice(1)
    if (seed === "") {
      const seed = crypto.randomUUID()
      window.location.pathname = seed
    }
    Math.seedrandom(seed)
    const model = sequential();
    model.add(layers.dense({inputShape: [input_size], units: units_per_layer, activation: 'tanh', kernelInitializer: initializers.randomNormal({stddev: 1})}));
    for (var i = 0; i < num_layers -2; i++){
      model.add(layers.dense({units: units_per_layer, activation: 'tanh', kernelInitializer: initializers.randomNormal({stddev: 1})}));
    }
    model.add(layers.dense({units: channels, activation: 'sigmoid', kernelInitializer: initializers.randomNormal({stddev: 1})}));
    console.timeEnd('createModel')
    return model
  }

  createInput(width, height, latent, scale) {
    console.time('createInput')
    var a = []
    for (var y = 0; y < height; y++) {
      const v = scale * ((2*y/height)-1)
      for (var x = 0; x < width; x++) {
        const u = scale * ((2*x/width)-1)
        a.push([u, v, Math.sqrt(u*u + v*v), ...latent.map(a => scale*a)])
      }
    }
    console.timeEnd('createInput')
    return tensor2d(a)
  }

  updateCanvas() {
    const {width, height, scale} = this.props
    const {model, latent} = this.state
    const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d")
    var imageData = ctx.createImageData(width, height)
    const input = this.createInput(width, height, latent, scale)

    console.time('predict')
    const res = model.predict(input, {batchSize: 2048})
    const res_array = res.arraySync()
    console.timeEnd('predict')

    console.time('paint')
    for (var i = 0; i < res_array.length; i++) {
      for (var c = 0; c < channels; c++) {
        imageData.data[channels * i + c] = Math.round(255 * res_array[i][c])
      }
      imageData.data[channels * i + 3] = 255
    }
  
    ctx.putImageData(imageData, 0, 0);
    console.timeEnd('paint')
  }

  handleOrientaion = (e) => {
    const x = e.beta / 90
    const y = e.gamma / 90
    this.setState({latent: [x, y]}, this.updateCanvas)
    console.log(`latent = [${x};${y}]`)
  }

  componentDidMount() {
    const {num_layers, hidden} = this.props
    const model = this.createModel(2+3, num_layers, hidden)
    this.setState({model: model}, this.updateCanvas)
    window.addEventListener("deviceorientation", this.handleOrientaion, true)
  }

  handleClick = (e) => {
    const targetRect = e.currentTarget.getBoundingClientRect()
    const x = 2 * (e.nativeEvent.offsetX / targetRect.width) - 1
    const y = 2 * (e.nativeEvent.offsetY / targetRect.height) - 1
    this.setState({latent: [x, y]}, this.updateCanvas)
    console.log(`latent = [${x};${y}]`)
  }

  render() {
    return (
      <canvas 
      ref="canvas"
      width={this.props.width} 
      height={this.props.height}
      onMouseMove={this.handleClick}
      className={this.props.className}
      />
    );
  }
}

function App() {
  const params = new URLSearchParams(window.location.search)
  if (params.get("fullscreen")) {
    return <CPPNCanvas width={256} height={256} scale={8} num_layers={6} units_per_layer={8} className='fullscreen'/>
  }
  return (
    <div>
      <h1>CPPN.js</h1>
      <p>
        Playing with <a href={cppnlink}> CPPNs </a> and <a href={tflink}>tf.js</a> during hackathon
      </p>
      <CPPNCanvas width={256} height={256} scale={8} num_layers={6} units_per_layer={8} className='display'/>
      <TitleCard artist="Axel Demborg" year="2019" material="Digital render, programming, mixed languages" name="Art of a Machine"/>
    </div>
  )  
}

export default App;
