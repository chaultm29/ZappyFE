export default function Speech(input) {
  const synthRef = window.speechSynthesis;

  var utter = new SpeechSynthesisUtterance(input);
  if (synthRef.speaking) {
    console.error("speechSynthesis.speaking");
    return;
  }
  utter.onend = () => {
  };
  utter.lang = "ja";
  utter.rate = 0.9;
  synthRef.speak(utter);
}
