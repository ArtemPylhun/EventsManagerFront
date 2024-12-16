import React, { useState } from "react";
import { Button, TextField, Container } from "@mui/material";
import { TagService } from "../services/tag.service";
import { useValidateTag } from "../hooks/useValidateTag";
import { useNotifications } from "../../../contexts/notifications/useNotifications";

const AddTagForm = ({ setTags }) => {
  const tagInitial = {
    title: "",
  };

  const [newTag, setNewTag] = useState(tagInitial);

  const { showNotification } = useNotifications();
  let { validateTag } = useValidateTag();

  const onTagChange = (event) => {
    const { name, value } = event.target;
    setNewTag((prevTag) => ({
      ...prevTag,
      [name]: value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const validationError = validateTag(newTag.title);
    if (validationError) {
      showNotification(validationError, {
        severity: "error",
        autoHideDuration: 5000,
      });
      return;
    }
    const makeCreateApiRequest = async () => {
      try {
        const abortController = new AbortController();
        const signal = abortController.signal;
        const response = await TagService.createTag(newTag, signal);
        showNotification("Tag created successfully", {
          severity: "success",
          autoHideDuration: 5000,
        });
        setTags((prev) => [...prev, { ...newTag, id: response.id }]);
        setNewTag(tagInitial);
      } catch (error) {
        if (error.response && error.response.status === 409) {
          showNotification(error.response.data, {
            severity: "error",
            autoHideDuration: 5000,
          });
        } else {
          showNotification(error.message, {
            severity: "error",
            autoHideDuration: 5000,
          });
        }
      }
    };

    await makeCreateApiRequest();
  };

  return (
    <form onSubmit={onSubmit}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          justifyContent: "space-between",
        }}
      >
        <TextField
          value={newTag.title}
          name="title"
          label="Title"
          onChange={onTagChange}
          variant="outlined"
        />
        <Button type="submit" variant="contained">
          Add
        </Button>
      </Container>
    </form>
  );
};

export default AddTagForm;
