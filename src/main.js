import "twind/shim";
import MainApp from "./components/main-app";
import StepZero from "./components/step-zero";
import StepOne from "./components/step-one";
import StepThree from "./components/step-three";
import StepFour from "./components/step-four";
import YoutubeVideoItem from "./components/youtube-video-item";

customElements.define("main-app", MainApp);
customElements.define("step-zero", StepZero);
customElements.define("step-one", StepOne);
customElements.define("youtube-video-item", YoutubeVideoItem);
customElements.define("step-three", StepThree);
customElements.define("step-four", StepFour);
