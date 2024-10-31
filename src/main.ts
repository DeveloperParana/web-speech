import { create } from "./create";
import './style.css';

const button = create("button", { textContent: 'Ouvir'});

document.body.appendChild(button);

const WebSpeechRecognition =
  window.SpeechRecognition ?? window.webkitSpeechRecognition;

const recognition = new WebSpeechRecognition();

recognition.maxAlternatives = 1
recognition.lang = 'pt-BR'
recognition.interimResults = true
recognition.continuous = true

console.log(recognition);

recognition.onresult = (ev) => {
  const { transcript } = ev.results[0][ev.resultIndex ?? 0];
  

  document.body.appendChild(create('p', { textContent: transcript }))
};

recognition.start();
