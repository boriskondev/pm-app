import {
    MdAssessment as Assessment,
    MdEmail as Email,
    MdPalette as Palette,
    MdSort as Sort,
    MdDelete as Delete,
    MdEdit as Edit,
    MdDone as Done,
    MdMore as More
} from "react-icons/md";

export default {
    management: <Assessment size={25}/>,
    creative: <Palette size={25}/>,
    clientService: <Email size={25}/>,
    sort: <Sort size={20}/>,
    delete: <Delete size={25}/>,
    edit: <Edit size={25}/>,
    complete: <Done size={25}/>,
    more: <More size={22}/>,
}