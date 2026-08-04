async function exportDefects() {

    const rows = document.querySelectorAll("tbody tr");

    const exportData = [];

    for (const row of rows) {

        const cells = row.querySelectorAll("td");

        const ticketLink = cells[0].querySelector("a");

        const ticketId = ticketLink.textContent.trim();

        const ticketFile = ticketLink.getAttribute("href");

        const title = cells[1].textContent.trim();

        const phase = cells[2].textContent.trim();

        const priority = cells[3].textContent.trim();

        const owner = cells[4].textContent.trim();

        const updated = cells[5].textContent.trim();

        let aiAnalysis = "No comments available";

        try {

            const comments = await readTicketComments(ticketFile);

            if (comments.length > 0) {

                aiAnalysis = await generateAISummary(comments);

            }

        } catch (error) {

            console.error(
                `Error processing ticket ${ticketId}`,
                error
            );

            aiAnalysis =
                "AI analysis unavailable";

        }

        exportData.push({

            ID: ticketId,
            Title: title,
            Phase: phase,
            Priority: priority,
            Owner: owner,
            Updated: updated,
            "AI Analysis": aiAnalysis

        });

    }

    const worksheet =
        XLSX.utils.json_to_sheet(exportData);

    const workbook =
        XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Defects"
    );

    XLSX.writeFile(
        workbook,
        "Defects_With_AI_Analysis.xlsx"
    );
}


async function readTicketComments(ticketFile) {

    const response =
        await fetch(ticketFile);

    const html =
        await response.text();

    const parser =
        new DOMParser();

    const doc =
        parser.parseFromString(
            html,
            "text/html"
        );

    const headers =
        doc.querySelectorAll("h2");

    let commentsCard = null;

    headers.forEach(header => {

        if (
            header.textContent
                .toLowerCase()
                .includes("comments")
        ) {

            commentsCard =
                header.parentElement;

        }

    });

    if (!commentsCard) {

        return "";

    }

    const comments = [];

    commentsCard
        .querySelectorAll("p")
        .forEach(comment => {

            const text =
                comment.textContent.trim();

            if (text.length > 0) {

                comments.push(text);

            }

        });

    return comments.join("\n");

}


async function generateAISummary(comments) {

    const response =
        await fetch(
            "http://localhost:5000/summarize",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json"
                },
                body: JSON.stringify({
                    comments: comments
                })
            }
        );

    if (!response.ok) {

        throw new Error(
            "Failed to generate summary"
        );

    }

    const result =
        await response.json();

    return result.summary;

}