import { Box, Fab, Stack } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import arrow from "../assets/arrow.png";
import AddIcon from "@mui/icons-material/Add";
import Story from "./Story";
import { useSelector } from "react-redux";

export default function Stories() {
  const [isScrollEnd, setIsScrollEnd] = useState(false);
  const container = useRef();
  const btnNext = useRef();
  const btnPrev = useRef();
  const user = useSelector((state) => state.appReducer.user);

  useEffect(() => {
    //
    if (isScrollEnd) {
      container.current.scrollTo(500, 0);
      btnNext.current.classList.add("active");

      if (btnPrev.current.classList.contains("active")) {
        btnPrev.current.classList.remove("active");
      }
    } else {
      container.current.scrollTo(0, 0);
      btnPrev.current.classList.add("active");
      if (btnNext.current.classList.contains("active")) {
        btnNext.current.classList.remove("active");
      }
    }
  }, [isScrollEnd]);

  // handle function will be executed during the initial mounting and depends on the scrollLeft property of the container
  // it will decide which button to be shown (either prev of next)
  // useEffect(() => {
  //   function handleScroll() {
  //     const currentScrollWidth = container.current.scrollLeft;
  //     //show prev button if scroll width is greater than 200
  //     if (currentScrollWidth > 200) {
  //       btnNext.current.classList.add("active");
  //       btnPrev.current.classList.remove("active");
  //       if (btnPrev.current.classList.contains("active")) {
  //         btnPrev.current.style.display = "block";
  //       }
  //       // else show the next button
  //     } else {
  //       //removing prev button initially  (active will make display none)
  //       btnPrev.current.classList.add("active");
  //       if (btnNext.current.classList.contains("active")) {
  //         btnNext.current.classList.remove("active");
  //       }
  //     }
  //   }

  //   // continuously calling the handleScroll function, on scroll event
  //   container.current.addEventListener("scroll", handleScroll);

  //   // clean up function
  //   return () => {
  //     container.current.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  //On clicking the prev or next buttons this function will be called and it will change
  // isScrolled state and further calling the function inside first useEffect.
  function scroll() {
    // mode call back contain the current value of the state (isScrollEnd)
    setIsScrollEnd((mode) => !mode);
  }

  return (
    <>
      <Stack direction={"column"} className="newsfeed stories-wrapper">
        {/* header */}
        <ul className="stories-header" style={{ display: "flex" }}>
          <li>
            <a href="#!">Stories</a>
            <div className="border-blue"></div>
          </li>
          <li className="hover2">
            <a href="#!" color="text.primary">
              Reels
            </a>
          </li>
          <li className="hover2">
            <a href="#!" color="text.primary">
              Rooms
            </a>
          </li>
        </ul>
        {/* stories */}
        <div
          className="stories-scroll"
          ref={container}
          sx={{ marginBottom: "5rem" }}
        >
          {/* stack behaves like flex box */}
          <Stack direction={"row"} className="stories-container">
            <div className="stories" style={{ border: "1px solid gray" }}>
              <Stack
                direction={"column"}
                className="story"
                style={{
                  backgroundImage: `url(${user.profile_photo})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100%",
                  height: "75%",
                  borderRadius: "0",
                  position: "relative",
                  zIndex: "2",
                }}
              ></Stack>
              <Box>
                <div className="plus-story top-icon">
                  <Fab size="small" color="primary" aria-label="add">
                    <AddIcon />
                  </Fab>
                </div>
                <p>
                  <small
                    id="create-story-text"
                    style={{
                      position: "absolute",
                      top: "90%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      zIndex: "2",
                    }}
                  >
                    Create story
                  </small>
                </p>
              </Box>
            </div>
            <Story
              // image={"https://random.imagecdn.app/500/156"}
              name={"IINV"}
            />
          </Stack>
          <div
            className="top-icon hover2 btn-prev"
            ref={btnPrev}
            onClick={scroll}
          >
            <a>
              <img src={arrow} alt="" />
            </a>
          </div>
          <div
            className="top-icon hover2 btn-next"
            onClick={scroll}
            ref={btnNext}
          >
            <a>
              <img src={arrow} alt="" />
            </a>
          </div>
        </div>
      </Stack>
    </>
  );
}
