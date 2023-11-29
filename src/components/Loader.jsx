import fb from "../assets/splash.jpg";

export default function Loader() {
  return (
    // <section className="loading">
    //   <img className="gif" src={gif} alt="gif" />
    //   <div className="meta">
    //     <img className="meta-img" src={meta} alt="meta-icon" />
    //     <p>Logging in....</p>
    //     <div>
    //       <p>
    //         I do not own any logo, pictures, icons, and idea. This website is
    //         for educational purposes only.
    //       </p>
    //       <p>
    //         Copyright Infringement not intended. All Rights Reserved to
    //         Facebook.
    //       </p>
    //     </div>
    //   </div>
    // </section>

    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          background: "#0865FE",
          display: "grid",
          placeItems: "center",
        }}
      >
        <img src={fb} alt="icon" width={500} />
      </div>
    </>
  );
}
