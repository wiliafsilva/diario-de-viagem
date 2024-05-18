import React, { useState } from "react";
import axios from "axios";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function App() {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("location", location);
    formData.append("date", date);
    formData.append("description", description);
    formData.append("image", image);

    try {
      await axios.post("http://localhost:3001/api/travel", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("Registro enviado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar registro:", error);
      setMessage("Erro ao enviar registro.");
    }
  };

  return (
    <div className="container">
      <h1 className="title">Diário de Viagem</h1>
      <Carousel autoPlay infiniteLoop showThumbs={false}>
        <div class="imagem">
          <img src="https://www.cvc.com.br/dicas-de-viagem/wp-content/uploads/2019/10/amigos-praia-574356844.jpg" alt="Imagem 1" style={{ width: '500px', height: '300px' }} />
        </div>
        <div class="imagem">
          <img src="https://www.cvc.com.br/dicas-de-viagem/wp-content/uploads/2019/07/Topo-Porto-Seguro-fam%C3%ADlia.jpg" alt="Imagem 2" style={{ width: '500px', height: '300px' }} />
        </div>
        <div class="imagem">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWQoi24bU37bAqdU3IsA4AEJtN6Ti8i-F3t8OcKs1DYw&s" alt="Imagem 3" style={{ width: '500px', height: '300px' }} />
        </div>
        <div class="imagem">
          <img src="https://www.cvc.com.br/dicas-de-viagem/wp-content/uploads/2021/01/destinos-de-ver%C3%A3o.png" alt="Imagem 4" style={{ width: '500px', height: '300px' }} />
        </div>
      </Carousel>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Local da Viagem"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="input"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="input"
        />
        <textarea
          placeholder="Descrição da Viagem"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea"
        ></textarea>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="input"
        />
        <button type="submit" className="button">Enviar</button>
      </form>
      <p className="message">{message}</p>
    </div>
  );
}

export default App;
