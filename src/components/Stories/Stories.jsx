import { Box, Fab, Stack, Typography } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import arrow from "../../assets/arrow.png";
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

  useEffect(() => {
    function handleScroll() {
      const currentScrollWidth = container.current.scrollLeft;
      if (currentScrollWidth > 200) {
        btnNext.current.classList.add("active");
        btnPrev.current.classList.remove("active");
        if (btnPrev.current.classList.contains("active")) {
          btnPrev.current.style.display = "block";
        }
      } else {
        btnPrev.current.classList.add("active");
        if (btnNext.current.classList.contains("active")) {
          btnNext.current.classList.remove("active");
        }
      }
    }

    container.current.addEventListener("scroll", handleScroll);

    // clean up function
    // return () => {
    //   container.current.removeEventListener("scroll", handleScroll);
    // };
  }, []);

  // On clicking the prev or next buttons this function will be called and it will change
  // isScrolled state and further calling the function inside first useEffect.
  function scroll() {
    // mode call back contain the current value of the state (isScrollEnd)
    setIsScrollEnd((mode) => !mode);
  }

  return (
    <>
      <Stack direction={"column"} className="newsfeed stories-wrapper">
        {/* header */}
        {/* <ul className="stories-header" style={{ display: "flex" }}>
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
        </ul> */}
        {/* stories */}

        <div
          className="stories-scroll"
          ref={container}
          sx={{ marginBottom: "5rem" }}
        >
          <Stack direction={"row"} className="stories-container">
            <div className="stories" style={{ border: "1px solid gray" }}>
              <Stack
                direction={"column"}
                className="story"
                style={{
                  backgroundImage: `url(${user?.profile_photo})`,
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
                <Typography
                  id="create-story-text"
                  sx={{
                    position: "absolute",
                    top: "90%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: "2",
                    fontSize: "12px",
                  }}
                >
                  Create story
                </Typography>
              </Box>
            </div>
            <Story
              image={
                "https://ca.slack-edge.com/T0323TS4AK0-U04HT5FHHP0-a6da41fb65c4-5126"
              }
              name={"Ahad Ilyas"}
            />
            <Story
              image={
                "https://ca.slack-edge.com/T0323TS4AK0-U04HT575P2S-6cb8f52fb4eb-512"
              }
              name={"Yasir Khan"}
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
