import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useTodoContext } from "../context/TodoContextProvider";
import { TCategory } from "./AddTodoCategoryItem";

export type TAddTaskItem = {
  show: boolean;
  handleClose: () => void;
  category: TCategory;
};

const AddTaskItem: React.FC<TAddTaskItem> = ({
  show,
  handleClose,
  category,
}) => {
  const [itemName, setItemName] = useState<string>("");
  const [itemDescription, setItemDescription] = useState<string>("");

  const { addTask } = useTodoContext();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addTask({
      id: "",
      name: itemName,
      description: itemDescription,
      categoryId: category.id,
    });
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header>
          <Modal.Title>Nowe zadanie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Nazwa zadania</Form.Label>
          <Form.Control
            defaultValue={itemName}
            onChange={(e) => setItemName(e.target.value)}
            type="text"
            required
          ></Form.Control>
          <Form.Label>Opis</Form.Label>
          <Form.Control
            defaultValue={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            type="text"
          ></Form.Control>
          <div className="mt-3 d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Dodaj zadanie
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default AddTaskItem;
