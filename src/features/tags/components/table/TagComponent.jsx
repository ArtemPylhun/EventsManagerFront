import React, { useEffect, useState, useCallback } from "react";
import { TagService } from "../../services/tag.service";
import TagsTable from "../../../tags/components/table/TagsTable";
import SearchInput from "../../../../components/common/SearchInput";
import AddTagForm from "../AddTagForm";
import { useValidateTag } from "../../hooks/useValidateTag";
import { useNotifications } from "../../../../contexts/notifications/useNotifications";

const TagComponent = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterQuery, setFilterQuery] = useState("");

  const { validateTag, validationError } = useValidateTag();

  const { showNotification } = useNotifications();

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const fetchTags = async () => {
      try {
        setLoading(true);
        const response = await TagService.getAllTags(abortController.signal);
        if (isMounted) {
          setTags(response);
        }
      } catch (error) {
        showNotification(error.message, {
          severity: "error",
          autoHideDuration: 5000,
        });
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
          showNotification("Tag deleted successfully", {
            severity: "success",
            autoHideDuration: 5000,
          });
        } catch (error) {
          console.log(error);
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

      const abortController = new AbortController();
      await makeDeleteApiRequest(abortController.signal);

      setLoading(false);
    } catch (error) {
      showNotification(error.message, {
        severity: "error",
        autoHideDuration: 5000,
      });
      setLoading(false);
    }
  }, []);

  const memoizedSaveTagButtonClickCallback = useCallback(
    async (editTag) => {
      const isValid = validateTag(editTag.title);
      if (!isValid) {
        showNotification(validationError, {
          severity: "error",
          autoHideDuration: 5000,
        });
        return false;
      }

      try {
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
            showNotification("Tag updated successfully", {
              severity: "success",
              autoHideDuration: 5000,
            });
          } catch (error) {
            console.log(error);
            if (error.status === 409) {
              showNotification(error.response?.data, {
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
        await makeUpdateApiRequest();
      } catch (error) {
        showNotification(error.message, {
          severity: "error",
          autoHideDuration: 5000,
        });
      }
      return true;
    },
    [validationError]
  );

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
      {loading && <p>Loading...</p>}
      <SearchInput
        query={filterQuery}
        onQueryChange={handleFilterQueryChange}
      />

      <AddTagForm setTags={setTags} />

      <TagsTable
        tags={filteredTags}
        onTagItemDelete={memoizedTagItemDeleteCallback}
        onSaveTagButtonClick={memoizedSaveTagButtonClickCallback}
      />
    </div>
  );
};

export default TagComponent;
