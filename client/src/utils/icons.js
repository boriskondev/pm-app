import {
    MdAssessment as Assessment,
    MdPhone as Phone,
    MdPalette as Palette,
    MdDelete as Delete,
    MdEdit as Edit,
    MdDone as Done,
    MdMore as More,
    MdEmail as Email,
} from "react-icons/md";

import {
    FaUser as User,
    FaCodeBranch as Department,
    FaSort as Sort,
    FaSortUp as SortUp,
    FaSortDown as SortDown
} from "react-icons/fa"

const icons = {
    management: <Assessment size={25}/>,
    creative: <Palette size={25}/>,
    clientService: <Phone size={25}/>,
    sortDefault: <Sort size={18}/>,
    sortUp: <SortUp size={18}/>,
    sortDown: <SortDown size={18}/>,
    delete: <Delete size={25}/>,
    edit: <Edit size={25}/>,
    complete: <Done size={25}/>,
    more: <More size={22}/>,
    user: <User size={30}/>,
    department: <Department size={30}/>,
    email: <Email size={30}/>,
}

export default icons;