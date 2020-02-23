import React, { useState } from "react";
import { TextField, Container, Button } from "@material-ui/core";
import useReadSheet from "../../util/useReadSheet";
import apppendToSheet from "../../util/appendToSheet";
import Entry from "./Entry";

const List = ({ spreadsheetId, tokens }) => {
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [newEntry, setNewEntry] = useState("");
  const sheetValues = useReadSheet(spreadsheetId, tokens, shouldRefresh);

  async function handleSubmit(evt) {
    evt.preventDefault();
    console.log({ newEntry });
    await apppendToSheet(tokens, spreadsheetId, newEntry);
    setNewEntry("");
    setShouldRefresh(!shouldRefresh);
  }

  return (
    <Container>
      {sheetValues &&
        sheetValues.map((entry, index) => <Entry key={index} entry={entry} />)}
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          value={newEntry}
          onChange={e => setNewEntry(e.target.value)}
          name="new-entry"
          label="New Entry"
          variant="outlined"
        />
        <Button variant="contained" type="submit">
          Add
        </Button>
      </form>
    </Container>
  );
};

export default List;
