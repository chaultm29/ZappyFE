export default function Speech(input) {
  const synthRef = window.speechSynthesis;

  var utter = new SpeechSynthesisUtterance(input);
  if (synthRef.speaking) {
    console.error("speechSynthesis.speaking");
    return;
  }
  utter.onend = () => {
    console.log("On End");
  };
  utter.lang = "jp";
  utter.rate = 0.5;
  synthRef.speak(utter);
}
