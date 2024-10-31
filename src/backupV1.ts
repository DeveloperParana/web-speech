import { Button, Input } from "@websqnl/elements";
import { create } from "./create";
import './style.css';

const button = create("button", { textContent: 'Ouvir' });

document.body.appendChild(button);

const WebSpeechRecognition =
    window.SpeechRecognition ?? window.webkitSpeechRecognition;

const recognition = new WebSpeechRecognition();

recognition.maxAlternatives = 1;
recognition.lang = 'pt-BR';
recognition.continuous = false;

console.log(recognition);

let voices = [];
let voice;
speechSynthesis.onvoiceschanged = () => {
    voices = speechSynthesis.getVoices().filter((voice) => voice.lang === 'pt-BR');
};

voices = await speechSynthesis.getVoices();

recognition.onresult = (ev) => {
    const { transcript } = ev.results[0][0];


    document.body.appendChild(create('p', { textContent: transcript }));
    const utter = new SpeechSynthesisUtterance(transcript);
    utter.lang = 'pt-BR';
    const voices = speechSynthesis
        .getVoices()
        .filter((voice) => voice.lang === 'pt-BR');
    console.log('voices: ', voices);
    utter.voice = voices[0];
    console.log('utter', utter);
    window.speechSynthesis.speak(utter);
};

button.onclick = () => {
    recognition.start();
};