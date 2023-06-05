import './App.css'; //leer el css
import { Configuration, OpenAIApi } from "openai"; //importa las funciones de openai
import { useState } from "react"; //
import totakeke from "./imagenes/totakeke.png";
import musica from  "./sonidos/X2Download.app - cozy animal crossing music (pt 2) (320 kbps).mp3"

function App() {
  
  const [texto, setTexto] = useState(""); //definir la variable de texto 
  const [textoresumido, settextoresumido] = useState("");
  const [loading, setLoading] = useState(false); 
  const [isMusicPlaying, setIsMusicPlaying] = useState(false); //pones canción de fondo


  const handleToggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying); //poner musica boton
  };
  const configuracion = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY, //consumir api de openai
  }); 

  const openai = new OpenAIApi(configuracion);
  
  const HandleSubmit = (e) => {
    setLoading(true);
    settextoresumido("..."); // Display three dots while processing
  
    e.preventDefault();
    openai
      .createCompletion({
        model: "text-davinci-003",
        prompt: generarInmediatamente(texto),
        temperature: 0.6,
        max_tokens: 200,
      })
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          settextoresumido(res?.data?.choices[0]?.text);
        }
      })
      .catch((err) => {
        console.log(err, "Ocurrió un error.");
      });
  };

  function generarInmediatamente(texto) {
    return `Pretend to be Totakeke and give a suggestion of 3 songs that I might like if my favorite song is ${texto}. `;
  }

    return(
      <div className='container'>
      <div className='row'>
      <div className='col-md-12'>
        <h1>
          <span>Totakeke Music Pal</span>
        </h1>
        <h2>
          {" "}
          Totakeke te sugiere cancion con base en tu cancion favorita
          </h2>
      </div>
      </div>


      <div className="dialog-box">
        
        <textarea
        className="form-control speech-bubble"
        placeholder="¡Hola! Soy Totakeke, el famoso músico errante de Animal Crossing. ¡Encantado de conocerte! Estoy aquí para ayudarte a descubrir canciones geniales y brindarte recomendaciones musicales basadas en tus gustos. Solo tienes que contarme cuál es tu canción favorita, y estaré encantado de sugerirte algunas melodías que podrían fascinarte. ¡Así que pregúntame lo que quieras y dejemos que la música nos guíe! 🎵🐾"
        cols={80}
        rows={14}
        value={textoresumido}
        onChange={(e) => setTexto(e.target.value)}
      />
</div>


        <div className='col-md-12' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={totakeke} alt="totakeke" style={{ width: '300px', height: 'auto' }} />
        </div>


        <div>
        <div className="dialog-box">
          <form>
            <h3>¿Cúal es tu canción favorita?</h3>
            <textarea
              className='form-control'
              rows={14}
              cols={80}
              placeholder="¿Cual es tu cancion favorita?"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
            />
          </form>
        </div>
      </div>
      <div>
          <button className='btn btn-primary mt-3 mb-3' type="button" onClick={HandleSubmit}>
            {loading ? "Cargando, espero por favor ..." : "Preguntar!"}
          </button>
        </div>

      <div className="boton de musica">
      {/* Reproductor de música */}
      <audio src={musica} loop autoPlay={isMusicPlaying} />

      {/* Botón de encendido/apagado */}
      <button onClick={handleToggleMusic}>
        {isMusicPlaying ? "Apagar música" : "Encender música"}
      </button>
    </div>

      </div>
    );
  }




export default App;
