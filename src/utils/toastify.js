import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let notifySuccess = (note) => toast.success(note);
let notifyError = (note) => toast.error(note);

const toastify = (note, type) => {
    if (type === "success") {
      return notifySuccess(note);
    } else {
      return notifyError(note);
    }
};

export default toastify;
