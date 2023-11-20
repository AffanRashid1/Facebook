import { useEffect, useRef } from "react";
import gif from "../assets/facebook.gif";
import meta from "../assets/meta.png";

export default function Loader({ onLoaderFinished }) {
  const preLoader = useRef();

  useEffect(() => {
    //calling the function onLoaderFinished after 9s and it will set isLoading to false
    const timeout = setTimeout(() => {
      preLoader.current.classList.add("hide-load");
      onLoaderFinished();
    }, 9620);

    //clean up
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section className="loading" ref={preLoader}>
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
