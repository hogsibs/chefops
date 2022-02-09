/**
 * @param {Object} props
 * @param {[]} props.items
 * @returns {import("react").ReactElement}
 */
export default function ShoppingList({ items }) {
  return items.length ? (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          <label>
            <input type="checkbox" />
            {item.name}
          </label>
        </li>
      ))}
    </ul>
  ) : (
    "There are no items in the shopping list."
  );
}
