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

const displayDataCards = async () =>{
    const allIssues = await loadAllData()
    
}

const mainContainer = document.querySelector("main");
mainContainer.addEventListener("click", async (event) => {

    if(event.target.id === "all-btn"){
        loadAllData();
    }

    if (event.target.id === "open-btn") {
        const issues = await loadAllData();
        let openIssue = 0;
        issues.map(issue=>{
            if(issue.status ==="open"){
                openIssue++;
            }
        });
        totalIssues.innerText = openIssue;
    }
    if (event.target.id === "closed-btn") {
        const issues = await loadAllData();
        let closedIssue = 0;
        issues.map(issue=>{
            if(issue.status ==="closed"){
                closedIssue++;
            }
        });
        totalIssues.innerText = closedIssue;
    }
});
