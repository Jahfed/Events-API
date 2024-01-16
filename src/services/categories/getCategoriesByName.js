import categoryData from "../../data/categories.json" assert {type: "json"};

const categories = (name) => {
    let categories = categoryData.categories;
    if (!categories) {
        console.log("error, no data available");
    }

    if (name) {
        categories = categories.find((category) => category.name === name);
    }

    return categories;
}

export default categories;