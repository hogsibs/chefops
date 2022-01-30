export default function ItemForm({ onSubmit }) {
  return (
    <form aria-label="Item Form" onSubmit={onSubmit}>
      <input aria-label="Item Name" type="text" />
      <button>Add Item</button>
    </form>
  );
}
