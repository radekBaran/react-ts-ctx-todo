import React from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import { useTodoContext } from "../context/TodoContextProvider";
import { TCategory } from "./AddTodoCategoryItem";

export type TTask = {
  id: string;
  name: string;
  description: string;
  categoryId: string;
};

export type TAddTodoCategoryItem = {
  show: boolean;
  handleClose: () => void;
  category: TCategory;
};

const ViewTasksModal: React.FC<TAddTodoCategoryItem> = ({
  show,
  handleClose,
  category,
}) => {
  const { tasks, deleteTask } = useTodoContext();

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap={2}>
            <div>Zadania</div>
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap={3}>
          {tasks.map((task: TTask) => (
            <div key={task.id}>
              {task.categoryId === category.id && (
                <div style={{ borderBottom: "1px solid grey" }}>
                  <Button
                    style={{ float: "right" }}
                    onClick={() => deleteTask(task.id)}
                    size="sm"
                    variant="outline-danger"
                  >
                    &times;
                  </Button>
                  <h5>{task.name}</h5>
                  <div className="me-auto fs-5">{task.description}</div>
                </div>
              )}
            </div>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  );
};

export default ViewTasksModal;
