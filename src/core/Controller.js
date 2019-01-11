class Controller {

    constructor() {

    }

    success(res, data) {
        return res.status(200).send(data);
    }

    error(res, error) {
        return res.status(400).send(error);
    }
}

module.exports = Controller;
