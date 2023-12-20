import { Autocomplete, Avatar, Box, InputBase, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "./navbarStyles";
import { logo } from "../../assets/assets";
import SearchIcon from "@mui/icons-material/Search";
import apiManager from "../../helper/apiManager";
import { setAllUser } from "../../store/reducer";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const NavLeft = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [searchField, setSearchField] = useState("");
  const dispatch = useDispatch();

  const handleSearch = async () => {
    try {
      let res = await apiManager({
        method: "get",
        path: `/users`,
      });
      dispatch(setAllUser(res?.data?.payload));
      setSearchResult(res?.data?.payload);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <>
      <Stack spacing={3} direction={"row"} sx={{ alignItems: "center" }}>
        <Link to="/">
          <img src={logo} alt="" width={40} height={40} />
        </Link>
        <Autocomplete
          freeSolo
          disableClearable
          clearOnBlur
          options={searchResult}
          getOptionLabel={(option) => option.name}
          autoHighlight
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{
                "& > img": { mr: 2, flexShrink: 0 },
              }}
              {...props}
            >
              <Avatar
                sx={{ margin: "0 10px" }}
                loading="lazy"
                width="10"
                src={`${option?.profile_photo}`}
                alt=""
              />

              {option.name}
            </Box>
          )}
          renderInput={(params) => {
            const { InputLabelProps, InputProps, ...rest } = params;
            return (
              <Search>
                <SearchIcon sx={{ color: "gray" }} />
                <InputBase
                  {...params.InputProps}
                  {...rest}
                  onChange={(e) => {
                    setSearchField(e.target.value);
                  }}
                  value={searchField}
                  placeholder="Search Facebook"
                  fullWidth
                />
              </Search>
            );
          }}
        />
      </Stack>
    </>
  );
};

export default NavLeft;
