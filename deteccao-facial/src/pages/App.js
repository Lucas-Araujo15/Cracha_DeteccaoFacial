import { Component } from 'react';
import uuid from 'uuid'
import './App.css';
import { msRest } from "@azure/ms-rest-js"
import { Face } from "@azure/cognitiveservices-face"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <body>
        <div className="tela">
          <div className="campoFoto">
            <div className="imagem">

            </div>
            <button>Tirar foto</button>
          </div>
          <div className="campoImagens">
            <div className="fotos">

            </div>
            <div className="fotos">

            </div>
          </div>
          <button className="btnVerificar">
            Verificar
          </button>
        </div>

      </body>
    );
  }
}

export default App