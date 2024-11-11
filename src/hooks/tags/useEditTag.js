import React, { useState } from "react";
import { TagService } from "../../services/tag.service";

export const useEditTag = (setTags, setError) => {
  const tagInitial = {
    id: "",
    title: "",
  };
  const errorsInitial = {
    title: "",
  };

  const [editTag, setEditTag] = useState(tagInitial);
  const [editErrors, setEditErrors] = useState(errorsInitial);

  const handleEditTagSave = () => {
    if (editTag.title.trim().length < 3 || editTag.title.trim().length > 255) {
      if (editTag.title.trim().length < 3) {
        setEditErrors((prev) => {
          return {
            ...prev,
            title: "The tag title must be at least 3 letters long",
          };
        });
      }
      if (editTag.title.trim().length > 255) {
        setEditErrors((prev) => {
          return {
            ...prev,
            title: "The tag title must be less then 255 letters long",
          };
        });
      }
      return;
    }

    const makeUpdateApiRequest = async () => {
      try {
        const abortController = new AbortController();
        const signal = abortController.signal;
        const response = await TagService.updateTag(editTag, signal);

        setTags((prev) =>
          prev.map((el) => {
            if (el.id === editTag.id) {
              return editTag;
            }
            return el;
          })
        );
        setEditErrors(errorsInitial);
        setEditTag(tagInitial);
      } catch (error) {
        console.log(error);
        if (error.status === 409) {
          setError(error.response?.data);
        } else {
          setError(error.message);
        }
      }
    };

    makeUpdateApiRequest();
  };

  const onEditClick = (tag) => {
    setEditTag(tag);
  };

  const handleEditTagChange = (event) => {
    setEditTag({
      ...editTag,
      [event.target.name]: event.target.value,
    });
  };

  return {
    editTag,
    editErrors,
    onEditClick,
    handleEditTagChange,
    handleEditTagSave,
  };
};
