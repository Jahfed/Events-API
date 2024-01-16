import categoryData from "../../data/categories.json" assert {type: "json"};

const categoryById = (id) => {
    let categories = categoryData.categories;
    if (!categories) {
        console.log("error, no data available");
    }

    if (id) {
        categories = categories.find((category) => category.id === id);
    }

    return categories;
}

export default categoryById;