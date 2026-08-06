import { createFileRoute } from '@tanstack/react-router';
import { useTodos } from '@/hooks/useTodos';
import { useTheme } from '@/hooks/useTheme';
import Header from '@/components/Header';
import AddTodoForm from '@/components/AddTodoForm';
import FilterBar from '@/components/FilterBar';
import TodoList from '@/components/TodoList';
import StatsBar from '@/components/StatsBar';

export const Route = createFileRoute('/')({
  component: TodoPage,
});

function TodoPage() {
  const {
    filteredTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    activeCount,
    completedCount,
  } = useTodos();
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <Header theme={theme} setTheme={setTheme} />
        <AddTodoForm onAdd={addTodo} />
        <StatsBar activeCount={activeCount} completedCount={completedCount} />
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          onClearCompleted={clearCompleted}
          completedCount={completedCount}
        />
        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
      </div>
    </div>
  );
}
