import React, { useState } from "react";
import { TagService } from "../../services/tag.service";

const AddTagForm = ({ setTags, setError }) => {
  const tagInitial = {
    title: "",
  };
  const errorsInitial = {
    title: "",
  };

  const [newTag, setNewTag] = useState(tagInitial);
  const [errors, setErrors] = useState(errorsInitial);

  const onTagChange = (event) => {
    setNewTag({
      ...newTag,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (newTag.title.trim().length < 3 || newTag.title.trim().length > 255) {
      if (newTag.title.trim().length < 3) {
        setErrors((prev) => ({
          ...prev,
          title: "The tag title must be at least 3 letters long",
        }));
      }
      if (newTag.title.trim().length > 255) {
        setErrors((prev) => ({
          ...prev,
          title: "The tag title must be less than 255 letters long",
        }));
      }
      return;
    }

    const makeCreateApiRequest = async () => {
      try {
        const abortController = new AbortController();
        const signal = abortController.signal;
        const response = await TagService.createTag(newTag, signal);
        console.log(response);
        setTags((prev) => [...prev, { ...newTag, id: response.id }]);
        setErrors(errorsInitial);
        setNewTag(tagInitial);
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 409) {
          setError(error.response.data);
        } else {
          setError(error.message);
        }
      }
    };

    makeCreateApiRequest();
  };

  return (
    <form onSubmit={onSubmit}>
      <input value={newTag.title} name="title" onChange={onTagChange} />
      {errors.title && <p style={{ color: "darkred" }}>{errors.title}</p>}
      <button style={{ margin: "0px 10px" }} type="submit">
        Add
      </button>
    </form>
  );
};

export default AddTagForm;
