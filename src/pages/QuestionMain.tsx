import axios from "axios";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";

export const QuestionMain = () => {
  const [users, setUsers] = useState<usersData[]>([]);
  const [tableKeys, setTableKeys] = useState<string[]>([]);
  const [lookingForSource, setLookingForSource] = useState("");
  const [lookingForTarget, setLookingForTarget] = useState("");
  const [targetValue, setTargetValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTargetValue(event.target.value);
  };

  type usersData = {
    firstName: string;
    lastName: string;
    tcsid: string;
    email: string;
    createdTS: string;
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("https://c4-back.azurewebsites.net/form", {
        headers: { key: "c4forever!" },
      });
      //   console.log(result.data);

      setUsers(result.data);
      setTableKeys(Object.keys(users[0]));
    };

    // console.log(users);

    fetchData();
  }, [users]);

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* {users?.map((value, index) => {
        return (
          <ul>
            <li>{value.firstName}</li>
            <li>{value.lastName}</li>
            <li>{value.email}</li>
            <li>{value.createdTS}</li>
          </ul>
        );
      })} */}
      <Autocomplete
        disablePortal
        inputValue={lookingForSource}
        onInputChange={(event, newInputValue) => {
          setLookingForSource(newInputValue);
        }}
        id="looking-for-source"
        options={tableKeys}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="I want to know the..." />
        )}
      />
      <br />
      <div className="flex-container">
        <div className="flex-child">
          <Autocomplete
            disablePortal
            inputValue={lookingForTarget}
            onInputChange={(event, newInputValue) => {
              setLookingForTarget(newInputValue);
            }}
            id="looking-for-target"
            options={tableKeys}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="of..."
                helperText="Value you want to search for"
              />
            )}
          />
        </div>
        <div className="flex-child">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="target-val-select"
              select
              label="Select"
              value={targetValue}
              onChange={handleChange}
            >
              {/* todo: this needs to find a way to use the selected type rather than hardcoded "firstname" */}
              {users.map((option, ix) => (
                <MenuItem key={ix} value={option["firstName"]}>
                  {option.firstName}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </div>
      </div>
    </div>
  );
};
