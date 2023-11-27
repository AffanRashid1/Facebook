import { useEffect, useRef } from "react";
import gif from "../assets/facebook.gif";
import meta from "../assets/meta.png";

export default function Loader() {
  return (
    <section className="loading">
      <img className="gif" src={gif} alt="gif" />
      <div className="meta">
        <img className="meta-img" src={meta} alt="meta-icon" />
        <p>Logging in....</p>
        <div>
          <p>
            I do not own any logo, pictures, icons, and idea. This website is
            for educational purposes only.
          </p>
          <p>
            Copyright Infringement not intended. All Rights Reserved to
            Facebook.
          </p>
        </div>
      </div>
    </section>
  );
}
