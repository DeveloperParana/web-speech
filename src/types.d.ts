declare const app: HTMLDivElement;

type SpeechRecognitionErrorCode =
  | 'no-speech'
  | 'aborted'
  | 'audio-capture'
  | 'network'
  | 'not-allowed'
  | 'service-not-allowed'
  | 'bad-grammar'
  | 'language-not-supported';

// SpeechRecognitionErrorEventInit Dictionary
interface SpeechRecognitionErrorEventInit extends EventInit {
  error: SpeechRecognitionErrorCode;
  message?: string;
}

// SpeechRecognitionErrorEvent Interface
interface SpeechRecognitionErrorEvent extends Event {
  readonly error: SpeechRecognitionErrorCode;
  readonly message: string;
}

// SpeechRecognitionAlternative Interface
interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

// SpeechRecognitionResult Interface
interface SpeechRecognitionResult {
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  readonly isFinal: boolean;
}

// SpeechRecognitionResultList Interface
interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
}

// SpeechRecognitionEventInit Dictionary
interface SpeechRecognitionEventInit extends EventInit {
  resultIndex?: number;
  results: SpeechRecognitionResultList;
}

// SpeechRecognitionEvent Interface
interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechGrammar {
  src: string;
  weight: number;
}

declare class SpeechGrammarList {
  readonly length: number;
  item(index: number): SpeechGrammar;
  addFromURI(src: string, weight: number): void;
  addFromString(string: string, weight: number): void;
}

type EventHandler<T, E> = ((this: T, event: E) => any) | null;

interface SpeechRecognitionEventMap {
  audiostart: Event;
  soundstart: Event;
  speechstart: Event;
  speechend: Event;
  soundend: Event;
  audioend: Event;
  result: SpeechRecognitionEventInit;
  nomatch: Event;
  error: Event;
  start: Event;
  end: Event;
}

type SpeechRecognitionEventHandlers = {
  [K in keyof SpeechRecognitionEventMap]: EventHandler<
    SpeechRecognition,
    SpeechRecognitionEventMap[K]
  >;
};

declare var SpeechRecognitionEventHandlers: {
  prototype: SpeechRecognitionEventHandlers;
  new (): SpeechRecognitionEventHandlers;
};

declare class SpeechRecognition extends EventTarget {
  // recognition parameters
  grammars: SpeechGrammarList;
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;

  // methods to drive the speech interaction
  start(): void;
  stop(): void;
  abort(): void;

  onaudiostart: EventHandler<SpeechRecognition, Event>;
  onsoundstart: EventHandler<SpeechRecognition, Event>;
  onspeechstart: EventHandler<SpeechRecognition, Event>;
  onspeechend: EventHandler<SpeechRecognition, Event>;
  onsoundend: EventHandler<SpeechRecognition, Event>;
  onaudioend: EventHandler<SpeechRecognition, Event>;
  onresult: EventHandler<SpeechRecognition, SpeechRecognitionEventInit>;
  onnomatch: EventHandler<SpeechRecognition, Event>;
  onerror: EventHandler<SpeechRecognition, Event>;
  onstart: EventHandler<SpeechRecognition, Event>;
  onend: EventHandler<SpeechRecognition, Event>;

  addEventListener<K extends keyof SpeechRecognitionEventMap>(
    this: SpeechRecognition,
    type: K,
    handler: (event: SpeechRecognitionEventMap[K]) => any
  ): void;

  removeEventListener<K extends keyof SpeechRecognitionEventMap>(
    this: SpeechRecognition,
    type: K,
    handler: (event: SpeechRecognitionEventMap[K]) => any
  ): void;
}

declare var webkitSpeechRecognition: {
  prototype: SpeechRecognition;
  new (): SpeechRecognition;
};

interface Window {
  SpeechRecognition: typeof SpeechRecognition;
  webkitSpeechRecognition: typeof SpeechRecognition;
}
