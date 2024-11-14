import React, { useState } from "react";
import { TagService } from "../../services/tag.service";
import { useValidateTag } from "../../hooks/tags/useValidateTag";
const AddTagForm = ({ setTags, setError }) => {
  const tagInitial = {
    name: "",
  };

  const [newTag, setNewTag] = useState(tagInitial);
  let { tagValidationErrors, validateTag } = useValidateTag();

  const onTagChange = (event) => {
    setNewTag({
      ...newTag,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (validateTag(newTag.title)) {
      const makeCreateApiRequest = async () => {
        try {
          const abortController = new AbortController();
          const signal = abortController.signal;
          const response = await TagService.createTag(newTag, signal);
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
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input value={newTag.title} name="title" onChange={onTagChange} />
      {tagValidationErrors.title && (
        <p style={{ color: "darkred" }}>{tagValidationErrors.title}</p>
      )}
      <button style={{ margin: "0px 10px" }} type="submit">
        Add
      </button>
    </form>
  );
};

export default AddTagForm;
