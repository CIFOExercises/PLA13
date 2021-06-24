// import { getAllCenters } from "./getAllCenters.js";
import { addCenter } from "./addCenter.js";
import { ajaxRequest } from "./ajax.js";
import { refreshCentersTable } from "./refreshCentersTable.js";

(async () => {
    await refreshCentersTable()
})();

let addCenterbutton = document.querySelector('#addCenter')
addCenterbutton.onclick = addCenter

