import { Button, Form, Input, Select } from "@websqnl/elements"


const input = new Input()
const submitForm = new Button({ textContent: 'falar' })
const form = new Form()
const select = new Select()
const utter = new SpeechSynthesisUtterance()

let textValue = ''

let voices: SpeechSynthesisVoice[] = []
let voice: SpeechSynthesisVoice

speechSynthesis.onvoiceschanged = () => {
    Array.from(select.children).forEach((child) => child.remove())

    voices = speechSynthesis
        .getVoices()
        .filter((voice) => voice.lang === 'pt-BR')

    voices.forEach((v, i) => {
        select.add(new Option(v.name, `${i}`, v.default))
        if (v.default) voice = v
    })
}

select.onchange = () => {
    voice = voices[+select.value]

    utter.voice = voice
    utter.lang = voice.lang  
   
}

form.append(input, select,  submitForm)

    document.body.append(form)

    form.onsubmit = (event) => {
        event.preventDefault()

        utter.text = input.value
        speechSynthesis.speak(utter)
    }