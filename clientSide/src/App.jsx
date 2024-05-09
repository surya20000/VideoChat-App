import "./App.css";
import Notifications from "./Components/Notifications";
import Options from "./Components/Options";
import VideoPlayer from "./Components/VideoPlayer";

function App() {
  return (
    <>
      <p className="text-3xl font-bold text-center mt-3 text-slate-700 p-3 rounded-l shadow-lg ">
        Video Calling Application
      </p>
      <hr className="border-t-2 border-black font-bold mx-auto w-20" />
      <VideoPlayer />
      <Options />
      <Notifications />
    </>
  );
}

export default App;
