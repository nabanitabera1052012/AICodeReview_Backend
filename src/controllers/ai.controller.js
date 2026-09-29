const aiService = require("../services/ai.service")


module.exports.getReview = async (req, res) => {
    const code = req.body.code;
    const message = req.body.message || req.body.prompt;

    if (!code && !message) {
        return res.status(400).send("Code or chat message is required");
    }

    let fullPrompt = "";
    if (code && message) {
        fullPrompt = `User query / instruction: ${message}\n\nContext Code Snippet:\n\`\`\`javascript\n${code}\n\`\`\``;
    } else if (code) {
        fullPrompt = code;
    } else {
        fullPrompt = message;
    }

    try {
        const response = await aiService(fullPrompt);
        res.send(response);
    } catch (error) {
        console.error("AI Service Error:", error);
        res.status(500).send(error.message || "An error occurred while generating the review.");
    }
}