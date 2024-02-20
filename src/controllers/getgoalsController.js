import getAllGoalsService from "../services/getgoalsService.js";

const getGoals = (req, res) => {
    const {params: { user_id },} = req;
    if (!user_id) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: {error: "Parameter: 'user_id' can not be empty"}
            });
    }

    try {
        const allGoals = getAllGoalsService.getAllGoals(user_id)
        res.send({status: "OK", data:allGoals});
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } })
    }
};

export default {
    getGoals
};