import { Link } from "react-router-dom";
import classes from "./TasksList.module.css";
import { useMemo, useState } from "react";
import { GoTriangleDown, GoTriangleUp, GoTriangleRight } from "react-icons/go";

const TasksList: React.FC<{ tasks: any[] }> = ({ tasks }) => {
  const [items] = useState(tasks);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("");

  let filteredItems = useMemo(() => {
    let fiteredTasks;
    if (sort) {
      fiteredTasks = items.sort(
        (a, b) => Date.parse(a.date) - Date.parse(b.date)
      );
      if (sort === "DOWN") {
        fiteredTasks.reverse();
      }
    }
    fiteredTasks = items.filter((item) => {
      return item.title.toLowerCase().includes(query.toLocaleLowerCase());
    });
    return fiteredTasks;
  }, [items, query, sort]);

  return (
    <div className={classes.events}>
      <h1>All Tasks</h1>
      <div className={classes.actions}>
        <input className={classes.search}
          value={query}
          type="search"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type here to search..."
        />
        <div className={classes.sortBtn}>
          <button
            className={classes.sortBtn}
            onClick={() => setSort((prev) => (prev === "UP" ? "DOWN" : "UP"))}
          >
            Sort by date
            {(sort && sort === "UP" && <GoTriangleUp />) ||
              (sort && sort === "DOWN" && <GoTriangleDown />) || (
                <GoTriangleRight />
              )}
          </button>
        </div>
      </div>
      <hr />
      <ul className={classes.list}>
        {filteredItems.map((event) => (
          <li key={event.id} className={classes.item}>
            <Link to={event.id}>
              <div className={classes.content}>
                <h2>{event.title}</h2>
                <time>{event.date}</time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksList;
