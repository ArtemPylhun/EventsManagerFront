import { useEffect, useState } from "react";
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

      <TagsTable tags={filteredTags} setTags={setTags} setError={setError} />
    </div>
  );
};

export default TagComponent;
