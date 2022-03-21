import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useTodoContext } from "../context/TodoContextProvider";

export type TCategory = {
  id: string;
  name: string;
  description: string;
};

export type TAddTodoCategoryItem = {
  show: boolean;
  handleClose: () => void;
};

const AddTodoCategoryItem: React.FC<TAddTodoCategoryItem> = ({
  show,
  handleClose,
}) => {
  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryDescription, setCategoryDescription] = useState<string>("");
  // Use context method
  const { addCategory } = useTodoContext();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addCategory({
      id: "",
      name: categoryName,
      description: categoryDescription,
    });
    handleClose();
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header>
          <Modal.Title>Kategoria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Nazwa kategorii</Form.Label>
          <Form.Control
            defaultValue={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            type="text"
            required
          ></Form.Control>
          <Form.Label>Opis</Form.Label>
          <Form.Control
            defaultValue={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
            type="text"
          ></Form.Control>
          <div className="mt-3 d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Dodaj
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default AddTodoCategoryItem;
