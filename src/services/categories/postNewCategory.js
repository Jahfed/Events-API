import { v4 as uuid } from "uuid";
import categoryData from "../../data/categories.json" assert {type: "json"};

const createCategory = (name) => {
    let id = Object.entries(categoryData.categories).length + 1;
    const newCategory = {
        name,
        id: `${id}`
    };

    categoryData.categories.push(newCategory);
    return newCategory;
}

export default createCategory;