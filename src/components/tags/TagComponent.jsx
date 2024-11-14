import { useEffect, useState, useCallback } from "react";
import React from "react";
import { TagService } from "../../services/tag.service";
import TagsTable from "./TagsTable";
import SearchInput from "../SearchInput";
import AddTagForm from "./AddTagForm";

const TagComponent = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterQuery, setFilterQuery] = useState("");

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const fetchTags = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await TagService.getAllTags(abortController.signal);
        if (isMounted) {
          setTags(response);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, []);

  const memoizedTagItemDeleteCallback = useCallback(async (id) => {
    try {
      setLoading(true);

      const makeDeleteApiRequest = async (signal) => {
        try {
          await TagService.deleteTagById(id, signal);
          setTags((prev) => prev.filter((el) => el.id !== id));
        } catch (error) {
          console.log(error);
          if (error.response && error.response.status === 409) {
            setError(error.response.data);
          } else {
            setError(error.message);
          }
        }
      };

      const abortController = new AbortController();
      await makeDeleteApiRequest(abortController.signal);

      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }, []);

  const memoizedSaveTagButtonClickCallback = useCallback(async (editTag) => {
    try {
      console.log(editTag);
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
      await makeUpdateApiRequest();
    } catch (error) {
      setError(error.message);
    }
  }, []);

  const handleFilterQueryChange = (event) => {
    setFilterQuery(event.target.value);
  };

  const filteredTags =
    tags?.filter((tag) =>
      Object.keys(tag).some((key) => {
        if (key === "id") return false;
        return String(tag[key])
          .toLowerCase()
          .includes(filterQuery.toLowerCase());
      })
    ) || [];

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {loading && <p>Loading...</p>}
      <h1>Tags List</h1>
      <SearchInput
        query={filterQuery}
        onQueryChange={handleFilterQueryChange}
      />

      <AddTagForm setTags={setTags} setError={setError} />

      <TagsTable
        tags={filteredTags}
        onTagItemDelete={memoizedTagItemDeleteCallback}
        onSaveTagButtonClick={memoizedSaveTagButtonClickCallback}
      />
    </div>
  );
};

export default TagComponent;
