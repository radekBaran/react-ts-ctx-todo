import React from "react";
import { Button, Card, Stack } from "react-bootstrap";

type TCategoryItemCard = {
  key: string;
  categoryName: string;
  categoryDescription: string;
};

const CategoryItemCard: React.FC<TCategoryItemCard> = ({
  categoryName,
  categoryDescription,
}) => {
  return (
    <Card className="bg-light mb-2">
      <Card.Body>
        <Card.Title className="justify-content-between align-items-baseling fw-normal mb-3">
          <div className="me-2">
            <h2>{categoryName}</h2>
          </div>
          <p>{categoryDescription}</p>
        </Card.Title>
      </Card.Body>
      <Stack direction="horizontal" gap={2}>
        <Button
          variant="outline-primary"
          className="ms-auto"
          // onClick={onAddExpenseClick}
        >
          Dodaj zadanie
        </Button>
        <Button
          variant="outline-secondary"
          //   onClick={onViewExpenseClick}
        >
          Podgląd zadań
        </Button>
      </Stack>
      {/* )} */}
    </Card>
  );
};

export default CategoryItemCard;
