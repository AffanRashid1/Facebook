import fb from "../assets/splash.jpg";
import logo from "../assets/logo.png";

export default function Loader() {
  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          background: "white",
          // background: "#0865FE",
          display: "grid",
          placeItems: "center",
        }}
      >
        <img src={logo} alt="icon" width={250} />
      </div>
    </>
  );
}
