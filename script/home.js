const createElements = (arr) => {
    let htmlElement = [];
    arr.map((el) => {
        if (el === "bug") {
            htmlElement.push(`<span class="text-red-500 border bg-red-100 rounded-xl p-1 text-xs"><i class="fa-solid fa-bug"></i> BUG</span>`);
        } else if (el === "help wanted") {
            htmlElement.push(`<span class="text-[#D97706] border bg-[#FFF8DB] rounded-xl p-1 text-xs"><i class="fa-solid fa-life-ring"></i> Help wanted</span>`);
        } else {
            htmlElement.push(`<span class="text-green-500 border bg-green-100 rounded-xl p-1 text-xs"><i class="fa-solid fa-hand-holding-medical"></i> ${el}</span>`);
        }
    });

    return htmlElement.join(" ");
};

const priorityChecker = (status) => {
    let htmlElement = "";
    if (status === "high") {
        return (htmlElement = `<p class="text-red-500 text-xs"><span class="bg-red-100 px-6 py-1 rounded-xl">HIGH</span></p>`);
    } else if (status === "medium") {
        return (htmlElement = `<p class="text-[#D97706] text-xs"><span class="bg-[#FFF8DB] px-6 py-1 rounded-xl">MEDIUM</span></p>`);
    } else {
        return (htmlElement = `<p class="text-xs"><span class="bg-gray-200 px-6 py-1 rounded-xl">LOW</span></p>`);
    }
};

const toggleButtons = (id) => {
    const allButons = document.querySelectorAll(".top-btn");
    allButons.forEach((btn) => btn.classList.remove("btn-primary"));

    document.getElementById(id).classList.add("btn-primary");
};

const totalIssues = document.getElementById("total-issues");
const loadAllData = async () => {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();

    totalIssues.innerText = data.data.length;
    return data.data;
};
loadAllData();

const cardContainer = document.getElementById("card-Container");
const displayDataCards = async () => {
    const allIssues = await loadAllData();
    cardContainer.innerHTML = "";
    for (const issue of allIssues) {
        const card = document.createElement("div");
        if (issue.status === "open") {
            card.innerHTML = `
                <div class="w-64 h-full shadow-lg rounded p-4 border-t-2 border-[#00A96E] space-y-3">
                    <div class="flex justify-between items-center">
                        <img src="./assets/Open-Status.png" alt="" />
                        ${priorityChecker(issue.priority)}
                    </div>
                    <h3 class="font-semibold text-sm">${issue.title}</h3>
                    <p class="text-xs text-gray-500">${issue.description}</p>
                    <div>
                        ${createElements(issue.labels)}
                    </div>
                    <hr class="text-gray-400">
                    <div class="py-4 text-xs text-gray-500">
                        <p>${issue.author}</p>
                        <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
        `;
            cardContainer.appendChild(card);
        } else {
            card.innerHTML = `
                <div class="w-64 h-full shadow-lg rounded p-4 border-t-2 border-[#A855F7] space-y-3">
                    <div class="flex justify-between items-center">
                        <img src="./assets/Closed- Status .png" alt="" />
                        ${priorityChecker(issue.priority)}
                    </div>
                    <h3 class="font-semibold text-sm">${issue.title}</h3>
                    <p class="text-xs text-gray-500">${issue.description}</p>
                    <div>
                        ${createElements(issue.labels)}
                    </div>
                    <hr class="text-gray-400">
                    <div class="py-4 text-xs text-gray-500">
                        <p>${issue.author}</p>
                        <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
        `;
            cardContainer.appendChild(card);
        }
    }
};
displayDataCards();

const mainContainer = document.querySelector("main");
mainContainer.addEventListener("click", async (event) => {
    if (event.target.id === "all-btn") {
        loadAllData();
        displayDataCards();
    }

    if (event.target.id === "open-btn") {
        const issues = await loadAllData();
        let openIssue = 0;
        cardContainer.innerHTML = "";

        issues.map((issue) => {
            if (issue.status === "open") {
                openIssue++;

                // rendering open cards
                const openCard = document.createElement("div");
                openCard.innerHTML = `
                <div class="w-64 h-full shadow-lg rounded p-4 border-t-2 border-[#00A96E] space-y-3">
                    <div class="flex justify-between items-center">
                        <img src="./assets/Open-Status.png" alt="" />
                        ${priorityChecker(issue.priority)}
                    </div>
                    <h3 class="font-semibold text-sm">${issue.title}</h3>
                    <p class="text-xs text-gray-500">${issue.description}</p>
                    <div>
                        ${createElements(issue.labels)}
                    </div>
                    <hr class="text-gray-400">
                    <div class="py-4 text-xs text-gray-500">
                        <p>${issue.author}</p>
                        <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
        `;
                cardContainer.appendChild(openCard);
            }
        });
        totalIssues.innerText = openIssue;
    }
    if (event.target.id === "closed-btn") {
        const issues = await loadAllData();
        let closedIssue = 0;
        issues.map((issue) => {
            if (issue.status === "closed") {
                closedIssue++;
            }
        });
        totalIssues.innerText = closedIssue;
    }
});
