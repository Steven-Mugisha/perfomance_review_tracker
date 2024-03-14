import setgoalsService from "../services/setgoalsService.js";

const setGoals = async (req, res) => {
    const { body } = req;

    if (
        !body.user_name ||
        !body.title ||
        !body.description ||
        !body.start_date ||
        !body.target_date ||
        !body.priority ||
        !body.status
    ) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: {
                    err: "One of the following keys is missing from the request body: title, description, start_date, target_date, priority, status.",
                },
        });
        return;
    }

    const newGoal = {
        user_name: body.user_name,
        title: body.title,
        description: body.description,
        start_date: body.start_date,
        target_date: body.target_date,
        priority: body.priority,
        status: body.status,
    };

    try {
        const createdGoal = await setgoalsService.createGoal(newGoal);
        res.status(201).send({status: "OK", data: createdGoal});

    } catch(err) {
        res
            .status(err?.status || 500)
            .send({status: "FAILED", data: {err: err?.message || err}});
    };
};

const addNotes = async (req, res) => {
    const {body} = req;

    if (
        !body.user_id ||
        !body.notes
    ) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: {
                    err: "One of the following keys is missing from the request body: title, description, start_date, target_date, priority, status.",
                },
        });
        return;
    }

    let newStatus;
    let notes;

    try {
        if (body.status !== undefined || body.status !== null) {
            const adjStatus = {
                status: body.status,
                user_id: body.user_id,
            }
            newStatus = await setgoalsService.changeStatus(adjStatus)
        } else {

            const newNotes = {
                notes: body.notes,
            }
            notes = await setgoalsService.addNotes(newNotes)
            res.status(201).send({status: "OK", data: [newStatus, notes]});
        }
    } catch (err) {
        res
            .status(err.status || 500)
            .send({status: "FAILED", data: {err: err?.message || err}});
    }
}

const getGoals = async (req, res) => {

};

const deleteGoals = async (req, res) => {

};

export default {
    setGoals,
    addNotes,
    getGoals,
    deleteGoals,
};