import React, { useEffect, useState, useCallback } from "react";
import TagsTable from "../../../tags/components/table/TagsTable";
import SearchInput from "../../../../components/common/SearchInput";
import AddTagForm from "../AddTagForm";
import LoaderComponent from "../../../../components/common/Loader";
import { TagService } from "../../services/tag.service";
import { useValidateTag } from "../../hooks/useValidateTag";
import { useNotifications } from "../../../../contexts/notifications/useNotifications";
import { useLoading } from "../../../../hooks/useLoading";

const TagComponent = () => {
  const [tags, setTags] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");

  const { loading, turnOnLoading, turnOffLoading } = useLoading(false);
  const { showNotification } = useNotifications();
  const { validateTag } = useValidateTag();

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const fetchTags = async () => {
      try {
        turnOnLoading();
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
        turnOffLoading();
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
      turnOnLoading();

      const makeDeleteApiRequest = async (signal) => {
        try {
          await TagService.deleteTagById(id, signal);
          setTags((prev) => prev.filter((el) => el.id !== id));
          showNotification("Tag deleted successfully", {
            severity: "success",
            autoHideDuration: 5000,
          });
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

      const abortController = new AbortController();
      await makeDeleteApiRequest(abortController.signal);

      turnOffLoading();
    } catch (error) {
      showNotification(error.message, {
        severity: "error",
        autoHideDuration: 5000,
      });
      turnOffLoading();
    }
  }, []);

  const memoizedSaveTagButtonClickCallback = useCallback(async (editTag) => {
    const validationError = validateTag(editTag.title);
    if (validationError) {
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
            prev.map((el) => (el.id === response.id ? response : el))
          );
          showNotification("Tag updated successfully", {
            severity: "success",
            autoHideDuration: 5000,
          });
          return response;
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
          return null;
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
      <SearchInput
        query={filterQuery}
        onQueryChange={handleFilterQueryChange}
      />

      <AddTagForm setTags={setTags} />

      <LoaderComponent loading={loading}>
        <TagsTable
          tags={filteredTags}
          onTagItemDelete={memoizedTagItemDeleteCallback}
          onSaveTagButtonClick={memoizedSaveTagButtonClickCallback}
        />
      </LoaderComponent>
    </div>
  );
};

export default TagComponent;
