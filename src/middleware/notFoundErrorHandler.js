const notFoundErrorHandler = (err, req, res, next) => {
    if (req.body = "") { res.body = "PROBLEMS!"; console.log("oeioei") }

    if (err.name === 'NotFoundError') {
        return res.status(404).json({ message: err.message });
    }

    if (err.name === 'Error') {
        return res.status(401).json({ message: err.message });
    }

    console.log("En error occured, please check your request!")

    next(err);
};

export default notFoundErrorHandler;