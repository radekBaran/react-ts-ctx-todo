import React, { useState } from "react";
import { Button, Card, Stack } from "react-bootstrap";
import { useTodoContext } from "../context/TodoContextProvider";
import AddTaskItem from "./AddTaskItem";
import { TCategory } from "./AddTodoCategoryItem";
import ViewTasksModal from "./ViewTasksModal";

type TCategoryItemCard = {
  key: string;
  categoryName: string;
  categoryDescription: string;
  category: TCategory;
};

const CategoryItemCard: React.FC<TCategoryItemCard> = ({
  categoryName,
  categoryDescription,
  category,
}) => {
  const [showAddTaskItem, setShowAddTaskItem] = useState<boolean>(false);
  const [showTaskItems, setShowTaskItems] = useState<boolean>(false);

  const { deleteCategory, getTasksByCategoryId } = useTodoContext();

  return (
    <>
      <Card className="bg-light mb-2">
        <Card.Body>
          <Card.Title className="justify-content-between align-items-baseling fw-normal mb-3">
            <div className="me-2">
              <Button
                style={{ float: "right" }}
                onClick={() => {
                  deleteCategory(category.id);
                }}
                size="sm"
                variant="outline-danger"
              >
                &times;
              </Button>
              <h2>{categoryName}</h2>
              <h5>{categoryDescription}</h5>
              <small>
                Ilość zadań: {getTasksByCategoryId(category.id).length}
              </small>
            </div>
          </Card.Title>
        </Card.Body>
        <Stack direction="horizontal" gap={2}>
          <Button
            variant="outline-primary"
            className="ms-auto"
            onClick={() => setShowAddTaskItem(true)}
          >
            Dodaj zadanie
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => setShowTaskItems(true)}
          >
            Podgląd zadań
          </Button>
        </Stack>
      </Card>
      <AddTaskItem
        show={showAddTaskItem}
        handleClose={() => setShowAddTaskItem(false)}
        category={category}
      />
      <ViewTasksModal
        show={showTaskItems}
        handleClose={() => setShowTaskItems(false)}
        category={category}
      />
    </>
  );
};

export default CategoryItemCard;
