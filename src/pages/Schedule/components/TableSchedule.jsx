const TableSchedule = ({ schedule }) => {
    if (!schedule || schedule.length === 0) return null;
    return (
        <div>
            <table class="table table-bordered table-responsive w-75 m-auto">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        {schedule.map()}
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td colspan="2">Larry the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default TableSchedule;
