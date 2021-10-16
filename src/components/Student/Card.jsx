import React, { Component } from 'react';
import hira from '../../assets/img/hiragana.png';
import './css/card.css';
class Card extends Component {
  render() {
    return (
      <div class="col-md-8">
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <img src={hira} />
              <h1 class="key-word">おはいよう</h1>
              <h3 class= "meaning">Chào buổi sáng</h3>
            </div>
            <div class="flip-card-back">
              <h1>John Doe</h1>
              <p>Architect & Engineer</p>
              <p>We love that guy</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;

