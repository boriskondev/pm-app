const WeeklyStatusUser = ({location, match, history}) => {
    return (
        <p>Welcome to the weekly status of {match.params.id}</p>
    )
}

export default WeeklyStatusUser;