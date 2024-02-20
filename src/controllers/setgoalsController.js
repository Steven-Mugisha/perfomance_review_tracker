import setgoalsService from "../services/setgoalsService.js";

const setGoals = async (req, res) => {
    const { body } = req;

    if (
        !body.user_id ||
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
                    error: "One of the following keys is missing from the request body: title, description, start_date, target_date, priority, status.",
                },
        });
        return;
    }

    const newGoal = {
        user_id: body.user_id,
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

    } catch(error) {
        res
            .status(error?.status || 500)
            .send({status: "FAILED", data: {error: error?.message || error}});
    };
};

export default {
    setGoals
};