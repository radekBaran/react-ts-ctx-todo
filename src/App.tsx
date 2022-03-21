import React, { useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import AddTaskItem from "./components/AddTaskItem";
import AddTodoCategoryItem, {
  TCategory,
} from "./components/AddTodoCategoryItem";
import CategoryItemCard from "./components/CategoryItemCard";
import { useTodoContext } from "./context/TodoContextProvider";

const App: React.FC = () => {
  const [showAddTodoCategoryItem, setShowAddTodoCategoryItem] = useState(false);

  const { categories } = useTodoContext();

  return (
    <>
      <Container className="shadow-lg">
        <Stack direction="horizontal" gap={2} className="p-2 mb-4 mt-4">
          <h1 className="me-auto">Lista zadań</h1>
          <Button
            onClick={() => setShowAddTodoCategoryItem(true)}
            variant="primary"
          >
            Dodaj kategorię
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {categories.map((category: TCategory) => {
            return (
              <CategoryItemCard
                key={category.id}
                categoryName={category.name}
                categoryDescription={category.description}
              />
            );
          })}
        </div>
      </Container>
      <AddTodoCategoryItem
        show={showAddTodoCategoryItem}
        handleClose={() => setShowAddTodoCategoryItem(false)}
      />
      <AddTaskItem />
    </>
  );
};

export default App;
