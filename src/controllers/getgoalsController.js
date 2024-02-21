import { getAllGoals } from "../services/getgoalsService.js";

export async function getGoals(req, res) {
    const user_id = req.params.user_id;

    if (!user_id) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: {error: "Parameter: 'user_id' can not be empty"}
            });
    }

    try {
        const allGoals = await getAllGoals(user_id);

        if (allGoals.length) {
            res
            .status(200)
            .send({ status: "OK", data: allGoals});
        } else {
            res.send(`user: ${user_id} has no goals to retrieve...`);
        }

    } catch (error) {
        console.error(`Error retrieving ${user_id}'s goals: ${error}`);
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};