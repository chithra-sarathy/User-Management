import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Alert, Box } from '@mui/material';
import axios from "axios";

function UserList() {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');

    const fetchProducts = async () => {
        await axios
            .get("https://dummyjson.com/users?limit=10")
            .then((res: any) => setUsers(res.data.users));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleRow: GridEventListener<'rowDoubleClick'> = (
        params,  // GridRowParams
        event,   // MuiEvent<React.MouseEvent<HTMLElement>>
        details, // GridCallbackDetails
    ) => {
        return setMessage(`Hey ${params.row.firstName}`);
    }

    const columns: GridColDef[] = [
        { field: "firstName", headerName: "First Name", width: 100, headerClassName: 'super-app-theme--header' },
        { field: "lastName", headerName: "Last Name", width: 150, headerClassName: 'super-app-theme--header' },
        { field: "gender", headerName: "Gender", width: 100, headerClassName: 'super-app-theme--header' },
        { field: "username", headerName: "User Name", width: 150, headerClassName: 'super-app-theme--header' },
        { field: "university", headerName: "University", width: 150, headerClassName: 'super-app-theme--header' },
        { field: "ssn", headerName: "SSN", width: 150, headerClassName: 'super-app-theme--header' },
        { field: "ein", headerName: "E-IN", width: 150, headerClassName: 'super-app-theme--header' }
    ]

    return (
        <>
            <Box sx={{ 
                height: 400, 
                width: '70%',
                marginTop: '10%',
                marginLeft: '10%',
                '& .super-app-theme--header': {
                    backgroundColor: '#4287f5',
                },
            }}>
                <DataGrid
                    rows={users}
                    columns={columns}
                    onRowDoubleClick={handleRow}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5
                            }
                        }
                    }}
                    sx={{
                        boxShadow: 2,
                        border: 2,
                        borderColor: 'primary.light',
                        '& .MuiDataGrid-cell:hover': {
                            color: 'primary.main'
                        }
                    }}
                />
            </Box>
            {message && <Alert> {message} </Alert>}
        </>
    );
}

export default UserList;
